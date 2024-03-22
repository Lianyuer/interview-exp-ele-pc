import axios from 'axios'

import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'

const instance = axios.create({
  baseURL: 'http://interview-api-t.itheima.net',
  timeout: 3000
})

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const token = store.state.user.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    if (error.response) {
      // 401 登录失效
      if (error.response.data.code == 401) {
        Message.error('登录失效，请重新登录')
        router.push('/login')
      } else {
        Message.error(error.response.data.message)
      }
    }
    return Promise.reject(error)
  }
)

export default instance
