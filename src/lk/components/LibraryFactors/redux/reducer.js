
export const  SHOW_LIBRARY_LIST		= " SHOW_LIBRARY_LIST";


const initialState =
	{
		listLibraryForm: () => null
	};



const reducer = ( state = initialState, action ) =>
{
	switch( action.type )
	{
		case SHOW_LIBRARY_LIST:
			return (
				{
					...state,
					listLibraryForm: action.payload.listForm
				} );

		default:
			return state;
	}
};



export default reducer;