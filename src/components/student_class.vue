<template>
<!--表格-->
  <el-table
    :data="tableData"
        stripe
    style="width: 100%">
    <el-table-column
      prop=class
      label="班级"
      width="1000">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
    >
<!--表格-->
<!--操作-->
      <template slot-scope="scope">
        <i class="el-icon-caret-right"></i>
        <el-button @click="intoclass(scope.$index, scope.row)" type="text">进入班级</el-button>
      </template>
<!--操作-->>
    </el-table-column>
  </el-table>
</template>

<script>
    export default {
    data() {
      return {
        //tableData
        tableData:[]
    }
},
//获取class
created:function(){//获取class_list
    // `this` 指向 vm 实例
        this.$axios.post(this.GLOBAL.config_ip+'/get_class_list/',{
            token:localStorage.getItem("token")
        }).then((res)=>{
            localStorage.setItem("token",res.data.token)
            //string   =   json
            for(let i=0;i<res.data.class_list.length;i++)
                {
                    res.data.class_list[i]={class:res.data.class_list[i]}
                }
                localStorage.setItem("length",res.data.class_list.length)
            this.tableData=Array.from(res.data.class_list)
            })
    },
methods:{//进入班级
    // eslint-disable-next-line no-unused-vars
    intoclass(index,row){
        localStorage.setItem("class",row.class)
        location.href='#/student_work'
    }
}

}
</script>