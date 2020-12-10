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
* /teacher_view
  老师作业详情页面
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

* login:function()//登录功能
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

 ### resetpassword
****
* reset:function()//修改密码功能
  ~~~
  axios.post(...)
  .then(res)...
  .catch(err)...
  get newpasswrd
  if newpassword==oldpassword
  ~~~
##student(student_class+student_work+student_work_submit)
 
### student_class
****
* 对用户班级的显示，进入班级操作
* layout//用tableData进行数据的显示
  ~~~
  tableData[],
  this.tableData=Array.from(res.data.class_list)
  ~~~
* intoclass:function()//进入用户点击的班级
  ~~~
  intoclass(index,row){
        localStorage.setItem("class",row.class)
        location.href='#/student_work'
    }
  ~~~
* create:fuction()//页面加载时，从后端获取数据
  ~~~
  axios.post(...)
  .then(res)...
  .catch(err)..
  return class_list
  ~~~

###student_work
****
* 作业显示，查看详情，提交作业，预览作业，查看详情操作
* lay//布局,显示相关作业以及操作
  ~~~
  tableDate[]
  get arr1[]=work_list
  ~~~
* checkdetail:function()//查看详情操作
  ~~~
  axios.post(...)
  .then(res)
  .catch(err)
  get res.data.work_belong+res.data.work_desc
  ~~~
* postfile:function()//上传作业操作,跳转student_work_submit
  ~~~
  location.href='#/student_work_submit'
  ~~~
* previewwork:function()//预览作业上传的作业(已转PDF文件)
  ~~~
  axios.post(...)
  .then(res)...
  .catch(err)...
  get res.data.url
  ~~~
* lookscore:function()//查看分数页面
  ~~~
  axios.post(...)
  .then(res)...
  .catch(err)...
  get res.data.score_detail
  ~~~
* create:function()//页面加载
  ~~~
  axios.post...
  ...
  get arr1=work_list
  get arr2=work_code
  ~~~

### student_work_submit
*****
* 计算文件大小+确认提交+提交附件+普通上传+快速上传
* submit:function()//提交作业
  ~~~
   this.$axios.post(this.GLOBAL.config_ip+'/submit_work/', param, axios_config)
            .then((res) => {
              if(res.data.code==0){
                localStorage.setItem("token",res.data.token)
                this.$message({
                  ...
                });
  ~~~
* 计算文件大小
  ~~~
  var size=0
            var length=_f.files.length
            for(let i=0;i<_f.files.length;i++){
              size=size+_f.files[i].size/1024
            }
          size=Math.round(size)
  ~~~

axios向后端提交files,work_code,token
return res or err

* file + 附件(普通上传)
  ~~~
  console.log(Array.from(_f.files))
            // eslint-disable-next-line no-undef
            Array.from(_f.files).forEach(v => {
                param.append('file', v)
            })
            param.append('work_code',localStorage.getItem("work_code"))
            param.append('token',localStorage.getItem("token"))
  ~~~

* file + 附件(快速上传)
   ~~~
   console.log(Array.from(_f.files))
            // eslint-disable-next-line no-undef
            Array.from(_f.files).forEach(v => {
                param.append('file', v)
            })
            param.append('work_code',localStorage.getItem("work_code"))
            param.append('token',localStorage.getItem("token"))
            param.append('quick_submit',true)
   ~~~

* 确认上传
  ~~~
   this.$confirm('你上传了'+length+'个文件,你的文件总大小为'+size+'kb'+','+'是否上传', '是否上传?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {...
        }).catch())=>{..
        })
  ~~~
*********
## teacher (teacher+teacher_view)
* 教师发布作业
* 教师查看班级作业详情<下载word作业包，下载所有作业包，删除作业，作业详情>
* 教师查看学生作业提交详情<作业内容详情，单个学生作业预览，单个学生附件下载，成绩修改>

##### 教师发布作业界面框架
> 功能：
> 
> 1选择班级并发布作业 2遇到空白字段阻止发布
  <div>
    
    <el-tab-pane>
        <span slot="label">发布作业</span>
        ...
        <div id="input_box">
          <el-input ... placeholder="作业名称" v-model="publish_work_name"></el-input>
        </div>
        <div id="input_box">
          <el-input ... placeholder="作业要求" v-model="publish_work_desc"></el-input>
        </div>
        <div id="input_box">
          <el-input ... placeholder="自定义水印" v-model="text"></el-input>
        </div>
        <div id="input_box">
            <el-date-picker ... placeholder="截止日期"> </el-date-picker>
        
            <el-select ... placeholder="发布作业班级" > ...</el-select>
        </div>
    </el-tab-pane>
        <div>
          <el-button ... @click="publish_assignments" >发布作业</el-button>
        </div>
        ...

  </div>

> 发布作业页面数据定义
    
    {
        publish_work_deadline: '',//作业截止日期
        options: [],              //班级选择列表      
        publish_work_class: '',   //发布班级
        publish_work_code:'',     //作业码
        publish_work_name:'',     //发布作业名
        publish_work_desc:'',     //发布作业要求
        text:'',                  //自定义水印
    }
> 发布作业方法

    publish_assignments(){......},

##### 教师查看班级作业详情界面框架
> 功能：
> 
> 1选择班级并以列表形式显示对应的所有作业
>
> 2在列表中选择对应的作业并下载word作业包
> 
> 3在列表中选择对应的作业并下载所有作业包
> 
> 4在列表中选择对应的作业并删除该作业发布
> 
> 5在列表中选择对应的作业并跳转至对应学生作业详情页面
> 

    <el-tab-pane>
        <span slot="label" >查看作业详情</span>
            <div id="input_box">
                <el-select v-model="detail_work_class" placeholder="查看班级" @change="get_class_assignments">
                    <el-option  v-for="item in options"...> </el-option>
                </el-select>
            </div>
 
            <el-table :data="tableData" ...>

            <el-table-column prop="work_name" label="作业名"...>  </el-table-column>
            <el-table-column  label="编辑" ...>
                <template slot-scope="scope">
                    <el-button @click="download_assignments(scope.row.work_code)" ...>
                    下载word作业包
                    </el-button>

                    <el-button @click="download_assignments_plus(scope.row.work_code)" ...>
                    下载所有作业包
                    </el-button>
        
                    <el-button @click="delete_confirm(scope.$index,tableData,scope.row.work_code)" ...>
                    删除作业
                    </el-button>

                    <el-button @click="detail_assignments(scope.row.work_code)" ...>
                    作业详情
                    </el-button>
                </template>
            </el-table-column>
> 班级作业详情数据定义

    {
      delete_work_code:'', //删除作业码
      detail_work_class:'',//选择查看班级
      tableData:[],        //班级列表
    }
> 选择班级方法函数

    class_list:function(){......}  //检索教师所有班级
    get_class_assignments(){......}//获取班级列表
> 下载word作业包方法

    download_assignments(work_code){......}
> 下载所有作业包方法

    download_assignments_plus(work_code){......}
> 删除作业方法

    delete_assignments(index,tabledata,work_code){......}
    delete_confirm(index,tabledata,work_code){......}//永久删除作业预警提示
> 学生作业详情跳转方法

    detail_assignments(work_code){......}


##### 教师查看学生作业提交详情
> 功能：
> 
> 1打开页面时打印出对应作业要求及学生作业情况列表
>
> 2在列表中选择对应学生的作业并预览该学生word作业
> 
> 3在列表中选择对应学生的作业并下载该学生所有作业附件
> 
> 4在列表中选择对应学生并打开改分窗口进行打分
> 
> 5可在列表中分别按 学号 分数 提交情况 进行排序操作
> 
> 6跳转返回发布作业
>

    <el-container>
      <el-header><el-page-header @back="goBack" content="学生作业提交情况"></el-page-header> </el-header>

    <el-main>
      <div id="input_box" >
        <el-input ...placeholder="发布者" v-model="detail_publish_user_name"...></el-input>
      </div>
      <div id="input_box" >
        <el-input ...placeholder="作业名称" v-model="detail_publish_work_name"...></el-input>
      </div>
      <div id="input_box">
        <el-input ...placeholder="作业要求" v-model="detail_publish_work_desc"...></el-input>
      </div>
      <div id="input_box">
        <el-date-picker v-model="detail_publish_work_deadline" placeholder="作业截止日期"...> </el-date-picker>
      </div>
    </el-main>

    <el-main>
      <el-table...>

        <el-table-column  prop="usr"  label="学号"...>  </el-table-column>
        <el-table-column  prop="score" label="分数" ...>  </el-table-column>
        <el-table-column  prop="submitStat" label="提交状态" ...>  </el-table-column>

        <el-table-column  label="编辑" fixed="right" min-width="320">
          <template slot-scope="scope">
            <el-button @click="Preview(scope.row.usr)" ...> 预览word作业 </el-button>
            <el-button @click="Previewplus(scope.row.usr)" ...> 下载所有附件 </el-button>
            <el-button @click="showEditDialog(scope.row.usr,scope.row.submitStat)" ...>修改成绩</el-button>
          </template>      
        </el-table-column>

      </el-table>
      <!------ 修改用户成绩的对话框 ------>
      <el-dialog title="修改成绩" ...>
        <el-form :model="editForm"  ...>
          <el-form-item label="学号" ...> 
            <el-input v-model="editForm.usr" ...></el-input>
          </el-form-item>
          <el-form-item label="成绩" ...>
            <el-input-number v-model="editForm.score"  ...></el-input-number>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false" ...>取 消</el-button>
          <el-button  @click="confirm(editForm)" ...>确 定</el-button>
        </span>
      </el-dialog>

    </el-main>
    ...
    </el-container>
> 教师查看学生作业提交详情数据定义

    {
      loading:false,
      tableData_student:[],           //学生作业详情列表
      detail_publish_user_name:"",    //作业发布者
      detail_publish_work_deadline:"",//作业截止时间
      detail_publish_work_desc:"",    //作业要求
      detail_publish_work_name:"",    //作业名
      editDialogVisible: false,
      editForm:{},
      tips:"",
      tips1:"",
      test_submitStat:"",
    }
> 预览该学生word方法

    Preview(usr){{......}
> 下载该学生作业附件方法

    Previewplus(usr){{......}
> 修改成绩方法

    editUserInfo(editForm){......}//打分
    confirm(editForm){......}     //未提交作业预警
> 打开页面时显示列表方法

    created: function (){......}
> 返回前页方法

    goBack(){......}


***************


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
  

