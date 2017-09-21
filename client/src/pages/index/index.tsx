import echarts from 'echarts'
import React, { Component } from 'react'
import './index.less'

class Index extends Component {
  constructor (props) {
    super(props)
    this.state = {
      chart: null
    }
  }

  public render () {
    return (
      <div id="chart"/>
    )
  }

  public componentDidMount () {
    this.instanceEchart()
  }

  private instanceEchart () {
    const chart = echarts.init(document.querySelector('#chart'))
    this.setState({
      chart
    })
    const option = {
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      legend: {
        data: ['销量']
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    }

    // 使用刚指定的配置项和数据显示图表。
    chart.setOption(option)
  }
}

export default Index
