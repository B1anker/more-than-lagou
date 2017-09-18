import axios from 'axios'
import React from 'react'
import config from './config'

export const start = () => {
  const instance = axios.create({
    baseURL: config.baseUrl,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
  })

  Object.defineProperties(React, {
    $http: {
      get() {
        return instance
      },

      set(newVal) {
        return newVal
      }
    }
  })
}
