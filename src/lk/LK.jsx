// @flow

import React from "react";
import { connect } from "react-redux";

import loadable from "loadable-components";

import ModuleLoadingWaiter from "lk/components/ModuleLoadingWaiter.jsx";

import { getPermissions } from "lk/redux/actions.js";
import { haveReadPermission } from "lk/checkPermissions.js";
import { PERMISSION_ADMIN_MODULE, PERMISSION_IMPORT_OFFERS_MODULE } from "lk/constants.js";

import ModulesButtons from "./components/ModulesButtons/ModulesButtons.jsx";

import { Header } from "./components/LKHeader/Header.js";





const AnalyticsCabinet = loadable(
	() => import( /* webpackChunkName: "AnalyticsCabinet" */ "./components/AnalyticsCabinet/AnalyticsCabinet.jsx" ),
	{
		LoadingComponent: ModuleLoadingWaiter
	 } );


const Admin = loadable(
	() => import( /* webpackChunkName: "Admin" */ "./components/Admin/Admin.jsx" ),
	{
		LoadingComponent: ModuleLoadingWaiter
	} );


const LibraryFactors = loadable(
	() => import( /* webpackChunkName: "LibraryFactors" */ "./components/LibraryFactors/LibraryFactors.jsx" ),
	{
		LoadingComponent: ModuleLoadingWaiter
	} );


const OffersImport = loadable(
	() => import( /* webpackChunkName: "OffersImport" */ "./components/OffersImport/OffersImport.jsx" ),
	{
		LoadingComponent: ModuleLoadingWaiter
	} );



// <AdminBRO />
class LK extends React.Component
{
	componentDidMount()
	{
		this.props.getPermissions();
	}


	render()
	{
		return (
			<React.Fragment>
				<Header />
				<main>
					<div className="grid-row">
						<ModulesButtons />
						<div className="grid-cols-23">
							{ haveReadPermission( PERMISSION_IMPORT_OFFERS_MODULE ) && this.props.showOffersImport && <OffersImport /> }
							{ this.props.showSearchModule && <AnalyticsCabinet /> }
							{ this.props.showLibraryFactors && <LibraryFactors /> }
							{ haveReadPermission( PERMISSION_ADMIN_MODULE ) && this.props.showAdminModule && <Admin />
							}
						</div>
					</div>
				</main>
			</React.Fragment>
		);
	}
}



const mapStateToProps = ( store ) => (
	{
		permissions: store.lk.permissions, // Component have to update on this field change
		showSearchModule: store.lk.showSearchModule,
		showOffersImport: store.lk.showOffersImport,
		showAdminModule: store.lk.showAdminModule,
		showLibraryFactors: store.lk.showLibraryFactors,
	} );


const mapDispatchToProps = ( dispatch ) => (
	{
		getPermissions: () => dispatch( getPermissions() )
	} );


LK = connect( mapStateToProps, mapDispatchToProps )( LK );

export default LK;