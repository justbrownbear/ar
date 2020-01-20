// @flow
import * as React from "react";

import { connect } from "react-redux";

import isEqual from "lodash/isEqual";
import { clearAnalyticsResult } from "../../redux/actions";

import { haveReadPermission } from "lk/checkPermissions.js";
import { PERMISSION_CUSTOMIZE_DISTRIBUTION_ANALYSIS_MODULE } from "lk/constants.js";

import md5 from "js-md5";

import sortBy from "lodash/sortBy";

import numbers from "lk/components/util/numbers/numbers.js";

import { modalIntervalCenter } from "lk/components/util/numbers/numbersPlus.js";

import { StatisticsBlock } from "../StatisticsBlock/StatisticsBlock.jsx";

import { AnalysisOfDistributionSourceTable } from "./components/AnalysisOfDistributionSourceTable.jsx";
import { AnalysisOfDistributionHistogramTable } from "./components/AnalysisOfDistributionHistogramTable.jsx";
import { AnalysisOfDistributionDensityChart } from "./components/AnalysisOfDistributionDensityChart.jsx";
import { AnalysisOfDistributionNormalChart } from "./components/AnalysisOfDistributionNormalChart.jsx";

import "./components/css/distribution_analysis.css";



export type SourceObject =
{
	id: number | string,
	value: number,
	divider: number
};



type DataObject =
{
	source?: Array<SourceObject>,
	histogram?: Array<HistogramObject>,
	statistics?: Array<{}>
};


type IndicatorType =
{
	id: number,
	title: string
};


type Props =
{
	numericParametersDistributionAnalysis: IndicatorType[],
	statisticalIndicator: IndicatorType,
	data: DataObject,
	clearAnalyticsResult: () => void
};


type State =
{
	numericParametersDistributionAnalysisTitle: string[],
	statisticalIndicator: IndicatorType,

	sourceMD5: string,
	customSource: Array<SourceObject>,

	centre: number,
};


const getMD5 = ( data ) => md5( JSON.stringify( data ) );



class DistributionAnalysisEstimations extends React.Component <Props, State>
{
	constructor( props: Props )
	{
		super( props );

		this.state = DistributionAnalysisEstimations.getFreshState( props.data.source, props );
	}


	static getDerivedStateFromProps( nextProps: Props, prevState: State )
	{
		if( prevState.statisticalIndicator !== nextProps.statisticalIndicator )
			return (
				{
					statisticalIndicator: nextProps.statisticalIndicator,
					centre: GetCentre( nextProps.statisticalIndicator.id, prevState.customSource )
				} );


		// У нас изменились что-то несущественное
		if(	( nextProps.data.source !== undefined && isEqual( getMD5( nextProps.data.source ), prevState.sourceMD5 ) ) )
			return null;


		return DistributionAnalysisEstimations.getFreshState( nextProps.data.source, nextProps );
	}



	static getFreshState( source: Array<SourceObject>, props: Props ): State
	{

		let parametersDistributionAnalysis = props.numericParametersDistributionAnalysis.map( ( value ) => value.title );

		const state =
		{
			numericParametersDistributionAnalysisTitle: parametersDistributionAnalysis,
			statisticalIndicator: props.statisticalIndicator,

			// Т.к. source нам тут нужен только для целей сравнения в случае его изменения, то сравнивать будем md5
			sourceMD5: getMD5( props.data.source ),
			customSource: source,

			centre: GetCentre( props.statisticalIndicator.id, source )
		};

		return state;
	}



	setCustomSource = ( source ) =>
	{
		// При обновлении списка значений, сразу его сортируем по value
		const sortedNewSource = sortBy( source, "value" );

		this.setState( DistributionAnalysisEstimations.getFreshState( sortedNewSource, this.props ) );
	}



	render()
	{
		const { centre, numericParametersDistributionAnalysisTitle, statisticalIndicator, customSource } = this.state;

		const isUserCanCustomizeReport = haveReadPermission( PERMISSION_CUSTOMIZE_DISTRIBUTION_ANALYSIS_MODULE );

		let graphics = null;

		if( this.state.customSource.length > 0 )
			graphics =
				<React.Fragment>
					<AnalysisOfDistributionDensityChart data={ this.state.customSource } centre={ centre } numericParametersDistributionAnalysisTitle={ numericParametersDistributionAnalysisTitle } isUserCanCustomizeReport={ isUserCanCustomizeReport } />
					<AnalysisOfDistributionNormalChart data={ this.state.customSource } numericParametersDistributionAnalysisTitle={ numericParametersDistributionAnalysisTitle } />
				</React.Fragment>;


		return (
			<div className="analytic-office__section">
				<span className="lognormal-distribution__close-report" onClick={ this.props.clearAnalyticsResult }></span>
				<div className="grid-row">
					<div className="grid-cols-16">
						<p className="lognormal-distribution__report-title">
						Анализ распределения характеристики "{ numericParametersDistributionAnalysisTitle[0] }"<br />
						относительно показателя "{ statisticalIndicator.title }"
						</p>
						<StatisticsBlock data={ customSource } centre={ centre }/>
					</div>
					<AnalysisOfDistributionSourceTable data={ this.state.customSource } onChange={ this.setCustomSource } numericParametersDistributionAnalysisTitle={ numericParametersDistributionAnalysisTitle } isUserCanCustomizeReport={ isUserCanCustomizeReport } />
				</div>
				<div className="grid-row">
					<div className="grid-cols-24">
						<AnalysisOfDistributionHistogramTable source={ this.state.customSource } numericParametersDistributionAnalysisTitle={ numericParametersDistributionAnalysisTitle } isUserCanCustomizeReport={ isUserCanCustomizeReport } />
						{ graphics }
					</div>
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

export default connect( mapStateToProps, mapDispatchToProps )( DistributionAnalysisEstimations );
