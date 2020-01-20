// @flow
import * as React from "react";

import { OFFERS_IMPORT_LOG_LOAD_STARTED, OFFERS_IMPORT_LOG_LOAD_SUCCESS, OFFERS_IMPORT_LOG_LOAD_ERROR } from "./reducer.js";
import { OPERATION_LIST_ENTITIES } from "lk/operations.js";
import { getLKQuery } from "../../../redux/actions.js";

import type { ActionType } from "../../../redux/actions.js";



type ItemPropertiesType =
{
	title: string,
	entity: string,
	listForm?: string,
	editForm?: string
};



export function loadLog( data: {} ): ActionType
{
	return function ( dispatch, getState )
	{
		let dataWithOperation =
			{
				operation: OPERATION_LIST_ENTITIES,
				entity: "OffersImportLog",
				data: data
			};


		getLKQuery(
			dataWithOperation,
			json => dispatch( { type: OFFERS_IMPORT_LOG_LOAD_SUCCESS, payload: json } ),
			error => dispatch( { type: OFFERS_IMPORT_LOG_LOAD_ERROR, payload: null } );
		);

		dispatch( { type: OFFERS_IMPORT_LOG_LOAD_STARTED, payload: null } );
	};
}
