// @flow
import React from "react";
import { connect } from "react-redux";

import { toggleSearch, toggleOffersImport, toggleAdmin, toggleLibraryFactors } from "lk/redux/actions.js";
import { haveReadPermission } from "lk/checkPermissions.js";
import { PERMISSION_ADMIN_MODULE, PERMISSION_IMPORT_OFFERS_MODULE, PERMISSION_LIBRARY_FACTORS_MODULE } from "lk/constants.js";


function ModulesButtons( props )
{
	return (
		<div className="grid-cols-1">
			<aside className="b-modul-menu">
				<ul>
					{
						haveReadPermission( PERMISSION_IMPORT_OFFERS_MODULE ) &&
						<li className={ props.showOffersImport ? "active" : "" }>
							<div className="b-framework-icon" onClick={ () => props.toggleOffersImport() }>
								<span className="a-icon a-icon-small icon-import-offers"></span>
							</div>
						</li>
					}
					<li className={ props.showSearchModule ? "active" : "" }>
						<div className="b-framework-icon" onClick={ () => props.toggleSearch() }>
							<span className="a-icon a-icon-small icon-search"></span>
						</div>
					</li>
					{
						haveReadPermission( PERMISSION_LIBRARY_FACTORS_MODULE ) &&
						(
							<li className={ props.showLibraryFactors ? "active" : "" }>
								<div className="b-framework-icon" onClick={ () => props.toggleLibraryFactors() }>
									<span className="a-icon a-icon-small icon-appraiser-library-pricing-factors"></span>
								</div>
							</li>
						)
					}
					{
						haveReadPermission( PERMISSION_ADMIN_MODULE ) &&
						<li className={ props.showAdminModule ? "active" : "" }>
							<div className="b-modul-menu__item">
								<div className="b-framework-icon" onClick={ () => props.toggleAdmin() }>
									<span className="a-icon a-icon-small icon-lock"></span>
								</div>
							</div>
						</li>
					}
				</ul>
			</aside>
		</div>
	);
}



const mapStateToProps = ( store ) => (
	{
		permissions: store.lk.permissions, // Component have to update on this field change
		showSearchModule: store.lk.showSearchModule,
		showOffersImport: store.lk.showOffersImport,
		showAdminModule: store.lk.showAdminModule,
		showLibraryFactors: store.lk.showLibraryFactors
	} );


const mapDispatchToProps = ( dispatch ) => (
	{
		toggleSearch: () => dispatch( toggleSearch() ),
		toggleOffersImport: () => dispatch( toggleOffersImport() ),
		toggleAdmin: () => dispatch( toggleAdmin() ),
		toggleLibraryFactors: () => dispatch( toggleLibraryFactors() )
	} );


ModulesButtons = connect( mapStateToProps, mapDispatchToProps )( ModulesButtons );

export default ModulesButtons;