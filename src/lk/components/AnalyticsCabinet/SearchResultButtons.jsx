// @flow
import React from "react";
import { connect } from "react-redux";

import { haveReadPermission } from "lk/checkPermissions.js";
import {	PERMISSION_COSTS_CALCULATING_MODULE, PERMISSION_ADD_OBJECT_OF_EVALUATION_MODULE,
			PERMISSION_DISTRIBUTION_ANALYSIS_MODULE, PERMISSION_ANALYTICS_MODULE,
			PERMISSION_GRAPHICAL_ANALYSIS_MODULE, PERMISSION_ANALYSIS_OF_TRENDS_MODULE,
			PERMISSION_RESULT_VIEW_MAP_MODULE, PERMISSION_RESULT_VIEW_TABLE_MODULE,
			PERMISSION_RESULT_VIEW_ANALOGS_MODULE, PERMISSION_SAVE_RESULT_MODULE,
			PERMISSION_SAVE_RESULT_TO_PDF_MODULE, PERMISSION_SAVE_RESULT_TO_XLS_MODULE } from "lk/constants.js";

import { toggleStatistics, toggleAnalytics, toggleDistributionAnalysis, toggleGraphicalAnalysis, setResultView, saveToExcel } from "./redux/actions.js";
import { RESULT_VIEW_LIST, RESULT_VIEW_TABLE, RESULT_VIEW_MAP, RESULT_VIEW_CATALOG, RESULT_VIEW_ANALOGS } from "./redux/reducer.js";



function SearchResultButtons( props )
{
	return (
		<ul className="b-section__nav">
			{
				haveReadPermission( PERMISSION_COSTS_CALCULATING_MODULE ) &&
				(
					<li>
						<div className="b-section__nav-item">
							<span className="b-section__nav-item-case">
								<span className="b-section__nav-item-case-title" data-title="Расчёт стоимости">
									<i className="a-icon a-icon-small icon-appraiser-PC"></i>
								</span>
							</span>
						</div>
					</li>
				)
			}
			{
				haveReadPermission( PERMISSION_ADD_OBJECT_OF_EVALUATION_MODULE ) &&
				(
					<li>
						<div className="b-section__nav-item">
							<span className="b-section__nav-item-case">
								<span className="b-section__nav-item-case-title" data-title="Добавить объект оценки">
									<i className="a-icon a-icon-small icon-appraiser-O"></i>
								</span>
							</span>
						</div>
					</li>
				)
			}
			<li onClick={ props.toggleStatistics } className={ props.showStatistics ? "active" : "" }>
				<div className="b-section__nav-item margin_left_10px">
					<span className="b-section__nav-item-case">
						<span className="b-section__nav-item-case-title" data-title="Статистика">
							<i className="a-icon a-icon-small icon-statistics"></i>
						</span>
					</span>
				</div>
			</li>
			{
				haveReadPermission( PERMISSION_DISTRIBUTION_ANALYSIS_MODULE ) &&
				(
					<li onClick={ props.toggleDistributionAnalysis } className={ props.showDistributionAnalysis ? "active" : "" }>
						<div className="b-section__nav-item">
							<span className="b-section__nav-item-case">
								<span className="b-section__nav-item-case-title" data-title="Анализ распределения">
									<i className="a-icon a-icon-small icon-lognormal-distribution"></i>
								</span>
							</span>
						</div>
					</li>
				)
			}
			{
				haveReadPermission( PERMISSION_ANALYTICS_MODULE ) &&
				(
					<li onClick={ props.toggleAnalytics } className={ props.showAnalytics ? "active" : "" }>
						<div className="b-section__nav-item">
							<span className="b-section__nav-item-case">
								<span className="b-section__nav-item-case-title" data-title="Мониторинг">
									<i className="a-icon a-icon-small icon-monitoring"></i>
								</span>
							</span>
						</div>
					</li>
				)
			}
			{
				haveReadPermission( PERMISSION_GRAPHICAL_ANALYSIS_MODULE ) &&
				(
					<li onClick={ props.toggleGraphicalAnalysis } className={ props.showGraphicalAnalysis ? "active" : "" }>
						<div className="b-section__nav-item">
							<span className="b-section__nav-item-case">
								<span className="b-section__nav-item-case-title" data-title="Графический анализ">
									<i className="a-icon a-icon-small icon-graphical-analysis"></i>
								</span>
							</span>
						</div>
					</li>
				)
			}
			{
				haveReadPermission( PERMISSION_ANALYSIS_OF_TRENDS_MODULE ) &&
				(
					<li>
						<div className="b-section__nav-item">
							<span className="b-section__nav-item-case">
								<span className="b-section__nav-item-case-title" data-title="Анализ динамики">
									<i className="a-icon a-icon-small icon-analysis-dynamics"></i>
								</span>
							</span>
						</div>
					</li>
				)
			}
			{
				haveReadPermission( PERMISSION_RESULT_VIEW_MAP_MODULE ) &&
				(
					<li onClick={ () => props.setResultView( RESULT_VIEW_MAP ) } className={ props.resultView === RESULT_VIEW_MAP ? "active" : "" }>
						<div className="b-section__nav-item margin_left_10px">
							<span className="b-section__nav-item-case">
								<span className="b-section__nav-item-case-title" data-title="Карта">
									<i className="a-icon a-icon-small icon-location-interface"></i>
								</span>
							</span>
						</div>
					</li>
				)
			}
			{
				haveReadPermission( PERMISSION_RESULT_VIEW_MAP_MODULE ) &&
				(
					<li onClick={ () => props.setResultView( RESULT_VIEW_CATALOG ) } className={ props.resultView === RESULT_VIEW_CATALOG ? "active" : "" }>
						<div className="b-section__nav-item">
							<span className="b-section__nav-item-case">
								<span className="b-section__nav-item-case-title" data-title="Фотокаталог">
									<i className="a-icon a-icon-small icon-photo-catalog"></i>
								</span>
							</span>
						</div>
					</li>
				)
			}
			<li onClick={ () => props.setResultView( RESULT_VIEW_LIST ) } className={ props.resultView === RESULT_VIEW_LIST ? "active" : "" }>
				<div className="b-section__nav-item">
					<span className="b-section__nav-item-case">
						<span className="b-section__nav-item-case-title" data-title="Список">
							<i className="a-icon a-icon-small icon-list-interface"></i>
						</span>
					</span>
				</div>
			</li>
			{
				haveReadPermission( PERMISSION_RESULT_VIEW_TABLE_MODULE ) &&
				(
					<li onClick={ () => props.setResultView( RESULT_VIEW_TABLE ) } className={ props.resultView === RESULT_VIEW_TABLE ? "active" : "" }>
						<div className="b-section__nav-item">
							<span className="b-section__nav-item-case">
								<span className="b-section__nav-item-case-title" data-title="Таблица">
									<i className="a-icon a-icon-small icon-table-interface"></i>
								</span>
							</span>
						</div>
					</li>
				)
			}
			{
				haveReadPermission( PERMISSION_RESULT_VIEW_ANALOGS_MODULE ) &&
				(
					<li onClick={ () => props.setResultView( RESULT_VIEW_ANALOGS ) } className={ props.resultView === RESULT_VIEW_ANALOGS ? "active" : "" }>
						<div className="b-section__nav-item">
							<span className="b-section__nav-item-case">
								<span className="b-section__nav-item-case-title" data-title="Аналоги">
									<i className="a-icon a-icon-small icon-table-vertical-interface"></i>
								</span>
							</span>
						</div>
					</li>
				)
			}
			{
				haveReadPermission( PERMISSION_SAVE_RESULT_MODULE ) &&
				(
					<li>
						<div className="b-section__nav-item margin_left_10px">
							<span className="b-section__nav-item-case">
								<span className="b-section__nav-item-case-title" data-title="Сохранить выборку">
									<i className="a-icon a-icon-small icon-appraiser-save-sample"></i>
								</span>
							</span>
						</div>
					</li>
				)
			}
			{
				haveReadPermission( PERMISSION_SAVE_RESULT_TO_PDF_MODULE ) &&
				(
					<li>
						<div className="b-section__nav-item">
							<span className="b-section__nav-item-case">
								<span className="b-section__nav-item-case-title" data-title="Выгрузка в PDF">
									<i className="a-icon a-icon-small icon-download-pdf"></i>
								</span>
							</span>
						</div>
					</li>
				)
			}
			{
				haveReadPermission( PERMISSION_SAVE_RESULT_TO_XLS_MODULE ) &&
				props.resultTableRef &&
				(
					<li onClick={ () => props.saveToExcel( "test" ) } >
						<div className="b-section__nav-item">
							<span className="b-section__nav-item-case">
								<span className="b-section__nav-item-case-title" data-title="Выгрузка в Excel">
									<i className="a-icon a-icon-small icon-download-excel"></i>
								</span>
							</span>
						</div>
					</li>
				)
			}
		</ul> );
}



const mapStateToProps = ( store ) => (
	{
		permissions: store.lk.permissions, // Component have to update on this field change
		showStatistics: store.analyticsCabinet.showStatistics,
		showAnalytics: store.analyticsCabinet.showAnalytics,
		showDistributionAnalysis: store.analyticsCabinet.showDistributionAnalysis,
		showGraphicalAnalysis: store.analyticsCabinet.showGraphicalAnalysis,
		resultView: store.analyticsCabinet.resultView,
		resultTableRef: store.analyticsCabinet.resultTableRef
	} );


const mapDispatchToProps = ( dispatch ) => (
	{
		toggleStatistics: () => dispatch( toggleStatistics() ),
		toggleAnalytics: () => dispatch( toggleAnalytics() ),
		toggleDistributionAnalysis: () => dispatch( toggleDistributionAnalysis() ),
		toggleGraphicalAnalysis: () => dispatch( toggleGraphicalAnalysis() ),
		setResultView: ( view ) => dispatch( setResultView( view ) ),
		saveToExcel: ( filename ) => dispatch( saveToExcel( filename ) )
	} );


export default connect( mapStateToProps, mapDispatchToProps )( SearchResultButtons );