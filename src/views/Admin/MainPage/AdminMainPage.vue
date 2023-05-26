<template>
  <div class="AdminMainPage">
    <div class="stats">
      <div class="card cardShadow"
           v-for="(item,index) in cardList"
           :key="index">
        <div class="icon">
          <i :class="item.icon"></i>
        </div>
        <div class="info">
          <h1>{{item.total}}</h1>
          <h2>{{item.type}}数量</h2>
        </div>
      </div>
    </div>

    <div class="charts">
      <div class="pie cardShadow">
        <PieChart></PieChart>
      </div>

      <div class="bar cardShadow" >
        <FilmBarChart></FilmBarChart>
      </div>

      <div class="bar cardShadow" >
        <GameBarChart></GameBarChart>
      </div>

      <div class="bar cardShadow" >
        <BookBarChart></BookBarChart>
      </div>
    </div>
  </div>
</template>

<script>
import PieChart from "@/components/Admin/PieChart.vue";
import FilmBarChart from "@/components/Admin/FilmBarChart.vue";
import GameBarChart from '@/components/Admin/GameBarChart.vue';
import BookBarChart from '@/components/Admin/BookBarChart.vue';
import { getStats } from "@/api/stats"

export default {
  name: "AdminMainPage",

  components: { PieChart ,FilmBarChart,GameBarChart,BookBarChart},

  data () {
    return {
      cardList: [
        {
          icon: "el-icon-video-camera",
          type: "电影",
          total: 0
        }, {
          icon: "el-icon-coordinate",
          type: "游戏",
          total: 0
        }, {
          icon: "el-icon-reading",
          type: "书籍",
          total: 0
        }, {
          icon: "el-icon-user",
          type: "用户",
          total: 0
        }
      ],
    };
  },

  mounted () {
    this.getStats();
  },

  methods: {
    getStats () {
      getStats().then(res => {
        if (res.code === 1) {
          // console.log(res.data);
          let data = res.data;
          this.cardList[0].total = data.filmCount;
          this.cardList[1].total = data.gameCount;
          this.cardList[2].total = data.bookCount;
          this.cardList[3].total = data.userCount;
        } else {
          this.$message.error(res.msg);
        }
      }).catch(err => {
        console.log(err);
      })
    },
  },
};
</script>

<style scoped>
.AdminMainPage {
  display: flex;
  /* width: 700px; */
  display: flex;
  flex-direction: column;
  /* border: 1px solid red; */
}

.AdminMainPage .pie {
  min-width: 620px;
  height: 280px;
}

.AdminMainPage .bar {
  min-width: 620px;
  height: 280px;
}

/* ****************************************** */
.cardShadow {
  border-radius: 4px;
  box-shadow: 0px 0px 16px var(--lightTheme);
}

/* *************************************** */
.stats {
  display: grid;
  grid-template-columns: repeat(4, auto);
  grid-gap: 0px 100px;
  /* border: 1px solid red; */
  margin: 20px 0px;
}

.stats .card {
  /* border: 1px solid red; */
  display: flex;
  height: 90px;
  justify-content: space-between;
  padding: 10px 20px;
}

.stats .card .icon {
  width: 100px;
  /* border: 1px solid orange; */
  font-size: 50px;
  text-align: center;
  line-height: 70px;
}

.stats .card:nth-child(1) .icon{
  color: #52A8FF;
}

.stats .card:nth-child(2) .icon{
  color: #00B389;
}

.stats .card:nth-child(3) .icon{
  color: #FFA940;
}

.stats .card:nth-child(4) .icon{
  color: #FF5A57;
}

.stats .card .info {
  /* border: 1px solid green; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.stats .card .info h1 {
  font-size: 24px;
  color: var(--primaryColor);
  font-weight: bold;
}

.stats .card .info h2 {
  font-size: 16px;
  color: gray;
}

/* ********************************************************************** */
.charts {
  display: grid;
  grid-template-columns: repeat(2, 50%);
  grid-template-rows: repeat(2, auto);
  /* grid-gap: 0px 40px; */
  /* border: 1px solid red; */
  justify-content: space-between;
}

.charts div:nth-child(1),
.charts div:nth-child(3) {
  margin-right: 20px;
  margin-bottom: 20px;
}

.charts div:nth-child(2),
.charts div:nth-child(4) {
  /* border: 1px solid red; */
  margin-left: 20px;
  margin-bottom: 20px;
}
</style>