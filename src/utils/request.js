//配置全局的基础配置
import axios from "axios";
import { removeToken, getToken } from "@/utils/auth";
import router from "@/router";
import ElementUI from "element-ui";

// 导入NProgress进度条
import NProgress from "nprogress";
import "nprogress/nprogress.css";

let request = axios.create({
  //基础配置
  baseURL: "http://localhost:8083/",
  timeout: 30 * 1000,
  responseType: "json",
  headers: {},
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 请求时开启进度条
    NProgress.start();

    // token，密钥的设置
    let token = getToken();
    if (token) {
      // 设置请求头中的token
      config.headers["token"] = token;
    }

    return config;
  },
  (error) => {
    // 请求时开启进度条
    NProgress.start();
    console.log(error);
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (res) => {
    // 响应时进度条结束
    NProgress.done();

    if (res.data.code === 0 && res.data.msg === "NOT_LOGIN") {
      ElementUI.Message.closeAll();
      ElementUI.Message.error("尚未登录，请登录");
      removeToken();
      router.push("/LoginRegister");
      return res.data;
    } else {
      return res.data;
    }
  },
  (error) => {
    // 响应时进度条结束
    NProgress.done();
    console.log("err" + error);
    let { message } = error;
    if (message == "Network Error") {
      message = "后端接口连接异常";
      ElementUI.Message.error(message);
    } else if (message.includes("timeout")) {
      message = "系统接口请求超时";
      ElementUI.Message.error(message);
    } else if (message.includes("Request failed with status code")) {
      message = "系统接口" + message.substr(message.length - 3) + "异常";
      ElementUI.Message.error(message);
    }
    return Promise.reject(error);
  }
);

export default request;
