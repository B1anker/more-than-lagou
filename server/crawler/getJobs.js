import urlencode from 'urlencode'
import http from './http'
import db from '../database'

let col = null

function insertIntoDataBase (jobs) {
  jobs.map((job) => {
    col.insert(job)    
  })
}

let pageCount = 0

function getJobs(pageNum, city, keyword) {
  let url = ''
  if (pageNum === 1) {
    url = 'https://www.lagou.com/jobs/positionAjax.json?city=' + urlencode(city) + '&first=false&kd=' + urlencode('前端') + '&pn=' + 1
  } else {
    url = 'https://www.lagou.com/jobs/positionAjax.json?city=' + urlencode(city) + '&first=false&kd=' + urlencode('前端') + '&pn=' + pageNum
  }
  return new Promise((resolve, reject) => {
    http.get(url).then(async (res) => {
      if (res.data.success === false) {
        console.log('操作频繁，一分钟后继续爬取')
        setTimeout(() => {
          getJobs(pageNum, city, keyword)
        }, 60 * 1000)
        return
      }
      const data = res.data
      if (!pageCount) {
        pageCount = ~~(data.content.positionResult.totalCount / data.content.pageSize)
        console.log('0%')
      } else if (pageNum <= pageCount) {
        console.log(((pageNum / pageCount) * 100).toFixed(2) + '%')
      } else {
        resolve()
        return
      }
      await col.insert(data.content.positionResult.result[0])
      setTimeout(() => {
        getJobs(++pageNum, city, keyword)
      }, pageNum % 3 === 0 ? 5000 : 20000)
    })
  })
}

async function runJobs () {
  col = await db.connect('job')
  console.time()
  await getJobs(1, '广州', '前端')
  console.timeEnd('爬虫结束')
}

export default runJobs