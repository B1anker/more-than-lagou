import { Button } from 'antd'
import React from 'react'
import './assets/less/common.less'
import './assets/less/reset.less'
import Index from './pages/index/index'

class App extends React.Component {

  public render () {
    return (
      <div>
        <Button type="primary">primary</Button>
        <Index />
      </div>
    )
  }
}

export default App
