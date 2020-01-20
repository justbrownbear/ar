// @flow
import * as React from "react";
import { connect } from "react-redux";

import { operationTypeChanged } from "../redux/actions.js";



type SingleOperation =
{
	id: number,
	title: string,
	group: number,
	haveCheckbox: boolean
};


type Operations = Array<SingleOperation>;


type OperationProps =
{
	...SingleOperation,
	className?: string,
	selected: boolean,
	disabled: boolean,
	currentGroup: number | null,
	onChange: ( id: number ) => void
};



const operations: Operations =
[
	{
		id: 0,
		title: "Объект",
		group: 1,
		haveCheckbox: false
	},
	{
		id: 6,
		title: "Кадастровая стоимость",
		group: 2,
		haveCheckbox: false
	},
	{
		id: 1,
		title: "Продажа",
		group: 3,
		haveCheckbox: true
	},
	{
		id: 2,
		title: "Аренда",
		group: 4,
		haveCheckbox: true
	},
	{
		id: 4,
		title: "Аукцион продажа",
		group: 3,
		haveCheckbox: true
	},
	{
		id: 8,
		title: "Аукцион аренда",
		group: 4,
		haveCheckbox: true
	},
	{
		id: 3,
		title: "Сделка продажа",
		group: 3,
		haveCheckbox: true
	},
	{
		id: 9,
		title: "Сделка аренда",
		group: 4,
		haveCheckbox: true
	},
	{
		id: 7,
		title: "В оценке продажа",
		group: 3,
		haveCheckbox: true
	},
	{
		id: 10,
		title: "В оценке аренда",
		group: 4,
		haveCheckbox: true
	},
/*	{
		id: 5,
		title: "Обмен"
		group: 6
	},*/
	{
		id: -1,
		title: "Все объекты",
		group: 7,
		haveCheckbox: false
	}
];



var groupTitles = [];
groupTitles[ 3 ] = "Продажа";
groupTitles[ 4 ] = "Аренда";



function OperationClickable( props: OperationProps ): React.Node
{
	return (
		<li onClick={ (): void | false => ( !props.disabled && props.onChange( props.id ) ) } className={ props.className }>
			<div className="list-item">
				<div className="list-title">
					<span>{ props.title }</span>
					<p>тип операции</p>
				</div>
				<div className="list-item-icon">
					<span className="a-icon a-icon-medium"></span>
				</div>
			</div>
		</li>
	);
}



function OperationWithCheckbox( props: OperationProps ): React.Node
{
	return (
		<li className={ props.className }>
			<div className="list-item">
				<div className="list-title">
					<span>{ props.title }</span>
					<input type="checkbox" className="operationType" onChange={ (): void => props.onChange( props.id ) } checked={ props.selected } disabled={ props.disabled } />
					<p>тип операции</p>
				</div>
				<div className="list-item-icon">
					<span className="a-icon a-icon-medium"></span>
				</div>
			</div>
		</li>
	);
}



function Operation( props: OperationProps ): React.Node
{
	let className = "";

	if( props.disabled )
		className = "b-search-section__dropdowns-disabled-items";

	return (
		props.haveCheckbox ?
			<OperationWithCheckbox { ...props } className={ className } /> :
			<OperationClickable { ...props } className={ className } />
	);
}



type Props =
{
	value: Array<number>,
	operationTypeChanged: ( Array<number> ) => void,
	onChange: ( Array<number> ) => void
};


type State =
{
	title: string,
	currentGroup: number | null
};



function OperationTypeSectionConnected( props: Props )
{
	// Ищет операцию по id, если не нашел, то возвращает элемент "Все операции"
	const getElementById = ( id: number ): SingleOperation => operations.find( ( element: SingleOperation ): boolean => element.id === id ) || operations[ operations.length - 1 ];


	var selectedValues = props.field.value;

	// Нам нужно знать текущую группу чекбоксов. Для этого берем первый из выбранных элементов и смотрим его группу.
	// Если это не чекбоксовый элемент (т.е. у него нет группы), то группа будет null
	const currentElement = getElementById( selectedValues[ 0 ] );
	const currentGroup = currentElement.haveCheckbox ? currentElement.group : null;

	// Если элемент в списке только один, то выводим его наименование в компоненте,
	//  а если их несколько, то общее название
	const title = selectedValues.length === 1 ? currentElement.title : groupTitles[ currentGroup ];

	const onChange = ( id: number ) =>
	{
		const fieldName = props.field.name;

		// Если это чекбоксовый элемент
		if( getElementById( id ).haveCheckbox )
		{
			// 1. Ставим активную группу чекбоксов
			// 2. Добавляем или удаляем элеменет из массива выбранных значений

			// Ищем кликнутый элемент в выбранных операциях
			const elementIndex = selectedValues.indexOf( id );

			// Такого элемента нет
			if( elementIndex === -1 )
			{
				// Если у нас есть одна выбранная операция не чекбоксового типа, то удалим её
				if( selectedValues.length === 1 && !getElementById( selectedValues[ 0 ] ).haveCheckbox )
					selectedValues = [ id ];
				else
					selectedValues = [ ...selectedValues, id ];
			}
			else
				// Такой элемент в списке выбранных операциях есть
				// Удаляем его
				selectedValues.splice( elementIndex, 1 );
		}
		else
			selectedValues = [ id ];


		// Если ничего не выбрано, то автоматический выбор на "Все объекты"
		if( selectedValues.length === 0 )
			selectedValues = [ -1 ];


		props.operationTypeChanged( selectedValues );
		props.form.setFieldValue( fieldName, selectedValues );
		props.form.setFieldTouched( fieldName, true );
	};


	return (
		<div className="section-item type-transaction r-angle active">
			<div className="inner-container">

				<div className="b-search-section__dropdowns">
					<ul className="level-1">
						<li>
							<div className="output-item list-dropdawn__wrap">
								<div className="list-item">
									<div className="list-title">
										<span>{ title }</span>
										<p>тип операции</p>
									</div>
									<div className="list-item-icon">
										<span className="a-icon a-icon-medium icon-sale"></span>
										<span className="a-icon-x a-icon-size-x icon-arrow-down"></span>
									</div>
								</div>
							</div>

							<ul className="level-2">
								{
									operations.map( ( element: SingleOperation ): React.Node =>
									{
										const selected = selectedValues.indexOf( element.id ) !== -1;
										const disabled = currentGroup != null && element.group !== currentGroup;

										return <Operation key={ element.id } currentGroup={ currentGroup } onChange={ onChange } selected={ selected } disabled={ disabled } { ...element } />;
									} )
								}
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}



const mapDispatchToProps = ( dispatch ) => (
{
	operationTypeChanged: ( id: number ): void => dispatch( operationTypeChanged( id ) )
} );


export const OperationTypeSection = connect( null, mapDispatchToProps )( OperationTypeSectionConnected );