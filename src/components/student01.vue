<template>
    <!--student01-->
  <el-tabs :tab-position="tabPosition" style="height: 200px;">
    <!--作业详情-----------------------------------------------------------------------------------------------------------------------------------> 
    <el-tab-pane label="作业详情">
        <!--测试
        <h1>请输入作业码</h1>
        <el-input v-model="work_code" placeholder="请输入作业码"></el-input>
        <br><br>
        <el-button type="primary" @click="getmessage">获取作业详情</el-button>
        -->
    <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
        prop="work_no"
        label="班级"
        width="500%">
        </el-table-column>
        <el-table-column
        prop="work_name"
        label="进入班级"
        width="500%">
        </el-table-column>
        <!--
        <el-table-column
        prop="detail"
        label="作业详情">
        </el-table-column>
        -->
    </el-table>
    </el-tab-pane>
    <!--作业详情------------------------------------------------------------------------------------------------------------------------------------>


    <!--作业提交------------------------------------------------------------------------------------------------------------------------------------>
    <el-tab-pane label="作业提交">作业上传
    <!--作业提交----------------------------------------------------------------------------------------------------------------------------------------->


    </el-tab-pane>
    <!--查阅作业------------------------------------------------------------------------------------------------------------------------------------------->
    <el-tab-pane label="查阅作业">查阅作业</el-tab-pane>
    <!--查阅作业------------------------------------------------------------------------------------------------------------------------------------------->


    <!--分数查看---------------------------------------------------------------------------------------------------------------------------------------->
    <el-tab-pane label="分数查看">
        <h2>请输入作业码</h2>
        
    </el-tab-pane>
    <!--分数查看---------------------------------------------------------------------------------------------------------------------------------------->
    </el-tabs>

</template>
<script>
  export default {
    data() {
      return {
        // Tag Position = left
        tabPosition: 'left',
        //input work_code
        //work_code:''
        //tableData
        tableData:[]
    }
},
    created:function(){
        this.$axios.post(this.GLOBAL.config_ip+'/get_class_list/',{
            token:localStorage.getItem("token")
        }).then((res)=>{
            localStorage.setItem("token",res.data.token)
            this.tableData=Array.from(res.data.calss_list)
            })
    },
    methods:{
//------------------------------------------getmessage--------------------------------------------------------------------------------------------
        /*测试
        getmessage:function(){
        this.$axios.post(this.GLOBAL.config_ip+'/get_assignments_detail/',{
        "token":localStorage.token,
        "work_code":this.work_code
        }).then((res)=>{
            localStorage.setItem("token",res.data.token)
            //alert
            this.$alert(res.data, '作业详情', {
            confirmButtonText: '确定',
            callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
        //alert
        }).catch(function(err){
            alert(err)
        })
        }
    */
//--------------------------------------------getmessage-----------------------------------------------------------------------------------------
    //methods

    }
//export default
}
</script>