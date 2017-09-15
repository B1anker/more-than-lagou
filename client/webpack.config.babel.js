import webpack from 'webpack'
import path from 'path'
const debug = process.env.NODE_ENV !== 'production'

const resolve = (dir) => {
  return path.join(__dirname, '..', dir)
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
  entry: {
		app: './src/entry.tsx'
	},
  module: {
    loaders: [
			{
				test: /\.tsx?$/,
				loader: 'ts-loader'
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