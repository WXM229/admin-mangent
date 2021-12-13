import axios from 'axios'
import { Message } from 'element-ui'
console.log(process.env, 'env')
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    let token = localStorage.getItem('user') || ''
    config.headers['token'] = token
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data;
    console.log(res, 26)
    if (res.code !== 0) {
      Message({
        message: res || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res || 'Error'))
    }
    return res
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
