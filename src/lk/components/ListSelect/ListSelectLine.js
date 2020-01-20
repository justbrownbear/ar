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
	value: number | null,
	options: Array<OptionType>,
	disabled?: boolean,
	isCollapsible?: boolean,
	isCollapsed?: boolean,
	collapseDisabled?: boolean,
	ulAdditionalClass?: string,
	onChange: ( number ) => void
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
		return <li className="lognormal-distribution__graph-distribution-density-list-item-selected" onClick={ props.onClick }>{ props.title }</li>;

	return <li onClick={ props.onClick }>{ props.title }</li>;
}



export function ListSelectLine( props: Props ): React.Node
{
	const isCollapsible = props.isCollapsible === undefined ? true : props.isCollapsible;

	const onClick = ( id: number ) =>
	{
		if( props.disabled )
			return;

		props.onChange( id );
	};


	let ulClass = "lognormal-distribution__graph-distribution-density-list lognormal-distribution__graph-distribution-density-list";

	if( props.ulAdditionalClass !== undefined )
		ulClass += " " + props.ulAdditionalClass;

	if( isCollapsible )
	{
		let isCollapsed = props.isCollapsed || ( props.collapseDisabled && props.disabled ) || false;

		return (
			<Collapsible title={ props.title } isOpen={ !isCollapsed }>
				<ul className={ ulClass }>
					{
						props.options.map( ( option: OptionType ): React.Node => <Option key={ option.id } { ...option } active={ props.value == option.id } onClick={ (): void => onClick( option.id ) } /> )
					}
				</ul>
			</Collapsible>
		);
	}


	return (
		<ul className={ ulClass }>
			{
				props.options.map( ( option: OptionType ): React.Node => <Option key={ option.id } { ...option } active={ props.value == option.id } onClick={ (): void => onClick( option.id ) } /> )
			}
		</ul>
	);
}