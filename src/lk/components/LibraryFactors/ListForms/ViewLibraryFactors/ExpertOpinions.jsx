// @flow strict

import * as React from "react";

import "./css/styles__library-pricing-factors.css";

export class ExpertOpinions extends React.Component <Props, State>
{
		
	constructor( props: Props )
	{
		super( props );
		
				
	}
	
	
	render()
	{
		const { scatter, density1, density2 } = this.state;	
				
		return (
			
			<div className="library-pricing-factors__section">
				<span className="library-pricing-factors__close-report"></span>
				<div className="library-pricing-factors__report-title">Мнение эксперта</div>
				<div className="library-pricing-factors__scale-wrapper">
					<img src="/custom/subjects/private_persons/PNwARfnFHV.jpg" className="library-pricing-factors__left-img" alt="expert image" />
					<p>{ this.props.expert_opinions.text }</p>
				</div>
			</div>

		);
	}
}