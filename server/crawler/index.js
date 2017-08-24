import axios from 'axios'
import api from './api'

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

export default http