<template>
  <div class="container">
    <div class="leftPart">
      <el-carousel indicator-position="none" :interval="5000" arrow="hover">
        <el-carousel-item v-for="film in filmList" :key="film.id">
          <img :src="film.img" />
          <div class="filmIntro">
            <h1>{{ film.name }}</h1>
            <span>{{ film.intro }}</span>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- 右侧6张卡片 -->
    <div class="rightPart">
      <div class="card" v-for="card in 6" :key="card">
        <div class="cardLeft">
          <img
            src="https://imgs.gamersky.com/ku/2014/ku_halflife2episodeone.jpg"
          />
        </div>
        <div class="cardRight">
          <h1>名称</h1>
          <h2>类型 | 国家</h2>
          <p>介绍这个是什么,关于真不φ你手机扩大吕晶晶看看 上课讲答客问打乱了</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MarqueePage",

  data() {
    return {
      filmList: [
        {
          id: 1,
          name: "杀死比尔",
          intro:
            "杀死比尔的音乐很好听好想看基努里维斯主演的疾速追杀4好想看基努里维斯主演的疾速追杀4好想看基努里维斯主演的疾速追杀4好想看基努里维斯主演的疾速追杀4好想看基努里维斯主演的疾速追杀4好想看基努里维斯主演的疾速追杀4好想看基努里维斯主演的疾速追杀4",
          img: "https://img1.gamersky.com/upimg/pic/2023/02/24/202302241620479544_small.png",
        },
        {
          id: 2,
          name: "疾速追杀",
          intro:
            "好想看基努里维斯主演的疾速追杀4好想看基努里维斯主演的疾速追杀4好想看基努里维斯主演的疾速追杀4好想看基努里维斯主演的疾速追杀4好想看基努里维斯主演的疾速追杀4好想看基努里维斯主演的疾速追杀4好想看基努里维斯主演的疾速追杀4好想看基努里维斯主演的疾速追杀4",
          img: "https://img1.gamersky.com/thirdparty_steam/2022/07/18/small_202207181056289355.jpg",
        },
        {
          id: 3,
          name: "复仇者联盟",
          intro:
            "漫威越来越垃圾了好想看基努里维斯主演的疾速追杀4好想看基努里维斯主演的疾速追杀4好想看基努里维斯主演的疾速追杀4好想看基努里维斯主演的疾速追杀4好想看基努里维斯主演的疾速追杀4好想看基努里维斯主演的疾速追杀4",
          img: "https://img1.gamersky.com/thirdparty_steam/2018/07/29/small_201807290852263212.jpg",
        },
        {
          id: 4,
          name: "最后的生还者",
          intro:
            "好想看基努里维斯主演的疾速追杀4好想看基努里维斯主演的疾速追杀4好想看基努里维斯主演的疾速追杀4",
          img: "https://img1.gamersky.com/thirdparty_steam/2021/01/21/small_202101211029064533.jpg",
        },
      ],
    };
  },
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
  /* color: var(--primaryColor); */
  color: #fff;

  /* -webkit-text-stroke: 1px var(--primaryColor); */
  /* white-space: nowrap; */
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
  cursor: pointer
  
}

.card:hover{
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