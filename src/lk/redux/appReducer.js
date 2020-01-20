
import { combineReducers } from "redux";

import lkReducer from "lk/redux/reducer.js";
import adminReducer from "lk/components/Admin/redux/reducer.js";
//import navigationReducer from "lk/components/Admin/Navigation/redux/reducer.js";
// import elementsListReducer from "lk/components/Admin/components/ElementsList/redux/reducer.js";
// import editFormReducer from "lk/components/Admin/components/EditForm/redux/reducer.js";

import analyticsCabinetReducer from "lk/components/AnalyticsCabinet/redux/reducer.js";
import libraryFactorsReducer from "lk/components/LibraryFactors/redux/reducer.js";


const reducer = combineReducers(
	{
		lk:					lkReducer,
		admin:				adminReducer,
		libraryFactors:		libraryFactorsReducer,
		// navigation:			navigationReducer,
		// elementsList:		elementsListReducer,
		// editForm:			editFormReducer,
		analyticsCabinet:	analyticsCabinetReducer
	}
);



export default reducer;