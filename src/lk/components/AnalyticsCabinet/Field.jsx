// @flow
import * as React from "react";

import omit from "lodash/omit";

import { Field as FormikField } from "formik";
import { isObservablePropsChanged } from "lk/components/util/isObservablePropsChanged.js";


type FieldType =
{
	name: string,
	type: string,

	placeholder?: string,

	disabled?: boolean,

	component?: string
}



export function Field( props: FieldType )
{
	let component;


	if( props.component === undefined )
		component = Input;
	else
		component = FormikFieldStub;

	return <FormikField { ...props } component={ component } targetComponent={ props.component } />;
}



// Cклеиваем поля из props и props.field, при этом удаляя лишнее
const getRefinedProps = ( props ) => omit( { ...props, ...props.field }, [ "field", "form", "targetComponent" ] );



class Input extends React.Component
{
	shouldComponentUpdate( nextProps, nextState )
	{
		return isObservablePropsChanged(
			[ "value", "checked", "disabled", "type" ],
			getRefinedProps( this.props ),
			getRefinedProps( nextProps )
		);
	}


	render()
	{
		let value = this.props.field.value;

		if( value === undefined )
			value = "";

		const inputProps = omit( { ...this.props, ...this.props.field }, [ "field", "form", "targetComponent" ] );
		const onChange = ( event ) =>
		{
			let newValue;

			// Значение чекбоксов приходит не через value, а через checked
			if( this.props.type === "checkbox" )
				newValue = event.target.checked;
			else
				newValue = event.target.value === "" ? undefined : event.target.value;

			this.props.form.setFieldValue( this.props.field.name, newValue );
		};

		return <input { ...inputProps } onChange={ onChange } value={ value } />;
	}
}



function FormikFieldStub( props )
{
	const Component = props.targetComponent;
	const componentProps = getRefinedProps( props );

	const onChange = ( value ) => props.form.setFieldValue( props.field.name, value );

	return <Component { ...componentProps } onChange={ onChange } />;
}