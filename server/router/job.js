import KoaRouter from 'koa-router'
import axios from 'axios'
import api from '../crawler/api'
import db from '../database'
const job = KoaRouter()

job.get('/job', async (ctx, next) => {
  await db.connect('job')
  ctx.body = await db.find()
})

export default job