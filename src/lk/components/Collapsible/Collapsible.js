// @flow

import * as React from "react";
import { useState, useEffect } from "react";

import "./css/accordion.css";


type Props =
{
	isOpen?: boolean,
	title: string,
	renderTitle?: () => React.Node,
	children: React.Node
};




export function Collapsible( props: Props )
{
	const [ isOpen, setIsOpen ] = useState( props.isOpen || true );

	// При изменении props.isOpen обновляем внутренний стейт
	useEffect( () => setIsOpen( props.isOpen ), [ props.isOpen ] );


	let className = "analytic-office__collapsible-container";

	if( isOpen )
		className += " is-open";

	const renderTitle = props.renderTitle ? props.renderTitle() : null;

	const toggle = () => setIsOpen( !isOpen );


	return (
		<div className={ className }>
			<span className="analytic-office__collapsible-trigger" onClick={ toggle }>{ props.title }</span>
			{ renderTitle && <span className="analytic-office__select-all">{ renderTitle }</span> }

			<div className="analytic-office__collapsible-inner-container">
				{ props.children }
			</div>
		</div>
	);
}



// export class Collapsible extends React.Component <Props, State>
// {
// 	constructor( props: Props )
// 	{
// 		super( props );


// 		this.state =
// 		{
// 			isOpen: props.isOpen || true
// 		};
// 	}


// 	static getDerivedStateFromProps( nextProps, prevState )
// 	{
// 		if( prevState.isOpen === nextProps.isOpen )
// 			return null;

// 		return { isOpen: nextProps.isOpen };
// 	}


// 	toggle = () => this.setState( { isOpen: !this.state.isOpen } );


// 	render()
// 	{
// 		let className = "analytic-office__collapsible-container";

// 		if( this.state.isOpen )
// 			className += " is-open";

// 		const renderTitle = this.props.renderTitle ? this.props.renderTitle() : null;

// 		return (
// 			<div className={ className }>
// 				<span className="analytic-office__collapsible-trigger" onClick={ this.toggle }>{ this.props.title }</span>
// 				{ renderTitle && <span className="analytic-office__select-all">{ renderTitle }</span> }

// 				<div className="analytic-office__collapsible-inner-container">
// 					{ this.props.children }
// 				</div>
// 			</div>
// 		);
// 	}
// }