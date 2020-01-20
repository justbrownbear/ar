// @flow
import * as React from "react";
import { connect } from "react-redux";

import loadable from "loadable-components";
import ModuleLoadingWaiter from "lk/components/ModuleLoadingWaiter.jsx";

//import yup, { number, string, date, array, boolean } from "yup";

import BasicSearchPanel from "./BasicSearchPanel.jsx";

//import { doSearch, onFormFieldChange } from "./redux/actions.js";
import { doSearch } from "./redux/actions.js";

import { haveReadPermission } from "lk/checkPermissions.js";
import { PERMISSION_ADVANCED_SEARCH_MODULE, PERMISSION_FAST_SEARCH_MODULE } from "lk/constants.js";

import { Formik, Form, Field } from "formik";



const AdvancedSearch = loadable(
	() => import( /* webpackChunkName: "AdvancedSearch" */ "./AdvancedSearch.jsx" ),
	{
		LoadingComponent: ModuleLoadingWaiter
	} );


const FastSearch = loadable(
	() => import( /* webpackChunkName: "FastSearch" */ "./FastSearch.jsx" ),
	{
		LoadingComponent: ModuleLoadingWaiter
	} );


const SearchResult = loadable(
	() => import( /* webpackChunkName: "SearchResult" */ "./SearchResult.jsx" ),
	{
		LoadingComponent: ModuleLoadingWaiter
	} );


// const schema = yup.object(
// 	{
// 		operationType: array().of( number() ),
// 		searchType: number(),
// 		cadastralNumber: string(),
// 		economic_operations_cost_from: number(),
// 		economic_operations_cost_to: number(),
// 		unitCost: boolean(),
// 		space_from: number(),
// 		space_to: number(),
// 		conventional_number: string().max( 60 ),
// 		economic_operations_date_from: string(), //date(),
// 		economic_operations_date_to: string(), //date(),
// 		region: string(),
// 		area: array().of( number() ),
// 		settlement: array().of( number() ),
// 		cadastral_quarter: string(),
// 		administrative_district: array().of( number() ),
// 		municipal_district: array().of( number() ),
// 		industrial_zone: array().of( number() ),
// 		microdistrict: array().of( number() ),
// 		street: array().of( number() ),
// 		house: string(),
// 		building: string(),
// 		construction: string().max( 4 ),
// 		letter: string().max( 7 ),
// 		rooms_group_number: string().max( 4 ),
// 		price_zone: array().of( number() ),
// 		urban_area: array().of( number() ),
// 		development_control_zone: string().max( 8 ),
// 		within_the_boundaries_of_locality: boolean(),
// 		land_category: array().of( number() ),
// 		land_allowed_usage: array().of( number() ),
// 		land_type: array().of( number() ),
// 		building_category: array().of( number() ),
// 		building_kind: array().of( number() ),
// 		building_type: array().of( number() ),
// 		building_class: array().of( number() ),
// 		building_subclass: array().of( number() ),
// 		building_morphotype: array().of( number() ),
// 		interval: number(),
// 		completion_of_construction: array().of( number() ),
// 		source_type: number(),
// 		rooms_group_kind: array().of( number() ),
// 		rooms_group_type: array().of( number() ),
// 		rooms_group_subtype: array().of( number() ),
// 		form_of_property_ownership: array().of( number() ),
// 		restriction_of_right: array().of( number() ),
// 		type_of_rent: number(),
// 		infrastructure_object: array().of( number() ),
// 		distance_to_infrastructure_object: number(),
// 		power_supply_type: number(),
// 		gas_supply_type: number(),
// 		water_supply_type: number(),
// 		sewerage_type: number(),
// 		heating_type: number(),
// 		hot_water_supply_type: number(),
// 		telecommunications: number(),
// 		security_access_control: number(),
// 		ventilation: number(),
// 		land_improvement: array().of( number() ),
// 		number_of_floors_from: string().max( 3 ),
// 		number_of_floors_to: string().max( 3 ),
// 		wall_material: array().of( number() ),
// 		durability_group: array().of( number() ),
// 		letter_deprecation_from: string().max( 3 ),
// 		letter_deprecation_to: string().max( 3 ),
// 		number_of_elevators: number(),
// 		number_of_freight_elevators: number(),
// 		building_title: string().max( 100 ),
// 		developer: array().of( number() ),
// 		building_year_from: string().max( 4 ),
// 		building_year_to: string().max( 4 ),
// 		building_stage: array().of( number() ),
// 		deadline_quarter: array().of( number() ),
// 		floor_from: number().max( 3 ),
// 		floor_to: number().max( 3 ),
// 		number_of_rooms: array().of( number() ),
// 		number_of_toilets: array().of( number() ),
// 		toilet_type: array().of( number() ),
// 		livingspace_from: number().max( 12 ),
// 		livingspace_to: number().max( 12 ),
// 		kitchen_space_from: number().max( 12 ),
// 		kitchen_space_to: number().max( 12 ),
// 		layout: array().of( number() ),
// 		windows_view: array().of( number() ),
// 		technical_condition: number(),
// 		rooms_group_improvement: array().of( number() ),
// 		ceiling_height_from: number().max( 4 ),
// 		ceiling_height_to: number().max( 4 ),
// 		number_of_balconies: number(),
// 		number_of_loggia: number(),
// 		rooms_group_technical_condition_from: string().max( 3 ),
// 		rooms_group_technical_condition_to: string().max( 3 ),
// 		rooms_group_decoration: array().of( number() )
// 	} );


const logError = ( errors ) =>
{
	console.log( "Search module validation error:" );
	console.log( errors );
};




export function updateSort( fieldName, sortField, sortBy, setFieldValue, setFieldTouched )
{
	const currentSort = sortBy[ sortField ];
	let newSort;

	if( currentSort === null )
		newSort = true;
	else
	if( currentSort === true )
		newSort = false;
	else
		newSort = null;

	let resultSortBy = [ null, null, null, null, null, null, null, null, null, null ];
	resultSortBy[ sortField ] = newSort;

	setFieldValue( fieldName, resultSortBy );
	setFieldTouched( fieldName, true );
}




class AnalyticsCabinet extends React.Component
{
	shouldComponentUpdate( nextProps, nextState )
	{
		let formValues = nextProps.formValues;

		// Если у нас сменился тип операции на любой, кроме "Объект", то надо удалить кадастровый номер
		if( nextProps.touchedFields.operationType === true )
		{
			nextProps.setFieldTouched( "operationType", false );

			if( nextProps.formValues.operationType.length >= 1 && nextProps.formValues.operationType[ 0 ] !== 0 )
			{
				delete formValues.cadastralNumber;
				nextProps.setFormValues( formValues );

				return false;
			}
		}


		if( nextProps.region !== formValues.region )
		{
			formValues =
			{
				...formValues,
				region: nextProps.region
			};

			nextProps.setFormValues( formValues );

			return false;
		}


		// Если изменился тип сортировки, то надо получить новые результаты поиска
		if( nextProps.touchedFields.sortBy === true )
		{
			nextProps.setFieldTouched( "sortBy", false );

			nextProps.handleSearchSubmit( formValues );

			return false;
		}


		// // Обрезаем пробелы у кадастрового номера
		// if( changedFields.indexOf( "cadastralNumber" ) > -1 )
		// 	searchConditions.cadastralNumber = searchConditions.cadastralNumber.trim();


		return true;
	}



	render()
	{
		return (
			<section className="grid-container search_bar">
				<div>
					<Form>
						<div className="grid-row">
							<div className="grid-cols-24">
								<BasicSearchPanel />
								{
									haveReadPermission( PERMISSION_ADVANCED_SEARCH_MODULE ) &&
									this.props.isAdvancedSearch &&
									<AdvancedSearch formValues={ this.props.formValues } setFormValues={ this.props.setFormValues } />
								}
							</div>
						</div>
						{
							haveReadPermission( PERMISSION_FAST_SEARCH_MODULE ) &&
							this.props.showFastSearch &&
							<FastSearch setFormValues={ this.props.setFormValues } />
						}
						{
							this.props.haveResult &&
							<SearchResult sortBy={ this.props.formValues.sortBy } />
						}
					</Form>
				</div>
			</section>
		);
	}
};



const searchConditionsInitialValues =
{
	operationType: [ 1 ],
	searchType: 1,
	region: "05426864-466d-41a3-82c4-11e61cdc98ce",
	sortBy: [ null, null, null, null, null, null, null, null, null, false ]
};



const MyForm = ( props ) =>
{
	return <Formik
		initialValues={ searchConditionsInitialValues }
		validateOnChange={ false }
		onSubmit={ ( values, action ) => props.handleSearchSubmit( values ) }
		render={ ( formikProps ) => <AnalyticsCabinet	{ ...props }
														touchedFields={ formikProps.touched }
														setFieldTouched={ formikProps.setFieldTouched }
														setFormValues={ formikProps.setValues }
														formValues={ formikProps.values } /> }
														/>;
		//ПОПРОБОВАТЬ СЮДА ЗАСАНДАЛИТЬ ПЛАГИН ВАЛИДАЦИИ
};



const mapStateToProps = ( store ) => (
	{
		//searchConditions: store.analyticsCabinet.searchConditions,
		region: store.lk.region,
		isAdvancedSearch: store.analyticsCabinet.isAdvancedSearch,
		showFastSearch: store.analyticsCabinet.showFastSearch,
		haveResult: store.analyticsCabinet.result && store.analyticsCabinet.result.length > 0,
		permissions: store.lk.permissions // Component have to update on this field change
	} );



const mapDispatchToProps = ( dispatch ) => (
	{
		handleSearchSubmit: ( values ) => dispatch( doSearch( values ) ),
		//onFormFieldChange: ( updatedValues, changedFields ) => dispatch( onFormFieldChange( updatedValues, changedFields ) )
	} );



export default connect( mapStateToProps, mapDispatchToProps )( MyForm );