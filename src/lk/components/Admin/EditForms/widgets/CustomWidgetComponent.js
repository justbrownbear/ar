
import React from "react";

import getNumberIsPossible from "lk/components/util/getNumberIsPossible.js";



export default class CustomWidgetComponent extends React.Component
{
	shouldComponentUpdate( nextProps, nextState )
	{
		return !(
			getNumberIsPossible( this.props.value ) === getNumberIsPossible( nextProps.value ) &&
			this.props.disabled === nextProps.disabled &&
			this.props.readonly === nextProps.readonly &&
			this.state === nextState );
	}


	onInputUpdate = ( event ) =>
	{
		this.updateFormInputValue( event.target.value );
	}


	updateFormInputValue = ( value ) =>
	{
		this.props.onChange( value );
	}


	currentValue = () => this.props.value || "";


	render()
	{
		return ( <input type="text" value={ this.currentValue() } required={ this.props.value || false } disabled={ this.props.disabled || false } readOnly={ this.props.disabled || false } onChange={ this.onInputUpdate } /> );
	}
}