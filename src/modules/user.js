import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.use(Vuex)

const userModule = {
  state: {
    data: {
      avatar: '',
      email: '',
      name: ''
    }
  },
  getters: {
    user (state) {
      return state.data
    }
  },
  mutations: {
    GET_USER (state, user) {
      state.data = user
    }
  },
  actions: {
    getUser ({ commit }) {
      Vue.http.get('user').then(
        (response) => {
          commit('GET_USER', response.body.data)
        },
        (error) => {
          console.error(error)
        }
      )
    }
  }
}

export default userModule
