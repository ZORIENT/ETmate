<!-- 主页 -->

<template>
  <div class="container">
    <!-- 左侧占位 -->
    <div class="contentLeft"></div>

    <div class="content">
      <!-- 中间-头部走马灯部分+6个选择条目 -->
      <div class="header">
        <MarqueePage />
      </div>

      <div class="centerPart">
        <!-- 热门电影 -->
        <div class="popularFilms">
          <PopularCard/>
        </div>

        <!-- 热门游戏 -->
        <div class="popularGames">热门游戏</div>

        <!-- 热门书籍 -->
        <div class="populardBooks">热门书籍</div>
      </div>
    </div>

    <!-- 右侧占位 -->
    <div class="contentRight"></div>
  </div>
</template>

<script>
import MarqueePage from "@/components/HomePage/MarqueePage.vue";
import PopularCard from "@/components/HomePage/PopularCard.vue"
export default {
  name: "HomePage",
  components: { MarqueePage ,PopularCard},
};
</script>

<style scoped>
.container {
  /* border:1px solid red; */
  display: flex;
  /* 因为高度塌陷导致这里必须加上导航栏的margin-top：60px */
  /* margin-top: 68px; */

  /* display: grid;
  grid-template-columns: 222px auto 222px;
  grid-template-rows: auto; */
}

.contentLeft {
  /* border:10px solid blue; */
  width: 222px;
  /* border-right: 1px solid var(--lightTheme); */
}

.contentRight {
  /* border:10px solid yellow; */
  width: 222px;
  /* border-left: 1px solid var(--lightTheme); */
}

.content {
  display: flex;
  flex-direction: column;
  /* border:1px solid green; */
  width: 100%;
}

/* .header {
  border: 1px solid red;
} */

.centerPart {
  /* border: 1px solid green; */
  display: flex;
  flex-direction: column;
}

/* .popularFilms{
    border: 1px solid green;
}

.popularGames{
    border: 1px solid red;
}

.popularBooks{
    border: 1px solid blue;
} */
</style>