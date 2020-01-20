// @flow
import * as React from "react";

import { SingleFileWrapper } from "./SingleFileWrapper";


export type SingleFileContainerProps =
{
	data: {},
	file: string,
	size: number,
	progress: number,
	removeButton: () => React.Node
};



export type FileUploadProps =
{
	files?: Array<{}>,

	actionURL: string,
	autoupload?: boolean,

	defaultFileProps: {},
	filenameField: string,
	positionField?: string,

	orderProp?: number, //( props: {} ) => number,
	componentContainer: ( props: { childs: Array<{}> } ) => React.Node,
	singleFileContainer: ( singleFileContainerData: SingleFileContainerData ) => React.Node,
	addButton: React.Node,
	removeButton: React.Node,

	additionalProps?: {},
	onChange: ( {} ) => void
};



type SingleFileState =
{
	id: number,
	file: File | null,
	isUploaded: boolean,
	isError: boolean,
	data: {}
};




type SingleFileUploadPropsType =
{
	actionURL: string,
	filesLocationPrefix: string,
	acceptTypes?: string,

	addFileComponentView: ( fieldData, addFileOnClick ) => React.Node,
	fileComponentView: ( data, removeFileOnClick ) => React.Node,

	onChange: string => void
};



export class SingleFileUpload extends React.Component
{
	FileInput = null;
	fileInputRef = React.createRef();


	constructor( props )
	{
		super( props );

		if( !this.props.actionURL )
			throw "Mandatory prop 'actionURL' not set";

		this.FileInput = React.createElement( "input",
			{
				type: "file",
				name: "file",
				//accept: "image/jpg",//props.acceptTypes,
				multiple: false,
				style: { display: "none" },
				onChange: this.setFile,
				ref: ( ref ) => this.fileInputRef = ref
			} );


		this.state =
		{
			file: props.value
		};
	}


	static getDerivedStateFromProps( nextProps: TM_PROPS_TYPE, prevState: TM_STATE_TYPE )
	{
		if( nextProps.value !== prevState.value )
			return { file: nextProps.value };

		return null;
	}




	setFile = ( event: SyntheticInputEvent<HTMLInputElement> ) =>
	{
		// Nothing to do if no single file selected
		if( event.target.files.length !== 1 )
			return;

		this.setState( { file: event.target.files[ 0 ] } );
	};


	onRemove = () => this.setState( { file: null }, this.props.onChange( undefined ) );



	render()
	{
		let view;

		if( this.state.file || this.props.value )
		{
			const props =
			{
				value: this.state.file || this.props.value,
				actionURL: this.props.actionURL,
				autoupload: true,
				filesLocationPrefix: this.props.filesLocationPrefix,

				fileComponentView: this.props.fileComponentView,

				onChange: this.props.onChange,
				onRemove: this.onRemove
			};

			view = <SingleFileWrapper { ...props } />;
		}
		else
		{
			const AddFileComponentView = this.props.addFileComponentView;
			const addFileOnClick = () => this.fileInputRef.click();

			view = (
				<React.Fragment>
					{ this.FileInput }
					<AddFileComponentView addFileOnClick={ addFileOnClick } onRemove={ this.onRemove } />
				</React.Fragment>
			);
		}


		return view;
	}
}



SingleFileUpload.defaultProps =
{
	//fieldData, addFileOnClick
	addFileComponentView: ( { addFile } ) => <div className="b-upload__container-add" onClick={ addFile }></div>,
	fileComponentView: ( data, removeFileOnClick ) => <div>{ data.file }<div onClick={ removeFileOnClick }>remove</div></div>,

	acceptTypes: "*",

	// onChange: ( data ) => props.onChange( "all right" )
};
