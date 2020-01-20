var webpack = require( "webpack" );

const path = require( "path" );

const CleanObsoleteChunks = require( "webpack-clean-obsolete-chunks" );
const CleanWebpackPlugin = require( "clean-webpack-plugin" );



module.exports =
{
	mode: "development",

	entry:
	{
		lk:					"./src/lk/App.jsx"
	},

	output:
	{
		path:     __dirname + "/../web/js/lk_modules",
		publicPath: "/js/lk_modules/",
		filename: "[name].js",
		chunkFilename: "[name]-[chunkhash].js"
	},

	watch: true,

	watchOptions:
	{
		aggregateTimeout: 100
	},

	optimization:
	{
		splitChunks:
		{
			chunks: "async",
			minSize: 0,
			//maxSize: 102400,
			maxAsyncRequests: Infinity,
			maxInitialRequests: Infinity,
			cacheGroups:
			{
				default: false,
				vendors:
				{
					test: /[\\/]node_modules[\\/]/,
					priority: 10,
					minChunks: 2,
					reuseExistingChunk: true,
					name( module, chunks, cacheGroupKey )
					{
						// get the name. E.g. node_modules/packageName/not/this/part.js
						// or node_modules/packageName
						const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

						// // npm package names are URL-safe, but some servers don't like @ symbols
						return `common-${packageName.replace( "@", "" )}`;

						// const moduleFileName = module.identifier().split('/').reduceRight(item => item);
						// const allChunksNames = chunks.map((item) => item.name).join('~');
						// return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
          			}
				}
			}
		}
	},

	resolve:
	{
		modules:
		[
			path.resolve( "./src" ),
			path.resolve( "./node_modules" )
		]
	},

	module:
	{
		rules:
		[
			{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules|bower_components)/,
				use:
				{
					loader: "babel-loader",
					options:
					{
						presets:
						[
							"@babel/preset-flow",
							"@babel/preset-react",
							[
								"@babel/preset-env",
								{
									targets: "> 0.25%, not dead"
								}
							]
						],

						plugins:
						[
							"@babel/plugin-syntax-dynamic-import",
							"@babel/plugin-proposal-class-properties"
						]
					}
				}
			},
			{
				test: /\.css$/,
				loaders:
				[
					"style-loader",
					{
						loader: "css-loader",
						options:
						{
							importLoaders: 1,
						},
					}
				]
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: [ { loader: "url-loader", options: { limit: 8192 } } ]
			}
		]
	},

	resolveLoader:
	{
		alias:
		{
			"copy": "file-loader?name=[path][name].[ext]&context=./src"
		},

	},

	plugins:
	[
		new webpack.ContextReplacementPlugin( /moment[\/\\]locale$/, /ru/ ),
		new webpack.ContextReplacementPlugin( /validatorjs[\/\\]src[\/\\]lang$/, /ru/ ),

		new CleanObsoleteChunks(),
		new CleanWebpackPlugin(),
		new webpack.optimize.OccurrenceOrderPlugin()
	]
};
