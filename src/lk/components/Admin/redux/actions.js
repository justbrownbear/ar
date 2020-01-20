// @flow
import * as React from "react";

import { SHOW_LIST, EDIT_ELEMENT, SAVE_ENTITY_SUCCESS, DELETE_ENTITY_STARTED, DELETE_ENTITY_SUCCESS, DELETE_ENTITY_FAIL, CLONE_ENTITY_STARTED, CLONE_ENTITY_SUCCESS, CLONE_ENTITY_FAIL, ADD_CHILD_STARTED, ADD_CHILD_SUCCESS, ADD_CHILD_FAIL } from "./reducer.js";
import { OPERATION_SAVE_ENTITY, OPERATION_DELETE_ENTITY, OPERATION_CLONE_ENTITY, OPERATION_ADD_CHILD } from "lk/operations.js";
import { getLKQuery } from "../../../redux/actions.js";

import loadable from "loadable-components";

import type { ActionType } from "../../../redux/actions.js";



type ItemPropertiesType =
{
	title: string,
	entity: string,
	listForm?: string,
	editForm?: string
};



export function showListForm( itemProperties: ItemPropertiesType ): ActionType
{
	return function ( dispatch, getState )
	{
		const formName = itemProperties.listForm || "AdminListBase";

		// Динамически загрузим модуль списка
		const component = loadable( () => import( /* webpackChunkName: "AdminListForms" */ "../ListForms/" + formName ),
			{
				ErrorComponent: () => <div>Ошибка загрузки модуля</div>,
				render: ( { Component, loading, ownProps } ) =>
				{
					if( loading )
						return <div>Загрузка компонента...</div>;

					return <Component
								editItem={ ( props ) => dispatch( showEditForm( { ...itemProperties, ...props } ) ) }
								deleteItem={ ( id ) => dispatch( deleteElement( itemProperties.entity, id ) ) }
								cloneItem={ ( id ) => dispatch( cloneElement( itemProperties.entity, id ) ) }
								addItem={ ( value ) => dispatch( addElement( itemProperties.entity, value.id, value.factor ) ) }
								{ ...itemProperties } />;
				}
			} );


		dispatch(
			{
				type: SHOW_LIST,
				payload:
				{
					listForm: component
				}
			}
		);
	};
}



function showEditForm( itemProperties: ItemPropertiesType ): ActionType
{
	return function ( dispatch, getState )
	{
		const formName = itemProperties.editForm || "EditForm";

		const component = loadable( () => import( /* webpackChunkName: "AdminEditForms" */ "../EditForms/" + formName ),
			{
				ErrorComponent: () => <div>Ошибка загрузки модуля</div>,
				render: ( { Component, loading, ownProps } ) =>
				{
					if( loading )
						return <div>Загрузка компонента...</div>;

					return <Component entity={ itemProperties.entity } saveItem={ ( data ) => dispatch( saveEntity( itemProperties.entity, data ) ) } { ...itemProperties } />;
				}
			} );

		dispatch(
			{
				type: EDIT_ELEMENT,
				payload:
				{
					editForm: component
				}
			}
		);
	}
}



function saveEntity( entity: string, data: {} ): ActionType
{
	return function ( dispatch, getState )
	{
		let dataWithOperation =
			{
				operation: OPERATION_SAVE_ENTITY,
				entity: entity,
				data: data
			};


		getLKQuery(
			dataWithOperation,
			json => dispatch( { type: SAVE_ENTITY_SUCCESS, payload: json } ),
			error => console.log( error ) //dispatch( { type: ANALYTICS_LOADING_FAIL, payload: null } );
		);
	};
}



function deleteElement( entity, id ): ActionType
{
	return function ( dispatch, getState )
	{
		let dataWithOperation =
			{
				operation: OPERATION_DELETE_ENTITY,
				entity: entity,
				data:
				{
					id: id
				}
			};


		getLKQuery(
			dataWithOperation,
			json => dispatch( { type: DELETE_ENTITY_SUCCESS, payload: json } ),
			error => dispatch( { type: DELETE_ENTITY_FAIL, payload: null } )
		);


		dispatch( { type: DELETE_ENTITY_STARTED, payload: null } );
	};
}


function cloneElement( entity, id ): ActionType
{
	return function ( dispatch, getState )
	{
		let dataWithOperation =
			{
				operation: OPERATION_CLONE_ENTITY,
				entity: entity,
				data:
				{
					id: id
				}
			};


		getLKQuery(
			dataWithOperation,
			json => dispatch( { type: CLONE_ENTITY_SUCCESS, payload: json } ),
			error => dispatch( { type: CLONE_ENTITY_FAIL, payload: null } )
		);


		dispatch( { type: CLONE_ENTITY_STARTED, payload: null } );
	};

}


function addElement( entity, id, factor ): ActionType
{
	return function ( dispatch, getState )
	{
		let dataWithOperation =
			{
				operation: OPERATION_ADD_CHILD,
				entity: entity,
				data:
				{
					edition: id,
					factor: factor
				}
			};

		getLKQuery(
			dataWithOperation,
			json => dispatch( { type: ADD_CHILD_SUCCESS, payload: json } ),
			error => dispatch( { type: ADD_CHILD_FAIL, payload: null } )
		);

		dispatch( { type: ADD_CHILD_STARTED, payload: null } );
	};

}