
import React from "react";

import { connect } from "react-redux";

import AdminListBase from "./AdminListBase.js";

import ReactPaginate from "react-paginate";

import ResultTableScales from "./components/ResultTableScales.jsx";

import { ALL_OBJECTS, LAND, BUILDING, LETTER, ROOMS_GROUP, ROOM, INDUSTRIAL_ZONE, ASSET_GROUP } from "lk/constants.js";

import { OPERATION_LIST_ENTITIES } from "lk/operations";

import { getLKQuery } from "lk/redux/actions";

import DateRangePicker from "lk/components/AnalyticsCabinet/DateRangePicker.jsx";

import SelectComponent from "lk/components/Select/Select.jsx";

import { ObjectTypeSelectWithLoadingByFirstLetters } from "lk/components/Select/ObjectTypeSelectWithLoadingByFirstLetters.jsx";



class AdminListScales extends AdminListBase
{
	constructor( props )
	{
		super( props );

		this.state =
		{
			entity: "Editions",
			items: [],
			id: "",
			segment: 0,
			edition: 0,
			factor: 0,
			start_interval: null,
		    finish_interval: null,
			totalItems:			0,
			limit:		25,
			offset:		0,
			sortBy: [ false, null, null]
		};
	}



	getItemsList = () =>
	{
		var payload =
		{
			operation: OPERATION_LIST_ENTITIES,
			entity: this.props.entity,
			data:
			{
				id: this.state.id,
				segment: this.state.segment,
				edition: this.state.edition,
				factor: this.state.factor,
				start_interval: this.state.start_interval,
			    finish_interval: this.state.finish_interval,
				limit: this.state.limit,
				offset: this.state.offset,
				region: this.props.region,
				sortBy: this.state.sortBy
			}
		};


		getLKQuery(
			payload,
			json => this.setState(
				{
					totalItems: json.totalItems,
					items: json.items
				} ),
			error => console.log( error )
		);
	};


	onIdChange =				( event )	=> this.setState( { id: Number( event.target.value ) || null, offset: 0 } );
	onSegmentChange =		( value )	=> this.setState( { segment: value, offset: 0 },	() => this.getItemsList() );
	onEditionChange =		( value )	=> this.setState( { edition: value, offset: 0 },	() => this.getItemsList() );
	onFactorChange =		( value )	=> this.setState( { factor: value, offset: 0 },	() => this.getItemsList() );
	onItemsOnPageChange =		( event )	=> this.setState( { limit: event.target.value, offset: 0 },	() => this.getItemsList() );
	onPageChange =				( page )	=> this.setState( { offset: page.selected },		() => this.getItemsList() );
	sortById =					() => this.setState( { sortBy: this.state.sortBy[0] ? [ false, null, null] : [ true, null, null] },		() => this.getItemsList() );
	sortByTitle =					() => this.setState( { sortBy: this.state.sortBy[1] ? [ null, false, null ] : [ null, true, null ] },		() => this.getItemsList() );
	sortBySegment =					() => this.setState( { sortBy: this.state.sortBy[2] ? [ null, null, false ] : [ null, null , true] },		() => this.getItemsList() );

	getURL =					()			=> "/admin/objects/real_objects";


	deleteItem = ( id ) =>
	{
		this.props.deleteItem( id );

		this.setState( { items: this.state.items.filter( ( item ) => item.id !== id ) } );
	};


	render = () =>
	{

		const region =  this.props.region;

		return (
			<article className="b-section__form">
				<section className="b-section__article-container">
					<div className="b-section__title-form">Интервалы шкал факторов</div>

					<div className="text-margin-t8x text-margin-b8x">
						Сегмент:<SelectComponent entity="Segments" onChange={ this.onSegmentChange } value={ this.state.segment }/>
					</div>

					<div className="text-margin-t8x text-margin-b8x">
						Сборник:<SelectComponent entity="Editions" onChange={ this.onEditionChange } value={ this.state.edition }/>
					</div>

					<div className="text-margin-t8x text-margin-b8x">
						Фактор:<SelectComponent entity="Factors" onChange={ this.onFactorChange } value={ this.state.factor }/>
					</div>

					<ResultTableScales items={ this.state.items } sortById={ this.sortById } sortByTitle={ this.sortByTitle } sortBySegment={ this.sortBySegment } editItem={ this.props.editItem } deleteItem={ this.deleteItem } />

					<select name="items_on_page" value={ this.state.limit } onChange={ this.onItemsOnPageChange }>
						<option value="25">25</option>
						<option value="50">50</option>
						<option value="100">100</option>
						<option value="500">500</option>
					</select>

					<ReactPaginate previousLabel="Предыдущая"
						previousClassName="prev_page"
						nextLabel="Следующая"
						nextClassName="next_page"
						breakLabel="..."
						breakClassName="interval"
						pageCount={ Math.ceil( this.state.totalItems / this.state.limit ) }
						marginPagesDisplayed={ 2 }
						pageRangeDisplayed={ 5 }
						onPageChange={ this.onPageChange }
						containerClassName="b-searching-results__pagination-nav"
						subContainerClassName="pages pagination"
						activeClassName="current" />
				</section>
			</article>
		);
	}
}



const mapStateToProps = ( store ) => (
	{
		region: store.lk.region
	} );


export default connect( mapStateToProps, null, null, { pure: true } )( AdminListScales );
