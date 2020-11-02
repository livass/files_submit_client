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
      this.$axios.post(this.GLOBAL.config_ip+'/reset_password/',{
          token:localStorage.getItem("token"),
          user:localStorage.getItem("usr"),
          newPwd:this.newpassword1
      }).then((res)=>{
        if(password1!=password2){
          alert("两次密码输入不一样")
        }
        else{
          if(password1=='000'){
              alert("密码不能为000，请重新输入")
            }
          else{
              localStorage.setItem("token",res.data.token)
              if(res.data.code==0){
                  alert('修改成功')
                  location.href='#/student_class'
            }
          }
          }
      }).catch((err)=>{
          alert(err)
      })
      }
        //reset
  }
  //methods
  }

</script>
