<template>
  <div id="login_box">
    <h2>LOGIN</h2>
    <div id="form">
      <div id="input_box">
        <el-input v-model="user" placeholder="请输入用户名"></el-input>
      </div>
      <div id="input_box">
        <el-input v-model="password" placeholder="请输入密码" show-password></el-input>
      </div>
    </div>
    <br /><br />
    <div>
      <el-button type="primary" plain @click="postdata">login</el-button>
    </div>
    <div id="Sign">
      <a href="http://baidu.com">修改密码</a>
    </div>
  </div>
  
</template>

<script>
export default {
  data() {
    return {
      user: '',
      password: ''
    };
  },
  //服务器提交代码数据
  methods:{
    postdata:function(){
      // eslint-disable-next-line no-unused-vars
      var password=this.password
      localStorage.setItem("usr",this.user)
      this.$axios.post(this.GLOBAL.config_ip+'/login/',{//传送数据
          usr:this.user,
          pwd:this.password
        }).then((res)=>{//成功登陆
        console.log(res.data.code)
           if(res.data.code==0){
             if(res.data.identify==1){
               //学生界面
               localStorage.setItem("token",res.data.token);
               //未修改密码000 进行修改密码界
              location.href='#/bookbuy'
           }else{
             //老师界面
             localStorage.setItem("token",res.data.token);
             location.href='#/admin'
           }
           }
           else{
             this.$message({
                  showClose: true,
                  message: '用户名密码不匹配',
                  type: 'error'
                });
           }
        }).catch(function(err){//失败
          console.log(err);
        })
    }
  }
};
</script>
<!--样式表-->
<style>

body {
  background-image: url("../assets/2.jpg");

  background-size: cover;

  background-repeat: repeat;
}

#login_box {
  width: 20%;

  height: 40%;

  background: #e9e7e7c7;

  margin: auto;

  margin-top: 10%;

  text-align: center;

  border-radius: 10px;

  padding: 50px 50px;
}

#login_box #form #input_box {
  margin-top: 5%;
}

#login_box #form #input_box {
  color: #e8e7b730;
}

#login_box #form #input_box input {
  border: 0;

  width: 60%;

  font-size: 15px;

  color: #0c0b0c;

  background: #ffffffd7;

  border-bottom: 2px solid#eacda950;

  padding: 5px 10px;

  margin-top: 10px;
}

#login_box #Sign {
  margin-top: 45%;

  margin-left: 60%;
}

#login_box #Sign a {
  color: #0c0b0c;
}

#link {
  position:absolute;right:20px;bottom:20px;width:75px;border:0px solid #aaa
}

#wei {
  position:absolute;right:500px;width:75px;border:0px solid
}
</style>