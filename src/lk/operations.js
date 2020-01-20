
// 000-099 - Общие операции ЛК
export const OPERATION_GET_PERMISSIONS = 0;


// 100-199 - Операции поисковика
export const OPERATION_GET_SEARCH = 100;
export const OPERATION_GET_PAGE_DATA = 101;
export const OPERATION_GET_ANALYTICS = 102;


// 200-299 - Запросы по сущностям
export const OPERATION_LIST_ENTITIES = 200;					// Список только id и title
export const OPERATION_LIST_FULL_ENTITIES = 201;			// Список со всеми атрибутами
export const OPERATION_GET_ENTITY_SCHEMA = 202;				// Получение схемы
export const OPERATION_GET_ENTITY = 203;					// Получение всех атрибутов сущности по id
export const OPERATION_SAVE_ENTITY = 204;					// Сохранение сущности
export const OPERATION_DELETE_ENTITY = 205;					// Удаление сущности
export const OPERATION_CLONE_ENTITY = 206;					// Клонирование сущности
export const OPERATION_ADD_CHILD = 207;                    // Добавление потомка в сущность
export const OPERATION_GET_ID_BY_CADASTRAL_NUMBER = 210;	// Поиск id объекта по кадастровому номеру
export const OPERATION_GET_CADASTRAL_NUMBER_BY_ID = 211;	// Поиск кадастрового номера объекта по id
export const OPERATION_GET_SHORT_ENTITY = 212;				// Получение краткого списка атрибутов сущности по id (обычно только id и title)
export const OPERATION_GET_SHORT_ENTITY_BY_FIRST_LETTERS = 213;	// Получение краткого списка атрибутов сущности по первым буквам title (обычно только id и title)