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

			<span>Дата загрузки</span>
			<input name="date" type="text" value={ date } onChange={ onChangeString } />

			<span>Тип источника</span>
			<Select name="source_type" entity="EconomicOperationsSourceTypes" additionalProperties={ props.__additionalProps } value={ data.source_type } onChange={ ( value ) => onChange( "source_type", value ) } />

			<span>Источник</span>
			<textarea name="source" rows="2" cols="23" value={ data.source } onChange={ onChangeString }></textarea>

			{ props.__removeButton }
		</div>
	);
}




export function LibraryFactorsPhotosUploadCommon( props )
{
	if( props.filesLocationPrefix === undefined )
		throw new Error( "Propery filesLocationPrefix not defined" );


	const uploadProps =
	{
		...props.options,
		singleFileContainer: singleFileContainer,
		defaultFileProps:
		{
			id: 0,
			order: 0,
			file: null,
			date: null,
			source_type: null,
			source: null
		},
		filesLocationPrefix: props.filesLocationPrefix,

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