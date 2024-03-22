import { getToken, setToken } from '@/utils/storage'

export default {
  namespaced: true,
  state: {
    token: getToken()
  },
  mutations: {
    setUserToken(state, token) {
      state.token = token
      setToken(token)
    }
  },
  actions: {},
  getters: {}
}
