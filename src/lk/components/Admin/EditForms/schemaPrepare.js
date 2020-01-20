// @flow strict
import React from "react";

import loadable from "loadable-components";

import { withProps } from "recompose";

import { isEmptyObject } from "lk/components/util/isEmptyObject.js";



Object.expand = function ( obj )
{
	for( let key in obj )
		if( key.indexOf( "." ) !== -1 && obj.hasOwnProperty( key ) )
			parseDotNotation( key, obj[ key ], obj );

	return obj;
};






String.prototype.replaceAll = function( search, replacement )
{
	const target = this;

	return target.split( search ).join( replacement );
};



function parseDotNotation( str, val, obj )
{
	var currentObj = obj,
		keys = str.split( "." ),
		i, l = Math.max( 1, keys.length - 1 ),
		key;

	for( i = 0; i < l; ++i )
	{
		key = keys[ i ];
		currentObj[ key ] = currentObj[ key ] || {};
		currentObj = currentObj[ key ];
	}

	currentObj[ keys[ i ] ] = val;
	delete obj[ str ];
}



function loadFieldsAndWidgets( fields: {}, widgets: {}, uiSchema: {} )
{
	let result =
	{
		fields: fields,
		widgets: widgets
	};


	Object.keys( uiSchema ).forEach( ( key ) =>
	{
		// Перебираем только реальные значения и дефиниции нам не нужны
		if( !uiSchema.hasOwnProperty( key ) )
			return;

		if( key === "ui:field" )
		{
			const value = uiSchema[ key ];

			// Если такое поле у нас уже есть, то по второму разу его грузить не надо
			if( result.fields.hasOwnProperty( value ) )
				return;

			let module = loadable( () => import( /* webpackChunkName: "AdminFields" */ "./fields/" + value ),
				{
					ErrorComponent: () => <div>Ошибка загрузки модуля</div>,
					loading: () => <div>Загрузка компонента...</div>
				} );

			if( uiSchema.hasOwnProperty( "ui:options" ) )
				module = withProps( { options: uiSchema[ "ui:options" ] } )( module );

			result.fields[ value ] = module;

			return;
		}


		if( key === "ui:widget" )
		{
			const value = uiSchema[ key ];

			// Если такое поле у нас уже есть, то по второму разу его грузить не надо
			if( result.widgets.hasOwnProperty( value ) )
				return;

			// Пропускаем стандартные типы
			if( value === "string" || value === "boolean" || value === "number" || value === "integer" || value === "hidden" )
				return;

			const module = loadable( () => import( /* webpackChunkName: "AdminWidgets" */ "./widgets/" + value ),
				{
					ErrorComponent: () => <div>Ошибка загрузки модуля</div>,
					loading: () => <div>Загрузка компонента...</div>
				} );

			result.widgets[ value ] = module;

			return;
		}
	} );

	return result;
}



export type RawSchemaType =
{
	schema: {},
	definitions: {}
};


export type SchemaType =
{
	schema: {},
	definitions: {},
	uiSchema: {},
	neededEnums: [],

	fields: {},
	widgets: {}
};


// Нам нужно очень хитро объединять схемы:
// В целом возвращается newResult, а в поле schema схема из oldResult и поле schema из newResult с указанным ключом
const mergeSchemes = ( oldResult: SchemaType, newResult: SchemaType, field: string ): SchemaType =>
{
	let newSchema = oldResult.schema;
	let newUiSchema = oldResult.uiSchema;

	if( !isEmptyObject( newResult.schema ) )
		newSchema[ field ] = newResult.schema;

	if( !isEmptyObject( newResult.uiSchema ) )
	{
		// У uiSchema нужно пропустить ключ properties
		if( field === "properties" )
			newUiSchema = Object.assign( newUiSchema, newResult.uiSchema );
		else
			newUiSchema[ field ] = newResult.uiSchema;
	}

	return ( {
		...newResult,
		schema: newSchema,
		uiSchema: newUiSchema
	} );
};




export function prepareSchema( schema: RawSchemaType ): SchemaType
{
	const extendedSchema =
	{
		schema: schema.schema,
		definitions: schema.definitions,
		uiSchema: {},
		neededEnums: [],

		fields: {},
		widgets: {}
	};

	let result = prepareSchemaPath( extendedSchema );

	result =
		{
			...result,
			schema:
			{
				...result.schema,
				definitions: result.definitions
			}
		};

	return result;
}




function prepareSchemaPath( schema: SchemaType ): SchemaType
{
	// Разбираем схему на схему и uiSchema
	// если в разборе попался objectType, то проверяем, есть ли такие у нас в стейте
	// 	если есть, то заполняем енумы
	// 	если нет, то отправляем запрос на сервер
	let result = schema;

	const concatFieldsAndWidgets = ( resultObject ) =>
	{
		result.fields = resultObject.fields;
		result.widgets = resultObject.widgets;
	};


	// Перебираем все ключи схемы и в каждой итерации обновляем result
	Object.keys( result.schema ).forEach( ( key ) =>
	{
		// Перебираем только реальные значения и дефиниции нам не нужны
		if( !result.schema.hasOwnProperty( key ) || key === "definitions" )
			return;

		const value = result.schema[ key ];

		// Наш кастомный тип объекта, который нужно подгрузить
		// Хоть и не является стандартным элементом схемы, но пока оставляем, чтобы потом понимать, куда вставить enum'ы
		if( key === "objectType" )
		{
			result.schema[ key ] = value;
			result.neededEnums.push( value ); // TODO: Надо посмотреть, что сюда скидывается, по-моему есть повторы
			return;
		}


		// uiSchema мы скидываем в отдельный объект
		if( key === "uiSchema" )
		{
			result.uiSchema = value;

			// В uiSchema могут быть поля "ui:field" и "ui:widget", там компоненты,
			//  которые нужно динамически подгружать
			concatFieldsAndWidgets( loadFieldsAndWidgets( result.fields, result.widgets, value ) );

			return;
		}


		// Если у нас ссылка на другой объект, то нам нужно сюда подтянуть uiSchema нового объекта
		if( key === "$ref" )
		{
			if( isEmptyObject( result.definitions ) )
				throw new Error( "Found $ref without definitions in schema" );

			// Все ссылки начинаются с символов "#/", которые нужно убрать
			// Далее, все "/" нужно заменить на "." и получим путь из uiElements
			const refPath = value.replaceAll( "#/definitions/", "" ).replaceAll( "/", "." );

			const definitionElement = getProperty( refPath, result.definitions );

			if( !definitionElement )
				throw new Error( "Definition with path \"" + refPath + "\" not found in schema" );

			const returnedResult = prepareSchemaPath( { ...result, schema: definitionElement } );

			result = mergeSchemes( result, returnedResult, key );

			// // Склеиваем uiSchema
			// if( Object.keys( returnedResult.uiSchema ).length !== 0 )
			// 	result.uiSchema = Object.assign( result.uiSchema, returnedResult.uiSchema );
		}

		// TODO: !!!!!!!!!!!!!! У НАС ПОПАДАЮТ КУСКИ ВИЗУАЛЬНОЙ СХЕМЫ В ДЕФИНИЦИИ, ЭТО НЕПРАВИЛЬНО !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		// Обычное поле ключ-значение, просто добавляем
		if(	typeof value === "string" || typeof value === "number" || typeof value === "boolean" )
		{
			result.schema[ key ] = value;
			return;
		}


		// Для объектов используем рекурсию
		if( typeof value === "object" )
		{
			if( Array.isArray( value ) )
			{
				result.schema[ key ] = [];
				result.schema[ key ] = value;
				return;
			}


			// Вызываем рекурсивно текущую функцию, но в качестве схемы подставляем только нужный кусок схемы
			//const returnedResult = prepareSchemaPath( { ...result, schema: value } );
			const returnedResult = prepareSchemaPath(
				{
					...result,
					schema: value,
					uiSchema: {}
				} );

			result = mergeSchemes( result, returnedResult, key );
		}
	} );


	return result;
}




// Функция получает на вход объект object и путь propertyName в виде path1.path2.path3...
// Возвращает элемент по указанному пути
function getProperty( propertyName: string, object: {} ): string | number | {}
{
	const pathParts = propertyName.split( "." );

	let property = object;

	for( let i = 0; i < pathParts.length; i++ )
		if( property.hasOwnProperty( pathParts[ i ] ) )
			property = property[ pathParts[ i ] ];

	return property;
}