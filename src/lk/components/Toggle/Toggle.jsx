// @flow
import * as React from "react";

import md5 from "js-md5";

import "./style.css";



type Props =
{
	name?: string,
	value: boolean,
	disabled?: boolean,
	onLabel?: string,
	offLabel?: string,
	onChange: () => void
};



export function Toggle( props: Props ): React.Node
{
	const id = md5( "-" + ( props.name || "name" ) + ( props.onLabel || "onLabel" ) + ( props.offLabel || "offLabel" ) );

	return (
		<React.Fragment>
			<input id={ id } name={ props.name } className="switch" type="checkbox" onChange={ props.onChange } checked={ !!props.value } />
			<label htmlFor={ id } className="switch-label">
				<span className="on">{ props.onLabel }</span>
				<span className="off">{ props.offLabel }</span>
			</label>
		</React.Fragment>
	);
}