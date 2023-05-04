<template>
  <div class="container">
    <div class="title">
      <h1>我的评论</h1>
    </div>

    <div class="table">
      <el-table border height="580" :data="commentData">
        <el-table-column
          prop="type"
          label="类型"
          width="80"
          :filters="[
            { text: '电影', value: '电影' },
            { text: '游戏', value: '游戏' },
            { text: '书籍', value: '书籍' },
          ]"
          :filter-method="filterTag"
        >
        </el-table-column>

        <el-table-column prop="name" label="来源" width="200">
          <template slot-scope="scope">
            <img :src="scope.row.img" style="width:50px;">
            <span>《{{ scope.row.name }}》</span>
          </template>
        </el-table-column>

        <el-table-column prop="comment" label="内容"></el-table-column>

        <el-table-column prop="releaseTime" label="发布时间" width="160"></el-table-column>

        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text">编辑</el-button>
            <el-button type="text" @click="deleteComment(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="修改评论" :visible.sync="dialogFormVisible">
        <el-form :model="commentDialog">
          <el-form-item label="评论" :label-width="formLabelWidth">
            <el-input v-model="commentDialog.comment" type="textarea"  autosize auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false" >确 定</el-button >
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserComments",

  data() {
    return {
      commentDialog:{
        type: "",
          name: "",
          comment: "",
          data: "",
          img:""
      },
      commentData: [
        {
          type: "电影",
          name: "疾速追杀",
          comment: "这里是一条评论大卡卡的微辣这里是一条评论大卡卡的微辣这里是一条评论大卡卡的微辣这里是一条评论大卡卡的微辣这里是一条评论大卡卡的微辣这里是一条评论大卡卡的微辣这里是一条评论大卡卡的微辣这里是一条评论大卡卡的微辣这里是一条评论大卡卡的微辣这里是一条评论大卡卡的微辣这里是一条评论大卡卡的微辣这里是一条评论大卡卡的微辣这里是一条评论大卡卡的微辣这里是一条评论大卡卡的微辣这里是一条评论大卡卡的微辣",
          data: "2023-10-25 10:15:20",
          img:"https://1b2a.net/img/tv/ZXXG.webp",
          releaseTime:"2023-05-01 12:15:24"
        },
        {
          type: "游戏",
          name: "GTA5",
          comment: "这里是一条评论",
          data: "2023-10-25 10:15:20",
          img:"https://1b2a.net/img/tv/67Xw.webp",
          releaseTime:"2023-05-01 12:15:24"
        },
        {
          type: "书籍",
          name: "假如给我三天光明",
          comment: "这里是一条评论",
          data: "2023-10-25 10:15:20",
          img:"https://1b2a.net/img/tv/ZXXG.webp",
          releaseTime:"2023-05-01 12:15:24"
        },
        {
          type: "电影",
          name: "复仇者联盟",
          comment: "这里是一条评论",
          data: "2023-10-25 10:15:20",
          img:"https://1b2a.net/img/tv/67Xw.webp",
          releaseTime:"2023-05-01 12:15:24"
        },
        {
          type: "电影",
          name: "龙与地下城",
          comment: "这里是一条评论",
          data: "2023-10-25 10:15:20",
          img:"https://1b2a.net/img/tv/67Xw.webp",
          releaseTime:"2023-05-01 12:15:24"
        },
        {
          type: "书籍",
          name: "假如给我三天光明",
          comment: "这里是一条评论",
          data: "2023-10-25 10:15:20",
          img:"https://1b2a.net/img/tv/ZXXG.webp",
          releaseTime:"2023-05-01 12:15:24"
        },
        {
          type: "电影",
          name: "复仇者联盟",
          comment: "这里是一条评论",
          data: "2023-10-25 10:15:20",
          img:"https://1b2a.net/img/tv/67Xw.webp",
          releaseTime:"2023-05-01 12:15:24"
        },
        {
          type: "电影",
          name: "龙与地下城",
          comment: "这里是一条评论",
          data: "2023-10-25 10:15:20",
          img:"https://1b2a.net/img/tv/67Xw.webp",
          releaseTime:"2023-05-01 12:15:24"
        },
      ],
      formLabelWidth: "50px",
      dialogFormVisible: false,
    };
  },

  mounted() {},

  methods: {
    handleClick(row) {
      // row是一个对象
      this.dialogFormVisible = !this.dialogFormVisible;
      this.commentDialog=row;
      console.log(row);
    },
    deleteComment(row){
      this.commentData.splice(this.commentData.indexOf(row),1);
      // console.log("删除成功",obj);
    },
    filterTag(value, row) {
      // console.log("value",value);
      // console.log("row",row);

      return row.type === value;
    },

  },
};
</script>

<style scoped>
.container {
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
/* ***************************************************************** */

.table {
  /* border: 1px solid red; */
  margin: 10px 0px;
}

.table>>>  .el-table th.el-table__cell>.cell,
.table >>> .el-table .cell{
  text-align: center;
}

.table >>> .el-table th.el-table__cell>.cell.highlight{
  color: var(--primaryColor) !important;
}


/* 表格第二列 */
.table >>> .el-table td:nth-child(2) div{
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
}


/* 表格第三列 */
.table >>> .el-table td:nth-child(3) div{
  text-align: left;
  /* border: 1px solid red; */
}

/* 表格第四列 */
.table >>> .el-table td:nth-child(5) div{
  text-align: center;
}

.table >>> .el-table td:nth-child(5) div button{
  color: var(--primaryColor);
}

.table >>> .el-table td:nth-child(5) div button:hover{
  opacity: 0.9;
}

.table >>> .el-table td:nth-child(5) div button:nth-child(2){
  color: #dd0000;
}

.table >>> .el-table td:nth-child(5) div button:nth-child(2):hover{
  color: #dd0000;
  opacity: 0.9;
}

/* ***************************************************************** */
.container >>> .el-dialog{
  /* border: 1px solid red; */
  border-radius: 4px;
}

.container >>> .el-dialog__header span{
  color: var(--primaryColor);
  font-size: 16px;
  font-weight: bold;
}

.container >>> .el-dialog__headerbtn .el-dialog__close:hover{
  color: var(--primaryColor);
}

.container >>> .el-textarea__inner{
  border-color: var(--primaryColor);
}

.container >>> .el-dialog__footer div button{
  width: 100px;
  padding: 10px;
  background: var(--primaryColor);
  border: none;
  border-radius: 4px;
  font-size: 14px;
  color: var(--lightTheme);
  margin: 5px 0px 5px 10px;
  text-align: center;
  font-weight: bold;
  position: relative;
}

.container >>> .el-dialog__footer div button::before{
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

.container >>> .el-dialog__footer div button:hover::before{
  background-position: left bottom;
}
</style>