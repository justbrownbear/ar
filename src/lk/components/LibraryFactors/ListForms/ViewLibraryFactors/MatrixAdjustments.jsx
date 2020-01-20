
import React from "react";

import { connect } from "react-redux";

import thousandSeparator from "lk/components/util/thousandSeparator.js";


import "./css/styles__library-pricing-factors.css";


function ReportRow( props )
{
	const { scale, title, id } = props;
	
    return(
   		<tr>
   		    <td>{ title }</td>
			{ scale.map( ( items ) => <ReportColumn currentMean ={ props.mean_value_of_economical_interval } mean={ items.mean_value_of_economical_interval }  key={ items.id } /> ) }
		</tr>
   	);

}

function ReportColumn( props )
{
	const { currentMean, mean } = props;
	
	let result = 0;
	
	if( mean  && currentMean > 0 )
		result = ( mean / currentMean ).toFixed( 2 );
	
 	return(
			<td>{ result }</td> 
		);

}

export function MatrixAdjustments( props )
{
	const { scale } = props;
	
	if (!scale || scale.length === 0 )
	return (<div>Шкала фактора не заполнена</div>);
	
	return (
		<div>
			<table className="library-pricing-factors__table-matrix">
				<thead>
					<tr>
						<th>{ " Объект аналог/Объект оценки "}</th>
						{ scale.map( ( items ) => <th key={ items.id }>{ items.title }</th> ) }
					</tr>
				</thead>
				<tbody>
				{
				  scale.map ((items) => <ReportRow key={ items.id } scale={ scale } {...items} />)
				}
				</tbody>
			</table>
		</div>		
	);
}


const mapStateToProps = ( store ) => (
	{
		region: store.lk.region
	} );


export default connect( mapStateToProps, null, null, { pure: true } )( MatrixAdjustments );