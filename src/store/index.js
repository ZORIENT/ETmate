//该文件用于创建Vuex中最核心的store
import user from "@/store/user";

//引入Vuex
import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

//创建store
export default new Vuex.Store({
  modules: {
    user: user,
  },
});
