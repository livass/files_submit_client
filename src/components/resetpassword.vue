<template>
  <div id="login_box">
    <h2>修改密码</h2>
    <div id="form">
      <div id="input_box">
        <el-input v-model="newpassword1" placeholder="请输入新密码" show-password></el-input>
      </div>
      <div id="input_box">
        <el-input v-model="newpassword2" placeholder="请重新输入新密码" show-password></el-input>
      </div>
    </div>
    <br /><br />
    <div>
      <el-button type="primary" plain @click="reset">确认修改</el-button>
    </div><!--
    <div id="Sign">
      <a href='#/login'>重新登录</a>
    </div>-->
  </div>
  
</template>

<script>
export default {
  data() {
    return {
      newpassword1: '',
      newpassword2: ''
    };
  },
 
  methods:{
    //重置密码
  reset:function(){
      var password1=this.newpassword1
      var password2=this.newpassword2
      if(password1!=password2){
           this.$message({
                  showClose: true,
                  message: '两次密码不一致',
                  type: 'error'
                });
        }
      else if(password1=='000'){
               this.$message({
                  showClose: true,
                  message: '密码不能为000',
                  type: 'error'
                });
          }
      else{  
      this.$axios.post(this.GLOBAL.config_ip+'/reset_password/',{
          token:localStorage.getItem("token"),
          user:localStorage.getItem("usr"),
          newPwd:this.newpassword1
      }).then((res)=>{
              localStorage.setItem("token",res.data.token)
              if(res.data.code==0){
                  this.$message({
                  showClose: true,
                  message: '修改成功',
                  type: 'success'
                });
                  location.href='#/student_class'
            }
      }).catch((err)=>{
          alert(err)
      })
      }
  }
        //reset
  }
  //methods
  }

</script>
