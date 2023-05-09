<template>
  <div class="container">
    <div class="title">
      <h1>账号管理</h1>
    </div>

    <div class="userInfo">
      <div class="left">
        <el-upload
          class="avatar-uploader"
          action=""
          :http-request="uploadAvatar"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          v-loading="uploadLoading"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>

        <h1>点击上传头像</h1>
      </div>

      <div class="right">
        <el-form
          label-position="right"
          label-width="100px"
          ref="userInfo"
          :model="userInfo"
          :rules="userInfoRules"
          v-loading="formLoading"
        >
          <!-- 邮箱 -->
          <el-form-item label="邮箱">
            <el-input disabled v-model="userInfo.email" type="email"></el-input>
          </el-form-item>

          <!-- 昵称 -->
          <el-form-item label="昵称">
            <el-input v-model="userInfo.username"></el-input>
          </el-form-item>

          <!-- 性别 -->
          <el-form-item label="性别">
            <el-select
              v-model="userInfo.gender"
              placeholder="性别"
              popper-class="select"
            >
              <el-option label="男" :value="1"></el-option>
              <el-option label="女" :value="2"></el-option>
            </el-select>
          </el-form-item>

          <!-- 原密码 -->
          <el-form-item label="原密码">
            <el-input v-model="userInfo.password" type="password"></el-input>
          </el-form-item>

          <!-- 新密码 -->
          <el-form-item label="新密码" prop="newPassword">
            <el-input
              v-model="userInfo.newPassword"
              type="password"
              show-password
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <!-- 重复新密码 -->
          <el-form-item label="重复新密码" prop="newPassword2">
            <el-input
              v-model="userInfo.newPassword2"
              type="password"
              show-password
              autocomplete="off"
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
import { upload } from "@/api/upload";
import { updateUser, selectById } from "@/api/user";
import { getUserId } from "@/utils/auth";
import md5 from "js-md5"

export default {
  name: "UserInfo",

  data() {
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.userInfo.newPassword2 !== "") {
          this.$refs.userInfo.validateField("newPassword2");
        }
        callback();
      }
    };

    var validatePassword2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.userInfo.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      userInfo: {
        email: "",
        username: "",
        gender: "",
        password: "",
        newPassword: "",
        newPassword2: "",
      },
      userInfoRules: {
        newPassword: [
          { validator: validatePassword, trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "密码长度应为6-16个字符",
            trigger: "blur",
          },
        ],
        newPassword2: [{ validator: validatePassword2, trigger: "blur" }],
      },
      imageUrl: "",
      uploadLoading: false,
      formLoading:false
    };
  },

  mounted() {
    let id = getUserId();
    selectById(id)
      .then((res) => {
        if (res.code === 1) {
          // console.log(res);
          this.userInfo.email = res.data.email;
          this.userInfo.gender = res.data.gender;
          this.userInfo.username = res.data.username;
          this.userInfo.password = res.data.password;
          this.imageUrl = res.data.avatar;
        } else {
          this.$message.error(res.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },

  methods: {
    handleAvatarSuccess() {
      // console.log(file);
      // this.imageUrl = res.data;
      // console.log(res);
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
    // 上传头像
    uploadAvatar(params) {
      const { file } = params;
      const formData = new FormData();
      // 加载中
      this.uploadLoading = true;

      formData.append("file", file);

      upload(formData)
        .then((res) => {
          if (res.code === 1) {
            this.imageUrl = res.data;
            this.uploadLoading = false;

            let user = {
              id: this.$store.state.user.userInfo.id,
              avatar: res.data,
            };
            this.updateUserMethod(user);
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    updateUserMethod(user) {
      updateUser(user)
        .then((res) => {
          // console.log(res);
          if (res.code === 1) {
            this.$message.success("更新成功！");
            this.formLoading=false;
            
            this.$store.dispatch(
              "getUserInfo",
              this.$store.state.user.userInfo.id
            );
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    submitForm(formName){
      this.$refs[formName].validate((valid)=>{
        if(valid){
          let user={
            id:getUserId(),
            gender:this.userInfo.gender,
            username:this.userInfo.username,
            password:md5(this.userInfo.newPassword)
          };
          this.formLoading=true;
          this.updateUserMethod(user);
        }else{
          console.log("表单提交错误");
          return false;
        }
      })
    }
  },
};
</script>

<style scoped>
.container {
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
.userInfo {
  display: flex;
}

.userInfo .left {
  display: flex;
  width: 400px;
  /* border: 1px solid red; */
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.userInfo >>> .left .el-upload {
  border-radius: 100%;
  /* margin-top: 100px; */
  border: 1px solid var(--primaryColor);
  overflow: hidden;
}

.userInfo >>> .left .el-upload:hover {
  animation: rotate 0.6s linear;
}

.userInfo .left h1 {
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
  /* border: 1px solid red; */
}

/* ********************************************************** */
.right {
  /* border: 1px solid red; */
  margin: 20px 0px;
  width: 500px;
  border-left: 1px solid var(--lightTheme);
  display: flex;
}

.right .el-form {
  display: flex;
  /* align-items: center; */
  /* justify-content: center; */
  flex-direction: column;
}
/* ******************************************************** */
.container >>> .el-input {
  display: flex;
  justify-content: center;
  position: relative;
  line-height: 100%;
  width: 250px;
}

.container >>> .el-input__suffix {
  right: 24%;
  font-size: 20px;
}
.container >>> .el-input__inner {
  width: 80%;
  border: none;
  border-radius: 4px;
  /* box-shadow: inset 4px 4px 4px #cbced1, inset -4px -4px 4px #fff !important; */
  transition: all 0.4s;
  border: 1px solid var(--lightTheme);
}

.container >>> .el-form-item__content {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.container >>> .el-input__inner:focus {
  border-radius: 10px;
  border: 1px solid var(--primaryColor);
}

/* 输入框下方错误信息 */
.container >>> .el-form-item__error {
  /* color: var(--primaryThemeColor); */
  left: 10%;
}
/* 输入框后面的小按钮 */
.container >>> .el-input__suffix {
  right: 15%;
  font-size: 20px;
}

.container >>> .el-button {
  border-radius: 4px;
  font-size: 16px;
  margin: 0px;
  width: 40%;
  padding: 10px;
  text-align: center;
  margin-bottom: 12px;
  font-weight: bold;
  color: var(--primaryColor);
  position: relative;
  border: none;
  width: 200px !important;
}

.container >>> .el-button:before {
  content: "";
  position: absolute;
  background: linear-gradient(
    to left,
    rgba(255, 255, 255, 0) 50%,
    rgba(255, 255, 255, 0.6) 50%
  );
  background-size: 210% 100%;
  border-radius: 4px;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
  transition: all 0.4s;
  background-position: right bottom;
}

.container >>> .el-button {
  background-color: var(--primaryColor);
  color: var(--lightTheme);
  width: 100px;
}

.container >>> .el-button:hover::before {
  background-position: left bottom;
}

.container >>> .el-input.is-focus .el-input__inner {
  border-color: var(--primaryColor) !important;
}

.el-select-dropdown {
  border: 1px solid red;
}

.el-select-dropdown__item.hover {
  background: var(--lightTheme);
  /* background: red; */
}

.el-select-dropdown__item.selected {
  color: var(--primaryColor);
}

@keyframes rotate {
  0% {
    transform: rotateZ(0deg); /*从0度开始*/
  }
  100% {
    transform: rotateZ(360deg); /*360度结束*/
  }
}
</style>