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
import ElementUI from "element-ui";
// import 'element-ui/lib/theme-chalk/index.css';
import "../theme/index.css";

// 滚动阻塞'鼠标滚轮'事件
import "default-passive-events";

/*************************************************************/
// 全局禁止dialog点击空白关闭
ElementUI.Dialog.props.closeOnClickModal.default = false;
// 全局禁止messageBox点击空白关闭
ElementUI.MessageBox.setDefaults({
  closeOnClickModal: false,
});

/**************************************************************/

//关闭开发提示
Vue.config.productionTip = false;

// 使用路由插件
Vue.use(VueRouter);
// 使用elementui
Vue.use(ElementUI);

// 自定义全局函数
Vue.prototype.computedText = function (text) {
  // 处理文本信息，处理换行
  if (text != null) {
    let arr = text.split("");
    return arr
      .map((item) => {
        return item === "\n" ? "<br/>&emsp;&emsp;" : item;
      })
      .join("");
  } else {
    return "";
  }
};

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
