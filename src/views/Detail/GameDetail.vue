<template>
  <div class="container">
    <!-- 左侧游戏详情的容器 -->
    <div class="left">
      <!-- 游戏详情 -->
      <div class="detail">
        <div class="img">
          <img :src="gameInfo.cover" />
        </div>

        <div class="info">
          <h1>
            {{ gameInfo.name_ch }}
          </h1>

          <h1>{{ gameInfo.name_en }} ({{ gameInfo.year }})</h1>
          <p>
            <span>制作发行：</span
            ><span class="inner">{{ gameInfo.publisher }}</span>
          </p>

          <p>
            <span>游戏类型：</span
            ><span class="inner">{{ gameInfo.type }}</span>
          </p>

          <p>
            <span>平台支持：</span
            ><span class="inner">{{ gameInfo.platform }}</span>
          </p>

          <p>
            <span>发行时间：</span
            ><span class="inner">{{ gameInfo.releaseDate }}</span>
          </p>

          <p>
            <span>游戏标签：</span
            ><span class="inner">{{ gameInfo.tags }}</span>
          </p>

          <p><span>游戏别名：</span>{{ gameInfo.name_en }}</p>

          <p><span>游戏地址：</span><a :href="gameInfo.gameUrl">点击此处</a></p>
        </div>
      </div>

      <!-- 游戏视频 -->
      <div class="video">
        <h1 class="title">游戏视频</h1>
        <div class="videoRate">
          <video width="530px" height="298px" controls autoplay loop>
            <source :src="gameInfo.videoUrl" type="video/mp4" />
            暂时无法播放
          </video>

          <!-- 评分展示区域 -->
          <div class="rateArea">
            <!-- <div class="title">电影评分</div> -->

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
                <el-button
                  class="notFavorited"
                  v-show="!isFavorited"
                  @click="handleFavorited"
                  >添加至收藏</el-button
                >
                <el-button
                  class="favorited"
                  v-show="isFavorited"
                  @click="handleFavorited"
                  >从收藏移出</el-button
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 游戏简介 -->
      <div class="intro">
        <h1 class="title">游戏简介</h1>
        <p>{{ gameInfo.intro }}</p>
      </div>

      <!-- 相关电影列表 -->
      <div class="related">
        <h1 class="title">相关游戏</h1>
        <div class="relatedGames">
          <CardPage
            v-for="game in relatedGames"
            :key="game.id"
            :item="game"
          ></CardPage>
        </div>
      </div>

      <!-- 评论区 -->
      <div class="comments">
        <div class="title">网友评论</div>
        <CommentPage></CommentPage>
      </div>
    </div>

    <!-- 右侧游戏推荐的容器 -->
    <div class="right">
      <!-- 游戏推荐区域 -->
      <div class="recommendList">
        <div class="title">热门游戏</div>

        <div class="recommendGame" v-for="game in 10" :key="game">
          <div class="left">
            <img src="https://imgs.gamersky.com/ku/2017/ku_thewalkingdeadseason2.jpg" />
          </div>

          <div class="right">
            <h1>行尸走肉：第二季</h1>
            <h2>类型：动作游戏</h2>
            <h3>
              标签：生存/冒险/动作/恐怖/剧集/后末日/指向点击/自选历险体验/选择取向/剧情丰富
            </h3>
            <h4>厂商：Telltale Games</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import CommentPage from "@/components/Detail/CommentPage.vue";
import CardPage from "@/components/CardPage.vue";

export default {
  name: "GameDetail",
  components: { CardPage, CommentPage },

  data() {
    return {
      isFavorited: false,
      gameInfo: {
        cover:
          "https://imgs.gamersky.com/upimg/new_preview/2021/06/11/origin_b_202106110758463268.jpg",
        videoUrl:
          "http://cdn.akamai.steamstatic.com/steam/apps/256867721/movie480_vp9.webm?t=1645830839",
        name_ch: "艾尔登法环",
        name_en: "Elden Ring",
        year: "2022",
        publisher: "From Software/Bandai Namco",
        type: "动作游戏",
        platform: "PC/PS5/PS4/XSX/XboxOne",
        releaseDate: "2022-02-25(PC)",
        tags: "类魂系列/开放世界/角色扮演/奇幻/困难/动作/动作角色扮演/单人/黑暗奇幻/氛围",
        alias: "Elden Ring",
        imdb: "tt4855822565",
        gameUrl: "https://ku.gamersky.com/2020/elden-ring/",
        intro:
          "《艾尔登法环》是一款以正统黑暗奇幻世界为舞台的动作RPG游戏。走进辽阔的场景与地下迷宫探索未知，挑战困难重重的险境，享受克服困境时的成就感吧。不仅如此，登场角色之间的利害关系谱成的群像剧，更是不容错过。",
      },
      relatedGames: [
        {
          id: 1,
          cover: "https://imgs.gamersky.com/ku/2013/ku_crusaderkings2.jpg",
          name: "十字军之王2",
          score: "策略游戏",
          intro: "中世纪/历史/多人/政治/重玩价值/单人/政治性/即时战略/好评原声音轨/策略",
        },
        {
          id: 2,
          cover:
            "https://imgs.gamersky.com/ku/2017/ku_eurotrucksimulator2.jpg",
          name: "欧洲卡车模拟2",
          score: "模拟游戏",
          intro: "历史/多人/政治/重玩价值/单人/政治性/即时战略/好评原声音轨/策略",
        },
        {
          id: 3,
          cover: "https://imgs.gamersky.com/ku/2013/ku_fasterthanlight.jpg",
          name: "超越光速",
          score: "策略游戏",
          intro: "多人/政治/重玩价值/单人/政治性/即时战略/好评原声音轨/策略",
        },
        {
          id: 4,
          cover:
            "https://imgs.gamersky.com/ku/2017/ku_ff7.jpg",
          name: "最终幻想7",
          score: "角色扮演",
          intro: "重玩价值/单人/政治性/即时战略/好评原声音轨/策略",
        },
        {
          id: 5,
          cover: "https://imgs.gamersky.com/ku/2013/ku_halflifecryoffear.jpg",
          name: "半条命：恐惧之泣",
          score: "第一人称射击",
          intro: "政治性/即时战略/好评原声音轨/策略",
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
  methods: {
    handleFavorited() {
      this.isFavorited = !this.isFavorited;
    },
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

.left {
  display: flex;
  flex-direction: column;

  width: 850px;
  /* margin-right: 20px; */
  /* border:1px solid green; */
}

.left .video {
  margin-top: 10px;
}

.left .video .videoRate{
    display: flex;
}

.left .video video {
  border-radius: 4px;
  /* border: 1px solid red; */
  margin-right: 20px;
}

.detail {
  display: flex;
  /* border: 1px solid red; */
}

.detail img {
  /* border: 1px solid green; */
  width: 192px;
  height: 272px;
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

.related .relatedGames {
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
  justify-content: center;
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

.recommendList .recommendGame {
  display: flex;
  /* border: 1px solid green; */
  padding: 10px 0px;
  border-bottom: 1px solid var(--lightTheme);
}

.recommendList .recommendGame:hover {
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
.favoriteBtn .favorited:hover::before {
  background-position: left bottom;
}
</style>