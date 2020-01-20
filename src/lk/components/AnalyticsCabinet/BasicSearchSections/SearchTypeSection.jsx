
import React from "react";
import { connect } from "react-redux";

import isEqual from "lodash/isEqual";

import { setSearchType } from "../redux/actions.js";


const searchTypes =
[
	{
		title: "Квартира",
		items:
		[
			{
				id: 1,
				title: "Квартира",
				showRoomsCheckboxes: true,
				type: 4
			},
			{
				id: 2,
				title: "Студия",
				showRoomsCheckboxes: true,
				type: 4
			},
			{
				id: 3,
				title: "Комната",
				showRoomsCheckboxes: false,
				type: 4
			},
			{
				id: 4,
				title: "Апартаменты",
				showRoomsCheckboxes: true,
				type: 4
			},
			{
				id: 5,
				title: "Премиум",
				showRoomsCheckboxes: true,
				type: 4
			},
			{
				id: 6,
				title: "Доля",
				showRoomsCheckboxes: true,
				type: 4
			}
		]
	},

	{
		title: "Новостройка",
		items:
		[
			{
				id: 7,
				title: "Новостройка",
				showRoomsCheckboxes: true,
				type: 4
			}
		]
	},

	{
		title: "Дом",
		items:
		[
			{
				id: 8,
				title: "Дом",
				showRoomsCheckboxes: false,
				type: 2
			},
			{
				id: 9,
				title: "МЖД",
				showRoomsCheckboxes: false,
				type: 2
			},
			{
				id: 10,
				title: "Частный дом",
				showRoomsCheckboxes: false,
				type: 2
			},
			{
				id: 11,
				title: "Коттедж",
				showRoomsCheckboxes: false,
				type: 2
			},
			{
				id: 12,
				title: "Таунхаус",
				showRoomsCheckboxes: false,
				type: 2
			},
			{
				id: 13,
				title: "Дача",
				showRoomsCheckboxes: false,
				type: 2
			}
		]
	},

	{
		title: "Гараж",
		items:
		[
			{
				id: 14,
				title: "Гараж",
				showRoomsCheckboxes: false,
				type: 4
			},
			{
				id: 15,
				title: "Металический",
				altTitle:"Металлический гараж",
				showRoomsCheckboxes: false,
				type: 4
			},
			{
				id: 16,
				title: "Бокс",
				showRoomsCheckboxes: false,
				type: 4
			},
			{
				id: 17,
				title: "Машиноместо",
				showRoomsCheckboxes: false,
				type: 4
			},
			{
				id: 18,
				title: "Ячейка",
				showRoomsCheckboxes: false,
				type: 4
			}

		]
	},

	{
		title: "Торговое",
		items:
		[
			{
				id: 19,
				title: "Торговое",
				showRoomsCheckboxes: true,
				type: 4
			},
			{
				id: 20,
				title: "Магазин",
				showRoomsCheckboxes: true,
				type: 4
			},
			{
				id: 21,
				title: "Street-retail",
				showRoomsCheckboxes: true,
				type: 4
			},
			{
				id: 22,
				title: "Торговое помещение",
				showRoomsCheckboxes: true,
				type: 4
			},
			{
				id: 23,
				title: "Торговый центр",
				showRoomsCheckboxes: false,
				type: 2
			},
			{
				id: 24,
				title: "Рынок",
				showRoomsCheckboxes: true,
				type: 4
			},
			{
				id: 25,
				title: "Общепит",
				showRoomsCheckboxes: true,
				type: 4
			}
		]
	},

	{
		title: "Офис",
		items:
		[
			{
				id: 26,
				title: "Офис",
				showRoomsCheckboxes: true,
				type: 4
			},
			{
				id: 27,
				title: "Офисное помещение",
				showRoomsCheckboxes: true,
				type: 4
			},
			{
				id: 28,
				title: "Админ. здание",
				showRoomsCheckboxes: false,
				type: 2
			},
			{
				id: 29,
				title: "Бизнес центр",
				showRoomsCheckboxes: false,
				type: 2
			},
			{
				id: 30,
				title: "Конференц зал",
				showRoomsCheckboxes: true,
				type: 4
			},
			{
				id: 31,
				title: "Коворкинг",
				showRoomsCheckboxes: true,
				type: 4
			}
		]
	},

	{
		title: "Промышленное",
		items:
		[
			{
				id: 32,
				title: "Промышленное",
				showRoomsCheckboxes: false,
				type: 2
			},
			{
				id: 33,
				title: "Склад",
				showRoomsCheckboxes: false,
				type: 2
			},
			{
				id: 34,
				title: "Производство",
				showRoomsCheckboxes: false,
				type: 2
			},
			{
				id: 35,
				title: "Открытая площадка",
				showRoomsCheckboxes: false,
				type: 2
			}
		]
	},

	{
		title: "Земля",
		items:
		[
			{
				id: 36,
				title: "Земля",
				showRoomsCheckboxes: false,
				type: 1
			},
			{
				id: 37,
				title: "ИЖС",
				showRoomsCheckboxes: false,
				type: 1
			},
			{
				id: 38,
				title: "МЖД",
				altTitle:"Земля МЖД",
				showRoomsCheckboxes: false,
				type: 1
			},
			{
				id: 39,
				title: "Торгово-офисное",
				showRoomsCheckboxes: false,
				type: 1
			},
			{
				id: 40,
				title: "Производственное",
				showRoomsCheckboxes: false,
				type: 1
			},
			{
				id: 41,
				title: "С-Х",
				showRoomsCheckboxes: false,
				type: 1
			}
		]
	},
	{
		title: "ИК",
		items:
		[
			{
				id: 42,
				title: "ИК",
				showRoomsCheckboxes: false,
				type: 7
			},
			{
				id: 43,
				title: "Торговый",
				showRoomsCheckboxes: false,
				type: 7
			},
			{
				id: 44,
				title: "Производственный",
				showRoomsCheckboxes: false,
				type: 7
			},
			{
				id: 45,
				title: "АЗС/АГЗС",
				showRoomsCheckboxes: false,
				type: 7
			},
			{
				id: 46,
				title: "Рекреационный",
				showRoomsCheckboxes: false,
				type: 7
			},
			{
				id: 47,
				title: "Сельскохозяйственный",
				showRoomsCheckboxes: false,
				type: 7
			}
		]
	},
	{
		title: "Готовый бизнес",
		items:
		[
			{
				id: 48,
				title: "Готовый бизнес",
				showRoomsCheckboxes: true,
				type: 4
			},
			{
				id: 49,
				title: "Общепит",
				showRoomsCheckboxes: true,
				type: 4
			},
			{
				id: 50,
				title: "Досуг",
				showRoomsCheckboxes: true,
				type: 4
			},
			{
				id: 51,
				title: "Бытовые услуги",
				showRoomsCheckboxes: true,
				type: 4
			},
			{
				id: 52,
				title: "Производство",
				showRoomsCheckboxes: false,
				type: 2
			},
			{
				id: 53,
				title: "Автосервис",
				showRoomsCheckboxes: false,
				type: 2
			},
			{
				id: 54,
				title: "АЗС",
				showRoomsCheckboxes: false,
				type: 2
			},
			{
				id: 55,
				title: "Гостиница",
				showRoomsCheckboxes: false,
				type: 2
			},
			{
				id: 56,
				title: "Медицина",
				showRoomsCheckboxes: false,
				type: 2
			}
		]
	},
	{
		title: "Все виды",
		items:
		[
			{
				id: 57,
				title: "Здание",
				showRoomsCheckboxes: false,
				type: 2
			},
			{
				id: 58,
				title: "Помещение",
				showRoomsCheckboxes: true,
				type: 4
			},
			{
				id: 59,
				title: "Имущественный комплекс",
				showRoomsCheckboxes: false,
				type: 7
			},
			{
				id: 60,
				title: "Земля",
				showRoomsCheckboxes: false,
				type: 1
			}
		]
	},
	{
	title: "Горячий поиск",
	items:
	[
	  {
		id: 61,
		title: "База 2018 г.",
		showRoomsCheckboxes: false,
		showInSection: false,
		type: 2
	  },
	  {
		id: 62,
		title: "Объекты более 5000 кв.м",
		showRoomsCheckboxes: true,
		showInSection: false,
		type: 2
	  },
	  {
		id: 63,
		title: "Индустриальные комплексы",
		showRoomsCheckboxes: false,
		showInSection: false,
		type: 7
	  },
	  {
		id: 65,
		title: "Технопарки",
		showRoomsCheckboxes: false,
		showInSection: false,
		type: 7
	  },
	  {
		id: 66,
		title: "Промзоны",
		showRoomsCheckboxes: false,
		showInSection: false,
		type: 6
	  },
	  {
		id: 73,
		title: "Хостелы",
		showRoomsCheckboxes: false,
		showInSection: false,
		type: 2
	  },
	  {
		id: 74,
		title: "Обслуживание",
		showRoomsCheckboxes: false,
		showInSection: false,
		type: 2
	  },
	  {
		id: 75,
		title: "Новостройки ОКС",
		showRoomsCheckboxes: false,
		showInSection: false,
		type: 2
	  }
	]
	}
];



function SearchType( props )
{
	return (
		<li onClick={ () => props.onChange( props ) } >
			<div className="list-item">
				<div className="list-title">
					<span>{ props.title }</span>
					<p>вид объекта</p>
				</div>
				<div className="list-item-icon">
					<span className="a-icon a-icon-medium"></span>
				</div>
			</div>
		</li>
	);
}





function SearchTypeGroup( props )
{
	return (
		<li>
			<div className="list-item">
				<div className="list-title">
					<span>{ props.title }</span>
					<p>вид объекта</p>
				</div>
				<div className="list-item-icon">
					<span className="a-icon a-icon-medium"></span>
					<span className="a-icon-x a-icon-size-x icon-arrow-down-black rotate90ccw"></span>
				</div>
			</div>
			{ props.items &&
				<ul className="level-3">
					{ props.items.map( ( item ) => <SearchType key={ item.id } onChange={ props.onChange } { ...item } /> ) }
				</ul>
			}
		</li>
	);
}



function NumberOfRooms()
{
	return (
		<div className="b-search-section__sub_list-items js__number_of_rooms">
			<div className="button-checkbox button-1">
				<input type="checkbox" id="checkBox01" />
				<label></label>
			</div>
			<div className="button-checkbox button-2">
				<input type="checkbox" id="checkBox02" />
				<label></label>
			</div>
			<div className="button-checkbox button-3">
				<input type="checkbox" id="checkBox03" />
				<label></label>
			</div>
		</div>
	);
}



class SearchTypeSection extends React.Component
{
	constructor( props )
	{
		super( props );

		this.state = this.getSearchTypeById( props.field.value );
	}


	shouldComponentUpdate( nextProps, nextState )
	{
		return nextProps.field.value && !isEqual( this.state.id, nextProps.field.value );
	}


	componentWillReceiveProps( nextProps )
	{
		if( nextProps.field.value )
			this.setState( this.getSearchTypeById( nextProps.field.value ) );
	}


	getSearchTypeById = ( id ) =>
	{
		let element;

		for( let i = 0; i < searchTypes.length; i++ )
		{
			element = searchTypes[ i ].items.find( ( item ) => item.id === id );

			if( element )
				break;
		}

		return element;
	}


	onChange = ( props ) =>
	{
		this.setState( props );

		this.props.form.setFieldValue( this.props.field.name, props.id );
		this.props.setSearchType( props.type );
	}


	render()
	{
		return (
			<div className="section-item type-property r-angle active js__object_type_section">
				<div className="inner-container">

					{ this.state.showRoomsCheckboxes && <NumberOfRooms /> }

					<div className="b-search-section__dropdowns">
						<ul className="level-1">
							<li>
								<div className="output-item js__active_object_type">
									<div className="list-item">
										<div className="list-title sub-title">
											<span>{ this.state.title }</span>
											<p>вид объекта</p>
										</div>
										<div className="list-item-icon">
											<span className="a-icon a-icon-medium icon-building"></span>
											<span className="a-icon-x a-icon-size-x icon-arrow-down"></span>
										</div>
									</div>
								</div>
								<ul className="level-2">
									{ searchTypes.map( ( item ) => <SearchTypeGroup key={ item.title } onChange={ this.onChange } { ...item } /> ) }
								</ul>
							</li>
						</ul>
					</div>
				</div>
				<div className="l-angle"></div>
			</div>
		);
	}
}



const mapDispatchToProps = ( dispatch ) => (
	{
		setSearchType: ( objectType ) => dispatch( setSearchType( objectType ) )
	} );


export default connect( null, mapDispatchToProps )( SearchTypeSection );