<template>
  <div class="container">
    <!-- 书籍类型 -->
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

    <!-- 发售时间 -->
    <div class="year">
      <div class="left">发售：</div>
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

    <!-- 书籍标签 -->
    <div class="tag">
      <div class="left">标签：</div>
      <ul class="right">
        <li
          v-for="option in tag"
          :key="option.id"
          @click="changeTag(option.id)"
        >
          <span :class="checked.tag === option.id ? 'active3' : ''">
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

    <!-- 书籍列表 -->
    <div class="gameList">
      <CardPage v-for="book in 30" :key="book" :item="books" />
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
import CardPage from "@/components/CardPage.vue";

export default {
  name: "MyBooks",
  components: { CardPage },

  data() {
    return {
      category: [
        { id: 0, name: "全部" },
        { id: 1, name: "小说" },
        { id: 2, name: "文学" },
        { id: 3, name: "人文社科" },
        { id: 4, name: "经济管理" },
        { id: 5, name: "科技科普" },
        { id: 6, name: "计算机" },
        { id: 7, name: "成功励志" },
        { id: 8, name: "生活" },
        { id: 9, name: "少儿" },
        { id: 10, name: "艺术设计" },
        { id: 11, name: "漫画" },
        { id: 12, name: "教育" },
        { id: 13, name: "杂志" },
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
        { id: 1, name: "名著" },
        { id: 2, name: "推理悬疑" },
        { id: 3, name: "科幻" },
        { id: 4, name: "言情" },
        { id: 5, name: "都市" },
        { id: 6, name: "幻想" },
        { id: 7, name: "武侠" },
        { id: 8, name: "科幻" },
        { id: 9, name: "历史" },
        { id: 10, name: "文学经典" },
        { id: 11, name: "散文" },
        { id: 12, name: "传记" },
        { id: 13, name: "诗歌" },
        { id: 14, name: "寓言童话" },
        { id: 15, name: "心理学" },
        { id: 16, name: "社会学" },
        { id: 17, name: "人类学" },
        { id: 18, name: "政治" },
        { id: 19, name: "法律" },
        { id: 20, name: "宗教" },
        { id: 21, name: "市场营销" },
        { id: 22, name: "金融" },
        { id: 23, name: "科普" },
        { id: 24, name: "物理" },
        { id: 25, name: "化学" },
        { id: 26, name: "天文" },
        { id: 27, name: "生物" },
        { id: 28, name: "自然" },
        { id: 29, name: "网络安全" },
        { id: 30, name: "人工智能" },
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
      books: {
        id: 3,
        cover: "http://img1.doubanio.com/view/subject/s/public/s29053580.jpg",
        name: "活着",
        score: "9.7",
        intro:
          "日本动画/经典/冒险/奇幻/非主流经典/Q版/剧情丰富/角色扮演/好评原声音乐/单人/",
      },

      //   底部页码选择器数据
      pagination: {
        // 总数据量
        total: 300,
        // 当前页码
        currentPage: 1,
      },
    };
  },

  methods: {
    changeCategory(id) {
      this.checked.category = id;
    },
    changeYear(id) {
      this.checked.year = id;
    },
    changeTag(id) {
      this.checked.tag = id;
    },
    currentPageChanged(currentPage) {
      this.pagination.currentPage = currentPage;
      console.log(this.pagination.currentPage);
    },
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