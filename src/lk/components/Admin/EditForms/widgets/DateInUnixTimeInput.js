
import React from "react";



export default class DateInUnixTimeInput extends React.Component
{
	constructor( props )
	{
		super( props );

		this.state =
		{
			value: DateInUnixTimeInput.convertToDateWithoutTime( props.value )
		};
	}


	componentDidMount()
	{
		// Залипуха на обновление значения после рендеринга формы, взял 5 секунд
		setTimeout( () => this.updateInputValue( DateInUnixTimeInput.convertToDateWithoutTime( this.state.value ) ), 5000 );

		//this.updateInputValue( this.convertToTimestamp( this.state.value ) );
	}


	static getDerivedStateFromProps( nextProps: TM_PROPS_TYPE, prevState: TM_STATE_TYPE )
	{
		const newValue = DateInUnixTimeInput.convertToDateWithoutTime( nextProps.value );

		if( newValue !== prevState.value )
			return { value: newValue };

		return null;
	}



	static convertToDateWithoutTime( stringDate )
	{
		if( !stringDate )
			return "";

		const timePosition = stringDate.indexOf( "T" );

		return stringDate.substring( 0, timePosition !== -1 ? timePosition : stringDate.length );
	}


	onInputUpdate = ( event ) =>
	{
		this.setState( { value: event.target.value } );

		this.updateInputValue( DateInUnixTimeInput.convertToDateWithoutTime( event.target.value ) );
	}


	updateInputValue = ( timestampDate ) =>
	{
		this.props.onChange( timestampDate === "" ? undefined : timestampDate );
	}


	render()
	{
		return ( <input type="date" value={ this.state.value } onChange={ this.onInputUpdate } /> );
	}
}