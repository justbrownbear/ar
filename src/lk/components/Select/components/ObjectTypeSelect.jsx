// @flow
import * as React from "react";
import { connect } from "react-redux";

import { loadHelpersValues } from "lk/redux/actions.js";

import Select from "react-select";

import getNumberIsPossible from "lk/components/util/getNumberIsPossible.js";

import { getHash } from "lk/components/util/getHash.js";
import { isObservablePropsChanged } from "lk/components/util/isObservablePropsChanged.js";

import intersectionBy from "lodash/intersectionBy";
import find from "lodash/find";



const customStyle =
	{
		input: () => ( { maxHeight: 33, } )
	}



class ObjectTypeSelect extends React.Component
{
	componentDidMount()
	{
		// Если искомый справочник не закэширован, то его надо скачать
		if( !this.props.disabled && !this.props.items )
			this.props.loadHelpersValues( this.props.entity, this.props.additionalProperties );
	}


	getOptions = () =>
	{
		let options = [];

		if( this.props.items )
			this.props.items.map( ( option ) => options.push(
				{
					label: option.title,
					value: option.id
				} ) );

		return options;
	}


	shouldComponentUpdate( nextProps, nextState )
	{
		return isObservablePropsChanged(
			[ "value", "items", "hash", "disabled", "additionalProperties", "entity" ],
			this.props,
			nextProps
		);
	}


	componentDidUpdate( prevProps, prevState, snapshot )
	{
		// Если компонент не выключен и изменились определенные пропсы, то загрузим список значений для него
		if( !this.props.disabled && isObservablePropsChanged( [ "additionalProperties", "entity" ], this.props, prevProps ) )
		{
		 	this.props.loadHelpersValues( this.props.entity, this.props.additionalProperties );

		 	// Т.к. список выбора изменится, то сбрасываем выбранные значения селекта
		 	this.onChange( undefined );
		}
	}


	onChange = ( value ) =>
	{
		if( this.props.multipleSelect )
			this.props.onChange( value ? value.map( ( element ) => getNumberIsPossible( element.value ) ) : [] );
		else
			this.props.onChange( value ? getNumberIsPossible( value.value ) : undefined );
	}


	render()
	{
		const items = this.getOptions();
		const disabled = this.props.disabled || items.length === 0;

		let value = null;

		if( this.props.value )
			value = this.props.multipleSelect ?
					intersectionBy( items, this.props.value.map( ( arrayValue ) => ( { "value": arrayValue } ) ), "value" ) :
					find( items, { "value": this.props.value } );


		return (
			<Select
				simpleValue
				name={ this.props.name }
				value={ value }
				options={ items }
				styles={ customStyle }
				disabled={ disabled }
				onChange={ this.onChange }
				isClearable={ true }
				resetValue={ null }
				isMulti={ this.props.multipleSelect }
			/>
		);
	}
}



const mapStateToProps = ( store, ownProps ) => (
	{
		hash: getHash( ownProps.entity, ownProps.additionalProperties ),
		value: ownProps.value || null,
		items: store.lk.fullItems[ getHash( ownProps.entity, ownProps.additionalProperties ) ],
		disabled: ownProps.disabled,
		multipleSelect: ownProps.multipleSelect || false
	} );


const mapDispatchToProps = ( dispatch, ownProps ) => (
	{
		loadHelpersValues: ( entity, additionalProperties ) => dispatch( loadHelpersValues( entity, additionalProperties ) ),
		onChange: ownProps.onChange
	} );


// const mergeProps = ( stateProps, dispatchProps, ownProps ) =>
// {
// 	return Object.assign( {}, stateProps, dispatchProps );
// };


//export default connect( mapStateToProps, mapDispatchToProps, mergeProps, { pure: true } )( ObjectTypeSelect );
export default connect( mapStateToProps, mapDispatchToProps )( ObjectTypeSelect );