
import React from "react";

import ReactPaginate from "react-paginate";
import ResultTable from "./components/ResultTable.jsx";

import filter from "lodash/filter";
import { getLKQuery } from "../../../redux/actions";
import { OPERATION_LIST_ENTITIES } from "../../../operations";

import { haveCreatePermission } from "lk/checkPermissions.js";



export default class AdminListBase extends React.Component
{
	constructor( props )
	{
		super( props );

		this.state =
		{
			entity: props.entity,
			items: [],
			totalItems:		0,
			limit:	25,
			offset:	0,
			sortBy: [ false, null]
		};
	}


	componentDidMount()
	{
		this.getItemsList();
	}


	onItemsOnPageChange =	( event )	=> this.setState( { limit: event.target.value, offset: 0 }, () => this.getItemsList() );
	onPageChange =			( page )	=> this.setState( { offset: page.selected }, () => this.getItemsList() );

	sortById =					() => this.setState( { sortBy: this.state.sortBy[0] ? [ false, null] : [ true, null] },		() => this.getItemsList() );
	sortByTitle =					() => this.setState( { sortBy: this.state.sortBy[1] ? [ null, false ] : [ null, true ] },		() => this.getItemsList() );


	getItemsList = () =>
	{
		var payload =
		{
			operation: OPERATION_LIST_ENTITIES,
			entity: this.props.entity,
			data:
			{
				id: this.state.id,
				cadastralNumber: this.state.cadastralNumber,
				objectType: this.state.objectType,
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


	deleteItem = ( id ) =>
	{
		this.props.deleteItem( id );

		this.setState( { items: this.state.items.filter( ( item ) => item.id !== id ) } );
	};



	render()
	{
		return (
			<article className="b-section__form">
				<section className="b-section__article-container">
					<div className="b-section__title-form">{ this.props.title }</div>

					<div className="text-margin-t8x text-margin-b8x">
						{
							haveCreatePermission( this.props.entity ) &&
							(
								<button type="button" className="btn" onClick={ () => this.props.editItem( { id: 0 } ) }>Добавить</button>
							)
						}
					</div>

					<ResultTable items={ this.state.items } entity={ this.props.entity } sortById={ this.sortById } sortByTitle={ this.sortByTitle } editItem={ this.props.editItem } deleteItem={ this.deleteItem } />

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
