// @flow
import * as React from "react";

import Form from "react-jsonschema-form";

import { connect } from "react-redux";

import ModuleLoadingWaiter from "lk/components/ModuleLoadingWaiter.jsx";

import { ALL_OBJECTS, LAND, BUILDING, LETTER, ROOMS_GROUP, ROOM, INDUSTRIAL_ZONE, ASSET_GROUP } from "lk/constants.js";

//import { getRandomLowerString } from "../../util/randomString.js";
import { getEntity } from "lk/components/entityUtils/getEntity.js"

import { Toggle } from "lk/components/Toggle/Toggle.jsx";
import { prepareSchema } from "./schemaPrepare.js";
import { isEmptyObject } from "../../util/isEmptyObject.js";
import { CustomFieldTemplate } from "./components/CustomFieldTemplate.js";
import { transformErrors } from "./components/transformErrors.js";



type Props =
{
	id: number,
	type: number,
	region: string,

	saveItem: ( {} ) => void
};


type State =
{
	isShortForm: boolean,

	schema: {},
	definitions: {},
	uiSchema: {},
	neededEnums: Array<String>,

	fields: {},
	widgets: {},

	formValues: {}
}



class EditFormBRO extends React.Component <Props, State>
{
	constructor( props: Props )
	{
		super( props );

		this.state =
		{
			isShortForm: false,

			schema: {},
			definitions: {},
			uiSchema: {},
			neededEnums: [],

			fields: {},
			widgets: {},

			formValues: {}
		};
	}


	componentDidMount()
	{
		// Если нам передан id, то пытаемся получить значения по нему
		if( this.props.id > 0 )
			this.getValues( this.props.id );

		this.getForm();
	}


	shouldComponentUpdate( nextProps, nextState )
	{
		return !isEmptyObject( nextState.schema ); // && ( this.props.id >== 0 && !isEmptyObject( nextState.formValues ) );
	}


	getForm = async () =>
	{
		// Готовим схему и визуальную схему
		// Отправляем запрос на получение содержимое недостающих селектов
		// Пока идут селекты, находим в uiSchema все $uri и вставляем данные из нужных дефиниций
		// Удаляем раздел definitions в uiSchema
		// Когда пришли недостающие селекты, пробегаемся по объекту в поисках objectType и заменяем его на enum с данными


		// Пробегаемся по схеме, ищем все uiSchema и сохраняем их в отдельный ассоциативный массив,
		//  где ключ - полный путь к uiSchema, а значение - сам объект uiSchema
		// При проходе основной схемы каждый новый путь проверяется на наличие uiSchema и если она есть,
		//  то заполняем соответствующий объект
		try
		{
			const params =
			{
				method: "GET",
				credentials: "include"
			};

			// Качаем дефиниции
			//let response = await fetch( "/js/entities/RealObjectsDefinitions" + ( this.state.isShortForm ? "Short" : "" ) + ".json?random=" + getRandomLowerString( 10 ), params );
			let response = await fetch( "/js/entities/RealObjectsDefinitions" + ( this.state.isShortForm ? "Short" : "" ) + ".json", params );
			const definitions = await response.json();

			// Качаем схему
			const schemaName = EditFormBRO.getSchemaName( this.props.type, this.state.isShortForm );

			//response = await fetch( "/js/entities/" + schemaName + ".json?random=" + getRandomLowerString( 10 ), params );
			response = await fetch( "/js/entities/" + schemaName + ".json", params );
			const schemaWithouDefinitions = await response.json();

			const schemaWithDefinitions =
			{
				schema: schemaWithouDefinitions,
				definitions: definitions
			};

			this.setState( prepareSchema( schemaWithDefinitions ) );
		}
		catch( error )
		{
			alert( "Ошибка загрузки схемы" );
		}
	};



	static getSchemaName( type: number, isShortForm: boolean ): string
	{
		let schemaName;

		switch( type )
		{
			case INDUSTRIAL_ZONE:
				schemaName = "IndustrialZone";
				break;

			case ASSET_GROUP:
				schemaName = "AssetGroup";
				break;

			case LAND:
				schemaName = "Land";
				break;

			case BUILDING:
				schemaName = "Building";
				break;

			case LETTER:
				schemaName = "Letter";
				break;

			case ROOMS_GROUP:
				schemaName = "RoomGroup";
				break;

			case ROOM:
				schemaName = "Room";
				break;

			default:
				throw new Error( "Received unknown object type" );
		}

		if( isShortForm )
			schemaName = schemaName + "Short";

		return schemaName;
	}


	getValues = ( id ) => getEntity(
		"RealObjects",
		id,
		( json ) => this.setState( { formValues: json } ),
		( error ) => console.log( "Невозможно загрузить значения сущности: " + error ) );



	onFormFieldChange = ( data ) =>
	{
		let formValues;

		// Если у нас изменился населенный пункт, то надо удалить все блоки "Местоположение" и подгрузить улицы для нового НП
		if( this.state.formValues.settlement === data.formData.settlement )
			formValues = data.formData;
		else
		{
			formValues =
			{
				...data.formData,
				location: undefined,
				administrative_district: undefined,
				microdistrict: undefined,
				historical_area: undefined,
				metropolitan_borough: undefined,
				nearestInfrastructure: undefined,
				land_attributes:
				{
					...data.formData.land_attributes,
					urban_area: undefined,
					price_zone: undefined
				}
			};
		}


		this.setState( { formValues: formValues } );
	}


	toggleForm = () => this.setState( { isShortForm: !this.state.isShortForm }, this.getForm );


	render()
	{
		const context =
		{
			objectId: this.state.formValues.id,
			settlement: this.state.formValues.settlement,
			region: this.props.region
		};


		return(
			<article className="b-section__form form-reg__yes">
				<section className="b-section__article-container">
					<div className="b-section__title-form">
						Реальный объект
						<Toggle value={ !this.state.isShortForm } onChange={ this.toggleForm } onLabel="Расширенная форма" offLabel="Сокращенная форма" />
					</div>
					{
						isEmptyObject( this.state.schema ) || ( this.props.id > 0 && isEmptyObject( this.state.formValues ) )
						 	? <ModuleLoadingWaiter />
							: <Form schema={ this.state.schema }
								uiSchema={ this.state.uiSchema }
								FieldTemplate={ CustomFieldTemplate }
								transformErrors={ transformErrors }
								formData={ this.state.formValues }
								fields={ this.state.fields }
								widgets={ this.state.widgets }
								showErrorList={ true }
								onChange={ this.onFormFieldChange }
								safeRenderCompletion={ true }
								formContext={ context }
								onSubmit={ ( data ) => this.props.saveItem( data[ "formData" ] ) } />
					}
				</section>
			</article>
		);
	}
}




const mapStateToProps = ( store ) => (
	{
		region: store.lk.region
	} );


export default connect( mapStateToProps )( EditFormBRO );