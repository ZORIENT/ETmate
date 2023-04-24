import VueRouter from "vue-router";

import LoginRegister from "../views/LoginRegister"
import MainPage from "../views/MainPage"

const router = new VueRouter({
  routes: [
    {
      path: "/",
      redirect: "/LoginRegister",
    },
    {
        name:"LoginRegister",
        path:"/LoginRegister",
        component:LoginRegister
    },
    {
        name:"MainPage",
        path:"/MainPage",
        component:MainPage
    },
  ],
});

export default router;
