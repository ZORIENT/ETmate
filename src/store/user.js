// 与用户信息相关的配置
import { getToken, setToken } from "@/utils/auth";
import { login, selectById } from "@/api/user";
import jwtDecode from "jwt-decode";
import ElementUI from "element-ui";
import router from "@/router";

const userInfo = {
  id: "",
  token: "",
  username: "",
  avatar: "",
};

export default {
  namespace: true,

  actions: {
    login(context, user) {
      return new Promise((resolve, reject) => {
        login(user)
          .then((res) => {
            // console.log(res);
            if (res.code == 1) {
              let token = res.data;
              let id = jwtDecode(token).id;
              let username = jwtDecode(token).username;
              let privilege = jwtDecode(token).privilege;
              setToken(token);

              context.dispatch("getUserInfo", id);
              ElementUI.Message.success("登陆成功！欢迎" + username);

              if (privilege === 1) {
                router.push("AdminPage");
              } else {
                router.push("MainPage");
              }
            } else {
              ElementUI.Message.error(res.msg);
            }
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    getUserInfo(context, id) {
      return new Promise((resolve, reject) => {
        selectById(id)
          .then((res) => {
            // console.log(res.data);
            let username = res.data.username;
            let avatar = res.data.avatar;
            let token = getToken();

            context.commit("SET_USERID", id);
            context.commit("SET_TOKEN", token);
            context.commit("SET_USERNAME", username);
            context.commit("SET_AVATAR", avatar);
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },

  mutations: {
    RESET_STATE(state) {
      Object.assign(state, userInfo);
    },
    SET_TOKEN(state, token) {
      state.userInfo.token = token;
    },
    SET_USERID(state, userId) {
      state.userInfo.id = userId;
    },

    SET_USERNAME(state, username) {
      state.userInfo.username = username;
    },
    SET_AVATAR(state, avatar) {
      state.userInfo.avatar = avatar;
    },
  },

  state: {
    userInfo,
  },

  getters: {},
};
