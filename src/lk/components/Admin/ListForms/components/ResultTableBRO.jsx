
import React from "react";

import ResultTableString from "./ResultTableString.jsx";



export default function ResultTableBRO( props )
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
					<th width="80%" className="text-start" onClick={ sortByTitle }>Наименование</th>
					<th width="5%" className="text-center">Edit</th>
					<th width="5%" className="text-center">Del</th>
				</tr>
			</thead>
			<tbody>
				{ props.items.map( ( item ) => <ResultTableString key={ item.id } entity={ props.entity } editItem={ props.editItem } deleteItem={ props.deleteItem } titleView={ props.titleView } { ...item } /> ) }
			</tbody>
		</table>
	);
}