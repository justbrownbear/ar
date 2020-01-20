// @flow
import * as React from "react";

import sortBy from "lodash/sortBy";

import { SingleFileContainer } from "./SingleFileContainer.jsx";







const defaultOptions =
{
	// URL, куда отправлять файлы
	actionURL: null,

	// Префикс адресов для файлов
	filesLocationPrefix: null,

	// // Префикс для имени
	// "data_input_name": null,

	// // Максимальное количество файлов, которые мы можем загрузить (выбрать), включая загруженные ранее (перечисленные в current_files)
	// //  Если мы достигли максимального числа файлов, то к контейнеру, указанному в "add_file_block_class" должен подставиться класс,
	// //   указанный в "add_file_block_disable_class" и контейнер должен перестать реагировать на клик и drag&drop.
	// //   Если мы какой-то файл удаляем, то контейнер, указанный в "add_file_block_class" должен снова стать рабочим и у него
	// //   снимется класс, указанный в "add_file_block_disable_class".
	limitFiles: 50,

	// // Минимальный и максимальный объемы каждого файла в Кб
	// "limit_size_min": 20, // 20 Кб для каждого файла
	// "limit_size_max": 10000, // 10 Мб для каждого файла

	// // Производить ли загрузку файлов сразу же, как только пользователь выбрал файл?
	// // Если true, то пока картинка не загрузится на сервер, мы вместо картинки показываем прелоадер
	// // Если false, то превьюшка показывается сразу
	autoupload: true,

	// // Использовать ли квадратные скобки при задании имен для инпутов
	// "multiple_style_names": true,
	// // Множественный выбор файлов, т.е. можно ли выделить и загрузить сразу несколько файлов
	"multiselect": true,

	// // Отрабатывать ли добавление файлов через drag&drop
	// // Если true, то drag&drop должен отрабатываться для контейнера с классом, указанным в атрибуте add_file_block_class
	// "add_files_via_drag_and_drop": true,

	// // Можно ли сортировать файлы через drag&drop. Этот функционал должен быть реализован как на avito.ru, ознакомься внимательно там есть фишка,
	// //  что когда ты тащишь блок, то он в уменьшенном виде подставляется в потенциально новое место до тех пор, пока ты его не отпустил
	// "sort_files_via_drag_and_drop": true,

	// // Добавлять файлы в начало списка (true) или в конец (false)
	// "add_files_at_beginning": false,

	// // Типы файлов, которые можно выбрать для загрузки
	// "filetypes": [ "jpg", "jpeg" ],

	// // Код общего контейнера загрузки файлов
	// "container_code": null,

	// // Класс контейнера, в котором будут выводиться информационные сообщения. Если не указан, то информационные сообщения не выводятся.
	// "error_block_class":	null,


	// // =========== Контенеры, которые помещяются в контейр, указанный в атрибуте error_block_class ===========
	// // Шаблон контейнера для вывода одного информационного сообщения
	// "invalid_file_type_message": "Неверный формат изображения, допустим только jpg, bmp и т.д.<br>",
	// "invalid_min_size_message": "Размер файла не может быть меньше 20Kb, неприемлемое качество для изображения<br>",
	// "invalid_max_size_message": "Размер файла не должен превышать 3Mb<br>",
	// "file_upload_error_message": "Изображение не было загружено, попробуйте еще раз<br>",

	// // Класс контейнера, клик по которому позволяет выбрать файл на клиенте и drag&drop
	// "add_file_block_class":	null,
	// "add_file_block_at_end": false,
	// // Класс, который подставляется к вышеуказанному блоку в том случае, если мы достигли предела, указанного в limit_files
	// "add_file_block_disable_class":	null,
	// "add_file_via_drag_and_drop_class":	null,
	// // Контейнер, куда будут выводится контейнеры самих файлов
	// "files_block_class":	null,

	// "dummy_single_file_container": null,

	// // Коллбэк начала загрузки одиночного файла
	// "file_load_start_callback": null,
	// // Коллбэк завершения загрузки одиночного файла
	// "file_loaded_callback": null,
	// // Коллбэк завершения загрузки всех файлов
	// "all_files_loaded_callback": null,



	// // =================================================================================================
	// // Классы, которые подставляются и снимаются к single_file_container_code в зависимости от их текущего состояния. Может быть не указан любой из них.
	// // Нормальное состояние
	// // Файл выбран, но не загружен
	// "single_file_container_not_loaded_state": "not_loaded",
	// // Файл выбран и загружен
	// "single_file_container_uploaded_state": "uploaded",
	// // Файл загружается прямо сейчас
	// "single_file_container_uploading_state": "still_upload",
	// // Была ошибка загрузки файла
	// "single_file_container_error_state": "error",


	// "single_file_container":
	// {
	// 	// Код контейнера представления одного файла
	// 	"single_file_container_code": null,
	// 	// Класс контейнера, куда будет выводится превью. Если не указан, то превью не выводится. Если это не картинка, то выводится
	// 	//  код, указанный в "nonimage_preview"
	// 	"preview_container_class": null,

	// 	"preview_img": null, //"<img src=\"/custom/photosessions/medium/\">",
	// 	// Код превью для файлов, у которых невозможно отобразить превью
	// 	"nonimage_preview": null, //"<img src=\"/pdf.jpg\" />",
	// 	// Класс элемента, клик по которому отрабатывает событие удаление картинки. Если не указано, то функционала удаления у нас нет.
	// 	"remove_class": null,
	// 	// Класс элемента, клик по которому отрабатывает событие поворота картинки на 90 градусов. Каждый клик добавляет 90 градусов. Если не указано, то функционала поворота у нас нет.
	// 	"rotate_class": null,
	// 	// Класс контейнера, куда будет выводится имя файла. Если картинка новая, то выводится имя как на клиенте, если старая, то как на сервера (поле "filename" атрибута current_files). Если не указан, то имя не выводится.
	// 	"name_class": null,
	// 	// Класс контейнера, куда будет выводится размер файла. Выводится только для новых файлов. Если не указан, то размер не выводится.
	// 	"size_class": null,
	// 	// Класс контейнера, куда будет выводится описание файла. Если это textarea, то стандартным способом, если это input, то пишем в val
	// 	"title_class": null,
	// 	// Класс элемента прогресс-бара, у которого надо менять ширину от 0% до 100% согласно прогрессу загрузки файла. Может быть не указано.
	// 	"progress_bar_class": null
	// },

	// // Загруженные ранее файлы
	// "current_files": null
	// // Пример содержимого этой переменной
	// //	[
	// //		{
	// //			"filename":	"abc.jpg",
	// //			"order":	1,
	// //			"title":	"Блондинка"
	// //		},
	// //		{
	// //			"filename":	"def.jpg",
	// //			"order":	2,
	// //			"title":	"Брюнетка"
	// //		}
	// //	]

	// Дополнительные свойства, которые прокидываются в неизменном виде
	//  во все кастомизируемые компоненты в пропсе __additionalProps
	additionalProps: {}
};



// const props =
// {
// 	file: "abc.jpg",
// 	__uploadId: "jfdLJKF4hjenof38NFOfdss",
// 	__fileupload:
// 	{
// 		order: 0,
// 		id: 1,
// 		isUploaded: true,
// 		isError: false
// 	}
// };




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


// type Data =
// {
// 	[FileUploadProps.filenameField]: string
// };


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





export class FileUpload extends React.Component <FileUploadProps, State>
{
	nextId: number;
	addButton: React.Node;
	FileInput: React.Node;
	fileInputRef: any; // TODO: Сделать нормальный тип
	componentContainer: ( props: { childs: Array<{}> } ) => React.Node;



	//******************************************************************************************************************************************************************************
	//
	constructor( props: FileUploadProps )
	{
		super( props );

		this.nextId = 0;

		// Adding onClick handler on addButton and removeButton elements
		this.addButton = React.cloneElement( props.addButton, { onClick: (): void => this.fileInputRef.click() } );

		this.FileInput = React.createElement( "input",
			{
				type: "file",
				name: "file",
				// accept: this.acceptTypes,
				multiple: props.multiselect || false,
				style: { display: "none" },
				ref: ( input ) => this.fileInputRef = input,
				onChange: this.addFiles
			} );


		let files = props.files || [];


		// prepare files array
		// At first we have to sort array by position field
		if( files.length > 0 && props.positionField )
			files = sortBy( files, props.positionField );

		// At second we add part of neccessary information
		files = files.map( ( data ) => (
			{
				...this.getServicePart(),
				data: data
			} ) );


		this.state =
		{
			files: files
		};
	}



	//******************************************************************************************************************************************************************************
	//
	getServicePart = (): SingleFileState => (
		{
			id: this.nextId++, // iterate nextId
			file: null,
			isUploaded: false,
			isError: false,
			data: this.props.defaultFileProps
		} );



	//******************************************************************************************************************************************************************************
	// Handler for add files button event
	addFiles = ( event: SyntheticInputEvent<HTMLInputElement> ) =>
	{
		let files = this.state.files;

		// TODO: Реализовать момент добавления файла куда угодно
		// newFilePosition:
		// 0 - add to start
		// -1 - add to end
		// number - add to fixed position. If number > number of files, then add to end
		const newFilePosition = -1;

		for( let i = 0; i < event.target.files.length; i++ )
		{
			const fileProps =
			{
				...this.getServicePart(),
				file: event.target.files[ i ]
			};

			// add to end by default
			if( !newFilePosition || newFilePosition <= -1 || newFilePosition > this.state.files.length )
				files = [ ...files, fileProps ];
			else // add to start
			if( newFilePosition === 0 )
				files = [ fileProps, ...files ];
			else // add to position
				files = files.splice( newFilePosition, 0, fileProps );
		}

		this.setState( { files: files } );
	}



	//******************************************************************************************************************************************************************************
	//
	onChange = ( id: number, data: {} ) =>
	{
		const files = this.state.files.map( ( file ) =>
		{
			if( file.id === id )
				return (
					{
						...file,
						data: data
					} );

			return file;
		} );


		this.setState( { files: files }, this.updateFormValue );
	};



	//******************************************************************************************************************************************************************************
	// Т.к. этот аплоад всего лишь компонент-поле вышестоящей формы, то обновим значение формы
	updateFormValue = () => this.props.onChange( this.state.files.map( ( file ) => file.data ) );



	//******************************************************************************************************************************************************************************
	//
	onUploadSuccess = ( id: number ) =>
	{
		console.log( "onUploadSuccess" );
	};



	//******************************************************************************************************************************************************************************
	//
	onUploadError = ( id: number, errorMessage: string ) =>
	{
		console.log( "onUploadError" );
	};



	//******************************************************************************************************************************************************************************
	//
	// Remove file at position
	// TODO: Тут еще надо в отдельный массив складывать удаленные элементы
	removeFile = ( id: number ) =>
	{
		this.setState( { files: this.state.files.filter( ( element ) => element.id !== id ) }, this.updateFormValue );
	}



	//******************************************************************************************************************************************************************************
	//
	render(): React.Node
	{
		const size = 0;
		const progress = 0;


		let childs = this.state.files.map( ( element: SingleFileState ): React.Node =>
		{
			const props =
			{
				id: element.id,

				data: element.data,
				file: element.file,

				filenameField: this.props.filenameField,

				singleFileContainer: this.props.singleFileContainer,

				filesLocationPrefix: this.props.filesLocationPrefix,

				actionURL: this.props.actionURL,
				autoupload: this.props.autoupload, // TODO: merge default config and props

				removeButton: this.props.removeButton,

				__additionalProps: this.props.additionalProps,

				onChange: this.onChange,
				onRemove: this.removeFile,
				onUploadSuccess: this.onUploadSuccess,
				onUploadError: this.onUploadError
			};

			return <SingleFileContainer key={ props.id } { ...props } />;
		} );


		const options =
		{
			...defaultOptions,
			...this.props
		};


		const componentContainerProps =
		{
			addButton: childs.length < options.limitFiles ? this.addButton : null,
			childs: childs,
			__additionalProps: options.additionalProps,
			fileInput: this.FileInput // TODO: Убрать этот бред, инпут должен подставляться автоматом
		};


		const ComponentContainer = this.props.componentContainer;

		return <ComponentContainer { ...componentContainerProps } />;
	}
}