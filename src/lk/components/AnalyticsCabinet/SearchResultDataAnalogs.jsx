
import React from "react";
import ReactPaginate from "react-paginate";
import { connect } from "react-redux";

import thousandSeparator from "../util/thousandSeparator.js";

import roundingRules from "../util/roundingRules.js";

import { setItemsOnPage, getResultData, setResultTableRef } from "./redux/actions.js";
import { ALL_OBJECTS, LAND, BUILDING, LETTER, ROOMS_GROUP, ROOM, INDUSTRIAL_ZONE, ASSET_GROUP, DEFAULT_MANTISSA, NULL_MANTISSA, DEFAULT_BOUNDARY, NULL_BOUNDARY, IS_WHOLE } from "lk/constants.js";



function AssetGroup( props )
{
	return (
		<table className="b-searching-results__table-vertical" ref={ ( ref ) => props.setResultTableRef( ref ) } key="resultAnalogs">
			<thead>
				<tr>
					<th>
						<div className="table-vertical__collapse-wrapper">
							<div className="table-vertical__collapse-title"></div>
						</div>
					</th>
					<th>Характеристики</th>
					{ props.data.map( ( data ) => <th key={ data.id }><a href={ "/objects/" + data.id } target="_blank">{ data.cadastral_number }</a></th> ) }
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>
						<div className="table-vertical__refresh-search-wrapper">
							<div className="table-vertical__refresh-search-title">
								<i className="a-icon a-icon-small icon-refresh-search"></i>
							</div>
						</div>
					</td>
					<td className="table-vertical-checkbox"><span className="table-vertical-checkbox-title">Выбрать все</span><input type="checkbox" name="" /></td>
					{ props.data.map( ( data ) => <td key={ data.id }><input type="checkbox" name="" /></td> ) }
				</tr>
				<tr>
					<td></td>
					<td id="table-vertical__image-height">Фото</td>
					{ props.data.map( ( data ) => <td key={ data.id } className="table-vertical__image"><img src={ data.file ? ( "/custom/real_objects/photo/146x110/" + data.file ) : "/img/blank_146x110.jpg" } alt="Фото" /></td> ) }
				</tr>
				<tr>
					<td>1</td>
					<td>Вид права:</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.property_ownership }</td> ) }
				</tr>
				<tr>
					<td>2</td>
					<td>Тип объекта:</td>
					{ props.data.map( ( data ) => <td key={ data.id }>Имущественный комплекс</td> ) }
				</tr>
				<tr>
					<td>3</td>
					<td>Правовое наименование:</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.real_objects_title }</td> ) }
				</tr>
				<tr>
					<td>4</td>
					<td>Имя собственное:</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.asset_group_title }</td> ) }
				</tr>
				<tr>
					<td>5</td>
					<td>Тип ИК:</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.asset_group_type }</td> ) }
				</tr>
				<tr>
					<td>6</td>
					<td>Отрасль:</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.sphere_of_business }</td> ) }
				</tr>
				<tr>
					<td>7</td>
					<td>Вид:</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.building_kind }</td> ) }
				</tr>
				<tr>
					<td>8</td>
					<td>Тип:</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.building_type }</td> ) }
				</tr>
				<tr>
					<td>9</td>
					<td>Дата начала периода/Дата окончания действия операции:</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.exposition }</td> ) }
				</tr>
				<tr>
					<td>10</td>
					<td>Тип операции/Тип аренды:</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.operation_type }</td> ) }
				</tr>
				<tr>
					<td>11</td>
					<td>Цена (стоимость) полная, ☧:</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ thousandSeparator( data.cost, NULL_MANTISSA ) }☧</td> ) }
				</tr>
				<tr>
					<td>12</td>
					<td>Кадастровая стоимость ЗУ (сумма всех ЗУ), ☧:</td>
					{ props.data.map( ( data ) => <td key={ data.id }>Нет данных</td> ) }
				</tr>
				<tr>
					<td>13</td>
					<td>Кадастровая стоимость ОКС  (сумма всех ОКС), ☧/м²:</td>
					{ props.data.map( ( data ) => <td key={ data.id }>Нет данных</td> ) }
				</tr>
				<tr>
					<td>14</td>
					<td>Адрес:</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.address }</td> ) }
				</tr>
				<tr>
					<td>15</td>
					<td>Ценовая зона (ГТЗ) [эталонное], категория ценности зоны; индекс ценности зоны:</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.zone }</td> ) }
				</tr>
				<tr>
					<td>16</td>
					<td>Наименование ООТ</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.transport_stop }</td> ) }
				</tr>
				<tr>
					<td>17</td>
					<td>Удаленность от ООТ, м</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ thousandSeparator( data.distance_from_transport_stop, NULL_MANTISSA ) }</td> ) }
				</tr>
				<tr>
					<td>18</td>
					<td>Наименование магистрали/качество магистрали:</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.highways }</td> ) }
				</tr>
				<tr>
					<td>19</td>
					<td>Удаленность от магистрали, м:</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ thousandSeparator( data.distance_from_highways, NULL_MANTISSA ) }</td> ) }
				</tr>
				<tr>
					<td>20</td>
					<td>Наличие ж/д путей, ведущих к объекту:</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.railroad_driveways }</td> ) }
				</tr>
				<tr>
					<td>21</td>
					<td>Наличие водных путей, ведущих к объекту:</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.water_driveways }</td> ) }
				</tr>
				<tr>
					<td>22</td>
					<td>Наличие воздушных путей:</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.air_driveways }</td> ) }
				</tr>
				<tr>
					<td>23</td>
					<td>Наличие автотранспортных путей, ведущих к объекту:</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.automobile_driveways }</td> ) }
				</tr>
				<tr>
					<td>24</td>
					<td>Удаленность от федеральной трассы, м:</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.distance_from_federal_highways }</td> ) }
				</tr>
				<tr>
					<td>25</td>
					<td>Удаленность от транспортных узлов, крупных логистических центров, м:</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.from_logistics_centers }</td> ) }
				</tr>
				<tr>
					<td>26</td>
					<td>Удаленность от сырьевого центра, м:</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.distance_from_raw_centers }</td> ) }
				</tr>
				<tr>
					<td>27</td>
					<td>Удаленность от жилых кварталов, м:</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.from_residental }</td> ) }
				</tr>
				<tr>
					<td>28</td>
					<td>Площадь территории, м²/Количество ЗУ:</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ roundingRules( data.asset_group_total_area, NULL_BOUNDARY, DEFAULT_MANTISSA, IS_WHOLE ) }{ data.count_asset_group_land }</td> ) }
				</tr>
				<tr>
					<td>29</td>
					<td>Площадь застройки, м²:</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ roundingRules( data.asset_group_builtup_area, NULL_BOUNDARY, DEFAULT_MANTISSA, IS_WHOLE ) }</td> ) }
				</tr>
				<tr>
					<td>30</td>
					<td>Свободная территория для размещения новых резидентов, га</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ roundingRules( data.asset_group_available_land, NULL_BOUNDARY, DEFAULT_MANTISSA, IS_WHOLE ) }</td> ) }
				</tr>
				<tr>
					<td>31</td>
					<td>Рельеф:</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.landscape_relief }</td> ) }
				</tr>
				<tr>
					<td>32</td>
					<td>Количество рабочих мест:</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.number_of_jobs }</td> ) }
				</tr>
				<tr>
					<td>33</td>
					<td>Дополнительные улучшения:</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.improvements }</td> ) }
				</tr>
				<tr>
					<td>34</td>
					<td>Охрана/контроль доступа:</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.asset_group_security }</td> ) }
				</tr>
				<tr>
					<td>35</td>
					<td>Электроснабжение:</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.power_supply_type }</td> ) }
				</tr>
				<tr>
					<td>36</td>
					<td>Водоснабжение:</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.water_supply_type }</td> ) }
				</tr>
				<tr>
					<td>37</td>
					<td>Водоотведение</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.sewerage_type }</td> ) }
				</tr>
				<tr>
					<td>38</td>
					<td>Наличие очистных сооружений:</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.treatment_facilities }</td> ) }
				</tr>
				<tr>
					<td>39</td>
					<td>Отопление</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.heating_types }</td> ) }
				</tr>
				<tr>
					<td>40</td>
					<td>Газоснабжение</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.gas_supply_type }</td> ) }
				</tr>
				<tr>
					<td>41</td>
					<td>Управляющий (УК)</td>
					{ props.data.map( ( data ) => <td key={ data.id }>Нет данных</td> ) }
				</tr>
				<tr>
					<td>42</td>
					<td>Качество управления (УК)</td>
					{ props.data.map( ( data ) => <td key={ data.id }>Нет данных</td> ) }
				</tr>
				<tr>
					<td>43</td>
					<td>Интернет</td>
					{ props.data.map( ( data ) => <td key={ data.id }>Нет данных</td> ) }
				</tr>
				<tr>
					<td>44</td>
					<td>Описание</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.asset_group_common_parameters }</td> ) }
				</tr>
				<tr>
					<td>45</td>
					<td>История</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.asset_group_history }</td> ) }
				</tr>
				<tr>
					<td>46</td>
					<td>Источник (ссылка)</td>
					{ props.data.map( ( data ) => <td key={ data.id }><a href={ data.source }>{ data.source }</a></td> ) }
				</tr>
				<tr>
					<td>47</td>
					<td>Текст оферты</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.description }</td> ) }
				</tr>
			</tbody>
		</table>
	);
}



function Land( props )
{
	return (
		<table className="b-searching-results__table-vertical" ref={ ( ref ) => props.setResultTableRef( ref ) } key="resultAnalogs">
			<thead>
				<tr>
					<th>
						<div className="table-vertical__collapse-wrapper">
							<div className="table-vertical__collapse-title"></div>
						</div>
					</th>
					<th>Характеристики</th>
					{ props.data.map( ( data ) => <th key={ data.id }><a href={ "/objects/" + data.id } target="_blank">{ data.cadastral_number }</a></th> ) }
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>
						<div className="table-vertical__refresh-search-wrapper">
							<div className="table-vertical__refresh-search-title">
								<i className="a-icon a-icon-small icon-refresh-search"></i>
							</div>
						</div>
					</td>
					<td className="table-vertical-checkbox"><span className="table-vertical-checkbox-title">Выбрать все</span><label><input type="checkbox" name="noname" id="table-vertical-checkbox" /></label></td>
					{ props.data.map( ( data ) => <td key={ data.id } className="table-vertical-checkbox"><label><input type="checkbox" name="noname" id="table-vertical-checkbox" /></label></td> ) }
				</tr>
				<tr>
					<td></td>
					<td id="table-vertical__image-height">Фото объекта</td>
					{ props.data.map( ( data ) => <td key={ data.id } className="table-vertical__image"><img src={ data.file ? ( "/custom/real_objects/photo/146x110/" + data.file ) : "/img/blank_146x110.jpg" } alt="Фото" /></td> ) }
				</tr>
				<tr>
					<td>1</td>
					<td>Вид права</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.property_ownership }</td> ) }
				</tr>
				<tr>
					<td>2</td>
					<td>Тип объекта</td>
					{ props.data.map( ( data ) => <td key={ data.id }>Земельный участок</td> ) }
				</tr>
				<tr>
					<td>3</td>
					<td>Категория земельного участка</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.category }</td> ) }
				</tr>
				<tr>
					<td>4</td>
					<td>Вид разрешенного использования (ВРИ)</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.land_allowed_usage }</td> ) }
				</tr>
				<tr>
					<td>5</td>
					<td>Тип ЗУ по 540</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.land_type }</td> ) }
				</tr>
				<tr>
					<td>6</td>
					<td>Вспомогательное использование</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.match_types_of_use }</td> ) }
				</tr>
				<tr>
					<td>7</td>
					<td>Условия продажи</td>
					{ props.data.map( ( data ) => <td key={ data.id }>Нет данных</td> ) }
				</tr>
				<tr>
					<td>8</td>
					<td>Дата начала периода/Дата окончания действия операции</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.exposition }</td> ) }
				</tr>
				<tr>
					<td>9</td>
					<td>Тип операции/<br />Тип аренды</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.operation_type }</td> ) }
				</tr>
				<tr>
					<td>10</td>
					<td>Цена (стоимость) полная, ☧</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ thousandSeparator( data.cost, NULL_MANTISSA ) }</td> ) }
				</tr>
				<tr>
					<td>11</td>
					<td>Цена (стоимость) удельная, ☧/м²</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ roundingRules( data.unit_cost, DEFAULT_BOUNDARY, DEFAULT_MANTISSA ) }</td> ) }
				</tr>
				<tr>
					<td>12</td>
					<td>Кадастровая стоимость, ☧</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ thousandSeparator( data.cadastr_cost, NULL_MANTISSA ) }</td> ) }
				</tr>
				<tr>
					<td>13</td>
					<td>УПКС, ☧/м²</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ roundingRules( data.cadastr_unit_cost, DEFAULT_BOUNDARY, DEFAULT_MANTISSA ) }</td> ) }
				</tr>
				<tr>
					<td>14</td>
					<td>Адрес</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.address }</td> ) }
				</tr>
				<tr>
					<td>15</td>
					<td>Градостроительная зона/Зона ПЗЗ/Ценность зоны/Индекс ценности зоны</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.zone }</td> ) }
				</tr>
				<tr>
					<td>16</td>
					<td>Наименование ООТ</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.transport_stop }</td> ) }
				</tr>
				<tr>
					<td>17</td>
					<td>Удаленность от ООТ, м</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ thousandSeparator( data.distance_from_transport_stop, NULL_MANTISSA ) }</td> ) }
				</tr>
				<tr>
					<td>18</td>
					<td>Наименование магистрали/<br />качество магистрали</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.highways }</td> ) }
				</tr>
				<tr>
					<td>19</td>
					<td>Удаленность от магистрали, м</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ thousandSeparator( data.distance_from_highways, NULL_MANTISSA ) }</td> ) }
				</tr>
				<tr>
					<td>20</td>
					<td>Пешеходный трафик – для ВРИ 5,6,7,17</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.pedestrian_traffic }</td> ) }
				</tr>
				<tr>
					<td>21</td>
					<td>Автомобильный трафик/Уровень (качество) магистрали</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.car_traffic }</td> ) }
				</tr>
				<tr>
					<td>22</td>
					<td>Наличие ж/д путей</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.railroad_driveways }</td> ) }
				</tr>
				<tr>
					<td>23</td>
					<td>Площадь, м²</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ roundingRules( data.space, NULL_BOUNDARY, DEFAULT_MANTISSA, IS_WHOLE ) }</td> ) }
				</tr>
				<tr>
					<td>24</td>
					<td>Форма (геометрия участка)</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.geometry }</td> ) }
				</tr>
				<tr>
					<td>25</td>
					<td>Инженерно-геологические условия (рельеф)</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.landscape_relief }</td> ) }
				</tr>
				<tr>
					<td>26</td>
					<td>Затопленность участка/<br />(глубина залегания грунтовых вод, м)</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ thousandSeparator( data.groundwater_depth, NULL_MANTISSA ) }</td> ) }
				</tr>
				<tr>
					<td>27</td>
					<td>Почвенный состав</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.soil_structure }</td> ) }
				</tr>
				<tr>
					<td>28</td>
					<td>Экологическая обстановка/<br />(Опасности окружающей среды)</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.ecological_situation }</td> ) }
				</tr>
				<tr>
					<td>29</td>
					<td>Дополнительные улучшения</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.improvements }</td> ) }
				</tr>
				<tr>
					<td>30</td>
					<td>Плотность застройки участка, %</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ roundingRules( data.building_density, NULL_BOUNDARY, DEFAULT_MANTISSA, IS_WHOLE ) }</td> ) }
				</tr>
				<tr>
					<td>31</td>
					<td>Контроль безопасности</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.security_level }</td> ) }
				</tr>
				<tr>
					<td>32</td>
					<td>Состояние прилегающей территории</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.environment_condition }</td> ) }
				</tr>
				<tr>
					<td>33</td>
					<td>Удаленность от транспортных  узлов и крупных логистических центров</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.from_logistics_centers }</td> ) }
				</tr>
				<tr>
					<td>34</td>
					<td>Развитость инфраструктуры/<br />(агрегирующее значение)</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.infrastructure_development }</td> ) }
				</tr>
				<tr>
					<td>35</td>
					<td>Близость к объекту, позитивно влияющему на стоимость</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.to_positive }</td> ) }
				</tr>
				<tr>
					<td>36</td>
					<td>Удаленность от объекта, негативно влияющего на стоимость, м</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.to_negative }</td> ) }
				</tr>
				<tr>
					<td>37</td>
					<td>Наличие иных объектов торговли, сериса, досуга, иных центров деловой и социальной активности</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.presence_commercial }</td> ) }
				</tr>
				<tr>
					<td>38</td>
					<td>Удаленность от деловых зон, м</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.to_business_zones }</td> ) }
				</tr>
				<tr>
					<td>39</td>
					<td>Удаленность от жилых кварталов, м</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.from_residental }</td> ) }
				</tr>
				<tr>
					<td>40</td>
					<td>Электроснабжение</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.power_supply_type }</td> ) }
				</tr>
				<tr>
					<td>41</td>
					<td>Водоснабжение</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.water_supply_type }</td> ) }
				</tr>
				<tr>
					<td>42</td>
					<td>Водоотведение (канализация)</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.sewerage_type }</td> ) }
				</tr>
				<tr>
					<td>43</td>
					<td>Отопление</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.heating_type }</td> ) }
				</tr>
				<tr>
					<td>44</td>
					<td>Газоснабжение</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.gas_supply_type }</td> ) }
				</tr>
				<tr>
					<td>45</td>
					<td>Интернет</td>
					{ props.data.map( ( data ) => <td key={ data.id }>Нет данных</td> ) }
				</tr>
				<tr>
					<td>46</td>
					<td>Агент (агентство недвижимости)</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.agency }</td> ) }
				</tr>
				<tr>
					<td>47</td>
					<td>Управляющий (УК)</td>
					{ props.data.map( ( data ) => <td key={ data.id }>Нет данных</td> ) }
				</tr>
				<tr>
					<td>48</td>
					<td>Качество<br />управления (УК)</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.land_quality_of_management }</td> ) }
				</tr>
				<tr>
					<td>49</td>
					<td>Источник (ссылка)</td>
					{ props.data.map( ( data ) => <td key={ data.id }><a href= { data.source } target="_blank">{ data.source }</a></td> ) }
				</tr>
				<tr>
					<td>50</td>
					<td>Текст оферты</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.description }</td> ) }
				</tr>
			</tbody>
		</table>
	);
}



function Building( props )
{
	return (
		<table className="b-searching-results__table-vertical" ref={ ( ref ) => props.setResultTableRef( ref ) } key="resultAnalogs">
			<thead>
				<tr>
					<th>
						<div className="table-vertical__collapse-wrapper">
							<div className="table-vertical__collapse-title"></div>
						</div>
					</th>
					<th>Характеристики</th>
					{ props.data.map( ( data ) => <th key={ data.id }><a href={ "/objects/" + data.id } target="_blank">{ data.cadastral_number }</a></th> ) }
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>
						<div className="table-vertical__refresh-search-wrapper">
							<div className="table-vertical__refresh-search-title">
								<i className="a-icon a-icon-small icon-refresh-search"></i>
							</div>
						</div>
					</td>
					<td className="table-vertical-checkbox"><span className="table-vertical-checkbox-title">Выбрать все</span><label><input type="checkbox" name="noname" id="table-vertical-checkbox" /></label></td>
					{ props.data.map( ( data ) => <td key={ data.id } className="table-vertical-checkbox"><label><input type="checkbox" name="noname" id="table-vertical-checkbox" /></label></td> ) }
				</tr>
				<tr>
					<td></td>
					<td id="table-analogues__image-height">Фото объекта</td>
					{ props.data.map( ( data ) => <td key={ data.id } className="table-analogues__image" background={ data.file ? ( "/custom/real_objects/photo/146x110/" + data.file ) : "/img/blank_146x110.jpg" }></td> ) }
				</tr>
				<tr>
					<td>1</td>
					<td>Вид права, обременение</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.property_ownership }</td> ) }
				</tr>
				<tr>
					<td>2</td>
					<td>Категория ОКС</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.building_categorie}</td> ) }
				</tr>
				<tr>
					<td>3</td>
					<td>Индивидуальное Имя ОКС</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.building_title }</td> ) }
				</tr>
				<tr>
					<td>4</td>
					<td>Вид ОКС</td>
					{ props.data.map( ( data ) => <td key={ data.id } lang="ru">{ data.building_kind }</td> ) }
				</tr>
				<tr>
					<td>5</td>
					<td>Тип рынка/Стадия строительства</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.building_stage }</td> ) }
				</tr>
				<tr>
					<td>6</td>
					<td>Условия продажи</td>
					{ props.data.map( ( data ) => <td key={ data.id }>Нет данных</td> ) }
				</tr>
				<tr>
					<td>7</td>
					<td>Дата начала периода/Дата окончания действия операции</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.exposition }</td> ) }
				</tr>
				<tr>
					<td>8</td>
					<td>Тип операции/Тип аренды</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.operation_type }</td> ) }
				</tr>
				<tr>
					<td>9</td>
					<td>Цена (стоимость) полная, ☧</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ thousandSeparator( data.cost, NULL_MANTISSA ) }</td> ) }
				</tr>
				<tr>
					<td>10</td>
					<td>Цена (стоимость) удельная, ☧/м²</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ roundingRules( data.unit_cost, DEFAULT_BOUNDARY, DEFAULT_MANTISSA ) }</td> ) }
				</tr>
				<tr>
					<td>11</td>
					<td>Кадастровая стоимость, ☧</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ thousandSeparator( data.cadastr_cost, NULL_MANTISSA ) }</td> ) }
				</tr>
				<tr>
					<td>12</td>
					<td>УПКС, ☧/м²</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ roundingRules( data.cadastr_unit_cost, DEFAULT_BOUNDARY, DEFAULT_MANTISSA ) }</td> ) }
				</tr>
				<tr>
					<td>13</td>
					<td>Адрес</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.address }</td> ) }
				</tr>
				<tr>
					<td>14</td>
					<td>Градостроительная зона/Зона ПЗЗ/Ценность зоны/Индекс ценности зоны</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.zone }</td> ) }
				</tr>
				<tr>
					<td>15</td>
					<td>Наименование ООТ</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.transport_stop }</td> ) }
				</tr>
				<tr>
					<td>16</td>
					<td>Удаленность от ООТ, м</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ thousandSeparator( data.distance_from_transport_stop, NULL_MANTISSA ) }</td> ) }
				</tr>
				<tr>
					<td>17</td>
					<td>Наименование магистрали/качество магистрали</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.highways }</td> ) }
				</tr>
				<tr>
					<td>18</td>
					<td>Удаленность от магистрали, м</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ thousandSeparator( data.distance_from_highways, NULL_MANTISSA ) }</td> ) }
				</tr>
				<tr>
					<td>19</td>
					<td>Пешеходный трафик</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.pedestrian_traffic }</td> ) }
				</tr>
				<tr>
					<td>20</td>
					<td>Автомобильный трафик</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.car_traffic }</td> ) }
				</tr>
				<tr>
					<td>21</td>
					<td>Наличие ж/д путей</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.railroad_driveways }</td> ) }
				</tr>
				<tr>
					<td>22</td>
					<td>Год постройки/год реконструкции (капремонта)</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.building_year }</td> ) }
				</tr>
				<tr>
					<td>23</td>
					<td>Материал стен/материал перекрытий/группа капитальности</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.wall_material }</td> ) }
				</tr>
				<tr>
					<td>24</td>
					<td>Класс здания/подкласс/морфотип</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.building_class }</td> ) }
				</tr>
				<tr>
					<td>25</td>
					<td>Архитектурный стиль - решение фасада</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.architectural_style }</td> ) }
				</tr>
				<tr>
					<td>26</td>
					<td>Площадь, м²</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ roundingRules( data.space, NULL_BOUNDARY, DEFAULT_MANTISSA, IS_WHOLE ) }</td> ) }
				</tr>
				<tr>
					<td>27</td>
					<td>Этажность/Уровни</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.floors }</td> ) }
				</tr>
				<tr>
					<td>28</td>
					<td>Техническое состояние</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.letter_technical_state }</td> ) }
				</tr>
				<tr>
					<td>29</td>
					<td>Отделка(уровень отделки)</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.outer_decoration }</td> ) }
				</tr>
				<tr>
					<td>30</td>
					<td>Сводный вычисляемый износ по литере (среднее по конструктивам), %</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.letter_technical_state }</td> ) }
				</tr>
				<tr>
					<td>31</td>
					<td>Планировка</td>
					{ props.data.map( ( data ) => <td key={ data.id }>Нет данных</td> ) }
				</tr>
				<tr>
					<td>32</td>
					<td>Дополнительные улучшения</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.improvements }</td> ) }
				</tr>
				<tr>
					<td>33</td>
					<td>Комнатность</td>
					{ props.data.map( ( data ) => <td key={ data.id }>Нет данных</td> ) }
				</tr>
				<tr>
					<td>34</td>
					<td>Тип кухни</td>
					{ props.data.map( ( data ) => <td key={ data.id }>Нет данных</td> ) }
				</tr>
				<tr>
					<td>35</td>
					<td>Туалет/санузел</td>
					{ props.data.map( ( data ) => <td key={ data.id }>Нет данных</td> ) }
				</tr>
				<tr>
					<td>36</td>
					<td>Состояние мест общего пользования/Благоустройство территории</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.shared_spaces_type }</td> ) }
				</tr>
				<tr>
					<td>37</td>
					<td>Входная группа</td>
					{ props.data.map( ( data ) => <td key={ data.id }>Нет данных</td> ) }
				</tr>
				<tr>
					<td>38</td>
					<td>Идентифицирущие признаки</td>
					{ props.data.map( ( data ) => <td key={ data.id }>Нет данных</td> ) }
				</tr>
				<tr>
					<td>39</td>
					<td>Контроль безопасности</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.building_security_level }</td> ) }
				</tr>
				<tr>
					<td>40</td>
					<td>ВРИ ЗУ (подвид ЗУ 17/90 шт)/(площадь ЗУ, м²)</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.land_allowed_usage }/{ roundingRules( data.land_space, NULL_BOUNDARY, DEFAULT_MANTISSA, IS_WHOLE ) }</td> ) }
				</tr>
				<tr>
					<td>41</td>
					<td>Высота потолков, м</td>
					{ props.data.map( ( data ) => <td key={ data.id }>Нет данных</td> ) }
				</tr>
				<tr>
					<td>42</td>
					<td>Балкон/лоджия</td>
					{ props.data.map( ( data ) => <td key={ data.id }>Нет данных</td> ) }
				</tr>
				<tr>
					<td>43</td>
					<td>Вид из окна</td>
					{ props.data.map( ( data ) => <td key={ data.id }>Нет данных</td> ) }
				</tr>
				<tr>
					<td>44</td>
					<td>Парковка</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.parking_type }</td> ) }
				</tr>
				<tr>
					<td>45</td>
					<td>Удобство подъезда автотранспорта с возможностью парковки</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.driveways_availability }</td> ) }
				</tr>
				<tr>
					<td>46</td>
					<td>Доля GLA в GBA, %</td>
					{ props.data.map( ( data ) => <td key={ data.id }>Нет данных</td> ) }
				</tr>
				<tr>
					<td>47</td>
					<td>Электроснабжение</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.power_supply_type}</td> ) }
				</tr>
				<tr>
					<td>48</td>
					<td>Водоснабжение</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.water_supply_type }</td> ) }
				</tr>
				<tr>
					<td>49</td>
					<td>Водоотведение (канализация)</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.sewerage_type }</td> ) }
				</tr>
				<tr>
					<td>50</td>
					<td>Отопление</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.heating_type }</td> ) }
				</tr>
				<tr>
					<td>51</td>
					<td>Газоснабжение</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.gas_supply_type }</td> ) }
				</tr>
				<tr>
					<td>52</td>
					<td>Интернет</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.internet_connection_types }</td> ) }
				</tr>
				<tr>
					<td>53</td>
					<td>Локальные инженерные системы</td>
					{ props.data.map( ( data ) => <td key={ data.id }>Нет данных</td> ) }
				</tr>
				<tr>
					<td>54</td>
					<td>Система автоматизирован-ного управления коммуникациями</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.level_of_automation }</td> ) }
				</tr>
				<tr>
					<td>55</td>
					<td>Застройщик</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.developer }</td> ) }
				</tr>
				<tr>
					<td>56</td>
					<td>Агент (агентство недвижимости)</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.agency }</td> ) }
				</tr>
				<tr>
					<td>57</td>
					<td>Управляющий (УК)</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.building_management_organization }</td> ) }
				</tr>
				<tr>
					<td>58</td>
					<td>Качество управления (УК)</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.building_quality_of_management }</td> ) }
				</tr>
				<tr>
					<td>59</td>
					<td>Социальный состав</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.social_structure }</td> ) }
				</tr>
				<tr>
					<td>60</td>
					<td>Формат объекта</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.building_format }</td> ) }
				</tr>
				<tr>
					<td>61</td>
					<td>Источник (ссылка)</td>
					{ props.data.map( ( data ) => <td key={ data.id }><a href= { data.source } target="_blank">{ data.source }</a></td> ) }
				</tr>
				<tr>
					<td>62</td>
					<td>Текст оферты</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.description }</td> ) }
				</tr>
			</tbody>
		</table>
	);
}



function RoomGroup( props )
{
	return (
		<table className="b-searching-results__table-vertical" ref={ ( ref ) => props.setResultTableRef( ref ) } key="resultAnalogs">
			<thead>
				<tr>
					<th>
						<div className="table-vertical__collapse-wrapper">
							<div className="table-vertical__collapse-title"></div>
						</div>
					</th>
					<th>Характеристики</th>
					{ props.data.map( ( data ) => <th key={ data.id }><a href={ "/objects/" + data.id } target="_blank">{ data.cadastral_number }</a></th> ) }
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>
						<div className="table-vertical__refresh-search-wrapper">
							<div className="table-vertical__refresh-search-title">
								<i className="a-icon a-icon-small icon-refresh-search"></i>
							</div>
						</div>
					</td>
					<td className="table-vertical-checkbox"><span className="table-vertical-checkbox-title">Выбрать все</span><label><input type="checkbox" name="noname" id="table-vertical-checkbox" /></label></td>
					{ props.data.map( ( data ) => <td key={ data.id } className="table-vertical-checkbox"><label><input type="checkbox" name="noname" id="table-vertical-checkbox" /></label></td> ) }
				</tr>
				<tr>
					<td></td>
					<td id="table-vertical__image-height">Фото объекта</td>
					{ props.data.map( ( data ) => <td key={ data.id } className="table-vertical__image"><img src={ data.file ? ( "/custom/real_objects/photo/146x110/" + data.file ) : "/img/blank_146x110.jpg" } alt="Фото" /></td> ) }
				</tr>
				<tr>
					<td>1</td>
					<td>Вид права</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.property_ownership }</td> ) }
				</tr>
				<tr>
					<td>2</td>
					<td>Подвид ГП</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.room_group_type }</td> ) }
				</tr>
				<tr>
					<td>3</td>
					<td>Вид ГП</td>
					{ props.data.map( ( data ) => <td key={ data.id } lang="ru">{ data.room_group_kind }</td> ) }
				</tr>
				<tr>
					<td>4</td>
					<td>Тип рынка/<br />Стадия строительства</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.building_stage }</td> ) }
				</tr>
				<tr>
					<td>5</td>
					<td>Условия продажи</td>
					{ props.data.map( ( data ) => <td key={ data.id }>Нет данных</td> ) }
				</tr>
				<tr>
					<td>6</td>
					<td>Дата начала периода/Дата окончания действия операции</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.exposition }</td> ) }
				</tr>
				<tr>
					<td>7</td>
					<td>Тип операции/<br />Тип аренды</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.operation_type }</td> ) }
				</tr>
				<tr>
					<td>8</td>
					<td>Цена (стоимость) полная, ☧</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ thousandSeparator( data.cost, NULL_MANTISSA ) }</td> ) }
				</tr>
				<tr>
					<td>9</td>
					<td>Цена (стоимость) удельная, ☧/м²</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ roundingRules( data.unit_cost, DEFAULT_BOUNDARY, DEFAULT_MANTISSA ) }</td> ) }
				</tr>
				<tr>
					<td>10</td>
					<td>Кадастровая стоимость, ☧</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ thousandSeparator( data.cadastr_cost, NULL_MANTISSA ) }</td> ) }
				</tr>
				<tr>
					<td>11</td>
					<td>УПКС, ☧/м²</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ roundingRules( data.cadastr_unit_cost, DEFAULT_BOUNDARY, DEFAULT_MANTISSA ) }</td> ) }
				</tr>
				<tr>
					<td>12</td>
					<td>Адрес</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.address }</td> ) }
				</tr>
				<tr>
					<td>13</td>
					<td>Градостроительная зона/Зона ПЗЗ/Ценность зоны/Индекс ценности зоны</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.zone}</td> ) }
				</tr>
				<tr>
					<td>14</td>
					<td>Наименование ООТ</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.transport_stop }</td> ) }
				</tr>
				<tr>
					<td>15</td>
					<td>Удаленность от ООТ, м</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ thousandSeparator( data.distance_from_transport_stop, NULL_MANTISSA ) }</td> ) }
				</tr>
				<tr>
					<td>16</td>
					<td>Наименование магистрали/<br />качество магистрали</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.highways }</td> ) }
				</tr>
				<tr>
					<td>17</td>
					<td>Удаленность от магистрали, м</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ thousandSeparator( data.distance_from_highways, NULL_MANTISSA ) }</td> ) }
				</tr>
				<tr>
					<td>18</td>
					<td>Пешеходный трафик</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.pedestrian_traffic }</td> ) }
				</tr>
				<tr>
					<td>19</td>
					<td>Автомобильный трафик</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.car_traffic }</td> ) }
				</tr>
				<tr>
					<td>20</td>
					<td>Наличие ж/д путей</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.railroad_driveways }</td> ) }
				</tr>
				<tr>
					<td>21</td>
					<td>Год постройки</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.building_year }</td> ) }
				</tr>
				<tr>
					<td>22</td>
					<td>Материал стен/<br />Группа капитальности</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.wall_material }</td> ) }
				</tr>
				<tr>
					<td>23</td>
					<td>Класс дома</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.building_class }</td> ) }
				</tr>
				<tr>
					<td>24</td>
					<td>Архитектурный стиль - решение фасада</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.architectural_style }</td> ) }
				</tr>
				<tr>
					<td>25</td>
					<td>Площадь, м²</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ roundingRules( data.space, NULL_BOUNDARY, DEFAULT_MANTISSA, IS_WHOLE ) }</td> ) }
				</tr>
				<tr>
					<td>26</td>
					<td>Этаж/Этажность/Уровни</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.floors }</td> ) }
				</tr>
				<tr>
					<td>27</td>
					<td>Техническое состояние</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.total_deprecation }</td> ) }
				</tr>
				<tr>
					<td>28</td>
					<td>Отделка<br />(уровень отделки)</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.decoration_level }</td> ) }
				</tr>
				<tr>
					<td>29</td>
					<td>Планировка</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.layout }</td> ) }
				</tr>
				<tr>
					<td>30</td>
					<td>Дополнительные улучшения</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.improvements }</td> ) }
				</tr>
				<tr>
					<td>31</td>
					<td>Комнатность</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.number_of_rooms }</td> ) }
				</tr>
				<tr>
					<td>32</td>
					<td>Тип кухни</td>
					{ props.data.map( ( data ) => <td key={ data.id }>Нет данных</td> ) }
				</tr>
				<tr>
					<td>33</td>
					<td>Туалет/санузел</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.toilet_type }</td> ) }
				</tr>
				<tr>
					<td>34</td>
					<td>Состояние мест общего пользования/<br />Благоустройство территории</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.shared_spaces_type }</td> ) }
				</tr>
				<tr>
					<td>35</td>
					<td>Входная группа</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.entry_group }</td> ) }
				</tr>
				<tr>
					<td>36</td>
					<td>Идентифицирущие признаки</td>
					{ props.data.map( ( data ) => <td key={ data.id }>Нет данных</td> ) }
				</tr>
				<tr>
					<td>37</td>
					<td>ВРИ ЗУ (подвид ЗУ 17/90 шт)/<br />(площадь ЗУ, м²)</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.land_allowed_usage }<br />{ roundingRules( data.land_space, NULL_BOUNDARY, DEFAULT_MANTISSA, IS_WHOLE ) }</td> ) }
				</tr>
				<tr>
					<td>38</td>
					<td>Высота потолков, м</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ roundingRules( data.ceiling_height, NULL_BOUNDARY, DEFAULT_MANTISSA, IS_WHOLE ) }</td> ) }
				</tr>
				<tr>
					<td>39</td>
					<td>Балкон/лоджия</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.room_subtype }</td> ) }
				</tr>
				<tr>
					<td>40</td>
					<td>Вид из окна</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.windows_view }</td> ) }
				</tr>
				<tr>
					<td>41</td>
					<td>Парковка</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.parking_type }</td> ) }
				</tr>
				<tr>
					<td>42</td>
					<td>Удобство подъезда автотранспорта с возможностью парковки</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.driveways_availability }</td> ) }
				</tr>
				<tr>
					<td>43</td>
					<td>Доля GLA в GBA, %</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ thousandSeparator( data.gla_share_in_gba, DEFAULT_MANTISSA ) }</td> ) }
				</tr>
				<tr>
					<td>44</td>
					<td>Электроснабжение</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.power_supply_type}</td> ) }
				</tr>
				<tr>
					<td>45</td>
					<td>Водоснабжение</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.water_supply_type }</td> ) }
				</tr>
				<tr>
					<td>46</td>
					<td>Водоотведение (канализация)</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.sewerage_type }</td> ) }
				</tr>
				<tr>
					<td>47</td>
					<td>Отопление</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.heating_type }</td> ) }
				</tr>
				<tr>
					<td>48</td>
					<td>Газоснабжение</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.gas_supply_type }</td> ) }
				</tr>
				<tr>
					<td>49</td>
					<td>Интернет</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.internet_connection_types }</td> ) }
				</tr>
				<tr>
					<td>50</td>
					<td>Локальные инженерные<br />системы</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.room_group_engineering }</td> ) }
				</tr>
				<tr>
					<td>51</td>
					<td>Система автоматизирован-ного управления коммуникациями</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.level_of_automation }</td> ) }
				</tr>
				<tr>
					<td>52</td>
					<td>Застройщик</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.developer }</td> ) }
				</tr>
				<tr>
					<td>53</td>
					<td>Агент (агентство недвижимости)</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.agency }</td> ) }
				</tr>
				<tr>
					<td>54</td>
					<td>Управляющий (УК)</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.building_management_organization }</td> ) }
				</tr>
				<tr>
					<td>55</td>
					<td>Качество<br />управления (УК)</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.building_quality_of_management }</td> ) }
				</tr>
				<tr>
					<td>56</td>
					<td>Источник (ссылка)</td>
					{ props.data.map( ( data ) => <td key={ data.id }><a href={ data.source } target="_blank">{ data.source }</a></td> ) }
				</tr>
				<tr>
					<td>57</td>
					<td>Текст оферты</td>
					{ props.data.map( ( data ) => <td key={ data.id }>{ data.description }</td> ) }
				</tr>
			</tbody>
		</table>
	);
}



function SearchResultDataAnalogs( props )
{
	return (
		<div className="b-searching-results__table">
			<div className="b-searching-results__table-wrapper">
				<div className="b-searching-results__table-vertical-wrapper">
					{ props.objectType === ASSET_GROUP && <AssetGroup key="resultAnalogsAssetGroup" { ...props } /> }
					{ props.objectType === LAND && <Land key="resultAnalogsLand" { ...props } /> }
					{ props.objectType === BUILDING && <Building key="resultAnalogsBuilding" { ...props } /> }
					{ props.objectType === ROOMS_GROUP && <RoomGroup key="resultAnalogsRoomGroup" { ...props } /> }

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



export default connect( mapStateToProps, mapDispatchToProps )( SearchResultDataAnalogs );