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
      <el-button type="primary" plain @click="submit" id='b1'  v-loading.fullscreen.lock="fullscreenLoading">上传文件</el-button>
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
        fullscreenLoading: false
        }
    },
methods:{
     submit:function() {
        this.fullscreenLoading=true
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
                this.fullscreenLoading=false
                localStorage.setItem("token",res.data.token)
                this.$message({
                  showClose: true,
                  message: '恭喜你,上传成功'+','+"文件大小为"+size+"kb",
                  type: 'success'
                });
                location.href='#/student_work'
              }else{
                this.$message({
                  showClose: true,
                  message: '操作错误',
                  type: 'error'
                })
              }
            })
            .catch((err) => {
                alert(err+"请勿重复提交")
            })
    }
}
}
</script>
