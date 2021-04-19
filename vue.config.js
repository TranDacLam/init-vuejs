const webpack = require('webpack')

module.exports = {
	configureWebpack: {
		performance: {
			hints: false
		},
		optimization: {
			splitChunks: {
				chunks: 'async',
				maxInitialRequests: 4,
				maxAsyncRequests: 6,
				minChunks: 1,
				minSize: 1000000,
				maxSize: 1500000,
			}
		},
		// plugins: [
		// 	new webpack.ProvidePlugin({
		// 		$: 'jquery',
		// 		'$': 'jquery',
		// 		jquery: 'jquery',
		// 		jQuery: 'jquery',
		// 		'window.jquery': 'jquery',
		// 		'window.jQuery': 'jquery',
		// 		'window.$': 'jquery',
		// 		'global.jquery': 'jquery',
		// 		'global.jQuery': 'jquery',
		// 		'global.$': 'jquery',
		// 		'moment' : 'moment'
		// 	}),
		// ],
	},
	lintOnSave: false,
	devServer: {
		port: 30000
	},
	css: {
		loaderOptions: {
			scss: {
				data: `@import "fireapps-kit/src/style-loader.scss"; @import "@/styles/static/_variables.scss";`
			}
		},
		sourceMap: process.env.NODE_ENV === 'development'
	},
}
