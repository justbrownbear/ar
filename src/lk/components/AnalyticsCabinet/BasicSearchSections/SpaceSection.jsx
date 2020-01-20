// @flow
import React from "react";

import { Field } from "../Field.jsx";



function ActiveView()
{


	return (
		<div className="section-item type-area active">
			<div className="inner-container">
				<div className="inner-container__content area-range">
					<div className="input__box">
						<Field name="space_from" className="input-style" placeholder="от" />
					</div>
					<div className="input__box">
						<Field name="space_to" className="input-style" placeholder="до" />
					</div>
					<div className="input__box">&nbsp;Площадь, м²</div>
				</div>
			</div>
			<div className="l-angle"></div>
		</div>
	);
}



function InactiveView()
{
	return (
		<div className="section-item type-area">
			<div className="inner-container">
				<div className="inner-container__content">
					<div className="inner-container__title sub-title">
						<span>Площадь, м<sup>2</sup></span>
						<p>
							от <span className="js__range_from">/</span><span className="js__range_to"> до </span>
						</p>
					</div>
					<span className="a-icon-x a-icon-size-x icon-arrow-down"></span>
				</div>
			</div>
			<div className="l-angle"></div>
		</div>
	);
}



export default function SpaceSection( props )
{
	if( props.isActive )
		return ( <ActiveView /> );
	else
		return ( <InactiveView /> );
}