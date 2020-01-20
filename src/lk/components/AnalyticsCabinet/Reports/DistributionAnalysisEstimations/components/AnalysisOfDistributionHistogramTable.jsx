// @flow

import * as React from "react";

import { Bar, XAxis, YAxis, ComposedChart, Line, ResponsiveContainer } from "recharts";

import ReactTable from "react-table";

import isEqual from "lodash/isEqual";
import md5 from "js-md5";

import { ListSelect } from "lk/components/ListSelect/ListSelect.js";
import { stringToNumber } from "lk/components/util/stringToNumber.js";
import { intervalsOfRIC } from "./rizJSON.js";

import numbers from "lk/components/util/numbers/numbers.js";

import "react-table/react-table.css";
import "./css/sort.css";

const RIC1 = 1;
const RICOZ = 2;
const RICCZ = 3;

type HistogramObject =
{
	id: number | string,
	startOfInterval: number,
	endOfInterval: number,
	lengthOfInterval: number,
	middleOfInterval: number,
	frequency: number,
	frequencyPercentage: number,
	increasingPercentage: number,
	variationFactor: number,
	oscillationFactor: number
};



const fixedCellValue = ( data ) => data.value.toFixed( 2 );



type Props =
{
	source: Array<SourceObject>,
	numericParametersDistributionAnalysisTitle: string
};



type State =
{
	sourceMD5: string,
	histogramData: Array<HistogramObject> | null,

	minOfInterval: number,
	maxOfInterval: number,
	numberOfIntervals: number,
	stepOfInterval: number,
	typeOfRIC: number
};


const getMD5 = ( data ) => md5( JSON.stringify( data ) );


const fixedOrInteger = ( number ) => parseInt( number, 10 ) == number ? number : number.toFixed( 2 );

const intervals =
[
	{
		title: "Квартили",
		id: 4,
	},
	{
		title: "Квинтили",
		id: 5
	},
	{
		title: "Децили",
		id: 10
	},
	{
		title: "Процентили",
		id: 100
	}
];



const typesOfRIC =
[
	{
		title: "РИЦ 1",
		id: RIC1
	},
	{
		title: "РИЦ ОЗ",
		id: RICOZ
	},
	{
		title: "РИЦ ЦЗ",
		id: RICCZ
	}
];





export class AnalysisOfDistributionHistogramTable extends React.Component <Props, State>
{
	constructor( props: Props )
	{
		super( props );

		this.state = AnalysisOfDistributionHistogramTable.prepareStateForNewSource( props.source );
	}



	static getDerivedStateFromProps( nextProps: Props, prevState: State )
	{
		const nextSourceMD5 = getMD5( nextProps.source );

		if( nextProps.source !== undefined && !isEqual( nextSourceMD5, prevState.sourceMD5 ) )
			return AnalysisOfDistributionHistogramTable.prepareStateForNewSource( nextProps.source );


		return null;
	}



	static prepareStateForNewSource( source: Array<SourceObject> )
	{
		let sourceMD5 = null;
		let histogramData = null;

		let numberOfIntervals = 0;
		let stepOfInterval = 0;
		let minOfInterval = 0;
		let maxOfInterval = 0;


		if( source && source.length > 0 )
		{
			sourceMD5 = getMD5( source );

			minOfInterval = source[ 0 ].value;
			maxOfInterval = source[ source.length - 1 ].value;
			numberOfIntervals = 4;
			stepOfInterval = AnalysisOfDistributionHistogramTable.calculateStepOfInterval( minOfInterval, maxOfInterval, numberOfIntervals );

			histogramData = AnalysisOfDistributionHistogramTable.getHistogramData( source, minOfInterval, stepOfInterval, numberOfIntervals );
		}


		return (
			{
				sourceMD5: sourceMD5,
				histogramData: histogramData,

				minOfInterval: minOfInterval,
				maxOfInterval: maxOfInterval,
				numberOfIntervals: numberOfIntervals,
				stepOfInterval: stepOfInterval,
				typeOfRIC: 0,
				errorMessage: ""
			} );
	}



	static getHistogramDataByIntervalsArray = ( source: Array<SourceObject>, intervals: Array<number> ) =>
	{
		let histogramData = [];

		let currentIntervalCount = 0;

		let stepStart = intervals[ currentIntervalCount ];

		currentIntervalCount++;

		let stepEnd = intervals[ currentIntervalCount ];

		let countOfValuesInInterval = 0;
		let summOfValuesInInterval = 0;
		let numberIncreasing = 0;
		let stepValues = [];
		let mean = 0;


		if( source.length === 0 )
			return null;

		// Найдем начало интервала
		const firstIndex = source.findIndex( ( element ) => element.value >= intervals[ 0 ] );

		if( firstIndex === -1 )
			return null;

		// Найдем конец интервала
		let lastIndex = source.findIndex( ( element ) => element.value > intervals[ intervals.length - 1 ] );

		// Если не нашли корректный конец интервала, то выставляем его на конец выборки
		if( lastIndex === -1 )
			lastIndex = source.length;

		for( let i = firstIndex; i < lastIndex; i++ )
		{
			const isLastValue = i === lastIndex - 1;

			const currentValue = source[ i ].value;

			countOfValuesInInterval++;
			summOfValuesInInterval += currentValue;
			stepValues.push( currentValue );

			// Если мы на последнем элементе массива, то цикл и так закончится и nextValue нам
			//  не будет нужен, а следующий элемент не существует
			let nextValue = isLastValue ? 0 : source[ i + 1 ].value;

			// Если мы вышли за границы массива исходных, значений, то закрываем интервал
			if( isLastValue || nextValue > stepEnd )
			{
				do // У нас могут быть пустые интервалы, поэтому обработаем этот момент через лишний цикл
				{
					numberIncreasing = numberIncreasing + countOfValuesInInterval / source.length * 100;
					mean = summOfValuesInInterval / countOfValuesInInterval;

					const histogramTableRow =
					{
						id: currentIntervalCount,
						startOfInterval: stepStart,
						endOfInterval: stepEnd,
						lengthOfInterval: stepEnd - stepStart,
						frequency: countOfValuesInInterval,
						frequencyPercentage: countOfValuesInInterval / source.length * 100,
						increasingPercentage: numberIncreasing + countOfValuesInInterval / source.length * 100,
						middleOfInterval: mean || 0,
						variationFactor: ( stepEnd - stepStart ) / mean || 0,
						oscillationFactor:  numbers.statistic.standardDev( stepValues ) / mean || 0
					};

					histogramData.push( histogramTableRow );

					if( isLastValue )
						break;

					// Началом следующего интервала является конец предыдущего
					stepStart = stepEnd;

					currentIntervalCount++;

					stepEnd = intervals[ currentIntervalCount ];

					countOfValuesInInterval = 0;
					summOfValuesInInterval = 0;
					stepValues = [];
					mean = 0;
				}
				while( nextValue > stepEnd || currentIntervalCount === currentIntervalCount.length - 1 );
			}
		}


		return histogramData;
	};



	static getHistogramData = ( source: Array<SourceObject>, minOfInterval: number, stepOfInterval: number, numberOfIntervals: number ) =>
	{
		let intervals = [];


		if( source.length === 0 )
			return null;


		for( let i = 0; i < numberOfIntervals; i++ )
			intervals.push( minOfInterval + stepOfInterval * i );
			// intervals.push(
			// 	i + 1 === numberOfIntervals ?
			// 		source[ source.length - 1 ].value :
			// 		minOfInterval + stepOfInterval * i
			// );

		intervals.push( source[ source.length - 1 ].value );

		return AnalysisOfDistributionHistogramTable.getHistogramDataByIntervalsArray( source, intervals );
	}


	static getHistogramDataWithRIC = ( source: Array<SourceObject>, typeOfRIC: number ) =>
	{
		let intervals = [];
		let ricModuls = [];
		let ricIntervals = [];

		if( source.length === 0 )
			return null;

		ricModuls = intervalsOfRIC.filter( element => element.title === typesOfRIC[ typeOfRIC - 1 ].title );

		if( ricModuls.length === 0 )
			return null;

		ricIntervals = ricModuls[0].items.map( ( element ) => element.value );


		const intervalsLength = ricIntervals.length;

		const startValue = source[ 0 ].value;
		const endValue =source[ source.length - 1 ].value;

		intervals.push( startValue );

		for( let i = 0; i < intervalsLength; i++ )
		{
			if( ricIntervals[ i ] > startValue && ricIntervals[i] < endValue)
				intervals.push( ricIntervals[ i ] );
		}

		intervals.push( endValue );

		return AnalysisOfDistributionHistogramTable.getHistogramDataByIntervalsArray( source, intervals );
	}


	static getHistogramStatistics()
	{
	}


	onNumberOfIntervalsChange = ( event ) => this.setState( { numberOfIntervals: event.target.value } );

	handleChangeInputNumberOfIntervals = ( event ) => this.setNumberOfIntervalsAndRecalculateStep( Math.ceil( Number( event.target.value ) ) );


	static calculateStepOfInterval( minOfInterval: number, maxOfInterval: number, numberOfIntervals: number )
	{
		return ( maxOfInterval - minOfInterval ) / numberOfIntervals;
	}



	setNumberOfIntervalsAndRecalculateStep = ( numberOfIntervals: number ) =>
	{
		// Если человек удалил количество интервалов, то пересчитаем их исходя из интервала и шага интервала
		if( numberOfIntervals === 0 )
		{
			this.setState(
				{
					numberOfIntervals: Math.ceil( ( this.state.maxOfInterval - this.state.minOfInterval ) / this.state.stepOfInterval )
				} );

			return;
		}


		// Пользователь ввел вручную или кнопками количество интервалов, надо пересчитать шаг интервала
		const stepOfInterval = AnalysisOfDistributionHistogramTable.calculateStepOfInterval( this.state.minOfInterval, this.state.maxOfInterval, numberOfIntervals );

		this.setState(
			{
				numberOfIntervals: numberOfIntervals,
				typeOfRIC: 0,
				stepOfInterval: stepOfInterval,
				histogramData: AnalysisOfDistributionHistogramTable.getHistogramData( this.props.source, this.state.minOfInterval, stepOfInterval, numberOfIntervals )
			}
		);
	};



	setIntervalsOfRIC = ( typeOfRIC: number ) =>
	{
		// Пользователь выбрал тип РИЦ, и нужно загрузить в таблицу интервалы из РИЦ
		this.setState(
			{
				typeOfRIC: typeOfRIC,
				numberOfIntervals: 0,
				histogramData: AnalysisOfDistributionHistogramTable.getHistogramDataWithRIC( this.props.source, typeOfRIC )
			}
		);
	};



	handleChangeInputStepOfInterval = ( event ) =>
	{
		const stepOfInterval = Number( event.target.value );

		// Пользователь ввел вручную шаг интервала, надо пересчитать количество интервалов
		const numberOfIntervals = Math.ceil( ( this.state.maxOfInterval - this.state.minOfInterval ) / stepOfInterval );

		this.setState(
			{
				numberOfIntervals: numberOfIntervals,
				stepOfInterval: stepOfInterval,
				histogramData: AnalysisOfDistributionHistogramTable.getHistogramData( this.props.source, this.state.minOfInterval, stepOfInterval, numberOfIntervals )
			}
		);
	};



	handleChangeInputMinOfInterval = ( event ) =>
	{
		const minOfInterval = Number( event.target.value );

		// Пользователь ввел вручную минимум интервала, надо пересчитать шаг интервала
		const stepOfInterval = AnalysisOfDistributionHistogramTable.calculateStepOfInterval( minOfInterval, this.state.maxOfInterval, this.state.numberOfIntervals );


		this.setState(
			{
				minOfInterval: minOfInterval,
				stepOfInterval: stepOfInterval,
				histogramData: AnalysisOfDistributionHistogramTable.getHistogramData( this.props.source, this.state.minOfInterval, this.state.stepOfInterval, this.state.numberOfIntervals )
			}
		);
	};






	renderEditable = ( cellInfo ) =>
		<div
			style={{ backgroundColor: "#fafafa" }}
			contentEditable
			suppressContentEditableWarning
			onBlur={ e =>
			{
				const data = [ ...this.state.histogramData ];

				let value = stringToNumber( e.target.innerHTML );


				// Значение "до" не может быть меньше значения "от"
				// Значение "от" не может быть меньше значения "до"
				// СДЕЛАТЬ


				if( cellInfo.column.id === "startOfInterval" )
				{
					if( cellInfo.index === 0 ) // Первая строка
					{
						const sourceMin = this.props.source[ 0 ].value;

						// Если в первой строке значение "от" ниже минимума, то приводим к минимуму
						if( value < sourceMin )
						{
							value = sourceMin;
							e.target.innerHTML = value;
						}

						// Выставим введенное значение в поле "начиная с" и "гшаг интервала" выставим как в первой строке
						this.setState(
							{
								minOfInterval: value,
								stepOfInterval: data[ 0 ][ "endOfInterval" ] - value
							} );
					}
					else // не первая строка
					{
						// Значение "от" меньше даже значения "от" предыдущего периода
						if( value < data[ cellInfo.index - 1 ][ "startOfInterval" ] )
							this.setState( { errorMessage: "Периоды должны быть неразрывными" } );
						else
							// Если поправили значение "от", то в предыдущей строке надо выставить аналогичное значение "до"
							data[ cellInfo.index - 1 ][ "endOfInterval" ] = value;
					}
				}


				if( cellInfo.column.id === "endOfInterval" )
				{
					if( cellInfo.index === this.state.histogramData.length - 1 ) // Последняя строка
					{
						// Если в последней строке значение "до" выставлено выше максимума, то приводим к максимуму
						if( value > this.state.maxOfInterval )
						{
							value = this.state.maxOfInterval;
							e.target.innerHTML = value;
						}
					}
					else // Не последняя строка
					{
						// Значение "до" больше даже следующего значения "до"
						if( value > data[ cellInfo.index + 1 ][ "endOfInterval" ] )
							this.setState( { errorMessage: "Периоды должны быть неразрывными" } );
						else
							// Если поправили значение "до", то в следующей строке надо выставить такое же значение "от"
							data[ cellInfo.index + 1 ][ "startOfInterval" ] = value;
					}
				}


				// Ну и конечно же не забудем сохранить то значение, которое ввел пользователь
				data[cellInfo.index][cellInfo.column.id] = value;


				// Соберем в массив список интервалов и пересчитаем таблицу гистограммы
				let intervals = [];

				intervals.push( data[ 0 ][ "startOfInterval" ] );

				for( let i = 0; i < data.length; i++ )
					intervals.push( data[ i ][ "endOfInterval" ] );


				this.setState( { histogramData: AnalysisOfDistributionHistogramTable.getHistogramDataByIntervalsArray( this.props.source, intervals ) } );
			} }

			dangerouslySetInnerHTML={{ __html: fixedOrInteger( this.state.histogramData[ cellInfo.index ][ cellInfo.column.id ] ) }}
		/>;


	recalculateHistogam = () => this.setState( { histogramData: AnalysisOfDistributionHistogramTable.getHistogramData( this.props.source, this.state.minOfInterval, this.state.stepOfInterval, this.state.numberOfIntervals ) } );


	render()
	{
		if( this.state.histogramData == null )
			return null;


		const intervalsBySturges = ( 1 + 3.322 * Math.log( this.props.source.length ) ).toFixed( 2 );

		// На вход приходит разрешение
		const isUserCanCustomizeReport = this.props.isUserCanCustomizeReport;

		const intervalsWithPermissions = intervals.map( ( item ) => (
			{
				...item,
				disabled: !isUserCanCustomizeReport
			} ) );

		const typesOfRICWithPermissions = typesOfRIC.map( ( item ) => (
			{
				...item,
				disabled: !isUserCanCustomizeReport
			} ) );

		const tableHeader =
		[
			{
				Header: "№",
				accessor: "id",
				width: 36
			},
			{
				Header: "От",
				accessor: "startOfInterval",
				Cell: isUserCanCustomizeReport ? this.renderEditable : fixedCellValue
			},
			{
				Header: "До",
				accessor: "endOfInterval",
				Cell: isUserCanCustomizeReport ? this.renderEditable : fixedCellValue
			},
			{
				Header: "Шаг интервала",
				accessor: "lengthOfInterval",
				Cell: fixedCellValue
			},
			{
				Header: "Среднее значение",
				accessor: "middleOfInterval",
				Cell: fixedCellValue
			},
			{
				Header: "Частота",
				accessor: "frequency"
			},
			{
				Header: "%",
				accessor: "frequencyPercentage",
				Cell: fixedCellValue
			},
			{
				Header: "∑ %",
				accessor: "increasingPercentage",
				Cell: fixedCellValue
			},
			{
				Header: "К. вариации",
				accessor: "variationFactor",
				Cell: fixedCellValue
			},
			{
				Header: "К. осцилляции",
				accessor: "oscillationFactor",
				Cell: fixedCellValue
			}
		];

		return (
			<div className="lognormal-distribution__block">
				<p className="lognormal-distribution__report-title">Интервальный график количественного распределения характеристики "{ this.props.numericParametersDistributionAnalysisTitle[0] }"</p>
				<ResponsiveContainer width='100%' aspect={4.0/2.0}>
					<ComposedChart width={ 1000 } height={ 290 } data={ this.state.histogramData } margin={{right: 60}}>
						<Bar dataKey="frequency" name="частота" fill={ "#8884d8" } />
						<XAxis dataKey="id" />
						<YAxis />
						<Line type='monotone' dataKey="frequency" stroke='#ff7300'/>
					</ComposedChart>
				</ResponsiveContainer>

				<ResponsiveContainer width='100%' aspect={4.0/2.0}>
					<ReactTable
						columns={ tableHeader }
						data={ this.state.histogramData }
						keyField="id"
						className="-striped -highlight"
						pageSize={ this.state.histogramData.length }
						style={ { width: "1000", marginLeft: "40px" } }
						showPagination={ false }
					/>
				</ResponsiveContainer>
				{ this.state.errorMessage }
				<div className="grid-row">
					<div className="histogram__toolbar">
						<div className="histogram__list-radio-wrapper">
							<p className="histogram__list-radio-title">Функция огибающей линии</p>
							<ul className="histogram__list-radio">
								<li><input type="radio" />Экспоненциальная</li>
								<li><input type="radio" />Логарифмическая</li>
								<li><input type="radio" />Степенная</li>
								<li><input type="radio" />Линейная</li>
								<li><input type="radio" />Полиноминальная</li>
							</ul>
						</div>
						<div className="histogram__list-radio-wrapper">
							<ul className="histogram__list-radio">
								<li><input type="checkbox" />Показать область</li>
								<li><span className="histogram__select-range">-</span><span className="histogram__select-range"><input type="text" placeholder="8" /></span>σ</li>
								<li><span className="histogram__select-range">+</span><span className="histogram__select-range"><input type="text" placeholder="8" /></span>σ</li>
							</ul>
						</div>
						<div className="histogram__list-radio-wrapper">
							<p className="histogram__reference_information">Интервалов по Стёрджесу: N=1+3.322ln(n)={ intervalsBySturges }</p>
							<ul>
								<li>
									<span className="histogram__select-range">Количество интервалов</span>
									<span className="histogram__select-range">
										<input type="text" placeholder="4" value={ this.state.numberOfIntervals } onChange={ this.onNumberOfIntervalsChange } onBlur={ this.handleChangeInputNumberOfIntervals } disabled={ !isUserCanCustomizeReport } />
									</span>
								</li>
								<li>
									<span className="histogram__select-range">Шаг интервала</span>
									<span className="histogram__input-medium">
										<input type="text" value={ fixedOrInteger( this.state.stepOfInterval ) } onChange={ this.handleChangeInputStepOfInterval } disabled={ !isUserCanCustomizeReport } />
									</span>
									<span className="histogram__select-range">начиная с</span>
									<span className="histogram__input-medium">
										<input type="text" value={ fixedOrInteger( this.state.minOfInterval ) } onChange={ this.handleChangeInputMinOfInterval } disabled={ !isUserCanCustomizeReport } />
									</span>
								</li>
							</ul>
						</div>
					</div>
					<div className="histogram__buttons-section">
						<div className="histogram__list-radio-wrapper">
							<ListSelect
								value={ this.state.numberOfIntervals }
								onChange={ this.setNumberOfIntervalsAndRecalculateStep }
								options={ intervalsWithPermissions }
								ulAdditionalClass="histogram__list-buttons-change-intervals"
								isCollapsible={ false } />
						</div>
						<div className="histogram__list-radio-wrapper">
							<ListSelect
								value={ this.state.typeOfRIC }
								onChange={ this.setIntervalsOfRIC }
								options={ typesOfRICWithPermissions }
								ulAdditionalClass="histogram__list-buttons-change-intervals"
								isCollapsible={ false } />
						</div>
					</div>
					<div className="histogram__buttons-section">
						<div className="histogram__list-radio-wrapper">
							<ul className="histogram__list">
								<li className="histogram__list-item-selected">Среднее арифметическое</li>
								<li>Медиана</li>
								<li>Средневзвешенное</li>
								<li>Центр модального интервала</li>
								<li className="histogram__list-item-selected">Центр лог.норм. расп.</li>
								<li>Функция норм. расп.</li>
								<li>Интегральный ∑%</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
