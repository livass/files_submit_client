### 前端项目结构
****
* /readme  
  前端项目开发文档
* /login.vue
  登录界面
* /student_class
  学生选择班级界面
* /student_work.vue
  学生选择作业界面
* /student_work_submit.vue
  学生上传文件界面
* /resetpassword
  密码重置 
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
  
### student_class
****
* layout
  ~~~
  tableData[],
  this.tableData=Array.from(res.data.class_list)
  ~~~
* intoclass:function()
  ~~~
  intoclass(index,row){
        localStorage.setItem("class",row.class)
        location.href='#/student_work'
    }
  ~~~
* create:fuction()
  ~~~
  axios.post(...)
  .then(res)...
  .catch(err)..
  return class_list
  ~~~

###student_work
****
* lay
  ~~~
  tableDate[]
  get arr1[]=work_list
  ~~~
* checkdetail:function()
  ~~~
  axios.post(...)
  .then(res)
  .catch(err)
  get res.data.work_belong+res.data.work_desc
  ~~~
* postfile:function()
  ~~~
  location.href='#/student_work_submit'
  ~~~
* previewwork:function()
  ~~~
  axios.post(...)
  .then(res)...
  .catch(err)...
  get res.data.url
  ~~~
* lookscore:function()
  ~~~
  axios.post(...)
  .then(res)...
  .catch(err)...
  get res.data.score_detail
  ~~~
* create:function()
  ~~~
  axios.post...
  ...
  get arr1=work_list
  get arr2=work_code
  ~~~
### resetpassword
****
* reset:function()
  ~~~
  axios.post(...)
  .then(res)...
  .catch(err)...
  get newpasswrd
  if newpassword==oldpassword
  ~~~

###teacher
****

* 界面框架
    ~~~
    使用Element中的Tabs组件实现整个界面的框架搭建
    ~~~
  ~~~
  <div>

    <el-tab-pane>
        <span slot="label">发布作业</span>
        ...
    </el-tab-pane>
    <el-tab-pane>
        <span slot="label">收集作业</span>
        ...
    </el-tab-pane>
    <el-tab-pane>
        <span slot="label">删除作业</span>  
        ...  
    </el-tab-pane>

  </div>
  ~~~



* 发布作业
    ~~~
    文本框中输入的数据
    {
        publish_work_name,  //输入的作业名称
        publish_work_desc,  //输入的作业内容
    }
    ~~~
    ~~~
    发布作业方法
    publish_assignments:function(){
      this.$axios.post('http://47.96.235.211:3000/publish_assignments/',{//axios实现前后端数据交互
        "token":localStorage.getItem("token"),                       //从localStorage中获取存储的token
        "work_name":this.publish_work_name,
        "work_desc":this.publish_work_desc                           //后端接收数据
      }).then(function (response){                                   //response.data存储后端返回数据
        localStorage.setItem("token",response.data.token)            //localStorage存储更新token
        if(response.data.code==0){                                   //后端接受正确数据
          alert("发布成功")                                           
          localStorage.setItem("work_code",response.data.work_code)  //使用locaStorage存储后端返回的作业码
        }
        else{                                                        //后端接受错误信息输出错误
          alert(JSON.stringify(response.data.msg))
        }
        }).catch(function (error){                                   //提交数据失败输出报错
          console.log(error);
        });
    },
    ~~~
    ~~~
    button显示作业码
    show_work_code:function(){                                //获取存储在localStorage中的作业码信息
      this.publish_work_code=localStorage.getItem("work_code")      
    },
    ~~~
* 收集作业
    ~~~
    文本框中输入的数据

    {
        download_work_code  //发布作业时得到的作业码
    }
    ~~~
    ~~~
   收集作业方法

    download_assignments:function(){
      this.$axios.post('http://47.96.235.211:3000/download_assignments',{ //axios实现前后端数据交互
        "token":localStorage.getItem("token"),                            //从localStorage中获取存储的token
        "work_code":this.download_work_code,                              //后端接收数据
      }).then(function (response){                                        //response.data存储后端返回数据
        localStorage.setItem("token",response.data.token)                 //localStorage存储更新token
        if(response.data.code==0){                                        //后端接受正确信息
          alert("成功收集")
          localStorage.setItem("download_url",response.data.download_url) //以localStorage存储后端返回的作业下载链接
        }
        else{                                                             //后端接受错误信息输出报错
          alert(response.data.msg)
        }
        }).catch(function (error){                                        //提交数据失败输出报错
          console.log(error);
        });
    },
    ~~~
    ~~~
    button显示下载链接

    show_download_url:function(){                                                         //获取存储在localStorage中的下载链接信息
      this.download_url='http://47.96.235.211:3000'+localStorage.getItem("download_url")
    }
    ~~~
* 删除作业
    ~~~
        文本框中输入的数据
        {
            delete_work_code //输入需删除的作业的作业码
        }
    ~~~
    ~~~
        删除作业方法
        delete_assignments:function(){
        this.$axios.post('http://47.96.235.211:3000/delete_assignments/',{//axios实现前后端数据交互
        "token":localStorage.getItem("token"),                            //从localStorage中获取存储的token
         "work_code":this.delete_work_code,                                //后端接收数据
        }).then(function(response){                                         //response.data存储后端返回数据
        localStorage.setItem("token",response.data.token)                 //localStorage存储更新token
        if(response.data.code==0){                                        //后端获取正确信息
            alert("删除成功")
        }
        else{                                                             //后端获取错误信息输出报错
            alert(JSON.stringify(response.data.msg))
            }
            }).catch(function(error){                                       //提交数据失败输出报错
            alert(error);
            })
        },
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
  

