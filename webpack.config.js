"use strict";

var merge = require( "webpack-merge" );



module.exports = ( env, options ) =>
{
	const commonConfig = require( "./webpack.common.config.js" );

	let additionalConfig = {};


	if( options.mode === "production" )
		additionalConfig = require( "./webpack.production.config.js" );
	else
		additionalConfig = require( "./webpack.debug.config.js" );


	return merge( commonConfig, additionalConfig );
}