// @flow
import * as React from "react";

import { navigation } from "./navigationJson.js";

import { Navigation as NavigationCommon } from "../../Navigation/Navigation.js";

import { connect } from "react-redux";
import { showListForm } from "../redux/actions.js";



export function NavigationConnected( props )
{
	props.showListForm(
		{
			"entity": "Factors",
			"listForm": "AdminListLibraryFactors",
			"segment": 1
		} );

	return <NavigationCommon items={ navigation } showListForm={ props.showListForm } />;
}



const mapDispatchToProps = ( dispatch ) => (
	{
		showListForm: ( props ) => dispatch( showListForm( props ) )
	} );


export const Navigation = connect( null, mapDispatchToProps, null, { pure: true } )( NavigationConnected );