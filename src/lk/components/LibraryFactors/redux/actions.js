// @flow
import * as React from "react";

import { SHOW_LIBRARY_LIST } from "./reducer.js";

import loadable from "loadable-components";

import type { ActionType } from "../../../redux/actions.js";



type ItemPropertiesType =
{
	title: string,
	entity: string,
	listForm?: string
};



export function showListForm( itemProperties: ItemPropertiesType ): ActionType
{
	return ( dispatch, getState ) =>
	{
		const formName = itemProperties.listForm;

		// Динамически загрузим модуль списка
		const component = loadable( () => import( /* webpackChunkName: "AdminListForms" */ "../ListForms/" + formName ),
			{
				ErrorComponent: () => <div>Ошибка загрузки модуля</div>,
				render: ( { Component, loading, ownProps } ) =>
				{
					if( loading )
						return <div>Загрузка компонента...</div>;

					return <Component { ...itemProperties } />;
				}
			} );


		dispatch(
			{
				type:  SHOW_LIBRARY_LIST,
				payload:
				{
					listForm: component
				}
			}
		);
	};
}
