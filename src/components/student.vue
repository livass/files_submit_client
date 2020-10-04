<template>
<div id="login_box">
    <h2>上传文件</h2>
    <div id="form">
      <div id="input_box">
          <input type="file" id="_f">
          <br><br>
        <el-input v-model="work_code" placeholder="请输入作业码" id="work_code"></el-input>
      </div>
    </div>
    <br /><br />
    <div>
      <el-button type="primary" plain @click="submit">上传文件</el-button>
    </div>
     <div id="Sign">
      <a href="#/login">退出登录</a>
    </div>
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
        work_code:''
        }
    },
methods:{
     submit:function() {
        var param = new FormData()
        // eslint-disable-next-line no-undef
        param.append('file', _f.files[0])
        // eslint-disable-next-line no-undef
        param.append('work_code', work_code.value)
        param.append('token', localStorage.token)
        this.$axios.post(this.GLOBAL.config_ip+'/submit_work/', param, axios_config)
            .then((res) => {
                alert(JSON.stringify(res.data))
            })
            .catch((err) => {
                alert(err)
            })
    }
}
}
</script>