// @flow
import * as React from "react";

import { connect } from "react-redux";

import isEqual from "lodash/isEqual";
import { clearAnalyticsResult } from "../../redux/actions";

import md5 from "js-md5";

import sortBy from "lodash/sortBy";

import numbers from "lk/components/util/numbers/numbers.js";

import { modalIntervalCenter } from "lk/components/util/numbers/numbersPlus.js";

import { StatisticsBlock } from "../StatisticsBlock/StatisticsBlock.jsx";

import { AnalysisOfDistributionSourceTable } from "../DistributionAnalysisEstimations/components/AnalysisOfDistributionSourceTable.jsx";
import { AnalysisOfGraphicalChart } from "./components/AnalysisOfGraphicalChart.jsx";

import "../DistributionAnalysisEstimations/components/css/distribution_analysis.css";



export type SourceObject =
{
	id: number | string,
	value: number,
	divider: number
};


type DataObject =
{
	source?: Array<SourceObject>
};


type IndicatorType =
{
	id: number,
	title: string
};


type Props =
{
	numericParametersDistributionAnalysis: IndicatorType[],
	data: DataObject,
	clearAnalyticsResult: () => void
};


type State =
{
	numericParametersDistributionAnalysisTitle: string[],
	sourceMD5: string,
	customSource: Array<SourceObject>

};


const getMD5 = ( data ) => md5( JSON.stringify( data ) );



class GraphicalAnalysisEstimations extends React.Component <Props, State>
{
	constructor( props: Props )
	{
		super( props );

		this.state = GraphicalAnalysisEstimations.getFreshState( props.data.source, props );
	}


	static getDerivedStateFromProps( nextProps: Props, prevState: State )
	{
		// У нас изменились что-то несущественное
		if(	( nextProps.data.source !== undefined && isEqual( getMD5( nextProps.data.source ), prevState.sourceMD5 ) ) )
			return null;

		return GraphicalAnalysisEstimations.getFreshState( nextProps.data.source, nextProps );
	}

	static getFreshState( source: Array<SourceObject>, props: Props ): State
	{
		let parametersDistributionAnalysis = props.numericParametersDistributionAnalysis.map( ( value ) => value.title );

		const state =
		{
			numericParametersDistributionAnalysisTitle: parametersDistributionAnalysis,

			// Т.к. source нам тут нужен только для целей сравнения в случае его изменения, то сравнивать будем md5
			sourceMD5: getMD5( props.data.source ),
			customSource: source
		};

		return state;
	}


	setCustomSource = ( source ) =>
	{
		// При обновлении списка значений, сразу его сортируем по value
		const sortedNewSource = sortBy( source, "value" );

		this.setState( GraphicalAnalysisEstimations.getFreshState( sortedNewSource, this.props ) );
	}





	render()
	{
		const { numericParametersDistributionAnalysisTitle, customSource } = this.state;

		let graphics = null;

		if( this.state.customSource.length > 0 )
			graphics =
				<React.Fragment>
					<AnalysisOfGraphicalChart data={ this.state.customSource } numericParametersDistributionAnalysisTitle={ numericParametersDistributionAnalysisTitle }/>
				</React.Fragment>;


		return (
			<div className="analytic-office__section">
				<span className="lognormal-distribution__close-report" onClick={ this.props.clearAnalyticsResult }></span>
				<div className="grid-row">
					<div className="grid-cols-16">
						{ graphics }
					</div>
					<AnalysisOfDistributionSourceTable data={ this.state.customSource } onChange={ this.setCustomSource } numericParametersDistributionAnalysisTitle={  numericParametersDistributionAnalysisTitle } />
				</div>
			</div>
		);
	}
}



function GetCentre( id, customSource )
{
	let values = customSource.map( ( element ) => element.value );

	let result = 0;


	switch ( id )
	{
		case 5:
			result = numbers.statistic.mode( values );
			break;

		case 7:
			result = modalIntervalCenter( values );
			break;

		case 9:
			result = numbers.basic.min( values );
			break;

		case 11:
			result = numbers.statistic.median( values );
			break;

		case 13:
			result = numbers.basic.max( values );
			break;

		case 22:
			let valuesLN = values.map( ( element ) => Math.log( element ) );
			result = Math.exp( numbers.statistic.mean( valuesLN ) );
			break;

		default:
			result = numbers.statistic.mean( values );
			break;
	}

	return result;
}


const mapStateToProps = ( store ) => store.analyticsCabinet.analyticsData;

const mapDispatchToProps = ( dispatch ) => (
	{
		clearAnalyticsResult: () => dispatch( clearAnalyticsResult() )
	} );

export default connect( mapStateToProps, mapDispatchToProps )( GraphicalAnalysisEstimations );
