
import React from "react";
import ReactPaginate from "react-paginate";
import { connect } from "react-redux";

import thousandSeparator from "../util/thousandSeparator.js";
import roundingRules from "../util/roundingRules.js";

import { setItemsOnPage, getResultData, changeSort, setResultTableRef } from "./redux/actions.js";
import { ALL_OBJECTS, LAND, BUILDING, LETTER, ROOMS_GROUP, ROOM, INDUSTRIAL_ZONE, ASSET_GROUP,
	ALLOWED_USAGE_SORT, ADDRESS_SORT, CADASTRAL_NUMBER_SORT, NUMBER_OF_FLOORS_SORT, FLOOR_SORT,
	SPACE_SORT, UNIT_COST_SORT, COST_SORT, DATE_SORT, DEFAULT_MANTISSA, NULL_MANTISSA, DEFAULT_BOUNDARY, NULL_BOUNDARY, IS_WHOLE } from "lk/constants.js";
import { Field } from "formik";
import { updateSort } from "./AnalyticsCabinet.jsx";



const SortArrow = ( props ) =>
{
	if( props.direction === true )
		return ( <span className="a-icon-x icon-arrow-down-black rotate180"></span> );

	if( props.direction === false )
		return ( <span className="a-icon-x icon-arrow-down-black"></span> );

	return <span />;
};



let AssetGroupHeader = ( props ) =>
{
	const sortBy = props.form.values.sortBy;
	const changeSort = ( sortField ) => updateSort( props.field.name, sortField, sortBy, props.form.setFieldValue, props.form.setFieldTouched );

	return (
		<tr>
			<th width="3%">
				<div className="table-header__link" data-sort_type="type">
					<span className="table-header__title">N</span> <span className="table-header__sort-dir"><span className="a-icon-x icon-arrow-down-black hide"></span></span>
				</div>
			</th>
			<th className="column_favorites" width="3%"></th>
			<th className="column_type" width="6%" onClick={ () => changeSort( ALLOWED_USAGE_SORT ) }>
				<div className="table-header__link" data-sort_type="type">
					<span className="table-header__title">Тип</span>
					<span className="table-header__sort-dir"><SortArrow direction={ sortBy[ ALLOWED_USAGE_SORT ] } /></span>
				</div>
			</th>
			<th className="column_price" width="11%">
				<div className="table-header__link" data-sort_type="unit_price">
					<span className="table-header__title">Имя собственное</span>
				</div>
			</th>
			<th className="column_address" width="20%" onClick={ () => changeSort( ADDRESS_SORT ) }>
				<div className="table-header__link" data-sort_type="address">
					<span className="table-header__title">Адрес</span>
					<span className="table-header__sort-dir"><SortArrow direction={ sortBy[ ADDRESS_SORT ] } /></span>
				</div>
			</th>
			<th className="cadastral_number" width="15%" onClick={ () => changeSort( CADASTRAL_NUMBER_SORT ) }>
				<div className="table-header__link" data-sort_type="cadastral_number">
					<span className="table-header__title">Кадастровый номер</span>
					<span className="table-header__sort-dir"><SortArrow direction={ sortBy[ CADASTRAL_NUMBER_SORT ] } /></span>
				</div>
			</th>
			<th className="column_area" width="16%" onClick={ () => changeSort( SPACE_SORT ) }>
				<div className="table-header__link" data-sort_type="space">
					<span className="table-header__title">Площадь, м<sup>2</sup></span>
					<span className="table-header__sort-dir"><SortArrow direction={ sortBy[ SPACE_SORT ] } /></span>
				</div>
			</th>
			<th className="column_operation" width="3%">Операция</th>
			<th className="column_unit_price" width="16%" onClick={ () => changeSort( COST_SORT ) }>
				<div className="table-header__link" data-sort_type="price">
					<span className="table-header__title">Стоимость,</span> <span className="table-header__ruble"><i className="icon icon-ruble icon-black"></i></span>
					<span className="table-header__sort-dir"><SortArrow direction={ sortBy[ COST_SORT ] } /></span>
				</div>
			</th>
			<th className="column_data" width="7%" onClick={ () => changeSort( DATE_SORT ) }>
				<div className="table-header__link" data-sort_type="date">
					<span className="table-header__title">Дата</span>
					<span className="table-header__sort-dir"><SortArrow direction={ sortBy[ DATE_SORT ] } /></span>
				</div>
			</th>
		</tr>
	);
};



let LandHeader = ( props ) =>
{
	const sortBy = props.form.values.sortBy;
	const changeSort = ( sortField ) => updateSort( props.field.name, sortField, sortBy, props.form.setFieldValue, props.form.setFieldTouched );

	return (
		<tr>
			<th width="3%" className="column_favorites"></th>
			<th width="7%" className="column_type" onClick={ () => changeSort( ALLOWED_USAGE_SORT ) }>
				<div className="table-header__link" data-sort_type="type">
					<span className="table-header__title">Тип</span>
					<span className="table-header__sort-dir"><SortArrow direction={ sortBy[ ALLOWED_USAGE_SORT ] } /></span>
				</div>
			</th>
			<th width="28%" className="column_address" onClick={ () => changeSort( ADDRESS_SORT ) }>
				<div className="table-header__link" data-sort_type="address">
					<span className="table-header__title">Адрес</span>
					<span className="table-header__sort-dir"><SortArrow direction={ sortBy[ ADDRESS_SORT ] } /></span>
				</div>
			</th>
			<th width="15%" className="cadastral_number" onClick={ () => changeSort( CADASTRAL_NUMBER_SORT ) }>
				<div className="table-header__link">
					<span className="table-header__title">Кадастровый номер</span>
					<span className="table-header__sort-dir"><SortArrow direction={ sortBy[ CADASTRAL_NUMBER_SORT ] } /></span>
				</div>
			</th>
			<th width="13%" className="column_area" onClick={ () => changeSort( SPACE_SORT ) }>
				<div className="table-header__link" data-sort_type="space">
					<span className="table-header__title">Площадь, м<sup>2</sup></span>
					<span className="table-header__sort-dir"><SortArrow direction={ sortBy[ SPACE_SORT ] } /></span>
				</div>
			</th>
			<th width="11%" className="column_unit_price" onClick={ () => changeSort( UNIT_COST_SORT ) }>
				<div className="table-header__link" data-sort_type="unit_price">
					<span className="table-header__title">Цена, м<sup>2</sup></span>
					<span className="table-header__sort-dir"><SortArrow direction={ sortBy[ UNIT_COST_SORT ] } /></span>
				</div>
			</th>
			<th width="13%" className="column_price" onClick={ () => changeSort( COST_SORT ) }>
				<div className="table-header__link" data-sort_type="price">
					<span className="table-header__title">Цена,</span> <span className="table-header__ruble"><i className="icon icon-ruble icon-black"></i></span>
					<span className="table-header__sort-dir"><SortArrow direction={ sortBy[ COST_SORT ] } /></span>
				</div>
			</th>
			<th width="3%" className="column_photo"></th>
			<th width="7%" className="column_data" onClick={ () => changeSort( DATE_SORT ) }>
				<div className="table-header__link" data-sort_type="date">
					<span className="table-header__title">Дата</span>
					<span className="table-header__sort-dir"><SortArrow direction={ sortBy[ DATE_SORT ] } /></span>
				</div>
			</th>
		</tr>
	);
};



let BuildingHeader = ( props ) =>
{
	const sortBy = props.form.values.sortBy;
	const changeSort = ( sortField ) => updateSort( props.field.name, sortField, sortBy, props.form.setFieldValue, props.form.setFieldTouched );

	return (
		<tr>
			<th className="column_favorites" width="3%"></th>
			<th width="7%" className="column_type" onClick={ () => changeSort( ALLOWED_USAGE_SORT ) }>
				<div className="table-header__link" data-sort_type="type">
					<span className="table-header__title">Тип</span>
					<span className="table-header__sort-dir"><SortArrow direction={ sortBy[ ALLOWED_USAGE_SORT ] } /></span>
				</div>
			</th>
			<th width="20%" className="column_address" onClick={ () => changeSort( ADDRESS_SORT ) }>
				<div className="table-header__link" data-sort_type="address">
					<span className="table-header__title">Адрес</span>
					<span className="table-header__sort-dir"><SortArrow direction={ sortBy[ ADDRESS_SORT ] } /></span>
				</div>
			</th>
			<th width="15%" className="cadastral_number" onClick={ () => changeSort( CADASTRAL_NUMBER_SORT ) }>
				<div className="table-header__link" data-sort_type="cadastral_number">
					<span className="table-header__title">Кадастровый номер</span>
					<span className="table-header__sort-dir"><SortArrow direction={ sortBy[ CADASTRAL_NUMBER_SORT ] } /></span>
				</div>
			</th>
			<th width="8%" className="column_floor">
				<div className="table-header__link" data-sort_type="number_of_floors">
					<span className="table-header__title">Этажность</span>
					<span className="table-header__sort-dir">
						<span className="a-icon-x icon-arrow-down-black hide"></span>
					</span>
				</div>
			</th>
			<th width="13%" className="column_area" onClick={ () => changeSort( SPACE_SORT ) }>
				<div className="table-header__link" data-sort_type="space">
					<span className="table-header__title">Площадь, м<sup>2</sup></span>
					<span className="table-header__sort-dir"><SortArrow direction={ sortBy[ SPACE_SORT ] } /></span>
				</div>
			</th>
			<th width="11%" className="column_unit_price" onClick={ () => changeSort( UNIT_COST_SORT ) }>
				<div className="table-header__link" data-sort_type="unit_price">
					<span className="table-header__title">Цена, м<sup>2</sup></span>
					<span className="table-header__sort-dir"><SortArrow direction={ sortBy[ UNIT_COST_SORT ] } /></span>
				</div>
			</th>
			<th width="13%" className="column_price" onClick={ () => changeSort( COST_SORT ) }>
				<div className="table-header__link" data-sort_type="price">
					<span className="table-header__title">Цена,</span> <span className="table-header__ruble"><i className="icon icon-ruble icon-black"></i></span>
					<span className="table-header__sort-dir"><SortArrow direction={ sortBy[ COST_SORT ] } /></span>
				</div>
			</th>
			<th width="3%" className="column_photo"></th>
			<th width="7%" className="column_data" onClick={ () => changeSort( DATE_SORT ) }>
				<div className="table-header__link" data-sort_type="date">
					<span className="table-header__title">Дата</span>
					<span className="table-header__sort-dir"><SortArrow direction={ sortBy[ DATE_SORT ] } /></span>
				</div>
			</th>
		</tr>
	);
};



let RoomGroupHeader = ( props ) =>
{
	const sortBy = props.field.value;

	const changeSort = ( sortField ) => updateSort( props.field.name, sortField, sortBy, props.form.setFieldValue, props.form.setFieldTouched );

	return (
		<tr>
			<th width="3%" className="column_favorites"></th>
			<th width="7%" className="column_type" onClick={ () => changeSort( ALLOWED_USAGE_SORT ) }>
				<div className="table-header__link" data-sort_type="type">
					<span className="table-header__title">Тип</span>
					<span className="table-header__sort-dir"><SortArrow direction={ sortBy[ ALLOWED_USAGE_SORT ] } /></span>
				</div>
			</th>
			<th width="20%" className="column_address" onClick={ () => changeSort( ADDRESS_SORT ) }>
				<div className="table-header__link" data-sort_type="address">
					<span className="table-header__title">Адрес</span>
					<span className="table-header__sort-dir"><SortArrow direction={ sortBy[ ADDRESS_SORT ] } /></span>
				</div>
			</th>
			<th width="15%" className="cadastral_number" onClick={ () => changeSort( CADASTRAL_NUMBER_SORT ) }>
				<div className="table-header__link" data-sort_type="cadastral_number">
					<span className="table-header__title">Кадастровый номер</span>
					<span className="table-header__sort-dir"><SortArrow direction={ sortBy[ CADASTRAL_NUMBER_SORT ] } /></span>
				</div>
			</th>
			<th width="8%" className="column_floor">
				<div className="table-header__link" data-sort_type="floor">
					<span className="table-header__title">Этаж</span>
				</div>
			</th>
			<th width="13%" className="column_area">
				<div className="table-header__link" data-sort_type="space" onClick={ () => changeSort( SPACE_SORT ) }>
					<span className="table-header__title">Площадь, м<sup>2</sup></span>
					<span className="table-header__sort-dir"><SortArrow direction={ sortBy[ SPACE_SORT ] } /></span>
				</div>
			</th>
			<th width="11%" className="column_unit_price" onClick={ () => changeSort( UNIT_COST_SORT ) }>
				<div className="table-header__link" data-sort_type="unit_price">
					<span className="table-header__title">Цена, м<sup>2</sup></span>
					<span className="table-header__sort-dir"><SortArrow direction={ sortBy[ UNIT_COST_SORT ] } /></span>
				</div>
			</th>
			<th width="13%" className="column_price" onClick={ () => changeSort( COST_SORT ) }>
				<div className="table-header__link" data-sort_type="price">
					<span className="table-header__title">Цена,</span> <span className="table-header__ruble"><i className="icon icon-ruble icon-black"></i></span>
					<span className="table-header__sort-dir"><SortArrow direction={ sortBy[ COST_SORT ] } /></span>
				</div>
			</th>
			<th width="3%" className="column_photo"></th>
			<th width="7%" className="column_data" onClick={ () => changeSort( DATE_SORT ) }>
				<div className="table-header__link" data-sort_type="date">
					<span className="table-header__title">Дата</span>
					<span className="table-header__sort-dir"><SortArrow direction={ sortBy[ DATE_SORT ] } /></span>
				</div>
			</th>
		</tr>
	);
};



function AssetGroupRow( props )
{
	return (
		<tr>
			<td></td>
			<td>
				<div className="item_favorites">
					<span className="icon-star"></span>
				</div>
			</td>
			<td><a href={ "/objects/" + props.id } target="_blank">ИК</a></td>
			<td>{ props.asset_group_title}</td>
			<td><span className="item__address-text"><i className="a-icon a-icon-small a-icon-black icon-location"></i> <a href={ "/objects/" + props.id } target="_blank">{ props.address }</a></span> <span className="item__address-sub"></span></td>
			<td><a href={ "/objects/" + props.id } target="_blank">{ props.cadastral_number }</a></td>
			<td>{ roundingRules( props.space, NULL_BOUNDARY, DEFAULT_MANTISSA, IS_WHOLE ) }</td>
			<td>{ props.operation_type }</td>
			<td>{ thousandSeparator( props.cost, NULL_MANTISSA ) }</td>
			<td>{ props.date }</td>
		</tr>
	);
}


function LandRow( props )
{
	return (
		<tr>
			<td>
				<div className="item_favorites">
					<span className="icon-star"></span>
				</div>
			</td>
			<td><a href={ "/objects/" + props.id } target="_blank">ЗУ<br />ВРИ { props.allowed_usage }</a></td>
			<td>
				<span className="item__address-text">
					<i className="a-icon a-icon-small a-icon-black icon-location"></i>
					<a href={ "/objects/" + props.id } target="_blank">{ props.address }</a>
				</span>
				<span className="item__address-sub"></span>
			</td>
			<td><a href={ "/objects/" + props.id } target="_blank">{ props.cadastral_number }</a></td>
			<td>{ roundingRules( props.space, NULL_BOUNDARY, DEFAULT_MANTISSA, IS_WHOLE ) }</td>
			<td>{ roundingRules( props.unit_cost, DEFAULT_BOUNDARY, DEFAULT_MANTISSA ) }</td>
			<td>{ thousandSeparator( props.cost, NULL_MANTISSA ) }</td>
			<td>
				<div className="item_photo">
					<span className="icon-photo photo_yes"></span>
				</div>
			</td>
			<td>{ props.date }</td>
		</tr>
	);
}



function BuildingRow( props )
{
	return (
		<tr>
			<td>
				<div className="item_favorites">
					<span className="icon-star"></span>
				</div>
			</td>
			<td><a href={ "/objects/" + props.id } target="_blank">ОКС<br />ВИ { props.allowed_usage }</a></td>
			<td>
				<span className="item__address-text">
					<i className="a-icon a-icon-small a-icon-black icon-location"></i>
					<a href={ "/objects/" + props.id } target="_blank">{ props.address }</a>
				</span>
				<span className="item__address-sub"></span>
			</td>
			<td><a href={ "/objects/" + props.id } target="_blank">{ props.cadastral_number }</a></td>
			<td>{ props.floors_total }</td>
			<td>{ roundingRules( props.space, NULL_BOUNDARY, DEFAULT_MANTISSA, IS_WHOLE ) }</td>
			<td>{ roundingRules( props.unit_cost, DEFAULT_BOUNDARY, DEFAULT_MANTISSA ) }</td>
			<td>{ thousandSeparator( props.cost, NULL_MANTISSA ) }</td>
			<td>
				<div className="item_photo">
					<span className="icon-photo photo_yes"></span>
				</div>
			</td>
			<td>{ props.date }</td>
		</tr>
	);
}


function RoomGroupRow( props )
{
	return (
		<tr>
			<td>
				<div className="item_favorites">
					<span className="icon-star"></span>
				</div>
			</td>
			<td><a href={ "/objects/" + props.id } target="_blank">ГП<br />ВИ { props.allowed_usage }</a></td>
			<td>
				<span className="item__address-text">
					<i className="a-icon a-icon-small a-icon-black icon-location"></i>
					<a href={ "/objects/" + props.id } target="_blank">{ props.address }</a>
				</span>
				<span className="item__address-sub"></span>
			</td>
			<td><a href={ "/objects/" + props.id } target="_blank">{ props.cadastral_number }</a></td>
			<td>{ props.floor }/{ props.floors_total }</td>
			<td>{ roundingRules( props.space, NULL_BOUNDARY, DEFAULT_MANTISSA, IS_WHOLE) }</td>
			<td>{ roundingRules( props.unit_cost, DEFAULT_BOUNDARY, DEFAULT_MANTISSA ) }</td>
			<td>{ thousandSeparator( props.cost, NULL_MANTISSA ) }</td>
			<td>
				<div className="item_photo">
					<span className="icon-photo photo_yes"></span>
				</div>
			</td>
			<td>{ props.date }</td>
		</tr>
	);
}



function Row( props )
{
	switch( props.objectType )
	{
		case LAND:
			return <LandRow { ...props } />;

		case BUILDING:
			return <BuildingRow { ...props } />;

		case ROOMS_GROUP:
			return <RoomGroupRow { ...props } />;

		case ASSET_GROUP:
			return <AssetGroupRow { ...props } />;

		default:
			return null;
	}
}



function SearchResultDataList( props )
{
	return (
		<div className="b-searching-results__table">
			<div className="b-searching-results__table-wrapper">
				<table key="table" className="b-searching-results__table-container" ref={ ( ref ) => props.setResultTableRef( ref ) }>
					<thead className="table-header">
						{ props.objectType === ASSET_GROUP && <Field name="sortBy" component={ AssetGroupHeader } /> }
						{ props.objectType === LAND && <Field name="sortBy" component={ LandHeader } /> }
						{ props.objectType === BUILDING && <Field name="sortBy" component={ BuildingHeader } /> }
						{ props.objectType === ROOMS_GROUP && <Field name="sortBy" component={ RoomGroupHeader } /> }
					</thead>

					<tbody className="table-content">
						{ props.data.map( ( data ) => <Row { ...data } key={ data.id + "-" + data.operation } objectType={ props.objectType } /> ) }
					</tbody>
				</table>

				<div className="b-searching-results__pagination">
					<div className="b-searching-results__pagination-wrapper">
						<div className="b-searching-results__pagination-container">
							<ReactPaginate previousLabel="Предыдущая"
								previousClassName="prev_page"
								nextLabel="Следующая"
								nextClassName="next_page"
								breakLabel="..."
								breakClassName="interval"
								pageCount={ Math.ceil( props.totalResults / props.itemsOnPage ) }
								marginPagesDisplayed={ 1 }
								pageRangeDisplayed={ 5 }
								onPageChange={ ( page ) => props.getResultData( page.selected ) }
								containerClassName="b-searching-results__pagination-nav"
								subContainerClassName="pages pagination"
								activeClassName="current" />
						</div>
					</div>
				</div>

				<div className="b-search-results__pageslist">
					<div className="b-search-results__pageslist-wrapper">
						<ul>
							<li><span className="label">Показывать по:</span></li>
							<li>
								<select value={ props.itemsOnPage } onChange={ ( event ) => props.setItemsOnPage( event ) }>
									<option value="10">10</option>
									<option value="25">25</option>
									<option value="50">50</option>
									<option value="100">100</option>
									<option value="300">300</option>
									<option value="500">500</option>
								</select>
							</li>
						</ul>
					</div>
				</div>

				<div className="clear-fix"></div>
			</div>
		</div>
	);
}



const mapStateToProps = ( store ) => (
	{
		data: store.analyticsCabinet.data,
		objectType: store.analyticsCabinet.currentResultObjectType,
		totalResults: store.analyticsCabinet.result.length,
		page: store.analyticsCabinet.page,
		itemsOnPage: store.analyticsCabinet.itemsOnPage,
	} );


const mapDispatchToProps = ( dispatch ) => (
	{
		setItemsOnPage: ( event ) => dispatch( setItemsOnPage( event.target.value ) ),
		getResultData: ( page ) => dispatch( getResultData( page ) ),
		setResultTableRef: ( ref ) => dispatch( setResultTableRef( ref ) )
	} );


export default connect( mapStateToProps, mapDispatchToProps )( SearchResultDataList );
