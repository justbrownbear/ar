
import React from "react";

import ResultTableStringScales from "./ResultTableStringScales.jsx";



export default function ResultTableScales( props )
{
	if( props.items == null )
		return( <span>Результаты не найдены<br /><br /><br /></span> );
	
	const sortById = () => props.sortById();
	
	const sortByTitle = () => props.sortByTitle();
	
	const sortBySegment = () => props.sortBySegment();

	return(
		<table className="b__a-table">
			<thead>
				<tr>
					<th width="10%" className="text-center" onClick={ sortById }>ID</th>
					<th width="50%" className="text-start" onClick={ sortByTitle }>Наименование</th>
					<th width="30%" className="text-start" onClick={ sortBySegment }>Сегмент</th>
					<th width="5%" className="text-center">Edit</th>
					<th width="5%" className="text-center">Del</th>
				</tr>
			</thead>
			<tbody>
				{ props.items.map( ( item ) => <ResultTableStringScales key={ item.id } editItem={ props.editItem } deleteItem={ props.deleteItem } { ...item } /> ) }
			</tbody>
		</table>
	);
}

