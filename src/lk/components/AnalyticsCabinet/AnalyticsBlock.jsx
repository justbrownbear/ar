// @flow
import * as React from "react";
import { connect } from "react-redux";

import loadable from "loadable-components";
import ModuleLoadingWaiter from "lk/components/ModuleLoadingWaiter.jsx";

import { getAnalytics, toggleAnalytics } from "./redux/actions.js";
import { ListMultipleSelect } from "../ListSelect/ListMultipleSelect.js";

import "./css/analytics.css";



const NumericalEstimations = loadable(
	() => import( /* webpackChunkName: "NumericalEstimations" */ "./Reports/NumericalEstimations/NumericalEstimations.jsx" ),
	{
		LoadingComponent: ModuleLoadingWaiter
	} );


const GraficalEstimations = loadable(
	() => import( /* webpackChunkName: "GraficalEstimations" */ "./Reports/GraficalEstimations/GraficalEstimations.jsx" ),
	{
		LoadingComponent: ModuleLoadingWaiter
	} );


const DspmEstimations = loadable(
	() => import( /* webpackChunkName: "NumericalEstimations" */ "./Reports/DspmEstimations/DspmEstimations.jsx" ),
	{
		LoadingComponent: ModuleLoadingWaiter
	} );


const NONE = 0;
const REPORT_NUMERICAL = 1;
const REPORT_QUALITY = 2;
const REPORT_DSPM = 3;
const DISTRIBUTION_ANALYSIS = 4;


const numericCharacteristics =
[
	{ id: 2, title: "Цена полная" },
	{ id: 3, title: "Цена удельная" },
	{ id: 24, title: "Площадь" },
	{ id: 5, title: "Удельная кадастровая стоимость" },
	{ id: 4, title: "Кадастровая стоимость" },
	{ id: 19, title: "До остановки, м" },
	{ id: 22, title: "До магистрали, м" },
	{ id: 47, title: "Износ, %" },
	{ id: 26, title: "Высота потолков" },
	{ id: 56, title: "Объём" },
	{ id: 42, title: "GLA/GBA" }
];


const qualityCharacteristics =
[
	{ id: 14, title: "Класс дома" },
	{ id: 12, title: "Подвид ГП" },
	{ id: 13, title: "Вид ГП" },
	{ id: 6, title: "Тип рынка" },
	{ id: 15, title: "Вид права" },
	{ id: 11, title: "Качество управления" },
	{ id: 23, title: "Вид ЗУ" },
	{ id: 28, title: "Материал стен" },
	{ id: 33, title: "Этажность" },
	{ id: 29, title: "Группа капитальности" },
	{ id: 44, title: "Архитектурный стиль" },
	{ id: 16, title: "Административный округ" },
	{ id: 57, title: "Район" },
	{ id: 17, title: "Ценовая зона" },
	{ id: 20, title: "Пешеходный трафик" },
	{ id: 21, title: "Автомобильный трафик" },
	{ id: 40, title: "Парковка" },
	{ id: 41, title: "Удобство парковки" },
	{ id: 46, title: "Наличие ж/д путей" },
	{ id: 37, title: "Уровень отделки" },
	{ id: 36, title: "Планировка" },
	{ id: 25, title: "Комнатность" },
	{ id: 32, title: "Этаж" },
	{ id: 31, title: "Туалет/Санузел" },
	{ id: 34, title: "Балкон/лоджия" },
	{ id: 38, title: "Состояние МОП" },
	{ id: 43, title: "Входная группа" },
	{ id: 48, title: "Электроснабжение" },
	{ id: 49, title: "Водоснабжение" },
	{ id: 50, title: "Водоотведение" },
	{ id: 51, title: "Отопление" },
	{ id: 52, title: "Газоснабжение" },
	{ id: 53, title: "Инженерные системы" },
	{ id: 54, title: "Интернет" },
	{ id: 55, title: "Управление коммуникациями" },
	{ id: 45, title: "Доп. Улучшения" },
	{ id: 27, title: "Год постройки" }
];


const statisticalIndicators =
[
	{ id: 2, title: "Среднее арифметическое" },
	{ id: 3, title: "Погрешность, ед" },
	{ id: 4, title: "Погрешность, %" },
	{ id: 6, title: "Средневзвешенное" },
	{ id: 22, title: "Центр модального интервала" },
	{ id: 7, title: "Центр лог.норм. распределения" },
	{ id: 13, title: "Максимум" },
	{ id: 12, title: "3 квартиль" },
	{ id: 11, title: "Медиана" },
	{ id: 10, title: "1 квартиль" },
	{ id: 9, title: "Минимум" },
	{ id: 15, title: "Стандартное отклонение" },
	{ id: 16, title: "Дисперсия" },
	{ id: 18, title: "Коэффициент вариации" },
	{ id: 17, title: "Коэффициент осцилляции" },
	{ id: 5, title: "Мода" },
	{ id: 1, title: "Количество" },
	{ id: 20, title: "Асимметричность" },
	{ id: 19, title: "Эксцесс" },
	{ id: 21, title: "Количество сигм" },
	{ id: 8, title: "Размах" },
	{ id: 14, title: "Сумма" }
];


const parametersDSPM =
[
	{ id: 1, title: "Район" },
	{ id: 2, title: "Округ" },
	{ id: 3, title: "Муниципальный район" },
	{ id: 4, title: "Ценовая зона" },
	{ id: 5, title: "Категория" },
	{ id: 6, title: "Вид" },
	{ id: 7, title: "Подвид" },
	{ id: 8, title: "Класс" },
	{ id: 9, title: "Комнатность" },
	{ id: 10, title: "Площадь" },
	{ id: 11, title: "Техническое состояние" },
	{ id: 12, title: "Этаж" },
	{ id: 13, title: "Прогноз отсутствующих данных" }
];


class Monitoring extends React.Component
{
	constructor( props )
	{
		super( props );

		this.state =
		{
			numericParameters: [],
			qualitativeParameters: [],
			statistical_indicator: [],
			keyParameters: []
		};
	}


	setNumericParameters = ( values ) => this.setState( { numericParameters: values } );
	setQualitativeParameters = ( values ) => this.setState( { qualitativeParameters: values } );
	setStatisticalIndicators = ( values ) => this.setState( { statistical_indicator: values } );
	setKeyParameters = ( values ) => this.setState( { keyParameters: values } );


	render(): React.Node
	{
		let analyticsReport = null;

		if( this.props.analyticsData && this.props.analyticsData.reportNumber )
		{
			if( this.props.analyticsData.reportNumber === REPORT_NUMERICAL )
				analyticsReport = <NumericalEstimations />;
			else
			if( this.props.analyticsData.reportNumber === REPORT_QUALITY )
				analyticsReport = <GraficalEstimations />;
			else
			if( this.props.analyticsData.reportNumber === REPORT_DSPM )
				analyticsReport = <DspmEstimations />;
		}


		return (
			<div className="analytic-office">
				<span className="analytic-office__close-window" onClick={ this.props.toggleAnalytics }></span>
				<div className="analytic-office__section">
					<ListMultipleSelect title="Характеристики числовые" value={ this.state.numericParameters } onChange={ this.setNumericParameters } options={ numericCharacteristics } disabled={ this.state.qualitativeParameters.length > 0 } collapseDisabled={ true } ulAdditionalClass="analytic-office__xsmall-container-list" />
					<ListMultipleSelect title="Характеристики нечисловые" value={ this.state.qualitativeParameters } onChange={ this.setQualitativeParameters } options={ qualityCharacteristics } disabled={ this.state.numericParameters.length > 0 } collapseDisabled={ true } ulAdditionalClass="analytic-office__large-container-list" />
					<ListMultipleSelect title="Показатели" value={ this.state.statistical_indicator } onChange={ this.setStatisticalIndicators } options={ statisticalIndicators } ulAdditionalClass="analytic-office__medium-container-list" />
					<ListMultipleSelect title="Дискретная пространственно-параметрическая модель" value={ this.state.keyParameters } onChange={ this.setKeyParameters } options={ parametersDSPM } ulAdditionalClass="analytic-office__small-container-list" collapseDisabled={ true } showSelectAllCheckbox={ false } />
					<div className="analytic-office__buttons-wrapper">
						<button className="analytic_button" type="button" onClick={ () => this.props.getAnalytics( this.state ) }>РАССЧИТАТЬ ПОКАЗАТЕЛИ</button>
						<button className="analytic_button" type="button" onClick={ () => this.props.getAnalytics( this.state )} >ПОСТРОИТЬ ДППМ</button>
					</div>
				</div>
				{ analyticsReport }
			</div>
		);
	}
}


function AnalyticsBlock( props ): React.Node
{
	return (
		<Monitoring { ...props } />
	);
}



const mapStateToProps = ( store ) => (
	{
		analyticsData: store.analyticsCabinet.analyticsData
	} );



const mapDispatchToProps = ( dispatch ) => (
	{
		getAnalytics: ( parameters ) => dispatch( getAnalytics( parameters ) ),
		toggleAnalytics: () => dispatch( toggleAnalytics() )
	} );


export default connect( mapStateToProps, mapDispatchToProps )( AnalyticsBlock );