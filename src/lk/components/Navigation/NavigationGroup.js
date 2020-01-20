// @flow
import React from "react";
import { NavigationGroupOrElement } from "./NavigationGroupOrElement.js";

import type { NavigationElementPropsType } from "./NavigationElement.js";


export type NavigationGroupPropsType =
{
	title: string,
	activeEntity: string | null,

	items: Array<NavigationGroupPropsType | NavigationElementPropsType>,

	onClick: ( {} ) => void
};


type State =
{
	isOpen: boolean
};



function NavigationGroupList( props )
{
	return (
		<ul className="b-modul-a__sibling-list">
			{ props.items.map( ( element ) => <NavigationGroupOrElement key={ element.entity } activeEntity={ props.activeEntity } onClick={ props.onClick } { ...element } /> ) }
		</ul>
	);
}



export class NavigationGroup extends React.PureComponent <NavigationGroupPropsType, State>
{
	constructor( props: NavigationGroupPropsType )
	{
		super( props );

		this.state =
		{
			isOpen: false
		};
	}


	// Раскрываем или закрываем группу
	toggle = () => this.setState( { isOpen: !this.state.isOpen } );


	render()
	{
		return(
			<div className={ this.state.isOpen ? "b-modul-a__sibling-nav active" : "b-modul-a__sibling-nav" } >
				<h4 onClick={ this.toggle }>{ this.props.title }<i className="a-icon icon-x-sidebar"></i></h4>
				{ this.state.isOpen && <NavigationGroupList items={ this.props.items } activeEntity={ this.props.activeEntity } onClick={ this.props.onClick } /> }
			</div>
		);
	}
}