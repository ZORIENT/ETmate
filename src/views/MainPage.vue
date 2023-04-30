<!-- 主页 -->
<template>
  <div class="container">
    <!-- 头部header -->
    <AppHeader />

    <!-- 内容区 -->
    <div class="section">
      <router-view></router-view>
    </div>

    <!-- 底部footer -->
    <AppFooter />
  </div>
</template>

<script>
// 引入AppHeader
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";

export default {
  name: "MainPage",
  components: { AppHeader, AppFooter },
};
</script>

<style scoped>
.container {
  /* background: yellow; */
  /* height: 1000px; */
  /* height: 100%;
  position: relative; */
  /* overflow-x: hidden;
  overflow-y: auto; */
}

.section {
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;

  min-height: 100%;

  padding: 60px 0px 84px 0px;
  /* margin-bottom: 24px; */
  /* border: 1px solid red; */
}

.contentLeft,
.contentRight {
  width: 200px;
  /* border: 1px solid red; */
}
</style>