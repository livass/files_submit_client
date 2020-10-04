import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import student from '@/components/student'
import teacher from '@/components/teacher'
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
      path:'/student',
      name:'student',
      component:student
    },
    {
        path:'/teacher',
        name:'teacher',
        component:teacher
    },
    {
        path:'/login',
        name:'login',
        component:login
    }
  ]
})
