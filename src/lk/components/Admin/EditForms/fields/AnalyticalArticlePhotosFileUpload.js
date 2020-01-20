// @flow
import * as React from "react";

import { SingleFileUpload } from "lk/components/SingleFileUpload/SingleFileUpload.js";



const addFileComponentView = ( { addFileOnClick } ) => <div className="b-upload__container-add" onClick={ addFileOnClick }></div>;



function singleFileContainer( props: Props ): React.Node
{
	const { isError, isUploaded, file, onRemove } = props;

	let StatusBlock = (): React.Node => null;

	if( isError )
		StatusBlock = (): React.Node => <div className="b-upload__error-block"></div>;
	else
	if( !isUploaded )
		StatusBlock = (): React.Node => <div className="b-upload__container-progress-bar"><div><span></span></div></div>;


	return (
		<div className="b-upload__item uploaded">
			<StatusBlock />
			<img src={ file } alt="Фото" />

			<span className="b-upload__button-remove" onClick={ onRemove }></span>
		</div>
	);
}



export default function AnalyticalArticlePhotosFileUpload( props )
{
	const singleFileUploadProps =
	{
		value: props.formData,

		filesLocationPrefix: "/custom/analytical_articles/150x100",

		actionURL: "/upload_files",
		addFileComponentView: addFileComponentView,
		fileComponentView: singleFileContainer,

		onChange: props.onChange
	};


	return <SingleFileUpload { ...singleFileUploadProps } />;
}
