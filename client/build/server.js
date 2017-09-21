import config from './webpack.config.babel.js'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'

const port = 8080

config.entry.unshift(`webpack-dev-server/client?http://localhost:${port}/`, "webpack/hot/dev-server") //注意点

config.plugins.push(new webpack.HotModuleReplacementPlugin())

const compiler = webpack(config)
const server = new WebpackDevServer(compiler, {
  publicPath: config.output.publicPath, //这里必须有，不然404找不到脚本
  hot: true,
  stats: { colors: true }, //命令行中增加颜色
  proxy: {
    '/lagou/*': 'http://127.0.0.1:3001'
  }
})
server.listen(port, 'localhost', (err) => {
  if (!err) {
    console.log(`Listening at ${port}`)
  } else {
    console.log(err)
  }
})