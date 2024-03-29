/**
 * Created by Administrator on 2020/12/29.
 */
import axios from 'axios'
import { MessageBox, Message } from 'element-ui'

const myAppUrl = window.appConig;

const service = axios.create(
  {
    baseURL:myAppUrl.robotURL, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 10000 // request timeout
  }
)
// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data;

    // if the custom code is not 20000, it is judged as an error.
    if (response.data.code !== 20000) {
      Message({
        message: res.result || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
    }
    else {
      return res
    }

  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
