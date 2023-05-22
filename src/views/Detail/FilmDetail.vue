<template>
  <div class="container">
    <!-- 左侧电影详情的容器 -->
    <div class="left">
      <!-- 电影详情 -->
      <div class="detail">
        <div class="img">
          <img :src="filmInfo.cover" />
        </div>

        <div class="info">
          <h1>{{ filmInfo.filmName }} ({{ filmInfo.releaseYear }})</h1>
          <p>
            <span>导演：</span><span class="inner">{{
              filmInfo.director ? filmInfo.director : "N/A"
            }}</span>
          </p>

          <p>
            <span>主演：</span><span class="inner">{{
              filmInfo.actors ? filmInfo.actors : "N/A"
            }}</span>
          </p>

          <p>
            <span>类型：</span><span class="inner">{{ filmInfo.genres }}</span>
          </p>

          <p>
            <span>地区：</span><span class="inner">{{ filmInfo.regions }}</span>
          </p>

          <p>
            <span>语言：</span><span class="inner">{{ filmInfo.languages }}</span>
          </p>

          <p><span>上映：</span>{{ filmInfo.releaseDate }}</p>

          <p><span>片长：</span>{{ filmInfo.mins }}分钟</p>

          <p>
            <span>别名：</span>{{ filmInfo.alias ? filmInfo.alias : "N/A" }}
          </p>

          <p>
            <span>评分：</span><span class="rate">豆瓣 {{ filmInfo.doubanScore }}</span>
          </p>

          <p><span>IMDB：</span>{{ filmInfo.imdbId }}</p>
        </div>
      </div>

      <!-- 电影简介 -->
      <div class="intro">
        <h1 class="title">电影简介</h1>
        <p><span v-html="computedText(filmInfo.storyline)"></span></p>
        <!-- <p>{{ filmInfo.storyline }}</p> -->
      </div>

      <!-- 相关电影列表 -->
      <div class="related"
           v-show="relatedFilms.length">
        <h1 class="title">相关电影</h1>
        <div class="relatedFilms">
          <FilmCard v-for="(film, index) in relatedFilms"
                    :key="index"
                    :item="film"></FilmCard>
        </div>
      </div>

      <!-- 评论区 -->
      <div class="comments">
        <div class="title">网友评论</div>
        <CommentPage :params="{ itemId: this.$route.params.id, type: 1 }"></CommentPage>
      </div>
    </div>

    <!-- 右侧电影推荐的容器 -->
    <div class="right">
      <!-- 评分展示区域 -->
      <div class="rateArea">
        <div class="title">电影评分</div>

        <div class="rateInfo">
          <div class="rate">
            <h1>{{ starAvg }}</h1>
            <div class="stars">
              <el-rate v-model="rateInfo.rateAvg"
                       disabled
                       text-color="#ff9900"></el-rate>
              <h2>{{ rateInfo.rateNum }}人已评价</h2>
            </div>
          </div>

          <div class="process">
            <div>
              <span>5星</span><el-progress :text-inside="true"
                           :stroke-width="18"
                           :percentage="star5"></el-progress>
            </div>
            <div>
              <span>4星</span><el-progress :text-inside="true"
                           :stroke-width="18"
                           :percentage="star4"></el-progress>
            </div>
            <div>
              <span>3星</span><el-progress :text-inside="true"
                           :stroke-width="18"
                           :percentage="star3"></el-progress>
            </div>
            <div>
              <span>2星</span><el-progress :text-inside="true"
                           :stroke-width="18"
                           :percentage="star2"></el-progress>
            </div>
            <div>
              <span>1星</span><el-progress :text-inside="true"
                           :stroke-width="18"
                           :percentage="star1"></el-progress>
            </div>
          </div>

          <div class="favoriteBtn"
               v-loading="collectionLoading">
            <el-button class="notFavorited"
                       v-show="!isFavorited"
                       @click="handleFavorited">添加至收藏</el-button>
            <el-button class="favorited"
                       v-show="isFavorited"
                       @click="handleFavorited">从收藏移出</el-button>
          </div>
        </div>
      </div>

      <!-- 电影推荐区域 -->
      <div class="recommendList"
           v-loading="recommendFilmLoading">
        <div class="title">热门电影</div>

        <div class="recommendFilm"
             v-for="(film, index) in popularFilms.slice(0, 6)"
             :key="index"
             @click="toFilmDetail(film.id)">
          <div class="left">
            <img :src="film.cover" />
          </div>

          <div class="right">
            <h1>{{ film.filmName }}</h1>
            <h2>类型：{{ film.tags }}</h2>
            <h3>主演：{{ film.actors }}</h3>
            <h4>评分：豆瓣 {{ film.doubanScore }}</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommentPage from "@/components/Detail/CommentPage.vue";
import FilmCard from "@/components/FilmCard.vue";
import { selectById, getSimilarFilms } from "@/api/film";
import { getUserId } from "@/utils/auth";
import {
  selectCollectionByCondition,
  insertCollection,
  deleteCollection,
} from "@/api/collection";
import { getRates } from "@/api/comment";
import router from "@/router";
import { userCfRecommendFilm } from "@/api/recommend";

export default {
  name: "FilmDetail",
  components: { FilmCard, CommentPage },

  data () {
    return {
      isFavorited: false,
      collectionLoading: false,
      recommendFilmLoading: false,
      filmInfo: {},
      relatedFilms: [],
      rateInfo: {},
      film_id: router.history.current.params.id,
      popularFilms: [],
    };
  },

  computed: {
    star5 () {
      if ((this.rateInfo.rate5 / this.rateInfo.rateNum) * 100) {
        return parseFloat(
          ((this.rateInfo.rate5 / this.rateInfo.rateNum) * 100).toFixed(2)
        );
      } else {
        return 0;
      }
    },
    star4 () {
      if ((this.rateInfo.rate4 / this.rateInfo.rateNum) * 100) {
        return parseFloat(
          ((this.rateInfo.rate4 / this.rateInfo.rateNum) * 100).toFixed(2)
        );
      } else {
        return 0;
      }
    },
    star3 () {
      if ((this.rateInfo.rate3 / this.rateInfo.rateNum) * 100) {
        return parseFloat(
          ((this.rateInfo.rate3 / this.rateInfo.rateNum) * 100).toFixed(2)
        );
      } else {
        return 0;
      }
    },
    star2 () {
      if ((this.rateInfo.rate2 / this.rateInfo.rateNum) * 100) {
        return parseFloat(
          ((this.rateInfo.rate2 / this.rateInfo.rateNum) * 100).toFixed(2)
        );
      } else {
        return 0;
      }
    },
    star1 () {
      if ((this.rateInfo.rate1 / this.rateInfo.rateNum) * 100) {
        return parseFloat(
          ((this.rateInfo.rate1 / this.rateInfo.rateNum) * 100).toFixed(2)
        );
      } else {
        return 0;
      }
    },
    starAvg () {
      if (this.rateInfo.rateAvg) {
        return parseFloat(this.rateInfo.rateAvg.toFixed(1));
      } else {
        return 0;
      }
    },
  },

  methods: {
    handleFavorited () {
      // 已经收藏过了
      if (this.isFavorited) {
        // 只能取消收藏
        this.deleteCollection();
        this.isFavorited = false;
      } else {
        // 只能添加收藏
        this.insertCollection();
        this.isFavorited = true;
      }
    },

    toFilmDetail (id) {
      this.$router.push({
        name: "FilmDetail",
        params: {
          id,
        },
      });
    },

    // 根据id查询电影信息
    selectById (id) {
      selectById(id)
        .then((res) => {
          if (res.code === 1) {
            // console.log(res.data);
            this.filmInfo = res.data;
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 条件查询电影收藏，是否已经收藏
    selectCollection (params) {
      selectCollectionByCondition(params)
        .then((res) => {
          // console.log(res.data.total);
          if (res.code === 1) {
            if (res.data.total >= 1) {
              this.isFavorited = true;
            }
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 添加收藏
    insertCollection () {
      let data = {
        userId: getUserId(),
        collectionId: this.$route.params.id,
        type: 1,
      };

      this.collectionLoading = true;

      insertCollection(data)
        .then((res) => {
          if (res.code === 1) {
            this.$message.success("收藏成功！");
            this.collectionLoading = false;
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 取消收藏
    deleteCollection () {
      // 判断当前电影是否已经被收藏
      let params = {
        userId: getUserId(),
        collectionId: this.$route.params.id,
        type: 1,
        page: 1,
        pageSize: 35,
      };
      this.collectionLoading = true;

      selectCollectionByCondition(params)
        .then((res) => {
          if (res.code === 1) {
            deleteCollection(res.data.rows[0].id)
              .then((res) => {
                if (res.code === 1) {
                  this.$message.success("取消收藏成功！");
                  this.collectionLoading = false;
                } else {
                  this.$message.error(res.msg);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            this.$message.err(res.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 获取电影的详细评分信息
    getRates (params) {
      // let params = {
      //   itemId: this.$route.params.id,
      //   type: 1,
      // };

      getRates(params)
        .then((res) => {
          if (res.code === 1) {
            // console.log(res);
            this.rateInfo = res.data;
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 根据电影id推荐相关电影
    getSimilarFilms (id) {
      getSimilarFilms(id)
        .then((res) => {
          if (res.code === 1) {
            this.relatedFilms = res.data.rows;
            // console.log(res.data.rows);
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 根据用户id个性化推荐相关电影
    getPopularFilms (userId) {
      this.recommendFilmLoading = true;
      userCfRecommendFilm(userId)
        .then((res) => {
          if (res.code === 1) {
            this.popularFilms = res.data;
            this.recommendFilmLoading = false;
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    page (id) {
      // let filmId = this.$route.params.id;
      let filmId = id;
      let userId = getUserId();

      // 判断当前电影是否已经被收藏
      let params = {
        userId: userId,
        collectionId: filmId,
        type: 1,
        page: 1,
        pageSize: 35,
      };

      let params2 = {
        itemId: filmId,
        type: 1,
      };

      // 查询判断当前电影是否已经被收藏
      this.selectCollection(params);

      // 获取当前电影的评分详情
      this.getRates(params2);

      // 根据id查询电影详情信息
      this.selectById(filmId);

      // 根据id推荐相关电影
      this.getSimilarFilms(filmId);

      // 根据用户id个性化推荐电影
      this.getPopularFilms(userId);
    },
  },

  mounted () {
    this.page(this.$route.params.id);
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  width: calc(var(--width) * 1px);

  margin-top: 20px;
  /* border:1px solid red; */
  /* height: 800px; */
}

.container >>> .el-loading-mask {
  z-index: 900;
}

.left {
  display: flex;
  flex-direction: column;

  width: 850px;
  /* margin-right: 20px; */
  /* border:1px solid green; */
}

.detail {
  display: flex;
  /* border: 1px solid red; */
}

.detail img {
  /* border: 1px solid green; */
  width: 240px;
  height: 340px;
  border-radius: 4px;
  margin-right: 20px;
}

.detail .info {
  width: 590px;
  /* border: 1px solid yellow; */
}

.detail .info h1 {
  font-size: 20px;
  font-weight: bold;
  line-height: 40px;
  color: var(--primaryColor);
}

.detail .info p {
  font-size: 13px;
  color: #333333;
  line-height: 25px;
}

.detail .info p span {
  font-weight: bold;
}

.detail .info p .inner {
  color: #337ab7;
  font-weight: normal;
}

.detail .info p .rate {
  color: #008000;
  font-weight: bold;
}

/* ********************************************************** */
.intro,
.related,
.comments {
  margin-top: 10px;
}

/* .intro h1 */
.title {
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0px;
  color: var(--primaryColor);
  /* border: 1px solid green; */
}

.intro p {
  /* 首行缩进2字符 */
  text-indent: 2em;
  font-size: 13px;
  line-height: 23px;
}

/* ********************************************************** */
.related {
  /* border: 1px solid red; */
}

.related .relatedFilms {
  /* border: 1px solid green; */
  /* display: flex;
  justify-content: space-between;
  padding: 5px 0px; */

  display: grid;
  grid-template-columns: repeat(5, 20%);
  padding: 5px 0px;
  /* ;
  grid-auto-rows: minmax(100px, auto); */
}

/* ********************************************************** */
.right {
  display: flex;
  flex-direction: column;
  /* border: 1px solid yellow; */
  width: 300px;
}

.rateArea {
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--lightTheme);
}
.rateArea .rateInfo {
  /* border: 1px solid green; */
  display: flex;
  flex-direction: column;
  width: 300px;
  /* justify-content: space-between; */
}

.rateArea .rateInfo .rate {
  /* border: 1px solid yellow; */
  /* background: yellow; */
  display: flex;
  /* margin-right: 50px; */
}

.rateArea .rateInfo .rate h1 {
  /* border: 1px solid yellow; */
  color: var(--primaryColor);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  padding: 10px;
}

.rateArea .rateInfo .rate .stars {
  /* border: 1px solid red; */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 150px;
}

.rateArea .rateInfo .rate h2 {
  /* color: red; */
  color: var(--primaryColor);
  font-size: 13px;
}

/* ********************************************* */
.rateArea .rateInfo .process {
  width: 300px;
  /* border: 1px solid red; */
}

.rateArea .rateInfo .process div {
  display: flex;
  /* flex-direction: column; */
  padding: 4px 0px;
  align-items: center;
}

.rateArea .rateInfo .process div span {
  width: 30px;
  font-size: 13px;
  line-height: 18px;
  color: var(--primaryColor);
  font-weight: bold;
}

.rateArea .rateInfo .process div >>> .el-progress {
  /* background: red; */
  height: 18px;
  width: 270px;
}

.rateArea .rateInfo .process div >>> .el-progress-bar__outer {
  background: none !important;
  border-radius: 4px;
}

.rateArea .rateInfo .process div >>> .el-progress-bar__inner {
  background: var(--primaryColor);
  border-radius: 4px;
}

.rateArea .rateInfo .process div >>> .el-progress-bar__innerText {
  color: var(--lightTheme) !important;
}

/* ********************************************** */
.comments {
  /* width: 400px; */

  /* border: 1px solid green; */
  /* height: 100%; */

  border-top: 1px solid var(--lightTheme);
}

/* ************************************************** */
.recommendList {
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
}

.recommendList .recommendFilm {
  display: flex;
  /* border: 1px solid green; */
  padding: 10px 0px;
  border-bottom: 1px solid var(--lightTheme);
}

.recommendList .recommendFilm:hover {
  background: var(--lightTheme);
  transition: all 0.4s;
}

.recommendList .left {
  /* border: 1px solid green; */
  width: 60px;
  height: 88px;
}

.recommendList .left img {
  /* background: red; */
  border-radius: 4px;
}

.recommendList .right h1,
h2,
h3,
h4 {
  color: #333333;
  font-size: 13px;
  line-height: 22px;
  /* 限制文字显示行数 */
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  padding-left: 10px;
}

.recommendList .right h1 {
  color: var(--primaryColor);
  font-weight: bold;
}

/* ******************************************************** */
.favoriteBtn {
  display: flex;
  flex-direction: column;
}

.favoriteBtn .notFavorited {
  background: var(--primaryColor);
  color: #fff;
}

.favoriteBtn .favorited {
  background: var(--lightTheme);
  color: var(--primaryColor);
}

.favoriteBtn .notFavorited,
.favoriteBtn .favorited {
  border-radius: 4px;
  font-size: 14px;
  width: 120px;
  padding: 10px;
  text-align: center;
  font-weight: bold;
  position: relative;
  margin: 10px 0px;
  width: 100%;
  border: none;
}

.favoriteBtn .notFavorited::before,
.favoriteBtn .favorited::before {
  content: '';
  position: absolute;
  background: linear-gradient(
    to left,
    rgba(255, 255, 255, 0) 50%,
    rgba(255, 255, 255, 0.6) 50%
  );
  background-size: 210% 100%;
  border-radius: 4px;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
  transition: all 0.4s;
  background-position: right bottom;
}

.favoriteBtn .notFavorited:hover::before,
.favoriteBtn .favorited:hover::before {
  background-position: left bottom;
}
</style>