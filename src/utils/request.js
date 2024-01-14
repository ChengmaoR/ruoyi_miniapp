import Taro from '@tarojs/taro'
import { getUserInfo } from "../utils/authwx";
import { getToken } from '../utils/auth'
// const baseUrl = 'http://172.16.100.103:9997'
const baseUrl = 'https://dianshang.upp100.com:9998'
// 请求拦截器
Taro.addInterceptor((chain) => {
  const { requestParams } = chain
  // 在发送请求之前，可以在此处对请求参数进行修改或添加公共字段
  if (requestParams.url.indexOf('http://') == -1 && requestParams.url.indexOf('https://') == -1) {
    requestParams.url = baseUrl + requestParams.url
  }
  // 是否需要设置 token
  const isToken = (requestParams.headers || {}).isToken === false
  // if (!isToken && !(getUserInfo() && getUserInfo().openid)) {
  //   console.log('用户未登录')
  // } else {
  //   console.log('用户已登录')
  // }

  // 是否需要防止数据重复提交
  // const isRepeatSubmit = (requestParams.headers || {}).repeatSubmit === false
  // if (getUserInfo() && getUserInfo().openid && !isToken) {
  //   requestParams.headers['Authorization'] = 'Bearer ' + getUserInfo().sessionKey // 让每个请求携带自定义token 请根据实际情况自行修改
  // }

  // requestParams.header = {
  //   ...requestParams.header,
  //   'Authorization': 'Bearer your_token',
  // }
  // 继续发送请求
  return chain.proceed(requestParams)
})

// 响应拦截器
Taro.addInterceptor((chain) => {
  return chain.proceed(chain.requestParams).then((res) => {
    // 在收到响应结果之后，可以在此处对响应数据进行统一处理
    if (res.statusCode === 200) {
      // 处理正常响应数据
      console.log(res.data)
    } else {
      // 处理异常响应，例如错误提示、重定向等
      Taro.showToast({
        title: '系统未知错误！',
        icon: 'error',
        duration: 2000
      })
    }
    // 返回响应结果
    return res
  })
})

// 使用封装的请求方法
export function request (config) {
  Taro.showLoading({
    title: '数据加载中',
  })
  return new Promise((resolve, reject) => {
    Taro.request({
      url: config.url,
      method: config.method,
      data: config.data,
      headers: config.headers || {},
      success: (res) => resolve(res.data),
      fail: (error) => reject(error),
      complete: () => Taro.hideLoading()
    })
  })
}
export function getBaseUrl () {
  return baseUrl
}
// // 调用方式
// request('https://example.com/api', 'GET', { param: 'value' })
//   .then((data) => {
//     // 处理成功返回的数据
//     console.log(data)
//   })
//   .catch((error) => {
//     // 处理请求失败的逻辑
//     console.log(error)
//   })
