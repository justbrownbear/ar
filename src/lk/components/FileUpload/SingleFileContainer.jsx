// @flow
import * as React from "react";

import { readUploadedFileAsDataURL } from "../util/readFile.js";
import type { SingleFileContainerProps } from "./FileUpload.jsx";


type Props =
{
	id: number,

	data: {},
	file: File,

	filenameField: string,

	singleFileContainer: ( SingleFileContainerData ) => React.Node,

	filesLocationPrefix?: string,

	actionURL: string,
	autoupload: boolean,

	removeButton: React.Node,

	onChange: ( id: number, data: {} ) => void,
	onRemove: ( id: number ) => void,
	onUploadSuccess: ( id: number, uploadId: string ) => void,
	onUploadError: ( id: number, errorMessage: string ) => void
};








export type SingleFileContainerData =
{
	data: {},
	onChange: ( number, {} ) => void,
	__file: string,
	__uploadId: string,
	__size: number,
	__progress: number,
	__isUploaded: boolean,
	__isError: boolean,
	__errorMessage: string | null,
	__removeButton: React.Node
};



type State =
{
	file: string,
	isUploaded: boolean,
	isError: boolean,
	errorMessage: string | null
};



export class SingleFileContainer extends React.Component  <Props, State>
{
	constructor( props: Props )
	{
		super( props );

		// TODO: Перетащить эту кнопку в конструктор
		this.removeButton = React.cloneElement( this.props.removeButton, { onClick: this.onRemove } );

		this.state =
		{
			file: props.data[ props.filenameField ],
			isUploaded: false,
			isError: false,
			errorMessage: null
		};
	}



	componentDidMount()
	{
		if( this.props.file === null || typeof this.props.file !== "object" )
		{
			// TODO: Тут еще надо проверять, нужно ли это делать
			this.setState(
				{
					file: this.props.filesLocationPrefix + "/" + this.state.file,
					isUploaded: true
				} );
			return;
		}

		// Load image from local disk if possible
		this.readFileFromLocalSource( this.props.file );

		this.uploadFile();
	}



	readFileFromLocalSource = async ( file: File ): void =>
	{
		try
		{
			const fileContents = await readUploadedFileAsDataURL( file );

			this.setState( { file: fileContents } );
		}
		catch ( exception )
		{
			console.warn( exception.message );
		}
	}



	uploadFile = async (): void =>
	{
		try
		{
			const formData = new FormData();

			formData.append( "file", this.props.file );


			const params =
			{
				method: "POST",
				credentials: "include",
				body: formData
			};


			const response = await fetch( this.props.actionURL, params );
			const uploadId = await response.text();

			if( Number( response.headers.get( "content-length" ) ) !== 32 )
				throw "Response is not upload id";

			this.setState( { isUploaded: true } );

			// Upload successful, adding to data __uploadId field
			const newData =
			{
				...this.props.data,
				__uploadId: uploadId
			};


			this.props.onChange( this.props.id, newData );
		}
		catch( error )
		{
			console.log( "File uploading error: " + error );
			this.setState(
				{
					isError: true,
					errorMessage: error
				} );
		}
	};



	onChange = ( data: {} ) => this.props.onChange( this.props.id, data );

	onRemove = () => this.props.onRemove( this.props.id );



	render()
	{
		const props: SingleFileContainerData =
		{
			data: this.props.data,
			__file: this.state.file,
			__size: 0,
			__progress: 0,
			__isUploaded: this.state.isUploaded,
			__isError: this.state.isError,
			__errorMessage: this.state.errorMessage,
			__removeButton: this.removeButton,
			__additionalProps: this.props.__additionalProps,
			onChange: this.onChange
		};


		const CustomSingleFileContainer = this.props.singleFileContainer;

		return <CustomSingleFileContainer { ...props } />;
	}
}