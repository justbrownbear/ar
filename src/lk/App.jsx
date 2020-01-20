
import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";

import store from "./redux/store.js";

import LK from "./LK.jsx";


// why-did-you-update debug messages
// if( process.env.NODE_ENV !== "production" )
// {
// 	let createClass = React.createClass;

// 	Object.defineProperty( React, "createClass",
// 		{
// 			set: (nextCreateClass) =>
// 			{
// 				createClass = nextCreateClass;
// 			}
// 		} );

// 	const {whyDidYouUpdate} = require( "why-did-you-update" );

// 	whyDidYouUpdate( React, { exclude: /^[PaginationBoxView|MessageTrigger|MessageListener|ChildBridge|Uncontrolled(Form)|Form]/ } );
// }



// Запускаем приложение...
ReactDOM.render(
	<Provider store={ store }>
		<LK />
	</Provider>,
	document.getElementById( "js__lk" )
);