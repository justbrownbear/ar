// @flow

import * as React from "react";

import debounce from "lodash/debounce";

import Autocomplete from "react-autocomplete";

import { OPERATION_GET_SHORT_ENTITY, OPERATION_GET_SHORT_ENTITY_BY_FIRST_LETTERS } from "../../operations.js";
import { getLKQuery } from "../../redux/actions.js";


import "./css/drop-down_list.css";



type Props =
{
	entity: string,
	additionalProperties?: {},
	value?: string,
	onChange: ( value: any ) => void
};


type ItemObject =
{
	id: string,
	name: string
};


type State =
{
	value: string,
	items: Array<ItemObject>
};



const JSON_LIST_LOAD_TIMEOUT = 600;



export class ObjectTypeSelectWithLoadingByFirstLetters extends React.Component <Props, State>
{
	updateList: () => void;


	constructor( props: Props )
	{
		super( props );

		this.updateList = debounce( this.getByFirstLetters, JSON_LIST_LOAD_TIMEOUT );

		this.state =
		{
			value: "",
			items: []
		};
	}


	componentDidMount()
	{
		// Если нам передан id населенного пункта на входе, то надо получить его наименование
		if( this.props.value )
			this.getByGUID( this.props.value );
	}



	componentDidUpdate( prevProps: TM_PROPS_TYPE, prevState: TM_STATE_TYPE )
	{
		if( prevProps.value !== this.props.value )
			this.getByGUID( this.props.value );
	}



	onInput = ( event: string, value: string ) =>
	{
		this.setState( { value: value }, this.updateList );
	}


	onSelect = ( title: string, item: ItemObject ) =>
	{
		this.setState(
			{
				value: title,
				items: []
			} );

		this.props.onChange( item ? item : null );
	}



	getByFirstLetters = () =>
	{
		var payload =
		{
			operation: OPERATION_GET_SHORT_ENTITY_BY_FIRST_LETTERS,
			entity: this.props.entity,
			data:
			{
				firstLetters: this.state.value,
				...this.props.additionalProperties
			}
		};


		getLKQuery(
			payload,
			json => this.setState( { items: json.hasOwnProperty( "result" ) ? json.result : [] } ),
			error => console.log( error )
		);
	}



	getByGUID = async ( guid: string ): void =>
	{
		var payload = {
			operation: OPERATION_GET_SHORT_ENTITY,
			entity: this.props.entity,
			data:
			{
				id: guid,
				...this.props.additionalProperties
			}
		};


		getLKQuery(
			payload,
			json => this.setState( { value: json.result } ),
			error => console.log( error )
		);
	}


	renderMenu = ( children: {} ): React.Node => <div className="menu" children={ children } />;

	renderItem = ( item: ItemObject, isHighlighted: boolean ): React.Node => <div key={ item.id }>{ item.name }</div>;

	renerInput = ( props: {} ): React.Node => <span><input type="text" { ...props } /></span>;
	//<span><input type="text" { ...props } /><span onClick={ () => this.onSelect( "", null ) }>X</span></span>;


	render(): React.Node
	{

		return (
			<Autocomplete
				wrapperStyle={{ position: "relative" }}
				value={ this.state.value }
				items={ this.state.items }
				getItemValue={ item => item.name }
				onSelect={ this.onSelect }
				onChange={ this.onInput }
				renderMenu={ this.props.renderMenu || this.renderMenu }
				renderItem={ this.props.renderItem || this.renderItem }
				renderInput={ this.props.renerInput || this.renerInput }
			/> );
	}
}