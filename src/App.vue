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
  --primaryColor:#0E5571;

  /* 深色主题 */
  --darkTheme: #2d2d2d;

  /* 浅色主题 */
  --lightTheme: #e6e6e6;

/* ****************************************************** */

/* 定义全局尺度变量 */

 --fontSize:16;


}

/* 全局样式 */
html,
body {
  height: 100%;
}

/* App局部样式 */
.container {
  display: felx;
  height: 100%;
}
</style>


