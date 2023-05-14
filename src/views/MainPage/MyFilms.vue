<template>
  <div class="container">
    <div class="optionList">
      <div class="category">
        <div class="left">类型：</div>
        <ul class="right">
          <li
            v-for="(option, index) in category"
            :key="index"
            @click="changeCategory(option)"
          >
            <span :class="checked.category === option ? 'active1' : ''">
              {{ option }}
            </span>
          </li>
        </ul>
      </div>

      <div class="year">
        <div class="left">年代：</div>
        <ul class="right">
          <li
            v-for="(option,index) in year"
            :key="index"
            @click="changeYear(option.value)"
          >
            <span :class="checked.year === option.value ? 'active2' : ''">
              {{ option.name }}
            </span>
          </li>
        </ul>
      </div>

      <div class="region">
        <div class="left">地区：</div>
        <ul class="right">
          <li
            v-for="(option,index) in region"
            :key="index"
            @click="changeRegion(option)"
          >
            <span :class="checked.region === option ? 'active3' : ''">
              {{ option }}
            </span>
          </li>
        </ul>
      </div>

      <div class="language">
        <div class="left">语言：</div>
        <ul class="right">
          <li
            v-for="(option,index) in language"
            :key="index"
            @click="changeLanguage(option)"
          >
            <span :class="checked.language === option ? 'active4' : ''">
              {{ option }}
            </span>
          </li>
        </ul>
      </div>

      <div class="sort">
        <template>
          <el-radio v-model="checked.sort" :label="1">评分最高</el-radio>
          <el-radio v-model="checked.sort" :label="2">时长最长</el-radio>
          <el-radio v-model="checked.sort" :label="3">上映时间</el-radio>
        </template>
      </div>
    </div>

    <div class="filmList">
      <FilmCard v-for="(film,index) in films" :key="index" :item="film"/>
    </div>

    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next,jumper"
        :total="pagination.total"
        :page-size="35"
        @current-change="currentPageChanged"
        :current-page.sync="pagination.currentPage"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import FilmCard from "@/components/FilmCard.vue";
import { selectByCondition } from "@/api/film";

export default {
  name: "MyFilms",

  components: { FilmCard },

  mounted() {
    // 获取电影数据
    this.getFilms();
  },

  data() {
    return {
      category: [
        "全部",
        "剧情",
        "爱情",
        "动作",
        "科幻",
        "动画",
        "悬疑",
        "犯罪",
        "惊悚",
        "冒险",
        "音乐",
        "历史",
        "奇幻",
        "恐怖",
        "战争",
        "传记",
        "歌舞",
        "武侠",
        "情色",
        "灾难",
        "西部",
        "传记",
        "家庭",
      ],
      year: [
        { name: "全部" ,value:"全部"},
        { name: "2023" ,value:"2023"},
        { name: "2022" ,value:"2022"},
        { name: "2021" ,value:"2021"},
        { name: "2020" ,value:"2020"},
        { name: "2019" ,value:"2019"},
        { name: "2018" ,value:"2018"},
        { name: "2017" ,value:"2017"},
        { name: "2016" ,value:"2016"},
        { name: "2015" ,value:"2015"},
        { name: "2014" ,value:"2014"},
        { name: "2013" ,value:"2013"},
        { name: "2012" ,value:"2012"},
        { name: "2011" ,value:"2011"},
        { name: "2010" ,value:"2010"},
        { name: "00年代" ,value:"200"},
        { name: "90年代" ,value:"199"},
        { name: "80年代" ,value:"198"},
        { name: "70年代" ,value:"197"},
        { name: "60年代" ,value:"196"}
      ],
      region: ["全部","中国大陆","中国香港","美国","韩国","日本","法国","中国台湾","英国","澳大利亚","德国","意大利","西班牙","印度","泰国","俄罗斯","加拿大","丹麦","爱尔兰","瑞典","巴西","瑞士"],
      language: ["全部","国语","粤语","英语","法语","日语","韩语","泰语","德语","俄语","闽南语","丹麦语","波兰语","瑞典语","印地语","挪威语","意大利语","西班牙语"],
      //   被选中的id
      checked: {
        category: "全部",
        year: "全部",
        region: "全部",
        language: "全部",
        sort: 1,
      },

      //   电影列表数据
      films:[],

      pagination: {
        total: 1,
        currentPage: 1,
      },
    };
  },

  methods: {
    // 切换类型
    changeCategory(option) {
      this.checked.category = option;
    },
    // 切换年份
    changeYear(value) {
      this.checked.year = value;
    },
    // 切换地区
    changeRegion(option) {
      this.checked.region = option;
    },
    // 切换语言
    changeLanguage(option) {
      this.checked.language = option;
    },
    // 切换页码
    currentPageChanged(currentPage) {
      this.pagination.currentPage = currentPage;
    },

    // 获取电影
    getFilms(page) {
      let params = {
        genres: "",
        languages: "",
        regions: "",
        releaseYear: "",
        sortId: 1,
        page: 1,
        pageSize:35,
      };

      if (this.checked.category !== "全部") {
        params.genres = this.checked.category;
      }
      if (this.checked.language !== "全部") {
        params.languages = this.checked.language;
      }
      if (this.checked.region !== "全部") {
        params.regions = this.checked.region;
      }
      if(this.checked.year!=="全部"){
        params.releaseYear=this.checked.year;
      }
      params.sortId=this.checked.sort;
      params.page=page;

      // console.log(params);

      selectByCondition(params)
        .then((res) => {
          // console.log(res);
          if(res.code===1){
            // 电影数据请求成功
            this.films=res.data.rows;
            this.pagination.total=res.data.total;
            this.pagination.currentPage=page;
            // console.log(this.films);
          }else{
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  watch:{
    checked:{
      deep:true,
      handler(){
        this.getFilms(1);
      }
    },
    pagination:{
      deep:true,
      handler(){
        this.getFilms(this.pagination.currentPage);
      }
    }
  }
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

.left {
  /* display: flex; */
  white-space: nowrap;
  padding-top: 5px;
  font-weight: bold;
}

.right {
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