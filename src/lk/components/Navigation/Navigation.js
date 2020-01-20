// @flow
import * as React from "react";

import omit from "lodash/omit";

import { NavigationGroupOrElement } from "./NavigationGroupOrElement.js";

import type { NavigationElementPropsType } from "./NavigationElement.js";
import type { NavigationGroupPropsType } from "./NavigationGroup.js";


type Item = NavigationGroupPropsType | NavigationElementPropsType;


type Props =
{
	items: Array<Item>,
	showListForm: ( {} ) => void
};


type State =
{
	activeEntity: string | null
}



export class Navigation extends React.PureComponent <Props, State>
{
	constructor( props: Props )
	{
		super( props );

		this.state =
		{
			activeEntity: null
		};
	}


	onClickHandler = ( elementProps: NavigationElementPropsType ) =>
	{
		this.setState( { activeEntity: elementProps.entity } );
		this.props.showListForm( omit( elementProps, [ "activeEntity", "onClick" ] ) );
	}


	render()
	{
		return (
			<nav>
				{ this.props.items.map( ( element ) => <NavigationGroupOrElement key={ element.title } activeEntity={ this.state.activeEntity } onClick={ this.onClickHandler } { ...element } /> ) }
			</nav>
		);
	}
}