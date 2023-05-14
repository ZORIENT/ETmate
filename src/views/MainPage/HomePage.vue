<!-- 主页 -->
<template>
  <div class="container">
    <div class="content">
      <!-- 中间-头部走马灯部分+6个选择条目 -->
      <div class="header">
        <MarqueePage />
      </div>

      <div class="centerPart">
        <!-- 热门电影 -->
        <div class="popularFilms" v-loading="filmLoading">
          <div class="category">
            <h1>电影推荐</h1>
            <div class="btns">
              <button @click="$router.push({ name: 'MyFilms' })">
                <span>更多</span>
                <span class="el-icon-arrow-right"></span>
              </button>
            </div>
          </div>

          <div class="cardContainer">
            <FilmCard
              v-for="film in popularFilms"
              :key="film.filmName"
              :item="film"
            ></FilmCard>
          </div>
        </div>

        <!-- 热门游戏 -->
        <div class="popularGames" v-loading="gameLoading">
          <div class="category">
            <h1>游戏推荐</h1>
            <div class="btns">
              <button @click="$router.push({ name: 'MyGames' })">
                <span>更多</span>
                <span class="el-icon-arrow-right"></span>
              </button>
            </div>
          </div>

          <div class="cardContainer">
            <GameCard
              v-for="game in popularGames"
              :key="game.gameName"
              :item="game"
            ></GameCard>
          </div>
        </div>

        <!-- 热门书籍 -->
        <div class="popularBooks" v-loading="bookLoading">
          <div class="category">
            <h1>书籍推荐</h1>
            <div class="btns">
              <button @click="$router.push({ name: 'MyBooks' })">
                <span>更多</span>
                <span class="el-icon-arrow-right"></span>
              </button>
            </div>
          </div>

          <div class="cardContainer">
            <BookCard
              v-for="book in popularBooks"
              :key="book.bookName"
              :item="book"
            ></BookCard>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MarqueePage from "@/components/HomePage/MarqueePage.vue";
import FilmCard from "@/components/FilmCard.vue";
import GameCard from "@/components/GameCard.vue";
import BookCard from "@/components/BookCard.vue";
import {getUserId} from "@/utils/auth";
import {userCfRecommendFilm,userCfRecommendGame,userCfRecommendBook} from "@/api/recommend"

export default {
  name: "HomePage",
  components: { MarqueePage, FilmCard, GameCard, BookCard },

  data() {
    return {
      popularFilms: [],
      popularGames: [],
      popularBooks: [],
      filmLoading:false,
      gameLoading:false,
      bookLoading:false,
    };
  },

  methods:{
    getPopularFilms(){
      this.filmLoading=true;
      userCfRecommendFilm(getUserId()).then(res=>{
        if(res.code===1){
          // console.log(res.data);
          this.popularFilms=res.data;
          this.filmLoading=false;
        }else{
          this.$message.error(res.msg);
        }
      }).catch(err=>{
        console.log(err);
      })
    },

    getPopularGames(){
      this.gameLoading=true;
      userCfRecommendGame(getUserId()).then(res=>{
        if(res.code===1){
          // console.log(res.data);
          this.popularGames=res.data;
          this.gameLoading=false;
        }else{
          this.$message.error(res.msg);
        }
      }).catch(err=>{
        console.log(err);
      })
    },

    getPopularBooks(){
      this.bookLoading=true;
      userCfRecommendBook(getUserId()).then(res=>{
        if(res.code===1){
          // console.log(res.data);
          this.popularBooks=res.data;
          this.bookLoading=false;
        }else{
          this.$message.error(res.msg);
        }
      }).catch(err=>{
        console.log(err);
      })
    },

    page(){
      this.getPopularFilms();
      this.getPopularGames();
      this.getPopularBooks();
    }
  },

  mounted() {
    this.page();
  },

};
</script>

<style scoped>
.container {
  /* border:1px solid red; */
  display: flex;
  width: calc(var(--width) * 1px);
  /* 因为高度塌陷导致这里必须加上导航栏的margin-top：60px */
  /* margin-top: 68px; */

  /* display: grid;
  grid-template-columns: 222px auto 222px;
  grid-template-rows: auto; */
}

.container >>> .el-loading-mask{
  z-index: 900;
}

.content {
  display: flex;
  flex-direction: column;
  /* border:1px solid green; */
  width: 100%;
}

.centerPart {
  display: flex;
  flex-direction: column;
  width: 100%;

  /* height: 200px; */
  /* border:1px solid red; */
  margin-top: 8px;
  /* border-top: 1px solid var(--primaryColor); */
}

.popularFilms,
.popularGames,
.popularBooks {
  /* border: 1px solid red; */
  border-top: 1px solid var(--primaryColor);
  padding: 8px 0px;
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

.btns button {
  background: #fff;
  color: var(--primaryColor);
  border: 1px solid var(--primaryColor);
  border-radius: 4px;
  padding: 4px 8px;
  margin-left: 16px;
  transition: all 0.2s;
}

.btns button:hover {
  background: var(--primaryColor);
  color: #fff;
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