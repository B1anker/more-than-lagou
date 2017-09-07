import webpack from 'webpack'
import path from 'path'

const debug = process.env.NODE_ENV !== 'production'

const resolve = (arg) => {
  return path.join(__dirname, ...arg)
}

export default {
  context: path.join(__dirname),
  devtool: debug ? 'inline-sourcemap' : null,
  resolve: {
    alias: {
      '@': resolve('src')
    }
  },
  entry: './src/js/index.js',
  module: {
    loaders: [
			{
				test: /\.js?$/,
				exclude: /(node_modules)/,
				loader: 'babel-loader',
				query: {
					presets: [
						'react', 'es2015'
					],
					plugins: [
						'react-html-attrs',
						[
							"import", {
								"libraryName": "antd",
								"libraryDirectory": "lib", // default: lib
								"style": "css"
							}
						]
					], //添加组件的插件配置
				}
			},
			//下面是使用 ant-design 的配置文件
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			}, {
				test: /\.scss/,
				loader: 'style-loader!css-loader!sass-loader'
			}
		]
  },
  output: {
		path: __dirname + '/src',
		publicPath: '/src/',
		filename: "bundle.js"
	},
	plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({mangle: false, sourcemap: false})
  ]
}