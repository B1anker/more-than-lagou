import React, { Component } from 'react'
import { DatePicker } from 'antd'
import 'antd/dist/antd.less'

export default class App extends Component {
  render () {
    return (
      <div>
        <DatePicker onChange={this.change.bind(this)} />
      </div>
    )
  }

  change (date: any, dateString: any) {
    console.log(date, dateString)
  }
}