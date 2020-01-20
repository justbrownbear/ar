
import * as React from "react";
import { connect } from "react-redux";

import loadable from "loadable-components";
import ModuleLoadingWaiter from "lk/components/ModuleLoadingWaiter.jsx";

import { getAnalytics, toggleGraphicalAnalysis } from "./redux/actions";
import { ListSelect } from "../ListSelect/ListSelect.js";
import { ListMultipleSelect } from "../ListSelect/ListMultipleSelect.js";

import "./css/analytics.css";


const GraphicalAnalysisEstimations = loadable(
	() => import( /* webpackChunkName: "GraphicalAnalysisEstimations" */ "./Reports/GraphicalAnalysisEstimations/GraphicalAnalysisEstimations.jsx" ),
	{
		LoadingComponent: ModuleLoadingWaiter
	} );



const NONE = 0;
const REPORT_NUMERICAL = 1;
const REPORT_QUALITY = 2;
const REPORT_DSPM = 3;
const DISTRIBUTION_ANALYSIS = 4;
const GRAPHICAL_ANALYSIS = 5;
const UNIT_COST = 3;
const SPACE = 24;
const WEIGHTED_AVERAGE = 6;



const numericCharacteristics =
[
	{ id: 3, title: "Цена удельная" },
	{ id: 2, title: "Цена полная" },
	{ id: 4, title: "Удельная кадастровая стоимость" },
	{ id: 5, title: "Кадастровая стоимость" },
	{ id: 19, title: "До остановки, м" },
	{ id: 22, title: "До магистрали, м" },
	{ id: 24, title: "Площадь" },
	{ id: 26, title: "Высота потолков" },
	{ id: 56, title: "Объём" },
	{ id: 42, title: "GLA/GBA" },
	{ id: 47, title: "Износ, %" }
];


class GraphicalAnalysisBlock extends React.Component
{
	constructor( props )
	{
		super( props );

		this.state =
		{
			numericParametersDistributionAnalysis: [ SPACE, UNIT_COST ],
			panelIsOpen: false,

			analyticsParameters:
			{
				numericParametersDistributionAnalysis: []
			}
		};

	}

	componentDidMount()
	{
		this.recalculateAnalytics();
	}


	setNumericParametersDistributionAnalysis = ( value ) => this.setState( { numericParametersDistributionAnalysis: value } );


	recalculateAnalytics = () =>
	{
		const newAnalyticsParameters =
		{
			numericParametersDistributionAnalysis: this.state.numericParametersDistributionAnalysis
		};

		// Если у нас изменилась характеристика, то надо на сервер отправлять новый запрос данных
		if( this.state.numericParametersDistributionAnalysis !== this.state.analyticsParameters.numericParametersDistributionAnalysis )
			this.props.getAnalytics( newAnalyticsParameters );

		this.setState( { analyticsParameters: newAnalyticsParameters } );
	};


	changeStatePanel = () =>
	{
		this.setState( { panelIsOpen: ( this.state.panelIsOpen )? false : true } );
	};

	render(): React.Node
	{
		let analyticsReport = null;

		if( this.props.analyticsData && this.props.analyticsData.reportNumber )
		{
			let currentNumericCharacteristics = this.state.analyticsParameters.numericParametersDistributionAnalysis.map((value) => numericCharacteristics.find( ( element ) => element.id === value ));

			if( this.props.analyticsData.reportNumber === DISTRIBUTION_ANALYSIS )
				analyticsReport = <GraphicalAnalysisEstimations numericParametersDistributionAnalysis={ currentNumericCharacteristics } />;
		}

		return (
			<div className="analytic-office lognormal-distribution__window">
				<span className="analytic-office__close-window" onClick={ this.props.toggleGraphicalAnalysis }></span>
				<div className="lognormal-distribution__breadcrumb"><a href="http://www.areall.ru/">Главная</a> &gt; <a href="http://www.areall.ru/lk">Личный кабинет</a> &gt; <a>Кабинет аналитика раздел Графический анализ</a></div>
				<p className="lognormal-distribution__setup-module" onClick={ this.changeStatePanel }>Выбор характеристики</p>
				{ this.state.panelIsOpen &&
					<div className="analytic-office__section">
						<ListMultipleSelect title="Характеристики числовые" value={ this.state.numericParametersDistributionAnalysis } onChange={ this.setNumericParametersDistributionAnalysis } options={ numericCharacteristics } collapseDisabled={ true } showSelectAllCheckbox={ false } ulAdditionalClass="analytic-office__xsmall-container-list" />
						<div className="analytic-office__buttons-wrapper">
							<button className="analytic_button" type="button" onClick={ this.recalculateAnalytics }>РАССЧИТАТЬ</button>
						</div>
					</div>
				}
				{ analyticsReport }
			</div>
		);
	}
}



const mapStateToProps = ( store ) => (
	{
		analyticsData: store.analyticsCabinet.analyticsData
	} );



const mapDispatchToProps = ( dispatch ) => (
	{
		getAnalytics: ( parameters ) => dispatch( getAnalytics( parameters ) ),
		toggleGraphicalAnalysis: () => dispatch( toggleGraphicalAnalysis() )
	} );


export default connect( mapStateToProps, mapDispatchToProps )( GraphicalAnalysisBlock );