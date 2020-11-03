<template>
<div>
  <div id="link">
    <i class="el-icon-house"></i>
<el-link type="primary" href='#/login'>退出登录</el-link>
</div>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      fixed
      prop="work_name"
      label="作业名"
      width="1000">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      >
      <template slot-scope="scope">
        <el-button @click="checkdetail(scope.$index)" type="text">查看详情</el-button>
        <el-button @click="postfile(scope.$index)" type="text">提交作业</el-button>
        <el-button @click="previewwork(scope.$index)" type="text">预览作业</el-button>
        <el-button @click="lookscore(scope.$index)" type="text">查看分数</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
var arr1=[];
// eslint-disable-next-line no-unused-vars
var arr2=[];
// eslint-disable-next-line no-unused-vars
export default {
    data() {
      return {
        tableData:[]
        //tableData
        
}
},
created:function(){//获取work_name和获取work_code
    // `this` 指向 vm 实例
        this.$axios.post(this.GLOBAL.config_ip+'/get_assignments_list_by_class/',{
            token:localStorage.getItem("token"),
            class:localStorage.getItem("class")
        }).then((res)=>{
            localStorage.setItem("token",res.data.token)
            arr1.length=res.data.work_list.length
            arr2.length=res.data.work_list.length
            for(let i=0;i<res.data.work_list.length;i++)
                {
                    arr1[i]={work_name:res.data.work_list[i].work_name}
                    arr2[i]=res.data.work_list[i].work_code
                }
            this.tableData=Array.from(arr1)
            })
},
methods:{
  //查看分数
  //----------------------------------------------------------------------------------------------------------------------------------------------

  // eslint-disable-next-line no-unused-vars
  lookscore(index){
    this.$axios.post(this.GLOBAL.config_ip+'/get_score/',{
      "token":localStorage.getItem("token"),
      "work_code":arr2[index],
      "usr":localStorage.getItem("usr")
    }).then((res)=>{
      console.log(res.data.score_detail.score)
      if(res.data.score_detail.score<0){
      if(res.data.score_detail.score==-2){
        this.$message({
                  showClose: true,
                  message: '未提交作业',
                  type: 'error'
                })
      }
      if(res.data.score_detail.score==-1){
          this.$message({
                  showClose: true,
                  message: '老师未打分',
                  type: 'error'
                })
      }
      }
      else{
      localStorage.setItem("token",res.data.token)
          this.$alert("你的分数是"+res.data.score_detail.score+"分", '成绩详情', {
          dangerouslyUseHTMLString: true
        });}
    }).catch((err)=>{
      alert(err)
    })
  },
  
  //----------------------------------------------------------------------------------------------------------------------------------------------
  //查看分数
  //----------------------------------------------------------------------------------------------------------------------------------------------
  //上传作业
  postfile(index){
        localStorage.setItem("work_code",arr2[index])
        console.log(arr2[index])
        location.href='#/student_work_submit'
  },
  //上传作业
  //预览作业
  //-------------------------------------------------------------------------------------------------------------------------------------------
    previewwork(index){
      this.$axios.post(this.GLOBAL.config_ip+'/preview_assignment/',{
        "token":localStorage.getItem("token"),
        "work_code":arr2[index]
      }).then((res)=>{
        window.open(this.GLOBAL.config_ip+res.data.url)
      // eslint-disable-next-line no-unused-vars
      }).catch((err)=>{
        this.$message({
                  showClose: true,
                  message: '你还未提交作业',
                  type: 'error'
                })
      })
  },
  //预览作业
  //------------------------------------------------------------------------------------------------------------------------------------------
  //查看详情
  checkdetail(index){
    console.log(arr2[index])
    this.$axios.post(this.GLOBAL.config_ip+'/get_assignments_detail/',{
        "token":localStorage.token,
        "work_code":arr2[index]
        }).then((res)=>{
            localStorage.setItem("token",res.data.token)
            //alert
            // eslint-disable-next-line no-unused-vars
            var date = new Date(res.data.work_deadline).toLocaleDateString() + " " + new Date(res.data.work_deadline).toLocaleTimeString()
            /*this.$alert(res.data.work_belong+'的作业:'+res.data.work_desc+'截止日期:'+date, '作业详情', {
            confirmButtonText: '确定',
            callback:  action=> {
            this.$message({
              type: 'info',
              message: action
            });
          }
        });*/
         this.$alert(res.data.work_belong+'的作业:'+res.data.work_desc+'  ,   '+'截止日期:'+date, '作业详情', {
        dangerouslyUseHTMLString: true
        });
        //alert
        }).catch(function(err){
            alert(err)
        })
        }
  }
//-----------------------------------------------------------------------------------------------------------------------------------------
//over
//
}
</script>