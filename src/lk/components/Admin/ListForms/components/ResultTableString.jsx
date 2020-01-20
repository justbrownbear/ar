
import React from "react";
import { haveUpdatePermission, haveDeletePermission } from "lk/checkPermissions.js";



function ResultTableString( props )
{
	const { entity } = props;

	const editItem = () => props.editItem( props );

	const deleteItem = () =>
	{
		const answer = confirm( "Вы уверены, что хотите удалить этот элемент (" + props.id + ")?" );

		if( answer !== true )
			return;

		props.deleteItem( props.id );
	};


	// Добавил возможность передать функцию отображения заголовка
	const title = props.titleView === undefined ? props.title : props.titleView( props );

	return(
		<tr>
			<td>
				{ props.id }
			</td>
			<td>
				<a href={ "/objects/" + props.id } target="_blank" rel="noopener noreferrer">{ title }</a>
			</td>
			<td>
				{
					haveUpdatePermission( entity ) &&
					(
						<span className="b__a-table-controls">
							<i className="a-icon a-icon-small icon-edit-black" onClick={ editItem }></i>
						</span>
					)
				}
			</td>
			<td>
				{
					haveDeletePermission( entity ) &&
					(
						<span className="b__a-table-controls">
							<i className="a-icon a-icon-small icon-close-black" onClick={ deleteItem }></i>
						</span>
					)
				}
			</td>
		</tr>
	);
}


export default ResultTableString;