<!-- 用户首页部分的头部 -->

<template>
  <div class="appHeader">
    <!-- 占位 -->
    <!-- <div class="content"></div> -->

    <!-- 功能区 -->
    <div class="center">
      <!-- 网站的名称 -->
      <span class="projectName">{{ projectName }}</span>

      <!-- header导航栏，主页，电影，游戏，公告，个人中心 -->
      <div class="navBtns">
        <router-link
          active-class="navBtnActive"
          class="navBtn"
          v-for="(navBtn, index) in navBtns"
          :key="index"
          :to="{
            name: `${navBtn.path}`,
            // name: navBtn.pageName
            // 
          }"
        >
          <span>{{ navBtn.name }}</span>
        </router-link>
      </div>

      <!-- 搜索框 -->
      <div class="searchBox">
        <span class="el-icon-search"></span>
        <input type="text" placeholder="电影/游戏/书籍" />
      </div>

      <!-- 头像 -->
      <div class="userInfo">
        <div @click="isSettingSpread = !isSettingSpread" class="imgContent">
          <el-image :src="profileImg" class="profile" lazy>
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>

          <!-- <transition name="triangle"> -->
          <!-- 上三角形 -->
          <!-- <div v-show="isSettingSpread" class="triangle"></div>
          </transition> -->

          <transition name="settings">
            <!-- 头像下拉框 -->
            <ul v-show="isSettingSpread" class="dropDown">
              <router-link
                tag="li"
                v-for="setting in settingList"
                :key="setting.iconClass"
                :to="{
                  name: `${setting.pageName}`,
                  // name:'FilmDetail'
                }"
              >
                <span :class="setting.iconClass"></span>
                <span>{{ setting.settingName }}</span>
              </router-link>

              <li @click="loginOut">
                <span class="el-icon-warning-outline"></span>
                <span>登 出</span>
              </li>
            </ul>
          </transition>
        </div>
      </div>
    </div>

    <!-- 占位 -->
    <!-- <div class="content"></div> -->
  </div>
</template>

<script>
export default {
  name: "AppHeader",

  data() {
    return {
      projectName: "ETmate",
      settingList: [
        {
          iconClass: "el-icon-user",
          settingName: "我的信息",
            pageName: "UserInfo",
        },
        {
          iconClass: "el-icon-collection-tag",
          settingName: "我的收藏",
            pageName: "UserFavorites",
        },
        {
          iconClass: "el-icon-document",
          settingName: "我的评论",
            pageName: "UserComments",
        },
      ],
      navBtns: [
        { name: "首页", path: "HomePage" },
        { name: "电影", path: "MyFilms" },
        { name: "游戏", path: "MyGames" },
        { name: "书籍", path: "MyBooks" },
        { name: "公告", path: "BulletinList" },
      ],
      // setting是否展开
      isSettingSpread: false,
      //   头像的链接
      profileImg: require("../assets/img/bg.jpg"),
    };
  },

  methods: {
    // 点击退出登录，并且跳转到登录页面
    loginOut() {
      //   console.log("Login Out");
      this.$router.push({ name: "LoginRegister" });
    },
  },
};
</script>

<style scoped>
.appHeader {
  position: fixed;
  top: 0px;
  z-index: 999;

  display: flex;
  /* justify-items: center; */
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  /* border: 1px solid brown; */

  width: 100%;
  white-space: nowrap;
  height: 60px;

  box-shadow: 0px 0px 4px var(--darkTheme);
  background: rgba(14, 85, 113, 0.95);
}

.appHeader::before {
  content: "";
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: var(--primaryColor);
  filter: blur(8px);
  z-index: -1;
}

.center {
  display: flex;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
  /* border: 1px solid brown; */

  width: calc(var(--width)*1px);
  white-space: nowrap;
  height: 60px;
}

.projectName {
  font-size: 24px;
  color: var(--lightTheme);
  font-weight: bold;
  font-family: Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei",
    "WenQuanYi Micro Hei", sans-serif;
}

.navBtns {
  /* border: 1px solid red; */

  display: flex;
  justify-content: space-around;
  align-items: center;

  height: 100%;
  width: 35%;
}

.navBtn span {
  display: block;
  /* background: red; */
  padding: 8px 14px;
  color: var(--lightTheme);
  font-size: 16px;
}

.navBtn span:hover {
  color: #bababa;
  transition: all 0.4s;
}

.navBtnActive {
  background: var(--lightTheme);
  border-radius: 4px;
  box-shadow: 2px 2px 4px #2b2b2b;
  transition: all 0.4s;
}

.navBtnActive span {
  color: var(--primaryColor);
  font-weight: bold;
}

.navBtnActive span:hover {
  color: var(--primaryColor);
}

.searchBox {
  /* border: 1px solid red; */
  height: 30px;
  width: 200px;
  line-height: 30px;
  border-radius: 4px;
  box-shadow: 0px 0px 8px var(--primaryThemeWhite);
  margin: 0px 20px;
  display: flex;
  align-content: center;
  justify-content: center;
  background: var(--lightTheme);
}

.searchBox span {
  color: var(--primaryThemeWhite);
  font-size: 20px;
  color: var(--primaryColor);
  font-weight: bold;
  margin: 4px;
}

.searchBox input {
  flex-grow: 1;
  background-color: transparent;
  color: var(--primaryColor);
  cursor: pointer;
}

.searchBox input::placeholder {
  color: var(--primaryColor);
  font-size: 14px;
  opacity: 0.8;
}

.userInfo {
  display: flex;
  align-items: center;
  /* border: 1px solid brown; */
}

.userInfo .profile {
  height: 48px;
  width: 48px;
  border-radius: 48px;
}

.userInfo .profile .image-slot {
  position: relative;
  width: 100%;
  height: 100%;
}

.userInfo .profile i::before {
  color: var(--lightTheme);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  font-size: 24px;
}

.imgContent:hover {
  box-shadow: 0px 0px 6px 2px var(--lightTheme);
}

.imgContent {
  border-radius: 48px;
  position: relative;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* .imgContent .triangle {
  position: absolute;
  top: 52px;
  width: 0px;
  height: 0px;
  border: 10px solid;
  border-color: transparent transparent #bababa transparent;
  opacity: 0.3;
  background: #fff;
} */

.imgContent .dropDown {
  position: absolute;
  /* float: left; */
  /* bottom: 10px; */
  top: 60px;
  /* border: 1px solid brown; */
  padding: 16px;
  width: 140px;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 4px;
  box-shadow: 0px 2px 6px #2b2b2b;
  background: #fff;
  /* opacity: 0.6;
    background-color: var(--primaryThemeWhite); */
}

.imgContent .dropDown li {
  padding-bottom: 8px;
  width: 100%;
  border-bottom: 1px solid var(--primaryFontGreyColor);
  /* background-color: red; */
  cursor: pointer;
}

.imgContent .dropDown li:hover span {
  color: var(--primaryColor);
}

.imgContent .dropDown li:last-child span {
  /* color:rgb(253, 85, 85); */
  opacity: 0.6;
  color: rgb(221, 0, 0);
}

.imgContent .dropDown li:last-child:hover span {
  color: rgb(221, 0, 0);
  opacity: 1;
}

.imgContent .dropDown li:not(:last-child) {
  margin-bottom: 20px;
}

.imgContent .dropDown span {
  color: var(--darkTheme);
  margin: 0px 12px 0px 0px;
}

/* 动画 */
@keyframes spreadTriangle {
  from {
    opacity: 0;
    transform: translateY(100px);
  }
  to {
    opacity: 0.3;
  }
}

@keyframes spreadSettings {
  from {
    opacity: 0;
    transform: translateY(100px);
  }
  to {
    opacity: 1;
  }
}

.triangle-enter-active {
  animation: spreadTriangle 0.4s;
}

.triangle-leave-active {
  animation: spreadTriangle 0.4s reverse;
}

.settings-enter-active {
  animation: spreadSettings 0.4s;
}

.settings-leave-active {
  animation: spreadSettings 0.4s reverse;
}
</style>