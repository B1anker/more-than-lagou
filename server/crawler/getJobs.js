import urlencode from 'urlencode'
import http from './http'
import db from '../database'

let col = null

function insertIntoDataBase (jobs) {
  jobs.map((job) => {
    col.insert(job)    
  })
}

function getJobs(pageNum, city, keyword) {
  let url = ''
  if (pageNum === 1) {
    url = 'https://www.lagou.com/jobs/positionAjax.json?city=' + urlencode(city) + '&first=false&kd=' + urlencode('前端') + '&pn=' + 1
  } else {
    url = 'https://www.lagou.com/jobs/positionAjax.json?city=' + urlencode(city) + '&first=false&kd=' + urlencode('前端') + '&pn=' + pageNum
  }
  http.get(url).then((res) => {
    pageNum === 1 && col.insert(res.data.content.positionResult.result[0])
  })
}

async function runJobs () {
  col = await db.connect('job')
  getJobs(1, '广州', '前端')
}

export default runJobs