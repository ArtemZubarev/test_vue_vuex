import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import Packages from '@/components/Packages'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'nav-active',
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/packages',
      name: 'Packages',
      component: Packages
    }
  ]
})
