// @flow
export const OFFERS_IMPORT_LOG_LOAD_STARTED = "OFFERS_IMPORT_LOG_LOAD_STARTED";
export const OFFERS_IMPORT_LOG_LOAD_SUCCESS = "OFFERS_IMPORT_LOG_LOAD_SUCCESS";
export const OFFERS_IMPORT_LOG_LOAD_ERROR = "OFFERS_IMPORT_LOG_LOAD_ERROR";


type State =
	{
		isLogLoading: boolean,
		isLogLoadingError: boolean,
		log: Array<{}>
	};



const initialState: State =
	{
		isLogLoading: false,
		isLogLoadingError: false,
		log: []
	};



const reducer = ( state: State = initialState, action ) =>
{
	switch( action.type )
	{
		case OFFERS_IMPORT_LOG_LOAD_STARTED:
			return (
				{
					isLogLoading: true,
					isLogLoadingError: false,
					log: []
				} );

		case OFFERS_IMPORT_LOG_LOAD_SUCCESS:
			return (
					{
						isLogLoading: false,
						isLogLoadingError: false,
						log: action.payload
					} );

		case OFFERS_IMPORT_LOG_LOAD_ERROR:
			return (
				{
					isLogLoading: false,
					isLogLoadingError: true,
					log: []
				} );

		default:
			return state;
	}
};



export default reducer;