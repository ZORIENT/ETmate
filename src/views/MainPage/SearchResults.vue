<template>
  <div class="SearchResults">
    <!-- 我的收藏 -->
    <div class="title">
      <h1>
        已经为您找到 {{ navs[0].total }} 条与
        {{ this.$route.params.keyword }} 相关的信息
      </h1>
    </div>

    <!-- 分类导航按钮 -->
    <div class="navs">
      <ul>
        <li v-for="nav in navs" :key="nav.id" @click="changeNav(nav.id)">
          <span :class="activedNav === nav.id ? 'activedNav' : ''">
            {{ nav.name }}({{ nav.total }})
          </span>
        </li>
      </ul>
    </div>

    <!-- 搜索结果展示 -->
    <div class="resultList">
      <!-- 展示电影 -->
      <div
        class="result"
        v-for="film in results.filmResults.rows"
        :key="film.cover"
        v-show="activedNav === 0 || activedNav === 1"
        @click="$router.push({ name: 'FilmDetail', params: { id: film.id } })"
      >
        <div class="left">
          <img :src="film.cover" />
        </div>
        <div class="right">
          <h1>{{ film.filmName }} ({{ film.releaseYear }})</h1>
          <p>类型：{{ film.genres }}</p>
          <p>别名：{{ film.alias?film.alias:"N/A" }}</p>
          <p>导演：{{ film.director?film.director:"N/A" }}</p>
          <p>主演：{{ film.actors?film.actors:"N/A" }}</p>
          <p>标签：{{ film.tags }}</p>
        </div>
      </div>

      <!-- 展示游戏 -->
      <div
        class="result"
        v-for="game in results.gameResults.rows"
        :key="game.cover"
        v-show="activedNav === 0 || activedNav === 2"
        @click="$router.push({ name: 'GameDetail', params: { id: game.id } })"
      >
        <div class="left">
          <img :src="game.cover" />
        </div>
        <div class="right">
          <h1>{{ game.gameName }} ({{ game.timePlatform }})</h1>
          <p>类型：{{ game.genres }}</p>
          <p>别名：{{ game.gameNameEn?game.gameNameEn:"N/A" }}</p>
          <p>发行：{{ game.publisher?game.publisher:"N/A" }}</p>
          <p>平台：{{ game.platforms?game.platforms:"N/A" }}</p>
          <p>标签：{{ game.tags }}</p>
        </div>
      </div>

      <!-- 展示书籍 -->
      <div
        class="result"
        v-for="book in results.bookResults.rows"
        :key="book.cover"
        v-show="activedNav === 0 || activedNav === 3"
        @click="$router.push({ name: 'BookDetail', params: { id: book.id } })"
      >
        <div class="left">
          <img :src="book.cover" />
        </div>
        <div class="right">
          <h1>{{ book.bookName }} ({{ book.publicationTime }})</h1>
          <p>IBSN：{{ book.ibsn?book.ibsn:"N/A" }}</p>
          <p>作者：{{ book.author }}</p>
          <p>出版：{{ book.publisher }}</p>
          <p>豆瓣：{{ book.doubanScore }}分</p>
          <p>标签：{{ book.tags }}</p>
        </div>
      </div>

      <div class="noData" v-show="!pagination.total">
        <span>暂无数据</span>
      </div>
    </div>

    <!-- 页码选择器 -->
    <div class="pagination" v-show="activedNav !== 0">
      <el-pagination
        background
        layout="prev, pager, next,jumper"
        :total="pagination.total"
        :page-size="10"
        @current-change="currentPageChanged"
      >
      </el-pagination>
    </div>
  </div>
</template>
  
 <script>
import { search } from "@/api/search";

export default {
  name: "SearchResults",

  data() {
    return {
      navs: [
        {
          id: 0,
          name: "全部",
          total: "",
        },
        {
          id: 1,
          name: "电影",
          total: "",
        },
        {
          id: 2,
          name: "游戏",
          total: "",
        },
        {
          id: 3,
          name: "书籍",
          total: "",
        },
      ],
      results: {
        filmResults: {},
        gameResults: {},
        bookResults: {},
      },

      // 当前活动按钮
      activedNav: 0,

      pagination: {
        total: 1,
        currentPage: 1,
      },
    };
  },

  mounted() {
    this.page();
  },

  watch: {
    $route() {
      this.activedNav = 0;
      this.pagination.total=1;
      this.page();
    },
    activedNav(value) {
      this.pagination.total = this.navs[value].total;
    },
    pagination: {
      deep: true,
      handler() {
        this.page();
      },
    },
  },

  computed: {
    filmTotal() {
      return this.results.filmResults.total;
    },
    gameTotal() {
      return this.results.gameResults.total;
    },
    bookTotal() {
      return this.results.bookResults.total;
    },
  },

  methods: {
    // 切换活动按钮
    changeNav(id) {
      this.activedNav = id;
      // console.log(this.activedNav);
    },

    // 切换页码
    currentPageChanged(currentPage) {
      this.pagination.currentPage = currentPage;
    },

    // 查询
    search(params) {
      search(params)
        .then((res) => {
          if (res.code === 1) {
            // console.log(res.data);
            this.results = res.data;
            this.navs[1].total = res.data.filmResults.total;
            this.navs[2].total = res.data.gameResults.total;
            this.navs[3].total = res.data.bookResults.total;
            this.navs[0].total =
              res.data.filmResults.total +
              res.data.gameResults.total +
              res.data.bookResults.total;
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    page() {
      let params = {
        keyword: this.$route.params.keyword,
        page: this.pagination.currentPage,
        pageSize: 10,
      };

      this.search(params);
    },
  },
};
</script>
  
<style scoped>
.SearchResults {
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
.navs {
  /* border: 1px solid green; */
  padding: 10px 0px;
}

.navs ul {
  display: flex;
  margin: 10px 0px;
}

.navs ul li span {
  border: 1px solid var(--primaryColor);
  padding: 5px 20px;
  color: var(--primaryColor);
  transition: all 0.4s;
  /* border-radius: 4px; */
}

.activedNav {
  background: var(--primaryColor);
  color: #fff !important;
}

/* ********************************************************** */

.resultList {
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  min-height: 495px;
}

.result {
  /* border: 1px solid red; */
  border-bottom: 1px solid var(--lightTheme);
  display: flex;
  padding: 10px 0px;
  cursor: pointer;
}

.result .left {
  margin-right: 20px;
}

.result .left img {
  height: 200px;
  width: 140px;
}

.result .right {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.result .right h1 {
  font-size: 18px;
  color: #337ab7;
  font-weight: bold;
}

.result .right p {
  font-size: 13px;
  /* 限制文字显示行数 */
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}

.noData {
  height: 495px;
}

.noData span {
  font-size: 16px;
  font-weight: bold;
  color: var(--primaryColor);
}

/* ************************************************************** */
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