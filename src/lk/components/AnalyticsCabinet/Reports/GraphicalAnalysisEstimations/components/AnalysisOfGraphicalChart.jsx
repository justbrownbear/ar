// @flow strict

import * as React from "react";

import { ComposedChart, ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend, Surface, Area, Line, Brush, ResponsiveContainer } from "recharts";

import isEqual from "lodash/isEqual";
import { Boxplot, computeBoxplotStats } from "react-boxplot";
import md5 from "js-md5";

import numbers from "lk/components/util/numbers/numbers.js";
import { NormSInv } from "lk/components/util/numbers/numbersPlus.js";

type ScatterRow =
{
	x: number,
	y: number,
	cadastralNumber: string
};


type State =
{
	sourceMD5: string,
	scatter: number,
	density1: Array<ScatterRow> | null,
	density2: Array<ScatterRow> | null
};


const getMD5 = ( data ) => md5( JSON.stringify( data ) );


export class AnalysisOfGraphicalChart extends React.Component <Props, State>
{
	constructor( props: Props )
	{
		super( props );

		this.state = AnalysisOfGraphicalChart.prepareStateForNewSource( props.data );
	}


	static prepareStateForNewSource( data: Array<SourceObject> )
	{
		let sourceMD5 = null;
		const densityScatter1 = [];
		const densityScatter2 = [];
		const valuesLength = data.length;
		const values = data.map( ( element ) => Number( element.value ) );
		const dividers = data.map( ( element ) => ( element.divider ) ? Number( element.divider ) : 0 );
		const linearRegressionFunk =  numbers.statistic.linearRegression( values, dividers );
		const linearRegression = linearRegressionFunk( values );

		for( let i = 0; i < valuesLength; i++ )
		{
			const ScatterRow1 =
				{
					x: values[ i ],
					y: dividers[ i ],
					cadastralNumber: data[ i ].cadastral_number
				};


			const ScatterRow2 =
				{
					x: values[ i ],
					y: linearRegression[ i ].toFixed( 2 ),
					cadastralNumber: data[ i ].cadastral_number
				};

			densityScatter1.push( ScatterRow1 );
			densityScatter2.push( ScatterRow2 );
		}

		sourceMD5 = getMD5( data );

		const result =
		{
			sourceMD5: sourceMD5,
			scatter: 0,
			density1: densityScatter1,
			density2: densityScatter2
		};

		return result;
	}


	static getDerivedStateFromProps( nextProps: Props, prevState: State )
	{
		const nextSourceMD5 = getMD5( nextProps.data );

		if( nextProps.data !== undefined && !isEqual( nextSourceMD5, prevState.sourceMD5 ) )
			return AnalysisOfGraphicalChart.prepareStateForNewSource( nextProps.data  );

		return null;
	}


	render()
	{
		const { scatter, density1, density2 } = this.state;
		const { numericParametersDistributionAnalysisTitle } = 	this.props;
		return (
			<React.Fragment>
				<div className="lognormal-distribution__block graphycal-analysis__graph-container">
					<p className="lognormal-distribution__report-title">
					График пространственно-параметрических закономерностей</p>
					<p className="lognormal-distribution__report-title">
					Y = { numericParametersDistributionAnalysisTitle[1]} / X = { numericParametersDistributionAnalysisTitle[0]} <br />
					</p>
					<ResponsiveContainer width='100%' aspect={4.0/2.0}>
						<ScatterChart width={ 1000 } height={ 400 } margin={ {right: 60} }>
							<CartesianGrid stroke='#f5f5f5'/>
							<XAxis type="number" dataKey="x"/>
							<YAxis type="number" dataKey="y"/>
							<Tooltip />
							<Legend verticalAlign="bottom" align="left" iconType="square" height={36}/>
							<Scatter name="График функции зависимости характеристик" data={ density1 } fill="#d791d3" shape="square" dataKey="y" />
							<Scatter name="Линейная регрессия" type="monotone" data={ density2 } fill="#f78a67" line shape="square" dataKey="y" stroke="#f78a67" />
						</ScatterChart>
					</ResponsiveContainer>
				</div>
			</React.Fragment>
		);
	}
}