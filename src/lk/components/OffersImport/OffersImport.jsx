// @flow
import React from "react";
import { connect } from "react-redux";

import { toggleOffersImport } from "lk/redux/actions.js";

import { ImportForm } from "./ImportForm.jsx";
import { Imports } from "./Imports.jsx";

import Select from "../Select/Select.jsx";

import "./css/styles__import_offers.css";


function OffersImport( props )
{
	return(
		<section className="b-section active">
			<div className="grid-row">
				<div className="grid-cols-24">
					<div className="b-section__container b-modul-a">
						<div className="js__module_content">
							<div className="b-section__minimize hide">
								<div className="b-section__header">
									<div className="b-framework-icon">
										<span className="a-icon a-icon-small icon-import-offers-black"></span>
									</div>
									<div className="b-section__title">
										<span>Загрузка оферт</span>
										<p>&nbsp;</p>
									</div>
								</div>
							</div>

							<div className="b-section__maximize">
								<div className="b-section__header">
									<div className="b-framework-icon">
										<span className="a-icon a-icon-small icon-import-offers-black"></span>
									</div>
									<div className="b-section__title">
										<span>Загрузка оферт</span>
										<p>&nbsp;</p>
									</div>
								</div>

								<div className="b-section__sub-controls">
									<ul>
										<li onClick={ () => props.toggleOffersImport() }><i className="a-icon a-icon-small icon-close-black"></i></li>
									</ul>
								</div>

								<div className="b-section__content">
									<ImportForm />

									<Imports />
								</div>
								</div>
							</div>
						</div>
					</div>
				</div>
		</section>
	);
}



const mapDispatchToProps = ( dispatch ) => (
	{
		toggleOffersImport: () => dispatch( toggleOffersImport() )
	} );


export default connect( null, mapDispatchToProps, null, { pure: true } )( OffersImport );