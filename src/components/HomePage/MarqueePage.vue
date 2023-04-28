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
      <div class="card" v-for="card in filmList" :key="card.id">
        <div class="cardLeft">
          <img :src="card.cover"/>
        </div>
        <div class="cardRight">
          <h1>{{ card.name }}</h1>
          <h2>{{card.type}}</h2>
          <p>{{card.intro}}</p>
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
          name: "生化危机4重置版",
          intro:
            "《生化危机4：重制版》是Capcom制作的一款恐怖动作游戏，将对原游戏的基调做出一些改变，制作团队更倾向于开发一款受原作启发，但融入新元素的游戏。其中一个改变的元素是，游戏的开场将发生在晚上：“在《生化危机4》中，开头在村庄中的场景将发生在夜晚，就像游戏的大部分内容一样。”",
          img: "https://img1.gamersky.com/upimg/pic/2023/02/24/202302241620479544_small.png",
          cover:"https://imgs.gamersky.com/upimg/new_preview/2023/03/08/origin_b_202303081818228227.jpg",
          type:"动作游戏"
        },
        {
          id: 2,
          name: "艾尔登法环",
          intro:
            "《艾尔登法环》是一款以正统黑暗奇幻世界为舞台的动作RPG游戏。走进辽阔的场景与地下迷宫探索未知，挑战困难重重的险境，享受克服困境时的成就感吧。不仅如此，登场角色之间的利害关系谱成的群像剧，更是不容错过。",
          img: "https://img1.gamersky.com/upimg/pic/2021/12/15/202112151102094889_small.jpg",
          cover:"https://imgs.gamersky.com/upimg/new_preview/2021/06/11/origin_b_202106110758463268.jpg",
          type:"动作游戏"
        },
        {
          id: 3,
          name: "荒野大镖客2救赎",
          intro:
            "《荒野大镖客：救赎2》是一款由《GTA5》、《荒野大镖客：救赎》团队打造开发的第三人称射击游戏。本次游戏的故事地点仍将是美国无情的蛮荒地区，R星创始人Sam Houser表示制作团队倾尽全力为玩家去打造一个“真实的、栩栩如生的”世界，而且本作将会给大家带来全新的线上模式体验。",
          img: "http://img1.gamersky.com/upimg/pic/2018/05/10/201805101828373900_small.jpg",
          cover:"https://imgs.gamersky.com/ku/2018/ku_reddeadredemption.jpg",
          type:"第三人称射击"
        },
        {
          id: 4,
          name: "巫师3：狂猎年度版",
          intro:
            "《巫师3：狂猎》将是三部曲系列的最后一作，故事将有宏大的最后结局，但并非《巫师》系列的最终作。本作采用最新的REDengine3引擎制作，玩家可以在无缝的世界里任意探索，采用非线性剧情的设定，整体规模是前作的30倍。再加上真实的角色设定，迷人的故事以及一个无需载入过程的玩家可以自由自在畅游的开放环境，我们将会把游戏体验带到一个新的高度，给玩家更加真实的体验与完完全全的代入感。《巫师3》的游戏结局大致上可划分成三条主线，玩家在游戏关键节点的选择将会把这三条主线划分成了36种不同的结局。不过，别以为这样就完了。Michal Platkow-Gilewski表示，事实上《巫师3》拥有变幻莫测的游戏过程，玩家在游戏中的一举一动都会对游戏的走向产生细小的影响，而所有这些影响最终都会通过不同的游戏结局体现出来。《巫师3:完全版》于2019年登上Switch。",
          img: "http://img1.gamersky.com/upimg/pic/2017/07/26/201707260936334679_small.jpg",
          cover:"https://imgs.gamersky.com/ku/2017/ku_thewitcher3_pc.jpg",
          type:"动作角色扮演"
        },
        {
          id: 5,
          name: "最后生还者：第一部",
          intro:
            "《最后生还者：第一部》是一款角色扮演类动作游戏，故事以末日题材为主题，但是和以往的同类题材游戏有着很大的不同。两名主角个性鲜明，为了生存他们将不惜一切代价。游戏中虽然有变异的怪物出现，它们也是末日的主因，但是游戏中的战斗大部分是与人类展开的。",
          img: "http://img1.gamersky.com/upimg/pic/2017/04/25/201704251600438663_small.jpg",
          cover:"https://imgs.gamersky.com/upimg/new_preview/2022/06/10/origin_b_202206101107184146.jpg",
          type:"动作游戏"
        },
        {
          id: 6,
          name: "怪物猎人：世界",
          intro:
            "《怪物猎人：世界》是由CAPCOM制作发行的一款共斗动作冒险游戏。游戏中，玩家可以武装自己完成各项任务与各类可怕的怪物们战斗，在游戏的过程中逐步提升自己的狩猎技巧。",
          img: "https://img1.gamersky.com/upimg/pic/2019/09/06/201909061229116228_small.jpg",
          cover:"https://imgs.gamersky.com/ku/2018/ku_monsterhunterworld.jpg",
          type:"动作游戏"
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