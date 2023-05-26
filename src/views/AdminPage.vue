<template>
  <div class="AdminPage">
    <div class="left">
      <!-- 顶部标题 -->
      <div class="title">
        <img src="favicon.ico" />
        <span>娱乐方式推荐系统</span>
      </div>

      <!-- 中间导航按钮区 -->
      <div class="navs">
        <el-collapse>
          <el-collapse-item>
            <template slot="title">
              <i class="el-icon-house">管理后台首页</i>
            </template>
            <router-link :to="{ name: 'AdminMainPage' }">系统数据统计</router-link>
          </el-collapse-item>

          <el-collapse-item>
            <template slot="title">
              <i class="el-icon-user">用户模块管理</i>
            </template>
            <router-link :to="{ name: 'UserManage' }">用户信息管理</router-link>
            <router-link :to="{ name: 'CommentManage' }">评论信息管理</router-link>
          </el-collapse-item>

          <el-collapse-item>
            <template slot="title">
              <i class="el-icon-coin">内容模块管理</i>
            </template>
            <router-link :to="{ name: 'FilmManage' }">电影信息管理</router-link>
            <router-link :to="{ name: 'GameManage' }">游戏信息管理</router-link>
            <router-link :to="{ name: 'BookManage' }">书籍信息管理</router-link>
          </el-collapse-item>

          <el-collapse-item>
            <template slot="title">
              <i class="el-icon-notebook-1">系统模块管理</i>
            </template>
            <router-link :to="{ name: 'BulletinManage' }">系统公告管理</router-link>
            <router-link :to="{ name: 'OperateLog' }">操作日志管理</router-link>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>

    <div class="right">
      <!-- 面包屑导航条 -->
      <div class="top">
        <div class="bread">
          <el-breadcrumb separator-class="el-icon-arrow-right" >
            <el-breadcrumb-item v-for="(item, index) in breadList"
                                :key="index"
                                :to="{ path: item.path }">{{ item.meta.title }}
                                
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>

        <div class="menu">
          <el-dropdown trigger="click"
                       @command="handleCommand">
            <img :src="profileImg" />
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="MainPage">
                <span class="el-icon-house"></span>
                <span>主 页</span>
              </el-dropdown-item>
              <el-dropdown-item command="loginOut">
                <span class="el-icon-warning-outline"></span>
                <span class="loginOut">登 出</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>

      <!-- 数据管理与展示区 -->
      <div class="center">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { removeToken } from "@/utils/auth"

export default {
  name: "AdminPage",

  data () {
    return {
      breadList: [],
    };
  },

  mounted () { },

  watch: {
    // 路由发生变化时，触发getBreadcrumb()
    $route () {
      this.getBreadcrumb();
    },
  },

  methods: {
    handleCommand (command) {
      // this.$message('click on item ' + command);
      if (command === "loginOut") {
        // console.log("Login Out");
        removeToken();
        this.$store.commit("RESET_STATE");
        this.$message.success("退出登录成功！");
        this.$router.push({ name: "LoginRegister" });
      } else {
        this.$router.push({ name: command });
      }
    },
    isAdminPage (route) {
      return route.name === "AdminPage";
    },
    getBreadcrumb () {
      let matched = this.$route.matched;
      // 如果不是首页
      if (!this.isAdminPage(matched[0])) {
        matched = [{ path: "/AdminPage", meta: { title: "首页" } }].concat(
          matched
        );
      }
      this.breadList = matched;
    },
  },

  created () {
    this.getBreadcrumb();
  },

  computed: {
    //   头像的链接
    profileImg () {
      return this.$store.state.user.userInfo.avatar;
    },
  },
};
</script>

<style scoped>
.AdminPage {
  /* border: 1px solid red; */
  display: flex;
  position: relative;
  margin: 0px 20px;
}

.left {
  /* border: 1px solid green; */
  width: 222px;
  display: flex;
  flex-direction: column;
  /* background: rgba(14,85,113,0.75); */

  position: fixed;
  z-index: 999;
  left: 0px;
  /* height: 300px; */
  background: #304156;
  height: 100%;
}

.left >>> .el-collapse,
.left >>> .el-collapse-item__header {
  background: #304156;
  border: none;
  color: #fff;
  font-size: 14px;
  /* border: 1px solid #fff; */
}

.left >>> .el-collapse-item__header i:first-child {
  margin-left: 30px !important;
}

.left >>> .el-collapse-item__header i:first-child::before {
  margin-right: 20px;
}

.left >>> .el-collapse-item__header:hover {
  background: #263445;
}

.left >>> .el-collapse-item__wrap {
  background: #1f2d3d;
  border: none;
  /* border: 1px solid red; */
}

.left >>> .el-collapse-item__content {
  display: flex;
  flex-direction: column;
  padding: 0px;
}

.left >>> .el-collapse-item__content a {
  color: #fff;
  font-size: 14px;
  padding-left: 65px;
  height: 50px;
  line-height: 50px;
  /* border: 1px solid red; */
}

.left >>> .el-collapse-item__content a:hover {
  background: #001528;
}

/* ************************************************************ */
.title {
  display: flex;
  overflow: hidden;
  /* border: 1px solid red; */
  height: 60px;
  /* justify-content: center; */
  justify-content: space-evenly;
  align-items: center;
  background: var(--darkTheme);
}

.title img {
  width: 45px;
  height: 45px;
}

.title span {
  color: #fff;
  font-size: 16px;
  font-weight: bold;
}

/* ************************************************************ */
.navs {
}

/* ************************************************************ */

/* ************************************************************ */
.right {
  /* border: 1px solid black; */
  width: calc(100% - 222px);
  /* height: 2000px; */
  /* background: red; */
  width: 100%;
}

/* *********************************************************** */
.top {
  background: var(--darkTheme);
  /* width: 100%; */
  width: calc(100% - 222px);

  display: flex;
  justify-content: space-between;
  align-items: center;

  position: fixed;
  left: 222px;
  top: 0px;

  z-index: 999;
}

.bread {
  /* border: 1px solid green; */
  /* width: 100%; */
  display: flex;
  height: 60px;
  margin-left: 10px;
}

.bread >>> .el-breadcrumb__item span,
.bread >>> .el-breadcrumb__inner.is-link {
  text-align: center;
  line-height: 60px;
  font-size: 16px;
  color: #fff !important;
  /* margin-left: 10px; */
  font-weight: normal;
}

.menu {
  height: 60px;
  /* width: 100%; */
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.menu img {
  height: 45px;
  width: 45px;
  border-radius: 100%;
}

/* ********************************************************** */
.center {
  /* background: red; */
  margin-top: 60px;
  margin-left: 222px;
  /* width: 100%; */
  height: calc(100% - 60px);
}
</style>