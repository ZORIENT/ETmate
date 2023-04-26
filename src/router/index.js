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
      ],
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
