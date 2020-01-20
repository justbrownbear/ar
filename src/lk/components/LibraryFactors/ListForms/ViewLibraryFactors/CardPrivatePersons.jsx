
import React from "react";

import moment from "moment";

import "./css/styles__library-pricing-factors.css";

export function CardPrivatePersons( props )
{
	const { expert } = props;
	
	if (!expert )
	return (<div></div>);

	

	return (
			<div className="library-pricing-factors__block-expert vignette">
				<img alt="expert" className="vignette" src={ expert.photo ? ( "/custom/subjects/private_persons/" + expert.photo ) : "/img/blank_146x110.jpg" } />
				<p><span className="bold-500">Эксперт:</span><GetNames expert={ expert } /></p>
				<p><span className="bold-500">Профессия:</span><GetProfession expert={ expert } /></p>
				<p><span className="bold-500">Ученая степень, звание:</span><GetPost expert={ expert } /></p>
				<p><span className="bold-500">Профессиональное объединение:</span><GetProfessionalAssociation expert={ expert } /></p>
				<p><span className="bold-500">Образование:</span><GetЕducation expert={ expert } /></p>
				<p><span className="bold-500">Стаж работы:</span><GetWorkingStage expert={ expert } /></p>
				<p><span className="bold-500">Номер телефона:</span>{ expert.phone }</p>
				<p><span className="bold-500">E-mail:</span>{ expert.email }</p>
			</div>
		);
}

	function GetNames( props )
	{
		const { expert } = props;
		return( <span>{ expert.surname } { expert.name } { expert.middle_name }</span> );

	}
	
	function GetProfession( props )
	{
		const { expert } = props;
			
		if (!expert.profession || expert.profession.length === 0 )
			return (<span></span>);
			
		return( <span>{ expert.profession[0].title }</span> );

	}
	
	function GetPost( props )
	{
		const { expert } = props;
			
		if (!expert.interaction_period || expert.interaction_period.length === 0 )
			return (<span></span>);
			
		return( <span>{ expert.interaction_period[0].post }</span> );

	}
	
	
	function GetProfessionalAssociation( props )
	{
		const { expert } = props;
			
		if (!expert.professional_association || expert.professional_association.length === 0 )
			return (<span></span>);
			
		return( <span>{ expert.professional_association[0].id }</span> );

	}
	
	function GetЕducation( props )
	{
		const { expert } = props;
			
		if (!expert.education || expert.education.length === 0 )
			return (<span></span>);
			
		return( <span>{ expert.education[0].short_title }</span> );

	}
	
	
	function GetWorkingStage( props )
	{
		const { expert } = props;
			
		let result = 0;
			
		if (!expert.interaction_period || expert.interaction_period.length === 0 )
			return (<span></span>);
		
		let length = expert.interaction_period.length;
		
		for( let i = 0; i < length; i++ )
			{ 
			  let start = moment(expert.interaction_period[i].interaction_start_date);
			  let finish = moment();
			  if( expert.interaction_period[i].interaction_finish_date )
				  finish = moment(expert.interaction_period[i].interaction_finish_date);
			  result = finish.diff(start, 'years');
			}
		
		return( <span>{ result }</span> );

	}
	
