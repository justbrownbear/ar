// @flow
import { OPERATION_GET_ENTITY } from "lk/operations.js";

import { getLKQuery } from "lk/redux/actions.js";



export function getEntity( entity: string, id: number | string, onSuccess, onFail )
{
	if( !entity || entity === "" )
	{
		onFail( "Entity not set" );
		return;
	}


	if( !id || id === "" || id === 0 )
	{
		onFail( "id not set" );
		return;
	}


	const dataWithOperation =
	{
		operation: OPERATION_GET_ENTITY,
		entity: entity,
		data:
		{
			id: id
		}
	};


	getLKQuery(
		dataWithOperation,
		json => onSuccess( json ),
		error => onFail( error )
	);
}