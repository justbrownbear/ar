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
			{ data.file }<br />

			<span>Тип источника</span>
			<Select name="source_type" entity="EconomicOperationsSourceTypes" additionalProperties={ props.__additionalProps } value={ data.source_type } onChange={ ( value ) => onChange( "source_type", value ) } />

			<span>Источник</span>
			<textarea name="source" rows="2" cols="23" value={ data.source } onChange={ onChangeString }></textarea>

			<span>Дата загрузки</span>
			<input name="date" type="text" value={ date } onChange={ onChangeString } />

			<span>Тип документа</span>
			<Select name="document_type" entity="DocumentTypes" additionalProperties={ props.__additionalProps } value={ data.document_type } onChange={ ( value ) => onChange( "document_type", value ) } />

			{ props.__removeButton }
		</div>
	);
}




export default function LibraryFactorsDocumentsUpload( props )
{
	const uploadProps =
	{
		...props.options,
		singleFileContainer: singleFileContainer,
		defaultFileProps:
		{
			id: 0,
			order: 0,
			source_type: null,
			source: null,
			file: null,
			date: null,
			document_type: null
		},

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