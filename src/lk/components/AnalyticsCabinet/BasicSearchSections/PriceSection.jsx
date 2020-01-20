// @flow
import React from "react";

import { Field } from "../Field.jsx";



function ActiveView( props )
{
	return (
		<div className="section-item type-price r-angle active">
			<div className="inner-container">
				<div className="inner-container__content price-range">
					<div className="input__box">
						<Field name="economic_operations_cost_from" className="input-style" placeholder="от" />
					</div>
					<div className="input__box">
						<Field name="economic_operations_cost_to" className="input-style" placeholder="до" />
					</div>
					<div className="input__box"><Field name="unitCost" type="checkbox" />&nbsp;Цена, ☧/м²</div>
				</div>
			</div>
			<div className="l-angle"></div>
		</div>
	);
}


function InactiveView()
{
	return (
		<div className="section-item type-price r-angle active">
			<div className="inner-container">
				<div className="inner-container__content">
					<div className="inner-container__title sub-title">
						<span>Цена, руб.</span>
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



export default function PriceSection( props )
{
	if( props.isActive )
		return ( <ActiveView /> );
	else
		return ( <InactiveView /> );
}