<template>
  <div class="container">
    <!-- 左侧书籍详情的容器 -->
    <div class="left">
      <!-- 书籍详情 -->
      <div class="detail">
        <div class="img">
          <img :src="bookInfo.cover" />
        </div>

        <div class="info">
          <h1>
            {{ bookInfo.name_ch }}
          </h1>
          <p>
            <span>作者：</span><span class="inner">{{ bookInfo.author }}</span>
          </p>

          <p>
            <span>译者：</span><span class="inner">{{ bookInfo.translator }}</span>
          </p>
          <p>
            <span>标签：</span><span class="inner">{{ bookInfo.tags }}</span>
          </p>

          <p>
            <span>出版商：</span><span class="inner">{{ bookInfo.publisher }}</span>
            </p>

          <p><span>页数：</span>{{ bookInfo.pages }}页</p>
          
          <p><span>价格：</span>{{ bookInfo.price }}</p>

          <p><span>出版时间：</span>{{ bookInfo.releaseDate }}</p>

          <p>
            <span>评分：</span><span class="rate">豆瓣 {{ bookInfo.rate }}</span>
          </p>

          <p><span>ISBN：</span>{{ bookInfo.ISBN }}</p>

        </div>
      </div>

      <!-- 作者简介 -->
      <div class="intro">
        <h1 class="title">作者简介</h1>
        <p>{{ bookInfo.authorIntro }}</p>
      </div>

      <!-- 书籍简介 -->
      <div class="intro">
        <h1 class="title">书籍简介</h1>
        <p>{{ bookInfo.intro }}</p>
      </div>

      <!-- 相关书籍列表 -->
      <div class="related">
        <h1 class="title">相关书籍</h1>
        <div class="relatedBooks">
          <CardPage
            v-for="book in relatedBooks"
            :key="book.id"
            :item="book"
          ></CardPage>
        </div>
      </div>

      <!-- 评论区 -->
      <div class="comments">
        <div class="title">网友评论</div>
        <CommentPage></CommentPage>
      </div>
    </div>

    <!-- 右侧书籍推荐的容器 -->
    <div class="right">
      <!-- 评分展示区域 -->
      <div class="rateArea">
        <div class="title">书籍评分</div>

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

      <!-- 书籍推荐区域 -->
      <div class="recommendList">
        <div class="title">热门书籍</div>

        <div class="recommendbook" v-for="book in 6" :key="book">
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

export default {
  name: "BookDetail",
  components: { CardPage, CommentPage },

  data() {
    return {
      isFavorited: false,
      bookInfo: {
        cover: "http://img1.doubanio.com/view/subject/s/public/s27264181.jpg",
        name_ch: "解忧杂货店",
        author: "[日] 东野圭吾",
        translator: "李盈春",
        publisher: "南海出版公司",
        tags: "东野圭吾/治愈/温暖/小说/日本/日本文学/東野圭吾/推理/",
        pages: 291,
        price: "39.50元",
        rate:8.5,
        releaseDate: "2014年5月",
        ISBN: "9787544270878",
        intro:
          "现代人内心流失的东西，这家杂货店能帮你找回——僻静的街道旁有一家杂货店，只要写下烦恼投进卷帘门的投信口，第二天就会在店后的牛奶箱里得到回答。因男友身患绝症，年轻女孩静子在爱情与梦想间徘徊；克郎为了音乐梦想离家漂泊，却在现实中寸步难行；少年浩介面临家庭巨变，挣扎在亲情与未来的迷茫中……他们将困惑写成信投进杂货店，随即奇妙的事情竟不断发生。生命中的一次偶然交会，将如何演绎出截然不同的人生？如今回顾写作过程，我发现自己始终在思考一个问题：站在人生的岔路口，人究竟应该怎么做？我希望读者能在掩卷时喃喃自语：我从未读过这样的小说。——东野圭吾",
        authorIntro:"东野圭吾日本著名作家。1985年，《放学后》获第31届江户川乱步奖，开始专职写作；1999年，《秘密》获第52届日本推理作家协会奖；2005年出版的《嫌疑人X的献身》史无前例地同时获得第134届直木奖、第6届本格推理小说大奖，以及年度三大推理小说排行榜第1名；2008年，《流星之绊》获第43届新风奖；2009年出版的《新参者》获两大推理小说排行榜年度第1名；2012年，《解忧杂货店》获第7届中央公论文艺奖。2014年，《祈りの幕が下りる時》（暂译《祈祷落幕时》）获第48届吉川英治文学奖。"
        },
      relatedBooks: [
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
  methods: {
    handleFavorited() {
      this.isFavorited = !this.isFavorited;
    },
    test() {
      console.log("test");
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

.related .relatedBooks {
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

.recommendList .recommendbook {
  display: flex;
  /* border: 1px solid green; */
  padding: 10px 0px;
  border-bottom: 1px solid var(--lightTheme);
}

.recommendList .recommendbook:hover {
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