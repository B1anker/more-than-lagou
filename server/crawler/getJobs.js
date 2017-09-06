import urlencode from 'urlencode'
import http from './http'
import db from '../database'

let col = null

const insertIntoDataBase = (jobs) => {
  jobs.map(async (job) => {
    await col.insert(job)
  })
}

let pageCount = 0

const getJobs = async (pageNum, city, keyword, resolve) => {
  const url = `https://www.lagou.com/jobs/positionAjax.json?city=${urlencode(city)}&first=${pageNum === 1}&kd=${urlencode(keyword)}&pn=${pageNum}`
  http.get(url).then(async (res) => {
    const data = res.data
    if (data.success === false) {
      console.log('操作频繁，两分钟后继续爬取')
      setTimeout(() => {
        getJobs(pageNum, city, keyword, resolve)
      }, 2 * 60 * 1000)
      return
    }
    if (!pageCount) {
      pageCount = ~~(data.content.positionResult.totalCount / data.content.pageSize)
      console.log('0%')
    } else if (pageNum <= pageCount) {
      console.log(((pageNum / pageCount) * 100).toFixed(2) + '%')
    } else {
      resolve()
      return 0
    }
    await col.insert(data.content.positionResult.result)
    setTimeout(() => {
      getJobs(++pageNum, city, keyword, resolve)
    }, pageNum % 3 === 0 ? 5000 : 20000)
  })
}

const wrap = (pageNum, city, keyword) => {
  return new Promise((resolve, reject) => {
    getJobs(pageNum, city, keyword, resolve)
  })
}

const runJobs = async () => {
  col = await db.connect('job')
  console.time('爬虫结束')
  await wrap(1, '广州', '前端')
  console.timeEnd('爬虫结束')
}

export default runJobs