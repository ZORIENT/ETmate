<template>
  <div class="replyInfo">
    <div class="replys" v-for="(reply, index) in replyList.slice(0,20)" :key="index">
      <div class="header">
        <img
          :src="reply.avatar"
        />
        <div class="username">
          <p>{{reply.username}}</p>
          回复了你在<span>《{{reply.itemName}}》</span>中的评论
        </div>
      </div>

      <div class="content">
        <p class="reply"><span>{{ reply.username }}</span>：<span v-html="computedText(reply.reply)"></span></p>
        <p class="comment">“<span v-html="computedText(reply.comment)"></span>”</p>
      </div>

      <div class="bottom">{{ reply.updateTime?reply.updateTime.replace('T',' '):'' }}</div>
    </div>
  </div>
</template>

<script>
import {replyToMine} from "@/api/reply"
import {getUserId} from "@/utils/auth"

export default {
  name: "ReplyInfo",

  data() {
    return {
      // 评论回复的数据
      replyList:[],
    };
  },

  mounted() {
    this.replyToMine();
  },

  methods: {
    replyToMine(){
      replyToMine(getUserId()).then(res=>{
        if(res.code===1){
          // console.log(res.data);
          this.replyList=res.data;
        }else{
          this.$message.error(res.msg);
        }
      }).catch(err=>{
        console.log(err);
      })

    }
  },
};
</script>

<style  scoped>
.replyInfo {
  display: flex;
  flex-direction: column;
  width: calc(var(--width) * 1px);
  align-items: center;
}
/* *********************************************** */
.replys {
  background-color: var(--lightTheme);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin-bottom: 20px;
  width: 600px;
}

/* *********************************************** */
.header {
  display: flex;
  line-height: 48px;
}

.header img {
  height: 48px;
  width: 48px;
  border-radius: 100%;
}

.header .username {
  display: flex;
  margin-left: 20px;
}

.header .username p,
.header .username span {
  color: var(--primaryColor);
  font-weight: bold;
}

/* *********************************************** */
.content {
  text-indent: 2em;
  /* border: 1px solid red; */
  margin-top: 16px;
  line-height: 24px;
}

.content .reply {
  color: black;
}

.content .comment {
  color: grey;
}

/* *********************************************** */
.bottom {
  margin-top: 16px;
}
</style>