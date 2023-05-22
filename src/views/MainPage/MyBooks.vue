<template>
  <div class="container">
    <!-- 书籍类型 -->
    <div class="category">
      <div class="left">作者：</div>
      <ul class="right">
        <li v-for="(option, index) in author"
            :key="index"
            @click="changeAuthor(option)">
          <span :class="checked.author === option ? 'active1' : ''">
            {{ option }}
          </span>
        </li>
      </ul>
    </div>

    <!-- 发售时间 -->
    <div class="year">
      <div class="left">发售：</div>
      <ul class="right">
        <li v-for="(option, index) in year"
            :key="index"
            @click="changeYear(option.value)">
          <span :class="checked.year === option.value ? 'active2' : ''">
            {{ option.name }}
          </span>
        </li>
      </ul>
    </div>

    <!-- 书籍标签 -->
    <div class="tag">
      <div class="left">标签：</div>
      <ul class="right">
        <li v-for="(option, index) in tag"
            :key="index"
            @click="changeTag(option)">
          <span :class="checked.tag === option ? 'active3' : ''">
            {{ option }}
          </span>
        </li>
      </ul>
    </div>

    <!-- 出版社 -->
    <div class="publisher">
      <div class="left">出版：</div>
      <ul class="right">
        <li v-for="(option, index) in publisher"
            :key="index"
            @click="changePublisher(option)">
          <span :class="checked.publisher === option ? 'active4' : ''">
            {{ option }}
          </span>
        </li>
      </ul>
    </div>

    <!-- 排序方式 -->
    <div class="sort">
      <template>
        <el-radio v-model="checked.sort"
                  :label="1">豆瓣评分</el-radio>
        <el-radio v-model="checked.sort"
                  :label="2">出版时间</el-radio>
        <el-radio v-model="checked.sort"
                  :label="3">价格正序</el-radio>
      </template>
    </div>

    <!-- 书籍列表 -->
    <div class="gameList">
      <BookCard v-for="(book,index) in books"
                :key="index"
                :item="book" />
    </div>

    <!-- 底部页码选择器 -->
    <div class="pagination">
      <el-pagination background
                     layout="prev, pager, next,jumper"
                     :total="pagination.total"
                     :page-size="35"
                     @current-change="currentPageChanged"
                     :current-page.sync="pagination.currentPage">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import BookCard from "@/components/BookCard.vue";
import { selectByCondition } from '@/api/book';

export default {
  name: "MyBooks",
  components: { BookCard },

  mounted () {
    this.getBooks();
  },

  data () {
    return {
      author: [
        "全部",
        "刘慈欣",
        "吴军",
        "加西亚·马尔克斯",
        "马伯庸",
        "金庸",
        "村上春树",
        "吴晓波",
        "东野圭吾",
        "南派三叔",
        "张爱玲",
        "余华",
        "石黑一雄",
        "三毛",
        "路遥",
      ],

      year: [
        { name: "全部", value: "全部" },
        { name: "2023", value: "2023" },
        { name: "2022", value: "2022" },
        { name: "2021", value: "2021" },
        { name: "2020", value: "2020" },
        { name: "2019", value: "2019" },
        { name: "2018", value: "2018" },
        { name: "2017", value: "2017" },
        { name: "2016", value: "2016" },
        { name: "2015", value: "2015" },
        { name: "2014", value: "2014" },
        { name: "2013", value: "2013" },
        { name: "2012", value: "2012" },
        { name: "2011", value: "2011" },
        { name: "2010", value: "2010" },
        { name: "00年代", value: "200" },
        { name: "90年代", value: "199" },
        { name: "80年代", value: "198" },
        { name: "70年代", value: "197" },
      ],

      tag: [
        "全部",
        "名著",
        "悬疑",
        "科幻",
        "言情",
        "都市",
        "幻想",
        "武侠",
        "历史",
        "文学",
        "散文",
        "传记",
        "诗歌",
        "寓言",
        "心理学",
        "社会学",
        "人类学",
        "政治",
        "法律",
        "宗教",
        "市场营销",
        "金融",
        "科普",
        "物理",
        "化学",
        "天文",
        "生物",
        "自然",
        "网络安全",
        "人工智能",
      ],

      publisher: [
        "全部",
        "中信",
        "电子工业",
        "人民邮电",
        "上海译文",
        "南海",
        "机械工业",
        "北京联合",
        "湖南文艺",
        "人民文学",
        "译林",
        "新星",
        "江苏凤凰文艺",
        "长江文艺",
        "上海人民",
        "上海文艺",
        "清华大学",
        "浙江文艺",
        "社会科学文献",
        "重庆",
        "中国人民大学",
        "中国友谊",
        "江苏文艺",
        "北京大学",
        "中国华侨",
        "浙江大学",
        "百花洲文艺",
      ],
      //   被选中的标签
      checked: {
        author: "全部",
        year: "全部",
        tag: "全部",
        publisher: "全部",
        sort: 1,
      },

      // 书籍列表数据
      books: {},

      //   底部页码选择器数据
      pagination: {
        // 总数据量
        total: 1,
        // 当前页码
        currentPage: 1,
      },
    };
  },

  methods: {
    // 切换作者
    changeAuthor (option) {
      this.checked.author = option;
    },
    // 切换年份
    changeYear (value) {
      this.checked.year = value;
    },
    // 切换标签
    changeTag (option) {
      this.checked.tag = option;
    },
    // 切换出版社
    changePublisher (option) {
      this.checked.publisher = option;
    },
    // 切换页码
    currentPageChanged (currentPage) {
      this.pagination.currentPage = currentPage;
    },

    // 获取书籍
    getBooks (page) {
      let params = {
        author: "",
        releaseYear: "",
        tags: "",
        publisher: "",
        sortId: 1,
        page: 1,
        pageSize: 35,
      };

      if (this.checked.author !== "全部") {
        params.author = this.checked.author;
      }
      if (this.checked.year !== "全部") {
        params.releaseYear = this.checked.year;
      }
      if (this.checked.tag !== "全部") {
        params.tags = this.checked.tag;
      }
      if (this.checked.publisher !== "全部") {
        params.publisher = this.checked.publisher;
      }
      params.sortId = this.checked.sort;
      params.page = page;

      // console.log(params);

      selectByCondition(params)
        .then((res) => {
          // console.log(res);
          if (res.code === 1) {
            // 书籍数据请求成功
            this.books = res.data.rows;
            this.pagination.total = res.data.total;
            this.pagination.currentPage = page;
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  watch: {
    checked: {
      deep: true,
      handler () {
        this.getBooks(1);
      },
    },
    pagination: {
      deep: true,
      handler () {
        this.getBooks(this.pagination.currentPage);
      },
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
.publisher,
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