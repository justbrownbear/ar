
import React from "react";

import ResultTableStringEditions from "./ResultTableStringEditions.jsx";



export default function ResultTableEditions( props )
{
	if( props.items == null )
		return( <span>Результаты не найдены<br /><br /><br /></span> );
	
	const sortById = () => props.sortById();
	
	const sortByTitle = () => props.sortByTitle();
	
	return(
		<table className="b__a-table">
			<thead>
				<tr>
					<th width="10%" className="text-center" onClick={ sortById }>ID</th>
					<th width="65%" className="text-start" onClick={ sortByTitle }>Наименование</th>
					<th width="5%" className="text-center">Edit</th>
					<th width="5%" className="text-center">Del</th>
					<th width="5%" className="text-center">Clone</th>
					<th width="5%" className="text-center">List</th>
					<th width="5%" className="text-center">Add</th>
				</tr>
			</thead>
			<tbody>
				{ props.items.map( ( item ) => <ResultTableStringEditions key={ item.id } editItem={ props.editItem } deleteItem={ props.deleteItem } cloneItem={ props.cloneItem } listItem={ props.listItem } addItem={ props.addItem } factor={ props.factor } { ...item } /> ) }
			</tbody>
		</table>
	);
}