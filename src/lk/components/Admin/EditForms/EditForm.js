// @flow
import * as React from "react";

import Form from "react-jsonschema-form";

import { connect } from "react-redux";

import ModuleLoadingWaiter from "lk/components/ModuleLoadingWaiter.jsx";

import { getEntity } from "lk/components/entityUtils/getEntity.js"

//import { getRandomLowerString } from "../../util/randomString.js";
import { prepareSchema } from "./schemaPrepare.js";
import { CustomFieldTemplate } from "./components/CustomFieldTemplate.js";
import { isEmptyObject } from "../../util/isEmptyObject.js";
import { transformErrors } from "./components/transformErrors.js";



type Props =
{
	id: number,
	entity: string,

	saveItem: ( {} ) => void
};


type State =
{
	schema: {},
	definitions: {},
	uiSchema: {},
	neededEnums: Array<String>,

	fields: {},
	widgets: {},

	formValues: {}
}



class EditForm extends React.Component <Props, State>
{
	constructor( props )
	{
		super( props );

		this.state =
		{
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
			this.getValues();

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


			//const response = await fetch( "/js/entities/" + this.props.entity + ".json?random=" + getRandomLowerString( 10 ), params );
			const response = await fetch( "/js/entities/" + this.props.entity + ".json", params );
			const json = await response.json();

			let schema =
			{
				definitions: json.definitions || {}
			};

			delete json.definitions;

			schema =
			{
				...schema,
				schema: json
			};

			this.setState( prepareSchema( schema ) );
		}
		catch( error )
		{
			alert( "Ошибка загрузки схемы" );
		}
	};


	getValues = () => getEntity(
		this.props.entity,
		this.props.id,
		( json ) => this.setState( { formValues: json } ),
		( error ) => console.log( "Невозможно загрузить значения сущности: " + error ) );


	render()
	{
		const context =
		{
			region: this.props.region
		};



		const title = !isEmptyObject( this.state.schema ) && this.state.schema.title;

		return(
			<article className="b-section__form form-reg__yes">
				<section className="b-section__article-container">
					<div className="b-section__title-form">{ title }</div>
					{
						isEmptyObject( this.state.schema )
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


export default connect( mapStateToProps )( EditForm );