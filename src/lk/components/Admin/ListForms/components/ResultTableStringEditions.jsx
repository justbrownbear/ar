
import React from "react";



export default function ResultTableStringEditions( props )
{
	const editItem = () => props.editItem( props );
		
	const listItem = () => props.listItem( props.id );
	
	const addItem = () =>
	{
		const answer = confirm( "Вы уверены, что хотите добавить фактор в этот сборник (" + props.id + ")?" );

		if( answer !== true )
			return;

		props.addItem( props );
	};
	
	const deleteItem = () =>
	{
		const answer = confirm( "Вы уверены, что хотите удалить этот элемент (" + props.id + ")?" );

		if( answer !== true )
			return;

		props.deleteItem( props.id );
	};

	const cloneItem = () =>
	{
		const answer = confirm( "Вы уверены, что хотите клонировать этот сборник (" + props.id + ")?" );

		if( answer !== true )
			return;

		props.cloneItem( props.id );
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
				<span className="b__a-table-controls"><i className="a-icon a-icon-small icon-edit-black" onClick={ editItem }></i></span>
			</td>
			<td>
				<span className="b__a-table-controls"><i className="a-icon a-icon-small icon-close-black" onClick={ deleteItem }></i></span>
			</td>
			<td>
				<span className="b__a-table-controls"><i className="a-icon a-icon-small icon-clone-black" onClick={ cloneItem }></i></span>
			</td>
			<td>
				<span className="b__a-table-controls"><i className="a-icon a-icon-small icon-list-black" onClick={ listItem }></i></span>
			</td>
			<td>
				<span className="b__a-table-controls"><i className="a-icon a-icon-small icon-load-black" onClick={ addItem } factor={ props.factor }></i></span>
			</td>
		</tr>
	);
}