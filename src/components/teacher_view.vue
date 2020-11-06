<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<template>

  <el-container>
    <el-header><el-page-header @back="goBack" content="学生作业提交情况"></el-page-header> </el-header>

    <el-main>
      <div id="input_box" >
        <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 1}" placeholder="发布者" v-model="detail_publish_user_name" :disabled="true" size="mini"></el-input>
      </div>
      <div id="input_box" >
        <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 1}" placeholder="作业名称" v-model="detail_publish_work_name" :disabled="true" size="mini"></el-input>
      </div>
      <div id="input_box">
        <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 3}" placeholder="作业要求" v-model="detail_publish_work_desc" :disabled="true" size="mini"></el-input>
      </div>
      <div id="input_box">
        <el-date-picker v-model="detail_publish_work_deadline" type="date" placeholder="作业截止日期" :disabled="true" size="mini" style="width: 100%;"> </el-date-picker>
      </div>
    </el-main>

    <el-main>
      <el-table
      v-loading="loading"
      :data="tableData_student"
      border
      style="width: 100%"
      height="280"
      size="mini"
      >

        <el-table-column fixed  prop="usr"  label="学号" width="200" >  </el-table-column>
        <el-table-column fixed  prop="score" :formatter="formatterS" label="分数" width="200" >  </el-table-column>
        <el-table-column fixed  prop="submitStat" :formatter="formatterC" label="提交状态" width="200" >  </el-table-column>

        <el-table-column  fixed="right"  label="编辑"  >
          <template slot-scope="scope">

            <el-button @click="Preview(scope.row.usr)" 
            type="text" 
            icon="el-icon-search"
            size="mini">
            预览作业
            </el-button>

            <el-button @click="showEditDialog(scope.row.usr)" 
            type="text" 
            icon="el-icon-edit"
            size="mini">
            修改成绩
            </el-button>

          </template>
      
        </el-table-column>


      </el-table> 

    <!-- 修改用户成绩的对话框 -->
      <el-dialog
        title="修改成绩"
        :visible.sync="editDialogVisible"
        width="30%"
        size="mini">
        <el-form :model="editForm"  label-width="40px">
          <el-form-item label="学号" size="mini">
            <el-input v-model="editForm.usr" disabled></el-input>
          </el-form-item>
          <el-form-item label="成绩" size="mini">
            <el-input v-model="editForm.score" onkeyup="this.value = this.value.replace(/[^\d.]/g,'');" ></el-input>
          </el-form-item>
          <font style="font-size:10px;margin-left:-30px;!important" color="red">{{tips}}</font>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false" size="mini" >取 消</el-button>
          <el-button type="primary" @click="editUserInfo(editForm)" size="mini">确 定</el-button>
        </span>
      </el-dialog>

    </el-main>



  </el-container>


</template>

<script>
var arr=[];
  export default {
    data(){
        return{
          loading:false,
        tableData_student:[],
        detail_publish_user_name:"",
        detail_publish_work_deadline:"",
        detail_publish_work_desc:"",
        detail_publish_work_name:"",
        editDialogVisible: false,
        editForm:{},
        tips:"",
        tips1:""
        }
    },
    created: function () {
        this.loading=true,
        this.$axios.post(this.GLOBAL.config_ip+"/get_assignments_detail",{
            token:localStorage.getItem("token"),
            work_code:localStorage.getItem("work_code")
        }).then((res)=>{
          localStorage.setItem("token",res.data.token)
          this.tableData_student=Array.from(res.data.stu_list)
          this.loading=false
        })
/*************************作业详情**************************************************/
      this.$axios.post(this.GLOBAL.config_ip+'/get_assignments_detail',{
        "token":localStorage.getItem("token"),
        "work_code":localStorage.getItem("work_code")
      }).then((response)=>{
        localStorage.setItem("token",response.data.token)
        this.detail_publish_user_name="发布者:"+response.data.work_belong
        this.detail_publish_work_deadline=response.data.work_deadline
        this.detail_publish_work_desc="作业要求:"+response.data.work_desc
        this.detail_publish_work_name="作业名:"+response.data.work_name
        });

    },
    methods: {
      goBack() {
        location.href='#/teacher'
      },
      formatterC:function(row, column, cellValue, index){
        return row.submitStat == true ? '已提交作业' : row.submitStat == false ? '未提交作业' : '未知';
      },
      formatterS:function(row, column, cellValue, index){
        return row.score == -3 ? '无作业' : row.score == -1 ? '未打分' : row.score;
      },
/*******************************************预览作业****************************************************** */
    Preview(usr){
      this.$axios.post(this.GLOBAL.config_ip+'/preview_assignment',{
        "token":localStorage.getItem("token"),
        "work_code":localStorage.getItem("work_code"),
        "usr":usr
      }).then((response)=>{

        if(response.data.code==0){
          window.open(this.GLOBAL.config_ip+response.data.url)
          localStorage.setItem("token",response.data.token)
        }
        else{
          this.$notify({
            title:'错误',
            message:'作业未提交',
            type:'error'
          })
        }
        })
    },

    showEditDialog(usr) {
      this.tips=this.tips1,
      this.editForm.usr=usr,
      this.editDialogVisible = true
      
    },
      
    editUserInfo(editForm){

     //   this.tips=tips1
        if(/^((100)|(\d{1,2}))(\.\d{0,2})?$/.test(editForm.score)==true){
        //是数字

      this.$axios.post(this.GLOBAL.config_ip+'/grade_assignments',{
        "token":localStorage.getItem("token"),
        "work_code":localStorage.getItem("work_code"),
        "updateTarget":[editForm]
      }).then((response)=>{
        if(response.data.code==0){
          localStorage.setItem("token",response.data.token)
          this.$notify({
            title:'成功',
            message:'打分成功',
            type:'success'
          })
        }
        this.editForm.score=""
        this.tips=""

        this.$axios.post(this.GLOBAL.config_ip+'/get_assignments_detail',{
          token:localStorage.getItem("token"),
          work_code:localStorage.getItem("work_code")
        }).then((res)=>{
          this.tableData_student=Array.from(res.data.stu_list)
          this.editDialogVisible = false
        })

        })


        
        }
        else{
          this.editForm.score=""
          this.tips="不是一个有效的成绩"
        }
        this.tips1=""

    }
    }
  }
</script>