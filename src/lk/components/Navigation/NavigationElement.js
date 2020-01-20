// @flow
import * as React from "react";


export type NavigationElementPropsType =
{
	title: string,
	entity: string,

	activeEntity: string | null,

	onClick: ( {} ) => void
};



export function NavigationElement( props: NavigationElementPropsType )
{
	let spanClass = "sibling-link";

	if( props.entity === props.activeEntity )
		spanClass += " current";

	return(
		<li><span className={ spanClass } onClick={ () => props.onClick( props ) }>{ props.title }</span></li>
	);
}