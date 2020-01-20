// @flow strict

import * as React from "react";

import "./css/styles__library-pricing-factors.css";

export class Editions extends React.Component <Props, State>
{
		
	constructor( props: Props )
	{
		super( props );
		
		
	}
	
	
	render()
	{
				
		return (
			
			<div className="library-pricing-factors__section">
				<span className="library-pricing-factors__close-report"></span>
				<div className="library-pricing-factors__report-title">{ this.props.analytical_materials.title }</div>
				<div>{ this.props.analytical_materials.file }</div>
			</div>

		);
	}
}