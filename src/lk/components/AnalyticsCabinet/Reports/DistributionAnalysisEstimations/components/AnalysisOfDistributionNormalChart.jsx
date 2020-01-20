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
const pi = 3.14;



export class AnalysisOfDistributionNormalChart extends React.Component <Props, State>
{
	constructor( props: Props )
	{
		super( props );

		this.state = AnalysisOfDistributionNormalChart.prepareStateForNewSource( props.data );
	}


	static prepareStateForNewSource( data: Array<SourceObject> )
	{
		let sourceMD5 = null;
		const densityScatter1 = [];
		const densityScatter2 = [];
		const valuesLength = data.length;
		const values = data.map( ( element ) => Number( element.value ) );
		const mean = numbers.statistic.mean( values );
		const standardDev = numbers.statistic.standardDev( values );
		var normals = 0;

		for( let i = 0; i < valuesLength; i++ )
		{
			const z = ( values[ i ] - mean ) / standardDev;
			const ScatterRow1 =
				{
					x: i,
					y: Math.round( 100 * z ) / 100,
					cadastralNumber: data[ i ].cadastral_number
				};

			normals = ( i + 1  - 3.0/8.0 ) / ( valuesLength + 1.0/4.0 );

			const ScatterRow2 =
				{
					x: i,
					y: NormSInv( normals ),
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
			return AnalysisOfDistributionNormalChart.prepareStateForNewSource( nextProps.data  );

		return null;
	}



	render()
	{
		const { scatter, density1, density2 } = this.state;


		const values = this.props.data.map( ( element ) => Number( element.value ) );
		const stats= computeBoxplotStats( values );

		return (
			<React.Fragment>
				<div className="lognormal-distribution__block">
					<p className="lognormal-distribution__report-title">График интегрального распределения</p>
					<p className="lognormal-distribution__report-title">QQ Plot</p>
					<ResponsiveContainer width='100%' aspect={4.0/2.0}>
						<ScatterChart width={ 1000 } height={ 400 } margin={{right: 60}}>
							<CartesianGrid stroke='#f5f5f5'/>
							<XAxis type="number" dataKey="x"/>
							<YAxis type="number" dataKey="y"/>
							<Tooltip />
							<Scatter type="monotone" data={ density1 } fill="#d791d3" line shape="square" dataKey="y" name="значение" stroke="#d791d3" />
							<Scatter type="monotone" data={ density2 } fill="#f78a67" line shape="square" dataKey="y" name="нормал." stroke="#f78a67" />
						</ScatterChart>
					</ResponsiveContainer>
					<p className="qqplot__text-p icon-interval-distribution-purple"><span></span> Распределение реальной выборки с нормализацией по функции (x - µ) /  σ</p>
					<p className="qqplot__text-p icon-interval-distribution-orange"><span></span> Функция обратная нормальному распределению (аналог NORM.INV)  от кумулятивной выборки полученной по формуле:</p>
					<p className="qqplot__text-p">Pk = (k-3/8)/(n+1/4) (см. ГОСТ Р ИСО 5479-2002)</p>
				</div>
			</React.Fragment>
		);
	}
}