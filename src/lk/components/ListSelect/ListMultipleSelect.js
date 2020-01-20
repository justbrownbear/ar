// @flow

import * as React from "react";

import { Collapsible } from "../Collapsible/Collapsible";

import "./css/ListMultipleSelect.css";



type OptionType =
{
	id: number,
	title: string
};


type Props =
{
	title?: string,
	value: Array<number>,
	options: Array<OptionType>,
	disabled?: boolean,
	isCollapsed?: boolean,
	collapseDisabled?: boolean,
	ulAdditionalClass?: string,
	showSelectAllCheckbox?: boolean,
	onChange: ( Array<number> ) => void
};


type OptionProps =
{
	id: number,
	title: string,
	active: boolean,
	onClick: () => void
};




function Option( props: OptionProps ): React.Node
{
	if( props.active )
		return <li className="analytic-office__list-item-selected" onClick={ props.onClick }>{ props.title }</li>;

	return <li onClick={ props.onClick }>{ props.title }</li>;
}



export function ListMultipleSelect( props: Props ): React.Node
{
	const onClick = ( id: number ) =>
	{
		let newValue;

		if( props.disabled )
			return;

		const index = props.value.indexOf( id );


		if( index === -1 ) // Immutable add to array
			newValue = [ ...props.value, id ];
		else // Immutable delete from array
			newValue = props.value.slice( 0, index ).concat( props.value.slice( index + 1 ) );


		props.onChange( newValue );
	};


	const onSelectAllCheckboxChange = () => props.onChange( props.value.length === props.options.length ? [] : props.options.map( ( option: OptionType ) => option.id ) );

	let selectAll = null;

	// By default select all checkbox is shown
	if( props.showSelectAllCheckbox === undefined || props.showSelectAllCheckbox )
		selectAll = () => <span><input type="checkbox" className="analytic-office__select-all" disabled={ props.disabled } checked={ props.value.length === props.options.length ? "checked" : "" } onChange={ onSelectAllCheckboxChange } />Выделить все { props.value.length }/{ props.options.length }</span>;

	let ulClass = "analytic-office__container-list analytic-office__list";

	if( props.ulAdditionalClass !== undefined )
		ulClass += " " + props.ulAdditionalClass;

	let isCollapsed = props.isCollapsed || ( props.collapseDisabled && props.disabled ) || false;


	return (
		<Collapsible title={ props.title } renderTitle={ selectAll } isOpen={ !isCollapsed }>
			<ul className={ ulClass }>
				{
					props.options.map( ( option: OptionType ): React.Node => <Option key={ option.id } { ...option } active={ props.value.indexOf( option.id ) !== -1 } onClick={ (): void => onClick( option.id ) } /> )
				}
			</ul>
		</Collapsible>
	);
}