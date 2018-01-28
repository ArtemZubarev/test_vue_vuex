import Vue from 'vue'
import Vuex from 'vuex'
import parcelsModule from './parcels'
import userModule from './user'

Vue.http.options.root = 'http://localhost:3000/'

const store = new Vuex.Store({
  modules: {
    parcels: parcelsModule,
    user: userModule
  }
})

export default store
