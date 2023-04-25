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
  z-index: 999;
  border-top:1px solid var(--lightTheme);
  white-space:nowrap;
}

.container a,h1{
    color:var(--primaryColor);
    font-size: 13px;
}
</style>