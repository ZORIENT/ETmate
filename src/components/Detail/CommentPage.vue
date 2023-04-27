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
        <el-button>发表评论</el-button>
      </div>
    </div>

    <!-- 评论展示部分 -->
    <div class="commentList" v-for="comment in commentList" :key="comment.id">
      <!-- 左侧头像 -->
      <div class="left">
        <img :src="comment.avatarUrl"/>
      </div>

      <!-- 右侧评论详情 -->
      <div class="right">
        <!-- 评论者ID+评论时间 -->
        <div class="top">
          <h1>{{comment.username}}</h1>
          <span>{{ comment.date }}</span>
        </div>
        <!-- 评论具体内容 -->
        <div class="center">
          {{comment.comment}}
        </div>
        <!-- 评论点赞数+回复 -->
        <div class="bottom" @click="changeUnfold(comment.id)">
          <span>回复</span>
        </div>

        <div class="replyInput" v-show="comment.isUnfold">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入回复"
            v-model="reply"
          >
          </el-input>
          <el-button>回复</el-button>
        </div>

        <div class="reply" v-for="reply in comment.replys" :key="reply.id">
          <!-- 回复者id+回复时间 -->
          <div class="replyTop">
            <h1>{{reply.username}}：</h1>
            <span>{{reply.date}}</span>
          </div>
          <!-- 评论回复内容 -->
          <div class="replyCenter">
            {{reply.replyInfo}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommentPage",

  data() {
    return {
        // 回复表单是否展开
        commentList:[
            {

                // 回复框是否展开
                isUnfold:false,
                // 评论的id
                id:12,
                // 头像url
                avatarUrl:"https://picx.zhimg.com/80/v2-859a4648d9574185aa171074934a6f13_720w.webp?source=1940ef5c",
                // 评论者昵称
                username:"暴走d姜撞奶",
                // 评论时间
                date:"10月15日 23:10",
                // 评论内容
                comment:"一个普通的森林夜晚，对小熊大、小熊二宠爱有加的熊妈妈，在一场大火后离开了他们，两熊伤心不已……转眼多年过去，光头强带熊大熊二前往振兴岛参观机器人研究所，却意外得到了熊妈妈的线索，为此熊大、熊二一路探寻……熊妈当年为何不告而别？两熊最终是否能找到妈妈？迷雾重重的背后还有怎样的故事？一切谜团等待揭晓。",
                // 评论回复数组
                replys:[
                    {
                        id:1,
                        username:"回复者1",
                        date:"12月15日 12:10",
                        replyInfo:"回复内容"
                    },
                    {
                        id:2,
                        username:"回复者2",
                        date:"12月16日 12:10",
                        replyInfo:"一个普通的森林夜晚，对小熊大、小熊二宠爱有加的熊妈妈，在一场大火后离开了他们，两熊伤心不已……转眼多年过去，光头强带熊大熊二前往振兴岛参观机器人研究所，却意外得到了熊妈妈的线索，为此熊大、熊二一路探寻……熊妈当年为何不告而别？两熊最终是否能找到妈妈？迷雾重重的背后还有怎样的故事？一切谜团等待揭晓。"
                    }
                ]
            },
            {
                // 回复框是否展开
                isUnfold:false,
                // 评论的id
                id:28,
                // 头像url
                avatarUrl:"https://picx.zhimg.com/80/v2-859a4648d9574185aa171074934a6f13_720w.webp?source=1940ef5c",
                // 评论者昵称
                username:"暴走d姜撞奶",
                // 评论时间
                date:"10月15日 23:10",
                // 评论内容
                comment:"一个普通的森林夜晚，对小熊大、小熊二宠爱有加的熊妈妈，在一场大火后离开了他们，两熊伤心不已……转眼多年过去，光头强带熊大熊二前往振兴岛参观机器人研究所，却意外得到了熊妈妈的线索，为此熊大、熊二一路探寻……熊妈当年为何不告而别？两熊最终是否能找到妈妈？迷雾重重的背后还有怎样的故事？一切谜团等待揭晓。",
                // 评论回复数组
                replys:[
                    {
                        id:1,
                        username:"回复者1",
                        date:"12月15日 12:10",
                        replyInfo:"回复内容"
                    },
                    {
                        id:2,
                        username:"回复者2",
                        date:"12月16日 12:10",
                        replyInfo:"一个普通的森林夜晚，对小熊大、小熊二宠爱有加的熊妈妈，在一场大火后离开了他们，两熊伤心不已……转眼多年过去，光头强带熊大熊二前往振兴岛参观机器人研究所，却意外得到了熊妈妈的线索，为此熊大、熊二一路探寻……熊妈当年为何不告而别？两熊最终是否能找到妈妈？迷雾重重的背后还有怎样的故事？一切谜团等待揭晓。"
                    }
                ]
            }
        ],

      // comment
      comment: "",
      reply:"",
      score: 5,
    };
  },

  mounted() {},

  methods: {
    changeUnfold(id){

        this.commentList.forEach((comment)=>{
            if(comment.id===id){
                comment.isUnfold=!comment.isUnfold;
            }else{
                comment.isUnfold=false;
            }
        })
    }
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

.publishComment .comment,.replyInput {
  display: flex;
  flex-direction: column;
  align-items: end;

  width: 700px;
  /* border: 1px solid red; */
}

.publishComment .comment >>> .el-textarea__inner:focus,
.commentList .right .replyInput>>>.el-textarea__inner:focus{
  border-color: var(--primaryColor) !important;
  border-radius: 4px;
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
.commentList .right .replyInput >>>.el-button:hover::before {
  background-position: left bottom;
}

/* ********************************************** */
.commentList {
  /* border:1px solid green; */
  display: flex;
  padding: 10px 0px;
  border-top: 1px solid var(--lightTheme);
}

.commentList .left{
    margin-right: 10px;
}

.commentList .left img{
    width: 45px;
    height: 45px;
    border-radius: 45px;
}

.commentList .right{
    display: flex;
    flex-direction: column;
    width: 100%;
}

.commentList .right .top,
.reply .replyTop{
    display: flex;
    justify-content: space-between;
}

.commentList .right .top h1,
.commentList .right .top span,
.reply .replyTop h1,
.reply .replyTop span{
    color:var(--primaryColor);
    font-size: 14px;
}

.commentList .right .center,
.reply .replyCenter{
    /* 首行缩进2字符 */
  text-indent: 2em;
  margin:10px 0px;
}

.commentList .right .bottom{
    display: flex;
    justify-content: end;
    color: var(--primaryColor);
    padding-bottom: 5px;
}
.commentList .right .bottom:hover{
    color:rgb(221, 0, 0);
}

.commentList .right .replyInput{
    /* border: 1px solid red; */
    width: 100%;
    padding: 10px 0px;
}

.commentList .right .reply{
    border-top: 1px solid var(--lightTheme);
    padding: 10px 0px;
}

</style>