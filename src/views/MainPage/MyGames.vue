<template>
  <div class="container">
    <!-- 游戏类型 -->
    <div class="category">
      <div class="left">类型：</div>
      <ul class="right">
        <li
          v-for="option in category"
          :key="option.id"
          @click="changeCategory(option.id)"
        >
          <span :class="checked.category === option.id ? 'active1' : ''">
            {{ option.name }}
          </span>
        </li>
      </ul>
    </div>

    <!-- 游戏平台 -->
    <div class="platform">
      <div class="left">平台：</div>
      <ul class="right">
        <li
          v-for="option in platform"
          :key="option.id"
          @click="changePlatform(option.id)"
        >
          <span :class="checked.platform === option.id ? 'active2' : ''">
            {{ option.name }}
          </span>
        </li>
      </ul>
    </div>

    <!-- 发售时间 -->
    <div class="year">
      <div class="left">发售：</div>
      <ul class="right">
        <li
          v-for="option in year"
          :key="option.id"
          @click="changeYear(option.id)"
        >
          <span :class="checked.year === option.id ? 'active3' : ''">
            {{ option.name }}
          </span>
        </li>
      </ul>
    </div>

    <!-- 游戏标签 -->
    <div class="tag">
      <div class="left">标签：</div>
      <ul class="right">
        <li
          v-for="option in tag"
          :key="option.id"
          @click="changeTag(option.id)"
        >
          <span :class="checked.tag === option.id ? 'active4' : ''">
            {{ option.name }}
          </span>
        </li>
      </ul>
    </div>

    <!-- 排序方式 -->
    <div class="sort">
      <template>
        <el-radio v-model="checked.sort" :label="1">最近更新</el-radio>
        <el-radio v-model="checked.sort" :label="2">添加时间</el-radio>
        <el-radio v-model="checked.sort" :label="3">评分最高</el-radio>
      </template>
    </div>

    <!-- 游戏列表 -->
    <div class="gameList">
      <CardPage v-for="game in 30" :key="game" :item="games" />
    </div>


    <!-- 底部页码选择器 -->
    <div class="pagination">
      <el-pagination  
      background 
      layout="prev, pager, next" 
      :total="pagination.total"
      @current-change="currentPageChanged"
      >
      </el-pagination>
    </div>

  </div>
</template>

<script>
import CardPage from "@/components/CardPage.vue"

export default {
  name: "MyGames",

  components:{CardPage},
  data() {
    return {
      category: [
        { id: 0, name: "全部" },
        { id: 1, name: "第一人称射击" },
        { id: 2, name: "第三人称射击" },
        { id: 3, name: "动作射击" },
        { id: 4, name: "角色扮演" },
        { id: 5, name: "动作角色扮演" },
        { id: 6, name: "竞速" },
        { id: 7, name: "即时战略" },
        { id: 8, name: "策略" },
        { id: 9, name: "冒险" },
        { id: 10, name: "体育" },
        { id: 11, name: "模拟" },
        { id: 12, name: "格斗" },
        { id: 13, name: "飞行" },
        { id: 14, name: "益智" },
        { id: 15, name: "音乐" },
        { id: 16, name: "恋爱养成" },
      ],
      platform: [
        { id: 0, name: "全部" },
        { id: 1, name: "PC" },
        { id: 2, name: "XboxOne" },
        { id: 3, name: "Xbox360" },
        { id: 4, name: "PS5" },
        { id: 5, name: "PS4" },
        { id: 6, name: "PS3" },
        { id: 7, name: "Switch" },
        { id: 8, name: "PS Vita" },
        { id: 9, name: "3DS" },
        { id: 10, name: "IOS" },
        { id: 11, name: "Android" },
      ],
      year: [
        { id: 0, name: "全部" },
        { id: 1, name: "2023" },
        { id: 2, name: "2022" },
        { id: 3, name: "2021" },
        { id: 4, name: "2020" },
        { id: 5, name: "2019" },
        { id: 6, name: "2018" },
        { id: 7, name: "2017" },
        { id: 8, name: "2016" },
        { id: 9, name: "2015" },
        { id: 10, name: "2014" },
        { id: 11, name: "2013" },
        { id: 12, name: "2012" },
        { id: 13, name: "2011" },
        { id: 14, name: "2010" },
        { id: 15, name: "10年代" },
        { id: 16, name: "00年代" },
        { id: 17, name: "90年代" },
        { id: 20, name: "更早" },
      ],
      tag: [
        { id: 0, name: "全部" },
        { id: 1, name: "国产" },
        { id: 2, name: "独立游戏" },
        { id: 3, name: "回合制" },
        { id: 4, name: "二战" },
        { id: 5, name: "现代战争" },
        { id: 6, name: "未来战争" },
        { id: 7, name: "丧尸" },
        { id: 8, name: "科幻" },
        { id: 9, name: "奇幻" },
        { id: 10, name: "恐怖" },
        { id: 11, name: "末世" },
        { id: 12, name: "剑侠" },
        { id: 13, name: "漫画英雄" },
        { id: 14, name: "赛博朋克" },
        { id: 15, name: "蒸汽朋克" },
        { id: 16, name: "忍者" },
        { id: 17, name: "沙盒" },
        { id: 18, name: "横版卷轴" },
        { id: 19, name: "暗杀" },
        { id: 20, name: "改编" },
      ],

      //   被选中的标签
      checked: {
        category: 0,
        platform: 0,
        year: 0,
        tag: 0,
        sort: 1,
      },

      // 游戏列表数据
       games: {
        id: 3,
        cover: "https://imgs.gamersky.com/ku/2014/ku_ys6.jpg",
        name: "伊苏6",
        score: "9.7",
        intro: "日本动画/经典/冒险/奇幻/非主流经典/Q版/剧情丰富/角色扮演/好评原声音乐/单人/",
      },

    //   底部页码选择器数据
      pagination:{
        // 总数据量
        total:100,
        // 当前页码
        currentPage:1
      }
    };
  },

  methods: {
    changeCategory(id) {
      this.checked.category = id;
    },
    changePlatform(id) {
      this.checked.platform = id;
    },
    changeYear(id) {
      this.checked.year = id;
    },
    changeTag(id) {
      this.checked.tag = id;
    },
    currentPageChanged(currentPage){
        this.pagination.currentPage=currentPage;
        console.log(this.pagination.currentPage);
    }
  },
};
</script>

<style  scoped>
.container {
  /* background: red; */
  /* background: var(--lightTheme); */
  /* width: calc(var(--width) * 1px); */
  width: calc(var(--width) * 1px);
}

.category,
.platform,
.year,
.tag {
  display: flex;
  padding: 12px 0px;
  border-bottom: 1px solid var(--lightTheme);
  /* border: 1px solid red; */
}

.left,
.right {
  display: flex;
  font-size: 13px;
}

.left{
    /* display: flex; */
    white-space: nowrap;
    padding-top: 5px;

}

.right{
    display: flex;
    flex-wrap: wrap;
}

.right li {
  margin-right: 8px;
  padding: 5px 0px;
}

.right li span {
  padding: 4px;
  border-radius: 4px;
  overflow: hidden;
  transition: all 0.2s;
}

.right li span:hover {
  text-decoration: underline;
}

.active1,
.active2,
.active3,
.active4 {
  color: #fff;
  font-weight: bold;
}

.active1 {
  background: #ff8f00;
}

.active2 {
  background: #05a7e1;
}

.active3 {
  background: #ff4949;
}

.active4 {
  background: #29a681;
}

.sort {
  /* border: 1px solid green; */
  margin: 16px 0px;
}

.sort >>> .el-radio__label {
  line-height: 13px;
  font-size: 13px;
  margin-left: -4px;
}

.sort >>> .is-checked + .el-radio__label {
  color: var(--primaryColor);
}

.sort >>> .el-radio__input.is-checked .el-radio__inner {
  border-color: var(--primaryColor);
  background: var(--primaryColor);
}

.sort >>> .el-radio__inner:hover {
  border-color: var(--primaryColor);
}

.gameList {
  display: grid;
  grid-template-columns: repeat(7, 160px);
  /*  声明行间距和列间距  */
  grid-gap: 10px;
  /*  声明行的高度  */
  grid-template-rows: repeat(6, auto);
}

.pagination {
  display: flex;
  flex-direction: column;
  /* justify-items: center; */
  align-items: center;
  margin-top: 16px;
  color: var(--primaryColor) !important;
}

.pagination
  >>> .el-pagination.is-background
  .el-pager
  li:not(.disabled).active {
  /* color: var(--primaryColor); */
  /* color: red; */
  background: rgba(14, 85, 113, 0.95);
}

.pagination >>> .el-pager li:hover {
  color: var(--primaryColor) !important;
  /* color: red !important; */
}
</style>