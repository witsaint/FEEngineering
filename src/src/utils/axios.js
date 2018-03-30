import axios from 'axios'
import qs from 'qs'
/* eslint-disable */
import router from './router'
/* eslint-disable */
import {Message}from 'element-ui'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.transformRequest = [function (data) { return qs.stringify(data) }]

axios.interceptors.request.use(
  config => {
    let token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `token ${token}`
    }
    return config
  },
  err => {
    console.info('request Error:' + err)
    return Promise.reject(err)
  })

axios.interceptors.response.use(
  response => {
    if (response.data.code === 401) {
      router.push({
        path: 'login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
      // localStorage.removeItem('token')
    }
    return response
  },
  error => {
    console.info('response Error:' + err)
    return Promise.reject(error.response.data)
  })

export default axios
