// @flow
import React from "react";

import SelectComponent from "lk/components/Select/Select.jsx";



export default function ObjectTypeSelect( props )
{
	if( !props.options || !props.options.entity )
	{
		console.error( props );
		throw new Error( "Entity not set" );
	}


	const entity = props.options.entity;
	const additionalProperties = props.options;

	return <SelectComponent { ...props } entity={ entity } additionalProperties={ additionalProperties } />; //onChange={ props.onChange } />;
}