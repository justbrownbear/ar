// @flow
import * as React from "react";

import thousandSeparator from "lk/components/util/thousandSeparator.js";
import roundingRules from "lk/components/util/roundingRules.js";
import numbers from "lk/components/util/numbers/numbers.js";

import { harmonic, geometric } from "array-means";

import { dispersion, modalIntervalCenter, excess, excessError, asymmetry, asymmetryError, weightedAverage } from "lk/components/util/numbers/numbersPlus.js";

import { DEFAULT_MANTISSA, NULL_MANTISSA, DEFAULT_BOUNDARY, NULL_BOUNDARY, IS_WHOLE } from "lk/constants.js";

export function StatisticsBlock( props )
{
	const values = props.data.map( ( element ) => element.value );
	const dividers = props.data.map( ( element ) => Number(element.divider) );
	const centre = props.centre; // центр
	const count = values.length;  // количество в выборке
	const mean = numbers.statistic.mean( values ).toFixed( 2 ); // среднее арифметическое
	const standardDeviation = numbers.statistic.standardDev( values ).toFixed( 2 ); // стандартное отклонение
	const errorOfMean = ( 2 * standardDeviation / Math.sqrt( count - 1 ) ).toFixed( 2 ); // ошибка при вычислении среднего
	const percentageErrorOfMean = ( (200 * standardDeviation / Math.sqrt( count - 1 ) ) / mean ).toFixed( 2 ); // ошибка при вычислении среднего в %
	const mode = numbers.statistic.mode( values ).toFixed( 2 ); // мода
	const modalIntervalCenterVal = modalIntervalCenter( values ).toFixed( 2 ); // центр модального интервала
	const min = numbers.basic.min( values ).toFixed( 2 ); // минимум
	const max = numbers.basic.max( values ).toFixed( 2 ); // максимум
	const interval = ( max - min ).toFixed( 2 ); // размах
	const firstQuantile = numbers.statistic.quantile( values, 1, 4 ).toFixed( 2 ); // 1 квантиль
	const median = numbers.statistic.median( values ).toFixed( 2 ); // медиана
	const thirdQuantile = numbers.statistic.quantile( values, 3, 4 ).toFixed( 2 );  // 3 квантиль
	const sum = numbers.basic.sum( values ).toFixed( 2 ); // сумма
	const dispersionVal = dispersion( values ); // дисперсия
	const oscillationFactor = ( ( max - min ) / mean ).toFixed( 2 ); // коэффициент осциляции
	const variationFactor = ( standardDeviation / mean ).toFixed( 2 ); // коэффициент вариации
	const excessVal = excess( values ).toFixed( 2 ); // эксцесс
	const asymmetryVal = asymmetry( values ).toFixed( 2 ); // асимметрия
	const numberOfSigma = ( ( max - min ) / standardDeviation ).toFixed( 2 ); // количество сигм
	const valuesLeft = values.filter( element => element < centre );
	const sumToLeft = numbers.basic.sum( valuesLeft ).toFixed( 2 ); // сумма слева
	const valuesRight =  values.filter( element => element > centre );
	const sumToRight = numbers.basic.sum( valuesRight ).toFixed( 2 ); // сумма справа
	const valuesLN = props.data.map( ( element ) => Math.log( element.value ) );
	const lognormalDistributionCentre = Math.exp( numbers.statistic.mean( valuesLN ) ).toFixed( 2 ); // центр логнормального распределения
	const geometricMean = values.length === 0 ? 0 : geometric( values );
	const harmonicMean = values.length === 0 ? 0 : harmonic( values );
	const medianOfLognormalDistribution = Math.exp( numbers.statistic.median( valuesLN ) ).toFixed( 2 ); // медиана логнормального распределения
	const numberOfSigmaOfLognormalDistribution = ( ( numbers.basic.max( valuesLN ) - numbers.basic.min( valuesLN ) ) / numbers.statistic.standardDev( valuesLN ) ).toFixed( 2 ); // количество сигм логнормального распределения
	const asymmetryOfLognormalDistribution = asymmetry( valuesLN ).toFixed( 2 ); // асимметрия логнормального распределения
	const excessOfLognormalDistribution = excess( valuesLN ).toFixed( 2 ); // эксцесс логнормального распределения
	const numberOfSigmaToLeft = ( ( centre - min ) / standardDeviation ).toFixed( 2 ); // количество сигм слева
	const numberOfSigmaToRight = ( (max - centre ) / standardDeviation ).toFixed( 2 ); // количество сигм справа
	const valuesInSigma1 = values.filter( element => element >= centre - standardDeviation && element <= parseFloat(centre) + parseFloat(standardDeviation) );
	const valuesInSigma2 = values.filter( element => element >= centre - 2 * standardDeviation && element <= parseFloat(centre) + 2 * standardDeviation );
	const valuesInSigma3 = values.filter( element => element >= centre - 3 * standardDeviation && element <= parseFloat(centre) + 3 * standardDeviation );
	const numberInOneSigma = valuesInSigma1.length; // количество в 1 сигма
	const numberInTwoSigmas = valuesInSigma2.length; // количество в 2 сигма
	const numberInThreeSigmas = valuesInSigma3.length; // количество в 3 сигма
	const asymmetryErrorVal = asymmetryError( values ).toFixed( 2 ); // ошибка асимметрии
	const excessErrorVal =  excessError( values ).toFixed( 2 ); // ошибка эксцесса
	const average  =  weightedAverage( values, dividers ).toFixed( 2 ); // средневзвешенное

	return (
		<div className="grid-cols-24">
			<div className="grid-cols-12">
				<div className="lognormal-distribution__block">
					<table className="lognormal-distribution__table-indicators">
						<tbody>
							<GetStatisticalValuePlus statValue={ mean } centre={ centre } title="Среднее арифметическое X̅" />
							<GetStatisticalValuePlus statValue={ median } centre={ centre } title="Медиана Me" />
							<GetStatisticalValuePlus statValue={ average } centre={ centre } title="Средневзвешенное X̅св" />
							<GetStatisticalValuePlus statValue={ lognormalDistributionCentre } centre={ centre }  title="Среднее лог.норм. распр. X̅lg" />
							<GetStatisticalValuePlus statValue={ geometricMean } centre={ centre }  title="Среднее геометрическое" />
							<GetStatisticalValuePlus statValue={ harmonicMean } centre={ centre }  title="Среднее гармоническое" />
							<GetStatisticalValuePlus statValue={ modalIntervalCenterVal } centre={ centre }  title="Центр модального интервала" />
							<GetStatisticalValuePlus statValue={ mode } centre={ centre }  title="Мода Mo" />
						</tbody>
					</table>
				</div>
				<div className="lognormal-distribution__block">
					<table className="lognormal-distribution__table-indicators">
						<tbody>
							<GetStatisticalValueDivPlus statValue1={ max } statValue2={ median } title="Максимум, Xmax" />
							<GetStatisticalValueDivPlus statValue1={ thirdQuantile } statValue2={ median } title="3 квартиль, Q3" />
							<GetStatisticalValueDivPlus statValue1={ median } statValue2={ median } title="Медиана, Q2" />
							<GetStatisticalValueDivPlus statValue1={ firstQuantile } statValue2={ median } title="1 квартиль, Q1" />
							<GetStatisticalValueDivPlus statValue1={ min } statValue2={ median } title="Минимум, Xmin" />
						</tbody>
					</table>
				</div>
				<div className="lognormal-distribution__block">
					<table className="lognormal-distribution__table-indicators">
						<tbody>
							<GetStatisticalValue statValue={  interval } title="Размах, R" />
							<GetStatisticalValueDiv statValue1={ interval } centre={ centre } title="Коэффициент осцилляции, Koc=R/X̅" />
							<GetStatisticalValueMinusPlus statValue1={ min } statValue2={ interval } centre={ centre } title="Размах R справа X̅-Xmin" />
							<GetStatisticalValueMinusPlus statValue1={ max } statValue2={ interval } centre={ centre } title="Размах R слева Xmax-X̅" />
							<GetStatisticalValueMinusDiv statValue1={ min } statValue2={ max } centre={ centre } title="Абсолютная асимметрия" />
						</tbody>
					</table>
				</div>
				<div className="lognormal-distribution__block">
					<table className="lognormal-distribution__table-indicators">
						<tbody>
							<GetStatisticalValue statValue={ sum } title="Сумма ∑X" />
							<GetStatisticalValueDivPlus statValue1={ sumToLeft } statValue2={ sum } title="Сумма слева ∑X < X̅" />
							<GetStatisticalValueDivPlus statValue1={ sumToRight } statValue2={ sum } title="Сумма справа X̅ < ∑X " />
							<GetStatisticalValueDiv statValue1={ sumToRight } statValue2={ sumToLeft } title="Относительная асимметрия сумм" />
						</tbody>
					</table>
				</div>
			</div>
			<div className="grid-cols-12">
				<div className="lognormal-distribution__block">
					<table className="lognormal-distribution__table-indicators">
						<tbody>
							<GetStatisticalValue statValue={ standardDeviation } title="Стандартное отклонение СКО σ" />
							<GetStatisticalValue statValue={ variationFactor } title="Коэффициент вариации, Kвар" round={ DEFAULT_MANTISSA }  />
							<GetStatisticalValue statValue={ numberOfSigma } title="Количество СКО ∑σ" title_error="( в НР 6 )" round={ DEFAULT_MANTISSA } />
							<GetStatisticalValueDivPlus statValue1={ numberOfSigmaToRight } statValue2={ numberOfSigma } title="Количество СКО справа σ" />
							<GetStatisticalValueDivPlus statValue1={ numberOfSigmaToLeft } statValue2={ numberOfSigma } title="Количество СКО слева σ" />
							<GetStatisticalValueDiv statValue1={ numberOfSigmaToRight } statValue2={ numberOfSigmaToLeft } title="Относительная асимметрия СКО σ" />
						</tbody>
					</table>
				</div>
				<div className="lognormal-distribution__block">
					<table className="lognormal-distribution__table-indicators">
						<tbody>
							<GetStatisticalValue statValue={ count } title="Количество объектов, n" round={ NULL_MANTISSA } />
							<GetStatisticalValueDivPlus statValue1={ numberInOneSigma } statValue2={ count } title="Количество n в интервале ± 1СКО" title_error="( в НР 68.17% )" percent="true" />
							<GetStatisticalValueDivPlus statValue1={ numberInTwoSigmas } statValue2={ count } title="Количество n в интервале ± 2СКО" title_error="( в НР 95.45% )" percent="true" />
							<GetStatisticalValueDivPlus statValue1={ numberInThreeSigmas } statValue2={ count } title="Количество n в интервале ± 3СКО" title_error="( в НР 99.73% )" percent="true" />
						</tbody>
					</table>
				</div>
				<div className="lognormal-distribution__block">
					<table className="lognormal-distribution__table-indicators">
						<tbody>
							<GetStatisticalValueError statValue1={ asymmetryVal } statValue2={ asymmetryErrorVal } title="Асимметричность, As" title_error="( в НР As < 3Sa )" />
							<GetStatisticalValue statValue={ asymmetryErrorVal } title="Ошибка асимметрии Sa" round={ DEFAULT_MANTISSA } />
							<GetStatisticalValueError statValue1={ excessVal } statValue2={ excessErrorVal } title="Эксцесс, Ek" title_error="( в НР Ek < 3Se )" />
							<GetStatisticalValue statValue={ excessErrorVal } title="Ошибка эксцесса Se" round={ DEFAULT_MANTISSA }  />
						</tbody>
					</table>
				</div>
				<div className="lognormal-distribution__block">
					<div className="lognormal-distribution__report-subtitle">
						Показатели лог.норм. распределения
					</div>
					<table className="lognormal-distribution__table-indicators">
						<tbody>
							<GetStatisticalValuePlus statValue={ lognormalDistributionCentre } centre={ centre } title="Среднее арифм. ( эталонное ) X̅" />
							<GetStatisticalValue statValue={ numberOfSigmaOfLognormalDistribution } title="Количество СКО ∑σ" round={ DEFAULT_MANTISSA } />
							<GetStatisticalValueError statValue1={ asymmetryOfLognormalDistribution } statValue2={ asymmetryErrorVal } title="Асимметричность As" title_error="( в НР As < 3Sa )"/>
							<GetStatisticalValueError statValue1={ excessOfLognormalDistribution } statValue2={ excessErrorVal } title="Эксцесс Ex" title_error="( в НР Ek < 3Se )"/>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}


function StatRow( props )
{
	let val1Col = ( props.val1 === undefined ) ? null : <td>{ props.val1 }</td>;
	let val2Col = ( props.val2 === undefined ) ? null : <td>{ props.val2 }</td>;
	let val3Col = ( props.val3 === undefined ) ? null : <td>{ props.val3 }</td>;
	let val4Col = ( props.val4 === undefined ) ? null : <td>{ props.val4 }</td>;

	return(
		<tr>
			{ val1Col }
			{ val2Col }
			{ val3Col }
			{ val4Col }
		</tr>
	);
}



function GetStatisticalValue( props )
{
	const { statValue, title, title_error, round } = props;

	let val1 = title;
	let val2 = "...";
	let val3, val4;

	if( statValue === 0 )
	{
		val3 = "Нет данных";
		val4 = undefined;
	}
	else
	{
		if( !round)
		{
			val3 = roundingRules( statValue, DEFAULT_BOUNDARY, DEFAULT_MANTISSA );
			val4 = <SetTitleError title_error={ title_error } />;
		}
		else
		{
			val3 = thousandSeparator( statValue, round );
			val4 = <SetTitleError title_error={ title_error } />;
		}
	}

 	return <StatRow val1={ val1 } val2={ val2 } val3={ val3 } val4={ val4 } />;
}


function GetStatisticalValueDiv( props )
{
	const { statValue1, statValue2, title, centre } = props;

	let val1 = title;
	let val2 = "...";
	let val3;

	if( centre )
		val3 = ( statValue1 !== 0 && centre !== 0 ) ? thousandSeparator( ( statValue1 / centre ).toFixed( 2 ), DEFAULT_MANTISSA ) : "Нет данных";
	else
		val3 = ( statValue1 !== 0 && statValue2 !== 0 ) ? thousandSeparator( ( statValue1 / statValue2 ).toFixed( 2 ), DEFAULT_MANTISSA ) : "Нет данных";

	return <StatRow val1={ val1 } val2={ val2 } val3={ val3 } />;
}


function GetStatisticalValueMinusDiv( props )
{
	const { statValue1, statValue2, centre, title } = props;

	let val1 = title;
	let val2 = "...";
	let val3;

	if( statValue1 === 0 || statValue2 === 0 )
		return <StatRow val1={ title } val2="..." val3="Нет данных" />;

	val3 = ( statValue1 !== centre && statValue2 !== centre ) ? thousandSeparator( ( Math.abs( statValue1 - centre )/Math.abs( statValue2 - centre ) ).toFixed( 2 ), DEFAULT_MANTISSA ) : "Нет данных";

	return <StatRow val1={ val1 } val2={ val2 } val3={ val3 } />;
}



function GetStatisticalValuePlus( props )
{
	const { statValue, centre, title } = props;

	let val1 = title;
	let val2 = "...";
	let val3, val4;

	val3 = ( statValue !== 0 ) ? roundingRules( statValue, DEFAULT_BOUNDARY, DEFAULT_MANTISSA ) : "Нет данных";
	val4 = ( statValue !== 0 && centre !== 0 ) ? "(" + roundingRules( ( statValue / centre ).toFixed( 2 ), DEFAULT_BOUNDARY, DEFAULT_MANTISSA ) + ")" : "( Нет данных )";

	return <StatRow val1={ val1 } val2={ val2 } val3={ val3 } val4={ val4 } />;
}




function GetStatisticalValueDivPlus( props )
{
	const { statValue1, statValue2, title, title_error, percent } = props;

	let val1 = title;
	let val2 = "...";
	let val3, val4;

	if( statValue1 === 0 || statValue2 === 0 ) val4 = "( Нет данных )";
	else
	{
		if( percent )
			val4 = <span>({ thousandSeparator( ( 100 * statValue1 / statValue2 ).toFixed( 2 ), DEFAULT_MANTISSA ) }%) <SetTitleError title_error={ title_error } /></span> ;
		else
			val4 = <span>({ roundingRules( ( statValue1 / statValue2 ).toFixed( 2 ),  DEFAULT_BOUNDARY, DEFAULT_MANTISSA ) }) <SetTitleError title_error={ title_error } /></span> ;
	}

	val3 = ( statValue1 !== 0 ) ? roundingRules( statValue1,  DEFAULT_BOUNDARY, DEFAULT_MANTISSA ) : "Нет данных";

	return <StatRow val1={ val1 } val2={ val2 } val3={ val3 } val4={ val4 } />;
}



function GetStatisticalValueError( props )
{
	const { statValue1, statValue2, centre, title, title_error } = props;

	let val1 = title;
	let val2 = "...";
	let val3, val4;

	val3 = ( statValue1 !== 0 ) ? thousandSeparator( statValue1, DEFAULT_MANTISSA ) : "Нет данных";
	val4 = ( statValue1 !== 0 && statValue2 !== 0 ) ?
		<span>{ thousandSeparator( ( statValue2 * 3 ).toFixed( 2 ), DEFAULT_MANTISSA ) } <span className="lognormal-distribution__recommended-value">{ title_error }</span></span> :
		"( Нет данных )";

	return <StatRow val1={ val1 } val2={ val2 } val3={ val3 } val4={ val4 } />;
}


function SetTitleError( props )
{
	const { title_error } = props;

	if( !title_error )
		return null;

	return <span className="lognormal-distribution__recommended-value">{ title_error }</span>;

}


function GetStatisticalValueMinusPlus( props )
{
	const { statValue1, statValue2, centre, title } = props;

	let val1 = title;
	let val2 = "...";
	let val3, val4;

	if( statValue1 === 0 || !centre )
		return <StatRow val1={ val1 } val2={ val2 } val3={ "Нет данных" } val4={ "(Нет данных)" } />;

	val3 = ( statValue1 !== centre ) ? roundingRules( ( Math.abs( statValue1 - centre ) ).toFixed( 2 ), DEFAULT_BOUNDARY, DEFAULT_MANTISSA ) : "Нет данных";
	val4 = ( statValue1 !== centre && statValue2 !== 0 ) ? "(" + roundingRules( ( Math.abs( statValue1 - centre )/statValue2 ).toFixed( 2 ), DEFAULT_BOUNDARY, DEFAULT_MANTISSA ) + ")" : "( Нет данных )";

	return <StatRow val1={ val1 } val2={ val2 } val3={ val3 } val4={ val4 } />;

}
