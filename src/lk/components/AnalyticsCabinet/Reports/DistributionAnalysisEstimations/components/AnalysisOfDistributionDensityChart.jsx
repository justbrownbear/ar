// @flow strict

import * as React from "react";

import { ComposedChart, ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend, Surface, Area, Line, Brush, ResponsiveContainer } from "recharts";

import isEqual from "lodash/isEqual";
import sortBy from "lodash/sortBy";
import md5 from "js-md5";
import numbers from "lk/components/util/numbers/numbers.js";
import { normalDistribution, normalDistributionMean, grubbsCritery } from "lk/components/util/numbers/numbersPlus.js";
import { ListSelectLine } from "lk/components/ListSelect/ListSelectLine.js";

const REAL_DISTRIBUTION = 1;
const LOG_DISTRIBUTION = 2;
const NORMAL_DISTRIBUTION = 3;
const GRUBBS_90 = 1.64;
const GRUBBS_95 = 1.96;


const getMD5 = ( data ) => md5( JSON.stringify( data ) );


type ScatterRow =
{
	x: number,
	y: number,
	cadastralNumber: string
};

type ScatterRowWithId =
{
	id: number,
	x: number,
	interval: number,
	rankInterval: number,
	meanInterval: number,
	maxInterval: number,
	grubbs: number,
	valid: boolean,
	cadastralNumber: string
};

type intervalsRank =
{
	id: number,
	interval: number,
	rank: number
};

type State =
{
	sourceMD5: string,
	scatter: number,
	brush:{
			startIndex: number,
			endIndex: number
		},
	density: Array<ScatterRow> | null,
	currentFunction: number,
	currentCentre: number
};


const functionLine =
[
	{
		title: "Реальное распределение",
		id: REAL_DISTRIBUTION
	},
	{
		title: "Логарифм. распределение",
		id: LOG_DISTRIBUTION
	},
	{
		title: "Нормальное распределение",
		id: NORMAL_DISTRIBUTION
	}
];



function ReportRow( props )
{
	const { cadastralNumber, x, id, grubbs, valid } = props;

	return(
		<tr>
			<td>{ id }</td>
			<td>{ cadastralNumber }</td>
			<td>{ x }</td>
			{
				( valid )
					?
					<td id="lognormal-distribution__graph-distribution-density__cell-valid">{ grubbs }</td>
					:
					<td id="lognormal-distribution__graph-distribution-density__cell-invalid">{ grubbs }</td>
			}
		</tr>
	);

};



export class AnalysisOfDistributionDensityChart extends React.Component <Props, State>
{
	constructor( props: Props )
	{
		super( props );

		let endIndex = 0;

		if( props.data !== undefined  && props.data.length > 0)
			endIndex = props.data.length-1;

		this.state = AnalysisOfDistributionDensityChart.prepareStateForNewSource( props.data, props.centre, 1 , 0 , endIndex );

	}


	static prepareStateForNewSource( data: Array<SourceObject>, centre: number, currentFunction: number, startIndex: number, endIndex: number )
	{

		const density = [];
		const valuesLength = data.length;
		let values = data.map( ( element ) => Number( element.value ) );
		let currentCentre = centre;


		if( data && data.length > 0 && centre > 0 )
		{

			if( currentFunction  == LOG_DISTRIBUTION)
			{
				values = data.map( ( element ) => Math.log( element.value ) );
				currentCentre = numbers.statistic.mean( values );
			}
			else if( currentFunction  == NORMAL_DISTRIBUTION)
			{
				currentCentre = normalDistributionMean( values, centre );
				values = normalDistribution( values );
				values =  values.sort();
			}


			for( let i = 0; i < valuesLength; i++ )
			{
				const ScatterRow =
					{
						x: Number( values[ i ] ),
						y: Math.round( 1 / Math.exp( Math.abs( ( values[ i ] - currentCentre ) / currentCentre ) ) * 100 ) / 100,
						cadastralNumber: data[ i ].cadastral_number
					};
				density.push( ScatterRow );
			}

		}

		const sourceMD5 = getMD5( data );

		return (
			{
				sourceMD5: sourceMD5,
				brush:
				{
					startIndex: startIndex,
					endIndex: endIndex
				},
				density: density,
				currentFunction: currentFunction,
				currentCentre: currentCentre
			} );

	}


	static getDerivedStateFromProps( nextProps: Props, prevState: State )
	{
		const nextSourceMD5 = getMD5( nextProps.data );

		if( nextProps.data !== undefined && nextProps.data.length > 0 && !isEqual( nextSourceMD5, prevState.sourceMD5 ) )
			return AnalysisOfDistributionDensityChart.prepareStateForNewSource( nextProps.data, nextProps.centre, 1 , 0 , nextProps.data.length - 1  );

		return null;
	}


	handleChange = ( data ) => this.setState( { brush: data } );


	setCurrentFunction = ( currentFunction: number ) =>
	{
		// Изменение типа графика выводимой функции
		this.setState( AnalysisOfDistributionDensityChart.prepareStateForNewSource( this.props.data, this.props.centre, currentFunction, this.state.brush.startIndex, this.state.brush.endIndex ) );
	};



	render()
	{

		const { brush, density, currentCentre } = this.state;
		const densityBrush = [];
		const densityBrushLeft = [];
		const densityBrushRigth = [];

		for( let i = brush.startIndex; i <= brush.endIndex; i++ )
		{

			densityBrush.push( density[ i ] );
		}

		let dblength = densityBrush.length;
		const values = densityBrush.map( ( element ) => Number( element.x ) );

		if ( dblength > 10 )
		{
			for( let i = 0; i < 10; i++)
			{
				const grubbsCrLeft  = grubbsCritery( values, values[ i ] );
				const grubbsCrBoolLeft = ( grubbsCrLeft < GRUBBS_90)? true : false;
				const grubbsCrRigth  = grubbsCritery( values, values[ dblength - ( i + 1 ) ] );
				const grubbsCrBoolRigth = ( grubbsCrRigth < GRUBBS_90)? true : false;

				const ScatterRowWithLeft =
					{
						id: i + 1,
						x: values[ i ].toFixed( 2 ),
						grubbs: grubbsCrLeft.toFixed( 2 ),
						valid: grubbsCrBoolLeft,
						cadastralNumber: densityBrush[ i ].cadastralNumber
					};

				densityBrushLeft.push( ScatterRowWithLeft );

				const ScatterRowWithRigth =
					{
						id: dblength - i,
						x: values[ dblength - ( i + 1 ) ].toFixed( 2 ),
						grubbs: grubbsCrRigth.toFixed( 2 ),
						valid: grubbsCrBoolRigth,
						cadastralNumber: densityBrush[ dblength - ( i + 1 ) ].cadastralNumber
					};

				densityBrushRigth.push( ScatterRowWithRigth );

			}

		}

		const standardDeviation = numbers.statistic.standardDev( values ); // стандартное отклонение
		const min = density[ brush.startIndex].x;
		const max = density[ brush.endIndex ].x;
		const numberOfSigmaToLeft = ( ( currentCentre - min ) / standardDeviation ).toFixed( 2 ); // количество сигм слева
		const numberOfSigmaToRight = ( ( max - currentCentre ) / standardDeviation ).toFixed( 2 ); // количество сигм справа
		const numberOfSigma = ( ( max - min ) / standardDeviation ).toFixed( 2 ); // количество сигм
		const minX = density[ 0 ].x;
		const maxX = density[ density.length - 1 ].x;
		const margin =
		{
			top: 0,
			right: 0,
			bottom: 0,
			left: 0
		};

		const widthBrash = 1000;

		const CustomTooltip = ({ active, payload, label }) =>
		{
			if( active )
			{
				return (
					<div className="custom-tooltip" style={ { backgroundColor:'#fff' } } >
						<p className="label">{ `${ payload[0].value }` }</p>
						<p className="label">{ `${ label }`}</p>
					</div>
				);
			}

			return null;
		};

		let indexLeft = 1;
		let indexRigth = 1;

		// На вход приходит разрешение
		const isUserCanCustomizeReport = this.props.isUserCanCustomizeReport;

		const functionLineWithPermissions = functionLine.map( ( item ) => (
			{
				...item,
				disabled: !isUserCanCustomizeReport
			} ) );

		return (
			<div className="lognormal-distribution__block" >
				<p className="lognormal-distribution__report-title">График индивидуального распределения относительно центрального показателя "{ this.props.numericParametersDistributionAnalysisTitle[0] }"</p>
				<div className="grid-row">
					<ResponsiveContainer width='100%' aspect={4.0/2.0}>
						<ComposedChart width={ 1000 } height={ 400 }  margin={{right: 60}}>
							<CartesianGrid stroke='#f5f5f5'/>
							<XAxis type="number" dataKey="x" domain={[ minX, maxX ]}/>
							<YAxis type="number" dataKey="y" />
							<Tooltip content={<CustomTooltip />} />
							<Scatter type='linear' data={ densityBrush } fill='#ff7300' line shape="square" dataKey="cadastralNumber" stroke='#ff7300'/>
							<Area type='linear'  data={ densityBrush } dataKey="y" fill='#82ca9d' stroke='#ff7300'/>
						</ComposedChart>
					</ResponsiveContainer>
				</div>
				<div className="grid-row">
					<ResponsiveContainer width='100%' aspect={30.0/1.0}>
						<Surface width={ 1200 }  height={ 40 }>
							<Brush
								stroke="#82ca9d"
								startIndex={ brush.startIndex }
								endIndex={ brush.endIndex }
								x={ 60 }
								y={ 0 }
								width={ 1000 }
								height={ 40 }
								data={ density }
								dataKey="x"
								onChange={ this.handleChange }
							/>
						</Surface>
					</ResponsiveContainer>
				</div>
				<div className="grid-row lognormal-distribution__text-center">
					<span className="lognormal-distribution__span-number-objects">{ densityBrush.length } шт/{ ( 100 * densityBrush.length / density.length ).toFixed( 2 ) }%<span className="graph-distribution-density__sigma graph-distribution-density__block-sigma-margin-left">-</span><span className="graph-distribution-density__sigma">{ numberOfSigmaToLeft }</span>σ<span className="graph-distribution-density__sigma graph-distribution-density__sigma-margin-left">(∑ { numberOfSigma } σ )</span><span className="graph-distribution-density__sigma graph-distribution-density__sigma-margin-left">+</span><span className="graph-distribution-density__sigma">{ numberOfSigmaToRight }</span>σ</span>
				</div>
				<div className="grid-row lognormal-distribution__text-center">
					<ListSelectLine
						value={ this.state.currentFunction }
						onChange={ this.setCurrentFunction }
						options={ functionLine }
						ulAdditionalClass="lognormal-distribution__graph-distribution-density-list"
						isCollapsible={ false }
					/>
				</div>
				<div className="grid-row lognormal-distribution__text-center">Анализ выбросов "{ this.props.numericParametersDistributionAnalysisTitle[0] }"</div>
				<div className="grid-row">
					<div className="lognormal-distribution__graph-distribution-density-table-wrapper">
						<div className="grid-cols-12">
							<table className="lognormal-distribution__graph-distribution-density-table">
								<thead>
									<tr>
										<td className="lognormal-distribution__graph-distribution-density-table-title" colSpan="4">для минимальных значений</td>
									</tr>
									<tr>
										<th>№</th>
										<th>Кадастровый номер</th>
										<th>Значение</th>
										<th>Критерий Смирнова-Граббса</th>
									</tr>
								</thead>
								<tbody>
									{
										densityBrushLeft.map ((items) => <ReportRow key={ items.id } {...items}/>)
									}
								</tbody>
							</table>
						</div>
						<div className="grid-cols-12">
							<table className="lognormal-distribution__graph-distribution-density-table lognormal-distribution__graph-distribution-density-table-right">
								<thead>
									<tr>
										<td className="lognormal-distribution__graph-distribution-density-table-title" colSpan="4">для максимальных значений</td>
									</tr>
									<tr>
										<th>№</th>
										<th>Кадастровый номер</th>
										<th>Значение</th>
										<th>Критерий Смирнова-Граббса</th>
									</tr>
								</thead>
								<tbody>
									{
										densityBrushRigth.map ((items) => <ReportRow key={ items.id } {...items}/>)
									}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		);
	}
}