import Vue from 'vue'
import App from './App'
// import VueResource from 'vue-resource'
import router from './router'
import componentsList from './components'
import store from './modules/store'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  componentsList,
  store,
  router,
  components: {App},
  template: '<App/>'
})
