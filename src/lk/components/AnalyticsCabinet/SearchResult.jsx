
import React from "react";
import { connect } from "react-redux";

import loadable from "loadable-components";
import ModuleLoadingWaiter from "lk/components/ModuleLoadingWaiter.jsx";

import SearchResultButtons from "./SearchResultButtons.jsx";

import { RESULT_VIEW_LIST, RESULT_VIEW_TABLE, RESULT_VIEW_MAP, RESULT_VIEW_CATALOG, RESULT_VIEW_ANALOGS } from "./redux/reducer.js";




const StatisticsBlock = loadable(
	() => import( /* webpackChunkName: "StatisticsBlock" */ "./StatisticsBlock.jsx" ),
	{
		LoadingComponent: ModuleLoadingWaiter
	} );


const AnalyticsBlock = loadable(
	() => import( /* webpackChunkName: "AnalyticsBlock" */ "./AnalyticsBlock.jsx" ),
	{
		LoadingComponent: ModuleLoadingWaiter
	} );


const GraphicalAnalysisBlock = loadable(
	() => import( /* webpackChunkName: "GraphicalAnalysisBlock" */ "./GraphicalAnalysisBlock.jsx" ),
	{
		LoadingComponent: ModuleLoadingWaiter
	} );


const DistributionAnalysisBlock = loadable(
	() => import( /* webpackChunkName: "DistributionAnalysisBlock" */ "./DistributionAnalysisBlock.jsx" ),
	{
		LoadingComponent: ModuleLoadingWaiter
	} );


const SearchResultDataList = loadable(
	() => import( /* webpackChunkName: "SearchResultDataList" */ "./SearchResultDataList.jsx" ),
	{
		LoadingComponent: ModuleLoadingWaiter
	} );


const SearchResultDataTable = loadable(
	() => import( /* webpackChunkName: "SearchResultDataTable" */ "./SearchResultDataTable.jsx" ),
	{
		LoadingComponent: ModuleLoadingWaiter
	} );


const SearchResultDataAnalogs = loadable(
	() => import( /* webpackChunkName: "SearchResultDataAnalogs" */ "./SearchResultDataAnalogs.jsx" ),
	{
		LoadingComponent: ModuleLoadingWaiter
	} );


const SearchResultDataMap = loadable(
	() => import( /* webpackChunkName: "SearchResultDataMap" */ "./SearchResultDataMap.jsx" ),
	{
		LoadingComponent: ModuleLoadingWaiter
	} );


const SearchResultDataCatalog = loadable(
	() => import( /* webpackChunkName: "SearchResultDataCatalog" */ "./SearchResultDataCatalog.jsx" ),
	{
		LoadingComponent: ModuleLoadingWaiter
	} );



function SearchResult( props )
{
	return (
		<div className="grid-row margin_top_30px">
			<div className="grid-cols-24">
				<div className="b-searching-results__common-container">
					<div className="b-section__navgroup">
						<div className="b-section__navgroup-inner information_line">
							<div className="b-searching-results__found-total">Найдено: { props.resultCount } результатов</div>
							<div className="b-section__sidebar-group float_right">
								<SearchResultButtons />
							</div>
							<div className="clear-fix"></div>
						</div>
					</div>
					{
						props.showStatistics && <StatisticsBlock />
					}

					{
						props.showAnalytics && <AnalyticsBlock />
					}

					{
						props.showGraphicalAnalysis && <GraphicalAnalysisBlock />
					}

					{
						props.showDistributionAnalysis && <DistributionAnalysisBlock />
					}

					{
						( props.resultView === RESULT_VIEW_LIST && <SearchResultDataList /> ) ||
						( props.resultView === RESULT_VIEW_TABLE && <SearchResultDataTable /> ) ||
						( props.resultView === RESULT_VIEW_ANALOGS && <SearchResultDataAnalogs /> ) ||
						( props.resultView === RESULT_VIEW_MAP && <SearchResultDataMap /> ) ||
						( props.resultView === RESULT_VIEW_CATALOG && <SearchResultDataCatalog /> )
					}
				</div>
			</div>
		</div> );
}


const mapStateToProps = ( store ) => (
	{
		showStatistics: store.analyticsCabinet.showStatistics,
		showAnalytics: store.analyticsCabinet.showAnalytics,
		showDistributionAnalysis: store.analyticsCabinet.showDistributionAnalysis,
		showGraphicalAnalysis: store.analyticsCabinet.showGraphicalAnalysis,
		resultView: store.analyticsCabinet.resultView,
		resultCount: store.analyticsCabinet.result.length
	} );

SearchResult = connect( mapStateToProps )( SearchResult );

export default SearchResult;