// @flow
import React from "react";

import { ObjectTypeSelectWithLoadingByFirstLetters as ObjectTypeSelectWithLoadingByFirstLettersComponent } from "lk/components/Select/ObjectTypeSelectWithLoadingByFirstLetters.jsx";



export default function ObjectTypeSelectWithLoadingByFirstLetters( props )
{
	const onChange = ( item ) => props.onChange( item.id );
	const additionalProperties = props.formContext;

	return <ObjectTypeSelectWithLoadingByFirstLettersComponent { ...props } entity={ props.options.entity } onChange={ onChange } additionalProperties={ additionalProperties } />;
}