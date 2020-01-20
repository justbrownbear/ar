// @flow strict

import * as React from "react";

import "./css/styles__library-pricing-factors.css";

import { getEntity } from "lk/components/entityUtils/getEntity.js"

import SelectComponent from "lk/components/Select/Select.jsx";

import { QuestionnairesScaleFactor } from "./QuestionnairesScaleFactor.jsx";

import { CardPrivatePersons } from "./CardPrivatePersons.jsx";



export class Questionnaires extends React.Component <Props, State>
{

	constructor( props: Props )
	{
		super( props );

		this.state =
		{
			formValues: {},
			expert: {},
			privatePerson: 0
		};

		this.getValues( props.id );

	}

	componentDidUpdate( prevProps )
	{
		if (this.props.id !== prevProps.id)
		{
		 this.getValues( this.props.id );
		}
	}



	onPrivatePersonChange =		( value )	=> this.setState( { privatePerson: value },  () => this.getExpert() );

	getValues = ( id ) => getEntity(
		"GroupingFactors",
		id,
		( json ) => this.setState( { formValues: json } ),
		( error ) => console.log( "Невозможно загрузить значения сущности: " + error ) );


	getExpert = () => getEntity(
		"PrivatePersons",
		this.state.privatePerson,
		( json ) => this.setState( { expert: json } ),
		( error ) => console.log( "Невозможно загрузить значения сущности: " + error ) );


	render()
	{
		const factors = this.state.formValues;
		const expert = this.state.expert;

		if (!factors.scale || factors.scale.length === 0 )
		return (<div>Шкала фактора не заполнена</div>);

		return (

			<div className="library-pricing-factors__section">
				<span className="library-pricing-factors__close-report" onClick={ this.props.toggleQuestionnaires }></span>
				<div className="grid-row">
				<div className="library-pricing-factors__report-title">Анкета для фактора <span className="text-decoration">«{ factors.real_estate_factor_title }»</span></div>
					<div className="grid-cols-18">
						<div className="text-margin-t8x text-margin-b8x">
							Выберите себя:<SelectComponent entity="PrivatePersons" onChange={ this.onPrivatePersonChange } value={ this.state.privatePerson }/>
						</div>
						{ factors.questionnaire ?
							<div>
								<span className="library-pricing-factors__desc-factors"><span className="bold-500">Вопрос:</span>{ factors.questionnaire }</span>
							</div> : <span className="library-pricing-factors__desc-factors">Заполните вопрос к анкете</span>
						}
						<QuestionnairesScaleFactor scale = { factors.scale } />
						<div className="bold-500">Комментарий эксперта:
							<p><textarea rows="10" cols="45" name="text"></textarea></p>
						</div>
						<div className="library-pricing-factors__buttons-wrapper"><button className="library-pricing-factors__button" type="button">СОХРАНИТЬ</button></div>
						*введите экспертные значения в пустые ячейки и нажмите на кнопку Сохранить
					</div>
					<div className="grid-cols-6">
						<CardPrivatePersons expert={ expert } />
					</div>
				</div>
			</div>
		);
	}


}