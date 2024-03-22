import { loginFn } from '@/api/user'
import { getToken, setToken } from '@/utils/storage'

export default {
  namespaced: true,
  state: {
    token: getToken() || ''
  },
  mutations: {
    setUserToken(state, token) {
      state.token = token
      setToken(token)
    }
  },
  actions: {
    async loginAction(context, obj) {
      const { data } = await loginFn(obj)
      console.log(data)
      context.commit('setUserToken', data.token)
    }
  },
  getters: {}
}
