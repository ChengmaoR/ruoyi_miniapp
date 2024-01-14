import { request } from '../utils/request'
import Taro from '@tarojs/taro'
export function getWs (config) {
  return new Promise((resolve, reject) => {
    Taro.request({
      url: config.url,
      method: config.method || 'GET',
      data: config.data,
      success: (res) => resolve(res.data),
      fail: (error) => reject(error)
    })
  })
}
// 获取商品详情
export function getCodeInfo (id) {
  return request({
    url: '/system/wxLogin/' + id,
    headers: {
      isToken: false
    },
    method: 'get',
  })
}
// 获取商品详情
export function codeCheck (data) {
  return request({
    url: `/system/wxLogin/check?codeId=${data.id}&openid=${data.openid}`,
    headers: {
      isToken: false
    },
    method: 'get',
  })
}
// 用吗记录
export function hasCode (data) {
  return request({
    url: `/system/wxLogin/hasCode?openid=${data.openid}`,
    headers: {
      isToken: false
    },
    method: 'get',
  })
}

