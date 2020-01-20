
import React from "react";
import { connect } from "react-redux";

import thousandSeparator from "../util/thousandSeparator.js";

import roundingRules from "../util/roundingRules.js";

import { toggleStatistics } from "./redux/actions.js";

import { DEFAULT_MANTISSA, NULL_MANTISSA, DEFAULT_BOUNDARY, NULL_BOUNDARY, IS_WHOLE } from "lk/constants.js";

function StatisticsBlock( props )
{
	return (
		<div className="b-searching-results__statistics">
			<div className="b-searching-results__statistics-wrapper">
				<div className="b-searching-results__statistics-container">

					{
					// <div className="b-section__fadeout">
					// 	<div className="centering__yes">
					// 		<div className="spinner spinner_size_l spinner_progress_yes">Загрузка…</div>
					// 	</div>
					// </div>
					}

					<div className="b-searching-results__statistics-section">
						<span className="b-searching-results__statistic-section-title">Найдено:</span>
						<div className="b-searching-results__statistic-section-values">
							<ul>
								<li>
									<span className="b-searching-results__statistic-section-item-title">Всего</span>
									<span className="b-searching-results__statistic-section-item-value">{ thousandSeparator( props.total_count ) }</span>
								</li>
								<li>
									<span className="b-searching-results__statistic-section-item-title">Релев-х А/О</span>
									<span className="b-searching-results__statistic-section-item-value">{ thousandSeparator( props.relevant_count ) }</span>
								</li>
								<li>
									<span className="b-searching-results__statistic-section-item-title">Заполнено, %</span>
									<span className="b-searching-results__statistic-section-item-value">{ thousandSeparator( props.fill_percentage ) }</span>
								</li>
								<li>
									<span className="b-searching-results__statistic-section-item-title">Подвидов</span>
									<span className="b-searching-results__statistic-section-item-value">Нет данных</span>
								</li>
								<li>
									<span className="b-searching-results__statistic-section-item-title">Ценовых зон</span>
									<span className="b-searching-results__statistic-section-item-value">Нет данных</span>
								</li>
								<li>
									<span className="b-searching-results__statistic-section-item-title">Дата от</span>
									<span className="b-searching-results__statistic-section-item-value">{ props.date_from }</span>
								</li>
								<li>
									<span className="b-searching-results__statistic-section-item-title">Дата до</span>
									<span className="b-searching-results__statistic-section-item-value">{ props.date_to }</span>
								</li>
								<li>
									<span className="b-searching-results__statistic-section-item-title">Ср. срок эксп.</span>
									<span className="b-searching-results__statistic-section-item-value">{ props.avg_exposure_time }</span>
								</li>
							</ul>
						</div>
					</div>
					<div className="b-searching-results__statistics-section">
						<span className="b-searching-results__statistic-section-title">Цена удельная, м/руб.<sup>2</sup>:</span>
						<div className="b-searching-results__statistic-section-values">
							<ul>
								<li>
									<span className="b-searching-results__statistic-section-item-title">Эталонное</span>
									<span className="b-searching-results__statistic-section-item-value">{ roundingRules( props.unit_cost_modal_interval_center, DEFAULT_BOUNDARY, DEFAULT_MANTISSA ) }</span>
								</li>
								<li>
									<span className="b-searching-results__statistic-section-item-title">Ср. арифм.</span>
									<span className="b-searching-results__statistic-section-item-value">{ roundingRules( props.unit_cost_average, DEFAULT_BOUNDARY, DEFAULT_MANTISSA ) }</span>
								</li>
								<li>
									<span className="b-searching-results__statistic-section-item-title statistic-selection statistic-title" data-title="Средневзвешенное по площади">Ср. взвеш.</span>
									<span className="b-searching-results__statistic-section-item-value">{ roundingRules( props.unit_cost_weighted_average, DEFAULT_BOUNDARY, DEFAULT_MANTISSA ) }</span>
								</li>
								<li>
									<span className="b-searching-results__statistic-section-item-title">СКО</span>
									<span className="b-searching-results__statistic-section-item-value">{ roundingRules( props.unit_cost_stdev, DEFAULT_BOUNDARY, DEFAULT_MANTISSA ) }</span>
								</li>
								<li>
									<span className="b-searching-results__statistic-section-item-title">К. вариации</span>
									<span className="b-searching-results__statistic-section-item-value">{ thousandSeparator( props.unit_cost_variation_coefficient, DEFAULT_MANTISSA ) }</span>
								</li>
								<li>
									<span className="b-searching-results__statistic-section-item-title">К. осцилляц.</span>
									<span className="b-searching-results__statistic-section-item-value">{ thousandSeparator( props.unit_cost_oscillation_coefficient, DEFAULT_MANTISSA ) }</span>
								</li>
								<li>
									<span className="b-searching-results__statistic-section-item-title">Эксцесс</span>
									<span className="b-searching-results__statistic-section-item-value">{ thousandSeparator( props.unit_cost_excess, DEFAULT_MANTISSA ) }</span>
								</li>
								<li>
									<span className="b-searching-results__statistic-section-item-title">Асимм-ть</span>
									<span className="b-searching-results__statistic-section-item-value">{ thousandSeparator( props.unit_cost_asymmetry, DEFAULT_MANTISSA ) }</span>
								</li>
							</ul>
						</div>
					</div>
					<div className="b-searching-results__statistics-section">
						<span className="b-searching-results__statistic-section-title">&nbsp;</span>
						<div className="b-searching-results__statistic-section-values">
							<ul>
								<li>
									<span className="b-searching-results__statistic-section-item-title">Max</span>
									<span className="b-searching-results__statistic-section-item-value">{ roundingRules( props.unit_cost_max, DEFAULT_BOUNDARY, DEFAULT_MANTISSA ) }</span>
								</li>
								<li>
									<span className="b-searching-results__statistic-section-item-title">3 квартиль</span>
									<span className="b-searching-results__statistic-section-item-value">{ roundingRules( props.unit_cost_quartile3, DEFAULT_BOUNDARY, DEFAULT_MANTISSA ) }</span>
								</li>
								<li>
									<span className="b-searching-results__statistic-section-item-title statistic-selection">Медиана</span>
									<span className="b-searching-results__statistic-section-item-value">{ roundingRules( props.unit_cost_mediana, DEFAULT_BOUNDARY, DEFAULT_MANTISSA ) }</span>
								</li>
								<li>
									<span className="b-searching-results__statistic-section-item-title">1 квартиль</span>
									<span className="b-searching-results__statistic-section-item-value">{ roundingRules( props.unit_cost_quartile1, DEFAULT_BOUNDARY, DEFAULT_MANTISSA ) }</span>
								</li>
								<li>
									<span className="b-searching-results__statistic-section-item-title">Min</span>
									<span className="b-searching-results__statistic-section-item-value">{ roundingRules( props.unit_cost_min, DEFAULT_BOUNDARY, DEFAULT_MANTISSA ) }</span>
								</li>
								<li>
									<span className="b-searching-results__statistic-section-item-title">Интервал</span>
									<span className="b-searching-results__statistic-section-item-value">{ roundingRules( props.unit_cost_interval, DEFAULT_BOUNDARY, DEFAULT_MANTISSA ) }</span>
								</li>
								<li>
									<span className="b-searching-results__statistic-section-item-title">Погрешн., %</span>
									<span className="b-searching-results__statistic-section-item-value">{ roundingRules( props.unit_cost_average_error_in_percent, DEFAULT_BOUNDARY, DEFAULT_MANTISSA ) }</span>
								</li>
							</ul>
						</div>
					</div>
					<div className="b-searching-results__statistics-section">
						<span className="b-searching-results__statistic-section-title">Площадь, м²:</span>
						<div className="b-searching-results__statistic-section-values">
							<ul>
								<li>
									<span className="b-searching-results__statistic-section-item-title">Эталонное</span>
									<span className="b-searching-results__statistic-section-item-value">{ roundingRules( props.space_modal_interval_center, DEFAULT_BOUNDARY, DEFAULT_MANTISSA ) }</span>
								</li>
								<li>
									<span className="b-searching-results__statistic-section-item-title">Ср. арифм.</span>
									<span className="b-searching-results__statistic-section-item-value">{ roundingRules( props.space_average, DEFAULT_BOUNDARY, DEFAULT_MANTISSA ) }</span>
								</li>
								<li>
									<span className="b-searching-results__statistic-section-item-title">Мода</span>
									<span className="b-searching-results__statistic-section-item-value">{ roundingRules( props.space_mode, DEFAULT_BOUNDARY, DEFAULT_MANTISSA ) }</span>
								</li>
								<li>
									<span className="b-searching-results__statistic-section-item-title">СКО</span>
									<span className="b-searching-results__statistic-section-item-value">{ roundingRules( props.space_stdev, DEFAULT_BOUNDARY, DEFAULT_MANTISSA ) }</span>
								</li>
								<li>
									<span className="b-searching-results__statistic-section-item-title">К. вариации</span>
									<span className="b-searching-results__statistic-section-item-value">{ thousandSeparator( props.space_variation_coefficient, DEFAULT_MANTISSA ) }</span>
								</li>
								<li>
									<span className="b-searching-results__statistic-section-item-title">К. осцилляц.</span>
									<span className="b-searching-results__statistic-section-item-value">{ thousandSeparator( props.space_variation_coefficient, DEFAULT_MANTISSA ) }</span>
								</li>
								<li>
									<span className="b-searching-results__statistic-section-item-title">Эксцесс</span>
									<span className="b-searching-results__statistic-section-item-value">{ thousandSeparator( props.space_excess, DEFAULT_MANTISSA ) }</span>
								</li>
								<li>
									<span className="b-searching-results__statistic-section-item-title">Асимм-ть</span>
									<span className="b-searching-results__statistic-section-item-value">{ thousandSeparator( props.space_asymmetry, DEFAULT_MANTISSA ) }</span>
								</li>
							</ul>
						</div>
					</div>
					<div className="b-searching-results__statistics-section">
						<span className="b-searching-results__statistic-section-title">&nbsp;</span>
						<div className="b-searching-results__statistic-section-values">
							<ul>
								<li>
									<span className="b-searching-results__statistic-section-item-title">Max</span>
									<span className="b-searching-results__statistic-section-item-value">{ roundingRules( props.space_max, DEFAULT_BOUNDARY, DEFAULT_MANTISSA ) }</span>
								</li>
								<li>
									<span className="b-searching-results__statistic-section-item-title">3 квартиль</span>
									<span className="b-searching-results__statistic-section-item-value">{ roundingRules( props.space_quartile3, DEFAULT_BOUNDARY, DEFAULT_MANTISSA ) }</span>
								</li>
								<li>
									<span className="b-searching-results__statistic-section-item-title statistic-selection">Медиана</span>
									<span className="b-searching-results__statistic-section-item-value">{ roundingRules( props.space_mediana, DEFAULT_BOUNDARY, DEFAULT_MANTISSA ) }</span>
								</li>
								<li>
									<span className="b-searching-results__statistic-section-item-title">1 квартиль</span>
									<span className="b-searching-results__statistic-section-item-value">{ roundingRules( props.space_quartile1, DEFAULT_BOUNDARY, DEFAULT_MANTISSA ) }</span>
								</li>
								<li>
									<span className="b-searching-results__statistic-section-item-title">Min</span>
									<span className="b-searching-results__statistic-section-item-value">{ roundingRules( props.space_min, DEFAULT_BOUNDARY, DEFAULT_MANTISSA ) }</span>
								</li>
								<li>
									<span className="b-searching-results__statistic-section-item-title">Интервал</span>
									<span className="b-searching-results__statistic-section-item-value">{ roundingRules( props.space_interval, DEFAULT_BOUNDARY, DEFAULT_MANTISSA ) }</span>
								</li>
								<li>
									<span className="b-searching-results__statistic-section-item-title">Погрешн., %</span>
									<span className="b-searching-results__statistic-section-item-value">{ roundingRules( props.space_average_error_in_percent, DEFAULT_BOUNDARY, DEFAULT_MANTISSA ) }</span>
								</li>
								<li>
									<span className="b-searching-results__statistic-section-item-title">Сумма, м²</span>
									<span className="b-searching-results__statistic-section-item-value">{ roundingRules( props.space_sum, DEFAULT_BOUNDARY, DEFAULT_MANTISSA ) }</span>
								</li>
							</ul>
						</div>
					</div>
					<div className="b-searching-results__statistics-section">
						<span className="b-searching-results__statistic-section-title">Цена полная, руб.:</span>
						<div className="b-searching-results__statistic-section-values">
							<ul>
								<li>
									<span className="b-searching-results__statistic-section-item-title">Эталонное</span>
									<span className="b-searching-results__statistic-section-item-value">{ roundingRules( props.cost_modal_interval_center, DEFAULT_BOUNDARY, DEFAULT_MANTISSA ) }</span>
								</li>
								<li>
									<span className="b-searching-results__statistic-section-item-title">Ср. арифм.</span>
									<span className="b-searching-results__statistic-section-item-value">{ roundingRules( props.cost_average, DEFAULT_BOUNDARY, DEFAULT_MANTISSA ) }</span>
								</li>
								<li>
									<span className="b-searching-results__statistic-section-item-title">Мода</span>
									<span className="b-searching-results__statistic-section-item-value">{ roundingRules( props.cost_mode, DEFAULT_BOUNDARY, DEFAULT_MANTISSA ) }</span>
								</li>
								<li>
									<span className="b-searching-results__statistic-section-item-title">СКО</span>
									<span className="b-searching-results__statistic-section-item-value">{ roundingRules( props.cost_stdev, DEFAULT_BOUNDARY, DEFAULT_MANTISSA ) }</span>
								</li>
								<li>
									<span className="b-searching-results__statistic-section-item-title">К. вариации</span>
									<span className="b-searching-results__statistic-section-item-value">{ thousandSeparator( props.cost_variation_coefficient, DEFAULT_MANTISSA ) }</span>
								</li>
								<li>
									<span className="b-searching-results__statistic-section-item-title">К. осцилляц.</span>
									<span className="b-searching-results__statistic-section-item-value">{ thousandSeparator( props.cost_oscillation_coefficient, DEFAULT_MANTISSA ) }</span>
								</li>
								<li>
									<span className="b-searching-results__statistic-section-item-title">Эксцесс</span>
									<span className="b-searching-results__statistic-section-item-value">{ thousandSeparator( props.cost_excess, DEFAULT_MANTISSA ) }</span>
								</li>
								<li>
									<span className="b-searching-results__statistic-section-item-title">Асимм-ть</span>
									<span className="b-searching-results__statistic-section-item-value">{ thousandSeparator( props.cost_asymmetry, DEFAULT_MANTISSA ) }</span>
								</li>
							</ul>
						</div>
					</div>
					<div className="b-searching-results__statistics-section">
						<span className="b-searching-results__statistic-section-title">&nbsp;</span>
						<div className="b-searching-results__statistic-section-values">
							<ul>
								<li>
									<span className="b-searching-results__statistic-section-item-title">Max</span>
									<span className="b-searching-results__statistic-section-item-value">{ roundingRules(  props.cost_max, DEFAULT_BOUNDARY, DEFAULT_MANTISSA ) }</span>
								</li>
								<li>
									<span className="b-searching-results__statistic-section-item-title">3 квартиль</span>
									<span className="b-searching-results__statistic-section-item-value">{ roundingRules( props.cost_quartile3, DEFAULT_BOUNDARY, DEFAULT_MANTISSA ) }</span>
								</li>
								<li>
									<span className="b-searching-results__statistic-section-item-title statistic-selection">Медиана</span>
									<span className="b-searching-results__statistic-section-item-value">{ roundingRules( props.cost_mediana, DEFAULT_BOUNDARY, DEFAULT_MANTISSA ) }</span>
								</li>
								<li>
									<span className="b-searching-results__statistic-section-item-title">1 квартиль</span>
									<span className="b-searching-results__statistic-section-item-value">{ roundingRules( props.cost_quartile1, DEFAULT_BOUNDARY, DEFAULT_MANTISSA ) }</span>
								</li>
								<li>
									<span className="b-searching-results__statistic-section-item-title">Min</span>
									<span className="b-searching-results__statistic-section-item-value">{ roundingRules( props.cost_min, DEFAULT_BOUNDARY, DEFAULT_MANTISSA ) }</span>
								</li>
								<li>
									<span className="b-searching-results__statistic-section-item-title">Интервал</span>
									<span className="b-searching-results__statistic-section-item-value">{ roundingRules( props.cost_interval, DEFAULT_BOUNDARY, DEFAULT_MANTISSA ) }</span>
								</li>
								<li>
									<span className="b-searching-results__statistic-section-item-title">Погрешн., %</span>
									<span className="b-searching-results__statistic-section-item-value">{ roundingRules( props.cost_average_error_in_percent, DEFAULT_BOUNDARY, DEFAULT_MANTISSA ) }</span>
								</li>
								<li>
									<span className="b-searching-results__statistic-section-item-title">Сумма, ☧</span>
									<span className="b-searching-results__statistic-section-item-value">{ roundingRules( props.cost_sum, DEFAULT_BOUNDARY, DEFAULT_MANTISSA ) }</span>
								</li>
							</ul>
						</div>
					</div>
					<span className="b-searching-results__manual-ca"><a href="/manual_ac.html" target="_blank">Инструкция пользователя Кабинета аналитика</a></span>
					<span className="button-close" onClick={ props.toggleStatistics }><i className="icon icon-close"></i></span>
				</div>
				<div className="clear-fix"></div>
			</div>
		</div>
	);
}



const mapStateToProps = ( store ) => (
	{
		...store.analyticsCabinet.statistics
	} );



const mapDispatchToProps = ( dispatch ) => (
	{
		toggleStatistics: () => dispatch( toggleStatistics() ),

	} );


StatisticsBlock = connect( mapStateToProps, mapDispatchToProps )( StatisticsBlock );

export default StatisticsBlock;