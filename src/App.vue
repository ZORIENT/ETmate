<template>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>
import { getToken } from "@/utils/auth"
import jwtDecode from 'jwt-decode';

export default {
  name: "App",

  mounted () {
    let token = getToken();

    // console.log("@@@", token)

    if (token != null) {
      let id = jwtDecode(token).id;

      this.$store.dispatch("getUserInfo", id);
    }
  },
};
</script>

<style>
/* 定义全局css变量，定义方式--name：值，使用方式：var(--name) */
:root {
  /* 定义全局主题色 */

  /* 主题色 */
  --primaryColor: #0e5571;

  /* 深色主题 */
  --darkTheme: #2d2d2d;

  /* 浅色主题 */
  --lightTheme: #e6e6e6;

  /* ****************************************************** */

  /* 定义全局尺度变量 */

  --fontSize: 16;
  --width: 1180;
}

/* 全局样式 */
html,
body {
  height: 100%;
  user-select: none;
  /* overflow: hidden; */
  /* 取消点击的默认事件 */
  touch-action: none;
}

::-webkit-scrollbar {
  width: 0px !important;
}

/* App局部样式 */
.container {
  height: 100%;
}

/* 下拉框样式 */
.select {
  min-width: 200px !important;
  left: 695px !important;
}

/* filter下拉框样式 */
.el-table-filter {
  left: 165px !important;
  /* color: var(--primaryColor) !important; */
}

/* .el-checkbox__input.is-checked .el-checkbox__inner{
  color: var(--primaryColor) !important;
  background: var(--primaryColor) !important;
  border-color: var(--primaryColor) !important;
} */

/* .el-checkbox__input .el-checkbox__inner:hover,
.el-checkbox__input.is-focus .el-checkbox__inner{
  border-color: var(--primaryColor) !important;
} */

/* .el-checkbox__input.is-checked+.el-checkbox__label,
.el-table-filter__bottom button:hover{
  color: var(--primaryColor) !important;
} */

.el-table-filter__bottom {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

/* ***************************************************** */
.el-dropdown-menu__item:hover {
  background: var(--lightTheme) !important;
  /* color: var(--primaryColor) !important; */
}

.el-dropdown-menu__item span:first-child {
  margin-right: 10px;
}

/* ************************************************ */
/* $message 中的button按钮样式 */
.el-message-box__btns
  .el-button:nth-child(1)，
  .el-message-box__btns
  .el-button:nth-child(2) {
  width: 100px;
  padding: 10px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  color: var(--lightTheme);
  margin: 5px 0px 5px 10px;
  text-align: center;
  font-weight: bold;
}

.el-message-box__btns .el-button:nth-child(2) {
  /* border: 1px solid red; */
  background: var(--primaryColor);
  position: relative;
  width: 80px;
  padding: 10px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  color: var(--lightTheme);
  margin: 5px 0px 5px 10px;
  text-align: center;
  font-weight: bold;
}

.el-message-box__btns .el-button:nth-child(1) {
  /* border: 1px solid green; */
  background: var(--lightTheme);
  position: relative;
  width: 80px;
  padding: 10px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  color: var(--primaryColor);
  margin: 5px 0px 5px 10px;
  text-align: center;
  font-weight: bold;
}

.el-message-box__btns .el-button::before {
  content: '';
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

.el-message-box__btns .el-button:hover::before {
  background-position: left bottom;
}

.el-message-box__title {
  color: var(--primaryColor) !important;
  font-weight: bold;
}
</style>


