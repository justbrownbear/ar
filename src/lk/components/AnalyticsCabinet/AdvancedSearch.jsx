// @flow
import React from "react";

import { connect } from "react-redux";

import { Collapsible } from "../Collapsible/Collapsible.js";


import { toggleAdvancedSearch } from "./redux/actions.js";

import MultipleSelectComponent from "lk/components/Select/MultipleSelect.jsx";
import SelectComponent from "lk/components/Select/Select.jsx";

import DateRangePicker from "./DateRangePicker.jsx";

import { Field } from "./Field.jsx";




function Elem( props )
{
	const { cols, name, children } = props;

	const className = "grid-cols-" + cols + " text-margin-v1x";

	return (
		<div className={ className }>
			<div className="group-block add-top_block">
				<div className="name_element_form">{ name }</div>
				<div className="element-form">{ children }</div>
			</div>
		</div>
	);
}



const Input				= ( { ...properties } ) => <Field { ...properties } />;
const Select			= ( { ...properties } ) => <Field { ...properties } component={ SelectComponent } />;
const MultipleSelect	= ( { ...properties } ) => <Field name={ properties.name } component={ MultipleSelectComponent } { ...properties } />;



type PropsType =
{
	formValues:
	{
		// region
		// area
		// settlement,
	},

	setFormValues: ( {} ) => void
};



function AdvancedSearch( props: PropsType )
{
	const disableSomeLocationFields = !( props.formValues.settlement !== undefined && props.formValues.settlement.length === 1 );


	const region =
	{
		region: props.formValues.region
	};


	const regionAndArea =
	{
		region: props.formValues.region,
		area: props.formValues.area
	};


	const settlement =
	{
		settlement: props.formValues.settlement
	};


	const settlementWithObjectType =
	{
		settlement: props.formValues.settlement,
		objectType: 6 // Промзоны
	};




	const clearAdvancedSearch = () =>
	{
		const newSearchConditions =
		{
			operationType: props.formValues.operationType,
			searchType: props.formValues.searchType,
			region: props.formValues.region,
			cadastralNumber: props.formValues.cadastralNumber,
			economic_operations_cost_from: props.formValues.economic_operations_cost_from,
			economic_operations_cost_to: props.formValues.economic_operations_cost_to,
			space_from: props.formValues.space_from,
			space_to: props.formValues.space_to,
			sortBy: props.formValues.sortBy
		};


		props.setFormValues( newSearchConditions );
	};



	return (
		<div className="b-additional-search">
			<div className="b-additional-search__container">
				<div className="b-additional-search__wrapper">
					<div className="b-panel-controls">
						<ul>
							<li><i className="a-icon icon-close" onClick={ props.close }></i></li>
						</ul>
					</div>

					<div className="grid-row text-cell-1x">
						<div className="grid-cols-24">
							<div className="grid-row">
								<DateRangePicker startDateFieldName="economic_operations_date_from" endDateFieldName="economic_operations_date_to" />
								<Elem name="Показать" cols="3">
									<Select name="interval">
										<option></option>
										<option value="1">за сегодня</option>
										<option value="2">за неделю</option>
										<option value="3">за месяц</option>
										<option value="4">за квартал</option>
										<option value="5">за год</option>
									</Select>
								</Elem>
								<Elem name="Виды рынка" cols="3"><MultipleSelect name="completion_of_construction" entity="CompletionOfConstruction" /></Elem>
								<Elem name="Источник данных" cols="3"><Select name="source_type" entity="EconomicOperationsSourceTypes" /></Elem>
								<Elem name="Условный номер" cols="4"><Input name="conventional_number" type="text" /></Elem>
								<Elem cols="5">
									<div className="radios-as-buttons">
										<div>
											<input type="radio" name="option" id="radio1" />
											<label>Оферты</label>
										</div>
										<div>
											<input type="radio" name="option" id="radio2" />
											<label>Оферты+Кадастр</label>
										</div>
									</div>
								</Elem>
							</div>
							<Collapsible title="Загрузка оферт">
								<div className="grid-row">
									<Elem name="Шаблон" cols="4">
										<select>
											<option></option>
											<option>Росреестр_земля</option>
											<option>Росреестр_ИЖС</option>
											<option>Росреестр_квартиры</option>
											<option>Росреестр_коммер</option>
											<option>Ареалл_земля</option>
											<option>Ареалл_ИЖС</option>
											<option>Ареалл_квартиры</option>
											<option>Ареалл_коммер</option>
											<option>Яндекс_земля</option>
											<option>Яндекс_ИЖС</option>
											<option>Яндекс_квартиры</option>
											<option>Яндекс_коммер</option>
											<option>Циан_земля</option>
											<option>Циан_ИЖС</option>
											<option>Циан_квартиры</option>
											<option>Циан_коммер</option>
											<option>Ликадо_земля</option>
											<option>Ликадо_ИЖС</option>
											<option>Ликадо_квартиры</option>
											<option>Ликадо_коммер</option>
											<option>Недвижимость_земля</option>
											<option>Недвижимость_ИЖС</option>
											<option>Недвижимость_квартиры</option>
											<option>Недвижимость_коммер</option>
										</select>
									</Elem>
									<Elem name="Субъект" cols="7"><MultipleSelect name="private_person" entity="PrivatePersons" additionalProperties={ settlement } /></Elem>
									<Elem name="Список загрузок" cols="8">
										<select>
											<option></option>
											<option>010119_Иванов_И_И_Росреестр_земля</option>
											<option>010219_Иванов_И_И_Росреестр_ИЖС</option>
											<option>010319_Иванов_И_И_Росреестр_квартиры</option>
											<option>010419_Иванов_И_И_Росреестр_коммер</option>
											<option>010119_Прокуратова_А_С_Ареалл_земля</option>
											<option>010219_Климова_М_А_Ареалл_ИЖС</option>
											<option>010319_Прокуратова_А_С_Ареалл_квартиры</option>
											<option>010419_Климова_М_А_Ареалл_коммер</option>
											<option>010119_Сергеев_А_А_Яндекс_земля</option>
											<option>010219_Сергеев_А_А_Яндекс_ИЖС</option>
											<option>010319_Сергеев_А_А_Яндекс_квартиры</option>
											<option>010419_Сергеев_А_А_Яндекс_коммер</option>
											<option>010119_Сидоров_В_И_Циан_земля</option>
											<option>010219_Сидоров_В_И_Циан_ИЖС</option>
											<option>010319_Сидоров_В_И_Циан_квартиры</option>
											<option>010419_Сидоров_В_И_Циан_коммер</option>
											<option>010119_Зыков_А_Ю_Ликадо_земля</option>
											<option>010219_Зыков_А_Ю_Ликадо_ИЖС</option>
											<option>010319_Зыков_А_Ю_Ликадо_квартиры</option>
											<option>010419_Зыков_А_Ю_Ликадо_коммер</option>
											<option>010119_Скоробогатова_Я_Я_Недвижимость_земля</option>
											<option>010219_Скоробогатова_Я_Я_Недвижимость_ИЖС</option>
											<option>010319_Скоробогатова_Я_Я_Недвижимость_квартиры</option>
											<option>010419_Скоробогатова_Я_Я_Недвижимость_коммер</option>
										</select>
									</Elem>
								</div>
							</Collapsible>
							<Collapsible title="Местоположение" isOpen={ true }>
								<div className="grid-row">
									<Elem name="Район" cols="4"><MultipleSelect name="area" entity="FiasAreas" additionalProperties={ region } /></Elem>
									<Elem name="Кадастровый квартал" cols="4"><Input name="cadastral_quarter" type="text" placeholder="55:36:100101" /></Elem>
									<Elem name="Поиск по группе кадастровых номеров" cols="8"><Input name="cadastral_numbers_list" type="text" placeholder="55:36:100101:677 55:36:100101:678 55:36:100101:679" /></Elem>
								</div>
								<div className="grid-row">
									<Elem name="Населенный пункт" cols="4"><MultipleSelect name="settlement" entity="Kladr" additionalProperties={ regionAndArea } /></Elem>
									<Elem name="Административный округ" cols="4"><MultipleSelect name="administrative_district" entity="AdministrativeDistricts" additionalProperties={ settlement } disabled={ disableSomeLocationFields } /></Elem>
									<Elem name="Муниципальный район" cols="4"><MultipleSelect name="municipal_district" entity="MetropolitanBorough" additionalProperties={ settlement } disabled={ disableSomeLocationFields } /></Elem>
									<Elem name="Промзона" cols="4"><MultipleSelect name="industrial_zone" entity="RealObjects" additionalProperties={ settlementWithObjectType } disabled={ disableSomeLocationFields } /></Elem>
									<Elem name="Ценовая зона" cols="2"><MultipleSelect name="price_zone" entity="PriceZones" additionalProperties={ settlement } disabled={ disableSomeLocationFields } /></Elem>
									<Elem name="Град. зона" cols="2"><MultipleSelect name="urban_area" entity="UrbanAreas" additionalProperties={ settlement } disabled={ disableSomeLocationFields } /></Elem>
									<Elem name="Зона ПЗЗ" cols="2"><Input name="development_control_zone" type="text"/></Elem>
								</div>
								<div className="grid-row">
									<Elem name="Улица" cols="4"><MultipleSelect name="street" entity="KladrStreets" additionalProperties={ settlement } disabled={ disableSomeLocationFields } /></Elem>
									<Elem name="Дом" cols="2"><Input name="house" type="text" disabled={ disableSomeLocationFields } /></Elem>
									<Elem name="Корпус" cols="2"><Input name="building" type="text" disabled={ disableSomeLocationFields } /></Elem>
									<Elem name="Строение" cols="2"><Input name="construction" type="text" disabled={ disableSomeLocationFields } /></Elem>
									<Elem name="Литера" cols="2"><Input name="letter" type="text" disabled={ disableSomeLocationFields } /></Elem>
									<Elem name="№ кв./пом." cols="2"><Input name="rooms_group_number" type="text" disabled={ disableSomeLocationFields } /></Elem>
									<div className="grid-cols-4 text-margin-v1x">
										<div className="group-block add-top_block">
											<div className="element-form no-length">
												<div className="checkbox checkbox-inline only">
													<Input name="within_the_boundaries_of_locality" type="checkbox" />В черте населенного пункта
												</div>
											</div>
										</div>
									</div>
								</div>
							</Collapsible>
							<Collapsible title="Тип объекта" isOpen={ true }>
								<div className="grid-row">
									<Elem name="Категория ЗУ" cols="4"><MultipleSelect name="land_category" entity="LandCategories" /></Elem>
									<Elem name="Вид разрешенного исп-я ЗУ" cols="4"><MultipleSelect name="land_allowed_usage" entity="LandAllowedUsage" /></Elem>
									<Elem name="Подвид ЗУ" cols="4"><MultipleSelect name="land_type" entity="LandTypes" /></Elem>
								</div>
								<div className="grid-row">
									<Elem name="Категория ОКС" cols="4"><MultipleSelect name="building_category" entity="BuildingCategories" /></Elem>
									<Elem name="Вид ОКС" cols="4"><MultipleSelect name="building_kind" entity="BuildingKinds" /></Elem>
									<Elem name="Подвид ОКС" cols="4"><MultipleSelect name="building_type" entity="BuildingTypes" /></Elem>
									<Elem name="Класс ОКС" cols="3"><MultipleSelect name="building_class" entity="BuildingClasses" /></Elem>
									<Elem name="Подкласс ОКС" cols="3"><MultipleSelect name="building_subclass" entity="BuildingSubclasses" /></Elem>
									<Elem name="Морфотип ОКС" cols="3"><MultipleSelect name="building_morphotype" entity="BuildingMorphotypes" /></Elem>
								</div>
								<div className="grid-row">
									<Elem name="Вид ГП" cols="4"><MultipleSelect name="rooms_group_kind" entity="RoomsGroupKinds" /></Elem>
									<Elem name="Подвид ГП" cols="4"><MultipleSelect name="rooms_group_type" entity="RoomsGroupTypes" /></Elem>
								</div>
							</Collapsible>
							<Collapsible title="Экономика и право">
								<div className="grid-row">
									<Elem name="Вид права" cols="4"><MultipleSelect name="form_of_property_ownership" entity="FormsOfPropertyOwnership" /></Elem>
									<Elem name="Ограничения/Обременения" cols="4"><MultipleSelect name="restriction_of_right" entity="RestrictionsOfRight" /></Elem>
									<Elem name="Тип аренды" cols="4"><Select name="type_of_rent" entity="TypesOfRent" /></Elem>
								</div>
							</Collapsible>
							<Collapsible title="Инфраструктура">
								<div className="grid-row">
									<Elem name="Объект инфраструктуры" cols="4"><MultipleSelect name="infrastructure_object" entity="InfrastructureObjects" /></Elem>
									<Elem name="Расстояние до объекта" cols="4">
										<Select name="distance_to_infrastructure_object">
											<option></option>
											<option value="1">&lt;50</option>
											<option value="2">50-200</option>
											<option value="3">200-500</option>
											<option value="4">500-1000</option>
											<option value="5">>1000</option>
										</Select>
									</Elem>
									<Elem name="Улучшения на прилегающей территории" cols="4"><MultipleSelect name="land_improvement" entity="ObjectImprovements" additionalProperties={ { objectType: 1 } } /></Elem>
								</div>
							</Collapsible>
							<Collapsible title="Коммуникации и инженерные сети">
								<div className="grid-row">
									<Elem name="Электроснабжение" cols="4"><Select name="power_supply_type" entity="PowerSupplyTypes" /></Elem>
									<Elem name="Водоснабжение" cols="4"><Select name="water_supply_type" entity="WaterSupplyTypes" /></Elem>
									<Elem name="Канализация" cols="4"><Select name="sewerage_type" entity="SewerageTypes" /></Elem>
								</div>
								<div className="grid-row">
									<Elem name="Газоснабжение" cols="4"><Select name="gas_supply_type" entity="GasSupplyTypes" /></Elem>
									<Elem name="Отопление" cols="4"><Select name="heating_type" entity="HeatingTypes" /></Elem>
									<Elem name="Горячее водоснабжение" cols="4"><Select name="hot_water_supply_type" entity="HotWaterSupplyTypes" /></Elem>
								</div>
								<div className="grid-row">
									<Elem name="Телекоммуникации" cols="4"><Select name="telecommunications" entity="InternetConnectionTypes" /></Elem>
									<Elem name="Охрана/Контроль доступа" cols="4"><Select name="security_access_control" entity="RoomGroupSecurity" /></Elem>
									<Elem name="Вентиляция" cols="4"><Select name="ventilation" entity="ClimaticEquipment" /></Elem>
								</div>
							</Collapsible>
							<Collapsible title="Здание/Литера">
								<div className="grid-row">
									<Elem name="Материал стен" cols="4"><MultipleSelect name="wall_material" entity="WallMaterials" /></Elem>
									<Elem name="Этажность" cols="2"><Input name="number_of_floors_from" placeholder="с" type="text" /></Elem>
									<div className="grid-cols-2 text-margin-v1x">
										<div className="group-block add-top_block">
											<div className="element-form">
												<Input name="number_of_floors_to" placeholder="по" type="text" />
											</div>
										</div>
									</div>
									<Elem name="Группа капитальности" cols="3"><MultipleSelect name="durability_group" entity="DurabilityGroups" /></Elem>
									<Elem name="Износ здания" cols="2"><Input name="letter_deprecation_from" placeholder="от" type="text" /></Elem>
									<div className="grid-cols-2 text-margin-v1x">
										<div className="group-block add-top_block">
											<div className="element-form">
												<Input name="letter_deprecation_to" placeholder="до" type="text" />
											</div>
										</div>
									</div>
									<Elem name="Лифты" cols="3"><Select name="number_of_elevators" entity="NumberOfElevators" /></Elem>
									<Elem name="Гр. лифты" cols="3"><Select name="number_of_freight_elevators" entity="NumberOfElevators" /></Elem>
								</div>
								<div className="grid-row">
									<Elem name="Индивидуальное имя" cols="4"><Input name="building_title" type="text" /></Elem>
									<Elem name="Год ввода в эксплуатацию" cols="2"><Input name="building_year_from" placeholder="от" type="text" /></Elem>
									<div className="grid-cols-2 text-margin-v1x">
										<div className="group-block add-top_block">
											<div className="element-form">
												<Input name="building_year_to" placeholder="до" type="text" />
											</div>
										</div>
									</div>
									<Elem name="Квартал сдачи" cols="2">
										<MultipleSelect name="deadline_quarter">
											<option></option>
											<option value="1">I</option>
											<option value="2">II</option>
											<option value="3">III</option>
											<option value="4">IV</option>
										</MultipleSelect>
									</Elem>
									<Elem name="Стадия строительства" cols="4"><MultipleSelect name="building_stage" entity="BuildingStages" /></Elem>
									<Elem name="Застройщик" cols="7"><MultipleSelect name="developer" entity="Organizations" /></Elem>
								</div>
							</Collapsible>
							<Collapsible title="Параметры помещения/квартиры">
								<div className="grid-row">
									<Elem name="Этаж" cols="2"><Input type="text" name="floor_from" placeholder="с" /></Elem>
									<div className="grid-cols-2 text-margin-v1x">
										<div className="group-block add-top_block">
											<div className="element-form">
												<Input type="text" name="floor_to" placeholder="по" />
											</div>
										</div>
									</div>
									<Elem name="Комнат/пом." cols="2">
										<MultipleSelect name="number_of_rooms">
											<option></option>
											<option value="1">1</option>
											<option value="2">2</option>
											<option value="3">3</option>
											<option value="4">4</option>
											<option value="5">5</option>
											<option value="6">6</option>
											<option value="7">7</option>
										</MultipleSelect>
									</Elem>
									<Elem name="Площадь жилая/основная" cols="2"><Input name="livingspace_from" placeholder="от" type="text" /></Elem>
									<div className="grid-cols-2 text-margin-v1x">
										<div className="group-block add-top_block">
											<div className="element-form">
												<Input name="livingspace_to" placeholder="до" type="text" />
											</div>
										</div>
									</div>
									<Elem name="Площадь кухни/вспомогательная" cols="2"><Input name="kitchen_space_from" placeholder="от" type="text" /></Elem>
									<div className="grid-cols-2 text-margin-v1x">
										<div className="group-block add-top_block">
											<div className="element-form">
												<Input name="kitchen_space_to" placeholder="до" type="text" />
											</div>
										</div>
									</div>
									<Elem name="Балкон" cols="2">
										<Select name="number_of_balconies">
											<option></option>
											<option value="0">Нет</option>
											<option value="1">1</option>
											<option value="2">2</option>
											<option value="3">3+</option>
										</Select>
									</Elem>
									<Elem name="Лоджия" cols="2">
										<Select name="number_of_loggia">
											<option></option>
											<option value="0">Нет</option>
											<option value="1">1</option>
											<option value="2">2</option>
											<option value="3">3+</option>
										</Select>
									</Elem>
								</div>
								<div className="grid-row">
									<Elem name="Высота потолка" cols="2"><Input name="ceiling_height_from" placeholder="от" type="text" /></Elem>
									<div className="grid-cols-2 text-margin-v1x">
										<div className="group-block add-top_block">
											<div className="element-form">
												<Input name="ceiling_height_to" placeholder="до" type="text" />
											</div>
										</div>
									</div>
									<Elem name="Планировка" cols="7"><MultipleSelect name="layout" entity="LayoutsOfRooms" /></Elem>
									<Elem name="Вид из окна" cols="7"><MultipleSelect name="windows_view" entity="WindowsViews" /></Elem>
								</div>
								<div className="grid-row">
									<Elem name="Техническое состояние" cols="4">
										<Select name="technical_condition">
											<option></option>
											<option value="1">отличное</option>
											<option value="2">очень хорошее</option>
											<option value="3">хорошее</option>
											<option value="4">удовлетворительное</option>
											<option value="5">плохое</option>
											<option value="6">неудовлетворительное</option>
										</Select>
									</Elem>
									<Elem name="Отделка" cols="4"><MultipleSelect name="rooms_group_decoration" entity="DecorationLevel" /></Elem>
									<Elem name="Физический износ помещения" cols="2"><Input name="rooms_group_technical_condition_from" placeholder="от" type="text" /></Elem>
									<div className="grid-cols-2 text-margin-v1x">
										<div className="group-block add-top_block">
											<div className="element-form">
												<Input name="rooms_group_technical_condition_to" placeholder="до" type="text" />
											</div>
										</div>
									</div>
									<Elem name="Улучшения ГП" cols="4"><MultipleSelect name="rooms_group_improvement" entity="ObjectImprovements" additionalProperties={ { objectType: 4 } } /></Elem>
								</div>
							</Collapsible>
							<div className="search-button__wrapper">
								<button type="submit" className="search_button_footer">ПОИСК</button>
								<button className="clean_button_footer_text" type="button" onClick={ clearAdvancedSearch }>ОЧИСТИТЬ ФОРМУ</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}



const mapDispatchToProps = ( dispatch ) => (
	{
		close: () => dispatch( toggleAdvancedSearch() )
	} );


export default connect( null, mapDispatchToProps )( AdvancedSearch );