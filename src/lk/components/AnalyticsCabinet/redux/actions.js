
import { TOGGLE_ADVANCED_SEARCH, TOGGLE_STATISTICS, TOGGLE_ANALYTICS, TOGGLE_DISTRIBUTION_ANALISIS, TOGGLE_GRAPHICAL_ANALISIS, SET_RESULT_VIEW,
	SET_ITEMS_ON_PAGE, SET_PAGE, CHANGE_SORT, SET_RESULT_TABLE_REF, SET_SEARCH_CONDITIONS, FORM_FIELDS_CHANGE, OPERATION_TYPE_CHANGE, SEARCH_TYPE_CHANGE, SEARCH_RESULT_LOADING_STARTED,
	SEARCH_RESULT_LOADING_SUCCESS, SEARCH_DATA_LOADING_SUCCESS, SEARCH_RESULT_LOADING_FAIL,
	SET_ANALYTICS_PARAMETER, SET_ANALYTICS_STISTICAL_INDICATOR, ANALYTICS_LOADING_STARTED, ANALYTICS_LOADING_SUCCESS,
	CLEAR_ANALYTICS_RESULT, SET_CURRENT_SEARCH_RESULT_OBJECT_TYPE,
	RESULT_VIEW_MAP, RESULT_VIEW_CATALOG, SETTLEMENT_CHANGE } from "./reducer.js";

import { OPERATION_GET_SEARCH, OPERATION_GET_PAGE_DATA, OPERATION_GET_ANALYTICS } from "lk/operations.js";
import { getLKQuery } from "../../../redux/actions.js";



// Включить/выключить расширенный поиск
export function toggleAdvancedSearch()
{
	return (
		{
			type: TOGGLE_ADVANCED_SEARCH,
			payload: null
		} );
}



export function operationTypeChanged( id )
{
	return (
		{
			type: OPERATION_TYPE_CHANGE,
			payload: id
		} );
}



export function setSearchType( objectType )
{
	return (
		{
			type: SEARCH_TYPE_CHANGE,
			payload: objectType
		} );
}



// Включить/выключить блок статистики
export function toggleStatistics()
{
	return (
		{
			type: TOGGLE_STATISTICS,
			payload: null
		} );
}


// Включить/выключить блок аналитики
export function toggleAnalytics()
{
	return (
		{
			type: TOGGLE_ANALYTICS,
			payload: null
		} );
}
// Включить/выключить анализ распределения

export function toggleDistributionAnalysis()
{
	return (
		{
			type: TOGGLE_DISTRIBUTION_ANALISIS,
			payload: null
		} );
}


// Включить/выключить графический анализ

export function toggleGraphicalAnalysis()
{
	return (
		{
			type: TOGGLE_GRAPHICAL_ANALISIS,
			payload: null
		} );
}


// Установка вида результатов поиска (список, карта и т.п.)
export function setResultView( view )
{
	return function ( dispatch, getState )
	{
		dispatch(
			{
				type: SET_RESULT_VIEW,
				payload: view
			} );

		// Если у нас вид "Карта", то нам нужно получить все объекты, а не только первую страницу
		const page = view === RESULT_VIEW_MAP ? -1 : 0;

		dispatch( getResultData( page, view ) );
	};
}



// Установка количества элементов, отображаемых на единичной странице результатов поиска
export function setItemsOnPage( itemsOnPage )
{
	return function ( dispatch, getState )
	{
		dispatch(
			{
				type: SET_ITEMS_ON_PAGE,
				payload: Number( itemsOnPage )
			} );



		dispatch( getResultData( 0 ) );
	};
}



// Запрос к серверу на результаты поиска
export function getResultData( page, view )
{
	return function ( dispatch, getState )
	{
		let requestData;
		let result = getState().analyticsCabinet.result;

		// Вычленим нужные резалты
		// Если page == -1, то это признак того, что надо вывести все объекты
		if( page === -1 )
			requestData = result;
		else
		{
			let itemsOnPage = getState().analyticsCabinet.itemsOnPage;

			if( result.length === 0 )
				return;

			let startIndex = page * itemsOnPage;

			requestData = result.slice( startIndex, startIndex + itemsOnPage );
		}


		let payload =
		{
			operation: OPERATION_GET_PAGE_DATA,
			entity: "RealObjects",
			data:
			{
				view_type: view || getState().analyticsCabinet.resultView,
				result: requestData
			}
		};



		getLKQuery(
			payload,
			json => dispatch( { type: SEARCH_DATA_LOADING_SUCCESS, payload: json } ),
			error => dispatch( { type: SEARCH_RESULT_LOADING_FAIL, payload: null } )
		);


		dispatch( { type: SEARCH_RESULT_LOADING_STARTED, payload: null } );

		// TODO: Установить текущую страницу. Подумать, зачем мне информация о текущей страницу, надо ли это хранить в стейте
		// TODO: Запросить данные с сервера и заполнить data
	};
}



// Кликнут один из вариантов быстрого поиска
export function getFastSearch( searchCondition )
{
	return function ( dispatch, getState )
	{
		const payload =
		{
			...searchCondition,
			region: getState().lk.region
		};


		// dispatch(
		// 	{
		// 		type: SET_SEARCH_CONDITIONS,
		// 		payload: payload
		// 	} );

		dispatch(
			{
				type: SET_RESULT_VIEW,
				payload: RESULT_VIEW_CATALOG
			} );

		dispatch( doSearch( payload ) );
	};
}



// export function onFormFieldChange( updatedValues, changedFields )
// {
// 	let searchConditions = updatedValues;

// 	// Если у нас сменился тип операции, то надо удалить кадастровый номер
// 	if( changedFields.indexOf( "operationType" ) > -1 )
// 		delete searchConditions.cadastralNumber;

// 	// Обрезаем пробелы у кадастрового номера
// 	if( changedFields.indexOf( "cadastralNumber" ) > -1 )
// 		searchConditions.cadastralNumber = searchConditions.cadastralNumber.trim();


// 	return(
// 		{
// 			type: FORM_FIELDS_CHANGE,
// 			payload: searchConditions
// 		} );
// }



// export function clearAdvancedSearch()
// {
// 	return function ( dispatch, getState )
// 	{
// 		const searchConditions = getState().analyticsCabinet.searchConditions;

// 		const newSearchConditions =
// 		{
// 			operationType: searchConditions.operationType,
// 			searchType: searchConditions.searchType,
// 			region: searchConditions.region,
// 			cadastralNumber: searchConditions.cadastralNumber,
// 			economic_operations_cost_from: searchConditions.economic_operations_cost_from,
// 			economic_operations_cost_to: searchConditions.economic_operations_cost_to,
// 			space_from: searchConditions.space_from,
// 			space_to: searchConditions.space_to,
// 			sortBy: searchConditions.sortBy
// 		};


// 		dispatch(
// 			{
// 				type: FORM_FIELDS_CHANGE,
// 				payload: newSearchConditions
// 			} );
// 	};
// }



export function changeSort( sort )
{
	return function ( dispatch, getState )
	{
		dispatch(
			{
				type: CHANGE_SORT,
				payload: sort
			} );

		dispatch( doSearch() );
	};
}



export function doSearch( values )
{
	return function ( dispatch, getState )
	{
		const payload =
			{
				operation: OPERATION_GET_SEARCH,
				entity: "RealObjects",
				data:
				{
					view_type: getState().analyticsCabinet.resultView,
					itemsOnPage: getState().analyticsCabinet.itemsOnPage,
					...values
					//...getState().analyticsCabinet.searchConditions
				}
			};


		getLKQuery(
			payload,
			json => dispatch( { type: SEARCH_RESULT_LOADING_SUCCESS, payload: json } ),
			error => dispatch( { type: SEARCH_RESULT_LOADING_FAIL, payload: null } )
		);


		const searchProps =
		{
			searchType: values.searchType,
			objectType: values.objectType
		};


		dispatch( { type: SET_CURRENT_SEARCH_RESULT_OBJECT_TYPE, payload: searchProps } );
		dispatch( { type: SEARCH_RESULT_LOADING_STARTED, payload: null } );
	};
}




export function getAnalytics( parameters )
{
	return function ( dispatch, getState )
	{
		const payload =
		{
			operation: OPERATION_GET_ANALYTICS,
			entity: "RealObjects",
			data:
			{
				result: getState().analyticsCabinet.result,
				...parameters
			}
		};


		getLKQuery(
			payload,
			json => dispatch( { type: ANALYTICS_LOADING_SUCCESS, payload: json } ),
			error => dispatch( { type: ANALYTICS_LOADING_FAIL, payload: null } )
		);


		dispatch( { type: ANALYTICS_LOADING_STARTED, payload: null } );
	};
}


export function clearAnalyticsResult()
{
	return (
		{
			type: CLEAR_ANALYTICS_RESULT,
			payload: null
		} );
}



export function setResultTableRef( ref )
{
	return (
		{
			type: SET_RESULT_TABLE_REF,
			payload: ref
		} );
}



export function saveToExcel( fileName )
{
	return ( dispatch, getState ) =>
	{
		const ref = getState().analyticsCabinet.resultTableRef;

		if(	ref.nodeType !== 1 ||
			ref.nodeName !== "TABLE" )
		{
			console.log( "Error! Ref is not table!" );

			return null;
		}


		const templateStart =
			"<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
			"xmlns:x='urn:schemas-microsoft-com:office:excel' " +
			"xmlns='http://www.w3.org/TR/REC-html40'>" +
			"<head><meta charset='UTF-8'>" +
			"<!--[if gte mso 9]><xml><x:ExcelWorkbook>" +
			"<x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name>" +
			"<x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets>" +
			"</x:ExcelWorkbook></xml><![endif]-->" +
			"</head><body>";

		const templateEnd =	"</body></html>";


		// If IE11
		if( window.navigator.msSaveOrOpenBlob )
		{
			const fileData =
			[
				`${ templateStart }${ ref }${ templateEnd }`
			];

			const blobObject = new Blob( fileData );

			document.getElementById( "react-html-table-to-excel" ).click()( () => window.navigator.msSaveOrOpenBlob( blobObject, filename ) );

			return null;
		}


		// If another browser
		const base64 = ( s ) => window.btoa( unescape( encodeURIComponent( s ) ) );
		const format = ( s, c ) => s.replace( /{(\w+)}/g, ( m, p ) => c[ p ] );

		const table = ref.outerHTML;
		const sheet = String( "Результаты поиска" );

		const context =
		{
			worksheet: sheet || "Worksheet",
			table,
		};

		const filename = `${ String( fileName ) }.xls`;

		const uri = "data:application/vnd.ms-excel;base64,";
		const template = templateStart + table + templateEnd;

		const element = window.document.createElement( "a" );

		element.href = uri + base64( format( template, context ), );

		element.download = filename;

		document.body.appendChild( element );

		element.click();

		document.body.removeChild(element);

		return null;
	};
}



// import { loadElementsList } from "../components/Admin/components/ElementsList/redux/actions.js";
// import { loadEditForm } from "../components/Admin/components/EditForm/redux/actions.js";


// export const SHOW_ELEMENTS_LIST = "SHOW_ELEMENTS_LIST";
// export const SHOW_EDIT_FORM = "SHOW_EDIT_FORM";



// export function showElementsList( entity )
// {
// 	return function ( dispatch )
// 	{
// 		// Отобразим компонент списка элементов
// 		dispatch( switchToElementsList() );

// 		// Загрузим список элементов
// 		dispatch( loadElementsList( entity, 0, 0 ) );
// 	};
// }



// export function showEditForm( entity, id, additionalParameters )
// {
// 	return function ( dispatch, getState )
// 	{
// 		// Отобразим компонент формы редактирования
// 		dispatch( switchToEditForm() );

// 		// Загрузим форму редактирования
// 		dispatch( loadEditForm( entity, id, additionalParameters ) );
// 	};
// }



// export function switchToElementsList()
// {
// 	return (
// 		{
// 			type: SHOW_ELEMENTS_LIST,
// 			payload: null
// 		} );
// }



// export function switchToEditForm( entity )
// {
// 	return (
// 		{
// 			type: SHOW_EDIT_FORM,
// 			payload: entity
// 		} );
// }
