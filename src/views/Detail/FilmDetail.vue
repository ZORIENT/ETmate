<template>
  <div class="container">
    <!-- 左侧电影详情的容器 -->
    <div class="left">
      <!-- 电影详情 -->
      <div class="detail">
        <div class="img">
          <img :src="filmInfo.cover"/>
        </div>

        <div class="info">
          <h1>
            {{ filmInfo.filmName }} ({{ filmInfo.releaseYear }})
          </h1>
          <p>
            <span>导演：</span><span class="inner">{{ filmInfo.director }}</span>
          </p>

          <p>
            <span>主演：</span><span class="inner">{{ filmInfo.actors }}</span>
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

          <p><span>别名：</span>{{ filmInfo.alias }}</p>

          <p>
            <span>评分：</span><span class="rate">豆瓣 {{ filmInfo.doubanScore }}</span>
          </p>

          <p><span>IMDB：</span>{{ filmInfo.imdbId }}</p>
        </div>
      </div>

      <!-- 电影简介 -->
      <div class="intro">
        <h1 class="title">电影简介</h1>
        <p>{{ filmInfo.storyline }}</p>
      </div>

      <!-- 相关电影列表 -->
      <div class="related">
        <h1 class="title">相关电影</h1>
        <div class="relatedFilms">
          <CardPage
            v-for="film in relatedFilms"
            :key="film.id"
            :item="film"
          ></CardPage>
        </div>
      </div>

      <!-- 评论区 -->
      <div class="comments">
        <div class="title">网友评论</div>
        <CommentPage></CommentPage>
      </div>
    </div>

    <!-- 右侧电影推荐的容器 -->
    <div class="right">
      <!-- 评分展示区域 -->
      <div class="rateArea">
        <div class="title">电影评分</div>

        <div class="rateInfo">
          <div class="rate">
            <h1>{{ rateInfo.rate * 2 }}</h1>
            <div class="stars">
              <el-rate
                v-model="rateInfo.rate"
                disabled
                text-color="#ff9900"
              ></el-rate>
              <h2>{{ rateInfo.numberOfRate }}人已评价</h2>
            </div>
          </div>

          <div class="process">
            <div>
              <span>5星</span
              ><el-progress
                :text-inside="true"
                :stroke-width="18"
                :percentage="rateInfo.stars.star5"
              ></el-progress>
            </div>
            <div>
              <span>4星</span
              ><el-progress
                :text-inside="true"
                :stroke-width="18"
                :percentage="rateInfo.stars.star4"
              ></el-progress>
            </div>
            <div>
              <span>3星</span
              ><el-progress
                :text-inside="true"
                :stroke-width="18"
                :percentage="rateInfo.stars.star3"
              ></el-progress>
            </div>
            <div>
              <span>2星</span
              ><el-progress
                :text-inside="true"
                :stroke-width="18"
                :percentage="rateInfo.stars.star2"
              ></el-progress>
            </div>
            <div>
              <span>1星</span
              ><el-progress
                :text-inside="true"
                :stroke-width="18"
                :percentage="rateInfo.stars.star1"
              ></el-progress>
            </div>
          </div>

          <div class="favoriteBtn">
            <el-button class="notFavorited" v-show="!isFavorited" @click="handleFavorited">添加至收藏</el-button>
            <el-button class="favorited" v-show="isFavorited" @click="handleFavorited">从收藏移出</el-button>
          </div>
        </div>
      </div>

      <!-- 电影推荐区域 -->
      <div class="recommendList">
        <div class="title">热门电影</div>

        <div class="recommendFilm" v-for="film in 6" :key="film">
          <div class="left">
            <img src="https://1b2a.net/img/mv/nKdd.webp" />
          </div>

          <div class="right">
            <h1>流浪地球</h1>
            <h2>类型：科幻/冒险/灾难</h2>
            <h3>
              主演：吴京/刘德华/李雪健/沙溢/宁理/王智/吴京/刘德华/李雪健/沙溢/宁理/王智
            </h3>
            <h4>评分：豆瓣 7.6</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommentPage from "@/components/Detail/CommentPage.vue";
import CardPage from "@/components/CardPage.vue";
import {selectById} from "@/api/film"

export default {
  name: "FilmDetail",
  components: { CardPage, CommentPage },

  data() {
    return {
      isFavorited:false,
      filmInfo: {},
      relatedFilms: [
        {
          id: 1,
          cover: "http://img1.doubanio.com/view/subject/s/public/s29555070.jpg",
          name: "围城",
          score: "9.7",
          intro: "钱钟书/围城/中国文学/小说/经典/婚姻/现代文学/文学/",
        },
        {
          id: 2,
          cover:
            "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2458866562.jpg",
          name: "围城",
          score: "9.7",
          intro: "钱钟书/围城/中国文学/小说/经典/婚姻/现代文学/文学/",
        },
        {
          id: 3,
          cover: "https://img3.doubanio.com/view/subject/l/public/s4473806.jpg",
          name: "围城",
          score: "9.7",
          intro: "钱钟书/围城/中国文学/小说/经典/婚姻/现代文学/文学/",
        },
        {
          id: 4,
          cover:
            "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2558964271.jpg",
          name: "围城",
          score: "9.7",
          intro: "钱钟书/围城/中国文学/小说/经典/婚姻/现代文学/文学/",
        },
        {
          id: 5,
          cover: "https://img3.doubanio.com/view/subject/l/public/s2987672.jpg",
          name: "围城",
          score: "9.7",
          intro: "钱钟书/围城/中国文学/小说/经典/婚姻/现代文学/文学/",
        },
      ],
      rateInfo: {
        // 此处评分是星级乘2
        rate: 4.3,
        numberOfRate: 213,
        // 评分具体分布
        stars: {
          star1: 10,
          star2: 20,
          star3: 30,
          star4: 30,
          star5: 10,
        },
      },
    };
  },
  methods:{
    handleFavorited(){
      this.isFavorited=!this.isFavorited;
    },
    test(){
      console.log("test");
    },

    // 根据id查询电影信息
    selectById(id){
      selectById(id).then(res=>{
        if(res.code===1){
          console.log(res.data);
          this.filmInfo=res.data;
        }else{
          this.$message.error(res.msg);
        }

      }).catch(err=>{
        console.log(err);
      })
    }
  },
  mounted(){
    let id=this.$route.params.id;

    // 根据id查询电影详情信息
    this.selectById(id);
  }
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
  display: flex;
  justify-content: space-between;
  padding: 5px 0px;
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
  color:var(--primaryColor);
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


.recommendList .recommendFilm{
  display: flex;
  /* border: 1px solid green; */
  padding: 10px 0px;
  border-bottom: 1px solid var(--lightTheme);
}

.recommendList .recommendFilm:hover{
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

.recommendList .right h1,h2,h3,h4{
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

.recommendList .right h1{
  color: var(--primaryColor);
  font-weight: bold;
}

/* ******************************************************** */
.favoriteBtn{
  display: flex;
  flex-direction: column;
}


.favoriteBtn .notFavorited{
  background: var(--primaryColor);
  color: #fff;

}

.favoriteBtn .favorited{
  background: var(--lightTheme);
  color: var(--primaryColor);
}

.favoriteBtn .notFavorited,
.favoriteBtn .favorited{
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
.favoriteBtn .favorited::before{
  content: "";
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
.favoriteBtn .favorited:hover::before{
  background-position: left bottom;
}
</style>