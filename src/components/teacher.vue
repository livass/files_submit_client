<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<template>
  <div class="发作业">
    <el-tabs type="border-card">

    <!-----------------------------------------------------------发布作业------------------------------------------------------>
      <el-tab-pane>
        <span slot="label">发布作业</span>
        <div id="input_box">
          <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 4}" placeholder="作业名称" v-model="publish_work_name"></el-input>
        </div>
        <div id="input_box">
          <el-input type="textarea" :autosize="{ minRows: 10, maxRows: 20}" placeholder="作业要求" v-model="publish_work_desc"></el-input>
        </div>
        <br/><br/>
        <div>
          <el-button type="primary" plain @click="publish_assignments">上传作业</el-button>
        </div>
        <br>
        <div>
          <el-input placeholder="作业码" v-model="publish_work_code"></el-input>
        </div>
        <br>
        <div>
          <el-button type="primary" plain @click="show_work_code">点击显示作业码</el-button>
        </div>
    </el-tab-pane>

    <!-----------------------------------------------------------收集作业------------------------------------------------------>
      <el-tab-pane>
        <span slot="label">收集作业</span>
          <div id="input_box">
          </div>
          <div id="input_box">
            <el-input placeholder="作业码 #1输入作业码，点击[收集作业]" v-model="download_work_code"></el-input>
          </div>
          <br>
          <div>
            <el-button type="primary" plain @click="download_assignments">收集作业</el-button>
          </div>
          <br>
          <div>
          <a :href="download_url">下载链接</a>
          </div>
          <br>
          <div>
          <el-button type="primary" plain @click="show_download_url">点击更新上方下载链接</el-button>
          </div>
      </el-tab-pane>

    <!-----------------------------------------------------------删除作业------------------------------------------------------>
      <el-tab-pane>
        <span slot="label">删除作业</span>
        <div id="input_box">
         <br /><br />
          <div id="form">
            <div id="input_box">
              <el-input placeholder="请输入作业码" v-model="delete_work_code"></el-input>
            </div>
          </div>
          <br /><br />
          <div>
            <el-button type="primary" plain @click="delete_assignments">作业删除</el-button>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

export default {
  data() {
    return {
      publish_work_code:'',
      //test1:'',
     // test2:'',
      //test:'',
      publish_work_name:'',
      publish_work_desc:'',
      download_work_code:'',
      download_url:'',
      delete_work_code:'',
    }
  },
  methods:{

    /* -----------------------------------发布作业方法-------------------------------------- */
    publish_assignments:function(){
      this.$axios.post(this.GLOBAL.config_ip+'/publish_assignments/',{
        "token":localStorage.getItem("token"),
        "work_name":this.publish_work_name,
        "work_desc":this.publish_work_desc
      }).then(function (response){
        localStorage.setItem("token",response.data.token)
        //alert(response.data.work_code);
        if(response.data.code==0){
          alert("发布成功")
          localStorage.setItem("work_code",response.data.work_code)
        }
        else{
          alert(JSON.stringify(response.data.msg))
        }
        }).catch(function (error){
          console.log(error);
        });
    },
    /* -----------------------------------收集作业方法-------------------------------------- */
    download_assignments:function(){
      this.$axios.post(this.GLOBAL.config_ip+'/download_assignments',{
        "token":localStorage.getItem("token"),
        "work_code":this.download_work_code,
      }).then(function (response){
        localStorage.setItem("token",response.data.token)
        //alert(JSON.stringify(response.data.code))
        if(response.data.code==0){
          alert("成功收集")
          localStorage.setItem("download_url",response.data.download_url)
        }
        else{
          alert(response.data.msg)
        }
        }).catch(function (error){
          console.log(error);
        });
    },
    /* -----------------------------------删除发布的作业方法-------------------------------------- */
    delete_assignments:function(){
      this.$axios.post(this.GLOBAL.config_ip+'/delete_assignments/',{
      "token":localStorage.getItem("token"),
      "work_code":this.delete_work_code,
    }).then(function(response){
      localStorage.setItem("token",response.data.token)
      if(response.data.code==0){
        alert("删除成功")
      }
      else{
        alert(JSON.stringify(response.data.msg))
        }
        }).catch(function(error){
          alert(error);
        })
    },
      /* -----------------------------------输出作业码-------------------------------------- */
    show_work_code:function(){
      this.publish_work_code=localStorage.getItem("work_code")
      //this.test1=localStorage.getItem("work_code");
      //this.test=this.test1
    },
     /* -----------------------------------输出下载链接-------------------------------------- */
    show_download_url:function(){
      this.download_url=this.GLOBAL.config_ip+localStorage.getItem("download_url")
      //this.test2=localStorage.getItem("download_url");
      //this.download_url1='http://47.96.235.211:3000'+this.test2
    }
  }
}
</script>