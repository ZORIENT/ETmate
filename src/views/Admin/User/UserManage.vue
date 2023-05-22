<template>
  <div>
    用户管理页面
    <button @click="login">登录</button>
    <button @click="test">测试</button>
  </div>
</template>

<script>
import { selectById } from "@/api/film"

export default {
  name: "UserManage",

  data () {
    return {};
  },

  mounted () { },

  methods: {
    login () {
      this.$store.dispatch("login", { email: "1957193956@qq.com", password: "123456789" });
    },

    test () {
      selectById(1).then(res => {
        console.log("film:", res);
      })
    }


  },
};
</script>

<style  scoped>
</style>