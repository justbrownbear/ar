import React from "react";

import { getLKQuery } from "lk/redux/actions";
import { OPERATION_GET_ID_BY_CADASTRAL_NUMBER, OPERATION_GET_CADASTRAL_NUMBER_BY_ID } from "lk/operations.js";



export default class CadastralNumberToIdInput extends React.Component
{
	constructor( props )
	{
		super( props );

		if( !props.options.parentObjectType )
			throw "parentObjectType must be set";

		this.state =
		{
			value: ""
		};
	}


	componentDidMount()
	{
		// Если нам передан id объекта, то надо получить его кадастровый номер
		if( this.props.value )
			this.getCadastralNumberById( this.props.value );
	}


	onInputUpdate = ( event ) =>
	{
		this.setState( { value: event.target.value } );
		this.getId( event.target.value );
	}


	getId = ( cadastralNumber ) =>
	{
		const data =
		{
			operation: OPERATION_GET_ID_BY_CADASTRAL_NUMBER,
			entity: "RealObjects",
			data:
			{
				objectType: this.props.options.parentObjectType,
				cadastralNumber: cadastralNumber
			}
		};


		getLKQuery(
			data,
			json => this.props.onChange( json.id ),
			error => console.log( error )
		);
	}


	getCadastralNumberById = async ( id: string ) =>
	{
		var payload = {
			operation: OPERATION_GET_CADASTRAL_NUMBER_BY_ID,
			entity: "RealObjects",
			data:
			{
				id: id
			}
		};


		getLKQuery(
			payload,
			json => this.setState( { value: json.cadastral_number } ),
			error => console.log( error )
		);
	}


	render()
	{
		return ( <input type="text" value={ this.state.value } onChange={ this.onInputUpdate } /> );
	}
}