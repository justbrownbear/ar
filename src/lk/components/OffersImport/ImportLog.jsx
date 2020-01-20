// @flow
import React from "react";
import { useState, useEffect } from "react";

import moment from "moment";

import { OPERATION_LIST_ENTITIES } from "lk/operations.js";
import { getLKQuery } from "../../redux/actions.js";



function loadLog( importId, setIsLogLoading, setIsLogLoadingError, setLog )
{
	let dataWithOperation =
		{
			operation: OPERATION_LIST_ENTITIES,
			entity: "OffersImportLog",
			data:
			{
				id: importId
			}
		};


	const setLogLoadingSuccess = ( json ) =>
	{
		// Нам может вернуться правильный ответ с ошибкой
		if( json.hasOwnProperty( "error" ) && json.error )
		{
			setLogLoadingError( json.errorMessage );
			return;
		}

		setIsLogLoading( false );
		setIsLogLoadingError( null );
		setLog( json.items );
	};


	const setLogLoadingError = ( errorMessage ) =>
	{
		setIsLogLoading( false );
		setIsLogLoadingError( errorMessage );
		setLog( [] );
	};


	getLKQuery(
		dataWithOperation,
		( json ) => setLogLoadingSuccess( json ),
		( error ) => setLogLoadingError( error )
	);


	// Sets the loading state
	setIsLogLoading( true );
	setIsLogLoadingError( false );
	setLog( [] );
}



type LogStringType =
{
	id: string,
	import_id: number,
	timestamp: string,
	line_num: number,
	message: string
};



function LogString( props: LogStringType )
{
	const { id, import_id, timestamp, line_num, message } = props;

	const formattedDate = moment( timestamp ).format( "DD.MM.YYYY" );

	return (
		<tr>
			<td></td>
			<td>{ formattedDate }</td>
			<td>{ line_num }</td>
			<td colspan="4">{ message }</td>
		</tr>
	);
}



export function ImportLog( props )
{
	const [ isLogLoading, setIsLogLoading ] = useState( false );
	const [ isLogLoadingError, setIsLogLoadingError ] = useState( null );
	const [ log, setLog ] = useState( [] );

	// At first we trying to load log
	useEffect( () => loadLog( props.importId, setIsLogLoading, setIsLogLoadingError, setLog ), [] );


	if( isLogLoading || isLogLoadingError || log === undefined || log.length === 0 )
		return null;


	return (
		<React.Fragment>
		{
			log.map( ( element ) => <LogString key={ element.id } { ...element } />)
		}
		</React.Fragment>
	);
}
