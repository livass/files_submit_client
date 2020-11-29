<template>
<div id="login_box">
    <h2>上传文件</h2>
    <div id="form">
      <div id="input_box">
          <br>    
          <input type="file" id="_f" multiple="multiple" />
  <!--附件上传------------------------------------------------------>
    <br/><br/>
     
    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> 
  </div><br>
      </div>
    <br />
    <!--------------------------------------------------------------->
    </div><!--
     <div id="Sign">
      <a href="#/student_work">返回上一界面</a>
    </div>-->
</template>

<script>
var axios_config = {
        headers: { 'Content-Type': 'multipart/form-data' }
}
export default {
  data(){
    return{
    }
  },
 methods:{
  // eslint-disable-next-line no-unused-vars
   submitUpload(){
      const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
     var param = new FormData()
      // eslint-disable-next-line no-undef
            console.log(Array.from(_f.files))
            // eslint-disable-next-line no-undef
            Array.from(_f.files).forEach(v => {
                param.append('file', v)
            })
            param.append('work_code',localStorage.getItem("work_code"))
            param.append('token',localStorage.getItem("token"))
            // eslint-disable-next-line no-unused-vars
            var size=0
            // eslint-disable-next-line no-undef
            var length=_f.files.length
            // eslint-disable-next-line no-undef
            for(let i=0;i<_f.files.length;i++){
              // eslint-disable-next-line no-undef
              size=size+_f.files[i].size/1024
            }
          size=Math.round(size)
       this.$confirm('你上传了'+length+'个文件,你的文件总大小为'+size+'kb'+','+'是否上传', '是否上传?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        this.$axios.post(this.GLOBAL.config_ip+'/submit_work/', param, axios_config)
            .then((res) => {
              console.log(res.data)
              if(res.data.code==0){
                //this.fullscreenLoading=false
                loading.close();
                localStorage.setItem("token",res.data.token)
                this.$message({
                  showClose: true,
                  message: '恭喜你,上传成功',
                  type: 'success'
                });
                location.href='#/student_work'
              }else{
                //wrong information 
                switch(res.data.code){
                  case 1:
                    this.$message({
                      showClose: true,
                      message: 'token错误',
                      type: 'error'
                    })
                    break;
                  case 2:
                    this.$message({
                    showClose: true,
                    message: '权限错误',
                    type: 'error'
                    });
                    break;
                  case 3:
                    this.$message({
                    showClose: true,
                    message: '数据库错误',
                    type: 'error'
                  });
                  break;
                  case 4:
                    this.$message({
                    showClose: true,
                    message: '参数错误',
                    type: 'error'
                  });
                  break;
                  case 11:
                    this.$message({
                    showClose: true,
                    message: '用户名和密码错误',
                    type: 'error'
                  });
                  break;
                case 21:
                  this.$message({
                  showClose: true,
                  message: '作业名为空',
                  type: 'error'
                });
                break;
                case 22:
                  this.$message({
                  showClose: true,
                  message: '作业码生成错误',
                  type: 'error'
                });
                break;
                case 23:
                  this.$message({
                  showClose: true,
                  message: '作业码解析错误',
                  type: 'error'
                });
                break;
                case 24:
                  this.$message({
                  showClose: true,
                  message: '上传时间截止',
                  type: 'error'
                });
                break;
                case 25:
                  this.$message({
                  showClose: true,
                  message: '作业所属班级为空',
                  type: 'error'
                });
                break;
                case 26:
                  this.$message({
                  showClose: true,
                  message: '当前用户不在此班级，无法操作此作业',
                  type: 'error'
                });
                  break;
                case 41:
                this.$message({
                  showClose: true,
                  message: '未上传文件',
                  type: 'error'
                })
                break;
                case 42:
                  this.$message({
                  showClose: true,
                  message: '上传文件不为word',
                  type: 'error'
                });
                break;
                case 5:
                  this.$message({
                  showClose: true,
                  message: '文件不存在',
                  type: 'error'
                });
                break;
                case 51:
                  this.$message({
                  showClose: true,
                  message: '不存在该预览作业',
                  type: 'error'
                })
                break;
                case 52:
                  this.$message({
                  showClose: true,
                  message: '无法转化当前word为pdf',
                  type: 'error'
                })
                break;
                default:
                  this.$message({
                  showClose: true,
                  message: '操作错误',
                  type: 'error'
                });
                break;
                }//错误提示
                //wrong information
                /*this.$message({
                  showClose: true,
                  message: '操作错误',
                  type: 'error'
                })*/
                //this.fullscreenLoading=false;
                loading.close();
              }
            })
            .catch((err) => {
              alert(err+"请勿重复提交")
              loading.close();
            })
            }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消上传'
          });  
          loading.close();        
        });
    }
 } 
}
</script>