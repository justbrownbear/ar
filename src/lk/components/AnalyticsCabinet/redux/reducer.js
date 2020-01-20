// @flow

import { ALL_OBJECTS, LAND, BUILDING, LETTER, ROOMS_GROUP, ROOM, INDUSTRIAL_ZONE, ASSET_GROUP } from "lk/constants.js";
import { REGION_CHANGE } from "../../../redux/reducer.js";

export const RESULT_VIEW_LIST		= 1; // Список
export const RESULT_VIEW_TABLE		= 2; // Таблица
export const RESULT_VIEW_ANALOGS	= 3; // Аналоги
export const RESULT_VIEW_MAP		= 4; // Карта
export const RESULT_VIEW_CATALOG	= 5; // Фотокаталог


export const TOGGLE_ADVANCED_SEARCH	= "TOGGLE_ADVANCED_SEARCH";
export const TOGGLE_STATISTICS	= "TOGGLE_STATISTICS";
export const TOGGLE_ANALYTICS	= "TOGGLE_ANALYTICS";
export const TOGGLE_DISTRIBUTION_ANALISIS = "TOGGLE_DISTRIBUTION_ANALISIS";
export const TOGGLE_GRAPHICAL_ANALISIS = "TOGGLE_GRAPHICAL_ANALISIS";
export const SET_ITEMS_ON_PAGE = "SET_ITEMS_ON_PAGE";
export const SET_PAGE = "SET_PAGE";
export const CHANGE_SORT = "CHANGE_SORT";
export const SET_RESULT_TABLE_REF = "SET_RESULT_TABLE_REF";

export const FORM_FIELDS_CHANGE = "FORM_FIELDS_CHANGE";

export const SET_RESULT_VIEW	= "SET_RESULT_VIEW";

export const SET_CURRENT_SEARCH_RESULT_OBJECT_TYPE	= "SET_CURRENT_SEARCH_RESULT_OBJECT_TYPE";
export const SEARCH_RESULT_LOADING_STARTED	= "SEARCH_RESULT_LOADING_STARTED";
export const SEARCH_RESULT_LOADING_SUCCESS	= "SEARCH_RESULT_LOADING_SUCCESS";
export const SEARCH_DATA_LOADING_SUCCESS = "SEARCH_DATA_LOADING_SUCCESS";
export const SEARCH_RESULT_LOADING_FAIL	= "SEARCH_RESULT_LOADING_FAIL";

export const SET_SEARCH_CONDITIONS	= "SET_SEARCH_CONDITIONS";

export const OPERATION_TYPE_CHANGE = "OPERATION_TYPE_CHANGE";
export const SEARCH_TYPE_CHANGE = "SEARCH_TYPE_CHANGE";

export const SET_ANALYTICS_STISTICAL_INDICATOR = "SET_ANALYTICS_STISTICAL_INDICATOR";
export const SET_ANALYTICS_PARAMETER = "SET_ANALYTICS_PARAMETER";

export const ANALYTICS_LOADING_STARTED	= "ANALYTICS_LOADING_STARTED";
export const ANALYTICS_LOADING_SUCCESS	= "ANALYTICS_LOADING_SUCCESS";
export const ANALYTICS_LOADING_FAIL = "ANALYTICS_LOADING_FAIL";

export const CLEAR_ANALYTICS_RESULT = "CLEAR_ANALYTICS_RESULT";





const initialState =
	{
		showCadastreSection: false,
		isAdvancedSearch: false,

		showFastSearch: true,
		showStatistics: true,
		showAnalytics: false,
		showDistributionAnalysis: false,
		showGraphicalAnalysis: false,

		// Вид представления результатов поиска (список, фотокаталог, карта и т.п.)
		resultView: RESULT_VIEW_LIST,

		objectType: 4,
		currentResultSearchType: 4,
		currentResultObjectType: 4,

		result: [],
		data: [],
		statistics: {},

		resultTableRef: null,
		page: 0,
		itemsOnPage: 10,

		analytics:
		{
			parameters: [],
			statisticalIndicator: []
		},

		analyticsData: null
	};



const reducer = ( state = initialState, action ): {} =>
{
	switch( action.type )
	{
		case TOGGLE_ADVANCED_SEARCH:
			return (
				{
					...state,
					isAdvancedSearch: !state.isAdvancedSearch
				} );


		case TOGGLE_STATISTICS:
			return (
				{
					...state,
					showStatistics: !state.showStatistics
				} );


		case TOGGLE_ANALYTICS:
			return (
				{
					...state,
					showAnalytics: !state.showAnalytics
				} );

		case TOGGLE_DISTRIBUTION_ANALISIS:
			return (
				{
					...state,
					showDistributionAnalysis: !state.showDistributionAnalysis,
					analyticsData: null
				} );

		case TOGGLE_GRAPHICAL_ANALISIS:
			return (
				{
					...state,
					showGraphicalAnalysis: !state.showGraphicalAnalysis
				} );


		case SET_RESULT_VIEW:
			return (
				{
					...state,
					resultView: action.payload,
					data: [],
					page: 0
				} );


		case OPERATION_TYPE_CHANGE:
			return (
				{
					...state,
					showCadastreSection: action.payload.length === 1 && action.payload[ 0 ] === 0
				} );


		case SEARCH_TYPE_CHANGE:
			return (
				{
					...state,
					objectType: action.payload
				} );


		case SET_ITEMS_ON_PAGE:
			return (
				{
					...state,
					page: 0,
					itemsOnPage: action.payload
				}
			);

		case SET_PAGE:
			return (
				{
					...state,
					page: action.payload
				}
			);


		// case SET_SEARCH_CONDITIONS:
		// 	return (
		// 		{
		// 			...state,
		// 			searchConditions:
		// 			{
		// 				...action.payload,
		// 				sortBy: [ null, null, null, null, null, null, null, null, null, false ]
		// 			}
		// 		}
		// 	);


		// case CHANGE_SORT:
		// 	const currentSort = state.searchConditions.sortBy[ action.payload ];
		// 	let newSort;

		// 	if( currentSort === null )
		// 		newSort = true;
		// 	else
		// 	if( currentSort === true )
		// 		newSort = false;
		// 	else
		// 		newSort = null;

		// 	let sortBy = [ null, null, null, null, null, null, null, null, null, null ];
		// 	sortBy[ action.payload ] = newSort;

		// 	return (
		// 		{
		// 			...state,
		// 			page: 0,
		// 			searchConditions:
		// 			{
		// 				...state.searchConditions,
		// 				sortBy: sortBy
		// 			}
		// 		}
		// 	);


		case SET_RESULT_TABLE_REF:
			return (
				{
					...state,
					resultTableRef: action.payload
				}
			);


		// case FORM_FIELDS_CHANGE:
		// 	return (
		// 		{
		// 			...state,
		// 			searchConditions:
		// 			{
		// 				...action.payload
		// 			}
		// 		}
		// 	);

		case SET_CURRENT_SEARCH_RESULT_OBJECT_TYPE:
			return (
				{
					...state,
					currentResultSearchType: action.payload.searchType,
					currentResultObjectType: state.objectType
				}
			);

		case SEARCH_RESULT_LOADING_STARTED:
			return (
				{
					...state,
					showFastSearch: false,
					resultTableRef: null
				}
			);

		case SEARCH_RESULT_LOADING_SUCCESS:
			return (
				{
					...state,
					result: action.payload.result,
					data: action.payload.data,
					statistics: action.payload.statistics
				} );

		case SEARCH_DATA_LOADING_SUCCESS:
			return (
				{
					...state,
					data: action.payload.data
				} );

		case SEARCH_RESULT_LOADING_FAIL:
			return state;


		case SET_ANALYTICS_PARAMETER:
			return (
				{
					...state,
					analytics:
					{
						...state.analytics,
						parameters: action.payload
					}
				} );


		case SET_ANALYTICS_STISTICAL_INDICATOR:
			return (
				{
					...state,
					analytics:
					{
						...state.analytics,
						statisticalIndicator: action.payload
					}
				} );


		case ANALYTICS_LOADING_SUCCESS:
			return (
				{
					...state,
					analyticsData: action.payload.result
				} );


		case CLEAR_ANALYTICS_RESULT:
			return (
				{
					...state,
					analyticsData: null
				} );


		default:
			return state;
	}
};



export default reducer;