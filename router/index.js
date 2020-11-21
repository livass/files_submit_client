import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import bookbuy from '@/components/bookbuy'
import admin from '@/components/admin'


Vue.prototype.$router = Router

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path:'/bookbuy',
      name:'bookbuy',
      component:bookbuy
    },
    {
      path:'/admin',
      name:'admin',
      component:admin
    }
  ]
})
