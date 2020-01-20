// @flow
import * as React from "react";

import { readUploadedFileAsDataURL } from "../util/readFile.js";



type Props =
{
	value: File | string, // file link or before uploaded file name
	actionURL: string, // URL where to upload file
	autoupload?: boolean, // Apload on mount if true

	filesLocationPrefix?: string, // Relative path for before uploaded files

	fileComponentView?: React.Component

	// onChange: ( value ) => void, // ???
	// onRemove: () => void,
	// onUploadSuccess: ( uploadId: string ) => void,
	// onUploadError: ( errorMessage: string ) => void
};








export type SingleFileContainerData =
{
	file: string,
	uploadId: string,
	size: number,
	progress: number,
	isUploaded: boolean,
	isError: boolean,
	errorMessage: string | null,

	onRemove: () => void
};



type State =
{
	file: string,
	isUploaded: boolean,
	isError: boolean,
	errorMessage: string | null
};






export class SingleFileWrapper extends React.Component <Props, State>
{
	constructor( props: Props )
	{
		super( props );

		let file = "";
		let isUploaded = false;

		if( !this.props.value )
			throw "Mandatory prop 'value' not set";

		if( !this.props.actionURL )
			throw "Mandatory prop 'actionURL' not set";

		// If value is just string (filename)
		if( typeof props.value !== "object" )
		{
			if( props.filesLocationPrefix )
				file += this.props.filesLocationPrefix + "/";

			file += props.value;
			isUploaded = true;
		}


		this.state =
		{
			file: file,
			isUploaded: isUploaded,
			isError: false,
			errorMessage: null
		};
	}



	componentDidMount()
	{
		// Upload only file properties
		if( typeof this.props.value !== "object" )
			return;

		// Load image from local disk if possible
		this.readFileFromLocalSource( this.props.value );

		this.uploadFile( this.props.value );
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



	uploadFile = async ( file: File ): void =>
	{
		try
		{
			const formData = new FormData();

			formData.append( "file", file );


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

			this.props.onChange( "__uploadID:" + uploadId );
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


	onRemove = () => this.props.onRemove( this.props.id );


	render()
	{
		const props: SingleFileContainerData =
		{
			file: this.state.file,
			size: 0,
			progress: 0,
			isUploaded: this.state.isUploaded,
			isError: this.state.isError,
			errorMessage: this.state.errorMessage,

			onRemove: this.onRemove
		};


		const FileComponentView = this.props.fileComponentView;

		return <FileComponentView { ...props } />;
	}
}