
import React from "react";

import { connect } from "react-redux";

import thousandSeparator from "lk/components/util/thousandSeparator.js";

import { clearAnalyticsResult } from "../../redux/actions.js";

import "./css/NumericalEstimations.css";



function NumericalEstimations( props )
{
	return (
		<div className="analytic-office__section report1-block">
			<span className="analytic-office__close-report" onClick={ props.clearAnalyticsResult }></span>
			<p className="analytic-office__report-title">
				Отчет №1 Показатели числовых характеристик
			</p>
			<div className="grid-cols-24 report1-table-wrapper">
				<table className="report1-table">
					<thead>
						<tr>
							<th>№ п/п</th>
							<th>Статистические показатели выборки</th>
							<th>Цена полная, ☧</th>
							<th>Цена удельная, /м²</th>
							<th>Кадастровая стоимость, ☧</th>
							<th>УПКС, ☧/м²</th>
							<th>До остановки, м</th>
							<th>До магистрали, м</th>
							<th>Площадь, м²</th>
							<th>Высота потолков, м</th>
							<th>GLA/GBA, %</th>
							<th>Износ, %</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>1</td>
							<td>Количество</td>
							<td>{ thousandSeparator( props.count_for_cost ) }</td>
							<td>{ thousandSeparator( props.count_for_unit_cost ) }</td>
							<td>{ thousandSeparator( props.count_for_cadastral ) }</td>
							<td>{ thousandSeparator( props.count_for_sicv ) }</td>
							<td>{ thousandSeparator( props.count_for_dist_stop ) }</td>
							<td>{ thousandSeparator( props.count_for_dist_road ) }</td>
							<td>{ thousandSeparator( props.count_for_space ) }</td>
							<td>{ thousandSeparator( props.count_for_height ) }</td>
							<td>{ thousandSeparator( props.count_for_gla_in_gba ) }</td>
							<td>{ thousandSeparator( props.count_for_wear ) }</td>
						</tr>
						<tr>
							<td>2</td>
							<td>Среднее арифметическое</td>
							<td>{ thousandSeparator( props.average_for_cost ) }</td>
							<td>{ thousandSeparator( props.average_for_unit_cost ) }</td>
							<td>{ thousandSeparator( props.average_for_cadastral ) }</td>
							<td>{ thousandSeparator( props.average_for_sicv ) }</td>
							<td>{ thousandSeparator( props.average_for_dist_stop ) }</td>
							<td>{ thousandSeparator( props.average_for_dist_road ) }</td>
							<td>{ thousandSeparator( props.average_for_space ) }</td>
							<td>{ thousandSeparator( props.average_for_height ) }</td>
							<td>{ thousandSeparator( props.average_for_gla_in_gba ) }</td>
							<td>{ thousandSeparator( props.average_for_wear ) }</td>
						</tr>
						<tr>
							<td>3</td>
							<td>Погрешность, ед</td>
							<td>{ thousandSeparator( props.average_error_for_cost ) }</td>
							<td>{ thousandSeparator( props.average_error_for_unit_cost ) }</td>
							<td>{ thousandSeparator( props.average_error_for_cadastral ) }</td>
							<td>{ thousandSeparator( props.average_error_for_sicv ) }</td>
							<td>{ thousandSeparator( props.average_error_for_dist_stop ) }</td>
							<td>{ thousandSeparator( props.average_error_for_dist_road ) }</td>
							<td>{ thousandSeparator( props.average_error_for_space ) }</td>
							<td>{ thousandSeparator( props.average_error_for_height ) }</td>
							<td>{ thousandSeparator( props.average_error_for_gla_in_gba ) }</td>
							<td>{ thousandSeparator( props.average_error_for_wear ) }</td>
						</tr>
						<tr>
							<td>4</td>
							<td>Погрешность, %</td>
							<td>{ thousandSeparator( props.average_error_in_percent_for_cost ) }</td>
							<td>{ thousandSeparator( props.average_error_in_percent_for_unit_cost ) }</td>
							<td>{ thousandSeparator( props.average_error_in_percent_for_cadastral ) }</td>
							<td>{ thousandSeparator( props.average_error_in_percent_for_sicv ) }</td>
							<td>{ thousandSeparator( props.average_error_in_percent_for_dist_stop ) }</td>
							<td>{ thousandSeparator( props.average_error_in_percent_for_dist_road ) }</td>
							<td>{ thousandSeparator( props.average_error_in_percent_for_space ) }</td>
							<td>{ thousandSeparator( props.average_error_in_percent_for_height ) }</td>
							<td>{ thousandSeparator( props.average_error_in_percent_for_gla_in_gba ) }</td>
							<td>{ thousandSeparator( props.average_error_in_percent_for_wear ) }</td>
						</tr>
						<tr>
							<td>5</td>
							<td>Мода</td>
							<td>{ thousandSeparator( props.mode_for_cost ) }</td>
							<td>{ thousandSeparator( props.mode_for_unit_cost ) }</td>
							<td>{ thousandSeparator( props.mode_for_cadastral ) }</td>
							<td>{ thousandSeparator( props.mode_for_sicv ) }</td>
							<td>{ thousandSeparator( props.mode_for_dist_stop ) }</td>
							<td>{ thousandSeparator( props.mode_for_dist_road ) }</td>
							<td>{ thousandSeparator( props.mode_for_space ) }</td>
							<td>{ thousandSeparator( props.mode_for_height ) }</td>
							<td>{ thousandSeparator( props.mode_for_gla_in_gba ) }</td>
							<td>{ thousandSeparator( props.mode_for_wear ) }</td>
						</tr>
						<tr>
							<td>6</td>
							<td>Средневзвешенное</td>
							<td></td>
							<td>{ thousandSeparator( props.weighted_average_for_unit_cost ) }</td>
							<td></td>
							<td>{ thousandSeparator( props.weighted_average_for_sicv ) }</td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td>7</td>
							<td>Центр лог.норм. распределения</td>
							<td>{ thousandSeparator( props.modal_interval_center_for_cost ) }</td>
							<td>{ thousandSeparator( props.modal_interval_center_for_unit_cost ) }</td>
							<td>{ thousandSeparator( props.modal_interval_center_for_cadastral ) }</td>
							<td>{ thousandSeparator( props.modal_interval_center_for_sicv ) }</td>
							<td>{ thousandSeparator( props.modal_interval_center_for_dist_stop ) }</td>
							<td>{ thousandSeparator( props.modal_interval_center_for_dist_road ) }</td>
							<td>{ thousandSeparator( props.modal_interval_center_for_space ) }</td>
							<td>{ thousandSeparator( props.modal_interval_center_for_height ) }</td>
							<td>{ thousandSeparator( props.modal_interval_center_for_gla_in_gba ) }</td>
							<td>{ thousandSeparator( props.modal_interval_center_for_wear ) }</td>
						</tr>
						<tr>
							<td>8</td>
							<td>Размах</td>
							<td>{ thousandSeparator( props.interval_for_cost ) }</td>
							<td>{ thousandSeparator( props.interval_for_unit_cost ) }</td>
							<td>{ thousandSeparator( props.interval_for_cadastral ) }</td>
							<td>{ thousandSeparator( props.interval_for_sicv ) }</td>
							<td>{ thousandSeparator( props.interval_for_dist_stop ) }</td>
							<td>{ thousandSeparator( props.interval_for_dist_road ) }</td>
							<td>{ thousandSeparator( props.interval_for_space ) }</td>
							<td>{ thousandSeparator( props.interval_for_height ) }</td>
							<td>{ thousandSeparator( props.interval_for_gla_in_gba ) }</td>
							<td>{ thousandSeparator( props.interval_for_wear ) }</td>
						</tr>
						<tr>
							<td>9</td>
							<td>Минимум</td>
							<td>{ thousandSeparator( props.minimum_for_cost ) }</td>
							<td>{ thousandSeparator( props.minimum_for_unit_cost ) }</td>
							<td>{ thousandSeparator( props.minimum_for_cadastral ) }</td>
							<td>{ thousandSeparator( props.minimum_for_sicv ) }</td>
							<td>{ thousandSeparator( props.minimum_for_dist_stop ) }</td>
							<td>{ thousandSeparator( props.minimum_for_dist_road ) }</td>
							<td>{ thousandSeparator( props.minimum_for_space ) }</td>
							<td>{ thousandSeparator( props.minimum_for_height ) }</td>
							<td>{ thousandSeparator( props.minimum_for_gla_in_gba ) }</td>
							<td>{ thousandSeparator( props.minimum_for_wear ) }</td>
						</tr>
						<tr>
							<td>10</td>
							<td>1 квартиль</td>
							<td>{ thousandSeparator( props.first_quartile_for_cost ) }</td>
							<td>{ thousandSeparator( props.first_quartile_for_unit_cost ) }</td>
							<td>{ thousandSeparator( props.first_quartile_for_cadastral ) }</td>
							<td>{ thousandSeparator( props.first_quartile_for_sicv ) }</td>
							<td>{ thousandSeparator( props.first_quartile_for_dist_stop ) }</td>
							<td>{ thousandSeparator( props.first_quartile_for_dist_road ) }</td>
							<td>{ thousandSeparator( props.first_quartile_for_space ) }</td>
							<td>{ thousandSeparator( props.first_quartile_for_height ) }</td>
							<td>{ thousandSeparator( props.first_quartile_for_gla_in_gba ) }</td>
							<td>{ thousandSeparator( props.first_quartile_for_wear ) }</td>
						</tr>
						<tr>
							<td>11</td>
							<td>Медиана</td>
							<td>{ thousandSeparator( props.median_for_cost ) }</td>
							<td>{ thousandSeparator( props.median_for_unit_cost ) }</td>
							<td>{ thousandSeparator( props.median_for_cadastral ) }</td>
							<td>{ thousandSeparator( props.median_for_sicv ) }</td>
							<td>{ thousandSeparator( props.median_for_dist_stop ) }</td>
							<td>{ thousandSeparator( props.median_for_dist_road ) }</td>
							<td>{ thousandSeparator( props.median_for_space ) }</td>
							<td>{ thousandSeparator( props.median_for_height ) }</td>
							<td>{ thousandSeparator( props.median_for_gla_in_gba ) }</td>
							<td>{ thousandSeparator( props.median_for_wear ) }</td>
						</tr>
						<tr>
							<td>12</td>
							<td>3 квартиль</td>
							<td>{ thousandSeparator( props.third_quartile_for_cost ) }</td>
							<td>{ thousandSeparator( props.third_quartile_for_unit_cost ) }</td>
							<td>{ thousandSeparator( props.third_quartile_for_cadastral ) }</td>
							<td>{ thousandSeparator( props.third_quartile_for_sicv ) }</td>
							<td>{ thousandSeparator( props.third_quartile_for_dist_stop ) }</td>
							<td>{ thousandSeparator( props.third_quartile_for_dist_road ) }</td>
							<td>{ thousandSeparator( props.third_quartile_for_space ) }</td>
							<td>{ thousandSeparator( props.third_quartile_for_height ) }</td>
							<td>{ thousandSeparator( props.third_quartile_for_gla_in_gba ) }</td>
							<td>{ thousandSeparator( props.third_quartile_for_wear ) }</td>
						</tr>
						<tr>
							<td>13</td>
							<td>Максимум</td>
							<td>{ thousandSeparator( props.maximum_for_cost ) }</td>
							<td>{ thousandSeparator( props.maximum_for_unit_cost ) }</td>
							<td>{ thousandSeparator( props.maximum_for_cadastral ) }</td>
							<td>{ thousandSeparator( props.maximum_for_sicv ) }</td>
							<td>{ thousandSeparator( props.maximum_for_dist_stop ) }</td>
							<td>{ thousandSeparator( props.maximum_for_dist_road ) }</td>
							<td>{ thousandSeparator( props.maximum_for_space ) }</td>
							<td>{ thousandSeparator( props.maximum_for_height ) }</td>
							<td>{ thousandSeparator( props.maximum_for_gla_in_gba ) }</td>
							<td>{ thousandSeparator( props.maximum_for_wear ) }</td>
						</tr>
						<tr>
							<td>14</td>
							<td>Сумма</td>
							<td>{ thousandSeparator( props.sum_for_cost ) }</td>
							<td>{ thousandSeparator( props.sum_for_unit_cost ) }</td>
							<td>{ thousandSeparator( props.sum_for_cadastral ) }</td>
							<td>{ thousandSeparator( props.sum_for_sicv ) }</td>
							<td>{ thousandSeparator( props.sum_for_dist_stop ) }</td>
							<td>{ thousandSeparator( props.sum_for_dist_road ) }</td>
							<td>{ thousandSeparator( props.sum_for_space ) }</td>
							<td>{ thousandSeparator( props.sum_for_height ) }</td>
							<td>{ thousandSeparator( props.sum_for_gla_in_gba ) }</td>
							<td>{ thousandSeparator( props.sum_for_wear ) }</td>
						</tr>
						<tr>
							<td>15</td>
							<td>Стандартное отклонение</td>
							<td>{ thousandSeparator( props.standard_deviation_for_cost ) }</td>
							<td>{ thousandSeparator( props.standard_deviation_for_unit_cost ) }</td>
							<td>{ thousandSeparator( props.standard_deviation_for_cadastral ) }</td>
							<td>{ thousandSeparator( props.standard_deviation_for_sicv ) }</td>
							<td>{ thousandSeparator( props.standard_deviation_for_dist_stop ) }</td>
							<td>{ thousandSeparator( props.standard_deviation_for_dist_road ) }</td>
							<td>{ thousandSeparator( props.standard_deviation_for_space ) }</td>
							<td>{ thousandSeparator( props.standard_deviation_for_height ) }</td>
							<td>{ thousandSeparator( props.standard_deviation_for_gla_in_gba ) }</td>
							<td>{ thousandSeparator( props.standard_deviation_for_wear ) }</td>
						</tr>
						<tr>
							<td>16</td>
							<td>Дисперсия</td>
							<td>{ thousandSeparator( props.dispersion_for_cost ) }</td>
							<td>{ thousandSeparator( props.dispersion_for_unit_cost ) }</td>
							<td>{ thousandSeparator( props.dispersion_for_cadastral ) }</td>
							<td>{ thousandSeparator( props.dispersion_for_sicv ) }</td>
							<td>{ thousandSeparator( props.dispersion_for_dist_stop ) }</td>
							<td>{ thousandSeparator( props.dispersion_for_dist_road ) }</td>
							<td>{ thousandSeparator( props.dispersion_for_space ) }</td>
							<td>{ thousandSeparator( props.dispersion_for_height ) }</td>
							<td>{ thousandSeparator( props.dispersion_for_gla_in_gba ) }</td>
							<td>{ thousandSeparator( props.dispersion_for_wear ) }</td>
						</tr>
						<tr>
							<td>17</td>
							<td>Коэффициент осцилляции</td>
							<td>{ props.oscillation_coefficient_for_cost }</td>
							<td>{ props.oscillation_coefficient_for_unit_cost }</td>
							<td>{ props.oscillation_coefficient_for_cadastral }</td>
							<td>{ props.oscillation_coefficient_for_sicv }</td>
							<td>{ props.oscillation_coefficient_for_dist_stop }</td>
							<td>{ props.oscillation_coefficient_for_dist_road }</td>
							<td>{ props.oscillation_coefficient_for_space }</td>
							<td>{ props.oscillation_coefficient_for_height }</td>
							<td>{ props.oscillation_coefficient_for_gla_in_gba }</td>
							<td>{ props.oscillation_coefficient_for_wear }</td>
						</tr>
						<tr>
							<td>18</td>
							<td>Коэффициент вариации</td>
							<td>{ props.variation_coefficient_for_cost }</td>
							<td>{ props.variation_coefficient_for_unit_cost }</td>
							<td>{ props.variation_coefficient_for_cadastral }</td>
							<td>{ props.variation_coefficient_for_sicv }</td>
							<td>{ props.variation_coefficient_for_dist_stop }</td>
							<td>{ props.variation_coefficient_for_dist_road }</td>
							<td>{ props.variation_coefficient_for_space }</td>
							<td>{ props.variation_coefficient_for_height }</td>
							<td>{ props.variation_coefficient_for_gla_in_gba }</td>
							<td>{ props.variation_coefficient_for_wear }</td>
						</tr>
						<tr>
							<td>19</td>
							<td>Эксцесс</td>
							<td>{ props.excess_for_cost }</td>
							<td>{ props.excess_for_unit_cost }</td>
							<td>{ props.excess_for_cadastral }</td>
							<td>{ props.excess_for_sicv }</td>
							<td>{ props.excess_for_dist_stop }</td>
							<td>{ props.excess_for_dist_road }</td>
							<td>{ props.excess_for_space }</td>
							<td>{ props.excess_for_height }</td>
							<td>{ props.excess_for_gla_in_gba }</td>
							<td>{ props.excess_for_wear }</td>
						</tr>
						<tr>
							<td>20</td>
							<td>Асимметричность</td>
							<td>{ props.asymmetry_for_cost }</td>
							<td>{ props.asymmetry_for_unit_cost }</td>
							<td>{ props.asymmetry_for_cadastral }</td>
							<td>{ props.asymmetry_for_sicv }</td>
							<td>{ props.asymmetry_for_dist_stop }</td>
							<td>{ props.asymmetry_for_dist_road }</td>
							<td>{ props.asymmetry_for_space }</td>
							<td>{ props.asymmetry_for_height }</td>
							<td>{ props.asymmetry_for_gla_in_gba }</td>
							<td>{ props.asymmetry_for_wear }</td>
						</tr>
						<tr>
							<td>21</td>
							<td>Количество СКО</td>
							<td>{ props.number_of_sigma_for_cost }</td>
							<td>{ props.number_of_sigma_for_unit_cost }</td>
							<td>{ props.number_of_sigma_for_cadastral }</td>
							<td>{ props.number_of_sigma_for_sicv }</td>
							<td>{ props.number_of_sigma_for_dist_stop }</td>
							<td>{ props.number_of_sigma_for_dist_road }</td>
							<td>{ props.number_of_sigma_for_space }</td>
							<td>{ props.number_of_sigma_for_height }</td>
							<td>{ props.number_of_sigma_for_gla_in_gba }</td>
							<td>{ props.number_of_sigma_for_wear }</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
}


const mapStateToProps = ( store ) => store.analyticsCabinet.analyticsData;

const mapDispatchToProps = ( dispatch ) => (
	{
		clearAnalyticsResult: () => dispatch( clearAnalyticsResult() )
	} );

export default connect( mapStateToProps, mapDispatchToProps )( NumericalEstimations );