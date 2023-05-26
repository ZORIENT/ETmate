<template>
  <div class="container">
    <div class="leftPart">
      <el-carousel indicator-position="none"
                   :interval="5000"
                   arrow="hover">
        <el-carousel-item v-for="game in gameList"
                          :key="game.id">
          <img :src="game.img" />
          <div class="filmIntro">
            <h1>{{ game.gameName }}</h1>
            <span>{{ game.introduce }}</span>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- 右侧6张卡片 -->
    <div class="rightPart">
      <div class="card"
           v-for="card in gameList"
           :key="card.id"
           @click="$router.push({name:'GameDetail',params:{id:card.id}})">
        <div class="cardLeft">
          <img :src="card.cover" />
        </div>
        <div class="cardRight">
          <h1>{{ card.gameName }}</h1>
          <h2>{{card.genres}}</h2>
          <p>{{card.tags}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { selectById } from "@/api/game"

export default {
  name: "MarqueePage",

  data () {
    return {
      gameList: [],

      idList: [985, 869, 952, 958, 1023, 989]
    };
  },

  mounted () {
    this.getGameList();
  },

  methods: {
    getGameList () {
      this.idList.forEach(id => {
        selectById(id).then(res => {
          if (res.code === 1) {
            this.gameList.push(res.data);
            // console.log(res.data)
          } else {
            this.$message.error(res.msg);
          }
        }).catch(err => {
          console.log(err);
        })
      })
    }
  }
};
</script>

<style scoped>
.container {
  /* width: 100%; */
  height: 320px;
  margin: 10px 0px;

  display: grid;
  grid-template-columns: auto 460px;
  grid-column-gap: 10px;
  /*  1行，而且行高都为 320px  */
  grid-template-rows: 320px;
}

.leftPart {
  /* border: 1px solid green; */
  min-width: 710px;
  /* height: 100%; */
  border-radius: 8px;
  overflow: hidden;
}

.rightPart {
  display: grid;
  grid-template-columns: repeat(2, 225px);
  grid-gap: 10px;
  /*  2行，而且行高都为 50px  */
  grid-template-rows: repeat(3, 100px);

  /* border: 1px solid blue; */
  min-width: 460px;
  /* height: 100%; */
}

.leftPart >>> .el-carousel__container {
  height: 320px;
  position: relative;

  /* height: 100%; */
}

.el-carousel__item img {
  /* display: none; */
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 10;
}

.filmIntro {
  /* border: 1px solid blue; */
  width: 95%;
  margin-left: 20px;
  margin-top: -95px;
}

.filmIntro h1,
.filmIntro span {
  color: #fff;
}

.filmIntro h1 {
  font-size: 24px;
  line-height: 32px;
  height: 32px;
  font-weight: bold;
  margin-bottom: 6px;
}

.filmIntro span {
  font-size: 13px;
  line-height: 20px;
  height: 40px;
  /* 限制文字显示行数 */
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.el-carousel__item {
  background-color: var(--primaryColor);
}

/* ************************************* */

.card {
  border: 1px solid var(--lightTheme);
  display: flex;
  border-radius: 8px;
  overflow: hidden;

  width: 225px;
  cursor: pointer;
}

.card:hover {
  background: var(--lightTheme);
}

.cardLeft {
  /* border: 1px solid blue; */
}

.cardLeft img {
  height: 100px;
  width: 70px;
  object-fit: cover;
}

.cardRight {
  /* border:1px solid green; */
  padding: 10px;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  justify-content: space-between;
}

.cardRight h1 {
  font-size: 13px;
  color: var(--primaryColor);
}

.cardRight h2,
p {
  font-size: 12px;
  color: #717171;
}

.cardRight p {
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>