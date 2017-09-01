import KoaRouter from 'koa-router'
import axios from 'axios'
import api from '../crawler/api'
import db from '../database'

const job = KoaRouter()

const http = axios.create({
  baseURL: api.baseURL,
  headers: {
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'Accept-Encoding': 'gzip, deflate, sdch',
    'Host': 'www.lagou.com',
    'Origin': 'https://www.lagou.com',
    'Referer': 'https://www.lagou.com/jobs/list_%E5%89%8D%E7%AB%AF?labelWords=&fromSearch=true&suginput=',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36',
    'Pragma': 'no-cache',
    'X-Anit-Forge-Code': 0,
    'X-Anit-Forge-Token': 'None', 
    'X-Requested-With': 'XMLHttpRequest',
    'Connection': 'keep-alive'
  }
})

job.get('/job', async (ctx, next) => {
  const params = ctx.request.body
  const col = await db
  console.log(col)
  // ctx.body = await db.find()
  // return http.post(api.job + '?city=%E5%B9%BF%E5%B7%9E&needAddtionalResult=false&isSchoolJob=0', {
  //   'first': true,
  //   'pn': 1,
  //   'kd': 'web'
  // }).then((res) => {
  //   ctx.body = res.data
  //   next()
  // })
})

export default job