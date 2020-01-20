
export const SHOW_LIST		= "SHOW_LIST";
export const EDIT_ELEMENT	= "EDIT_ELEMENT";

export const SAVE_ENTITY_SUCCESS = "SAVE_ENTITY_SUCCESS";

export const DELETE_ENTITY_STARTED = "DELETE_ENTITY_STARTED";
export const DELETE_ENTITY_SUCCESS = "DELETE_ENTITY_SUCCESS";
export const DELETE_ENTITY_FAIL = "DELETE_ENTITY_FAIL";
export const CLONE_ENTITY_STARTED = "CLONE_ENTITY_STARTED";
export const CLONE_ENTITY_SUCCESS = "CLONE_ENTITY_SUCCESS";
export const CLONE_ENTITY_FAIL = "CLONE_ENTITY_FAIL";
export const ADD_CHILD_STARTED = "ADD_CHILD_STARTED";
export const ADD_CHILD_SUCCESS = "ADD_CHILD_SUCCESS";
export const ADD_CHILD_FAIL = "ADD_CHILD_FAIL";


const initialState =
	{
		showEditForm: false,

		listForm: () => null,
		editForm: () => null
	};



const reducer = ( state = initialState, action ) =>
{
	switch( action.type )
	{
		case SHOW_LIST:
			return (
				{
					...state,
					showEditForm: false,
					listForm: action.payload.listForm
				} );


		case EDIT_ELEMENT:
			return (
				{
					...state,
					showEditForm: true,
					editForm: action.payload.editForm
				} );


		case SAVE_ENTITY_SUCCESS:
			if( action.payload.error === true )
				return state;
			else
				return (
					{
						...state,
						showEditForm: false
					} );


		default:
			return state;
	}
};



export default reducer;