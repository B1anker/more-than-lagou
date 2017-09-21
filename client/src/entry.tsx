import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import { start } from './lib/api'

start()

ReactDOM.render(<App />, document.querySelector('#app'))
