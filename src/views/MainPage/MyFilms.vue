<template>
  <div class="container">
    <div class="optionList">
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

      <div class="year">
        <div class="left">年代：</div>
        <ul class="right">
          <li
            v-for="option in year"
            :key="option.id"
            @click="changeYear(option.id)"
          >
            <span :class="checked.year === option.id ? 'active2' : ''">
              {{ option.name }}
            </span>
          </li>
        </ul>
      </div>

      <div class="region">
        <div class="left">地区：</div>
        <ul class="right">
          <li
            v-for="option in region"
            :key="option.id"
            @click="changeRegion(option.id)"
          >
            <span :class="checked.region === option.id ? 'active3' : ''">
              {{ option.name }}
            </span>
          </li>
        </ul>
      </div>

      <div class="language">
        <div class="left">语言：</div>
        <ul class="right">
          <li
            v-for="option in language"
            :key="option.id"
            @click="changeLanguage(option.id)"
          >
            <span :class="checked.language === option.id ? 'active4' : ''">
              {{ option.name }}
            </span>
          </li>
        </ul>
      </div>

      <div class="sort">
        <template>
          <el-radio v-model="checked.sort" :label="1">最近更新</el-radio>
          <el-radio v-model="checked.sort" :label="2">添加时间</el-radio>
          <el-radio v-model="checked.sort" :label="3">评分最高</el-radio>
        </template>
      </div>
    </div>

    <div class="filmList">
      <CardPage v-for="film in 30" :key="film" :item="films" />
    </div>

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
import CardPage from "@/components/CardPage.vue";

export default {
  name: "MyFilms",

  components: { CardPage },

  data() {
    return {
      category: [
        { id: 0, name: "全部" },
        { id: 1, name: "戏剧" },
        { id: 2, name: "爱情" },
        { id: 3, name: "动作" },
        { id: 4, name: "科幻" },
        { id: 5, name: "动画" },
        { id: 6, name: "悬疑" },
        { id: 7, name: "犯罪" },
        { id: 8, name: "惊悚" },
        { id: 9, name: "冒险" },
        { id: 10, name: "音乐" },
        { id: 11, name: "历史" },
        { id: 12, name: "奇幻" },
        { id: 13, name: "恐怖" },
        { id: 14, name: "战争" },
        { id: 15, name: "传记" },
        { id: 16, name: "歌舞" },
        { id: 17, name: "武侠" },
        { id: 18, name: "情色" },
        { id: 19, name: "灾难" },
        { id: 20, name: "西部" },
        { id: 21, name: "纪录片" },
        { id: 22, name: "短片" },
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
        { id: 18, name: "80年代" },
        { id: 19, name: "70年代" },
        { id: 20, name: "更早" },
      ],
      region: [
        { id: 0, name: "全部" },
        { id: 1, name: "华语" },
        { id: 2, name: "欧美" },
        { id: 3, name: "韩国" },
        { id: 4, name: "日本" },
        { id: 5, name: "中国大陆" },
        { id: 6, name: "美国" },
        { id: 7, name: "中国香港" },
        { id: 8, name: "中国台湾" },
        { id: 9, name: "英国" },
        { id: 10, name: "法国" },
        { id: 11, name: "德国" },
        { id: 12, name: "意大利" },
        { id: 13, name: "西班牙" },
        { id: 14, name: "印度" },
        { id: 15, name: "泰国" },
        { id: 16, name: "俄罗斯" },
        { id: 17, name: "加拿大" },
        { id: 18, name: "澳大利亚" },
        { id: 19, name: "爱尔兰" },
        { id: 20, name: "瑞典" },
        { id: 21, name: "巴西" },
        { id: 22, name: "丹麦" },
      ],
      language: [
        { id: 0, name: "全部" },
        { id: 1, name: "国语" },
        { id: 2, name: "粤语" },
        { id: 3, name: "英语" },
        { id: 4, name: "法语" },
        { id: 5, name: "日语" },
        { id: 6, name: "韩语" },
        { id: 7, name: "泰语" },
        { id: 8, name: "德语" },
        { id: 9, name: "俄语" },
        { id: 10, name: "闽南语" },
        { id: 11, name: "丹麦语" },
        { id: 12, name: "波兰语" },
        { id: 13, name: "瑞典语" },
        { id: 14, name: "印地语" },
        { id: 15, name: "挪威语" },
        { id: 16, name: "意大利语" },
        { id: 17, name: "西班牙语" },
      ],
      //   被选中的id
      checked: {
        category: 0,
        year: 0,
        region: 0,
        language: 0,
        sort: 1
      },

      //   电影列表数据
      films: {
        id: 3,
        cover: "http://img1.doubanio.com/view/subject/s/public/s29555070.jpg",
        name: "围城",
        score: "9.7",
        intro: "钱钟书/围城/中国文学/小说/经典/婚姻/现代文学/文学/",
        route:"FilmDetail"
      },

      pagination:{
        total:200,
        currentPage:1
      }
    };
  },

  methods: {
    changeCategory(id) {
      this.checked.category = id;
    },
    changeYear(id) {
      this.checked.year = id;
    },
    changeRegion(id) {
      this.checked.region = id;
    },
    changeLanguage(id) {
      this.checked.language = id;
    },
    currentPageChanged(currentPage){
        this.pagination.currentPage=currentPage;
        console.log(this.pagination.currentPage);
    }
  },
};
</script>

<style scoped>
.container {
  /* background: red; */
  /* background: var(--lightTheme); */
  /* width: calc(var(--width) * 1px); */
  width: calc(var(--width) * 1px);
}

.category,
.year,
.region,
.language {
  display: flex;
  padding: 12px 0px;
  border-bottom: 1px solid var(--lightTheme);
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
    font-weight: bold;

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

.filmList {
  display: grid;
  grid-template-columns: repeat(7, 160px);
  /*  声明行间距和列间距  */
  grid-gap: 10px;
  /*  声明行的高度  */
  grid-template-rows: repeat(6, auto);
}

.pagination{
    display: flex;
    flex-direction: column;
    /* justify-items: center; */
    align-items: center;
    margin-top: 16px;
    color: var(--primaryColor) !important;
}

.pagination >>> .el-pagination.is-background .el-pager li:not(.disabled).active{
    /* color: var(--primaryColor); */
    /* color: red; */
    background: rgba(14, 85, 113, 0.95);
}

.pagination >>> .el-pager li:hover {
    color: var(--primaryColor) !important;
    /* color: red !important; */
}


</style>