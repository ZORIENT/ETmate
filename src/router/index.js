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
import AdminMainPage from "../views/Admin/MainPage/AdminMainPage";
import UserManage from "../views/Admin/User/UserManage";
import CommentManage from "../views/Admin/User/CommentManage";
import FilmManage from "../views/Admin/ModuleManage/FilmManage";
import GameManage from "../views/Admin/ModuleManage/GameManage";
import BookManage from "../views/Admin/ModuleManage/BookManage";
import BulletinManage from "../views/Admin/System/BulletinManage";
import OperateLog from "../views/Admin/System/OperateLog";
import SearchResults from "../views/MainPage/SearchResults";
import UserReplys from "../views/User/UserReplys";
import ReplyInfo from "../components/BulletinList/ReplyInfo";
import SystemBulletin from "../components/BulletinList/SystemBulletin";

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
          redirect: "/MainPage/BulletinList/SystemBulletin",
          meta: {
            title: "公告",
          },
          children: [
            {
              name: "SystemBulletin",
              path: "SystemBulletin",
              component: SystemBulletin,
              meta: {
                title: "系统通知",
              },
            },
            {
              name: "ReplyInfo",
              path: "ReplyInfo",
              component: ReplyInfo,
              meta: {
                title: "回复我的",
              },
            },
          ],
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
          name: "UserReplys",
          path: "UserReplys",
          component: UserReplys,
          meta: {
            title: "我的回复",
          },
        },
        {
          name: "SearchResults",
          path: "SearchResults/:keyword",
          component: SearchResults,
          meta: {
            title: "搜索结果",
          },
        },
      ],
    },
    {
      name: "AdminPage",
      path: "/AdminPage",
      redirect: "/AdminPage/AdminMainPage",
      component: AdminPage,
      meta: {
        title: "管理后台首页",
        requirePrivilege: true,
      },
      children: [
        {
          name: "AdminMainPage",
          path: "AdminMainPage",
          component: AdminMainPage,
          meta: {
            title: "系统数据统计",
            requirePrivilege: true,
          },
        },
        {
          name: "UserManage",
          path: "UserManage",
          component: UserManage,
          meta: {
            title: "用户模块管理",
            requirePrivilege: true,
          },
        },
        {
          name: "CommentManage",
          path: "CommentManage",
          component: CommentManage,
          meta: {
            title: "评分评论管理",
            requirePrivilege: true,
          },
        },
        {
          name: "FilmManage",
          path: "FilmManage",
          component: FilmManage,
          meta: {
            title: "电影模块管理",
            requirePrivilege: true,
          },
        },
        {
          name: "GameManage",
          path: "GameManage",
          component: GameManage,
          meta: {
            title: "游戏模块管理",
            requirePrivilege: true,
          },
        },
        {
          name: "BookManage",
          path: "BookManage",
          component: BookManage,
          meta: {
            title: "书籍模块管理",
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
const originalPush = VueRouter.prototype.push;
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

// 前置路由守卫，将不存在的路由地址重定向至主页
router.beforeEach(async (to, from, next) => {
  let token = getToken();
  const whiteList = ["/LoginRegister"];

  // 有token，表示已登录
  if (token) {
    // 权限，1 管理员，2 普通用户
    let privilege = jwtDecode(token).privilege;

    if (to.path === "/LoginRegister") {
      ElementUI.Message.warning("请不要重复登录！");
      return next({
        path: "/",
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
    } else {
      next();
    }
  } else {
    // 未登录
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      ElementUI.Message.error("尚未登录，请登录！");
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
