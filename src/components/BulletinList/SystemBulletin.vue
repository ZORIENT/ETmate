<template>
  <div class="systemBulletin">
    <div class="bulletin"
         v-for="(bulletin, index) in bulletinList"
         :key="index">
      <!-- 公告标题 -->
      <div class="title">
        <h1>{{ bulletin.title }}</h1>
      </div>

      <!-- 发布公告的管理员信息 -->
      <div class="headline">
        <div class="avatar">
          <img :src="bulletin.avatar" />
        </div>

        <div class="author">
          <div class="username">{{ bulletin.username }}<span class="tag">管理员</span></div>
          <div class="email">{{ bulletin.email }}</div>
        </div>

        <div class="time">{{ bulletin.updateTime?bulletin.updateTime.replace('T',' '):'' }}</div>
      </div>

      <div class="content">
        <p><span v-html="computedText(bulletin.content)"></span></p>
        <div class="image"
             v-show="bulletin.image">
          <img :src="bulletin.image" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { selectAllBulletin } from "@/api/bulletin";

export default {
  name: "SystemBulletin",

  data () {
    return {
      bulletinList: [],
    };
  },

  methods: {
    selectAllBulletin () {
      selectAllBulletin({ page: 1, pageSize: 10 })
        .then((res) => {
          if (res.code === 1) {
            // console.log(res.data);
            this.bulletinList = res.data.rows;

          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  mounted () {
    this.selectAllBulletin();
  },
};
</script>

<style scoped>
.systemBulletin {
  display: flex;
  flex-direction: column;
  width: calc(var(--width) * 1px);
  align-items: center;
}

/* ******************************************************** */
.bulletin {
  /* border: 1px solid red; */
  background-color: var(--lightTheme);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin-bottom: 20px;
  width: 600px;
}

/* ******************************************************** */

.title {
}

.title h1 {
  font-size: 20px;
  font-weight: bold;
  color: var(--primaryColor);
}

/* ******************************************************** */
.headline {
  display: flex;
  line-height: 24px;
  position: relative;
  margin-top: 20px;
}
.headline .avatar {
}

.headline .avatar img {
  height: 48px;
  width: 48px;
  border-radius: 100%;
}

.headline .author {
  display: flex;
  flex-direction: column;
  padding-left: 20px;
}

.headline .author .tag {
  background-color: var(--primaryColor);
  color: var(--lightTheme);
  font-weight: bold;
  padding: 4px 8px;
  border-radius: 4px;
  margin-left: 10px;
}

.headline .time {
  position: absolute;
  right: 0px;
}

/* ******************************************************** */

.content {
  display: flex;
  flex-direction: column;
}

.content p {
  text-indent: 2em;
  /* border: 1px solid red; */
  margin-top: 20px;
  line-height: 24px;
}

.content .image {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  /* display: none; */
}
.content .image img {
  width: 500px;
  border-radius: 4px;
}
</style>