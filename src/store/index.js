import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

// mutation types
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

// actions
export const actions = {}

// module
const state = {
  isLogin: false,
  auths: []
}

const mutations = {
  [LOGIN] (state, permission) {
    state.auths = permission
    state.isLogin = true
  },
  [LOGOUT] (state) {
    state.auths = []
    state.isLogin = false
  }
}

const user = {
  state,
  mutations
}

const getters = {
  user: ({ user }) => user,
  auths: ({ user }) => user.auths
}

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    user
  },
  getters,
  actions,
  plugins: [createLogger()]
})
