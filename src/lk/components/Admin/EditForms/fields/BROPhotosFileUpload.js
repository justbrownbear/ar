// @flow
import * as React from "react";

import moment from "moment";

import Select from "lk/components/Select/Select.jsx";

import { AdminFileUpload } from "./components/AdminFileUpload.js";



function singleFileContainer( props: Props ): React.Node
{
	const onChange = ( field: string, value: any ) => props.onChange( { ...props.data, [field]: value } );
	const onChangeString = ( event ) => onChange( event.target.name, event.target.value );

	let StatusBlock = (): React.Node => null;

	if( props.__isError )
		StatusBlock = (): React.Node => <div className="b-upload__error-block"></div>;
	else
	if( !props.__isUploaded )
		StatusBlock = (): React.Node => <div className="b-upload__container-progress-bar"><div><span></span></div></div>;


	const data = props.data;

	const date = data.date || moment().format( "DD.MM.YYYY" );


	return (
		<div className="b-upload__item uploaded">
			<StatusBlock />
			<img src={ props.__file } alt="Фото" />

			<span>Наименование</span>
			<input name="description" type="text" value={ data.description } onChange={ onChangeString } />

			<span>Дата загрузки</span>
			<input name="date" type="text" value={ date } onChange={ onChangeString } />

			<span>Экономическая операция</span>
			<Select name="economic_operation" entity="EconomicOperations" additionalProperties={ props.__additionalProps } value={ data.economic_operation } onChange={ ( value ) => onChange( "economic_operation", value ) } />

			<span>Комментарий</span>
			<textarea name="comment" rows="2" cols="23" value={ data.comment } onChange={ onChangeString }></textarea>

			{ props.__removeButton }
		</div>
	);
}




export default function BROPhotosFileUpload( props )
{
	const uploadProps =
	{
		...props.options,
		singleFileContainer: singleFileContainer,
		defaultFileProps:
		{
			id: 0,
			order: 0,
			file: null,
			description: null,
			date: null,
			document_section: null,
			document_type: null,
			economic_operation: null,
			comment: null
		},
		filesLocationPrefix: "/custom/real_objects/photo/146x110",

		files: props.formData,
		onChange: props.onChange,
		additionalProps: props.formContext,
	};


	return (
		<div className="grid-row grid-padded-v1x">
			<div className="grid-cols-24">
				{ props.schema.title }:<br />
				<AdminFileUpload { ...uploadProps } />
			</div>
		</div>
	);
}