// @flow
import React from "react";
import { connect } from "react-redux";

import { Navigation } from "./Navigation/Navigation.js";

import { navigation } from "./Navigation/navigationJson.js";

import { toggleAdmin } from "lk/redux/actions.js";



function AdminConnected( props )
{
	const ListForm = props.listForm;
	const EditForm = props.editForm;

	return(
		<section className="b-section active">
			<div className="grid-row">
				<div className="grid-cols-24">
					<div className="b-section__container b-modul-a">
						<div className="b-section__controls">
							<ul>
								<li><i className="a-icon icon-arrow_maximize"></i></li>
								<li><i className="a-icon icon-arrow_minimize"></i></li>
								<li onClick={ () => props.toggleAdmin() }><i className="a-icon icon-close"></i></li>
							</ul>
						</div>
						<div className="js__module_content">
							<div className="b-section__minimize hide">
								<div className="b-section__header">
									<div className="b-framework-icon">
										<span className="a-icon a-icon-small icon-lock"></span>
									</div>
									<div className="b-section__title">
										<span>Администрирование</span>
										<p>Навигационная панель</p>
									</div>
								</div>
							</div>

							<div className="b-section__maximize">
								<div className="b-section__header">
									<div className="b-framework-icon">
										<span className="a-icon a-icon-small icon-lock-black"></span>
									</div>
									<div className="b-section__title">
										<span>Администрирование</span>
										<p>Навигационная панель</p>
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
											<span className="b-appbar__title">Навигационная панель</span>
										</div>
									</div>

									<div className="b-modul-a__container">
										<div className="b-modul-a__primary-nav">
											<Navigation sheme={ navigation } />
										</div>

										{ props.showEditForm ? <EditForm /> : <ListForm /> }
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
		showEditForm: store.admin.showEditForm,
		listForm: store.admin.listForm,
		editForm: store.admin.editForm
	} );


const mapDispatchToProps = ( dispatch ) => (
	{
		toggleAdmin: () => dispatch( toggleAdmin() )
	} );


export default connect( mapStateToProps, mapDispatchToProps, null, { pure: true } )( AdminConnected );