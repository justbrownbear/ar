// @flow
import * as React from "react";

import { connect } from "react-redux";

import { clearAnalyticsResult } from "../../redux/actions.js";

import { GraficalEstimationsPieChart } from "./components/GraficalEstimationsPieChart.jsx";
import { GraficalEstimationsHistogramChart } from "./components/GraficalEstimationsHistogramChart.jsx";

import "./css/GraficalEstimations.css";



function GraficalTable( props )
{
	return (
		<div className="grid-row">
			<div className="grid-cols-8">
				<table className="report2-table">
					<thead>
						<tr>
							<th width="60%">{ props.name }</th>
							<th width="20%">Количество</th>
							<th width="20%">Доля, %</th>
						</tr>
					</thead>
					<tbody>
						{
							props.subSeries.map( ( data ) => <GraficalTableRow key={ data.value } total={ props.total } undefined={ props.undefined } { ...data } /> )
						}
						<TotalDefinedRow { ...props }/>
						<TotalRow { ...props }/>
						<UndefinedRow { ...props }/>
					</tbody>
				</table>
			</div>
			<GraficalEstimationsPieChart data={ props.subSeries } nameChart={ props.name } />
			<GraficalEstimationsHistogramChart data={ props.subSeries } nameChart={ props.name } />
		</div>
	);
}



function GraficalTableRow( props )
{
	const { title, count, total, value, undefined } = props;

	let share = 0;
	let titleRow = title;
	let totalRow = total - undefined ;

	if( total && ( totalRow) > 0 )
		share = (( count / totalRow )* 100).toFixed( 2 );

	if( !value )
		return null;

	if( !title )
		titleRow = value + " ";

	return(
		<tr>
			<td>{ titleRow }</td>
			<td>{ count }</td>
			<td>{ share }</td>
		</tr>
	);
}

function UndefinedRow( props )
{
	const { undefined, total } = props;

	let share = 0;
	let titleRow = "В т.ч. нет данных";

	if( total && total > 0 )
		share =(( undefined / total )* 100).toFixed( 2 );

	return(
		<tr>
			<td>{ titleRow }</td>
			<td>{ undefined }</td>
			<td>{ share }</td>
		</tr>
	);
}

function TotalDefinedRow( props )
{
	const { undefined, total } = props;

	let share = 0;
	let titleRow = "Итого";
	let totalRow = total;
	if( total && ( total- undefined ) > 0 )
		totalRow = total - undefined;

	return(
		<tr>
			<td>{ titleRow }</td>
			<td>{ totalRow }</td>
			<td>100</td>
		</tr>
	);
}
function TotalRow( props )
{
	const { total } = props;
	let titleRow = "Общее кол. объектов";

	return(
		<tr>
			<td>{ titleRow }</td>
			<td>{ total }</td>
			<td>100</td>
		</tr>
	);
}

function GraficalEstimations( props )
{
	return (
		<div className="analytic-office__section report2-block">
			<span className="analytic-office__close-report" onClick={ props.clearAnalyticsResult }></span>
			<p className="analytic-office__report-title">Отчет №2 Анализ структуры выборки нечисловых характеристик</p>
			{
				props.series.map( ( data ) => <GraficalTable key={ data.id } total={ props.total } { ...data } /> )
			}
		</div>
	);
}


const mapStateToProps = ( store ) => store.analyticsCabinet.analyticsData;

const mapDispatchToProps = ( dispatch ) => (
	{
		clearAnalyticsResult: () => dispatch( clearAnalyticsResult() )
	} );

export default connect( mapStateToProps, mapDispatchToProps )( GraficalEstimations );