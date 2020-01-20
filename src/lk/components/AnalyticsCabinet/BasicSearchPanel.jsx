// @flow
import React from "react";
import { connect } from "react-redux";

import { toggleAdvancedSearch } from "./redux/actions.js";

import { OperationTypeSection } from "./BasicSearchSections/OperationTypeSection.jsx";
import SearchTypeSection from "./BasicSearchSections/SearchTypeSection.jsx";
import PriceSection from "./BasicSearchSections/PriceSection.jsx";
import SpaceSection from "./BasicSearchSections/SpaceSection.jsx";
import CadastreSection from "./BasicSearchSections/CadastreSection.jsx";
import { Field } from "formik";

import { haveReadPermission } from "lk/checkPermissions.js";
import { PERMISSION_ADVANCED_SEARCH_MODULE } from "lk/constants.js";




function BasicSearchPanel( props )
{
	return (
		<div className="b-search">
			<div className="b-search__wrapper">

				<div className="b-panel-controls">
					<ul>
						<li><i className="a-icon icon-arrow_minimize"></i></li>
						<li><i className="a-icon icon-close"></i></li>
					</ul>
				</div>

				<div className="b-section__navgroup">
					<div className="b-section__navgroup-inner">
						<div className="b-section__sidebar-group">
							<ul className="b-section__nav">
								<li>
									<span className="b-section__nav-item margin_right_20px">
										<span className="b-section__nav-item-case">
											<i className="a-icon a-icon-small icon-sorting"></i>
										</span>
										<span className="b-section__nav-item-label">Сортировки</span>
									</span>
								</li>
								{
									haveReadPermission( PERMISSION_ADVANCED_SEARCH_MODULE ) &&
									(
										<li onClick={ props.toggleAdvancedSearch }>
											<span className="b-section__nav-item margin_right_20px">
												<span className="b-section__nav-item-case">
													<i className="a-icon a-icon-small icon-zoom-in"></i>
												</span>
												<span className="b-section__nav-item-label">Расширенный поиск</span>
											</span>
										</li>
									)
								}
								<li>
									<div className="b-section__nav-item">
										<span className="b-section__nav-item-case">
											<i className="a-icon a-icon-small icon-close-white"></i>
										</span>
									</div>
								</li>
							</ul>
						</div>
						<div className="clear-fix"></div>
					</div>
				</div>

				<div className="b-search__container">
					<div className="b-search__movable-part">
						<Field name="operationType" component={ OperationTypeSection } />
						{ !props.showCadastreSection && <Field name="searchType" component={ SearchTypeSection } /> }
						{ !props.showCadastreSection && <PriceSection isActive={ true } /> }
						{ !props.showCadastreSection && <SpaceSection isActive={ true } /> }
						{ props.showCadastreSection && <CadastreSection /> }
					</div>
					<button className="section-item type-button" type="submit"></button>
				</div>
			</div>
		</div>
	);
}



const mapStateToProps = ( store ) => (
	{
		permissions: store.lk.permissions, // Component have to update on this field change
		showCadastreSection: store.analyticsCabinet.showCadastreSection
	} );


const mapDispatchToProps = ( dispatch ) => (
	{
		toggleAdvancedSearch: () => dispatch( toggleAdvancedSearch() )
	} );


export default connect( mapStateToProps, mapDispatchToProps )( BasicSearchPanel );