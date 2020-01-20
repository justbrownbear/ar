
import * as React from "react";
import { connect } from "react-redux";

import loadable from "loadable-components";
import ModuleLoadingWaiter from "lk/components/ModuleLoadingWaiter.jsx";

import { getAnalytics, toggleDistributionAnalysis } from "./redux/actions";
import { ListSelect } from "../ListSelect/ListSelect.js";
import { ListMultipleSelect } from "../ListSelect/ListMultipleSelect.js";

import "./css/analytics.css";


const DistributionAnalysisEstimations = loadable(
	() => import( /* webpackChunkName: "DistributionAnalysisEstimations" */ "./Reports/DistributionAnalysisEstimations/DistributionAnalysisEstimations.jsx" ),
	{
		LoadingComponent: ModuleLoadingWaiter
	} );


const NONE = 0;
const REPORT_NUMERICAL = 1;
const REPORT_QUALITY = 2;
const REPORT_DSPM = 3;
const DISTRIBUTION_ANALYSIS = 4;
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


const statisticalIndicators =
[
	{ id: 2, title: "Среднее арифметическое" },
	{ id: 22, title: "Центр лог.норм. распределения" },
	{ id: 6, title: "Средневзвешенное" },
	{ id: 7, title: "Центр модального интервала" },
	{ id: 11, title: "Медиана" },
	{ id: 5, title: "Мода" },
	{ id: 13, title: "Максимум" },
	{ id: 9, title: "Минимум" }
];



class DistributionAnalysisBlock extends React.Component
{
	constructor( props )
	{
		super( props );

		this.state =
		{
			numericParametersDistributionAnalysis: [ UNIT_COST, SPACE ],
			statisticalIndicator: WEIGHTED_AVERAGE,
			panelIsOpen: false,

			analyticsParameters:
			{
				numericParametersDistributionAnalysis: [],
				statisticalIndicator: null
			}
		};

	}

	componentDidMount()
	{
		this.recalculateAnalytics();
	}


	setNumericParametersDistributionAnalysis = ( value ) => this.setState( { numericParametersDistributionAnalysis: value } );
	setStatisticalIndicators = ( value ) => this.setState( { statisticalIndicator: value } );


	recalculateAnalytics = () =>
	{
		const newAnalyticsParameters =
		{
			numericParametersDistributionAnalysis: this.state.numericParametersDistributionAnalysis,
			statisticalIndicator: this.state.statisticalIndicator
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
			let currentStatisticalIndicators = statisticalIndicators.find( ( element ) => element.id === this.state.analyticsParameters.statisticalIndicator );

			if( this.props.analyticsData.reportNumber === DISTRIBUTION_ANALYSIS )
				analyticsReport = <DistributionAnalysisEstimations numericParametersDistributionAnalysis={ currentNumericCharacteristics } statisticalIndicator={ currentStatisticalIndicators } />;
		}

		return (
			<div className="analytic-office lognormal-distribution__window">
				<span className="analytic-office__close-window" onClick={ this.props.toggleDistributionAnalysis }></span>
				<div className="lognormal-distribution__breadcrumb"><a href="http://www.areall.ru/">Главная</a> &gt; <a href="http://www.areall.ru/lk">Личный кабинет</a> &gt; <a>Кабинет аналитика раздел Анализ распределения</a></div>
				<p className="lognormal-distribution__setup-module" onClick={ this.changeStatePanel }>Выбор характеристики</p>
				{
					this.state.panelIsOpen &&
					(
						<div className="analytic-office__section">
							<ListMultipleSelect title="Характеристики числовые" value={ this.state.numericParametersDistributionAnalysis } onChange={ this.setNumericParametersDistributionAnalysis } options={ numericCharacteristics } collapseDisabled={ true } showSelectAllCheckbox={ false } ulAdditionalClass="analytic-office__xsmall-container-list" />
							<ListSelect title="Распределение относительно показателя" value={ this.state.statisticalIndicator } onChange={ this.setStatisticalIndicators } options={ statisticalIndicators } showSelectAllCheckbox={ false } ulAdditionalClass="analytic-office__xxsmall-container-list" collapseDisabled={ true }/>
							<div className="analytic-office__buttons-wrapper">
								<button className="analytic_button" type="button" onClick={ this.recalculateAnalytics }>РАССЧИТАТЬ</button>
							</div>
						</div>
					)
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
		toggleDistributionAnalysis: () => dispatch( toggleDistributionAnalysis() )
	} );


export default connect( mapStateToProps, mapDispatchToProps )( DistributionAnalysisBlock );