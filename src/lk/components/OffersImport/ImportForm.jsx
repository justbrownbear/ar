// @flow
import React from "react";
import { useState } from "react";

import Select from "../Select/Select.jsx";

import { OPERATION_SAVE_ENTITY } from "lk/operations.js";
import { getLKQuery } from "lk/redux/actions.js";

import { FileUpload } from "lk/components/FileUpload/FileUpload.jsx";


const addFileComponentView = ( { addFileOnClick } ) => <div className="b-upload__container-add" onClick={ addFileOnClick }></div>;



function singleFileContainer( props ): React.Node
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

	return (
		<div><StatusBlock />{ props.__file ? "Файл загружен" : "Выберите файл" }</div>
	);
}



const addButton = <button className="offers-download__button">Выберите файл</button>;
const removeButton = <span className="b-upload__button-remove"></span>;

const componentContainer = ( props ) => <div className="row array-item-list">{ props.addButton }{ props.childs }{ props.fileInput }</div>
//const componentContainer = ( props ) => <div className="row array-item-list">{ props.childs }</div>



function sendForm( data, onOfferImportStarted, onOfferImportFinished )
{
	let dataWithOperation =
		{
			operation: OPERATION_SAVE_ENTITY,
			entity: "OffersImport",
			data: data
		};


	getLKQuery(
		dataWithOperation,
		() => onOfferImportFinished( "Оферты загружены на сервер и будут импортироваться в фоновом режиме. Через некоторое время обновите журнал загрузок." ),
		() => onOfferImportFinished( "Произошла ошибка при загрузке оферт, обратитесь к Администратору" )
	);

	onOfferImportStarted();
}





export function ImportForm( props )
{
	const [ segment, setSegment ] = useState( null );
	const [ operationType, setOperationType ] = useState( null );
	const [ source, setSource ] = useState( null );
	const [ file, setFile ] = useState( null );
	const [ message, setMessage ] = useState( "" );
	const [ isOfferImportStarted, setIsOfferImportStarted2 ] = useState( false );

	const setIsOfferImportStarted = ( value ) =>
	{
		console.log( value );
		setIsOfferImportStarted2( value );
	}

	const onOfferImportStarted = () => setIsOfferImportStarted( true );
	const onOfferImportFinished = ( message ) =>
	{
		setSegment( null );
		setOperationType( null );
		setSource( null );
		setIsOfferImportStarted( false );
		setMessage( message );
	};


	const uploadProps =
	{
		files: file,

		filenameField: "file",
		actionURL: "/upload_files",

		onChange: setFile,

		singleFileContainer: singleFileContainer,
		limitFiles: 1,
		autoupload: true,
		multiselect: false,

		componentContainer: componentContainer,
		addButton: addButton,
		removeButton: removeButton,


		defaultFileProps:
		{
			id: 0,
			order: 0,
			file: null
		}
	};


	// Чтобы включилась кнопка импорта оферт, необходимо, чтобы все поля формы были заполнены
	const isUploadAllowed = segment && operationType && source ;
	const isImportAllowed = isUploadAllowed && file;

	const buttonClass = "offers-download__button" + ( isImportAllowed ? "" : " disabled" );

	const importOffer = () =>
	{
		const data =
		{
			segment: segment,
			operationType: operationType,
			source: source,
			file: file
		};

		sendForm( data, onOfferImportStarted, onOfferImportFinished );
	};


	const waiterBlock = (
			<div className="b-section__fadeout">
				<div className="centering__yes">
					<div className="spinner spinner_size_l spinner_progress_yes"></div>
					<p className="offers-download__service-messages">Идет загрузка оферт...</p>
				</div>
			</div>
		);


	return(
		<article className="b-section__form" id="offers-download">
			<section className="b-section__article-container offers-download__select-block-wrapper active">
				<div className="offers-download__select-block">Сегмент
					<Select entity="Segments" value={ segment } onChange={ setSegment } />
				</div>
				<div className="offers-download__select-block">Тип операции
					<Select entity="TypesOfEconomicOperations" value={ operationType } onChange={ setOperationType } />
				</div>
				<div className="offers-download__select-block">Источник
					<Select entity="EconomicOperationsSourceTypes" value={ source } onChange={ setSource } />
				</div>
				<div className="offers-download__select-block">
					{ isUploadAllowed ? <FileUpload { ...uploadProps } /> : null }
					<button className={ buttonClass } disabled={ !isImportAllowed } onClick={ importOffer }>Загрузить оферты</button>
					{ message }
				</div>
				{ isOfferImportStarted ? waiterBlock : null }
			</section>
		</article>
	);
}
