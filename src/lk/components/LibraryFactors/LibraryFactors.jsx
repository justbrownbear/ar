// @flow
import React from "react";
import { connect } from "react-redux";

import { Navigation } from "./Navigation/Navigation.js";

import { toggleLibraryFactors } from "lk/redux/actions.js";



function LibraryFactors( props )
{
	const ListForm = props.listLibraryForm;

	return(
		<section className="b-section active">
			<div className="grid-row">
				<div className="grid-cols-24">
					<div className="b-section__container b-modul-a">
						<div className="b-section__controls">
							<ul>
								<li><i className="a-icon icon-arrow_maximize"></i></li>
								<li><i className="a-icon icon-arrow_minimize"></i></li>
								<li onClick={ () => props.toggleLibraryFactors() }><i className="a-icon icon-close"></i></li>
							</ul>
						</div>
						<div className="js__module_content">
							<div className="b-section__minimize hide">
								<div className="b-section__header">
									<div className="b-framework-icon">
										<span className="a-icon a-icon-small icon-library-pricing-factors-black"></span>
									</div>
									<div className="b-section__title">
										<span>Библиотека ценообразующих факторов рынка недвижимости</span>
										<p>описание факторов</p>
									</div>
								</div>
							</div>

							<div className="b-section__maximize">
								<div className="b-section__header">
									<div className="b-framework-icon">
										<span className="a-icon a-icon-small icon-library-pricing-factors-black"></span>
									</div>
									<div className="b-section__title">
										<span>Библиотека ценообразующих факторов  рынка недвижимости</span>
										<p>описание факторов</p>
									</div>
								</div>

								<div className="b-section__sub-controls">
									<ul>
										<li><i className="a-icon a-icon-small icon-pin-black"></i></li>
										<li><i className="a-icon a-icon-small icon-move-black"></i></li>
									</ul>
								</div>

								<div className="b-section__content">

									<div className="b-appbar">
										<div className="b-appbar__container">
											<span className="b-appbar__title">Каталог характеристик рынка недвижимости</span>
										</div>
									</div>

									<div className="b-modul-a__container">
										<div className="b-modul-a__primary-nav">
											<Navigation />
										</div>
										{ ListForm ? <ListForm /> : <span /> }
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}



const mapStateToProps = ( store ) => (
	{
		listLibraryForm: store.libraryFactors.listLibraryForm
	} );


const mapDispatchToProps = ( dispatch ) => (
	{
		toggleLibraryFactors: () => dispatch( toggleLibraryFactors() )
	} );


export default connect( mapStateToProps, mapDispatchToProps, null, { pure: true } )( LibraryFactors );