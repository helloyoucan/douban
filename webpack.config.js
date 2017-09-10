const htmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin')
module.exports = {
    //content: __dirname, //当前上下文目录路径
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'js/[name]-[hash].js',
    },
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        contentBase: './build',
        port: 8080,
        stats: { colors: true },
        proxy: {
            '/apis': {
                target: 'https://api.douban.com/v2/',
                pathRewrite: {'^/apis' : ''},
                secure: false,
                changeOrigin: true
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin(
            ['dist/*'],　 //匹配删除的文件
            {
                root: __dirname,    //根目录   　　　　　　　　　
                verbose: true,     　//开启在控制台输出信息
                dry: false       //启用删除文件
            }
        ),
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: 'body'
        }),
        require('precss'),
        require('autoprefixer'),
    ],
    module: {
        rules: [{

            test: /\.css/,
            use: [{

                loader: 'style-loader'

            }, {

                loader: 'css-loader'

            }, {
                loader: 'postcss-loader',
                options: {
                    plugins: [require('postcss-import')(), require('autoprefixer')]
                }
            }]
        },
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                }]
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }, {
                    loader: 'postcss-loader',
                    options: {
                        plugins: [require('postcss-import')(), require('autoprefixer')]
                    }
                }, {
                    loader: 'sass-loader'
                }]
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader'
                }]
            },
            {
                test: /\.pug$/,
                use: [{
                    loader: 'pug-loader'
                }]
            },
            /*{
             test:/\.(jpg|png|gif|svg)$/i,
             use:[
             {
             loader:'file-loader'
             }]
             }*/
            {
                test: /\.(jpg|png|gif|svg)$/i,
                use: [{
                    loader: 'url-loader', //小于30000的用url-loader变成base64,大于的交给file-loader处理
                    query: {
                        limit: 100, //设置url-loader处理文件大小的界限
                        name: 'assets/[name]-[hash:5].[ext]', //设置生成的文件地址及文件命名规则
                    }
                },

                    {
                        loader: 'image-webpack-loader',//压缩

                    }],
            }

        ]
    }
}