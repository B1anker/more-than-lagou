import axios from 'axios'
import echarts from 'echarts'
import React, { Component } from 'react'
import './index.less'

class Index extends Component {
  constructor (props) {
    super(props)
    this.state = {
      chart: null,
      salary: {}
    }
  }

  public render () {
    return (
      <div id="chart" />
    )
  }

  public async componentDidMount () {
    const data = await this.fetchJob()
    this.handleJob(data)
  }

  private instanceEchart (result) {
    const chart = echarts.init(document.querySelector('#chart'))
    this.setState({
      chart
    })
    const option = {
      backgroundColor: '#2c343c',

      title: {
        text: '前端薪资分布',
        left: 'center',
        top: 20,
        textStyle: {
          color: '#ccc',
          fontSize: 30
        }
      },

      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },

      visualMap: {
        show: false,
        min: 0,
        max: 70,
        inRange: {
          colorLightness: [0, 1]
        }
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '55%',
          center: ['50%', '50%'],
          data: Object.keys(result).map((key) => {
            return {
              value: result[key],
              name: key === 'more' ? '>40K' : `<=${key}K`
            }
          }).sort((a, b) => a.value - b.value),
          roseType: 'radius',
          label: {
            normal: {
              textStyle: {
                color: 'rgba(255, 255, 255, 0.3)'
              },
              fontSize: '20'
            }
          },
          labelLine: {
            normal: {
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.3)'
              },
              smooth: 0.2,
              length: 10,
              length2: 20
            }
          },
          itemStyle: {
            normal: {
              color: '#c23531',
              shadowBlur: 200,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },

          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay (idx) {
            return Math.random() * 200
          }
        }
      ]
    }

    // 使用刚指定的配置项和数据显示图表。
    chart.setOption(option)
  }

  /**
   * 传入用户名，获取用户的github上仓库信息
   * @param  {[type]} username [description]
   * @return {[type]}          [description]
   */
  private fetchJob () {
    return axios.get('/lagou/job').then((res) => {
      return res.data
    })
  }

  private handleJob (data) {
    const salary = {}
    data.forEach((item, index) => {
      if (salary[item.salary]) {
        salary[item.salary]++
      } else {
        salary[item.salary] = 1
      }
    })
    const result = {
      more: 0
    }
    Object.keys(salary).forEach((key) => {
      const range = Number(key.match(/-(\d*)/)[1])
      if (range <= 10) {
        result['10'] = !result['10'] ? 1 : result['10'] + 1
      } else if (range <= 20) {
        result['20'] = !result['20'] ? 1 : result['20'] + 1
      } else if (range <= 30) {
        result['30'] = !result['30'] ? 1 : result['30'] + 1
      } else if (range <= 40) {
        result['40'] = !result['40'] ? 1 : result['40'] + 1
      } else {
        result.more++
      }
    })
    this.instanceEchart(result)
    enum Color { Red = 1, Green, Blue}
    const colorName: string = Color[2]
    console.log(colorName)
  }
}

export default Index
