import VueRouter from "vue-router";

import LoginRegister from "../views/LoginRegister";
import MainPage from "../views/MainPage";
import HomePage from "../views/MainPage/HomePage";
import MyFilms from "../views/MainPage/MyFilms";
import MyGames from "../views/MainPage/MyGames";
import MyBooks from "../views/MainPage/MyBooks";
import BulletinList from "../views/MainPage/BulletinList";
import FilmDetail from "../views/Detail/FilmDetail"
import GameDetail from "../views/Detail/GameDetail"
import BookDetail from "../views/Detail/BookDetail"
import UserInfo from "../views/User/UserInfo"
import UserFavorites from "../views/User/UserFavorites"
import UserComments from "../views/User/UserComments"

import AdminPage from "../views/AdminPage.vue"

import UserManage from "../views/Admin/User/UserManage"
import CommentManage from "../views/Admin/User/CommentManage"
import GameManage from "../views/Admin/Game/GameManage"
import GameTags from "../views/Admin/Game/GameTags"
import FilmManage from "../views/Admin/Film/FilmManage"
import FilmTags from "../views/Admin/Film/FilmTags"
import BookManage from "../views/Admin/Book/BookManage"
import BookTags from "../views/Admin/Book/BookTags"
import BulletinManage from "../views/Admin/System/BulletinManage"
import OperateLog from "../views/Admin/System/OperateLog"



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
        },
        {
          name: "MyFilms",
          path: "MyFilms",
          component: MyFilms,
        },
        {
          name: "MyGames",
          path: "MyGames",
          component: MyGames,
        },
        {
          name: "MyBooks",
          path: "MyBooks",
          component: MyBooks,
        },
        {
          name: "BulletinList",
          path: "BulletinList",
          component: BulletinList,
        },
        {
          name:"FilmDetail",
          path:"FilmDetail",
          component:FilmDetail,
        },
        {
          name: "GameDetail",
          path: "GameDetail",
          component: GameDetail,
        },
        {
          name: "BookDetail",
          path: "BookDetail",
          component: BookDetail,
        },
        {
          name: "UserInfo",
          path: "UserInfo",
          component: UserInfo,
        },
        {
          name: "UserFavorites",
          path: "UserFavorites",
          component: UserFavorites,
        },
        {
          name: "UserComments",
          path: "UserComments",
          component: UserComments,
        },
      ],
    },
    {
      name:"AdminPage",
      path:"/AdminPage",
      component:AdminPage,
      meta:{
        title:"首页"
      },
      children:[
        {
          name: "UserManage",
          path: "UserManage",
          component: UserManage,
          meta:{
            title:"用户信息管理",
          }
        },
        {
          name: "CommentManage",
          path: "CommentManage",
          component: CommentManage,
          meta:{
            title:"评论信息管理",
          }
        },
        {
          name: "GameManage",
          path: "GameManage",
          component: GameManage,
          meta:{
            title:"游戏信息管理",
          }
        },
        {
          name: "GameTags",
          path: "GameTags",
          component: GameTags,
          meta:{
            title:"游戏标签管理",
          }
        },
        {
          name: "FilmManage",
          path: "FilmManage",
          component: FilmManage,
          meta:{
            title:"电影信息管理",
          }
        },
        {
          name: "FilmTags",
          path: "FilmTags",
          component: FilmTags,
          meta:{
            title:"电影标签管理",
          }
        },
        {
          name: "BookManage",
          path: "BookManage",
          component: BookManage,
          meta:{
            title:"书籍信息管理",
          }
        },
        {
          name: "BookTags",
          path: "BookTags",
          component: BookTags,
          meta:{
            title:"书籍标签管理",
          }
        },
        {
          name: "BulletinManage",
          path: "BulletinManage",
          component: BulletinManage,
          meta:{
            title:"系统公告管理",
          }
        },
        {
          name: "OperateLog",
          path: "OperateLog",
          component: OperateLog,
          meta:{
            title:"操作日志管理",
          }
        },
      ]
    },
  ],

  // 路由跳转时自动滚动到顶部
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

// 前置路由守卫，将不存在的路由地址重定向至主页
router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {
    // 如果未匹配到路由
    from.name ? next({ name: from.name }) : next("/");
  } else {
    // 如果匹配到正确跳转
    next();
  }
});

export default router;
