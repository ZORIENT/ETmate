<template>
  <div class="container">
    <!-- 我的收藏 -->
    <div class="title">
      <h1>我的收藏</h1>
    </div>

    <!-- 分类导航按钮 -->
    <div class="navs">
      <button>全部</button>
      <button>电影</button>
      <button>游戏</button>
      <button>书籍</button>
    </div>

    <!-- 收藏展示 -->
    <div class="collectionList">
      <div class="collection" v-for="result in results" :key="result.id">
        <CardPage :item="result"></CardPage>
        <button>取消收藏</button>
      </div>
    </div>
  </div>
</template>

<script>
import CardPage from "@/components/CardPage.vue";

export default {
  name: "UserFavorites",

  components: { CardPage },

  data() {
    return {
      results: [
        {
          id: 1,
          cover: "https://imgs.gamersky.com/ku/2013/ku_crusaderkings2.jpg",
          name: "十字军之王2",
          score: "策略游戏",
          intro:
            "中世纪/历史/多人/政治/重玩价值/单人/政治性/即时战略/好评原声音轨/策略",
            route:"GameDetail"
        },
        {
          id: 2,
          cover: "https://imgs.gamersky.com/ku/2017/ku_eurotrucksimulator2.jpg",
          name: "欧洲卡车模拟2",
          score: "模拟游戏",
          intro:
            "历史/多人/政治/重玩价值/单人/政治性/即时战略/好评原声音轨/策略",
            route:"GameDetail"
        },
        {
          id: 3,
          cover: "https://imgs.gamersky.com/ku/2013/ku_fasterthanlight.jpg",
          name: "超越光速",
          score: "策略游戏",
          intro: "多人/政治/重玩价值/单人/政治性/即时战略/好评原声音轨/策略",
          route:"GameDetail"
        },
        {
          id: 4,
          cover: "https://imgs.gamersky.com/ku/2017/ku_ff7.jpg",
          name: "最终幻想7",
          score: "角色扮演",
          intro: "重玩价值/单人/政治性/即时战略/好评原声音轨/策略",
          route:"GameDetail"
        },
        {
          id: 5,
          cover: "https://imgs.gamersky.com/ku/2013/ku_halflifecryoffear.jpg",
          name: "半条命：恐惧之泣",
          score: "第一人称射击",
          intro: "政治性/即时战略/好评原声音轨/策略",
          route:"GameDetail"
        },
        {
          id: 6,
          cover: "https://imgs.gamersky.com/ku/2013/ku_crusaderkings2.jpg",
          name: "十字军之王2",
          score: "策略游戏",
          intro:
            "中世纪/历史/多人/政治/重玩价值/单人/政治性/即时战略/好评原声音轨/策略",
            route:"GameDetail"
        },
        {
          id: 7,
          cover: "https://imgs.gamersky.com/ku/2017/ku_eurotrucksimulator2.jpg",
          name: "欧洲卡车模拟2",
          score: "模拟游戏",
          intro:
            "历史/多人/政治/重玩价值/单人/政治性/即时战略/好评原声音轨/策略",
            route:"GameDetail"
        },
        {
          id: 8,
          cover: "https://imgs.gamersky.com/ku/2013/ku_fasterthanlight.jpg",
          name: "超越光速",
          score: "策略游戏",
          intro: "多人/政治/重玩价值/单人/政治性/即时战略/好评原声音轨/策略",
          route:"GameDetail"
        },
        {
          id: 9,
          cover: "https://imgs.gamersky.com/ku/2017/ku_ff7.jpg",
          name: "最终幻想7",
          score: "角色扮演",
          intro: "重玩价值/单人/政治性/即时战略/好评原声音轨/策略",
          route:"GameDetail"
        },
        {
          id: 10,
          cover: "https://imgs.gamersky.com/ku/2013/ku_halflifecryoffear.jpg",
          name: "半条命：恐惧之泣",
          score: "第一人称射击",
          intro: "政治性/即时战略/好评原声音轨/策略",
          route:"GameDetail"
        },
        {
          id: 11,
          cover: "https://imgs.gamersky.com/ku/2013/ku_crusaderkings2.jpg",
          name: "十字军之王2",
          score: "策略游戏",
          intro:
            "中世纪/历史/多人/政治/重玩价值/单人/政治性/即时战略/好评原声音轨/策略",
            route:"GameDetail"
        },
        {
          id: 12,
          cover: "https://imgs.gamersky.com/ku/2017/ku_eurotrucksimulator2.jpg",
          name: "欧洲卡车模拟2",
          score: "模拟游戏",
          intro:
            "历史/多人/政治/重玩价值/单人/政治性/即时战略/好评原声音轨/策略",
            route:"GameDetail"
        },
        {
          id: 13,
          cover: "https://imgs.gamersky.com/ku/2013/ku_fasterthanlight.jpg",
          name: "超越光速",
          score: "策略游戏",
          intro: "多人/政治/重玩价值/单人/政治性/即时战略/好评原声音轨/策略",
          route:"GameDetail"
        },
        {
          id: 14,
          cover: "https://imgs.gamersky.com/ku/2017/ku_ff7.jpg",
          name: "最终幻想7",
          score: "角色扮演",
          intro: "重玩价值/单人/政治性/即时战略/好评原声音轨/策略",
          route:"GameDetail"
        },
        {
          id: 15,
          cover: "https://imgs.gamersky.com/ku/2013/ku_halflifecryoffear.jpg",
          name: "半条命：恐惧之泣",
          score: "第一人称射击",
          intro: "政治性/即时战略/好评原声音轨/策略",
          route:"GameDetail"
        },
        {
          id: 16,
          cover: "https://imgs.gamersky.com/ku/2013/ku_crusaderkings2.jpg",
          name: "十字军之王2",
          score: "策略游戏",
          intro:
            "中世纪/历史/多人/政治/重玩价值/单人/政治性/即时战略/好评原声音轨/策略",
            route:"GameDetail"
        },
        {
          id: 17,
          cover: "https://imgs.gamersky.com/ku/2017/ku_eurotrucksimulator2.jpg",
          name: "欧洲卡车模拟2",
          score: "模拟游戏",
          intro:
            "历史/多人/政治/重玩价值/单人/政治性/即时战略/好评原声音轨/策略",
            route:"GameDetail"
        },
        {
          id: 18,
          cover: "https://imgs.gamersky.com/ku/2013/ku_fasterthanlight.jpg",
          name: "超越光速",
          score: "策略游戏",
          intro: "多人/政治/重玩价值/单人/政治性/即时战略/好评原声音轨/策略",
          route:"GameDetail"
        },
        {
          id: 19,
          cover: "https://imgs.gamersky.com/ku/2017/ku_ff7.jpg",
          name: "最终幻想7",
          score: "角色扮演",
          intro: "重玩价值/单人/政治性/即时战略/好评原声音轨/策略",
          route:"GameDetail"
        },
        {
          id: 20,
          cover: "https://imgs.gamersky.com/ku/2013/ku_halflifecryoffear.jpg",
          name: "半条命：恐惧之泣",
          score: "第一人称射击",
          intro: "政治性/即时战略/好评原声音轨/策略",
          route:"GameDetail"
        },
      ],
    };
  },

  mounted() {},

  methods: {},
};
</script>

<style scoped>
.container {
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  width: calc(var(--width) * 1px);
}

.title h1 {
  font-size: 16px;
  font-weight: bold;
  padding: 10px 0px;
  color: var(--primaryColor);
  /* border: 1px solid green; */
  border-bottom: 1px solid var(--lightTheme);
}

/* *********************************************************************** */
.navs{
    /* border: 1px solid green; */
}

.collectionList{
    /* display: flex; */
    display: grid;
  grid-template-columns: repeat(7, auto);
  grid-gap: 10px;


}

</style>