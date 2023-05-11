<template>
  <div class="container">
    <!-- 游戏类型 -->
    <div class="category">
      <div class="left">类型：</div>
      <ul class="right">
        <li
          v-for="(option,index) in category"
          :key="index"
          @click="changeCategory(option)"
        >
          <span :class="checked.category === option ? 'active1' : ''">
            {{ option }}
          </span>
        </li>
      </ul>
    </div>

    <!-- 游戏平台 -->
    <div class="platform">
      <div class="left">平台：</div>
      <ul class="right">
        <li
          v-for="(option,index) in platform"
          :key="index"
          @click="changePlatform(option)"
        >
          <span :class="checked.platform === option ? 'active2' : ''">
            {{ option }}
          </span>
        </li>
      </ul>
    </div>

    <!-- 发售时间 -->
    <div class="year">
      <div class="left">发售：</div>
      <ul class="right">
        <li
          v-for="(option,index) in year"
          :key="index"
          @click="changeYear(option.value)"
        >
          <span :class="checked.year === option.value ? 'active3' : ''">
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
          v-for="(option,index) in tag"
          :key="index"
          @click="changeTag(option)"
        >
          <span :class="checked.tag === option ? 'active4' : ''">
            {{ option }}
          </span>
        </li>
      </ul>
    </div>

    <!-- 排序方式 -->
    <div class="sort">
      <template>
        <el-radio v-model="checked.sort" :label="1">名称正序</el-radio>
        <el-radio v-model="checked.sort" :label="2">发行时间</el-radio>
        <el-radio v-model="checked.sort" :label="3">发行平台</el-radio>
      </template>
    </div>

    <!-- 游戏列表 -->
    <div class="gameList">
      <GameCard v-for="(game,index) in games" :key="index" :item="game" />
    </div>


    <!-- 底部页码选择器 -->
    <div class="pagination">
      <el-pagination  
      background 
      layout="prev, pager, next,jumper" 
      :total="pagination.total"
      :page-size="35"
      @current-change="currentPageChanged"
      >
      </el-pagination>
    </div>

  </div>
</template>

<script>
import GameCard from "@/components/GameCard.vue"
import { selectByCondition } from '@/api/game';

export default {
  name: "MyGames",

  components:{GameCard},

  mounted(){
    // 获取游戏详情
    this.getGames();
  },

  data() {
    return {
      category: ["全部","第一人称射击","第三人称射击","角色扮演","动作角色扮演","竞速","即时战略","策略","冒险","体育","模拟","格斗","飞行","益智","音乐","恋爱养成"],
      platform: ["全部","PC","XboxOne","Xbox360","PS5","PS4","PS3","Switch","PS Vita","3DS","IOS","Android"],
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
        { name: "90年代" ,value:"199"}
      ],
      tag: ["全部","国产","独立游戏","回合制","二战","多人","未来战争","丧尸","科幻","奇幻","恐怖","末世","剑侠","漫画英雄","赛博朋克","蒸汽朋克","忍者","沙盒","横版卷轴","暗杀","改编"],

      //   被选中的标签
      checked: {
        category: "全部",
        platform: "全部",
        year: "全部",
        tag: "全部",
        sort: 1,
      },

      // 游戏列表数据
       games:[],

    //   底部页码选择器数据
      pagination:{
        // 总数据量
        total:1,
        // 当前页码
        currentPage:1
      }
    };
  },

  methods: {
    // 切换类型
    changeCategory(option) {
      this.checked.category = option;
    },
    // 切换平台
    changePlatform(option) {
      this.checked.platform = option;
    },
    // 切换年份
    changeYear(value) {
      this.checked.year = value;
    },
    // 切换标签
    changeTag(option) {
      this.checked.tag = option;
    },
    // 切换页码
    currentPageChanged(currentPage){
        this.pagination.currentPage=currentPage;
    },

    getGames(){
      let params={
        genres: "",
        platforms: "",
        releaseYear: "",
        tags: "",
        sortId: 1,
        page: 1,
        pageSize:35,
      };

      if(this.checked.category!=="全部"){
        params.genres=this.checked.category;
      }
      if(this.checked.platform!=="全部"){
        params.platforms=this.checked.platform;
      }
      if(this.checked.year!=="全部"){
        params.releaseYear=this.checked.year;
      }
      if(this.checked.tag!=="全部"){
        params.tags=this.checked.tag;
      }
      params.sortId=this.checked.sort;
      params.page=this.pagination.currentPage;

      // console.log(params);
      selectByCondition(params).then(res=>{
        if(res.code===1){
          // 游戏数据请求成功
          this.games=res.data.rows;
          this.pagination.total=res.data.total;
        }else{
          this.$message.error(res.msg);
        }
      }).catch(err=>{
        console.log(err);
      })

    }
  },

  watch:{
    checked:{
      deep:true,
      handler(){
        this.getGames();
      }
    },
    pagination:{
      deep:true,
      handler(){
        this.getGames();
      }
    }
  }
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