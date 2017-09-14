import React, { Component } from 'react'
import { DatePicker } from 'antd'
import 'antd/dist/antd.less'

function onChange (date, dateString) {
  console.log(date, dateString)
}

export default class App extends Component {
  render () {
    return (
      <div>
        <DatePicker onChange={onChange} />
      </div>
    )
  }
}