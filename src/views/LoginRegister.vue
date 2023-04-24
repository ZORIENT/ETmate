<!-- 登录与注册页 -->
<!-- 根据是否为管理员账户选择跳转的页面 -->

<template>
  <div class="LoginRegister">
    <div class="container">
      <!-- 左侧的注册盒子 -->
      <div class="registerBox" v-show="!isLogin">
        <h1>注 册</h1>

        <el-form
          :model="registerForm"
          :rules="registerRules"
          ref="registerForm"
        >
          <el-form-item prop="email">
            <el-input
              placeholder="邮箱"
              type="email"
              v-model="registerForm.email"
            ></el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              placeholder="输入密码"
              show-password
              v-model="registerForm.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item prop="checkPassword">
            <el-input
              placeholder="确认密码"
              show-password
              v-model="registerForm.checkPassword"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button @click="submitForm('registerForm')">注 册</el-button>
            <el-button @click="resetForm('registerForm')">重 置</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 右侧的登录盒子 -->
      <div class="loginBox" v-show="isLogin">
        <h1>登 录</h1>
        <el-form :model="loginForm" :rules="loginRules" ref="loginForm">
          <el-form-item prop="account">
            <el-input
              placeholder="邮箱"
              type="email"
              v-model="loginForm.account"
            ></el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              placeholder="密码"
              type="password"
              show-password
              autocomplete="off"
              v-model="loginForm.password"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button @click="submitForm('loginForm')">登 录</el-button>
            <el-button @click="resetForm('loginForm')">重 置</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 移动遮罩 -->
      <div :class="isLogin ? 'cover loginAni' : 'cover registerAni'">
        <!-- 登陆时的提示信息 -->
        <div v-show="isLogin" class="loginInfo">
          <button @click="signUp">立即注册</button>
        </div>

        <!-- 注册时的提示信息 -->
        <div v-show="!isLogin" class="registerInfo">
          <button @click="signIn">立即登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginRegister",

  data() {
    // 注册表单的密码验证
    var validatePassRegister = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.registerForm.checkPassword !== "") {
          this.$refs.registerForm.validateField("checkPassword");
        }
        callback();
      }
    };

    // 注册表单的确认密码验证
    var validatePassRegister2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    // 登录表单的账号验证
    var validateAccountLogin = (rule, value, callback) => {
      // 数据测试
      if (value === "") {
        callback(new Error("请输入正确的邮箱地址"));
      } else if (value !== "zorient") {
        callback(new Error("该账户不存在"));
      } else {
        callback();
      }
    };

    var validatePassLogin = (rule, value, callback) => {
      // 数据测试
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };

    return {
      // 显示哪个表单(默认为登录)
      isLogin: true,

      nextPage:"MainPage",

      // 注册表单的数据
      registerForm: {
        email: "",
        password: "",
        checkPassword: "",
      },

      // 登录表单的数据
      loginForm: {
        account: "",
        password: "",
      },

      // 注册表单规则
      registerRules: {
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        password: [
          { validator: validatePassRegister, trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "密码长度应为6-10个字符",
            trigger: "blur",
          },
        ],
        checkPassword: [{ validator: validatePassRegister2, trigger: "blur" }],
      },

      // 登录表单规则
      loginRules: {
        account: [{ validator: validateAccountLogin, trigger: "blur" }],

        password: [
          { validator: validatePassLogin, trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "密码长度应为6-10个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!" + formName);

          this.$router.push(this.nextPage);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    // 切换到登录
    signIn() {
      if (this.isLogin !== true) {
        this.isLogin = true;
      }
    },
    // 切换到注册
    signUp() {
      if (this.isLogin === true) {
        this.isLogin = false;
      }
    },
  },
};
</script>

<style scoped>
.LoginRegister {
  /* background: green; */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  /* border: 1px solid red; */

  background: url("../assets/img/bg.jpg");
  background-size: cover;
}

.container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  /* border: 1px solid red; */
  height: 500px;
  width: 618px;

  border-radius: 5px;
  box-shadow: 4px 4px 10px #2b2b2b;
}

.container >>> .el-input {
  display: flex;
  justify-content: center;
  position: relative;

  line-height: 100%;
}

.container >>> .el-input__suffix {
  right: 24%;
  font-size: 20px;
}
.container >>> .el-input__inner {
  width: 80%;
  border: none;
  border-radius: 4px;
  box-shadow: inset 4px 4px 4px #cbced1, inset -4px -4px 4px #fff !important;
  transition: all 0.4s;
}

.container >>> .el-form-item__content {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.container >>> .el-input__inner:focus {
  border-radius: 16px;
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

.container >>> .el-button:first-child {
  background-color: var(--primaryColor);
  color: var(--lightTheme);
}

.container >>> .el-button:hover::before {
  background-position: left bottom;
}

.container h1 {
  font-size: 24px;
  text-align: center;
  /* font-weight: bold; */
  margin: 36px 0px;
  color: var(--primaryColor);
  font-weight: bold;
}

.registerBox,
.loginBox {
  display: flex;
  flex-direction: column;
  justify-content: center;

  height: 100%;
  width: 50%;

  /* border: 1px solid red; */
  border-radius: 5px;
  background: var(--lightTheme);
}

.registerBox {
  position: absolute;
  left: 0px;
}

.loginBox {
  position: absolute;
  right: 0px;
}

.cover {
  position: absolute;
  top: 0px;
  left: 0px;

  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;
  width: 50%;

  background: rgba(14, 85, 113, 0.2);

  transition: all 0.2s;

  /* border: 1px solid blue; */
}

.cover button {
  border-radius: 4px;
  font-size: 16px;
  padding: 6px 20px;
  width: 100%;
  text-align: center;
  margin-top: 100px;
  font-weight: bold;
  color: var(--primaryColor);
  position: relative;
  border: 4px solid var(--lightTheme);

  background-color: transparent;
  transition: all 0.4s;
}

.cover button:hover {
  background-color: var(--lightTheme);
  color: var(--primaryColor);
}

.loginAni {
  transform: translateX(0%);
}

.registerAni {
  transform: translateX(100%);
}
</style>