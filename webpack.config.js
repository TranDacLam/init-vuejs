const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = env => {
    return {
        mode: env.NODE_ENV === 'production' ? 'production' : 'development',
        performance: {
            hints: false
        },
        entry: {
            main: './storefront/main.js'
        },
        output: {
            filename: 'js/[name].js',
            chunkFilename: 'js/[name].[hash].js',
            path: path.resolve(__dirname, 'public/storefront'),
        },
        // optimization: {
        //     splitChunks: {
        //         chunks: 'all',
        //     },
        // },
        devtool: 'cheap-source-map',
        plugins: [
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: 'css/main.css'
            }),
            new CopyPlugin({
                patterns: [
                    { from:'storefront/assets/images', to:'img' }
                ],
            }),
            new Dotenv()
        ],
        resolve: {
            modules: [
                "node_modules"
            ],
            extensions: [".js", ".scss"]
        },
        module: {
            rules: [
                // {
                //     test: /\.js$/,
                //     include: [path.resolve(__dirname, "storefront")],
                //     exclude: /(node_mdoules|bower_components)/,
                //     use: [
                //         {
                //             loader: "babel-loader"
                //         }
                //     ]
                // },
                {
                    test: /\.((c|sa|sc)ss)$/i,
                    include: [
                        path.resolve(__dirname, "storefront/assets", "scss")
                    ],
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: '../'
                            },
                        },
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: "resolve-url-loader"
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: env.NODE_ENV === 'production' ? true : false,
                                outputStyle: "compressed"
                            }
                        }
                    ],  
                    
                },
                {
                    test: /\.(png|svg|jpe?g|gif)$/,
                    include: [
                        path.resolve(__dirname, "storefront")
                    ],
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                outputPath: 'img/',
                                // publicPath: 'storefront/img/'
                            }
                        }
                    ]
                },
                { 
                    test: /\.hbs$/, 
                    exclude: /(node_modules|bower_components)/,
                    include: [
                        path.resolve(__dirname, "storefront", "templates")
                    ],
                    use: [
                        {
                            loader: "handlebars-loader",
                            query: {
                                helperDirs: path.resolve(__dirname, "./storefront"),
                            }
                        }
                    ]
                }
            ],
        }
    }
};