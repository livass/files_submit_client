### 前端项目结构
****
* /readme  
  前端项目开发文档
* /login.vue
  登录界面
* /student.vue
  学生上传文件界面
* /teacher.vue
  老师发布页面
* global.vue
  全局变量
* /router/index.js
  前端路由
* /main.js
  router,axios,Element-UI配置
  <br>
### login
****
* 控件
  
control|v-model or function|id
---|:--:|---:
el-input|user|input_box
el-input|password|input_box
el-button|login|null

* login:function()
  ~~~
  {
      axios.post(config_ip+/login/{
          usr:this.user,
          pwd:this.password
      }).then(function(res){
        ...
      }).catch(function(err){
        ...
      })
  }
  ~~~
  axios向后端传递usr,pwd
  return res or err

* token
  ~~~
  localStorage.setItem("token",res.data.token);
  ~~~

* 样式表
  ~~~
  <style>
  ....
  </style>
  ~~~ 

### student
*****
* submit:function()
  ~~~
  axios.post(this.GLOBAL.config_ip+'/submit_work/', param, axios_config)
            .then((res) => {
              ...
            })
            .catch((err) => {
              ...
            })
    }
  ~~~

* axios_config
  ~~~
  { 
    'Content-Type': 'multipart/form-data' 
  }
  ~~~

axios向后端提交file,work_code,token
return res or err

* file 
  ~~~
  var param = new FormData()
        param.append('file', _f.files[0])
        param.append('work_code', work_code.value)
        param.append('token', localStorage.token)
  ~~~
  
### global
****
* config_ip
  ~~~
  const config_ip="http://47.96.235.211:3000"

    export default{
        config_ip
    }
  ~~~

### router/index.js
****
* login
  ~~~
  import login from '@/components/login'

  {
      path:'/login',
      name:'login',
      component:login
  }
  ~~~

* student
  ~~~
  import student from '@/components/student'

  {
      path:'/student',
      name:'student',
      component:student
  }
  ~~~

* teacher
  ~~~
  import teacher from '@/components/teacher'

  {
      path:'/teacher',
      name:'teacher',
      component:teacher
  }
  ~~~

### main.js
****

* vue
  ~~~
  new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  render: h=>h(App)
  })
  ~~~

* router
  ~~~
  import router from './router'
  ~~~

* Element-UI
  ~~~
  import ElementUI from 'element-ui';

  Vue.use(ElementUI);
  ~~~

* axios
  ~~~
  import axios from 'axios'
  import VueAxios from 'vue-axios'
  Vue.prototype.$axios = axios

  Vue.use(VueAxios, axios)
  ~~~

* global
  ~~~
  import global_ from './components/global'//引用文件
  Vue.prototype.GLOBAL = global_//挂载到Vue实例上面
  ~~~
  