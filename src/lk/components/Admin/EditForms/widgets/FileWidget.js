import React from "react";


export default function FileWidget( props )
{
	return (
		<a href={ "http://www.areall.ru/custom/real_objects/photo/" + props.value } target="__blank">
			<img width="146" height="110" src={ "http://www.areall.ru/custom/real_objects/photo/146x110/" + props.value } alt="" />
		</a>
	);
}