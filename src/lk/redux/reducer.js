// @flow
import { TOGGLE_SEARCH_MODULE, TOGGLE_OFFERS_IMPORT_MODULE, TOGGLE_ADMIN_MODULE, TOGGLE_LIBRARY_FACTORS_MODULE, OPERATION_GET_PERMISSIONS_LOADING_SUCCESS } from "./actions.js";


export const IS_HELPER_VALUES_LOADING_STARTED = "IS_HELPER_VALUES_LOADING_STARTED";
export const IS_HELPER_VALUES_LOADING_SUCCESS = "IS_HELPER_VALUES_LOADING_SUCCESS";



export const REGION_CHANGE	= "REGION_CHANGE";

type Permissions =
{
	permissions: number,
	entity: string
};


type State =
{
	+currentRegionTitle: string,
	+region: string,

	permissions: Array<Permissions>,

	+showSearchModule: boolean,
	+showOffersImport: boolean,
	+showAdminModule: boolean,
	+showLibraryFactors: boolean,


	+fullItems: {},
	+loadingItems: Array<string>
};



const initialState =
	{
		currentRegionTitle: "Омская обл.",
		region: "05426864-466d-41a3-82c4-11e61cdc98ce",

		permissions: [],

		showSearchModule: true,
		showOffersImport: false,
		showAdminModule: false,
		showLibraryFactors: false,

		fullItems: {},
		loadingItems: []
	};



const reducer = ( state: State = initialState, action: string ): State =>
{
	switch( action.type )
	{
		case REGION_CHANGE:
			return (
				{
					...state,
					currentRegionTitle: action.payload.title,
					region: action.payload.id
				} );

		case TOGGLE_SEARCH_MODULE:
			return (
				{
					...state,
					showSearchModule: !state.showSearchModule
				} );

		case TOGGLE_OFFERS_IMPORT_MODULE:
			return (
				{
					...state,
					showOffersImport: !state.showOffersImport
				} );

		case TOGGLE_ADMIN_MODULE:
			return (
				{
					...state,
					showAdminModule: !state.showAdminModule
				} );


		case TOGGLE_LIBRARY_FACTORS_MODULE:
			return (
				{
					...state,
					showLibraryFactors: !state.showLibraryFactors
				} );


		case OPERATION_GET_PERMISSIONS_LOADING_SUCCESS:
			return (
				{
					...state,
					permissions: action.payload.data.permissions || []
				} );


		case IS_HELPER_VALUES_LOADING_STARTED:
			return (
				{
					...state,
					loadingItems: [ ...state.loadingItems, action.payload ]
				}
			);


		case IS_HELPER_VALUES_LOADING_SUCCESS:
			return (
				{
					...state,
					fullItems: Object.assign( {}, state.fullItems, { [action.payload.hash]: action.payload.values } ),
					loadingItems: state.loadingItems.filter( ( element: string ): boolean => element !== action.payload.hash )
				}
			);


		default:
			return state;
	}
};



export default reducer;