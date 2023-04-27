<template>
  <div class="container">
    <!-- 左侧电影详情的容器 -->
    <div class="left">
      <!-- 电影详情 -->
      <div class="detail">
        <div class="img">
          <img src="https://1b2a.net/img/mv/0Pdr.webp" />
        </div>

        <div class="info">
          <h1>
            {{ filmInfo.name_ch }} {{ filmInfo.name_en }} ({{ filmInfo.year }})
          </h1>
          <p>
            <span>导演：</span
            ><span class="inner">{{ filmInfo.director }}</span>
          </p>

          <p>
            <span>主演：</span><span class="inner">{{ filmInfo.actors }}</span>
          </p>

          <p>
            <span>类型：</span><span class="inner">{{ filmInfo.type }}</span>
          </p>

          <p>
            <span>地区：</span><span class="inner">{{ filmInfo.region }}</span>
          </p>

          <p>
            <span>语言：</span
            ><span class="inner">{{ filmInfo.language }}</span>
          </p>

          <p><span>上映：</span>{{ filmInfo.releaseDate }}</p>

          <p><span>片长：</span>{{ filmInfo.mins }}</p>

          <p><span>别名：</span>{{ filmInfo.alias }}</p>

          <p>
            <span>评分：</span
            ><span class="rate">豆瓣 {{ filmInfo.rate }}</span>
          </p>

          <p><span>IMDB：</span>{{ filmInfo.imdb }}</p>
        </div>
      </div>

      <!-- 电影简介 -->
      <div class="intro">
        <h1 class="title">电影简介</h1>
        <p>{{ filmInfo.intro }}</p>
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
            <h1>{{ rateInfo.rate * 2}}</h1>
            <div class="stars">
              <el-rate v-model="rateInfo.rate" disabled text-color="#ff9900"></el-rate>
              <h2>{{rateInfo.numberOfRate}}人已评价</h2>
            </div>
          </div>

          <div class="process">
            <div><span>5星</span><el-progress :text-inside="true" :stroke-width="18" :percentage="rateInfo.stars.star5" ></el-progress></div>
            <div><span>4星</span><el-progress :text-inside="true" :stroke-width="18" :percentage="rateInfo.stars.star4" ></el-progress></div>
            <div><span>3星</span><el-progress :text-inside="true" :stroke-width="18" :percentage="rateInfo.stars.star3" ></el-progress></div>
            <div><span>2星</span><el-progress :text-inside="true" :stroke-width="18" :percentage="rateInfo.stars.star2" ></el-progress></div>
            <div><span>1星</span><el-progress :text-inside="true" :stroke-width="18" :percentage="rateInfo.stars.star1" ></el-progress></div>
          </div>
        </div>
      </div>

      <!-- 电影推荐区域 -->
      <div class="recommendList">
        <div class="left">
          <img src="https://1b2a.net/img/mv/nKdd.webp">
        </div>

        <div class="right">
          <h1>流浪地球</h1>
          <h2>类型：科幻/冒险/灾难</h2>
          <h3>主演：吴京/刘德华/李雪健/沙溢/宁理/王智/吴京/刘德华/李雪健/沙溢/宁理/王智</h3>
          <h4>评分：豆瓣 7.6</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommentPage from "@/components/Detail/CommentPage.vue"
import CardPage from "@/components/CardPage.vue";

export default {
  name: "FilmDetail",
  components: { CardPage , CommentPage},

  data() {
    return {
      filmInfo: {
        cover: "https://1b2a.net/img/mv/0Pdr.webp",
        name_ch: "看不见的客人",
        name_en: "Contratiempo",
        year: "2016",
        director: "奥利奥尔·保罗",
        actors:
          "马里奥·卡萨斯 / 阿娜·瓦格纳 / 何塞·科罗纳多 / 巴巴拉·莱涅 / 弗兰塞斯克·奥雷利亚 / 帕科·图斯 / 大卫·塞尔瓦斯 / 伊尼戈·加斯特西 / 圣·耶拉莫斯 / 马内尔·杜维索 / 布兰卡·马丁内斯 / 佩雷·布拉索 / 霍尔迪·布鲁内特 / 鲍比·冈萨雷斯 / 玛蒂娜·乌尔塔多",
        type: "剧情 / 惊悚 / 犯罪 / 悬疑 / 人性",
        region: "西班牙",
        language: "西班牙语",
        releaseDate: "2017年09月15日",
        mins: "106",
        alias: "死无对证(港)/布局(台)",
        rate: "8.8",
        imdb: "tt4855822565",
        intro:
          "艾德里安（马里奥·卡萨斯 Mario Casas 饰）经营着一间科技公司，事业蒸蒸日上，家中有美丽贤惠的妻子和活泼可爱的女儿，事业家庭双丰收的他是旁人羡慕的对象。然而，野心勃勃的艾德里安并未珍惜眼前来之不易的生活，一直以来，他和一位名叫劳拉（芭芭拉·蓝妮 Bárbara Lennie 饰）的女摄影师保持着肉体关系。某日幽会过后，两人驱车离开别墅，却在路上发生了车祸，为了掩盖事件的真相，两人决定将在车祸中死去的青年丹尼尔联同他的车一起沉入湖底。之后，劳拉遇见了一位善良的老人，老人将劳拉坏掉的车拉回家中修理，然而，令劳拉没有想到的是，这位老人，竟然就是丹尼尔的父亲。",
      },
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
  border: 1px solid green;
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

.rateArea .rateInfo .rate h1{
  /* border: 1px solid yellow; */
  color: var(--primaryColor);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  padding: 10px;
}

.rateArea .rateInfo .rate .stars{
  /* border: 1px solid red; */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 150px;
}

.rateArea .rateInfo .rate h2{
  /* color: red; */
  color:var(--primaryColor);
  font-size: 13px;
}

/* ********************************************* */
.rateArea .rateInfo .process {
  width: 300px;
  /* border: 1px solid red; */
}

.rateArea .rateInfo .process div{
  display: flex;
  /* flex-direction: column; */
  padding: 4px 0px;
  align-items: center;
}

.rateArea .rateInfo .process div span{
  width: 30px;
  font-size: 13px;
  line-height: 18px;
}

.rateArea .rateInfo .process div >>> .el-progress{
  /* background: red; */
  height: 18px;
  width: 270px;
}

.rateArea .rateInfo .process div >>> .el-progress-bar__outer{
  background: none !important;
  border-radius: 4px;
}

.rateArea .rateInfo .process div >>> .el-progress-bar__inner{
  background: var(--primaryColor);
  border-radius: 4px;
}

.rateArea .rateInfo .process div >>> .el-progress-bar__innerText{
  color: var(--lightTheme) !important;
}

/* ********************************************** */
.comments{
  /* width: 400px; */
  
  /* border: 1px solid green; */
  /* height: 100%; */

  border-top: 1px solid var(--lightTheme);
}

/* ************************************************** */
.recommendList{
  border: 1px solid red;
}

.recommendList .left img{
  background: red;
  width: 60px;
  height: 88px;
}

</style>