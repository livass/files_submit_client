<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<template>
  <div class="发作业">
    <el-tabs type="border-card">

    <!-----------------------------------------------------------发布作业------------------------------------------------------>
      <el-tab-pane>
        <span slot="label" class="el-icon-edit">发布作业</span>
        <div id="input_box">
          <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 2}" placeholder="作业名称" v-model="publish_work_name"></el-input>
        </div>
        <div id="input_box">
          <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 12}" placeholder="作业要求" v-model="publish_work_desc"></el-input>
        </div>
        <br>
        <div id="input_box">
        <el-date-picker v-model="publish_work_deadline" type="date" placeholder="选择提交作业的截止日期"> </el-date-picker>
        
        <el-select v-model="publish_work_class" clearable placeholder="请选择接收任务的班级" >
            <el-option
              v-for="item in options"
              :key="item"
              :label="item"
              :value="item"
              >
            </el-option>
        </el-select>
        </div>
        <br/><br/>
        <div>
          <el-button type="primary" sizes="medium" plain @click="publish_assignments" icon="el-icon-s-order">点 击 即 可 发 布 作 业</el-button>
        </div>
        <br>

    </el-tab-pane>

    <!-----------------------------------------------------------收集作业------------------------------------------------------>
<!--      <el-tab-pane>
        <span slot="label">收集作业</span>
          <div id="input_box">
          </div>
          <div id="input_box">
            <el-input placeholder="作业码 #1输入作业码，点击[收集作业]" v-model="download_work_code"></el-input>
          </div>
          <br>
          <div>
          <el-link :href="download_url" type="primary" >学生作业下载链接</el-link>
          </div>
          <br>
          <br>
          <div>
            <el-button type="primary" plain @click="download_assignments">点击收集作业，获得上方下载链接更新</el-button>
          </div>

      </el-tab-pane>
-->
    <!-----------------------------------------------------------作业详情------------------------------------------------------>
      <el-tab-pane>
        <span slot="label" class="el-icon-search">查看作业详情</span>

        <div id="input_box">
        <el-select v-model="publish_work_class" clearable placeholder="请选择查看的班级" @change="get_class_assignments">
            <el-option
              v-for="item in options"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
        </el-select>
        <!-- <el-button type="primary" plain @click="get_class_assignments">确认班级</el-button> -->
        </div>
 

  <el-table
    :data="tableData"
    border
    style="width: 100%"
    height="400"
    >

    <el-table-column fixed  prop="work_name"  label="作业名"   >  </el-table-column>

    <el-table-column  fixed="right"  label="编辑"  >
      <template slot-scope="scope">

        <!-- <el-link :href="download_url" type="success" icon="el-icon-download" >学生作业下载链接</el-link> -->
        <el-button @click="handleClick(scope.row.work_code)" 
        type="text" 
        icon="el-icon-download">
        收集作业
        </el-button>
        
        <el-button
          @click="delete_assignments(scope.$index,tableData,scope.row.work_code)"
          type="text"
          icon="el-icon-delete">
          删除作业
        </el-button>


      </template>
      
    </el-table-column>


  </el-table>

      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

export default {
  data() {
    return {
      pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        publish_work_deadline: '',

      options: [],
        publish_work_class: '',

      publish_work_code:'',
      publish_work_name:'',
      publish_work_desc:'',
 //     publish_work_class:'',
      download_work_code:'',
      download_url:'',
      delete_work_code:'',
      tableData:[],
    }
  },
  mounted(){
    this.class_list();
  },
    created: function () {
    // `this` 指向 vm 实例
        this.$axios.post("http://47.96.235.211:3000/get_published_assignments_list",{
            token:localStorage.getItem("token"),
        }).then((res)=>{
            //this.tableData=Array.from(res.data.work_list)
        })

  },

  methods:{

    /* -----------------------------------发布作业方法-------------------------------------- */
    publish_assignments:function(){
      this.$axios.post('http://47.96.235.211:3000/publish_assignments/',{
        "token":localStorage.getItem("token"),
        "work_name":this.publish_work_name,
        "work_desc":this.publish_work_desc,
        "work_deadline":this.publish_work_deadline.getTime(),
        "work_class":this.publish_work_class
      }).then(function (response){
        localStorage.setItem("token",response.data.token)
        //alert(response.data.work_code);
        if(response.data.code==0){
          alert("发布成功")
          localStorage.setItem("work_code",response.data.work_code)
        }
        else if(response.data.code==26){
          alert("当前用户不在此班级，无法操作此作业")
        }
        }).catch(function (error){
          console.log(error);
        });
    },
    /* -----------------------------------收集作业方法-------------------------------------- */
/*    download_assignments:function(){
      this.$axios.post('http://47.96.235.211:3000/download_assignments',{
        "token":localStorage.getItem("token"),
        "work_code":this.download_work_code,
      }).then(function (response){
        localStorage.setItem("token",response.data.token)
        if(response.data.code==0){
        alert("收集成功")
        localStorage.setItem("download_url",response.data.download_url)
      }
        this.setState()
        }).catch(function (error){
          console.log(error);
        });
        this.download_url='http://47.96.235.211:3000'+localStorage.getItem("download_url")
    },*/
    /* -----------------------------------删除发布的作业方法-------------------------------------- */
    delete_assignments(index,rows,row){
      //rows.splice(index,1),
      this.$axios.post('http://47.96.235.211:3000/delete_assignments/',{
      "token":localStorage.getItem("token"),
      "work_code":row,
    }).then(function(response){
     // localStorage.setItem("token",response.data.token)
        rows.splice(index, 1);
        //alert(JSON.stringify(response.data.code))
        if(response.data.code==0)
          alert("删除成功")
        }).catch(function(error){
          alert(error);
        })
    },
    /********************************获取班级****************************************/
    get_class_assignments(index,rows,row){
        this.$axios.post("http://47.96.235.211:3000/get_assignments_list_by_class",{
            token:localStorage.getItem("token"),
            class:this.publish_work_class
        }).then((res)=>{
            this.tableData=Array.from(res.data.work_list)
        })


    },
    /************** 检索该老师所在班级************************************************/ 
    class_list:function(){
        this.$axios.post("http://47.96.235.211:3000/get_class_list",{
            token:localStorage.getItem("token"),
        }).then((res)=>{
            this.options=Array.from(res.data.class_list)
        })
    },
    /******************************************************************************* */
    handleClick(row){
      this.$axios.post('http://47.96.235.211:3000/download_assignments',{
        "token":localStorage.getItem("token"),
        "work_code":row,
      }).then(function (response){
        localStorage.setItem("token",response.data.token)
        //rows.splice(index, 1);
        if(response.data.code==0){
        //alert("收集成功")
        window.open('http://47.96.235.211:3000'+response.data.download_url)
      }
        this.setState()
        }).catch(function (error){
          console.log(error);
        });
    }

  }
}
</script>