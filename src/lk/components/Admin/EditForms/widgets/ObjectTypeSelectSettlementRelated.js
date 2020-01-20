// @flow
import React from "react";

import SelectComponent from "lk/components/Select/Select.jsx";



export default function ObjectTypeSelectSettlementRelated( props )
{
	if( !props.options || !props.options.entity )
		throw new Error( "Entity not set" );


	const entity = props.options.entity;
	const additionalProperties =
	{
		...props.options,
		region: props.formContext.region,
		settlement: props.formContext.settlement
	};

	return <SelectComponent { ...props } entity={ entity } additionalProperties={ additionalProperties } />; //onChange={ props.onChange } />;
}