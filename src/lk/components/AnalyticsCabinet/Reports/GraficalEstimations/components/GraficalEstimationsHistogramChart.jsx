// @flow strict

import * as React from "react";

import {  BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

export function GraficalEstimationsHistogramChart( props: Props )
{
	const { data, nameChart } = props;
		
	if( data === null )
		return null;

	let countOfAllValues = data.length;
	const histogramData = [];
	
	for( let i = countOfAllValues - 1; i >= 0; i-- )
	{
		let count = Number( data[ i ].count );
		if( count > 0 )
		{
			const histogramPiece =
			{
				name: data[ i ].title,
				value: count
			};
			histogramData.push( histogramPiece );
		}
	}
	
	return (
		<div className="grid-cols-8">
			<p className="report2-subtitle">Гистограмма { nameChart }</p>
				<BarChart width={ 550 } height={ 275 } data={ histogramData } margin={ { top: 30, left: -35 } } >
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip/>
					<Bar dataKey="value" name="количество" fill={ "#72a0d0" } />
				</BarChart>
			<div id="chart" chartlassName="chart_container"></div>
		</div>		
	);
}