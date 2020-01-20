// @flow strict

import * as React from "react";

import { ComposedChart, ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend, Surface, Area, Line, Brush } from "recharts";

type ScatterRow =
{
	x: number,
	y: number,
	title:  text
};


export function  ChartFactor( props )
{
		
		const { scale } = props;
	
		if (!scale || scale.length === 0 )
		return (<div>Шкала фактора не заполнена</div>);
		
		const densityScatter1 = [];
		const densityScatter2 = [];
		const densityScatter3 = [];
		const densityScatter4 = [];
		const densityScatter5 = [];
	
		const valuesLength = scale.length;
				
		for( let i = 0; i < valuesLength; i++ )
		{
			const ScatterRow1 =
				{
					x: i,
					y: scale[ i ].start_value_of_economical_interval,
					title: ""
				};
										
			const ScatterRow2 =
				{
					x: i,
					y: scale[ i ].start_value_of_economical_confidence_interval,
					title: ""
				};
				
			const ScatterRow3 =
				{
					x: i,
					y: scale[ i ].mean_value_of_economical_interval,
					title: scale[ i ].title
				};
										
			const ScatterRow4 =
				{
					x: i,
					y: scale[ i ].end_value_of_economical_confidence_interval,
					title: ""
				};
				
				
			const ScatterRow5 =
				{
					x: i,
					y: scale[ i ].end_value_of_economical_interval,
					title: ""
				};
												
			densityScatter1.push( ScatterRow1 );
			densityScatter2.push( ScatterRow2 );
			densityScatter3.push( ScatterRow3 );
			densityScatter4.push( ScatterRow4 );
			densityScatter5.push( ScatterRow5 );

		}		
		return (
			<div className="library-pricing-factors__line-graph">
				<ScatterChart width={ 800 } height={ 400 } >
					<CartesianGrid stroke='#f5f5f5'/>
					<XAxis type="number" dataKey="x"/>
					<YAxis type="number" dataKey="y"/>
					<Tooltip />
					<Legend/>
					<Scatter  type='monotone' data={ densityScatter1 } fill='#d791d3' line shape="square" dataKey="y" name="начало интервала" stroke='#d791d3'/>
					<Scatter  type='monotone' data={ densityScatter2 } fill='#f78a67' line shape="square" dataKey="y" name="начало доверительного интервала" stroke='#f78a67'/>
					<Scatter  type='monotone' data={ densityScatter3 } fill='#d791d3' line shape="square" dataKey="y" name="среднее" stroke='#d791d3'/>
					<Scatter  type='monotone' data={ densityScatter4 } fill='#f78a67' line shape="square" dataKey="y" name="конец доверительного интервала" stroke='#f78a67'/>
					<Scatter  type='monotone' data={ densityScatter5 } fill='#d791d3' line shape="square" dataKey="y" name="конец интервала" stroke='#d791d3'/>
				</ScatterChart>
			</div>		
		);
}