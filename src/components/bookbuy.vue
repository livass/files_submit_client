 <template>
 <el-tabs :tab-position="tabPosition" style="height: 200px;">
    <el-tab-pane label="图书查看">
      
    </el-tab-pane>
    <el-tab-pane label="购买图书">购买图书</el-tab-pane>
    <el-tab-pane label="上传图书">
      <!--上传图片-->
      <el-upload
    class="avatar-uploader"
    action="url+'post'"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload">
    <img v-if="imageUrl" :src="imageUrl" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    <!--文本框相关数据-->
</el-upload>
    <el-input
  type="textarea"
  autosize
  placeholder="请输入书名"
  v-model="textarea1">
</el-input>
<div style="margin: 20px 0;"></div>
<el-input
  type="textarea"
  :autosize="{ minRows: 2, maxRows: 4}"
  placeholder="请简要介绍一下自己的图书"
  v-model="textarea2">
</el-input>
    </el-tab-pane>
    <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
  </el-tabs>
</template>

<script>
  export default {
    data() {
      return {
        tabPosition: 'top',
        imageUrl: '',
        textarea1:'',
        textarea2:''
      };
    },
     methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传图书图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图书图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
  };
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>