const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('development'),
  __DEV__: true
};

const dirNode = 'node_modules';
const dirApp = path.join(__dirname, 'app');
const dirAssets = path.join(__dirname, 'assets');


module.exports = {
    entry: {
        vendor: ['lodash'],
        bundle: path.join(dirApp, 'index')
    },
    devtool: 'eval',
    output: {
        pathinfo: true,
        publicPath: '/',
        filename: '[name].js'
    },
    resolve: {
        modules: [dirNode, dirApp, dirAssets]
    },
    plugins: [
        new webpack.DefinePlugin(GLOBALS),
        new webpack.ProvidePlugin({
            '_': 'lodash'
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'index.ejs'),
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                ]
            },
            {
                test: /\.scss/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            includePaths: [dirAssets]
                        }
                    }
                ]
            },
            {
                test: /\.ejs$/,
                loader: 'ejs-loader'
            },
            {
                test: /\.eot(\?v=\d+.\d+.\d+)?$/,
                use: [
                      {
                        loader: 'url-loader',
                        options: {
                          name: '[path][name].[ext]'
                        }
                      }
                    ]
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 10000,
                      mimetype: 'application/font-woff',
                      name: '[path][name].[ext]'
                    }
                  }
                ]
           },
           {
                test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 10000,
                      mimetype: 'application/octet-stream',
                      name: '[path][name].[ext]'
                    }
                  }
                ]
          },
          {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 10000,
                      mimetype: 'image/svg+xml',
                      name: '[path][name].[ext]'
                    }
                  }
                ]
          },
            {
                test: /\.(jpe?g|png|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]'
                }
            }
        ]
    }
};
