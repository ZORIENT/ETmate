<template>
  <div class="container">
    <h1>个性化娱乐方式推荐系统 |</h1>
    <a href="https://github.com/ZORIENT/ETmate.git">&nbsp;Github&nbsp;</a>
    <h1>| ZORIENT | Copyright © Company names All rights reserved</h1>
  </div>
</template>

<script>
export default {
  name: "AppFooter",
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  position: relative;
  z-index: 900;
  border-top:1px solid var(--lightTheme);
  white-space:nowrap;

  /* 应该是60px，设定59是为了防抖 */
  margin-top: -60px;
}

.container a,h1{
    color:var(--primaryColor);
    font-size: 13px;
}
</style>