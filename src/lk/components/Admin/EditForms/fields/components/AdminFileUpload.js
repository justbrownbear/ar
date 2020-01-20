// @flow

import React from "react";

import { FileUpload } from "lk/components/FileUpload/FileUpload.jsx";

//import { ObjectTypeSelect } from "../Select/ObjectTypeSelect.jsx";

import type { SingleFileContainerData } from "../FileUpload/SingleFileContainer.jsx";



const addButton = <div className="b-upload__container-add"></div>;
const removeButton = <span className="b-upload__button-remove"></span>;

const componentContainer = ( props ) => <div className="row array-item-list">{ props.addButton }{ props.childs }{ props.fileInput }</div>
//const componentContainer = ( props ) => <div className="row array-item-list">{ props.childs }</div>




type Data =
{
	order: number,
	file: string,
	description: string,
	date: string,
	document_section: number,
	document_type: number,
	economic_operation: number,
	comment: string
};


type Props =
{
	data: Data,
	...SingleFileContainerData
};




const adminFileUploadProps =
{
	files: [],
	componentContainer: componentContainer,
	addButton: addButton,
	removeButton: removeButton,
	multiselect: true,
	filenameField: "file",
	actionURL: "/upload_files"
};



type AdminFileUploadProps =
{
	files: Array<{}>,
	additionalProps?: {},
	onChange: ( Data ) => void
}



export function AdminFileUpload( props: AdminFileUploadProps ): React.Node
{
	const uploadProps =
	{
		...adminFileUploadProps,
		...props
	};


	return <FileUpload { ...uploadProps } />;
}