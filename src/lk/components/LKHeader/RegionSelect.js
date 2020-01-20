// @flow
import React from "react";
import { connect } from "react-redux";

import { changeSettlement } from "lk/redux/actions.js";
import { ObjectTypeSelectWithLoadingByFirstLetters } from "../Select/ObjectTypeSelectWithLoadingByFirstLetters.jsx";


import "./css/styles__get-region.css";



type Props =
{
	currentRegionTitle: string,

	changeSettlement: ( number, string ) => void
};


type State =
{
	isRegionSelectInProcess: boolean
};



type Item =
{
	id: number,
	name: string
}



class RegionComponent extends React.Component <Props, State>
{
	constructor( props )
	{
		super( props );

		this.state =
		{
			isRegionSelectInProcess: false
		};
	}


	changeRegion = () => this.setState( { isRegionSelectInProcess: true } );

	closeSelectRegionInterface = () => this.setState( { isRegionSelectInProcess: false } );


	onRegionChange = ( item: Item ) =>
	{
		this.closeSelectRegionInterface();
		this.props.changeSettlement( item.id, item.name );
	};


	RegionSelect = () =>
	{
		const renderMenu = ( children ) => <ul>{ children }</ul>;
		const renderItem = ( item, isHighlighted ) => <li key={ item.id }>{ item.name }</li>;
		const renerInput = ( props ) => <React.Fragment><input name="get-region" type="text" { ...props } /><span onClick={ this.closeSelectRegionInterface }></span></React.Fragment>;


		return <ObjectTypeSelectWithLoadingByFirstLetters entity="FiasRegions" renderMenu={ renderMenu } renderItem={ renderItem } renerInput={ renerInput } onChange={ this.onRegionChange } />;
	}


	render()
	{
		const RegionSelect = this.RegionSelect;


		return (
			<div className="get-region">
				{ this.state.isRegionSelectInProcess ? <RegionSelect /> : <p onClick={ this.changeRegion }>{ this.props.currentRegionTitle }</p> }
			</div>
		);
	}
}



const mapStateToProps = ( store ) => (
	{
		currentRegionTitle: store.lk.currentRegionTitle
	} );


const mapDispatchToProps = ( dispatch ) => (
	{
		changeSettlement: ( guid, title ) => dispatch( changeSettlement( guid, title ) )
	} );


const RegionSelect = connect( mapStateToProps, mapDispatchToProps )( RegionComponent );

export { RegionSelect };