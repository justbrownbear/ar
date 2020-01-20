// @flow
import React from "react";
import { connect } from "react-redux";

import Select from "react-select";
//import "react-select/dist/react-select.css";

import getNumberIsPossible from "lk/components/util/getNumberIsPossible.js";
import { isObservablePropsChanged } from "lk/components/util/isObservablePropsChanged.js";

import intersectionBy from "lodash/intersectionBy";
import find from "lodash/find";



const customStyle =
	{
		input: () => ( { maxHeight: 33, } )
	}



class SelectWithOptions extends React.Component
{
	constructor( props )
	{
		super( props );

		this.state =
		{
			options: []
		};
	}


	componentDidMount()
	{
		// Т.к. по дизайну это селект с вложенными <option> внутри,
		// то соберем их в массив и передадим компоненту множественного селекта
		let options = [];

		React.Children.forEach( this.props.children, ( option ) => options.push(
			{
				label: option.props.children,
				value: option.props.value
			} ) );


		this.setState(
			{
				options: options
			} );
	}


	shouldComponentUpdate( nextProps, nextState )
	{
		return	isObservablePropsChanged( [ "value", "disabled" ], this.props, nextProps ) ||
				isObservablePropsChanged( [ "options" ], this.state, nextState );
	}


	onChange = ( value ) =>
	{
		if( this.props.multipleSelect )
			this.props.onChange( value ? value.map( getNumberIsPossible ) : [] );
		else
			this.props.onChange( value ? getNumberIsPossible( value.value ) : undefined );
	}


	render()
	{
		const items = this.state.options;
		let value = null;

		if( this.props.value )
			value = this.props.multipleSelect ?
					intersectionBy( items, this.props.value.map( ( arrayValue ) => ( { "value": arrayValue } ) ), "value" ) :
					this.props.value && find( items, { "value": this.props.value } );


		return (
			<Select
				simpleValue
				name={ this.props.name }
				value={ value }
				options={ items }
				styles={ customStyle }
				disabled={ this.props.disabled && this.state.options.length === 0 }
				onChange={ this.onChange }
				isClearable={ true }
				resetValue={ null }
				multi={ this.props.multipleSelect }
			/> );
	}
}



const mapStateToProps = ( store, ownProps ) => (
	{
		value: ownProps.value || null,
		children: ownProps.children,
		disabled:	ownProps.disabled === "disabled" ||
					ownProps.disabled ||
					false,
		multipleSelect: ownProps.multipleSelect || false
	} );


const mapDispatchToProps = ( dispatch, ownProps ) => (
	{
		onChange: ownProps.onChange
	} );


const mergeProps = ( stateProps, dispatchProps, ownProps ) =>
{
	return Object.assign( {}, stateProps, dispatchProps );
};


export default connect( mapStateToProps, mapDispatchToProps, mergeProps, { pure: true } )( SelectWithOptions );