
import React from "react";

import { Field } from "../Field.jsx";



export default function CadastreSection( props )
{
	return (
		<div className="section-item type-cadastr">
			<div className="inner-container">
				<div className="inner-container__content">
					<div className="inner-container__title cadastral_number">
						<span>Кадастровый номер</span>
					</div>
					<div className="input__box">
						<Field name="cadastralNumber" className="input-style" type="text" placeholder="AA:BB:CCPPLL:KK" />
					</div>
				</div>
			</div>
			<div className="l-angle"></div>
		</div>
	);
}