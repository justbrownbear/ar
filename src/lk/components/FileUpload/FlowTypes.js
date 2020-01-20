



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
	singleFileContainer: ( SingleFileContainerData ) => React.Node,
	addButton: React.Node,
	removeButton: React.Node,

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



type State =
{
	files: Array<SingleFileState>
	// value: string,
	// items: Array<ItemObject>
};