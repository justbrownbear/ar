// @flow
import React from "react";
import { useState, useEffect } from "react";

import moment from "moment";

import { ImportLog } from "./ImportLog.jsx";

import { OPERATION_LIST_ENTITIES } from "lk/operations.js";
import { getLKQuery } from "../../redux/actions.js";

import { getEntity } from "lk/components/entityUtils/getEntity.js"

import { getHash } from "lk/components/util/getHash.js";
import Cache from "cache-base";


const cache = new Cache();


function loadLog( setIsLogLoading, setIsLogLoadingError, setLog )
{
	let dataWithOperation =
		{
			operation: OPERATION_LIST_ENTITIES,
			entity: "OffersImport",
			data: {}
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

		setLog( json.items || [] );
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
	date: string,
	subject: number,
	segment: number,
	operation_type: number,
	source: number
};



function EntityTitle( props )
{
	const { id, entity } = props;

	const [ value, setValue ] = useState( null );

	const loadValues = () =>
	{
		let hash = getHash( entity, id );
		let cachedValue = cache.get( hash );

		if( cachedValue === undefined )
		{
			getEntity(
					entity,
					id,
					( json ) =>
					{
						setValue( json.title );
						cache.set( hash, json.title );
					},
					( error ) => console.log( "Невозможно загрузить значения сущности: " + error ) );
		}
		else
			setValue( cachedValue );
	};


	// Like CDM
	useEffect( loadValues, [] );

	return value;
}




function ImportString( props: LogStringType )
{
	const { id, date, subject, segment, operation_type, source } = props;

	const [ isLogExpanded, setIsLogExpanded ] = useState( false );

	const expandLog = () => setIsLogExpanded( !isLogExpanded );

	const formattedDate = moment( date ).format( "DD.MM.YYYY" );

	return (
		<React.Fragment>
			<tr onClick={ expandLog }>
				<td>{ id }</td>
				<td>{ formattedDate }</td>
				<td>{ subject }</td>
				<td><EntityTitle entity="Segments" id={ segment } /></td>
				<td><EntityTitle entity="TypesOfEconomicOperations" id={ operation_type } /></td>
				<td><EntityTitle entity="EconomicOperationsSourceTypes" id={ source } /></td>
			</tr>
			{ isLogExpanded ? <ImportLog importId={ id } /> : null }
		</React.Fragment>
	);
}



export function Imports()
{
	const [ isLogLoading, setIsLogLoading ] = useState( false );
	const [ isLogLoadingError, setIsLogLoadingError ] = useState( null );
	const [ log, setLog ] = useState( [] );

	const updateLog = () => loadLog( setIsLogLoading, setIsLogLoadingError, setLog );

	// At first we trying to load log
	useEffect( () => updateLog(), [] );


	return(
		<div className="offers-download__log">
			<p className="offers-download__title">Журнал загрузок</p>
			<div className="offers-download__block">
				<div className="element-form offers-download__data-picker-title">Период загрузки:<input type="text" placeholder="Задайте период загрузки" className="date-picker-icon" value="" /></div>
			</div>
			<div className="offers-download__block"><button className="offers-download__button" onClick={ updateLog }>Обновить</button></div>
			<table className="offers-download__table">
				<thead>
					<tr>
						<th><a href="#">ID</a></th>
						<th><a href="#">Дата загрузки</a></th>
						<th><a href="#">Субъект</a></th>
						<th><a href="#">Сегмент</a></th>
						<th><a href="#">Тип операции</a></th>
						<th><a href="#">Источник</a></th>
						<th><a href="#">log</a></th>
					</tr>
				</thead>
				<tbody>
					{
						log.map( ( element ) => <ImportString key={ "import_" + element.id } { ...element } /> )
					}
				</tbody>
			</table>
		</div>
	);
}
