<template>
  <div class="bulletinList">
    <!-- 系统通知 -->
    <div class="title">
      <h1>系统通知</h1>
    </div>

    <!-- 分类导航按钮 -->
    <div class="navs">
      <ul>
        <li v-for="nav in navs"
            :key="nav.id"
            @click="changeNav(nav.id)">
          <span :class="activedNav === nav.id ? 'activedNav' : ''">
            {{ nav.name }}
          </span>
        </li>
      </ul>
    </div>

    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "BulletinList",

  data () {
    return {
      navs: [
        { id: 0, name: "系统通知", path: "SystemBulletin" },
        { id: 1, name: "回复我的", path: "ReplyInfo" },
      ],

      // 当前活动按钮
      activedNav: 0,
    };
  },

  mounted () { },

  methods: {
    // 切换活动按钮
    changeNav (id) {
      this.activedNav = id;

      this.$router.push({ name: this.navs[id].path });

      // console.log(this.activedNav);
    },
  },
};
</script>

<style  scoped>
.bulletinList {
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  width: calc(var(--width) * 1px);
}

.title h1 {
  font-size: 16px;
  font-weight: bold;
  padding: 10px 0px;
  color: var(--primaryColor);
  /* border: 1px solid green; */
  border-bottom: 1px solid var(--lightTheme);
}

/* *********************************************************************** */
.navs {
  /* border: 1px solid green; */
  padding: 10px 0px;
}

.navs ul {
  display: flex;
  margin: 10px 0px;
}

.navs ul li span {
  border: 1px solid var(--primaryColor);
  padding: 5px 20px;
  color: var(--primaryColor);
  transition: all 0.4s;
  /* border-radius: 4px; */
}

.activedNav {
  background: var(--primaryColor);
  color: #fff !important;
}

/* *********************************************** */
.content {
  /* border: 1px solid red; */
  height: 100%;
}
</style>