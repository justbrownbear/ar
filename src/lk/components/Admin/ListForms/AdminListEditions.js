
import React from "react";

import { connect } from "react-redux";

import AdminListBase from "./AdminListBase.js";

import ReactPaginate from "react-paginate";

import ResultTableEditions from "./components/ResultTableEditions.jsx";

import { ALL_OBJECTS, LAND, BUILDING, LETTER, ROOMS_GROUP, ROOM, INDUSTRIAL_ZONE, ASSET_GROUP } from "lk/constants.js";

import { OPERATION_LIST_ENTITIES } from "lk/operations";

import { getLKQuery } from "lk/redux/actions";

import DateRangePicker from "lk/components/AnalyticsCabinet/DateRangePicker.jsx";

import SelectComponent from "lk/components/Select/Select.jsx";

import { ObjectTypeSelectWithLoadingByFirstLetters } from "lk/components/Select/ObjectTypeSelectWithLoadingByFirstLetters.jsx";

import { haveCreatePermission } from "lk/checkPermissions.js";



class AdminListEditions extends AdminListBase
{
	constructor( props )
	{
		super( props );

		this.state =
		{
			entity: "Editions",
			items: [],
			id: "",
			settlement:	"",
			segment: 0,
			edition: 0,
			privatePerson: 0,
			factor: 0,
			start_interval: null,
		    finish_interval: null,
			totalItems:			0,
			limit:		25,
			offset:		0,
			sortBy: [ false, null]
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
				settlement: this.state.settlement,
				segment: this.state.segment,
				edition: this.state.edition,
				private_person: this.state.privatePerson,
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
	onSettlementChange =	( value )	=> this.setState( { settlement: value.id, offset: 0 },	() => this.getItemsList() );
	onSegmentChange =		( value )	=> this.setState( { segment: value, offset: 0 },	() => this.getItemsList() );
	onPrivatePersonChange =		( value )	=> this.setState( { privatePerson: value, offset: 0 },	() => this.getItemsList() );
	onFactorChange =		( value )	=> this.setState( { factor: value, offset: 0 } );
	onItemsOnPageChange =		( event )	=> this.setState( { limit: event.target.value, offset: 0 },	() => this.getItemsList() );
	onPageChange =				( page )	=> this.setState( { offset: page.selected },		() => this.getItemsList() );
	sortById =					() => this.setState( { sortBy: this.state.sortBy[0] ? [ false, null] : [ true, null] },		() => this.getItemsList() );
	sortByTitle =					() => this.setState( { sortBy: this.state.sortBy[1] ? [ null, false ] : [ null, true ] },		() => this.getItemsList() );

	getURL =					()			=> "/admin/objects/real_objects";


	deleteItem = ( id ) =>
	{
		this.props.deleteItem( id );

		this.setState( { items: this.state.items.filter( ( item ) => item.id !== id ) } );
	};

	cloneItem = ( id ) =>
	{
		this.props.cloneItem( id );

		this.getItemsList();
	};

	addItem = ( value ) =>
	{
		this.props.addItem( value );
	};


	listItem = ( id ) =>
	{
		this.setState( { edition: id } );
	};



	render = () =>
	{

		const region =
		{
			region: this.props.region
		};

		const edition =
		{
			edition: this.state.edition
		};

		return (
			<article className="b-section__form">
				<section className="b-section__article-container">
					<div className="b-section__title-form">Сборники и статьи</div>

					<div className="text-margin-t8x text-margin-b8x">
						{
							haveCreatePermission( this.props.entity ) &&
							(
								<button type="button" className="btn" onClick={ () => this.props.editItem( { id: 0 } ) }>Добавить Сборник</button>
							)
						}
					</div>


					<div className="text-margin-t8x text-margin-b8x">
						Сегмент:<SelectComponent entity="Segments" onChange={ this.onSegmentChange } value={ this.state.segment }/>
					</div>

					<div className="text-margin-t8x text-margin-b8x">
						НП:<ObjectTypeSelectWithLoadingByFirstLetters entity="Kladr" onChange={ this.onSettlementChange } value={ this.state.settlement } additionalProperties={ region }/>
					</div>

					<div className="text-margin-t8x text-margin-b8x">
						Субъект:<SelectComponent entity="PrivatePersons" onChange={ this.onPrivatePersonChange } value={ this.state.privatePerson }/>
					</div>

					<div className="text-margin-t8x text-margin-b8x">
						Фактор:<SelectComponent entity="GroupingFactors" onChange={ this.onFactorChange } value={ this.state.factor } additionalProperties={ edition }/>
					</div>

					<ResultTableEditions items={ this.state.items } sortById={ this.sortById } sortByTitle={ this.sortByTitle } editItem={ this.props.editItem } deleteItem={ this.deleteItem } cloneItem={ this.cloneItem } listItem={ this.listItem } addItem={ this.addItem } factor={ this.state.factor }/>

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


export default connect( mapStateToProps, null, null, { pure: true } )( AdminListEditions );
