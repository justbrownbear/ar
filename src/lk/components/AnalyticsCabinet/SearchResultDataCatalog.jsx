
import React from "react";
import { connect } from "react-redux";

import ReactPaginate from "react-paginate";

import thousandSeparator from "../util/thousandSeparator.js";

import { LAND, BUILDING, ROOMS_GROUP, ASSET_GROUP } from "lk/constants.js";
import { setItemsOnPage, getResultData } from "./redux/actions.js";

import "./css/catalog.css";

import { YMaps, Map } from "react-yandex-maps";
import { Placemark } from "lk/components/Map/Placemark.js";



const mapState =
{
	center: [ 54.973718992633515, 73.37493896484376 ],
	zoom: 10
};



function baloonContent( props )
{
	let image = "";

	if( props.files && props.files.length > 0 )
		image = '<img style="margin: 5px;" height="146" width="110" src="http://www.areall.ru/custom/real_objects/photo/146x110/' + props.files[ 0 ] + '" />';


	const objectTypes = [ "ЗУ", "ОКС", "Литера", "Группа помещений", "Помещение", "Промзона", "Имущественный комплекс" ];

	const result =
		'<div style="background:#fff;">' +
			image +
			'<div style="margin: 5px;">' +
				'<a target="_blank" href="/objects/' + props.id + '">' + props.cadastral_number + '</a><br />' +
				props.address + '<br />' +
				'<strong>S</strong> ' + ( props.space || "" ) +' м²<br />' +
				'<strong>Стоимость</strong> ' + ( props.unit_cost || "" ) + ' р/м²' +
			'</div>' +
		'</div>';

	return result;
}



function ImagesBlock( props )
{
	const stubImage = <img src="/img/lk/search/photocatalog/default-thumb.png" alt="Нет фотографий" />;

	if( !props.files || props.files.length === 0 )
		return stubImage;

 	let images = [];

	props.files.map( ( file ) => file && images.push( "http://www.areall.ru/custom/real_objects/photo/" + file ) );

	// Отработаем ситуацию, когда пришел массив из пустых файлов
	if( images.length === 0 )
		return stubImage;

	return <ImageGallery images={ images } />;
}


class ImageGallery extends React.Component
{
	constructor( props )
	{
		super( props );

		this.state =
		{
			currentImageIndex: 0,
			cachedIndexes: [ 0 ]
		};
	}


	componentDidMount()
	{
		this.imagesPreload();
	}


	shouldComponentUpdate( nextProps, nextState )
	{
		return this.state.currentImageIndex !== nextState.currentImageIndex;
	}


	getPreviousIndex = () => this.state.currentImageIndex === 0 ? this.props.images.length - 1 : this.state.currentImageIndex - 1;
	getNextIndex = () => this.state.currentImageIndex === this.props.images.length - 1 ? 0 : this.state.currentImageIndex + 1;


	imagesPreload = () =>
	{
		this.cacheImageByIndex( this.getNextIndex() );
		this.cacheImageByIndex( this.getPreviousIndex() );
	}


	cacheImageByIndex = ( index ) =>
	{
		// Кэшируем только те изображения, которые еще не были прокэшированы ранее
		if( this.state.cachedIndexes.indexOf( index ) !== -1 )
			return;


		let imagePreload = new Image();
		imagePreload.src = this.props.images[ index ];

		this.setState( { cachedIndexes: [ ...this.state.cachedIndexes, index ] } );
	}


	slideLeft = () => this.setState( { currentImageIndex: this.getPreviousIndex() }, this.imagesPreload );
	slideRight = () => this.setState( { currentImageIndex: this.getNextIndex() }, this.imagesPreload );


	render()
	{
		return (
			<div className="photo-catalog__slider">
				<img src={ this.props.images[ this.state.currentImageIndex ] } className="photo-catalog__slider-items" alt="Изображение объекта недвижимости" />
				<div className="photo-catalog__slider-prev" onClick={ this.slideLeft } />
				<div className="photo-catalog__slider-next" onClick={ this.slideRight } />
			</div>
		);
	}
}


function CadastralNumberBlock( props )
{
	return (
		props.cadastral_number ?
			<a href={ "/objects/" + props.id } target="_blank" className="photo-catalog__cadastral-number">{ props.cadastral_number }</a> :
			<div className="photo-catalog__cadastral-number"/>
	);
}


function AddressBlock( props )
{
	return (
		props.address_max || props.address ?
			<a href={ "/objects/" + props.id } target="_blank" className="photo-catalog__address">
				{ props.address_max && <span className="photo-catalog__address-max">{ props.address_max }</span> }
				{ ( props.address_max && props.address ) && <br /> }
				{ props.address && props.address }
			</a> :
			<span/>
	);
}


function GasSupplyTypeBlock( props )
{
	return (
		props.gas_supply_type ?
			<div className="photo-catalog__communications photo-catalog__gas">{ props.gas_supply_type }</div> :
			<span />
	);
}


function WaterSupplyTypeBlock( props )
{
	return (
		props.water_supply_type ?
			<div className="photo-catalog__communications photo-catalog__water">{ props.water_supply_type }</div> :
			<span />
	);
}


function HotWaterSupplyTypeBlock( props )
{
	return (
		props.hot_water_supply_type ?
			<div className="photo-catalog__communications photo-catalog__hot-water">{ props.hot_water_supply_type }</div> :
			<span />
	);
}


function HeatingTypeBlock( props )
{
	return (
		props.heating_type ?
			<div className="photo-catalog__communications photo-catalog__heating">{ props.heating_type }</div> :
			<span />
	);
}


function PowerSupplyTypeBlock( props )
{
	return (
		props.power_supply_type ?
			<div className="photo-catalog__communications photo-catalog__electricity">{ props.power_supply_type }</div> :
			<span />
	);
}


function TransportStopDistanceBlock( props )
{
	return (
		props.transport_stop ?
			<div className="photo-catalog__transport photo-catalog__bus-stop">ост.: { props.transport_stop }</div> :
			<span />
	);
}


function HighwaysDistanceBlock( props )
{
	return (
		props.highways ?
			<div className="photo-catalog__transport photo-catalog__distance-highway">Магистраль: { props.highways }</div> :
			<span />
	);
}


function BuildingDeadlineDateBlock( props )
{
	return (
		props.deadline_quarter || props.building_year ?
			<div className="photo-catalog__quarter-of-change">{ props.deadline_quarter && props.deadline_quarter + " квартал " }{ props.building_year && props.building_year }</div> :
			<span />
	);
}


function ContactsBlock( props )
{
	return (
		props.agency || props.phone ?
			<div className="photo-catalog__transport photo-catalog__list-contacts">{ props.agency && props.agency + ": " }{ props.phone && props.phone }</div> :
			<span />
	);
}



function UnitCostBlock( props )
{
	return (
		props.unit_cost ?
			<div className="photo-catalog__min-unit-price-economic-operation">{ props.costFrom && "от " }{ thousandSeparator( props.unit_cost ) } ☧/м²</div> :
			<span />
	);
}


function CostBlock( props )
{
	return (
		props.cost ?
			<div className="photo-catalog__min-price-economic-operation">{ props.costFrom && "от " }{ thousandSeparator( props.cost ) } ☧</div> :
			<span />
	);
}


function EconomicOperationDatesBlock( props )
{
	return (
		props.start_date || props.end_date ?
			<span className="photo-catalog__date">
				{ props.start_date && "от " + props.start_date }
				{ ( props.end_date && props.end_date ) && <br /> }
				{ props.end_date && "до " + props.end_date }
			</span> :
			<span />
	);
}


function EconomicOperationTypeBlock( props )
{
	return (
		props.operation_type ?
			<div className="photo-catalog__type-economic-operation">{ props.operation_type }</div> :
			<span />
	);
}


function UrbanAreaZoneBlock( props )
{
	return (
		props.zone ?
			<span className="photo-catalog__town-planning-zone">Градостроительная зона №<strong>{ props.zone }</strong></span> :
			<span />
	);
}


function SomeNameBlock( props )
{
	return (
		props.title ?
			<p className="photo-catalog__name-object">{ props.title }</p> :
			<span />
	);
}



function SomeKindBlock( props )
{
	return (
		props.title ?
			<p className="photo-catalog__photo-catalog__kind">{ props.title }</p> :
			<span />
	);
}


function SpaceBlock( props )
{
	return (
		props.space ?
			<div className="photo-catalog__space">{ thousandSeparator( props.space ) } м²</div> :
			<span />
	);
}


function RightSpaceBlock( props )
{
	return (
		props.space ?
			<div className="photo-catalog__industrial-complex-land">Земля: { thousandSeparator( props.space ) } м²</div> :
			<span />
	);
}


function FloorsBlock( props )
{
	return (
		props.floors ?
			<span>Этажность: { props.floors }, </span> :
			<span />
	);
}


function WallMaterialBlock( props )
{
	return (
		props.wall_material ?
			<span>Материал стен: { props.wall_material }, </span> :
			<span />
	);
}


function BuildingYearBlock( props )
{
	return (
		props.building_year ?
			<span>{ props.building_year } г.п., </span> :
			<span />
	);
}


function DecorationLevelBlock( props )
{
	return (
		props.decoration_level ?
			<span>Отделка: { props.decoration_level }, </span> :
			<span />
	);
}


function TechnicalStateBlock( props )
{
	return (
		props.technical_state ?
			<span>Техническое состояние: { props.technical_state }</span> :
			<span />
	);
}


function ParkingTypeBlock( props )
{
	return (
		props.parking_type ?
			<span>Парковка: { props.parking_type }</span> :
			<span />
	);
}


function AssetGroupRow( props )
{
	return (
		<div className="grid-row photo-catalog__row-margin">
			<div className="grid-cols-16">
				<ImagesBlock { ...props } />
			</div>

			<div className="grid-cols-8 photo-catalog__text-block-wrapper">
				<CadastralNumberBlock { ...props } />
				<RightSpaceBlock space={ props.asset_group_total_area } />
				<SpaceBlock space={ props.asset_group_builtup_area } />
				<SomeNameBlock title={ props.asset_group_title } />
				<SomeKindBlock title={ props.asset_group_kind } />
				<SomeKindBlock title={ props.sphere_of_business } />
				<AddressBlock { ...props } />
				<UrbanAreaZoneBlock { ...props } />
				<EconomicOperationTypeBlock { ...props } />
				<EconomicOperationDatesBlock { ...props } />
				<CostBlock { ...props } />
				<UnitCostBlock { ...props } />
				<GasSupplyTypeBlock { ...props } />
				<WaterSupplyTypeBlock { ...props } />
				<HotWaterSupplyTypeBlock { ...props } />
				<HeatingTypeBlock { ...props } />
				<PowerSupplyTypeBlock { ...props } />
				<TransportStopDistanceBlock { ...props } />
				<ContactsBlock { ...props } />
			</div>
		</div>
	);
}



function LandRow( props )
{
	return (
		<div className="grid-row photo-catalog__row-margin">
			<div className="grid-cols-16">
				<ImagesBlock { ...props } />
			</div>

			<div className="grid-cols-8 photo-catalog__text-block-wrapper">
				<div className="photo-catalog__text-block">
					<CadastralNumberBlock { ...props } />
					<SpaceBlock space={ props.space } />
					<SomeKindBlock title={ props.land_category } />
					<SomeKindBlock title={ props.land_allowed_usage } />
					<AddressBlock { ...props } />
					<UrbanAreaZoneBlock { ...props } />
					<EconomicOperationTypeBlock { ...props } />
					<EconomicOperationDatesBlock { ...props } />
					<CostBlock { ...props } />
					<UnitCostBlock { ...props } />
					<GasSupplyTypeBlock { ...props } />
					<WaterSupplyTypeBlock { ...props } />
					<PowerSupplyTypeBlock { ...props } />
					<TransportStopDistanceBlock { ...props } />
					<ContactsBlock { ...props } />
				</div>
			</div>
		</div>
	);
}


function BuildingRow( props )
{
	return (
		<div className="grid-row photo-catalog__row-margin">
			<div className="grid-cols-16">
				{ props.building_class && <div className="photo-catalog__class-building">{ props.building_class }</div> }
				<ImagesBlock { ...props } />
			</div>

			<div className="grid-cols-8 photo-catalog__text-block-wrapper">
				<CadastralNumberBlock { ...props } />
				<RightSpaceBlock space={ props.land_space } />
				<SpaceBlock space={ props.space } />
				<SomeNameBlock title={ props.building_title } />
				<SomeKindBlock title={ props.building_type } />
				<SomeKindBlock title={ props.building_kind } />
				<AddressBlock { ...props } />
				<EconomicOperationTypeBlock { ...props } />
				<EconomicOperationDatesBlock { ...props } />
				<CostBlock { ...props } />
				<UnitCostBlock { ...props } />
				<div className="photo-catalog__information">
					<FloorsBlock { ...props } />
					<WallMaterialBlock { ...props } />
					<BuildingYearBlock { ...props } />
					<DecorationLevelBlock { ...props } />
					<TechnicalStateBlock { ...props } />
				</div>
				<GasSupplyTypeBlock { ...props } />
				<WaterSupplyTypeBlock { ...props } />
				<HotWaterSupplyTypeBlock { ...props } />
				<HeatingTypeBlock { ...props } />
				<PowerSupplyTypeBlock { ...props } />
				<TransportStopDistanceBlock { ...props } />
				<ContactsBlock { ...props } />
			</div>
		</div>
	);
}


function NewBuildingRow( props )
{
	return (
		<div className="grid-row photo-catalog__row-margin">
			<div className="grid-cols-16">
				{ props.building_class && <div className="photo-catalog__class-building">{ props.building_class }</div> }
				<ImagesBlock { ...props } />
			</div>

			<div className="grid-cols-8 photo-catalog__text-block-wrapper">
				<a href={ "/objects/" + props.id } className="photo-catalog__cadastral-number" target="_blank">{ props.building_title }</a>
				<SomeNameBlock title={ props.developer } />
				<AddressBlock { ...props } />
				<CostBlock costFrom={ true } { ...props } />
				<UnitCostBlock costFrom={ true } { ...props } />
				<div className="photo-catalog__information">
					<FloorsBlock { ...props } />
					<WallMaterialBlock { ...props } />
					<ParkingTypeBlock { ...props } />
				</div>
				<TransportStopDistanceBlock { ...props } />
				<BuildingDeadlineDateBlock { ...props } />
				<ContactsBlock { ...props } />
			</div>
		</div>
	);
}


function RoomGroupRow( props )
{
	return (
		<div className="grid-row photo-catalog__row-margin">
			<div className="grid-cols-16">
				{ props.building_class && <div className="photo-catalog__class-building">{ props.building_class }</div> }
				<ImagesBlock { ...props } />
			</div>

			<div className="grid-cols-8 photo-catalog__text-block-wrapper">
				<CadastralNumberBlock { ...props } />
				<span className="photo-catalog__space">{ props.space ? thousandSeparator( props.space ) : "-" }</span>
				{ props.kitchen_space && <span className="photo-catalog__space">/-/</span> }
				{ props.kitchen_space && <span className="photo-catalog__space">{ props.kitchen_space ? thousandSeparator( props.kitchen_space ) : "-" }</span> }
				&nbsp;м²
				<SomeNameBlock title={ props.building_title } />
				<AddressBlock { ...props } />
				<EconomicOperationTypeBlock { ...props } />
				<EconomicOperationDatesBlock { ...props } />
				<CostBlock { ...props } />
				<UnitCostBlock { ...props } />
				<div className="photo-catalog__information">
					<FloorsBlock { ...props } />
					<WallMaterialBlock { ...props } />
					<BuildingYearBlock { ...props } />
					<DecorationLevelBlock { ...props } />
					<TechnicalStateBlock { ...props } />
				</div>
				<GasSupplyTypeBlock { ...props } />
				<WaterSupplyTypeBlock { ...props } />
				<PowerSupplyTypeBlock { ...props } />
				<TransportStopDistanceBlock { ...props } />
				<ContactsBlock { ...props } />
			</div>
		</div>
	);
}


function RoomGroupCommercialRow( props )
{
	return (
		<div className="grid-row photo-catalog__row-margin">
			<div className="grid-cols-16">
				{ props.building_class && <div className="photo-catalog__class-building">{ props.building_class }</div> }
				<ImagesBlock { ...props } />
			</div>

			<div className="grid-cols-8 photo-catalog__text-block-wrapper">
				<CadastralNumberBlock { ...props } />
				<SpaceBlock space={ props.space } />
				<SomeNameBlock title={ props.building_title } />
				<SomeKindBlock title={ props.building_type } />
				<SomeKindBlock title={ props.building_kind } />
				<AddressBlock { ...props } />
				<UrbanAreaZoneBlock { ...props } />
				<EconomicOperationTypeBlock { ...props } />
				<EconomicOperationDatesBlock { ...props } />
				<CostBlock { ...props } />
				<UnitCostBlock { ...props } />
				<div className="photo-catalog__information">
					<FloorsBlock { ...props } />
					<WallMaterialBlock { ...props } />
					<BuildingYearBlock { ...props } />
					<DecorationLevelBlock { ...props } />
					<TechnicalStateBlock { ...props } />
				</div>
				<GasSupplyTypeBlock { ...props } />
				<WaterSupplyTypeBlock { ...props } />
				<PowerSupplyTypeBlock { ...props } />
				<TransportStopDistanceBlock { ...props } />
				<HighwaysDistanceBlock { ...props } />
				<ContactsBlock { ...props } />
			</div>
		</div>
	);
}


function SearchResultDataCatalog( props )
{
	return (
		<div className="grid-row margin-top-10">
			<div className="grid-cols-16 medium-grid-cols-24 small-grid-cols-24">
				<div className="b-section">
					<div className="b-section__container">
						<div className="b-panel-controls">
							<ul>
								<li><i className="a-icon icon-expand"></i></li>
								<li><i className="a-icon icon-compress"></i></li>
								<li><i className="a-icon icon-arrow_maximize"></i></li>
								<li><i className="a-icon icon-arrow_minimize"></i></li>
								<li><i className="a-icon icon-refresh"></i></li>
								<li><i className="a-icon icon-close"></i></li>
							</ul>
						</div>
						<div className="b-section__header">
							<div className="b-framework-icon">
								<span className="a-icon a-icon-small icon-photo-catalog"></span>
							</div>
							<div className="b-section__title">
								<span>Фотокаталог</span>
								<p>Информация об объектах</p>
							</div>
						</div>
						<div className="b-section__content">
							<div className="photo-catalog__container">
								{
									props.data.map( ( data ) =>
									{
										// Новостройка
										if( props.currentResultSearchType === 7 || props.currentResultSearchType === 75 )
											return <NewBuildingRow key={ data.id } { ...data } />;
										else // Коммерческая ГП
										if( props.currentResultSearchType > 7 && props.currentResultObjectType === 4 )
											return <RoomGroupCommercialRow key={ data.id } { ...data } />;
										else // Стандартный выбор по типу объекта
											switch( props.currentResultObjectType )
											{
												case LAND:
													return <LandRow key={ data.id } { ...data } />;

												case BUILDING:
													return <BuildingRow key={ data.id } { ...data } />;

												case ROOMS_GROUP:
													return <RoomGroupRow key={ data.id } { ...data } />;

												case ASSET_GROUP:
													return <AssetGroupRow key={ data.id } { ...data } />;

												default:
													return;
											}
									} )
								}

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
							</div>

						</div>
					</div>
				</div>
			</div>
			<div className="grid-cols-8 medium-grid-cols-24 small-grid-cols-24">
				<div className="b-section">
					<div className="b-section__container">
						<div className="b-panel-controls">
							<ul>
								<li><i className="a-icon icon-expand"></i></li>
								<li><i className="a-icon icon-compress"></i></li>
								<li><i className="a-icon icon-arrow_maximize"></i></li>
								<li><i className="a-icon icon-arrow_minimize"></i></li>
								<li><i className="a-icon icon-refresh"></i></li>
								<li><i className="a-icon icon-close"></i></li>
							</ul>
						</div>
						<div className="b-section__header">
							<div className="b-framework-icon">
								<span className="a-icon a-icon-small icon-location-interface"></span>
							</div>
							<div className="b-section__title">
								<span>Карта</span>
								<p>объекты фотокаталога на карте</p>
							</div>
						</div>
						<div className="b-section__content photo-catalog-map-wrapper">
							<YMaps>
									<Map state={ mapState } width="100%" height="800px">
										{ props.data.map( ( data ) => <Placemark { ...data } key={ data.id } balloonContent={ baloonContent } /> ) }
									</Map>
							</YMaps>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}



const mapStateToProps = ( store ) => (
	{
		data: store.analyticsCabinet.data,
		currentResultSearchType: store.analyticsCabinet.currentResultSearchType,
		currentResultObjectType: store.analyticsCabinet.currentResultObjectType,

		objectType: store.analyticsCabinet.currentResultObjectType,
		totalResults: store.analyticsCabinet.result.length,
		page: store.analyticsCabinet.page,
		itemsOnPage: store.analyticsCabinet.itemsOnPage
	} );


const mapDispatchToProps = ( dispatch ) => (
	{
		setItemsOnPage: ( event ) => dispatch( setItemsOnPage( event.target.value ) ),
		getResultData: ( page ) => dispatch( getResultData( page ) )
	} );

export default connect( mapStateToProps, mapDispatchToProps )( SearchResultDataCatalog );