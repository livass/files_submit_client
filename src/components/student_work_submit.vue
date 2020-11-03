<template>
<div id="login_box">
    <h2>上传文件</h2>
    <div id="form">
      <div id="input_box">
          <input type="file" id="_f">
          <br><br>
      </div>
    </div>
    <br /><br />
    <div>
      <el-button type="primary" plain @click="submit" id='b1'>上传文件</el-button>
    </div><!--
     <div id="Sign">
      <a href="#/student_work">返回上一界面</a>
    </div>-->
  </div>
</template>

<!--文件，code，token-->

<script>
var axios_config = {
        headers: { 'Content-Type': 'multipart/form-data' }
}
export default{
    data(){
        return{
        work_code:'',
        //fullscreenLoading: false
        }
    },
methods:{
     submit:function() {
        //
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });//this.fullscreenLoading=true
        // eslint-disable-next-line no-undef
        var file=_f.files[0]
        var size=file.size/1024
        size=Math.round(size)
        var param = new FormData()
        // eslint-disable-next-line no-undef
        param.append('file', _f.files[0])
        // eslint-disable-next-line no-undef
        param.append('work_code', localStorage.getItem("work_code"))
        param.append('token', localStorage.getItem("token"))
        this.$axios.post(this.GLOBAL.config_ip+'/submit_work/', param, axios_config)
            .then((res) => {
              console.log(res.data)
              if(res.data.code==0){
                //this.fullscreenLoading=false
                loading.close();
                localStorage.setItem("token",res.data.token)
                this.$message({
                  showClose: true,
                  message: '恭喜你,上传成功'+','+"文件大小为"+size+"kb",
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
                }
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
            })
    }
}
}
</script>
