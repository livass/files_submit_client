import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import student_work_submit from '@/components/student_work_submit'
import teacher from '@/components/teacher'
import student01 from '@/components/student01'
import student_class from '@/components/student_class'
import student_work from '@/components/student_work'
import resetpassword from '@/components/resetpassword'
import teacher_view from '@/components/teacher_view'
import student_work_submit01 from '@/components/student_work_submit01'


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
      path:'/student_work_submit',
      name:'student_work_submit',
      component:student_work_submit
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
    },
    {
      path:'/student01',
      name:'student01',
      component:student01
    },
    {
      path:'/student_class',
      name:'student_class',
      component:student_class
    },
    {
      path:'/student_work',
      name:'student_work',
      component:student_work
    },
    {
      path:'/resetpassword',
      name:'resetpassword',
      component:resetpassword
    },
    {
      path:'/teacher_view',
      name:'teacher_view',
      component:teacher_view
    },
    {
      path:'/student_work_submit01',
      name:'student_work_submit01',
      component:student_work_submit01
    }
  ]
})
