
import React from "react";



export default function ResultTableStringScales( props )
{
	const editItem = () => props.editItem( props );

	const deleteItem = () =>
	{
		const answer = confirm( "Вы уверены, что хотите удалить этот элемент (" + props.id + ")?" );

		if( answer !== true )
			return;

		props.deleteItem( props.id );
	};


	return(
		<tr>
			<td>
				{ props.id }
			</td>
			<td>
				<a href={ "/objects/" + props.id } target="_blank" rel="noopener noreferrer">{ props.title }</a>
			</td>
			<td>
				<span>{ props.segment }</span>
			</td>
			<td>
				<span className="b__a-table-controls"><i className="a-icon a-icon-small icon-edit-black" onClick={ editItem }></i></span>
			</td>
			<td>
				<span className="b__a-table-controls"><i className="a-icon a-icon-small icon-close-black" onClick={ deleteItem }></i></span>
			</td>
		</tr>
	);
}


