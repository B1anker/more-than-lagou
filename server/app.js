import path from 'path'
import Koa from 'koa'
import router from './router'
const app = new Koa()
const port = 3001

app.use(router.routes(), router.allowedMethods())

app.listen(port, (err) => {
  if (err) {
    console.log(err)
    return
  }
  console.log(`listen in localhost:${port}`)
})