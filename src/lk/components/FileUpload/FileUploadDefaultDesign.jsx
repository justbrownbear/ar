// @flow
import * as React from "react";

import type { FileUploadProps, SingleFileContainerData } from "./FileUpload.jsx";
import { FileUpload as FileUploadBase } from "./FileUpload.jsx";




export function FileUpload( props: FileUploadProps ): React.Node
{
	const removeButton = (): React.Node => <span>X</span>;

	const addButton: React.Node = <span>Add</span>;

	const componentContainer = ( addButton: React.Node, childs: React.Node ): React.Node => <div>{ childs }{ addButton }</div>;

	const singleFileContainer = ( props: SingleFileContainerData ): React.Node =>
	{
		const { data, __file, __size, __progress, __removeButton } = props;

		return (
			<div>
				<img src={ __file } alt="" />
				<span>{ __file } { __size }</span>
				<span>{ __progress }%</span>
				{ __removeButton }
			</div>
		);
	};


	const fileUploadProps =
	{
		...props,
		removeButton: removeButton,
		addButton: addButton,
		componentContainer: componentContainer,
		singleFileContainer: singleFileContainer
	}


	return <FileUploadBase { ...fileUploadProps } />;
}