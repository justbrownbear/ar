// @flow
import * as React from "react";

import { navigation } from "./navigationJson.js";

import { Navigation as NavigationCommon } from "../../Navigation/Navigation.js";

import { connect } from "react-redux";
import { showListForm } from "../redux/actions.js";

import intersectionBy from "lodash/intersectionBy";



export function NavigationConnected( props )
{
	const { permissions } = props;

	// We have to filter navigation by user's permissions
	const filteredNavigation = navigation.map( ( element ) => (
			{
				...element,
				items: intersectionBy( element.items, permissions, "entity" )
			} )
		);


	return <NavigationCommon items={ filteredNavigation } showListForm={ props.showListForm } />;
}



const mapStateToProps = ( store ) => (
	{
		permissions: store.lk.permissions, // Component have to update on this field change
	} );


const mapDispatchToProps = ( dispatch ) => (
	{
		showListForm: ( props ) => dispatch( showListForm( props ) )
	} );


export const Navigation = connect( mapStateToProps, mapDispatchToProps, null, { pure: true } )( NavigationConnected );