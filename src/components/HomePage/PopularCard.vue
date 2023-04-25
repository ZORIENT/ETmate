<template>
  <div class="container">
    <div class="category">
      <h1>{{ category }}</h1>
      <div class="btns">
        <button>
        <span class="el-icon-refresh"></span>
        <span>换一换</span>
      </button>
      <button>
        <span>更多</span>
        <span class="el-icon-arrow-right"></span>
      </button>
      </div>
    </div>

    <div class="cardContainer">
      <CardPage v-for="item in itemList" :key="item.id" :item="item"></CardPage>
    </div>
  </div>
</template>

<script>
import CardPage from "../CardPage.vue";

export default {
  name: "PopularCard",
  props: ["category"],
  components: { CardPage },

  data() {
    return {
      itemList: [
        {
          id: 0,
          cover: "http://img1.doubanio.com/view/subject/s/public/s1070222.jpg",
          name: "围城",
          score: "9.7",
          intro: "钱钟书/围城/中国文学/小说/经典/婚姻/现代文学/文学/",
        },
        {
          id: 1,
          cover: "http://img3.doubanio.com/view/subject/s/public/s1242786.jpg",
          name: "围城",
          score: "9.7",
          intro: "钱钟书/围城/中国文学/小说/经典/婚姻/现代文学/文学/",
        },
        {
          id: 2,
          cover: "http://img3.doubanio.com/view/subject/s/public/s1681146.jpg",
          name: "围城",
          score: "9.7",
          intro: "钱钟书/围城/中国文学/小说/经典/婚姻/现代文学/文学/",
        },
        {
          id: 3,
          cover: "http://img1.doubanio.com/view/subject/s/public/s29555070.jpg",
          name: "围城",
          score: "9.7",
          intro: "钱钟书/围城/中国文学/小说/经典/婚姻/现代文学/文学/",
        },
        {
          id: 4,
          cover: "http://img3.doubanio.com/view/subject/s/public/s29219047.jpg",
          name: "围城",
          score: "9.7",
          intro: "钱钟书/围城/中国文学/小说/经典/婚姻/现代文学/文学/",
        },
        {
          id: 5,
          cover: "http://img1.doubanio.com/view/subject/s/public/s1070222.jpg",
          name: "围城",
          score: "9.7",
          intro: "钱钟书/围城/中国文学/小说/经典/婚姻/现代文学/文学/",
        },
        {
          id: 6,
          cover: "http://img1.doubanio.com/view/subject/s/public/s1070222.jpg",
          name: "围城",
          score: "9.7",
          intro: "钱钟书/围城/中国文学/小说/经典/婚姻/现代文学/文学/",
        },
        {
          id: 7,
          cover: "http://img1.doubanio.com/view/subject/s/public/s1070222.jpg",
          name: "围城",
          score: "9.7",
          intro: "钱钟书/围城/中国文学/小说/经典/婚姻/现代文学/文学/",
        },
        {
          id: 8,
          cover: "http://img1.doubanio.com/view/subject/s/public/s1070222.jpg",
          name: "围城",
          score: "9.7",
          intro: "钱钟书/围城/中国文学/小说/经典/婚姻/现代文学/文学/",
        },
      ],
    };
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 100%;

  /* height: 200px; */
  /* border:1px solid red; */
  margin-top: 8px;
  border-top: 1px solid var(--primaryColor);
}

.category {
  /* border:1px solid red; */
  margin: 8px 0px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.category h1 {
  color: var(--primaryColor);
  font-weight: bold;
  font-size: 20px;
  /* line-height: 48px; */
}

.btns button{
  background: #fff;
  color: var(--primaryColor);
  border: 1px solid var(--primaryColor);
  border-radius: 4px;
  padding: 4px 8px;
  margin-left: 16px;
  transition: all 0.2s;
}

.btns button:hover{
  background: var(--primaryColor);
  color:#fff ;
}

.cardContainer {
  /* border: 1px solid red; */
  display: grid;
  grid-template-columns: repeat(7, auto);
  grid-gap: 10px;
  grid-template-rows: repeat(2, 270px);
  /* border: 1px solid blue; */
  /* min-width: 160px; */
  /* height: 100%; */
}
</style>