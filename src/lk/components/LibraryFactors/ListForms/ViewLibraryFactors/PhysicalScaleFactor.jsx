
import React from "react";


import "./css/styles__library-pricing-factors.css";


export function PhysicalScaleFactor( props )
{
	const { scale } = props;
	
	if (!scale || scale.length === 0 )
	return (<div>Шкала фактора не заполнена</div>);

	const scale_length = scale.length;

	return (
		<div>
			<table className="library-pricing-factors__table">
				<thead>
					<tr><th colSpan={ scale_length }>Физическая шкала фактора</th>
				</tr></thead>
				<tbody>
					<tr>
						{ scale.map( ( items ) => <td key={ items.id }>{ items.title }</td> ) }
					</tr>
					<tr>
						<td colSpan={ scale_length }>Экономическая шкала фактора</td>
					</tr>
					<tr>
						{ scale.map( ( items ) => <td key={ items.id }>{ items.mean_value_of_economical_interval }</td> ) }
					</tr>
				</tbody>
			</table>
		</div>
	);
}


