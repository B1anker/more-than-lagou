import KoaRouter from 'koa-router'
import axios from 'axios'
import api from '../crawler/api'
import db from '../database'
import urlencode from 'urlencode'
const job = KoaRouter()

const http = axios.create({
  baseURL: api.baseURL,
  headers: {
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'Accept-Encoding': 'gzip, deflate, sdch',
    'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4',
    'Cache-Control': 'no-cache',
    'Host': 'www.lagou.com',
    'Origin': 'https://www.lagou.com',
    'Referer': 'https://www.lagou.com/jobs/list_%E5%89%8D%E7%AB%AF?labelWords=&fromSearch=true&suginput=',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36',
    'Pragma': 'no-cache',
    'X-Anit-Forge-Code': 0,
    'X-Anit-Forge-Token': 'None', 
    'X-Requested-With': 'XMLHttpRequest'
  }
})

job.get('/job', async (ctx, next) => {
  const params = ctx.request.body
  return http.get('https://www.lagou.com/jobs/positionAjax.json?city=' + urlencode('广州') + '&first=false&kd=' + urlencode('前端') + '&pn=' + 2).then((res) => {
    ctx.body = res.data
    next()
  })
})

export default job