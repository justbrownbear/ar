// @flow
import * as React from "react";

import { NavigationGroup } from "./NavigationGroup.js";
import { NavigationElement } from "./NavigationElement";

import type { NavigationElementPropsType } from "./NavigationElement.js";
import type { NavigationGroupPropsType } from "./NavigationGroup.js";



export function NavigationGroupOrElement( props: NavigationGroupPropsType | NavigationElementPropsType )
{
	// is elements group
	if( props.hasOwnProperty( "items" ) )
		return <NavigationGroup { ...props } />;

	return <NavigationElement key={ props.title } onClick={ props.onClick } { ...props } />;
}