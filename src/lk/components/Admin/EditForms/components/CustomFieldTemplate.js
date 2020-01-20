// @flow
import React from "react";



export function CustomFieldTemplate( props )
{
	const { id, classNames, label, help, required, description, errors, children, hidden } = props;

	if( hidden || props.schema.type === "object" || ( props.schema.type === "array" && props.schema.items.type === "object" ) )
		return ( <div>{ children }</div> );

	return (
		<div className="grid-row grid-padded-v1x">
			<div className="grid-cols-6">
				<div className="group-block">
					<div className="element-form">
						<label htmlFor={ id } className="l_indent-for-name_element_form fr">
							{ label }{ required && <span className="star">* </span> }:
						</label>
					</div>
				</div>
			</div>
			<div className="grid-cols-16">
				<div className="group-block">
					<div className="element-form">
						{ children }
					</div>
					{ <font color="red">{ errors }</font> }
				</div>
			</div>
		</div>
	);
}