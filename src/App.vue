<template>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
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
}

::-webkit-scrollbar{
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
.el-table-filter{
  left: 165px !important;
  /* color: var(--primaryColor) !important; */
}

.el-checkbox__input.is-checked .el-checkbox__inner{
  color: var(--primaryColor) !important;
  background: var(--primaryColor) !important;
  border-color: var(--primaryColor) !important;
}

.el-checkbox__input .el-checkbox__inner:hover,
.el-checkbox__input.is-focus .el-checkbox__inner{
  border-color: var(--primaryColor) !important;
}

.el-checkbox__input.is-checked+.el-checkbox__label,
.el-table-filter__bottom button:hover{
  color: var(--primaryColor) !important;
}

.el-table-filter__bottom{
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.el-table-filter__bottom button.is-disabled:hover{
  color: #c0c4cc !important;
}
</style>


