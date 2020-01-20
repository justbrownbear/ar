// @flow

import * as React from "react";
import { useState, useEffect } from "react";

import ReactTable from "react-table";
import checkboxHOC from "react-table/lib/hoc/selectTable";

import type { SourceObject } from "../DistributionAnalysisEstimations.jsx";
import { stringToNumber } from "lk/components/util/stringToNumber.js";

import "react-table/react-table.css";

import "./css/sort.css";
import { getRandomLowerString } from "lk/components/util/randomString";



type Props =
{
	data: Array<SourceObject>,
	numericParametersDistributionAnalysisTitle: string[],
	onChange: ( data: Array<SourceObject> ) => void,
	recalculateAnalytics: () => void
};


type State =
{
	selectedObjects: Array<string>
};



const CheckboxTable = checkboxHOC( ReactTable );

const fixedCellValue = ( data ) => data.value ? data.value.toFixed( 2 ) : "";


// Добавляет к массиву объектов поле с pos с порядковым номером для вывода в таблице
// Так же, если data пустой, добавляет пустую строку, чтобы можно было в нее вставлять из екселя
function prepareRows( data: Array<SourceObject> )
{
	// Если на входе нет данных, то генерируем пустую строку для того,
	//  чтобы в нее можно было сделать вставку из excel
	if( data.length === 0 )
		return [
			{
				pos: null,
				id: null,
				cadastal_number: "",
				value: "",
				divider: ""
			} ];

	let i = 1;

	// Если данные есть, то добавим номер строки pos
	return data.map( ( element ) =>
		( {
			pos: i++,
			...element
		} ) );
}



export function AnalysisOfDistributionSourceTable( props: Props )
{
	// Помеченные элементы
	const [ selectedObjects, setSelectedObjects ] = useState( [] );

	const [ data, setData ] = useState( [] );

	// При изменении props.data подготавливаем данные к отображения
	useEffect( () => setData( prepareRows( props.data ) ), [ props.data ] );

	// Like CDM
	useEffect( () => setData( prepareRows( props.data ) ), [] );

	// Is this row selected
	const isSelected = ( key ) => selectedObjects.includes( key );

	// Is all rows selected
	const isAllSelected = () => props.data.length === selectedObjects.length;

	// Toggle selection of single row
	const toggleSelection = ( key, shift, row ) => setSelectedObjects(
		selectedObjects.indexOf( row.id ) === -1 ?
			[ ...selectedObjects, row.id ] :
			selectedObjects.filter( ( element ) => element !== row.id ) );


	// Select or unselect all of rows when header's checkbox clicked
	const toggleSelectAll = () => setSelectedObjects( isAllSelected() ? [] : data.map( ( element ) => element.id ) );

	// Remove selected rows
	const removeSelected = () =>
	{
		props.onChange( props.data.filter( ( element ) => !selectedObjects.includes( element.id ) ) );
		setSelectedObjects( [] );
	};


	const rowStyle = { backgroundColor: "#fafafa" };

	const onEditableCellBlur = ( cellInfo ) =>
	{
		// Если у нас пустая таблица, в которую мы добавляем фальшивую пустую строку для вставки из екселя,
		//  то не будем отправлять событие изменение данных
		if( data[ cellInfo.index ].pos === null )
			return;

		const newData = [ ...props.data ];

		newData[ cellInfo.index ][ cellInfo.column.id ] = stringToNumber( e.target.innerHTML ).toFixed( 2 );

		props.onChange( newData );
	};


	const renderEditable = ( cellInfo ) =>
	{
		const rowData = { __html: data[ cellInfo.index ][ cellInfo.column.id ] };

		return (
			<div
				style={ rowStyle }
				contentEditable
				suppressContentEditableWarning
				onBlur={ e => onEditableCellBlur( cellInfo ) }
				onPaste={ clipFromExcel }
				dangerouslySetInnerHTML={ rowData }
			/> );
	};


	// Обработка вставки из буфера обмена данных из екселя
	const clipFromExcel = ( event ) =>
	{
		event.stopPropagation();
		event.preventDefault();

		// Для вставки из Excel нужны расширенные права
		if( !props.isUserCanCustomizeReport )
			return;

		// Get pasted data via clipboard API
		const clipboardData = event.clipboardData || window.clipboardData;

		const pastedData = clipboardData.getData( "Text" ).trim();

		// split into rows
		let clipRows = pastedData.split( /\r?\n/ );

		// split rows into columns
		for( let i = 0; i < clipRows.length; i++ )
			clipRows[ i ] = clipRows[ i ].split( String.fromCharCode( 9 ) );


		// Generate random id prefix
		const prefix = getRandomLowerString( 3 );

		// Отфильтровываем пустые строки
		clipRows = clipRows.filter( ( row ) => row[ 1 ] );

		const pastedObjects = clipRows.map( ( row, index ) => (
			{
				id: prefix + index,
				cadastral_number: row[ 0 ].trim(),
				value: stringToNumber( row[ 1 ] ),
				divider: stringToNumber( row[ 2 ] )
			} ) );

		const newData = [ ...pastedObjects, ...props.data ];

		props.onChange( newData );
	};


	const tableHeader =
	[
		{
			Header: "№",
			accessor: "pos",
			width: 36
		},
		{
			Header: "Кадастровый номер",
			accessor: "cadastral_number"
		},
		{
			Header: props.numericParametersDistributionAnalysisTitle[ 0 ],
			accessor: "value",
			minWidth: 76,
			maxWidth: 108
		},
		{
			Header: props.numericParametersDistributionAnalysisTitle[ 1 ],
			accessor: "divider",
			minWidth: 76,
			maxWidth: 108,
			Cell: props.isUserCanCustomizeReport ? renderEditable : fixedCellValue
		}
	];


	const tableStyle = { height: "600px" };

	return (
		<div className="grid-cols-8 grid-cols-24__lognormal-distribution__table-container">
			<div className="lognormal-distribution__buttons-wrapper">
				<button type="button" className="lognormal-distribution__button" onClick={ removeSelected }>УДАЛИТЬ ПОМЕЧЕННЫЕ</button>
			</div>
			<CheckboxTable
				columns={ tableHeader }
				data={ data }
				keyField="id"
				className="-striped -highlight"
				pageSize={ 100 }
				style={ tableStyle }
				showPagination={ true }
				isAllSelected={ isAllSelected }
				isSelected={ isSelected }
				toggleSelection={ toggleSelection }
				toggleAll={ toggleSelectAll }
				selectType="checkbox"
			/>
		</div>
	);
}
