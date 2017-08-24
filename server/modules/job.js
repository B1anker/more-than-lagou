import http from '../crawler'
import api from '../crawler/api'

function job () {
  return http.post(api.job + '?city=%E5%B9%BF%E5%B7%9E&needAddtionalResult=false&isSchoolJob=0', {
    'first': true,
    'pn': 1,
    'kd': 'web'
  }).then((res) => {
    console.log(res.data)
  })
}

export default job