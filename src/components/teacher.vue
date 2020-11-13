<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<template>
<div>
 <div id="link">
    <i class="el-icon-house"></i>
<el-link type="primary" href='#/login'>退出登录</el-link>
</div>
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


    <!-----------------------------------------------------------作业详情------------------------------------------------------>
      <el-tab-pane>
        <span slot="label" class="el-icon-search">查看作业详情</span>
            <div id="input_box">
                <el-select v-model="detail_work_class" clearable placeholder="请选择查看的班级" @change="get_class_assignments">
                    <el-option
                      v-for="item in options"
                     :key="item"
                     :label="item"
                    :value="item">
                    </el-option>
                </el-select>
            </div>
 
            <el-table
            :data="tableData"
            border
            style="width: 100%"
            height="400"
            >

            <el-table-column fixed  prop="work_name"  label="作业名"   >  </el-table-column>
<!------------------------------------------- 下载作业包 ------------------------------------------------------------------------------>
            <el-table-column  fixed="right"  label="编辑"  >
                <template slot-scope="scope">
                    <el-button @click="download_assignments(scope.row.work_code)" 
                    type="text" 
                    icon="el-icon-download">
                    下载作业包
                    </el-button>
<!------------------------------------------ 删除作业 ------------------------------------------------------------------------------->        
                    <el-button
                    @click="delete_confirm(scope.$index,tableData,scope.row.work_code)"
                    type="text"
                    icon="el-icon-delete">
                    删除作业
                    </el-button>
<!----------------------------------------- 作业详情(对应作业上交情况及打分等功能界面) ------------------------------------------------->
                    <el-button
                    @click="detail_assignments(scope.row.work_code)"
                    type="text"
                    icon="el-icon-folder-opened">
                    作业详情
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
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

        },
        publish_work_deadline: '',
        options: [],                  //班级
        publish_work_class: '',
        publish_work_code:'',
        publish_work_name:'',
        publish_work_desc:'',
        download_work_code:'',
        download_url:'',
        delete_work_code:'',
        detail_work_class:'',
        tableData:[],
    }
  },
  mounted(){
    this.class_list();
  },


  methods:{
          /* -----------------------------------发布作业方法-------------------------------------- */
    publish_assignments(){
      if(!this.publish_work_name){
        this.$message({
          message:'请输入作业名称',
          type:'warning'
        })
      }
      else if(!this.publish_work_desc){
        this.$message({
          message:'请输入作业要求',
          type:'warning'
        })
      }
      else if(!this.publish_work_deadline){
        this.$message({
          message:'请选择截止日期',
          type:'warning'
        })
      }
      else if(!this.publish_work_class){
        this.$message({
          message:'请选择班级',
          type:'warning'
        })
      }
      else{
      this.$axios.post(this.GLOBAL.config_ip+'/publish_assignments/',{
        "token":localStorage.getItem("token"),
        "work_name":this.publish_work_name,
        "work_desc":this.publish_work_desc,
        "work_deadline":this.publish_work_deadline.getTime(),
        "work_class":this.publish_work_class
      }).then((response)=>{
        localStorage.setItem("token",response.data.token)
        if(response.data.code==0){
            this.$notify({
                title:'成功',
                message:'发布成功',
                type:'success'
            })
        }
        else if(response.data.code==26){
            this.$notify({
                title:'错误',
                message:'当前用户不在此班级中，无法发布作业',
                type:'error'
            })
        }
        }).catch((error)=>{
            this.$notify({
                title:'错误',
                message:error,
                type:'error'
            })
        });
    }},
    
    /* -----------------------------------删除发布的作业方法-------------------------------------- */
    delete_assignments(index,tabledata,work_code){
      this.$axios.post(this.GLOBAL.config_ip+'/delete_assignments/',{
      "token":localStorage.getItem("token"),
      "work_code":work_code,
    }).then((response)=>{
        if(response.data.code==0)
         { 
            tabledata.splice(index, 1),
            console.log(this)
            this.$notify({
              title:'成功',
              message:'已成功删除',
              type:'success'
            });
         }
         else{
           this.$notify({
             title:'错误',
             message:JSON.stringify(response.data.msg),
             type:'error'
           });
         }
        }).catch((error)=>{
          this.$notify({
            title:'错误',
            message:error,
            type:'error'
          });
        })
    },
    /********************************获取班级****************************************/
    get_class_assignments(){
        this.$axios.post(this.GLOBAL.config_ip+"/get_assignments_list_by_class",{
            token:localStorage.getItem("token"),
            class:this.detail_work_class
        }).then((res)=>{
            this.tableData=Array.from(res.data.work_list)
        })
    },
    /********************************* 检索该老师所在班级************************************************/ 
    class_list:function(){
        this.$axios.post(this.GLOBAL.config_ip+"/get_class_list",{
            token:localStorage.getItem("token"),
        }).then((res)=>{
            this.options=Array.from(res.data.class_list)
        })
    },
    /*************************************下载作业****************************************** */
    download_assignments(work_code){
      this.$axios.post(this.GLOBAL.config_ip+'/download_assignments',{
        "token":localStorage.getItem("token"),
        "work_code":work_code,
      }).then((response)=>{
        localStorage.setItem("token",response.data.token)
        if(response.data.code==0){
        window.open(this.GLOBAL.config_ip+response.data.download_url)
      }
        }).catch((error)=>{
         this.$notify({
            title:'错误',
            message:error,
            type:'error'
         })
        })
    },
    /*********************************** 作业详情  ******************************************/
    detail_assignments(work_code){
      localStorage.setItem("work_code",work_code),
      location.href='#/teacher_view'
    },
    /* 删除提示 */
    delete_confirm(index,tabledata,work_code){
          this.$confirm('此操作将永久删除该作业, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
          }).then(()=>{
            this.delete_assignments(index,tabledata,work_code);
          }).catch(()=>{
            console.log(this)
            this.$notify({
              title:'消息',
              message:'已取消删除',
              type:'info'
            })
          })
    }
  }
}
</script>
