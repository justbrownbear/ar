
import React from "react";
import ReactPaginate from "react-paginate";
import { connect } from "react-redux";

import thousandSeparator from "../util/thousandSeparator.js";

import { setItemsOnPage, getResultData, setResultTableRef } from "./redux/actions.js";
import { ALL_OBJECTS, LAND, BUILDING, LETTER, ROOMS_GROUP, ROOM, INDUSTRIAL_ZONE, ASSET_GROUP } from "lk/constants.js";



function AssetGroup( props )
{
	return (
		<tbody>
			<tr>
				<td id="table-analogues__checkbox"><input type="checkbox" name="" /></td>
				<td id="table-analogues__title-number-cadastre" colSpan="2"><span className="table-analogues__title-span">Кадастровый номер:</span><a href={ "/objects/" + props.id } target="_blank">{ props.cadastral_number }</a></td>
				<td className="table-analogues__title"><span className="table-analogues__title-span">Тип операции:</span>{ props.operation_type }</td>
				<td id="table-analogues__title-unit-price"><span>Дата начала периода/Дата окончания действия операции:</span>{ props.exposition }</td>
				<td id="table-analogues__title-price-operation"><span className="table-analogues__title-span">Cтоимость полная:</span>{ thousandSeparator( props.cost ) }☧</td>
				<td id="table-analogues__title-price-cadastre"><span  className="table-analogues__title-span">Кадастровая стоимость ЗУ (сумма всех ЗУ)</span>Нет данных</td>
				<td id="table-analogues__title-unit-price-cadastre"><span className="table-analogues__title-span">Кадастровая стоимость ОКС  (сумма всех ОКС)</span>Нет данных</td>
			</tr>
			<tr>
				<td colSpan="2" rowSpan="2" className="table-analogues__image"><img src={ props.file ? ( "/custom/real_objects/photo/146x110/" + props.file ) : "/img/blank_146x110.jpg" } alt="Фото объекта" /></td>
				<td id="table-analogues-type"><span className="table-analogues__title-span">Тип объекта:</span>Имущественный комплекс</td>
				<td>
					<div className="table-analogues__address-item">
						<span className="table-analogues__map"></span>
						<span>Адрес:</span>
					</div>
					{ props.address }
				</td>
				<td id="table-analogues-sqare"><span className="table-analogues__title-span">Площадь общая/основная/вспомогательная, м²:</span>{ thousandSeparator( props.space ) }</td>
				<td><span>Наличие ж/д путей, ведущих к объекту:</span>{ props.railroad_driveways }</td>
				<td><span>Доп. улучшения:</span><p className="table-analogues__text-wrap">{ props.improvements }</p></td>
				<td><span>Электроснабжение:</span>{ props.power_supply_type}</td>
			</tr>
			<tr>
				<td><span>Имя собственное:</span>{ props.asset_group_title}</td>
				<td><span>Ценовая зона (ГТЗ) [эталонное], категория ценности зоны; индекс ценности зоны:</span>{ props.zone }</td>
				<td><span>Площадь территории, м²/Количество ЗУ:</span>{ thousandSeparator( props.asset_group_total_area ) }{ props.count_asset_group_land }</td>
				<td><span>Наличие водных путей, ведущих к объекту:</span><p className="table-analogues__text-wrap">{ props.water_driveways}</p></td>
				<td><span></span></td>
				<td><span>Водоснабжение:</span>{ props.water_supply_type}</td>
			</tr>
			<tr>
				<td colSpan="2"><span>Вид права:</span>{ props.property_ownership}</td>
				<td><span>Тип ИК:</span>{ props.asset_group_type}</td>
				<td><span>Наименование ООТ/удаленность, м:</span>{ thousandSeparator( props.transport_stop ) }</td>
				<td><span>Площадь застройки, м²:</span>{ thousandSeparator( props.asset_group_builtup_area ) }</td>
				<td><span>Наличие воздушных путей:</span><p className="table-analogues__text-wrap">{ props.air_driveways}</p></td>
				<td><span></span></td>
				<td><span>Водоотведение:</span>{ props.sewerage_type }</td>
			</tr>
			<tr>
				<td colSpan="2"><span>Правовое наименование:</span><p className="table-analogues__text-wrap">{ props.real_objects_title}</p></td>
				<td><span>Отрасль:</span><p className="table-analogues__text-wrap">{ props.sphere_of_business}</p></td>
				<td><span>Магистраль/качество магистрали:</span>{ props.highways }</td>
				<td><span>Свободная территория для размещения новых резидентов, га:</span>{ props.asset_group_available_land}</td>
				<td><span>Наличие автотранспортных путей, ведущих к объекту:</span><p className="table-analogues__text-wrap">{ props.automobile_driveways}</p></td>
				<td><span></span></td>
				<td><span>Наличие очистных сооружений:</span>{ props.treatment_facilities}</td>
			</tr>
			<tr>
				<td colSpan="2"><span></span></td>
				<td><span>Вид:</span>{ props.building_kind}</td>
				<td><span>Удаленность от магистрали, м:</span>{ thousandSeparator( props.distance_from_highways ) }</td>
				<td><span>Рельеф:</span>{ props.landscape_relief}</td>
				<td><span>Удаленность от федеральной трассы, м:</span><p className="table-analogues__text-wrap">{ thousandSeparator( props.distance_from_federal_highways ) }</p></td>
				<td><span></span></td>
				<td><span>Отопление:</span>{ props.heating_types}</td>
			</tr>
			<tr>
				<td colSpan="2"><span></span></td>
				<td><span>Тип:</span>{ props.building_type}</td>
				<td><span></span></td>
				<td><span></span></td>
				<td><span>Удаленность от транспортных узлов, крупных логистических центров, м:</span><p className="table-analogues__text-wrap">{ thousandSeparator( props.from_logistics_centers ) }</p></td>
				<td><span></span></td>
				<td><span>Газоснабжение:</span>{ props.gas_supply_type }</td>
			</tr>
			<tr>
				<td colSpan="2"><span>Управляющий (УК):</span>Нет данных</td>
				<td><span>Количество рабочих мест:</span>{ props.number_of_jobs}</td>
				<td><span></span></td>
				<td><span></span></td>
				<td><span>Удаленность от сырьевого центра, м:</span>{ thousandSeparator( props.distance_from_raw_centers ) }</td>
				<td><span></span></td>
				<td><span>Охрана/контроль доступа:</span><p className="table-analogues__text-wrap">{ props.asset_group_security }</p></td>
			</tr>
			<tr>
				<td colSpan="2"><span>Качество управления (УК):</span><p className="table-analogues__text-wrap">Нет данных</p></td>
				<td><span>Описание:</span><p className="table-analogues__text-wrap">{ props.asset_group_common_parameters }</p></td>
				<td><span></span></td>
				<td><span></span></td>
				<td><span>Удаленность от жилых кварталов, м:</span><p className="table-analogues__text-wrap">{ thousandSeparator( props.from_residental ) }</p></td>
				<td><span></span></td>
				<td><span></span></td>
			</tr>
			<tr>
				<td colSpan="2"><span>Источник Ссылка (на первоисточник):</span><p className="table-analogues__text-wrap"><a href= { props.source }>{ props.source }</a></p></td>
				<td><span>История:</span><p className="table-analogues__text-wrap">{ props.asset_group_history }</p></td>
				<td><span></span></td>
				<td><span></span></td>
				<td><span></span></td>
				<td><span></span></td>
				<td><span></span></td>
			</tr>
			<tr>
				<td colSpan="8"><span>Текст оферты</span><p className="table-analogues__text-wrap">{ props.description }</p></td>
			</tr>
		</tbody>
	);
}



function Land( props )
{
	return (
		<tbody>
			<tr>
				<td id="table-analogues__checkbox"><label><input type="checkbox" name="" /></label></td>
				<td id="table-analogues__title-number-cadastre" colSpan="2"><span className="table-analogues__title-span">Кадастровый номер:</span><a href={ "/objects/" + props.id } target="_blank">{ props.cadastral_number }</a></td>
				<td className="table-analogues__title"><span className="table-analogues__title-span">Тип операции:</span>{ props.operation_type }</td>
				<td id="table-analogues__title-price-operation"><span className="table-analogues__title-span">Цена полная, ☧:</span>{ thousandSeparator( props.cost ) }</td>
				<td id="table-analogues__title-unit-price"><span>Удельная цена, ☧/м²:</span>{ thousandSeparator( props.unit_cost ) }</td>
				<td id="table-analogues__title-price-cadastre"><span  className="table-analogues__title-span">Кадастровая ст-ть, ☧:</span>{ thousandSeparator( props.cadastr_cost ) }</td>
				<td id="table-analogues__title-unit-price-cadastre"><span className="table-analogues__title-span">УПКС, ☧/м²:</span>{ thousandSeparator( props.cadastr_unit_cost ) }</td>
			</tr>
			<tr>
				<td colSpan="2" rowSpan="2" className="table-analogues__image"><img src={ props.file ? ( "/custom/real_objects/photo/146x110/" + props.file ) : "/img/blank_146x110.jpg" } alt="Фото" /></td>
				<td id="table-analogues-type"><span className="table-analogues__title-span">Тип объекта:</span>Земельный участок</td>
				<td>
					<div className="table-analogues__address-item">
						<span className="table-analogues__map"></span>
						<span>Адрес:</span>
					</div>
					{ props.address }
				</td>
				<td id="table-analogues-sqare"><span className="table-analogues__title-span">Площадь, м²:</span>{ thousandSeparator( props.space ) }</td>
				<td><span>Условия продажи:</span>Нет данных</td>
				<td><span>Дата начала периода/Дата окончания действия операции:</span>{ props.exposition }</td>
				<td><span></span></td>
			</tr>
			<tr>
				<td><span>Категория:</span>{ props.category }</td>
				<td><span>Ценовая зона, ценность зоны, Индекс ценности зоны:</span>{ props.zone }</td>
				<td><span>Форма (геометрия участка):</span>{ props.geometry }</td>
				<td><span>Доп. улучшения:</span><p className="table-analogues__text-wrap">{ props.improvements }</p></td>
				<td><span>Расстояние до жилых районов:</span><p className="table-analogues__text-wrap">{ props.from_residental }</p></td>
				<td><span>Энергоснабжение:</span>{ props.power_supply_type}</td>
			</tr>
			<tr>
				<td colSpan="2"><span>Вид права:</span>{ props.property_ownership }</td>
				<td><span>Вид разрешенного использования:</span><p className="table-analogues__text-wrap">{ props.vri }</p></td>
				<td><span>Наименование ООТ/удалённость, м:</span><p className="table-analogues__text-wrap">{ thousandSeparator( props.transport_stop ) }</p></td>
				<td><span>Инженерно-геологические условия (рельеф):</span>{ props.landscape_relief }</td>
				<td><span>Плотность застройки:</span>{ props.building_density }%</td>
				<td><span>Близость к объекту, позитивно влияющему на стоимость, м:</span>{ thousandSeparator( props.to_positive ) }</td>
				<td><span>Водоснабжение:</span>{ props.water_supply_type }</td>
			</tr>
			<tr>
				<td colSpan="2"><span>Агент (агентство недвижимости):</span>{ props.agency }</td>
				<td><span>Тип ЗУ:</span><p className="table-analogues__text-wrap">{ props.land_type }</p></td>
				<td><span>Наименование магистрали/ценность магистрали:</span>{ props.highways }</td>
				<td><span>Затопленность участка (Глубина залегания грунтовых вод):</span>{ props.groundwater_depth }м</td>
				<td><span>Наличие ж/д путей:</span><p className="table-analogues__text-wrap">{ props.railroad_driveways }</p></td>
				<td><span>Удаленность от объекта, негативно влияющего на стоимость, м:</span>{ thousandSeparator( props.to_negative ) }</td>
				<td><span>Водоотведение:</span>{ props.sewerage_type }</td>
			</tr>
			<tr>
				<td colSpan="2"><span></span></td>
				<td><span>Основное/вспомогательное назначение земельного участка:</span>{ props.match_types_of_use }</td>
				<td><span>Удаленность от магистрали, м:</span>{ thousandSeparator( props.distance_from_highways ) }м</td>
				<td><span>Почвенный состав:</span>{ props.soil_structure }</td>
				<td><span>Контроль безопасности:</span><p className="table-analogues__text-wrap">{ props.security_level }</p></td>
				<td><span>Наличие иных объектов торговли, сериса, досуга, иных центров деловой и социальной активности:</span><p className="table-analogues__text-wrap">{ props.presence_commercial }</p></td>
				<td><span>Газоснабжение:</span>{ props.gas_supply_type }</td>
			</tr>
			<tr>
				<td colSpan="2"><span>Управляющий (УК):</span>Нет данных</td>
				<td><span>Общественно-социальная направленность:</span>Нет данных</td>
				<td><span>Пешеходный трафик:</span>{ props.pedestrian_traffic }</td>
				<td><span>Экологическая обстановка (Опасности окружающей среды):</span><p className="table-analogues__text-wrap">{ props.ecological_situation }</p></td>
				<td><span>Состояние прилегающей территории:</span><p className="table-analogues__text-wrap">{ props.environment_condition }</p></td>
				<td><span>Удаленность от деловых зон, м:</span><p className="table-analogues__text-wrap">{ thousandSeparator( props.to_business_zones ) }</p></td>
				<td><span>Отопление:</span>{ props.heating_type }</td>
			</tr>
			<tr>
				<td colSpan="2"><span>Источник Ссылка (на первоисточник):</span><a href={ props.source }>{ props.source }</a></td>
				<td><span>Качество управления (УК):</span><p className="table-analogues__text-wrap">{ props.land_quality_of_management }</p></td>
				<td><span>Автомобильный трафик/Качество магистрали:</span><p className="table-analogues__text-wrap">{ props.car_traffic }</p></td>
				<td><span>Застроенность ЗУ</span>{ props.builtup_land }</td>
				<td><span>Удаленность от транспортных  узлов и крупных логистических центров, м:</span><p className="table-analogues__text-wrap">{ thousandSeparator( props.from_logistics_centers) }</p></td>
				<td><span>Удаленность от жилых кварталов, м:</span><p className="table-analogues__text-wrap">{ thousandSeparator( props.from_residental ) }</p></td>
				<td><span>Интернет:</span>Нет данных</td>
			</tr>
			<tr>
				<td colSpan="8"><span>Текст оферты</span><p className="table-analogues__text-wrap">{ props.description }</p></td>
			</tr>
		</tbody>
	);
}



function Building( props )
{
	return (
		<tbody>
			<tr>
				<td id="table-analogues__checkbox"><label><input type="checkbox" name="" /></label></td>
				<td id="table-analogues__title-number-cadastre" colSpan="2"><span className="table-analogues__title-span">Кадастровый номер:</span><a href={ "/objects/" + props.id } target="_blank">{ props.cadastral_number }</a></td>
				<td className="table-analogues__title"><span className="table-analogues__title-span">Тип операции:</span>{ props.operation_type }</td>
				<td id="table-analogues__title-price-operation"><span className="table-analogues__title-span">Цена полная, ☧:</span>{ thousandSeparator( props.cost ) }</td>
				<td id="table-analogues__title-unit-price"><span>Удельная цена, ☧/м²:</span>{ thousandSeparator( props.unit_cost ) }</td>
				<td id="table-analogues__title-price-cadastre"><span  className="table-analogues__title-span">Кадастровая ст-ть, ☧:</span>{ thousandSeparator( props.cadastr_cost ) }</td>
				<td id="table-analogues__title-unit-price-cadastre"><span className="table-analogues__title-span">УПКС, ☧/м²:</span>{ thousandSeparator( props.cadastr_unit_cost ) }</td>
			</tr>
			<tr>
				<td colSpan="2" rowSpan="2" className="table-analogues__image"><img src={ props.file ? ( "/custom/real_objects/photo/146x110/" + props.file ) : "/img/blank_146x110.jpg" } alt="Фото" /></td>
				<td><span>Тип рынка/Стадия строительства:</span>{ props.building_stage }</td>
				<td><span>Условия продажи:</span>Нет данных</td>
				<td><span>Дата начала периода/Дата окончания действия операции:</span>{ props.exposition }</td>
				<td><span></span></td>
				<td><span></span></td>
				<td><span></span></td>
			</tr>
			<tr>
				<td id="table-analogues-type"><span className="table-analogues__title-span">Тип ОКС(подвид ОКС):</span>{ props.building_type }</td>
				<td>
					<div className="table-analogues__address-item">
						<span className="table-analogues__map"></span>
						<span>Адрес:</span>
					</div>
					{ props.address }
				</td>
				<td id="table-analogues-sqare"><span className="table-analogues__title-span">Площадь общая/основная/вспомогательная, м²:</span>{ thousandSeparator( props.space ) }</td>
				<td><span>Вид права:</span>{ props.property_ownership}</td>
				<td><span>Высота потолков:</span>Нет данных</td>
				<td><span>Электроснабжение:</span>{ props.power_supply_type}</td>
			</tr>
			<tr>
				<td colSpan="2"><span>Индивидуальное имя:</span>{ props.building_title }</td>
				<td><span>Категория ОКС:</span>{ props.building_categorie}</td>
				<td><span>Ценовая зона (ГТЗ) [эталонное], категория ценности зоны; индекс ценности зоны:</span>{ props.zone}</td>
				<td><span>Этажность/уровни</span>{ props.floors }</td>
				<td><span>ВРИ ЗУ (подвид ЗУ 17/90шт) (площадь ЗУ, м²):</span><p className="table-analogues__text-wrap">{ props.vri } ({ thousandSeparator( props.land_space ) })</p></td>
				<td><span>Балкон/лоджия:</span>Нет данных</td>
				<td><span>Водоснабжение:</span>{ props.water_supply_type }</td>
			</tr>
			<tr>
				<td colSpan="2"><span>Застройщик:</span>{ props.developer }</td>
				<td><span>Вид ОКС:</span>{ props.building_kind }</td>
				<td><span>Наименование ООТ/удаленность, м:</span>{ thousandSeparator( props.transport_stop ) }</td>
				<td><span>Техническое состояние:</span>{ props.letter_technical_state }</td>
				<td><span>Состояние мест общего пользования/Благоустройство территории</span><p className="table-analogues__text-wrap">{ props.shared_spaces_type }</p></td>
				<td><span>Вид из окна:</span>Нет данных</td>
				<td><span>ГВС:</span>{ props.hot_water_supply_type }</td>
			</tr>
			<tr>
				<td colSpan="2"><span>Агент (агентство недвижимости):</span>{ props.agency }</td>
				<td><span>Год постройки/год реконструкции (капремонта):</span>{ props.building_year }</td>
				<td><span>Пешеходный трафик:</span>{ props.pedestrian_traffic }</td>
				<td><span>Сводный вычисляемый износ по литере (среднее по конструктивам):</span>{ props.letter_technical_state }</td>
				<td><span>Входная группа:</span>Нет данных</td>
				<td><span>Туалет/санузел:</span>Нет данных</td>
				<td><span>Водоотведение:</span>{ props.sewerage_type }</td>
			</tr>
			<tr>
				<td colSpan="2"><span></span></td>
				<td><span>Материал стен, группа капитальности:</span><p className="table-analogues__text-wrap">{ props.wall_material }</p></td>
				<td><span>Автомобильный трафик:</span><p className="table-analogues__text-wrap">{ props.car_traffic }</p></td>
				<td><span>Уровень отделки:</span>{ props.outer_decoration }</td>
				<td><span>Идентифицирущие признаки:</span>Нет данных</td>
				<td><span>Система автоматического управления коммуникациями:</span><p className="table-analogues__text-wrap">{ props.level_of_automation }</p></td>
				<td><span>Отопление:</span>{ props.heating_type }</td>
			</tr>
			<tr>
				<td colSpan="2"><span>Управляющий (УК):</span>{ props.building_management_organization }</td>
				<td><span>Архитектурный стиль - решение фасада</span>{ props.architectural_style }</td>
				<td><span>Магистраль/качество магистрали:</span>{ props.highways }</td>
				<td><span></span></td>
				<td><span>Тип парковки:</span><p className="table-analogues__text-wrap">{ props.parking_type }</p></td>
				<td><span>Наличие ж/д путей:</span><p className="table-analogues__text-wrap">{ props.railroad_driveways }</p></td>
				<td><span>Газоснабжение:</span>{ props.gas_supply_type }</td>
			</tr>
			<tr>
				<td colSpan="2"><span>Качество управления (УК):</span><p className="table-analogues__text-wrap">{ props.building_quality_of_management }</p></td>
				<td><span>Класс здания/подкласс/морфотип:</span><p className="table-analogues__text-wrap">{ props.building_class }</p></td>
				<td><span>Удаленность от магистрали, м:</span>{ thousandSeparator( props.distance_from_highways ) }</td>
				<td><span>Доп. улучшения:</span><p className="table-analogues__text-wrap">{ props.improvements }</p></td>
				<td><span>Удобство подъезда автотранспорта с возможностью парковки:</span><p className="table-analogues__text-wrap">{ props.driveways_availability }</p></td>
				<td><span>Контроль безопасности:</span><p className="table-analogues__text-wrap">{ props.building_security_level }</p></td>
				<td><span>Интернет:</span>{ props.internet_connection_types }</td>
			</tr>
			<tr>
				<td colSpan="2"><span>Источник Ссылка (на первоисточник):</span><p className="table-analogues__text-wrap"><a href="{ props.source }" target="_blank">{ props.source }</a></p></td>
				<td><span>Формат объекта</span><p className="table-analogues__text-wrap">{ props.building_format }</p></td>
				<td><span>Социальный состав жильцов:</span>{ props.social_structure }</td>
				<td><span></span></td>
				<td><span></span></td>
				<td><span></span></td>
				<td><span>Вентиляция и Кондиционирование:</span><p className="table-analogues__text-wrap">{ props.climatic_equipment }</p></td>
			</tr>
			<tr>
				<td colSpan="8"><span>Текст оферты</span><p className="table-analogues__text-wrap">{ props.description }</p></td>
			</tr>
		</tbody>
	);
}



function RoomGroup( props )
{
	return (
		<tbody>
			<tr>
				<td id="table-analogues__checkbox"><label><input type="checkbox" name="" /></label></td>
				<td id="table-analogues__title-number-cadastre" colSpan="2"><span className="table-analogues__title-span">Кадастровый номер:</span><a href={ "/objects/" + props.id } target="_blank">{ props.cadastral_number }</a></td>
				<td className="table-analogues__title"><span className="table-analogues__title-span">Тип операции:</span>{ props.operation_type }</td>
				<td id="table-analogues__title-price-operation"><span className="table-analogues__title-span">Цена полная, ☧:</span>{ thousandSeparator( props.cost ) }</td>
				<td id="table-analogues__title-unit-price"><span>Удельная цена, ☧/м²:</span>{ thousandSeparator( props.unit_cost ) }</td>
				<td id="table-analogues__title-price-cadastre"><span  className="table-analogues__title-span">Кадастровая ст-ть, ☧:</span>{ thousandSeparator( props.cadastr_cost ) }</td>
				<td id="table-analogues__title-unit-price-cadastre"><span className="table-analogues__title-span">УПКС, ☧/м²:</span>{ thousandSeparator( props.cadastr_unit_cost ) }</td>
			</tr>
			<tr>
				<td colSpan="2" rowSpan="2" className="table-analogues__image"><img src={ props.file ? ( "/custom/real_objects/photo/146x110/" + props.file ) : "/img/blank_146x110.jpg" } alt="Фото" /></td>
				<td><span>Тип рынка/Стадия строительства:</span>{ props.building_stage }</td>
				<td><span>Условия продажи:</span>Нет данных</td>
				<td><span>Дата начала периода/Дата окончания действия операции:</span>{ props.exposition }</td>
				<td><span></span></td>
				<td><span></span></td>
				<td><span></span></td>
			</tr>
			<tr>
				<td id="table-analogues-type"><span className="table-analogues__title-span">Подвид ГП:</span>{ props.room_group_type }</td>
				<td>
					<div className="table-analogues__address-item">
						<span className="table-analogues__map"></span>
						<span>Адрес:</span>
					</div>
					{ props.address }</td>
				<td id="table-analogues-sqare"><span className="table-analogues__title-span">Площадь, м²:</span>{ thousandSeparator( props.space ) }</td>
				<td><span>Комнатность:</span>{ props.number_of_rooms }</td>
				<td><span>Высота потолков:</span>{ props.ceiling_height }м</td>
				<td><span>Электроснабжение:</span>{ props.power_supply_type}</td>
			</tr>
			<tr>
				<td colSpan="2"><span>Вид права:</span>{ props.property_ownership}</td>
				<td><span>Вид ГП:</span>{ props.room_group_kind }</td>
				<td><span>Ценовая зона (ГТЗ) [эталонное], категория ценности зоны; индекс ценности зоны:</span>{ props.zone }</td>
				<td><span>Этаж/этажность:</span>{ props.floors }</td>
				<td><span>Тип кухни:</span>Нет данных</td>
				<td><span>Балкон/лоджия:</span>{ props.room_subtype }</td>
				<td><span>Водоснабжение:</span>{ props.water_supply_type }</td>
			</tr>
			<tr>
				<td colSpan="2"><span>Застройщик:</span>{ props.developer }</td>
				<td><span>Год постройки:</span>{ props.building_year }</td>
				<td><span>Наименование ООТ/удаленность, м:</span>{ thousandSeparator( props.transport_stop ) }</td>
				<td><span>Техническое состояние:</span>{ props.total_deprecation }</td>
				<td><span>Туалет/Санузел:</span>{ props.toilet_type }</td>
				<td><span>Вид из окна:</span>{ props.windows_view }</td>
				<td><span>Водоотведение:</span>{ props.sewerage_type }</td>
			</tr>
			<tr>
				<td colSpan="2"><span>Агент (агентство недвижимости):</span>{ props.agency }</td>
				<td><span>Материал стен, группа капитальности:</span>{ props.wall_material }</td>
				<td><span>Наименование магистрали/качество магистрали:</span>{ props.highways }</td>
				<td><span>Уровень отделки:</span>{ props.decoration_level }</td>
				<td><span>Состояние мест общего пользования/Благоустройство территории:</span><p className="table-analogues__text-wrap">{ props.shared_spaces_type }</p></td>
				<td><span>Парковка:</span><p className="table-analogues__text-wrap">{ props.parking_type }</p></td>
				<td><span>Отопление:</span>{ props.heating_type }</td>
			</tr>
			<tr>
				<td colSpan="2"><span></span></td>
				<td><span>Класс дома/подкласс/морфотип:</span>{ props.building_class }</td>
				<td><span>Удалённость от магистрали, м:</span>{ props.distance_from_highways }</td>
				<td><span>Планировка:</span>{ props.layout }</td>
				<td><span>Входная группа:</span>{ props.entry_group }</td>
				<td><span>Удобство подъезда автотранспорта с возможностью парковки:</span>{ props.driveways_availability }</td>
				<td><span>Газоснабжение:</span>{ props.gas_supply_type }</td>
			</tr>
			<tr>
				<td colSpan="2"><span>Управляющий (УК):</span>{ props.building_management_organization }</td>
				<td><span>Архитектурный стиль - решение фасада:</span>{ props.architectural_style }</td>
				<td><span>Пешеходный трафик:</span>{ props.pedestrian_traffic }</td>
				<td><span>Доля GLA в GBA (без учёта паркинга),%:</span>{ props.gla_share_in_gba }%</td>
				<td><span>Идентифицирущие признаки:</span>Нет данных</td>
				<td><span>Система автомат упр-я инж. комм.:</span>{ props.level_of_automation }</td>
				<td><span>Локальные инженерные системы:</span><p className="table-analogues__text-wrap">{ props.room_group_engineering }</p></td>
			</tr>
			<tr>
				<td colSpan="2"><span>Источник Ссылка (на первоисточник):</span><p className="table-analogues__text-wrap"><a href={ props.source } target="_blank">{ props.source }</a></p></td>
				<td><span>Качество управления (УК):</span>{ props.building_quality_of_management }</td>
				<td><span>Автомобильный трафик:</span>{ props.car_traffic }</td>
				<td><span>Доп. улучшения:</span><p className="table-analogues__text-wrap">{ props.improvements }</p></td>
				<td><span>ВРИ ЗУ (подвид ЗУ 17/90шт)/(площадь ЗУ, м²):</span><p className="table-analogues__text-wrap">{ props.vri }/{ thousandSeparator( props.land_space ) }</p></td>
				<td><span>Наличие ж/д путей:</span><p className="table-analogues__text-wrap">{ props.railroad_driveways }</p></td>
				<td><span>Интернет:</span>{ props.internet_connection_types }</td>
			</tr>
			<tr>
				<td colSpan="8"><span>Текст оферты</span><p className="table-analogues__text-wrap">{ props.description }</p></td>
			</tr>
		</tbody>
	);
}



function SearchResultDataTable( props )
{
	return (
		<div className="b-searching-results__table">
			<div className="b-searching-results__table-wrapper">
				<table className="b-searching-results__table-analogues" ref={ ( ref ) => props.setResultTableRef( ref ) } key="resultTable">
					<colgroup>
						<col width="2%" />
						<col width="14%" />
						<col width="14%" />
						<col width="14%" />
						<col width="14%" />
						<col width="14%" />
						<col width="14%" />
						<col width="14%" />
					</colgroup>
					{
						props.data.map( ( data ) =>
						{
							switch( props.objectType )
							{
								case LAND:
									return <Land key={ data.id + "-" + data.operation } { ...data } />;

								case BUILDING:
									return <Building key={ data.id + "-" + data.operation } { ...data } />;

								case ROOMS_GROUP:
									return <RoomGroup key={ data.id + "-" + data.operation } { ...data } />;

								case ASSET_GROUP:
									return <AssetGroup key={ data.id + "-" + data.operation } { ...data } />;

								default:
									return null;
							}
						} )
					}
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
		itemsOnPage: store.analyticsCabinet.itemsOnPage
	} );


const mapDispatchToProps = ( dispatch ) => (
	{
		setItemsOnPage: ( event ) => dispatch( setItemsOnPage( event.target.value ) ),
		getResultData: ( page ) => dispatch( getResultData( page ) ),
		setResultTableRef: ( ref ) => dispatch( setResultTableRef( ref ) )
	} );


SearchResultDataTable = connect( mapStateToProps, mapDispatchToProps )( SearchResultDataTable );

export default SearchResultDataTable;