import webpack from 'webpack'
import path from 'path'
const tsImportPluginFactory = require('ts-import-plugin')
const debug = process.env.NODE_ENV !== 'production'

const resolve = (dir) => {
  return path.join(__dirname, dir)
}

export default {
  context: path.join(__dirname),
  devtool: debug ? 'inline-sourcemap' : null,
  resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      '@': resolve('src')
		}
  },
  entry: [
		'../src/entry.tsx'
	],
  module: {
    loaders: [
			{
        test: /\.tsx?$/,
        loader: 'tslint-loader',
        enforce: 'pre',
        exclude: /(node_modules)/
      },
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				exclude: /(node_modules)/,
        options: {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [ tsImportPluginFactory({
							libraryName: 'antd',
							libraryDirectory: 'lib',
							style: true
						}) ]
          }),
          compilerOptions: {
            module: 'es2015'
          }
        }
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			}, {
				test: /\.less/,
				loader: 'style-loader!css-loader!less-loader'
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