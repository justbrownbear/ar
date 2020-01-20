// @flow strict

import * as React from "react";

import { PieChart, Pie, Sector, Cell, Legend, Tooltip } from "recharts";

export function GraficalEstimationsPieChart( props: Props )
{
	const { data, nameChart } = props;
		
	if( data === null )
		return null;

	let countOfAllValues = data.length;
	const pieData = [];
	const COLORS = [];
	const ColorsSource = [ '#ffe790', '#8ec0d4',  '#a1e7c4',  '#fbd194', '#cdced7', '#bfe2e6', '#fed0b9', '#f9fdaa', '#a3ff8f', '#d8b6d5', '#a0d7e4',
		'#fdaea9', '#88ca66', '#d791d3', '#8ec0d4', '#a4d68d', '#f78a67'];
	 
	let k = 0;

	for( let i = 0; i < countOfAllValues; i++ )
	{
		let count = Number( data[ i ].count );
		if( count > 0 )
		{
			const piePiece =
			{
				name: data[ i ].title,
				value: count
			};
			pieData.push( piePiece );
		}

		COLORS.push( ColorsSource[ k ] );
		k++;
		if( k === 17 )
		k = k - 17;
	}

	const RADIAN = Math.PI / 180;                    
	const renderCustomizedLabel = ( { cx, cy, midAngle, innerRadius, outerRadius, percent, index } ) => {
 	const radius = innerRadius + ( outerRadius - innerRadius ) * 0.5;
  	const x  = cx + radius * Math.cos( -midAngle * RADIAN );
  	const y = cy  + radius * Math.sin( -midAngle * RADIAN );
 
  	return (
    <text x={ x } y={ y } fill="dark blue" textAnchor={ x > cx ? 'start' : 'end' } dominantBaseline="central" >
    	{ `${ ( percent * 100 ).toFixed( 2 ) }%` }
    </text>
  	); }; 

	
	return (
		<div className="grid-cols-6">
			<p className="report2-subtitle">Диаграмма { nameChart }</p>
				<PieChart width={ 600 } height={ 400 } margin={ { top: 20 } } >
        			<Pie
          				data={ pieData } 
          				cx={ 120 } 
          				cy={ 120 } 
          				labelLine={ false }
          				label={ renderCustomizedLabel }
          				outerRadius={ 120 } 
          				fill="#8884d8"
        				>
						{
							data.map( ( entry, index ) => <Cell fill={ COLORS[ index % COLORS.length ] } />)
						}
        			</Pie>
					<Tooltip />
      			</PieChart>
			<div id="chart" chartlassName="chart_container"></div>
		</div>		
	);
}