
import React from "react";
import { connect } from "react-redux";

import AdminListBase from "./AdminListBase.js";

import ReactPaginate from "react-paginate";
import ResultTable from "./components/ResultTableBRO.jsx";

import { ALL_OBJECTS, LAND, BUILDING, LETTER, ROOMS_GROUP, ROOM, INDUSTRIAL_ZONE, ASSET_GROUP } from "lk/constants.js";

import { OPERATION_LIST_ENTITIES } from "lk/operations";
import { getLKQuery } from "lk/redux/actions";

import { haveCreatePermission } from "lk/checkPermissions.js";




function broElementTitle( props )
{
	let objectTypeTitle = "Неизвестный тип объекта";

	switch( props.type )
	{
		case INDUSTRIAL_ZONE:
			objectTypeTitle = "ПЗ";
			break;

		case ASSET_GROUP:
			objectTypeTitle = "ИК";
			break;

		case LAND:
			objectTypeTitle = "ЗУ";
			break;

		case BUILDING:
			objectTypeTitle = "ОКС";
			break;

		case LETTER:
			objectTypeTitle = "Л";
			break;

		case ROOMS_GROUP:
			objectTypeTitle = "ГП";
			break;

		case ROOM:
			objectTypeTitle = "П";
			break;
	}


	return objectTypeTitle + " " + props.title;
}




class AdminListBRO extends AdminListBase
{
	constructor( props )
	{
		super( props );

		this.state =
		{
			entity: "RealObjects",
			items: [],
			id: "",
			cadastralNumber:	"",
			objectType:			ALL_OBJECTS,
			totalItems:			0,
			itemsOnPage:		25,
			currentPage:		0,
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
				cadastralNumber: this.state.cadastralNumber,
				objectType: this.state.objectType,
				itemsOnPage: this.state.itemsOnPage,
				currentPage: this.state.currentPage,
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


	onIdChange =				( event )	=> this.setState( { id: Number( event.target.value ) || "", currentPage: 0 } );
	onCadastralNumberChange =	( event )	=> this.setState( { cadastralNumber: event.target.value, currentPage: 0 } );
	onObjectTypeChange =		( event )	=> this.setState( { objectType: event.target.value, currentPage: 0 },	() => this.getItemsList() );
	onItemsOnPageChange =		( event )	=> this.setState( { itemsOnPage: event.target.value, currentPage: 0 },	() => this.getItemsList() );
	onPageChange =				( page )	=> this.setState( { currentPage: page.selected },		() => this.getItemsList() );
	sortById =					() => this.setState( { sortBy: this.state.sortBy[0] ? [ false, null] : [ true, null] },		() => this.getItemsList() );
	sortByTitle =					() => this.setState( { sortBy: this.state.sortBy[1] ? [ null, false ] : [ null, true ] },		() => this.getItemsList() );

	getURL =					()			=> "/admin/objects/real_objects";


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
					<div className="b-section__title-form">База реальных объектов</div>
						{
							haveCreatePermission( this.props.entity ) && (
							<div className="text-margin-t8x text-margin-b8x">
								<button type="button" className="btn" onClick={ () => this.props.editItem( { id: 0, type: INDUSTRIAL_ZONE } ) }>Добавить промзону</button>
								<button type="button" className="btn" onClick={ () => this.props.editItem( { id: 0, type: ASSET_GROUP } ) }>Добавить имущественный комплекс</button>
								<button type="button" className="btn" onClick={ () => this.props.editItem( { id: 0, type: LAND } ) }>Добавить ЗУ</button>
								<button type="button" className="btn" onClick={ () => this.props.editItem( { id: 0, type: BUILDING } ) }>Добавить ОКС</button>
								<button type="button" className="btn" onClick={ () => this.props.editItem( { id: 0, type: LETTER } ) }>Добавить литеру</button>
								<button type="button" className="btn" onClick={ () => this.props.editItem( { id: 0, type: ROOMS_GROUP } ) }>Добавить группу помещений</button>
								<button type="button" className="btn" onClick={ () => this.props.editItem( { id: 0, type: ROOM } ) }>Добавить помещение</button>
							</div>
							)
						}

					<div className="text-margin-t8x text-margin-b8x">
						id: <input type="text" value={ this.state.id } onChange={ this.onIdChange } />
						<button type="button" className="button button-green" onClick={ this.getItemsList }>Искать</button>
					</div>

					<div className="text-margin-t8x text-margin-b8x">
						Кадастровый номер: <input type="text" value={ this.state.cadastralNumber } onChange={ this.onCadastralNumberChange } />
						<button type="button" className="button button-green" onClick={ this.getItemsList }>Искать</button>
					</div>

					<div className="text-margin-t8x text-margin-b8x">
						Тип объекта:
						<select value={ this.state.objectType } onChange={ this.onObjectTypeChange }>
							<option value="0">Все</option>
							<option value="6">Промзона</option>
							<option value="7">Имущественный комплекс</option>
							<option value="1">Земельный участок</option>
							<option value="2">ОКС</option>
							<option value="3">Литера</option>
							<option value="4">Группа помещений</option>
							<option value="5">Помещение</option>
						</select>
					</div>

					<ResultTable items={ this.state.items } entity={ this.props.entity } sortById={ this.sortById } sortByTitle={ this.sortByTitle } editItem={ this.props.editItem } deleteItem={ this.deleteItem } titleView={ broElementTitle } />

					<select name="items_on_page" value={ this.state.itemsOnPage } onChange={ this.onItemsOnPageChange }>
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
						pageCount={ Math.ceil( this.state.totalItems / this.state.itemsOnPage ) }
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


export default connect( mapStateToProps, null, null, { pure: true } )( AdminListBRO );
