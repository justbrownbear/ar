// *********************************************************************************************************************
//
// coob_uploader.js 0.9.0
// (с) 2015 Kirill Bastrikov (380929@gmail.com)
//
// coob_uploader may be freely distributed under the BSD license; see the accompanying LICENSE.txt.
//
// *********************************************************************************************************************



export default function coob_upload( settings )
{
	this.default_settings =
	{
		// URL, куда отправлять файлы
		"action_url": null,

		// id контейнера, на который мы биндим текущий аплоад, т.е. в который мы помещаем container_code
		"bind_container": null,

		// Префикс для имени
		"data_input_name": null,

		// Максимальное количество файлов, которые мы можем загрузить (выбрать), включая загруженные ранее (перечисленные в current_files)
		//  Если мы достигли максимального числа файлов, то к контейнеру, указанному в "add_file_block_class" должен подставиться класс,
		//   указанный в "add_file_block_disable_class" и контейнер должен перестать реагировать на клик и drag&drop.
		//   Если мы какой-то файл удаляем, то контейнер, указанный в "add_file_block_class" должен снова стать рабочим и у него
		//   снимется класс, указанный в "add_file_block_disable_class".
		"limit_files": 300,

		// Минимальный и максимальный объемы каждого файла в Кб
		"limit_size_min": 20, // 20 Кб для каждого файла
		"limit_size_max": 10000, // 10 Мб для каждого файла

		// Производить ли загрузку файлов сразу же, как только пользователь выбрал файл?
		// Если true, то пока картинка не загрузится на сервер, мы вместо картинки показываем прелоадер
		// Если false, то превьюшка показывается сразу
		"autoupload": true,

		// Использовать ли квадратные скобки при задании имен для инпутов
		"multiple_style_names": true,
		// Множественный выбор файлов, т.е. можно ли выделить и загрузить сразу несколько файлов
		"multiselect": true,

		// Отрабатывать ли добавление файлов через drag&drop
		// Если true, то drag&drop должен отрабатываться для контейнера с классом, указанным в атрибуте add_file_block_class
		"add_files_via_drag_and_drop": true,

		// Можно ли сортировать файлы через drag&drop. Этот функционал должен быть реализован как на avito.ru, ознакомься внимательно там есть фишка,
		//  что когда ты тащишь блок, то он в уменьшенном виде подставляется в потенциально новое место до тех пор, пока ты его не отпустил
		"sort_files_via_drag_and_drop": true,

		// Добавлять файлы в начало списка (true) или в конец (false)
		"add_files_at_beginning": false,

		// Типы файлов, которые можно выбрать для загрузки
		"filetypes": [ "jpg", "jpeg" ],

		// Код общего контейнера загрузки файлов
		"container_code": null,

		// Класс контейнера, в котором будут выводиться информационные сообщения. Если не указан, то информационные сообщения не выводятся.
		"error_block_class":	null,


		// =========== Контенеры, которые помещяются в контейр, указанный в атрибуте error_block_class ===========
		// Шаблон контейнера для вывода одного информационного сообщения
		"invalid_file_type_message": "Неверный формат изображения, допустим только jpg, bmp и т.д.<br>",
		"invalid_min_size_message": "Размер файла не может быть меньше 20Kb, неприемлемое качество для изображения<br>",
		"invalid_max_size_message": "Размер файла не должен превышать 3Mb<br>",
		"file_upload_error_message": "Изображение не было загружено, попробуйте еще раз<br>",

		// Класс контейнера, клик по которому позволяет выбрать файл на клиенте и drag&drop
		"add_file_block_class":	null,
		"add_file_block_at_end": false,
		// Класс, который подставляется к вышеуказанному блоку в том случае, если мы достигли предела, указанного в limit_files
		"add_file_block_disable_class":	null,
		"add_file_via_drag_and_drop_class":	null,
		// Контейнер, куда будут выводится контейнеры самих файлов
		"files_block_class":	null,

		"dummy_single_file_container": null,

		// Коллбэк начала загрузки одиночного файла
		"file_load_start_callback": null,
		// Коллбэк завершения загрузки одиночного файла
		"file_loaded_callback": null,
		// Коллбэк завершения загрузки всех файлов
		"all_files_loaded_callback": null,



		// =================================================================================================
		// Классы, которые подставляются и снимаются к single_file_container_code в зависимости от их текущего состояния. Может быть не указан любой из них.
		// Нормальное состояние
		// Файл выбран, но не загружен
		"single_file_container_not_loaded_state": "not_loaded",
		// Файл выбран и загружен
		"single_file_container_uploaded_state": "uploaded",
		// Файл загружается прямо сейчас
		"single_file_container_uploading_state": "still_upload",
		// Была ошибка загрузки файла
		"single_file_container_error_state": "error",


		"single_file_container":
		{
			// Код контейнера представления одного файла
			"single_file_container_code": null,
			// Класс контейнера, куда будет выводится превью. Если не указан, то превью не выводится. Если это не картинка, то выводится
			//  код, указанный в "nonimage_preview"
			"preview_container_class": null,

			"preview_img": null, //"<img src=\"/custom/photosessions/medium/\">",
			// Код превью для файлов, у которых невозможно отобразить превью
			"nonimage_preview": null, //"<img src=\"/pdf.jpg\" />",
			// Класс элемента, клик по которому отрабатывает событие удаление картинки. Если не указано, то функционала удаления у нас нет.
			"remove_class": null,
			// Класс элемента, клик по которому отрабатывает событие поворота картинки на 90 градусов. Каждый клик добавляет 90 градусов. Если не указано, то функционала поворота у нас нет.
			"rotate_class": null,
			// Класс контейнера, куда будет выводится имя файла. Если картинка новая, то выводится имя как на клиенте, если старая, то как на сервера (поле "filename" атрибута current_files). Если не указан, то имя не выводится.
			"name_class": null,
			// Класс контейнера, куда будет выводится размер файла. Выводится только для новых файлов. Если не указан, то размер не выводится.
			"size_class": null,
			// Класс контейнера, куда будет выводится описание файла. Если это textarea, то стандартным способом, если это input, то пишем в val
			"title_class": null,
			// Класс элемента прогресс-бара, у которого надо менять ширину от 0% до 100% согласно прогрессу загрузки файла. Может быть не указано.
			"progress_bar_class": null
		},

		// Загруженные ранее файлы
		"current_files": null
		// Пример содержимого этой переменной
		//	[
		//		{
		//			"filename":	"abc.jpg",
		//			"order":	1,
		//			"title":	"Блондинка"
		//		},
		//		{
		//			"filename":	"def.jpg",
		//			"order":	2,
		//			"title":	"Брюнетка"
		//		}
		//	]
	};




	// Залипуха, чтобы можно было вызывать без new
	if( !( this instanceof coob_upload ) )
		return new coob_upload( settings );


	var that = this;

	this.upload_container;
	this.add_file_block;
	this.input_file;
	this.errors_block;
	this.files_block_container;
	this.dummy_single_file_container;

	this.number_of_files = 0;

	this.add_button_inside_file_container = false;


	this.single_file_container_class = "js__single_file_container";
	this.single_file_container_code;


	this.delayed_upload =
	{
		"have_errors": false,
		"upload_counter": 0,
		"single_file_containers": [],
		"files": []
	};


	this.drag_and_drop_properties =
	{
		"is_drag_started": false,
		"drag_enter_leave_counter": 0,
		"current_dragging_object": null,
		"dragging_image": null,
		"document_ondragstart_previous_listener": null,
		"document_body_onselectstart_previous_listener": null,
		"document_onmousemove_previous_listener": null,
		"document_onmouseup_previous_listener": null,
		"dragging_object_previous_display_state": null,
		"dummy_position": null,
		"file_blocks": []
	};


	this.graphics_formats = [ "jpg", "jpeg", "png", "gif", "tiff" ];



	this.settings = settings;





	// ======================================================================================================================
	// Обработчики событий
	// ======================================================================================================================

	//******************************************************************************************************************************************************************************
	// Обработчик события потенциального начала drag&drop
	//
	var drag_and_drop_onmousedown = function ( event )
	{
		// Нас интересует обработка нажатия только левой клавишей мыши
		if( event.button !== 0 )
			return false;


		// Текущие координаты курсора мыши
		var x = event.clientX;
		var y = event.clientY;


		// Если у нас есть кнопка удаления, то проверим, на нажали ли на нее
		if( that.settings.single_file_container.remove_class )
		{
			// Ранее уже была проверка на то, что кнопка удаления реально существует и сюрпризов мы тут не ждем
			var remove_button_rects = this.querySelector( "." + that.settings.single_file_container.remove_class ).getClientRects()[ 0 ];

			// Если был клик по кнопке удаления
			if( x >= remove_button_rects.left && x <= remove_button_rects.right && y >= remove_button_rects.top && y <= remove_button_rects.bottom )
			{
				delete_file( this );

				return false;
			}
		}

		// Если у нас есть кнопка поворота изображения, то навесим событие для нее
		if( that.settings.single_file_container.rotate_class )
		{
			// Ранее уже была проверка на то, что кнопка удаления реально существует и сюрпризов мы тут не ждем
			var rotate_button_rects = this.querySelector( "." + that.settings.single_file_container.rotate_class ).getClientRects()[ 0 ];

			// Если был клик по кнопке поворота
			if( x >= rotate_button_rects.left && x <= rotate_button_rects.right && y >= rotate_button_rects.top && y <= rotate_button_rects.bottom )
			{
				rotate_image( this );

				return false;
			}
		}


		// У файлового контейнера могут быть элементы формы, надо отрабатывать нажатие на них тоже
		var form_tags = [ "input", "select", "textarea" ];

		for( var i = 0; i < form_tags.length; i ++ )
		{
			var form_elements = this.getElementsByTagName( form_tags[ i ] );

			if( !form_elements )
				continue;

			for( var j = 0; j < form_elements.length; j++ )
			{
				var form_element = form_elements[ j ];

				// Пропускаем hidden инпуты
				if( form_element.type === "hidden" )
					continue;

				// Ранее уже была проверка на то, что кнопка удаления реально существует и сюрпризов мы тут не ждем
				var form_element_rects = form_element.getClientRects()[ 0 ];

				// Если был клик по элементу формы
				if( x >= form_element_rects.left && x <= form_element_rects.right && y >= form_element_rects.top && y <= form_element_rects.bottom )
					return true; // event bubbling
			}
		}


		// Если у нас не включена пересортировка через drag&drop, то дальше делать нечего
		if( !that.settings.sort_files_via_drag_and_drop )
			return false;

		// Если мы в этом месте, то кнопка мыши нажата за пределами кнопок удаления и поворота, т.е. мы предполагаем, что, возможно, начался drag&drop

		// Запоминем объект, который, возможно, будет перетаскиваться
		that.drag_and_drop_properties.current_dragging_object = this;

		// Делаем так, чтобы всякие выделения мышью и встроенный d&d браузера не работал, запомнив предыдущий листенеры
		that.drag_and_drop_properties.document_ondragstart_previous_listener		= document.ondragstart;
		that.drag_and_drop_properties.document_body_onselectstart_previous_listener	= document.body.onselectstart;

		document.ondragstart			= function() { return false; };
		document.body.onselectstart	= function() { return false; };

		// Ставим обработчики на другие необходимые события, запомнив предыдущие листенеры
		that.drag_and_drop_properties.document_onmousemove_previous_listener	= document.onmousemove;
		that.drag_and_drop_properties.document_onmouseup_previous_listener		= document.onmouseup;

		document.onmousemove	= drag_and_drop_onmousemove;
		document.onmouseup		= drag_and_drop_onmouseup;

		return false;
	};




	//******************************************************************************************************************************************************************************
	// Обработчик события перемещения мыши во время drag&drop
	//
	var drag_and_drop_onmousemove = function ( event )
	{
		//event = fixEvent( event );

		// Если у нас первое движение мыши при нажатой кнопке, т.е. начинается драг, то нам надо выполнять ряд действия
		if( !that.drag_and_drop_properties.is_drag_started )
		{
			that.drag_and_drop_properties.is_drag_started = true;

			// Запоминаем значение CSS свойства display текущего таскаемого блока с файлом
			that.drag_and_drop_properties.dragging_object_previous_display_state = that.drag_and_drop_properties.current_dragging_object.style.display;

			// Скопируем изображения из таскаемого блока для целей передвижения его рядом с курсором мыши
			var dragging_object_image = that.drag_and_drop_properties.current_dragging_object.querySelector( "img" );

			var dragging_image = document.createElement( "img" );
			dragging_image.setAttribute( "src", dragging_object_image.src );
			dragging_image.setAttribute( "width", dragging_object_image.clientWidth );
			dragging_image.setAttribute( "height", dragging_object_image.clientHeight );

			dragging_image.style.position = "absolute";

			// 50% прозрачность
			dragging_image.style.opacity = "0.5";

			// Назначаем большой z-index для того, чтобы наш переносимый контейнер был над всеми элементами на странице
			dragging_image.style.zIndex = 1000;

			// Позиционируем рядом с курсором мыши
			dragging_image.style.left = event.pageX + 1 + "px";
			dragging_image.style.top = event.pageY + 1 + "px";

			// Размещаем таскаемое изображение в документе
			that.drag_and_drop_properties.dragging_image = document.body.appendChild( dragging_image );

			// Скрываем блок файла
			that.drag_and_drop_properties.current_dragging_object.style.display = "none";

			// Перед скрытым блоком поставим заглушку
			that.dummy_single_file_container = that.files_block_container.insertBefore( that.dummy_single_file_container.cloneNode( true ), that.drag_and_drop_properties.current_dragging_object );

			// Запоминаем перед каким элементом у нас вставлена заглушка, это нам потом поможет в ускорении работы
			// Просто возьмем order-1, т.к. order должен быть всегда актуальным
			that.drag_and_drop_properties.dummy_position = that.drag_and_drop_properties.current_dragging_object.querySelectorAll( "input[name=\"" + get_element_name( "order" ) + "\"]" ).value - 1;

			// Теперь переберем все контейнеры одиночных файлов и запомним их координаты двух диагональных угловых точек, т.е. закэшируем координаты,
			// это позволит нам в будущем очень быстро вычислять новое местоположение заглушки
			calculate_file_containers_rects();

			return false;
		}


		// Если пользователь решил двинуть единственный блок, то тут и делать нечего.
		if( that.drag_and_drop_properties.file_blocks.length === 0 )
			return false;

		// Двигаем превьюшку вместе с мышью
		that.drag_and_drop_properties.dragging_image.style.left = event.pageX + 1 + "px";
		that.drag_and_drop_properties.dragging_image.style.top = event.pageY + 1 + "px";


		// Если мы тут, значит все структуры проинициализированы, подготовительные работы проведены и мы готовы к перемещению
		// Передвинем заглушку на новое место, если это необходимо
		move_dummy( event.clientX, event.clientY );

		return false;
	};




	//******************************************************************************************************************************************************************************
	// Обработчик события "отпускания" элемента во время drag&drop
	//
	var drag_and_drop_onmouseup = function ( event )
	{
		// Если у нас не drag&drop, то и делать ничего не нужно
		if( !that.drag_and_drop_properties.is_drag_started )
			return false;

		// Удаляем превьюшку, которая двигалась вместе с мышью
		document.body.removeChild( that.drag_and_drop_properties.dragging_image );

		// Перемещаем блок с файлом на новое место - перед заглушкой
		that.files_block_container.insertBefore( that.drag_and_drop_properties.current_dragging_object, that.dummy_single_file_container );

		// Удаляем заглушку
		that.files_block_container.removeChild( that.dummy_single_file_container );

		// Отображаем блок с файлом, восстанавливаем предыдущее значение свойства display
		that.drag_and_drop_properties.current_dragging_object.style.display = that.drag_and_drop_properties.dragging_object_previous_display_state;

		// Возвращаем предыдущие обработчики более ненужных нам событий
		document.onmousemove = that.drag_and_drop_properties.document_onmousemove_previous_listener;
		document.onmouseup = that.drag_and_drop_properties.document_onmouseup_previous_listener;

		document.ondragstart = that.drag_and_drop_properties.document_ondragstart_previous_listener;
		document.body.onselectstart = that.drag_and_drop_properties.document_body_onselectstart_previous_listener;

		// Пересортируем все order от текущего элемента и дальше
		reorder_files( that.drag_and_drop_properties.dummy_position );


		// Подчищаем структуру d&d
		clear_drag_and_drop_structure();

		return false;
	};



	//******************************************************************************************************************************************************************************
	// Функция перемещения блока заглушки на новую позицию
	//
	var move_dummy = function( mouse_x_position, mouse_y_position )
	{
		// Если мы тут, значит все структуры проинициализированы, подготовительные работы проведены и мы готовы к перемещению
		// Сравним координаты мыши с каждым из блоков
		for( var i = 0; i < that.drag_and_drop_properties.file_blocks.length; i++ )
		{
			var current_block = that.drag_and_drop_properties.file_blocks[ i ];

			// Если курсор мыши за пределами текущего перебираемого файлового блока
			if( mouse_x_position < current_block.left || mouse_x_position > current_block.right || mouse_y_position < current_block.top || mouse_y_position > current_block.bottom )
				continue;

			// Тут есть хитрый момент: у нас заглушка встает на место одного из файловых блоков, поэтому если мы двигаем блок вправо, то надо его смещать на позицию на 1 больше
			var new_position = i >= that.drag_and_drop_properties.dummy_position ? i+1 : i;

			// Передвинем блок на определенную позицию
			that.dummy_single_file_container = that.files_block_container.insertBefore( that.dummy_single_file_container,	new_position < that.drag_and_drop_properties.dummy_position ?
																							current_block.block :
																							null );

			// Запомним новую позицию заглушки
			that.drag_and_drop_properties.dummy_position = new_position;

			// Пересчитаем новое положение файловых блоков
			calculate_file_containers_rects();

			return false;
		}
	};



	//******************************************************************************************************************************************************************************
	// Функция расчета местоположения всех блоков файлов
	//
	var calculate_file_containers_rects = function()
	{
		that.drag_and_drop_properties.file_blocks = [];

		var single_file_containers = that.files_block_container.querySelectorAll( "*." + that.single_file_container_class );

		var j = 0;

		for( var i = 0; i < single_file_containers.length; i++ )
		{
			var element = single_file_containers[ i ];

			var element_rects = element.getClientRects();

			// Если нам попался наш перетаскиваемый невидимый контейнер, то пропустим его
			if( element_rects.length === 0 )
				continue;

			element_rects = element_rects[ 0 ];

			that.drag_and_drop_properties.file_blocks[ j++ ] =
			{
				"block":	element,
				"top":		Math.round( element_rects.top ),
				"right":	Math.round( element_rects.right ),
				"bottom":	Math.round( element_rects.bottom ),
				"left":		Math.round( element_rects.left )
			};
		}
	};





	//******************************************************************************************************************************************************************************
	// Подчищаем структуру d&d
	//
	var clear_drag_and_drop_structure = function()
	{
		// Подчищаем структуру d&d
		that.drag_and_drop_properties.is_drag_started = false;
		that.drag_and_drop_properties.drag_enter_leave_counter = 0;
		that.drag_and_drop_properties.current_dragging_object = null;
		that.drag_and_drop_properties.dragging_image = null;
		that.drag_and_drop_properties.dragging_object_previous_display_state = null;
		that.drag_and_drop_properties.dummy_position = null;
		that.drag_and_drop_properties.file_blocks = [];
	};




	//******************************************************************************************************************************************************************************
	// Обработка события добавления файла
	//
	var add_file = function ( event, files, position )
	{
		// Если файлы выбраны через кнопку добавления файлов (а не через d&d)
		if( !files )
			files = that.input_file.files;


		for( var i = 0; i < files.length; i++ )
		{
			var file = files[ i ];


			// Проверяем файл на ограничение по минимальному размеру
			if( that.settings.limit_size_min && file.size /1024 < that.settings.limit_size_min )
			{
				that.errors_block.appendChild( get_document_fragment( that.settings.invalid_min_size_message ) );

				continue;
			}


			// Проверяем файл на ограничение по максимальному размеру
			if( that.settings.limit_size_max && file.size /1024 > that.settings.limit_size_max )
			{
				that.errors_block.appendChild( get_document_fragment( that.settings.invalid_max_size_message ) );

				continue;
			}


			// Проверяем файл на ограничение по расширениям файлов
			var file_extension = file.name.split( "." );
			file_extension = file_extension[ file_extension.length - 1 ].toLowerCase();

			if( that.settings.filetypes && that.settings.filetypes.indexOf( file_extension ) === -1 )
			{
				that.errors_block.appendChild( get_document_fragment( that.settings.invalid_file_type_message ) );

				continue;
			}


			// Если мы превысили ограничение по количеству файлов, то отменяем добавление файла
			that.number_of_files++;

			if( that.number_of_files === that.settings.limit_files )
				block_adding_of_files();
			else
			if( that.number_of_files >= that.settings.limit_files )
				return;


			var file_reader = new FileReader();


			file_reader.onloadend = function ( event )
			{
				// Сформируем структуру файла
				var file_structure =	{
									"filename":	event.target.result,
									"order":	0
								};

				var file = event.target.file;

				// Получаем полностью готовый HTML фрагмент документа с одним файлом
				var single_file_element = get_file_container_code( file_structure );

				if( single_file_element === null )
				{
					console.log( "Error: Unable to add file: unable to create single file element" );
					return;
				}


				insert_new_single_file_block_at_position( single_file_element, position ? position : null );

				// Пересортируем все файловые контейнеры как минимум для того, чтобы у нашего нового контейнера выставился правильный order
				reorder_files( 0 );

				// Проставим обработчики необходимых событий
				set_events( single_file_element );

				// Если у нас включен автоаплоад, то сразу отправляем этот файл
				if( that.settings.autoupload )
					post_file( single_file_element, file );
				else
				{
					that.delayed_upload.single_file_containers[ that.delayed_upload.single_file_containers.length ]	= single_file_element;
					that.delayed_upload.files[ that.delayed_upload.files.length ]							= file;
				}
			};

			file_reader.file = file;
			file_reader.readAsDataURL( file );
		}


		// Очистим значение инпута с файлами чтобы корректно обрабатывалось изменение
		that.input_file.value = "";
	};




	//******************************************************************************************************************************************************************************
	// Обработка события удаления файла
	//
	var delete_file = function ( element )
	{
		// Внесем в форму информацию об удаленном элементе
		// Добавим хидден инпут с old_order элемента
		var input = document.createElement( "input" );
		input.setAttribute( "type", "hidden" );
		input.setAttribute( "name", get_element_name( "delete_order" ) );
		input.setAttribute( "value", element.querySelector( "input[name=\"" + get_element_name( "old_order" ) + "\"]" ).value );
		that.upload_container.appendChild( input );

		// Запоминаем порядковый номер элемента
		var order = element.querySelector( "input[name=\"" + get_element_name( "order" ) + "\"]" ).value;

		// Удаляем контейнер файла
		that.files_block_container.removeChild( element );

		// Пересортируем все последующие элементы
		reorder_files( order - 1 );


		// Если у нас была блокировка механизма добавления файлов и мы вышли из ограничения, то включим механизм обратно
		if( that.number_of_files === that.settings.limit_files )
			unblock_adding_of_files();

		that.number_of_files--;
	};




	//******************************************************************************************************************************************************************************
	// Обработка события удаления файла
	//
	var rotate_image = function ( element )
	{
		alert( "Not supported yet" );
	};



	//******************************************************************************************************************************************************************************
	// Отправка файла
	//
	var post_file = function( single_file_element, file )
	{
		// Удостоверимся, что у файлового блока стоит правильный первоначальный набор классов состояния:
		//  если у файлового блока не стоит класс single_file_container_not_loaded_state или стоит single_file_container_uploaded_state,
		//  single_file_container_uploading_state, single_file_container_error_state, то откажемся грузить этот файл
		if(	!single_file_element.classList.contains( that.settings.single_file_container_not_loaded_state ) ||
			single_file_element.classList.contains( that.settings.single_file_container_uploaded_state ) ||
			single_file_element.classList.contains( that.settings.single_file_container_uploading_state ) ||
			single_file_element.classList.contains( that.settings.single_file_container_error_state ) )
		{
			console.log( "Error: invalid single_file_element state before upload" );

			return;
		}


		var xmlHttpRequest = new XMLHttpRequest();


		// Для начала сбросим прогресс-бар в 0% и выставим обработчик события его обновления
		var progress_bar = null;

		if( that.settings.progress_bar_class )
		{
			progress_bar = single_file_element.querySelector( "*." + that.settings.progress_bar_class );

			if( progress_bar )
			{
				progress_bar.style.width = "0%";

				// Обновляем прогресс-бар
				xmlHttpRequest.upload.onprogress = function( event, progress_bar )
				{
					if( event.lengthComputable )
						progress_bar.style.width = Math.round( event.loaded / event.total * 100 ) + "%";
				};
			}
		}


		// Уберем класс single_file_container_not_loaded_state и выставим класс single_file_container_uploading_state
		single_file_element.classList.remove( that.settings.single_file_container_not_loaded_state );
		single_file_element.classList.add( that.settings.single_file_container_uploading_state );

		// Если нужно, вызовем коллбэк загрузки одиночного файла
		if( that.settings.file_load_start_callback )
			that.settings.file_load_start_callback( that, single_file_element, file );


		// Обработчик событий отправки файлов
		xmlHttpRequest.onreadystatechange = function()
		{
			// 0: request not initialized
			// 1: server connection established
			// 2: request received
			// 3: processing request
			// 4: request finished and response is ready
			if( xmlHttpRequest.readyState !== 4 )
				return;

			// Уменьшаем значение счетчика отправок
			that.delayed_upload.upload_counter--;

			// Выставляем актуальную комбинацию классов
			single_file_element.classList.remove( that.settings.single_file_container_uploading_state );


			if( xmlHttpRequest.status === 200 )
			{
				// Выставляем актуальную комбинацию классов
				single_file_element.classList.add( that.settings.single_file_container_uploaded_state );

				// Запоминаем upload_id
				single_file_element.querySelector( "input[name=\"" + get_element_name( "upload_id" ) + "\"]" ).value = xmlHttpRequest.responseText;

				// Удалим загруженные файлы из структуры
				var index = that.delayed_upload.single_file_containers.indexOf( single_file_element );

				that.delayed_upload.single_file_containers[ index ] = null;
				that.delayed_upload.files[ index ] = null;

				// Если не было ошибок и отправился последний файл, то вызываем коллбек загрузки всех файлов
				if( !that.delayed_upload.have_errors && that.delayed_upload.upload_counter === 0 && that.settings.all_files_loaded_callback )
					that.settings.all_files_loaded_callback( that, single_file_element, file );
				else
				if( that.settings.file_loaded_callback ) // Если отправился один файл, то вызовем коллбэк для него
					that.settings.file_loaded_callback( that, single_file_element, file );
			}
			else // Если произошла ошибка
			{
				// Выставляем актуальную комбинацию классов
				single_file_element.classList.add( that.settings.single_file_container_error_state );

				// Удалим всю служебную информацию, она нам больше не нужна
				var element = single_file_element.querySelector( "input[name=\"" + get_element_name( "old_order" ) + "\"]" );
				element.parentNode.removeChild( element );

				element = single_file_element.querySelector( "input[name=\"" + get_element_name( "order" ) + "\"]" );
				element.parentNode.removeChild( element );

				element = single_file_element.querySelector( "input[name=\"" + get_element_name( "upload_id" ) + "\"]" );
				element.parentNode.removeChild( element );

				element = single_file_element.querySelector( "input[name=\"" + get_element_name( "upload_rotate_angle" ) + "\"]" );
				element.parentNode.removeChild( element );

				// Пересортируем файлы, чтобы блок с косячным файлом не вошел в список
				reorder_files( 0 );

				// Отобразим сообщение об ошибке
				that.errors_block.appendChild( get_document_fragment( that.settings.file_upload_error_message ) );

				// Установим флаг наличия ошибок
				that.delayed_upload.have_errors = true;

				// Выведем сообщение об ошибке, если требуется
				if( that.settings.file_upload_error_message )
					that.errors_block.appendChild( get_document_fragment( that.settings.file_upload_error_message ) );

				// Если нужно, вызовем коллбэк ошибки загрузки файла
				if( that.settings.file_load_error_callback )
					that.settings.file_load_error_callback( that, single_file_element, file );
			}
		};


		// Увеличиваем значение счетчика отправок
		that.delayed_upload.upload_counter++;

		// Отправляем файл: создаем форму и отправялем ее
		var form_data = new FormData();

		form_data.append( "file", file );

		xmlHttpRequest.open( "POST", that.settings.action_url, true );
		xmlHttpRequest.send( form_data );
	};




	// ======================================================================================================================
	// Вспомогательные функции
	// ======================================================================================================================


	//******************************************************************************************************************************************************************************
	// Пересортировка order у всех элементов, начиная с from_position
	//
	var reorder_files = function( from_position )
	{
		var order_inputs = that.files_block_container.querySelectorAll( "input[name=\"" + get_element_name( "order" ) + "\"]" );

		for( var i = from_position; i < order_inputs.length; i++ )
			order_inputs[ i ].value = i+1;
	};




	//******************************************************************************************************************************************************************************
	// Навешивает необходимые события с проверкой необходимости
	//
	var set_events = function( single_file_element )
	{
		//single_file_element.querySelectorAll( '*:not(input):not(select):not(option):not(textarea)' )


		single_file_element.onmousedown = drag_and_drop_onmousedown;
	};




	//******************************************************************************************************************************************************************************
	// Возвращает полностью готовый и заполненный single_file_container_code в виде фрагмента кода HTML
	//
	var get_file_container_code = function( data, is_initial_filling )
	{
		// Преобразуем наш текст контейнера в HTML
		// Т.к. нельзя напрямую через innerHTML вставить HTML-код в documentFragment, то используется такая залипуха
		var file_container_element = get_document_fragment( that.single_file_container_code );

		// Добавляем к нему наш класс, это нужно для последующей быстрой идентификации контейнеров файлов
		file_container_element.classList.add( that.single_file_container_class );


		// 1. Добаляем внутри этого single_file_container_code хидден-инпут:
		// <input name="myfile[old_order]" type="hidden" value="0" />
		var input = document.createElement( "input" );
		input.setAttribute( "type", "hidden" );
		input.setAttribute( "name", get_element_name( "old_order" ) );
		input.setAttribute( "value", data.order );
		file_container_element.appendChild( input );


		// 2. Добаляем внутри этого single_file_container_code хидден-инпут:
		// <input name="myfile[order]" type="hidden" value="" /> - выставляем value равным позиции нового файла в списке. Напоминаю, что настройками задается куда добавляется файл (в начало или в конец), а через d&d его вообще можно вставить на любую позицию.
		input = document.createElement( "input" );
		input.setAttribute( "type", "hidden" );
		input.setAttribute( "name", get_element_name( "order" ) );
		input.setAttribute( "value", data.order );
		file_container_element.appendChild( input );


		// 3. Добаляем внутри этого single_file_container_code хидден-инпут:
		// <input name="myfile[upload_id]" type="hidden" value="" /> - Идентификатор, который возвращается от сервера после аплоада файла
		input = document.createElement( "input" );
		input.setAttribute( "type", "hidden" );
		input.setAttribute( "name", get_element_name( "upload_id" ) );
		input.setAttribute( "value", "" );
		file_container_element.appendChild( input );


		// 4. Добаляем внутри этого single_file_container_code хидден-инпут:
		// <input name="myfile[upload_rotate_angle]" type="hidden" value="0" /> - Тут будет выставляться угол поворота картинки, если необходимо (0, 90, 180, 270)
		input = document.createElement( "input" );
		input.setAttribute( "type", "hidden" );
		input.setAttribute( "name", get_element_name( "upload_rotate_angle" ) );
		input.setAttribute( "value", 0 );
		file_container_element.appendChild( input );


		// Если в коде контейнера есть превьюшка, то выведем изображение в ней
		if( that.settings.single_file_container.preview_container_class && that.settings.single_file_container.preview_img )
		{
			var preview_block = file_container_element.querySelector( "." + that.settings.single_file_container.preview_container_class );

			if( preview_block === null )
			{
				console.log( "Error: Unable to find ." + that.settings.single_file_container.preview_container_class + " element in single_file_container_code" );

				return null;
			}

			// TODO: Проверить на предмет того, что это файл изображения

			var preview_element = get_document_fragment( that.settings.single_file_container.preview_img );

			var image_element = preview_element.tagName === "IMG" ? preview_element : preview_element.querySelector( "img" );

			if( image_element === null )
			{
				console.log( "Error: Unable to find <img> element in preview_img" );

				return null;
			}


			var new_img_src = "";

			// Если у нас первоначальное заполнение с переданными файлов, то нам унжно использовать пути из существующего в шаблоне img
			if( is_initial_filling )
			{
				new_img_src = image_element.getAttribute( "src" );

				// В preview_img уже прописан путь для изображения, надо лишь проверить, что в конце стоит слэш и подставить имя файла
				// Проверяем, что в конце src есть слэш
				if( new_img_src.substr( new_img_src.length -1 ) !== "/" )
					new_img_src += "/";
			}

			new_img_src += data.filename;

			image_element.setAttribute( "src", new_img_src );

			preview_block.appendChild( image_element );
		}

		// Если у нас есть кнопка удаления, то проверим, что она реально существует в коде
		if( that.settings.single_file_container.remove_class && file_container_element.querySelector( "." + that.settings.single_file_container.remove_class ) === null )
		{
			console.log( "Error: Unable to find ." + that.settings.single_file_container.remove_class + " element in single_file_container_code" );

			return null;
		}


		// Если у нас есть кнопка поворота изображения, то проверим, что она реально существует в коде
		if( that.settings.single_file_container.rotate_class && file_container_element.querySelector( "." + that.settings.single_file_container.rotate_class ) === null )
		{
			console.log( "Error: Unable to find ." + that.settings.single_file_container.rotate_class + " element in single_file_container_code" );

			return null;
		}


		// Если в коде контейнера есть блок, куда нужно вывести имя файла, то сделаем это
		if( that.settings.single_file_container.name_class )
		{
			var name_block = file_container_element.querySelector( "*." + that.settings.single_file_container.name_class );

			if( name_block === null )
			{
				console.log( "Error: Unable to find ." + that.settings.single_file_container.name_class + " element in single_file_container_code" );
				return null;
			}

			name_block.innerHTML = data.filename;
		}


		// Если в коде контейнера есть блок, куда нужно вывести размер файла, то сделаем это
		if( that.settings.single_file_container.size_class )
		{
			var size_block = file_container_element.querySelector( "*." + that.settings.single_file_container.size_class );

			if( size_block === null )
			{
				console.log( "Error: Unable to find ." + that.settings.single_file_container.size_class + " element in single_file_container_code" );
				return null;
			}

			// TODO: Доделать! Разобраться, как получить размер изображения.
			size_block.innerHTML = "0";
		}



		// Если у нас первоначальная инициализация, то выставим класс single_file_container_uploaded_state, иначе - single_file_container_not_loaded_state
		file_container_element.classList.add( is_initial_filling ? that.settings.single_file_container_uploaded_state : that.settings.single_file_container_not_loaded_state );



		// Если у нас в аплоаде есть форма, то нам должны были передать поля для нее, их надо тоже выставить
		if( is_initial_filling )
			for( var field in data )
			{
				// Пропускаем уже обработанные элементы
				if( field === "filename" || field === "order" )
					continue;

				var form_element = file_container_element.querySelector( "*[name=\"" + get_element_name( field ) + "\"]" );

				if( form_element )
					form_element.value = data[ field ];
			}


		return file_container_element;
	};




	//******************************************************************************************************************************************************************************
	// Вставляет фрагмент кода единичного файла на определенную позицию
	// position = null - добавление в конец (или в начало, в зависимости от add_files_at_end)
	// Возвращает ссылку на вставленный чайлд
	//
	var insert_new_single_file_block_at_position = function( single_file_element, position )
	{
		var target_child;

		// Если у нас указано, что новые файлы должны добавляться в конец, то соответствующим образом поправим позицию
		if( that.settings.add_files_at_beginning && position === null )
			position = 0;

		// Вставка в начало files_block_container
		if( position === 0 )
		{
			// Тут может возникнуть ситуация, когда кнопка добавления файлов находится внутри контейнера файлов и расположена в начале списка, тогда вставка происходит не в начало, а после этой кнопки
			if( that.add_button_inside_file_container && !that.settings.add_file_block_at_end )
				target_child = that.files_block_container.insertBefore( single_file_element, that.add_file_block.nextSibling );
			else
			{
				if( that.files_block_container.firstChild )
					target_child = that.files_block_container.insertBefore( single_file_element, that.files_block_container.firstChild );
				else
					target_child = that.files_block_container.appendChild( single_file_element );
			}
		}
		else
		if( position === null ) // Вставка в конец files_block_container
		{
			// Тут может возникнуть ситуация, когда кнопка добавления файлов находится внутри контейнера файлов и расположена в конце списка, тогда вставка происходит не в конец, а перед этой кнопкой
			if( that.add_button_inside_file_container && that.settings.add_file_block_at_end )
				target_child = that.files_block_container.insertBefore( single_file_element, that.add_file_block );
			else
				target_child = that.files_block_container.appendChild( single_file_element );
		}
		else // Вставка на произвольную позицию
		{
			// Найдем все контейнеры файлов
			var single_file_containers = that.files_block_container.querySelectorAll( "*." + that.single_file_container_class );

			for( var i = 0; i < single_file_containers.length; i++ )
			{
				var element = single_file_containers[ i ];

				// Может так получиться, что файловые блоки приходят не по порядку и из-за этого вставка в середину несколько сложная
				var element_order = element.querySelector( "input[name=\"" + get_element_name( "order" ) + "\"]" ).value - 1;

				if( element_order !== position )
					continue;

				target_child = that.files_block_container.insertBefore( single_file_element, element );

				reorder_files( position );

				break;
			}
		}


		return target_child;
	};




	//******************************************************************************************************************************************************************************
	// Формирует имя для элемента формы, т.к. оно может отличаться в зависимости от того, как много файлов можно добавлять
	//
	var get_element_name = function( name )
	{
		return ( that.settings.multiple_style_names || that.settings.limit_files > 1 ?
				that.settings.data_input_name + "[" + name + "]" :
				that.settings.data_input_name + "_" + name ) +
				( that.settings.multiple_style_names ? "[]" : "" );
	};




	//******************************************************************************************************************************************************************************
	// Формирует фрагмент документа из текстового html.
	// Допускается передавать только единичный элемент
	//
	var get_document_fragment = function( html )
	{
		var element = document.createElement( "template" );

		element.innerHTML = html;

		return element.content.firstChild;
	};




	//******************************************************************************************************************************************************************************
	// Отключает функционал добавления файлов
	//
	var block_adding_of_files = function()
	{
		// Навешиваем событие выбора файла
		that.input_file.onchange = function ()
		{
			return false;
		};


		// Навешиваем событие
		that.add_file_block.onclick = function ( event )
		{
			return false;
		};


		if( that.settings.add_file_block_disable_class )
			that.add_file_block.classList.add( that.settings.add_file_block_disable_class );
	};




	//******************************************************************************************************************************************************************************
	// Включает функционал добавления файлов
	//
	var unblock_adding_of_files = function()
	{
		// Навешиваем событие выбора файла
		that.input_file.onchange = add_file;


		// Навешиваем событие
		that.add_file_block.onclick = function ( event )
		{
			that.input_file.click();

			return false;
		};


		if( that.settings.add_file_block_disable_class )
			that.add_file_block.classList.remove( that.settings.add_file_block_disable_class );
	};



	//******************************************************************************************************************************************************************************
	//
	//
	var merge_settings = function ( initial_settings, new_settings )
	{
		for( var key in new_settings )
		{
			try
			{
				// Property in destination object set; update its value.
				if ( new_settings[ key ].constructor === Object )
					initial_settings[key] = merge_settings( initial_settings[ key ], new_settings[ key ] );
				else
					initial_settings[ key ] = new_settings[ key ];
			}
			catch( e )
			{
				// Property in destination object not set; create it and set its value.
				initial_settings[ key ] = new_settings[ key ];
			}
		}

		return initial_settings;
	};



	//******************************************************************************************************************************************************************************
	// Создание аплоадера
	//
	this.create = function()
	{
		// Объединение настроек по умолчанию с переданными настройками
		// Дополняем входные настройки дефолтными значениями
		this.settings = merge_settings( this.default_settings, this.settings );


		// Проверим, что указан адрес отправки файлов
		if( !this.settings.action_url )
		{
			console.log( "Error: you have to set action element in your settings" );
			console.log( "Error: upload binding to #" + this.settings.bind_container + " aborted" );

			return null;
		}


		// Проверим, что указаны все статусные классы
		if( !this.settings.single_file_container_not_loaded_state )
		{
			console.log( "Error: you have to set single_file_container_not_loaded_state element in your settings" );
			console.log( "Error: upload binding to #" + this.settings.bind_container + " aborted" );

			return null;
		}


		if( !this.settings.single_file_container_uploaded_state )
		{
			console.log( "Error: you have to set single_file_container_uploaded_state" );
			console.log( "Error: upload binding to #" + this.settings.bind_container + " aborted" );

			return null;
		}


		if( !this.settings.single_file_container_uploading_state )
		{
			console.log( "Error: you have to set single_file_container_uploading_state" );
			console.log( "Error: upload binding to #" + this.settings.bind_container + " aborted" );

			return null;
		}


		if( !this.settings.single_file_container_error_state )
		{
			console.log( "Error: you have to set single_file_container_error_state" );
			console.log( "Error: upload binding to #" + this.settings.bind_container + " aborted" );

			return null;
		}


		// Браузер должен поддерживать механизм FileReader, без него ничего не получится
		if( !window.FileReader )
		{
			console.log( "Error: Unable to add file: your browser doesn't support FileReader mechanism" );
			console.log( "Error: upload binding to #" + this.settings.bind_container + " aborted" );

			return null;
		}


		// ***
		// Ищем bind_container и вставляем в него содержимое container_code
		var bind_container = document.getElementById( this.settings.bind_container );
		//var bind_container = this.settings.bind_container;

		if( bind_container === null )
		{
			console.log( "Error: Unable to find #" + this.settings.bind_container + " in document" );
			console.log( "Error: upload binding to #" + this.settings.bind_container + " aborted" );

			return null;
		}


		// container_code может содержать как html-код, так и id div. Определим, какой у нас вариант
		if( this.settings.container_code.substring( 0, 1 ) === "#" )
		{
			var  container_code = document.getElementById( this.settings.container_code.substr( 1 ) );

			if( container_code === null )
			{
				console.log( "Error: Unable to find " + this.settings.container_code + " in document" );
				console.log( "Error: upload binding to #" + this.settings.bind_container + " aborted" );

				return null;
			}

			bind_container.innerHTML = container_code.innerHTML.trim();
		}
		else
			bind_container.innerHTML = this.settings.container_code.trim();

		this.upload_container = bind_container.firstChild;


		// single_file_container_code может содержать как html-код, так и id div. Определим, какой у нас вариант
		if( this.settings.single_file_container.single_file_container_code.substring( 0, 1 ) === "#" )
		{
			var  container_code = document.getElementById( this.settings.single_file_container.single_file_container_code.substr( 1 ) );

			if( container_code === null )
			{
				console.log( "Error: Unable to find " + this.settings.single_file_container.single_file_container_code + " in document" );
				console.log( "Error: upload binding to #" + this.settings.bind_container + " aborted" );

				return null;
			}

			this.single_file_container_code = container_code.innerHTML.trim();
		}
		else
			this.single_file_container_code = this.settings.single_file_container.single_file_container_code.trim();


		// ***
		// Добавляем скрытый инпут, т.к. клик по нему - единственный способ открыть окно выбора файлов
		this.input_file = document.createElement( "input" );

		this.input_file.type="file";
		this.input_file.style.display = "none";

		// Собираем строчку форматов, которые мы принимаем в качестве файлов, которые можно добавлять
		var accept_types = "";

		for( var i = this.settings.filetypes.length; i--; )
		{
			var extension = this.settings.filetypes[ i ];

			if( accept_types )
				accept_types += ", ";

			accept_types += ( this.graphics_formats.indexOf( extension ) === -1 ? "application/" : "image/" ) + extension;
		}


		this.input_file.setAttribute( "accept", accept_types );

		if( this.settings.multiselect )
			this.input_file.setAttribute( "multiple", true );

		this.input_file = this.upload_container.appendChild( this.input_file );


		// ***
		// Удостоверимся, что нам есть куда выводить ошибки
		this.errors_block = bind_container.querySelector( "*." + this.settings.error_block_class );

		if( this.errors_block === null )
		{
			console.log( "Error: Unable to find ." + this.settings.error_block_class + " in container_code" );
			console.log( "Error: upload binding to #" + this.settings.bind_container + " aborted" );

			return null;
		}



		// ***
		// Ищем внутри container_code блок files_block_class
		this.files_block_container = bind_container.querySelector( "*." + this.settings.files_block_class );

		if( this.files_block_container === null )
		{
			console.log( "Error: Unable to find ." + this.settings.files_block_class + " in container_code" );
			console.log( "Error: upload binding to #" + this.settings.bind_container + " aborted" );

			return null;
		}



		// ***
		// Ищем внутри bind_container блок add_file_block_class
		this.add_file_block = bind_container.querySelector( "*." + this.settings.add_file_block_class );

		if( this.add_file_block === null )
		{
			console.log( "Error: Unable to find ." + this.settings.add_file_block_class + " in bind_container" );
			console.log( "Error: upload binding to #" + this.settings.bind_container + " aborted" );

			return null;
		}


		// Выясним, кнопка добавления файлов находится внутри или снаружи файлового контейнера
		var add_file_block_parent_node = this.add_file_block.parentNode;

		while( add_file_block_parent_node !== bind_container )
		{
			if( add_file_block_parent_node === this.files_block_container )
			{
				this.add_button_inside_file_container = true;
				break;
			}

			add_file_block_parent_node = add_file_block_parent_node.parentNode;
		}


		// Навешиваем листенер на кнопку добавления файлов
		unblock_adding_of_files();


		// Приводим допустимые расширения файлов к нижнему регистру для того, чтобы поиск работал корректно
		if( that.settings.filetypes )
			for( var i = that.settings.filetypes.length; i--; )
				that.settings.filetypes[ i ] = that.settings.filetypes[ i ].toLowerCase();


		// Добавляем в files_block_container контейнеры файлов (single_file_container_code), переданные при инициализации, т.е. ранее загруженные файлы
		if( this.settings.current_files )
			for( var i = 0; i < this.settings.current_files.length; i++ )
			{
				// Если мы превысили ограничение по количеству файлов, то не будем добавлять файл
				if( this.number_of_files >= this.settings.limit_files )
					break;


				var file = this.settings.current_files[ i ];

				// Получаем полностью готовый HTML фрагмент документа с одним файлом
				var single_file_element = get_file_container_code( file, true );

				if( single_file_element === null )
				{
					console.log( "Error: upload binding to #" + this.settings.bind_container + " aborted" );

					return null;
				}


				var inserted_single_file_element = insert_new_single_file_block_at_position( single_file_element, null ); //data.order );

				// Навешиваем события для drag&drop
				set_events( inserted_single_file_element );

				this.number_of_files++;
			}


		// Если мы превысили ограничение по количеству файлов, то не будем добавлять файл
		if( this.number_of_files >= this.settings.limit_files )
			block_adding_of_files();


		// ***
		// Навешиваем событие добавления файла через d&d, если это необходимо
		if( this.settings.add_files_via_drag_and_drop )
		{
			if( !this.settings.add_file_via_drag_and_drop_class )
			{
				console.log( "Error: add_file_via_drag_and_drop_class not set when add_files_via_drag_and_drop is enabled" );
				console.log( "Error: upload binding to #" + this.settings.bind_container + " aborted" );

				return null;
			}


			// Ищем блок, который принимает новые файлы
			var add_file_via_drag_and_drop_container = bind_container.querySelector( "*." + this.settings.add_file_via_drag_and_drop_class );

			if( this.add_file_via_drag_and_drop_container === null )
			{
				console.log( "Error: Unable to find ." + this.settings.add_file_via_drag_and_drop_container + " in bind_container" );
				console.log( "Error: upload binding to #" + this.settings.bind_container + " aborted" );

				return null;
			}


			// Навешиваем события
			add_file_via_drag_and_drop_container.ondragenter = function ( event )
			{
				that.drag_and_drop_properties.drag_enter_leave_counter++;

				if( that.drag_and_drop_properties.drag_enter_leave_counter  !== 1 )
					return false;


				// Навешиваем обработчики событий
				add_file_via_drag_and_drop_container.ondragover = function ( event )
				{
					// Передвинем заглушку на новое место, если это необходимо
					move_dummy( event.clientX, event.clientY );

					return false;
				};


				add_file_via_drag_and_drop_container.ondragleave = function ()
				{
					// Т.к. это событие срабатывает неадекватно, часто вызывается на дочерних элементах, то для контроля корректности реализуем счетчик входов-выходов
					that.drag_and_drop_properties.drag_enter_leave_counter--;

					if( that.drag_and_drop_properties.drag_enter_leave_counter )
						return false;

					// Удаляем заглушку
					that.files_block_container.removeChild( that.dummy_single_file_container );

					clear_drag_and_drop_structure();

					return false;
				};


				add_file_via_drag_and_drop_container.ondrop = function ( event )
				{
					// Отменяем стандартные обработчики
					event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
					event.preventDefault ? event.preventDefault() : event.returnValue = false;

					var files = event.dataTransfer.files;

					add_file( null, files, that.drag_and_drop_properties.dummy_position );


					// Удаляем заглушку
					that.files_block_container.removeChild( that.dummy_single_file_container );

					// TODO: Возвращаем предыдущие обработчики более ненужных нам событий
//					document.onmousemove = that.drag_and_drop_properties.document_onmousemove_previous_listener;
//					document.onmouseup = that.drag_and_drop_properties.document_onmouseup_previous_listener;
//
//					document.ondragstart = that.drag_and_drop_properties.document_ondragstart_previous_listener;
//					document.body.onselectstart = that.drag_and_drop_properties.document_body_onselectstart_previous_listener;

					// Пересортируем все order от текущего элемента и дальше
					reorder_files( that.drag_and_drop_properties.dummy_position );

					// Подчищаем структуру d&d
					clear_drag_and_drop_structure();


				};


				// Вычислим текущее местоположение всех файловых блоков
				// Переберем все контейнеры одиночных файлов и запомним их координаты двух диагональных угловых точек, т.е. закэшируем координаты,
				// это позволит нам в будущем очень быстро вычислять новое местоположение заглушки
				calculate_file_containers_rects();

				// Передвинем заглушку на новое место, если это необходимо
				move_dummy( event.clientX, event.clientY );


				return false;
			};


		}



		// ***
		// Навешиваем события для сортировки файлов через d&d, если это необходимо
		if( !this.settings.dummy_single_file_container )
		{
			console.log( "Error: Can't find dummy container" );
			console.log( "Error: upload binding to #" + this.settings.bind_container + " aborted" );

			return null;
		}


		this.dummy_single_file_container = get_document_fragment( this.settings.dummy_single_file_container );
	};





	//******************************************************************************************************************************************************************************
	// Загрузка всех незагруженных файлов
	//
	this.upload_all = function( success_callback )
	{
		var have_files_for_upload = false;

		// Проверим, может, ничего не надо делать

		// Если у нас не автоаплоад, то надо проверить, есть ли у нас вообще вообще файлы на отправку
		if( !that.settings.autoupload )
			for( var i = 0; i < that.delayed_upload.single_file_containers.length; i++ )
				if( that.delayed_upload.files[ i ] !== null )
				{
					have_files_for_upload = true;

					break;
				}


		if(	that.settings.all_files_loaded_callback &&
			(
				( that.settings.autoupload && that.delayed_upload.upload_counter === 0 ) ||	// У нас автоаплоад и все файлы уже загружены
				( !that.settings.autoupload && !have_files_for_upload )					// У нас не автоаплоад, но грузить нечего
			) )
		{
			that.settings.all_files_loaded_callback( that );

			return;
		}


		// Сбросим флаг наличия ошибок
		that.delayed_upload.have_errors = false;

		// Отправляем файлы
		for( var i = 0; i < that.delayed_upload.single_file_containers.length; i++ )
		{
			// Пропускаем ранее загруженные файлы, если у нас повторный вызов этой функции
			if( that.delayed_upload.single_file_containers[ i ] === null )
				continue;

			post_file( that.delayed_upload.single_file_containers[ i ], that.delayed_upload.files[ i ] );
		}
	};
}


