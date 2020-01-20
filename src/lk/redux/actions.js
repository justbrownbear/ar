// @flow

import { OPERATION_GET_PERMISSIONS } from "lk/operations.js";
import { OPERATION_LIST_ENTITIES } from "../operations";
import { REGION_CHANGE, IS_HELPER_VALUES_LOADING_STARTED, IS_HELPER_VALUES_LOADING_SUCCESS } from "./reducer";
import { getHash } from "../components/util/getHash";

import "regenerator-runtime/runtime";


export const TOGGLE_SEARCH_MODULE	= "TOGGLE_SEARCH_MODULE";
export const TOGGLE_ADMIN_MODULE	= "TOGGLE_ADMIN_MODULE";
export const TOGGLE_LIBRARY_FACTORS_MODULE	= "TOGGLE_LIBRARY_FACTORS_MODULE";
export const TOGGLE_OFFERS_IMPORT_MODULE = "TOGGLE_OFFERS_IMPORT_MODULE";

export type ActionType =
{
	type: string,
	payload: {}
};


type PromiseAction = Promise<ActionType>;
type Dispatch = (action: ActionType | PromiseAction) => any;
type GetState = () => State;
type ThunkAction = ( dispatch: Dispatch, getState: GetState ) => any;



export function toggleSearch(): ActionType
{
	return (
		{
			type: TOGGLE_SEARCH_MODULE,
			payload: null
		} );
}

export function toggleOffersImport(): ActionType
{
	return (
		{
			type: TOGGLE_OFFERS_IMPORT_MODULE,
			payload: null
		} );
}

export function toggleAdmin(): ActionType
{
	return (
		{
			type: TOGGLE_ADMIN_MODULE,
			payload: null
		} );
}

export function toggleLibraryFactors(): ActionType
{
	return (
		{
			type: TOGGLE_LIBRARY_FACTORS_MODULE,
			payload: null
		} );
}


export const OPERATION_GET_PERMISSIONS_LOADING_SUCCESS = "OPERATION_GET_PERMISSIONS_LOADING_SUCCESS";


export function getPermissions(): ThunkAction
{
	return function ( dispatch, getState )
	{
		const data =
			{
				operation: OPERATION_GET_PERMISSIONS
			};


		getLKQuery(
			data,
			json => dispatch( { type: OPERATION_GET_PERMISSIONS_LOADING_SUCCESS, payload: json } ),
			error => console.log( error )
		);
	};
}






export function loadHelpersValues( entity: string, data: {} ): ThunkAction
{
	return ( dispatch, getState ) =>
	{
		let hash = getHash( entity, data );

		// Проверим, не загружается ли параллельно этот же справочник с такими же параметрами
		if( getState().lk.loadingItems.indexOf( hash ) !== -1 )
			return;


		const payload =
			{
				operation: OPERATION_LIST_ENTITIES,
				entity: entity,
				data: data
			};


		getLKQuery(
			payload,
			json =>
			{
				let items = {};

				if( json.error )
				{
					console.log( "Ошибка получения списка элементов сущности " + entity + ": " + json.errorMessage );
					return;
				}

				if( json.totalItems > 0 && !json.items )
				{
					console.error( "Field 'items' not found for entity " + entity );
					return;
				}

				// Справочники будем хранить в виде хэша entity+data чтобы различные варианты запросов тоже попадали в выборку
				items =
				{
					hash: hash,
					values: json.totalItems === 0 ? [] : json.items
				};

				dispatch( { type: IS_HELPER_VALUES_LOADING_SUCCESS, payload: items } );
			},
			error => console.log( error )
		);


		dispatch( { type: IS_HELPER_VALUES_LOADING_STARTED, payload: hash } );
	};
}






//export const getLKQuery = async ( payload: string, successCallback: ( string ): void, errorCallback: ( string ): void ) =>
export const getLKQuery = async ( payload, successCallback, errorCallback ) =>
{
	try
	{
		const params =
		{
			method: "POST",
			credentials: "include",
			body: JSON.stringify( payload )
		};


		const response = await fetch( "/lk_query", params );
		const json = await response.json();

		successCallback( json );
	}
	catch( error )
	{
		errorCallback( error );
	}
};






export function changeSettlement( id, title ): ActionType
{
	return (
		{
			type: REGION_CHANGE,
			payload:
			{
				id: id,
				title: title
			}
		} );
}