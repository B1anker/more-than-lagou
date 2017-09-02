import fs from 'fs';
import KoaRouter from 'koa-router'

const routes = []
const methods = []
const router = KoaRouter()

fs.readdirSync(__dirname).filter((value) => {
	//过滤自身
	return value !== 'index.js'
}).map(value => require('./' + value).default).forEach((value) => {
	routes.push(value.routes())
	methods.push(value.allowedMethods())
})

router.use('/lagou', ...routes, ...methods)

export default router
