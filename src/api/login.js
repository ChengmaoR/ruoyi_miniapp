import { request } from '../utils/request'

// 登录方法
export function wxLogin (data) {
  return request({
    url: '/system/wxLogin/login',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}

// 注册方法
export function register (data) {
  return request({
    url: '/register',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}

// 获取用户详细信息
export function getInfo (data) {
  return request({
    url: '/system/wxLogin/info',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}

// 退出方法
export function logout () {
  return request({
    url: '/logout',
    method: 'post'
  })
}

