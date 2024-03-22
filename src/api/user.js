import request from '@/utils/request'

// 登录接口
export const loginFn = (data) => {
  return request.post('/auth/login', data)
}
