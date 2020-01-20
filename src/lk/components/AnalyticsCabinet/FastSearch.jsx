import React from "react";
import { connect } from "react-redux";
import { getFastSearch } from "./redux/actions.js";
import { getHash } from "../util/getHash.js";

import "./css/hot_search.css";




const fastSearchOptions =
[
	{
		className: "hot-search__image-new-building",
		elements:
		[
			{
				title: "Каталог новостроек",
				selected: true,
				searchConditions:
				{
					searchType:75,
					completion_of_construction: [1,3],
					operationType:[-1],
					view_type:5
				}
			},
			{
				title: "Строящиеся дома",
				searchConditions:
				{
					searchType:75,
					completion_of_construction: [3],
					operationType:[-1],
					view_type:5
				}
			},
			{
				title: "Новостройки",
				searchConditions:
				{
					searchType:75,
					completion_of_construction: [1],
					operationType:[-1],
					view_type:5
				}
			},
			{
				title: "Жилые комплексы новые",
				searchConditions:
				{
					searchType:59,
					asset_group_kind:[1],
					completion_of_construction: [1,3],
					operationType:[-1],
					view_type:5
				}
			},
			{
				title: "Долгострои",
				selected: true,
				searchConditions:
				{
					searchType:9,
					completion_of_construction: [4],
					operationType:[-1],
					view_type:5
				}
			}
		]
	},
	{
		className: "hot-search__image-mstorey-residential-buildings",
		elements:
		[
			{
				title: "Многоквартирные дома",
				selected: true,
				searchConditions:
				{
					searchType:9,
					operationType:[-1],
					view_type:5
				}
			},
			{
				title: "Элита",
				searchConditions:
				{
					searchType:9,
					building_class:[1],
					operationType:[-1],
					view_type:5
				}
			},
			{
				title: "Бизнес класс",
				searchConditions:
				{
					searchType:9,
					building_class:[2],
					operationType:[-1],
					view_type:5
				}
			},
			{
				title: "Жилые комплексы",
				searchConditions:
				{
					searchType:59,
					asset_group_kind:[1],
					operationType:[-1],
					view_type:5
				}
			},
			{
				title: "Аварийные дома",
				selected: true,
				searchConditions:
				{
					searchType:9,
					completion_of_construction: [5],
					operationType:[-1],
					view_type:5
				}
			}
		]
	},
	{
		className: "hot-search__image-building",
		elements:
		[
			{
				title: "Жилые дома",
				selected: true,
				searchConditions:
				{
					searchType:57,
					operationType:[1],
					interval:4,
					building_kind:[2],
					view_type:5
				}
			},
			{
				title: "Коттеджи",
				searchConditions:
				{
					searchType:11,
					operationType:[1],
					interval:4,
					view_type:5
				}
			},
			{
				title: "Таунхаусы",
				searchConditions:
				{
					searchType:12,
					operationType:[1],
					interval:4,
					view_type:5
				}
			},
			{
				title: "Дачи",
				searchConditions:
				{
					searchType:13,
					operationType:[1],
					interval:4,
					view_type:5
				}
			},
			{
				title: "Участки",
				searchConditions:
				{
					searchType:37,
					operationType:[1],
					interval:4,
					view_type:5
				}
			},
			{
				title: "Коттеджные поселки",
				searchConditions:
				{
					searchType:59,
					operationType:[1],
					interval:4,
					asset_group_kind:[2],
					asset_group_type:[2],
					view_type:5
				}
			},
			{
				title: "Недострои",
				selected: true,
				searchConditions:
				{
					searchType:37,
					operationType:[1],
					interval:4,
					land_improvement:[6,9,15,21,22,23,24,28,29,30],
					view_type:5
				}
			}
		]
	},
	{
		className: "hot-search__image-land",
		elements:
		[
			{
				title: "Земля",
				selected: true,
				searchConditions:
				{
					searchType:36,
					operationType:[1],
					interval:4,
					view_type:5
				}
			},
			{
				title: "Торгово-офисная",
				searchConditions:
				{
					searchType:39,
					operationType:[1],
					interval:4,
					view_type:5
				}
			},
			{
				title: "Производственная",
				searchConditions:
				{
					searchType:40,
					operationType:[1],
					interval:4,
					view_type:5
				}
			},
			{
				title: "Сельхоз угодья",
				searchConditions:
				{
					searchType:41,
					operationType:[1],
					interval:4,
					view_type:5
				}
			},
			{
				title: "База 2014 г.",
				selected: true,
				searchConditions:
				{
					searchType:36,
					operationType:[1],
					economic_operations_date_from: "01.01.2013",
					economic_operations_date_to: "31.12.2013",
					view_type:5
				}
			}
		]
	},
	{
		className: "hot-search__image-building5000",
		elements:
		[
			{
				title: "Каталог бизнес-центров",
				selected: true,
				searchConditions:
				{
					searchType:57,
					building_kind:[8],
					building_type:[22],
					operationType:[-1],
					view_type:5
				}
			},
			{
				title: "Офисы",
				searchConditions:
				{
					searchType:27,
					operationType:[1],
					interval:4,
					view_type:5
				}
			},
			{
				title: "Торговое",
				searchConditions:
				{
					searchType:57,
					building_kind:[5],
					operationType:[1],
					interval:4,
					view_type:5
				}
			},
			{
				title: "Street-retail",
				searchConditions:
				{
					searchType:21,
					operationType:[1],
					interval:4,
					view_type:5
				}
			},
			{
				title: "База 2018 г.",
				selected: true,
				searchConditions:
				{
					searchType:61,
					operationType:[1],
					economic_operations_date_from: "01.01.2017",
					economic_operations_date_to: "31.12.2018",
					view_type:5
				}
			},
			{
				title: "Объекты более 5000 кв.м",
				selected: true,
				searchConditions:
				{
					searchType:62,
					operationType:[-1],
					view_type:5
				}
			}
		]
	},
	{
		className: "hot-search__image-property-complex",
		elements:
		[
			{
				title: "Индустриальные комплексы",
				selected: true,
				searchConditions:
				{
					searchType:63,
					operationType:[-1],
					view_type:5
				}
			},
			{
				title: "Склады",
				searchConditions:
				{
					searchType:33,
					operationType:[-1],
					view_type:5
				}
			},
			{
				title: "Технопарки",
				searchConditions:
				{
					searchType:65,
					operationType:[-1],
					view_type:5
				}
			},
			{
				title: "Промзоны",
				searchConditions:
				{
					searchType:66,
					operationType:[-1],
					view_type:5
				}
			}
		]
	},
	{
		className: "hot-search__image-period",
		elements:
		[
		]
	},
	{
		className: "hot-search__image-office",
		elements:
		[
			{
				title: "Аренда квартир",
				searchConditions:
				{
					searchType:1,
					operationType:[2],
					interval:3,
					view_type:5
				}
			},
			{
				title: "Аренда офисов",
				searchConditions:
				{
					searchType:27,
					operationType:[2],
					interval:4,
					view_type:5
				}
			},
			{
				title: "Аренда торговых",
				searchConditions:
				{
					searchType:19,
					operationType:[2],
					interval:4,
					view_type:5
				}
			},
			{
				title: "Аренда ТЦ",
				searchConditions:
				{
					searchType:23,
					operationType:[2],
					interval:4,
					view_type:5
				}
			},
			{
				title: "Аренда складов",
				searchConditions:
				{
					searchType:33,
					operationType:[2],
					interval:4,
					view_type:5
				}
			},
			{
				title: "Аренда хостелов",
				searchConditions:
				{
					searchType:73,
					operationType:[2],
					interval:4,
					view_type:5
				}
			},
			{
				title: "Аренда гостиниц",
				searchConditions:
				{
					searchType:56,
					operationType:[2],
					interval:4,
					view_type:5
				}
			}
		]
	},
	{
		className: "hot-search__image-ready-business",
		elements:
		[
			{
				title: "Готовый бизнес",
				selected: true,
				searchConditions:
				{
					searchType:48,
					operationType:[1],
					interval:5,
					view_type:5
				}
			},
			{
				title: "Общепит",
				searchConditions:
				{
					searchType:49,
					operationType:[1],
					interval:5,
					view_type:5
				}
			},
			{
				title: "Обслуживание",
				searchConditions:
				{
					searchType:74,
					operationType:[1],
					interval:5,
					view_type:5
				}
			},
			{
				title: "Производство",
				searchConditions:
				{
					searchType:52,
					operationType:[1],
					interval:5,
					view_type:5
				}
			},
			{
				title: "Автосервис",
				searchConditions:
				{
					searchType:53,
					operationType:[1],
					interval:5,
					view_type:5
				}
			},
			{
				title: "АЗС",
				searchConditions:
				{
					searchType:54,
					operationType:[1],
					interval:5,
					view_type:5
				}
			}
		]
	}
];


function List( props )
{
	const className = "grid-cols-8 hot-search__wrapper " + props.className;

	return (
		<ul className={ className }>
			{
				props.elements.map( ( element ) => <Element key={ element.title } setFormValues={ props.setFormValues } { ...element } /> )
			}
		</ul>
	);
}


const ElementConnected = ( props ) => <li className={ props.selected && "hot-search__text-title" } onClick={ () => props.getFastSearch( props.searchConditions ) }>{ props.title }</li>;


const mapDispatchToProps = ( dispatch, ownProps ) => (
	{
		getFastSearch: ( searchConditions ) =>
		{
			ownProps.setFormValues( searchConditions );
			dispatch( getFastSearch( searchConditions ) );
		}
	} );


const Element = connect( null, mapDispatchToProps )( ElementConnected );



export default class FastSearch extends React.Component
{
	// Never update this component
	shouldComponentUpdate( nextProps, nextState )
	{
		return false;
	}


	render()
	{
		return (
			<div className="grid-row hot-search__grid-row-margin">
				{
					fastSearchOptions.map( ( list ) => <List key={ getHash( list ) } setFormValues={ this.props.setFormValues } { ...list } /> )
				}
			</div>
		);
	}
}