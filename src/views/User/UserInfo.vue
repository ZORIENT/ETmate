<template>
  <div class="container">
    <div class="title">
      <h1>账号管理</h1>
    </div>

    <div class="userInfo">
      <div class="left">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>

        <h1>点击上传头像</h1>

      </div>

      <div class="right">
        <el-form label-position="right" label-width="100px" :model="userInfo">
          <!-- 邮箱 -->
          <el-form-item label="邮箱">
            <el-input v-model="userInfo.email" type="email"></el-input>
          </el-form-item>

          <!-- 昵称 -->
          <el-form-item label="昵称">
            <el-input v-model="userInfo.username"></el-input>
          </el-form-item>

          <!-- 性别 -->
          <el-form-item label="性别">
            <el-select v-model="userInfo.gender" placeholder="性别">
              <el-option label="男" :value="1"></el-option>
              <el-option label="女" :value="2"></el-option>
            </el-select>
          </el-form-item>

          <!-- 原密码 -->
          <el-form-item label="原密码">
            <el-input v-model="userInfo.password" type="password"></el-input>
          </el-form-item>

          <!-- 新密码 -->
          <el-form-item label="新密码">
            <el-input v-model="userInfo.newPassword" type="password"></el-input>
          </el-form-item>

          <!-- 重复新密码 -->
          <el-form-item label="重复新密码">
            <el-input
              v-model="userInfo.newPassword2"
              type="password"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button @click="submitForm('userInfo')">提交</el-button>
          </el-form-item>
        </el-form>
      </div>

      
    </div>
  </div>
</template>

<script>
export default {
  name: "UserInfo",

  data() {
    return {
      userInfo: {
        email: "1957193956@qq.com",
        username: "暴走d姜撞奶",
        gender: 1,
        password: "15995591407zxc..",
        newPassword: "",
        newPassword2: "",
      },
      imageUrl: "https://c-ssl.dtstatic.com/uploads/blog/202208/01/20220801204303_cef03.thumb.1000_0.jpeg",
    };
  },

  mounted() {},

  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
};
</script>

<style scoped>
.container{
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  width: calc(var(--width) * 1px);
}

.title h1 {
  font-size: 16px;
  font-weight: bold;
  padding: 10px 0px;
  color: var(--primaryColor);
  /* border: 1px solid green; */
  border-bottom: 1px solid var(--lightTheme);
}

/* ********************************************************** */
.userInfo{
  display: flex;

}

.userInfo .left{
  display: flex;
  width: 400px;
  /* border: 1px solid red; */
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.userInfo >>> .left .el-upload{
  border-radius: 100%;
  /* margin-top: 100px; */
  border: 1px solid var(--primaryColor);
  overflow: hidden;
}

.userInfo .left h1{
  font-size: 14px;
  color: var(--primaryColor);
  padding: 10px 0px;
}


/* ********************************************************** */
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
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