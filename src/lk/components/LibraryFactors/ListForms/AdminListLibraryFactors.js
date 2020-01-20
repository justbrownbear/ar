
import React from "react";

import { connect } from "react-redux";

import AdminListBase from "lk/components/Admin/ListForms/AdminListBase.js";

import { ALL_OBJECTS, LAND, BUILDING, LETTER, ROOMS_GROUP, ROOM, INDUSTRIAL_ZONE, ASSET_GROUP } from "lk/constants.js";

import { OPERATION_LIST_ENTITIES } from "lk/operations";

import { getLKQuery } from "lk/redux/actions";

import { ListSelectLine } from "../../ListSelect/ListSelectLine.js";

import SelectComponent from "lk/components/Select/Select.jsx";

import { ObjectTypeSelectWithLoadingByFirstLetters } from "lk/components/Select/ObjectTypeSelectWithLoadingByFirstLetters.jsx";

import { CharacteristicsOfTheModelObject } from "./ViewLibraryFactors/CharacteristicsOfTheModelObject.jsx";

import { Questionnaires } from "./ViewLibraryFactors/Questionnaires.jsx";

import { CharacteristicsReport } from "./ViewLibraryFactors/CharacteristicsReport.jsx";

import { ExpertOpinions } from "./ViewLibraryFactors/ExpertOpinions.jsx";

import { Editions } from "./ViewLibraryFactors/Editions.jsx";

import moment from "moment";

import DateRangePicker from "./DateRangePicker.jsx";

import "./ViewLibraryFactors/css/styles__library-pricing-factors.css";


const convertMomentDateToDDMMYYY = ( momentDate: string ): string => momentDate === null ? "" : moment( momentDate ).format( "DD.MM.YYYY" );


const format = ( date: moment ): string => date ? date.format( "DD.MM.YYYY" ) : "";

const isValidRange = ( dateRange: Array<string> ): boolean => dateRange && dateRange[ 0 ] && dateRange[ 1 ];

class AdminListLibraryFactors extends AdminListBase
{
	constructor( props )
	{
		super( props );



		this.state =
		{
			entity: "Factors",
			items: [],
			id: "",
			settlement:	"",
			segment: this.props.segment,
			edition: 0,
			factor: this.props.factor,
			privatePerson: 0,
			factors_group: this.props.factorsGroup,
			start_interval: null,
		    finish_interval: null,
			totalItems:			0,
			factorsItems: [],
			factorsTotalItems: 0,
			factorsLoad: false,
			limit:		25,
			offset:		0,
			isQuestionnaires: true,
			isCharacteristicsReport: true
		};
	}


	getItemsList = () =>
	{
		var payload =
		{
			operation: OPERATION_LIST_ENTITIES,
			entity: this.state.entity,
			data:
			{
				id: this.state.id,
				segment: this.state.segment,
				edition: this.state.edition,
				factor: this.state.factor,
				factors_group: this.state.factors_group,
				limit: this.state.limit,
				offset: this.state.offset
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


	getFactorsList = () =>
	{
		var payload =
		{
			operation: OPERATION_LIST_ENTITIES,
			entity: "GroupingFactors",
			data:
			{
				id: this.state.id,
				segment: this.state.segment,
				edition: this.state.edition,
				factor: this.state.factor,
				limit: this.state.limit,
				offset: this.state.offset
			}
		};


		getLKQuery(
			payload,
			json => this.setState(
				{
					factorsTotalItems: json.totalItems,
					factorsItems: json.items,
					factorsLoad: true
				} ),
			error => console.log( error )
		);
	};


	onIdChange =				( event )	=> this.setState( { id: Number( event.target.value ) || null, offset: 0 } );
	onSettlementChange =	( value )	=> this.setState( { settlement: value.id, offset: 0 } );
	onSegmentChange =		( value )	=> this.setState( { segment: value, offset: 0 } );
	onFactorsGroupChange =		( value )	=> this.setState( { factors_group: value, offset: 0 },	() => this.getItemsList() );
	onPrivatePersonChange =		( value )	=> this.setState( { privatePerson: value, offset: 0 } );
	onEditionChange =		( value )	=> {
		if( value > 0 )
			this.setState( { edition: value, factor: 0, offset: 0 },	() => this.getItemsList() );
	}
	onFactorChange =		( value )	=> this.setState( { factor: value, offset: 0 } );
	OnChangePicker = ( date: Array<string> ) => this.setState( { start_interval:  format( date[ 0 ] ), finish_interval:  format( date[ 1 ] ) } );

	getURL =					()			=> "/admin/objects/real_objects";

	setCurrentFactor = ( factor: number ) => this.setState( { factor: factor }, () => this.getFactorsList() );
	toggleQuestionnaires = () => this.setState( { isQuestionnaires: this.state.isQuestionnaires ? false : true } );
	toggleCharacteristicsReport = () => this.setState( { isCharacteristicsReport: this.state.isCharacteristicsReport ? false : true } );

	render = () =>
	{

		const region =
		{
			region: this.props.region
		};

		const editionsFilters =
		{
			settlement: this.state.settlement,
			segment: this.state.segment,
			private_person: this.state.privatePerson,
			start_interval: this.state.start_interval,
			finish_interval: this.state.finish_interval,
		};

		const factorsList = this.state.items;
		const groupingFactorsList = this.state.factorsItems;
		const groupingFactorsLoad = this.state.factorsLoad;

		return (
			<article className="b-section__form">
				<section className="b-section__article-container">
					<div className="library-pricing-factors__breadcrumb">
						<div><a href="http://www.areall.ru/">Главная</a></div> &gt; <div><a href="http://www.areall.ru/lk">Личный кабинет</a></div> &gt; <div>Библиотека факторов</div>
					</div>
					<DateRangePicker startDateFieldName={ this.state.start_interval } endDateFieldName={ this.state.finish_interval } OnChange = { this.OnChangePicker } />
					<div className="grid-row">
						<div className="grid-cols-12">
							<div className="text-margin-t8x text-margin-b8x">
								Группа факторов:<SelectComponent entity="FactorsGroups" onChange={ this.onFactorsGroupChange } value={ this.state.factors_group }/>
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
								Сборник:<SelectComponent entity="Editions" onChange={ this.onEditionChange } additionalProperties = { editionsFilters }  value={ this.state.edition }/>
							</div>
						</div>

						<div className="grid-cols-12"><span className="library-pricing-factors__title-hot-editions">Горячие сборники</span>
							<div className="grid-row">
								<div className="grid-cols-12">
									<a href="/custom/analytical_materials/38EhLS00aOSwx2jK.pdf" target="_blank"><img alt="Cборник Земля" src="/custom/grouping_factors/photo/edition_land.jpg"/></a>
								</div>
								<div className="grid-cols-12">
									<a href="/custom/analytical_materials/rftSyV6MQMy6RwBs.pdf" target="_blank"><img alt="Cборник Торгово-офисная недвижимость" src="/custom/grouping_factors/photo/edition_retail_office.jpg"/></a>
								</div>
							</div>
						</div>
					</div>


					<div className="text-margin-t8x text-margin-b8x">
						{
							factorsList ?
							<ListSelectLine
							   value={ this.state.factor }
							   onChange={ this.setCurrentFactor }
							   options={ factorsList }
							   ulAdditionalClass="library-pricing-factors__container-list library-pricing-factors__list library-pricing-factors__xxsmall-container-list"
							   isCollapsible={ false } /> : <span />
						}
					</div>
					<div>
						{
							this.state.isQuestionnaires && groupingFactorsList && groupingFactorsList.length > 0  ?
							<Questionnaires id={ groupingFactorsList[0].id } entity="GroupingFactors" toggleQuestionnaires = { this.toggleQuestionnaires } />  :
									( groupingFactorsLoad ? <div>Нет фактора в сборниках</div> : <span /> )
						}
					</div>
					<div>
						{
							this.state.isCharacteristicsReport && groupingFactorsList && groupingFactorsList.length > 0  ?
							groupingFactorsList.map( ( items ) => <CharacteristicsReport key={ items.id } entity="GroupingFactors" { ...items } toggleCharacteristicsReport={ this.toggleCharacteristicsReport } /> ) : <span />
						}
					</div>
				</section>
			</article>
		);
	}


}

const mapStateToProps = ( store ) => (
	{
		region: store.lk.region
	} );


export default connect( mapStateToProps, null, null, { pure: true } )( AdminListLibraryFactors );
