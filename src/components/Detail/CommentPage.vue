<template>
  <div class="commentPage">
    <!-- 发布评论部分 -->
    <div class="publishComment">
      <!-- 评分部分 -->
      <div class="score">
        <el-rate v-model="score"></el-rate>
        <h1>我的评分</h1>
      </div>

      <!-- 输入评论部分 -->
      <div class="comment">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入评论"
          v-model="comment"
        >
        </el-input>
        <el-button v-loading="publishCommentLoading" @click="publishComment()"
          >发表评论</el-button
        >
      </div>
    </div>

    <!-- 评论展示部分 -->
    <div
      class="commentList"
      v-for="comment in commentList"
      :key="comment.id"
      v-show="commentList.length"
    >
      <!-- 左侧头像 -->
      <div class="left">
        <img :src="comment.user.avatar" />
      </div>

      <!-- 右侧评论详情 -->
      <div class="right">
        <!-- 评论者ID+评论时间 -->
        <div class="top">
          <div>
            <h1>{{ comment.user.username }}</h1>
            <el-rate disabled v-model="comment.score"></el-rate>
          </div>

          <span>{{ comment.createTime.replace("T", " ") }}</span>
        </div>
        <!-- 评论具体内容 -->
        <div class="center">
          <!-- <span v-html="commendContent(comment.comment)"></span> -->
          <span v-html="computedText(comment.comment)"></span>
          <!-- {{comment.comment}} -->
        </div>
        <!-- 评论点赞数+回复 -->
        <div class="bottom" @click="changeUnfold(comment.id)">
          <span>回复</span>
        </div>

        <div class="replyInput" v-show="comment.user.password">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入回复"
            v-model="reply"
          >
          </el-input>
          <el-button v-loading="replyLoading" @click="insertReply(comment.id)"
            >回复</el-button
          >
        </div>

        <div class="reply" v-for="reply in comment.children" :key="reply.id">
          <!-- 回复者id+回复时间 -->
          <div class="replyTop">
            <h1>{{ reply.user.username }}：</h1>
            <span>{{ reply.createTime.replace("T", " ") }}</span>
          </div>
          <!-- 评论回复内容 -->
          <div class="replyCenter">
            {{ reply.comment }}
          </div>
        </div>
      </div>
    </div>

    <div class="noComment" v-show="!commentList.length">
      <span>暂无更多评论</span>
    </div>
  </div>
</template>

<script>
import { selectCommentByCondition, insertComment } from "@/api/comment";
import { getUserId } from "@/utils/auth";

export default {
  name: "CommentPage",

  props: ["params"],

  data() {
    return {
      commentList: [],
      // 发布评论按钮是否加载
      publishCommentLoading: false,
      replyLoading: false,
      comment: "",
      reply: "",
      score: 5,
    };
  },

  mounted() {
    // console.log(this.params);
    this.getComment();
  },

  methods: {
    // 打开折叠回复区域
    changeUnfold(id) {
      this.commentList.forEach((comment) => {
        if (comment.id === id) {
          comment.user.password = !comment.user.password;
        } else {
          comment.user.password = false;
        }
      });
    },
    // 获取评论信息
    getComment() {
      selectCommentByCondition(this.params)
        .then((res) => {
          if (res.code === 1) {
            this.commentList = res.data.rows;
            // console.log(this.commentList);
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 发布评论
    publishComment() {
      if (this.comment.trim() == "") {
        this.$message.info("请输入评论内容！");
      } else {
        let comment = {
          userId: getUserId(),
          itemId: this.params.itemId,
          type: this.params.type,
          parentId: 0,
          comment: this.comment,
          score: this.score,
        };

        this.publishCommentLoading = true;
        insertComment(comment)
          .then((res) => {
            if (res.code === 1) {
              this.comment = "";
              // 更新评论区
              this.getComment();
              this.$message.success("评论添加成功");
              this.publishCommentLoading = false;
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    // 添加回复
    insertReply(parentId) {
      if (this.reply.trim() == "") {
        this.$message.info("请输入回复内容！");
      } else {
        let reply = {
          userId: getUserId(),
          itemId: this.params.itemId,
          type: this.params.type,
          parentId: parentId,
          comment: this.reply,
          score: 5,
        };

        this.replyLoading = true;

        insertComment(reply)
          .then((res) => {
            if (res.code === 1) {
              this.reply = "";
              // 更新评论区
              this.getComment();
              this.$message.success("评论回复成功");
              this.replyLoading = false;
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>

<style scoped>
.commentPage {
  display: flex;
  flex-direction: column;
  width: 100% !important;
  /* border:1px solid red; */
}

.publishComment {
  /* border:1px solid red; */
  display: flex;
}

.publishComment .score {
  /* border: 1px solid red; */
  width: 160px;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  padding-top: 10px;
  align-items: center;
}

.publishComment .score h1 {
  margin-top: 10px;
  /* color: red; */
  color: var(--primaryColor);
  font-size: 16px;
  font-weight: bold;
}

.publishComment .comment,
.replyInput {
  display: flex;
  flex-direction: column;
  align-items: end;

  width: 700px;
  /* border: 1px solid red; */
}

.publishComment .comment >>> .el-textarea__inner:focus,
.commentList .right .replyInput >>> .el-textarea__inner:focus {
  border-color: var(--primaryColor) !important;
  border-radius: 4px;
}

.noComment {
  display: flex;
  justify-content: center;
  align-items: center;
  /* border:1px solid red; */
  border-top: 1px solid var(--lightTheme);
}

.noComment span {
  padding: 8px;
}

.publishComment .comment >>> .el-button,
.commentList .right .replyInput >>> .el-button {
  border-radius: 4px;
  font-size: 14px;
  width: 120px;
  padding: 10px;
  text-align: center;
  font-weight: bold;
  color: #fff;
  position: relative;
  border: none;
  background: var(--primaryColor);
  margin: 10px 0px;
}

.publishComment .comment >>> .el-button:before,
.commentList .right .replyInput >>> .el-button:before {
  content: "";
  position: absolute;
  background: linear-gradient(
    to left,
    rgba(255, 255, 255, 0) 50%,
    rgba(255, 255, 255, 0.6) 50%
  );
  background-size: 210% 100%;
  border-radius: 4px;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
  transition: all 0.4s;
  background-position: right bottom;
}

.publishComment .comment >>> .el-button:hover::before,
.commentList .right .replyInput >>> .el-button:hover::before {
  background-position: left bottom;
}

/* ********************************************** */
.commentList {
  /* border:1px solid green; */
  display: flex;
  padding: 10px 0px;
  border-top: 1px solid var(--lightTheme);
}

.commentList .left {
  margin-right: 10px;
}

.commentList .left img {
  width: 45px;
  height: 45px;
  border-radius: 45px;
}

.commentList .right {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.commentList .right .top,
.reply .replyTop {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.commentList .right .top h1,
.commentList .right .top span,
.reply .replyTop h1,
.reply .replyTop span {
  color: var(--primaryColor);
  font-size: 14px;
}

.commentList .right .center,
.reply .replyCenter {
  /* 首行缩进2字符 */
  text-indent: 2em;
  margin: 10px 0px;
}

.commentList .right .bottom {
  display: flex;
  justify-content: end;
  color: var(--primaryColor);
  padding-bottom: 5px;
}
.commentList .right .bottom:hover {
  color: rgb(221, 0, 0);
}

.commentList .right .replyInput {
  /* border: 1px solid red; */
  width: 100%;
  padding: 10px 0px;
}

.commentList .right .reply {
  border-top: 1px solid var(--lightTheme);
  padding: 10px 0px;
}
</style>