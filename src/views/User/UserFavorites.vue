<template>
  <div class="container">
    <!-- 我的收藏 -->
    <div class="title">
      <h1>我的收藏</h1>
    </div>

    <!-- 分类导航按钮 -->
    <div class="navs">
      <ul>
        <li v-for="nav in navs"
            :key="nav.id"
            @click="changeNav(nav.id)">
          <span :class="activedNav === nav.id ? 'activedNav' : ''">
            {{ nav.name }}({{ nav.total }})
          </span>
        </li>
      </ul>
    </div>

    <!-- 收藏展示 -->
    <div class="collectionList">
      <div class="collection"
           v-show="activedNav===1||activedNav===0"
           v-for="collection in filmCollections.rows"
           :key="collection.id">
        <FilmCard :item="collection.film"></FilmCard>
        <button @click="deleteCollection(collection.id)">取消收藏</button>
      </div>

      <div class="collection"
           v-show="activedNav===2||activedNav===0"
           v-for="collection in gameCollections.rows"
           :key="collection.id">
        <GameCard :item="collection.game"></GameCard>
        <button @click="deleteCollection(collection.id)">取消收藏</button>
      </div>

      <div class="collection"
           v-show="activedNav===3||activedNav===0"
           v-for="collection in bookCollections.rows"
           :key="collection.id">
        <BookCard :item="collection.book"></BookCard>
        <button @click="deleteCollection(collection.id)">取消收藏</button>
      </div>
    </div>
  </div>
</template>

<script>
import FilmCard from "@/components/FilmCard.vue";
import GameCard from "@/components/GameCard.vue";
import BookCard from "@/components/BookCard.vue";
import { selectCollectionByCondition, deleteCollection } from "@/api/collection"
import { getUserId } from '@/utils/auth';

export default {
  name: "UserFavorites",

  components: { FilmCard, GameCard, BookCard },

  data () {
    return {
      navs: [
        {
          id: 0,
          name: "全部",
          total: 0
        },
        {
          id: 1,
          name: "电影",
          total: 0
        },
        {
          id: 2,
          name: "游戏",
          total: 0
        },
        {
          id: 3,
          name: "书籍",
          total: 0
        },
      ],
      results: [],

      // 各类型收藏详细信息
      filmCollections: [],
      gameCollections: [],
      bookCollections: [],

      // 当前活动按钮
      activedNav: 0,
    };
  },

  mounted () {
    this.selectCollection();
  },

  methods: {
    // 切换活动按钮
    changeNav (id) {
      this.activedNav = id;
      // console.log(this.activedNav);
    },

    // 查询当前用户的所有收藏
    selectCollection () {
      let films = {
        userId: getUserId(),
        type: 1
      };
      let games = {
        userId: getUserId(),
        type: 2
      }
      let books = {
        userId: getUserId(),
        type: 3
      }

      // 查询电影收藏
      selectCollectionByCondition(films).then(res => {
        if (res.code === 1) {
          // console.log(res.data);
          this.filmCollections = res.data;
          this.navs[1].total = res.data.total;
          this.navs[0].total += res.data.total;
        } else {
          this.$message.error(res.msg);
        }
      }).catch(err => {
        console.log(err);
      });

      // 查询游戏收藏
      selectCollectionByCondition(games).then(res => {
        if (res.code === 1) {
          // console.log(res);
          this.gameCollections = res.data;
          this.navs[2].total = res.data.total;
          this.navs[0].total += res.data.total;
        } else {
          this.$message.error(res.msg);
        }
      }).catch(err => {
        console.log(err);
      });

      // 查询书籍收藏
      selectCollectionByCondition(books).then(res => {
        if (res.code === 1) {
          // console.log(res);
          this.bookCollections = res.data;
          this.navs[3].total = res.data.total;
          this.navs[0].total += res.data.total;
        } else {
          this.$message.error(res.msg);
        }
      }).catch(err => {
        console.log(err);
      });
    },

    // 取消收藏
    deleteCollection (id) {
      // console.log(id);
      deleteCollection(id).then(res => {
        if (res.code === 1) {
          this.$message.success("取消收藏成功！");
          // 更新收藏信息
          this.selectCollection();
        } else {
          this.$message.error(res.msg);
        }
      }).catch(err => {
        console.log(err);
      });
    },
  },
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

.collectionList {
  /* display: flex; */
  display: grid;
  grid-template-columns: repeat(7, 160px);
  grid-gap: 10px;
  /* border: 1px solid red; */
}

.collection {
  /* border: 1px solid red; */
}

.collection button {
  width: 160px;
  padding: 10px;
  background: var(--primaryColor);
  border: none;
  border-radius: 4px;
  font-size: 14px;
  color: var(--lightTheme);
  margin: 5px 0px;
  text-align: center;
  font-weight: bold;
  position: relative;
}

.collection button::before {
  content: '';
  position: absolute;
  background: linear-gradient(
    to left,
    rgba(255, 255, 255, 0) 50%,
    rgba(255, 255, 255, 0.6) 50%
  );
  background-size: 210% 100%;
  border-radius: 4px;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
  transition: all 0.4s;
  background-position: right bottom;
}

.collection button:hover::before {
  background-position: left bottom;
}
</style>