import VueRouter from "vue-router";
import { getToken } from "@/utils/auth";
import ElementUI from "element-ui";
import jwtDecode from "jwt-decode";

import LoginRegister from "../views/LoginRegister";
import MainPage from "../views/MainPage";
import HomePage from "../views/MainPage/HomePage";
import MyFilms from "../views/MainPage/MyFilms";
import MyGames from "../views/MainPage/MyGames";
import MyBooks from "../views/MainPage/MyBooks";
import BulletinList from "../views/MainPage/BulletinList";
import FilmDetail from "../views/Detail/FilmDetail";
import GameDetail from "../views/Detail/GameDetail";
import BookDetail from "../views/Detail/BookDetail";
import UserInfo from "../views/User/UserInfo";
import UserFavorites from "../views/User/UserFavorites";
import UserComments from "../views/User/UserComments";
import AdminPage from "../views/AdminPage.vue";
import UserManage from "../views/Admin/User/UserManage";
import CommentManage from "../views/Admin/User/CommentManage";
import GameManage from "../views/Admin/Game/GameManage";
import GameTags from "../views/Admin/Game/GameTags";
import FilmManage from "../views/Admin/Film/FilmManage";
import FilmTags from "../views/Admin/Film/FilmTags";
import BookManage from "../views/Admin/Book/BookManage";
import BookTags from "../views/Admin/Book/BookTags";
import BulletinManage from "../views/Admin/System/BulletinManage";
import OperateLog from "../views/Admin/System/OperateLog";
import SearchResults from "../views/MainPage/SearchResults"

const router = new VueRouter({
  routes: [
    {
      path: "/",
      redirect: "/MainPage",
    },
    {
      name: "LoginRegister",
      path: "/LoginRegister",
      component: LoginRegister,
      meta: {
        title: "登录与注册",
      },
    },
    {
      name: "MainPage",
      path: "/MainPage",
      redirect: "/MainPage/HomePage",
      component: MainPage,
      children: [
        {
          name: "HomePage",
          path: "HomePage",
          component: HomePage,
          meta: {
            title: "首页",
          },
        },
        {
          name: "MyFilms",
          path: "MyFilms",
          component: MyFilms,
          meta: {
            title: "电影",
          },
        },
        {
          name: "MyGames",
          path: "MyGames",
          component: MyGames,
          meta: {
            title: "游戏",
          },
        },
        {
          name: "MyBooks",
          path: "MyBooks",
          component: MyBooks,
          meta: {
            title: "书籍",
          },
        },
        {
          name: "BulletinList",
          path: "BulletinList",
          component: BulletinList,
          meta: {
            title: "公告",
          },
        },
        {
          name: "FilmDetail",
          path: "FilmDetail/:id",
          component: FilmDetail,
          meta: {
            title: "电影详情",
          },
        },
        {
          name: "GameDetail",
          path: "GameDetail/:id",
          component: GameDetail,
          meta: {
            title: "游戏详请",
          },
        },
        {
          name: "BookDetail",
          path: "BookDetail/:id",
          component: BookDetail,
          meta: {
            title: "书籍详情",
          },
        },
        {
          name: "UserInfo",
          path: "UserInfo",
          component: UserInfo,
          meta: {
            title: "我的信息",
          },
        },
        {
          name: "UserFavorites",
          path: "UserFavorites",
          component: UserFavorites,
          meta: {
            title: "我的收藏",
          },
        },
        {
          name: "UserComments",
          path: "UserComments",
          component: UserComments,
          meta: {
            title: "我的评论",
          },
        },
        {
          name:"SearchResults",
          path:"SearchResults/:keyword",
          component:SearchResults,
          meta:{
            title:"搜索结果",
          }
        }
      ],
    },
    {
      name: "AdminPage",
      path: "/AdminPage",
      component: AdminPage,
      meta: {
        title: "首页",
        requirePrivilege: true,
      },
      children: [
        {
          name: "UserManage",
          path: "UserManage",
          component: UserManage,
          meta: {
            title: "用户信息管理",
            requirePrivilege: true,
          },
        },
        {
          name: "CommentManage",
          path: "CommentManage",
          component: CommentManage,
          meta: {
            title: "评论信息管理",
            requirePrivilege: true,
          },
        },
        {
          name: "GameManage",
          path: "GameManage",
          component: GameManage,
          meta: {
            title: "游戏信息管理",
            requirePrivilege: true,
          },
        },
        {
          name: "GameTags",
          path: "GameTags",
          component: GameTags,
          meta: {
            title: "游戏标签管理",
            requirePrivilege: true,
          },
        },
        {
          name: "FilmManage",
          path: "FilmManage",
          component: FilmManage,
          meta: {
            title: "电影信息管理",
            requirePrivilege: true,
          },
        },
        {
          name: "FilmTags",
          path: "FilmTags",
          component: FilmTags,
          meta: {
            title: "电影标签管理",
            requirePrivilege: true,
          },
        },
        {
          name: "BookManage",
          path: "BookManage",
          component: BookManage,
          meta: {
            title: "书籍信息管理",
            requirePrivilege: true,
          },
        },
        {
          name: "BookTags",
          path: "BookTags",
          component: BookTags,
          meta: {
            title: "书籍标签管理",
            requirePrivilege: true,
          },
        },
        {
          name: "BulletinManage",
          path: "BulletinManage",
          component: BulletinManage,
          meta: {
            title: "系统公告管理",
            requirePrivilege: true,
          },
        },
        {
          name: "OperateLog",
          path: "OperateLog",
          component: OperateLog,
          meta: {
            title: "操作日志管理",
            requirePrivilege: true,
          },
        },
      ],
    },
  ],

  // 路由跳转时自动滚动到顶部
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


// 前置路由守卫，将不存在的路由地址重定向至主页
router.beforeEach(async (to, from, next) => {
  let token = getToken();
  const whiteList = ['/LoginRegister']

  // 有token，表示已登录
  if (token) {
    // 权限，1 管理员，2 普通用户
    let privilege = jwtDecode(token).privilege;

    if (to.path === "/LoginRegister") {
      ElementUI.Message.warning("请不要重复登录！");
      return next({
        path:"/"
      });
    } else if (to.meta.requirePrivilege) {
      if (privilege === 1) {
        next();
      } else {
        ElementUI.Message.warning("权限不足！");
        next("/");
      }
    } else if (to.matched.length === 0) {
      // 如果未匹配到路由
      from.name ? next({ name: from.name }) : next("/");
    }else{
      next();
    }
  }else{
    // 未登录
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/LoginRegister?redirect=${to.path}`);
    }
  }

});

// 后置路由守卫
router.afterEach(async (to) => {
  // console.log(to,from);

  // 将页面标题设置为meta中的title属性值
  document.title = to.meta.title || "ETMATE";
});

export default router;
