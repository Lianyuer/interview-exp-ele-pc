const KEY = 'interview-exp-ele-token'

export const getToken = () => {
  return localStorage.getItem(KEY)
}

export const setToken = (token) => {
  return localStorage.setItem(KEY, token)
}

export const removeToken = () => {
  return localStorage.removeItem(KEY)
}
