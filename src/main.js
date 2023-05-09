import Vue from "vue";
import App from "./App.vue";

// 引入重置全局css
import "./assets/css/reset.css";

// 引入vue-router路由器
import VueRouter from "vue-router";
import router from "./router";

//引入store
import store from "./store/index";

// 引入element-ui
import ElementUI from "element-ui"
// import 'element-ui/lib/theme-chalk/index.css';
import "../theme/index.css"


/**************************************************************/

//关闭开发提示
Vue.config.productionTip = false;


// 使用路由插件
Vue.use(VueRouter);
// 使用elementui
Vue.use(ElementUI)

/***************************************************************/

new Vue({
  render: (h) => h(App),
  router,
  store,

  // 全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
}).$mount("#app");
