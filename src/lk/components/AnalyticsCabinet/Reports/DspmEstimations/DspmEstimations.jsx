
import React from "react";

import { connect } from "react-redux";

import thousandSeparator from "lk/components/util/thousandSeparator.js";

import { clearAnalyticsResult } from "../../redux/actions.js";

import "./css/DspmEstimations.css";



function ReportGroups( props )
{
	const { countStatistic } = props;

	return(
		<React.Fragment>
			<td className="report3-table-hide-column"></td>
			<td className="report3-table-title" colSpan = { countStatistic }>{ props.title }</td>
		</React.Fragment>
	);
}



function ReportTitles( props )
{
	const { statisticNames } = props;

	return(
		<React.Fragment>
			<th className="report3-table-hide-column"></th>
			{
				statisticNames.map( ( items ) => <th key={ items.id }>{ items.title }</th> )
			}
		</React.Fragment>
	);

}



function ReportRow( props )
{
	const { titleLocation,titleType,titleParameter } = props;

	return(
		<tr>
			<td>{ titleLocation }</td>
			<td>{ titleType }</td>
			<td>{ titleParameter }</td>
			{
				props.statistics.map( ( items ) => <ReportColumn key={ items.idParameter } { ...items } /> )
			}
		</tr>
	);
}



function ReportColumn( props )
{
	const { listParameter } = props;
 	return(
		<React.Fragment>
			<td className="report3-table-hide-column"></td>
			{
				listParameter.map( ( items ) => <td className="report3-table-nowrap" key={ items.idStatistic }>{ thousandSeparator( items.valueStatistic ) }</td> )
				}
		</React.Fragment>
		);

}



function DspmEstimations( props )
{
	return (
		<div className="analytic-office__section report1-block">
			<span className="report3-close-report" onClick={ props.clearAnalyticsResult }></span>
			<p className="report3-title">Отчет №3 Дискретная пространственно-параметрическая модель</p>
			<p className="report3-title">основанная на методологии Г. М. Стерника</p>
			<p className="analytic-office__report-title"></p>
			<div className="grid-row">
				<div className="grid-cols-24 report3-table-wrapper">
					<table className="report3-table">
						<thead>
							<tr>
								<td className="report3-table-title" colSpan ="3">Группировка</td>
								{
							 		props.parameterNames.map( ( items ) => <ReportGroups key={ items.id } countStatistic={ props.countStatistic } { ...items } />)
								}
							</tr>
							<tr>
								<th>{ props.listLocations }</th>
								<th>{ props.listTypes }</th>
								<th>{ props.listParameters }</th>
								{
							 		props.parameterNames.map( ( items ) => <ReportTitles key={ items.id } statisticNames={ props.statisticNames } { ...items } />)
								}
							</tr>
						</thead>
						<tbody>
						{
							props.data.map( ( items ) => <ReportRow key={ items.id } { ...items } /> )
						}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}


const mapStateToProps = ( store ) => store.analyticsCabinet.analyticsData;

const mapDispatchToProps = ( dispatch ) => (
	{
		clearAnalyticsResult: () => dispatch( clearAnalyticsResult() )
	} );

export default connect( mapStateToProps, mapDispatchToProps )( DspmEstimations );