<template>
  <div class="container">
    <div class="title">
      <h1>我的回复</h1>
    </div>

    <div class="table">
      <el-table border :height="hieght" :data="replyData">
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

        <el-table-column prop="film" label="来源" width="200">
          <template slot-scope="scope">
            <div v-show="scope.row.type === '电影'">
              <img :src="scope.row.film.cover" style="width: 50px" />
              <span>《{{ scope.row.film.filmName }}》</span>
            </div>

            <div v-show="scope.row.type === '游戏'">
              <img :src="scope.row.film.cover" style="width: 50px" />
              <span>《{{ scope.row.film.gameName }}》</span>
            </div>

            <div v-show="scope.row.type === '书籍'">
              <img :src="scope.row.film.cover" style="width: 50px" />
              <span>《{{ scope.row.film.bookName }}》</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="comment" label="回复内容">
          <template slot-scope="scope">
            <span v-html="computedText(scope.row.comment) "></span>
          </template>
        </el-table-column>

        <el-table-column prop="releaseTime" label="发布时间" width="160">
          <template slot-scope="scope">
            {{
              scope.row.createTime ? scope.row.createTime.replace("T", " ") : ""
            }}
          </template>
        </el-table-column>

        <el-table-column prop="updateTime" label="修改时间" width="160">
          <template slot-scope="scope">
            {{
              scope.row.updateTime ? scope.row.updateTime.replace("T", " ") : ""
            }}
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text"
              >编辑</el-button
            >
            <el-button type="text" @click="deleteComment(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="修改回复" :visible.sync="dialogFormVisible">
        <el-form :model="commentDialog" v-loading="loading">
          <el-form-item label="回复" :label-width="formLabelWidth">
            <el-input
              v-model="commentDialog.comment"
              type="textarea"
              autosize
              auto-complete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateComment()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
  
  <script>
import { updateComment, deleteById } from "@/api/comment";
import { getUserId } from "@/utils/auth";
import { getReply } from "@/api/reply";

export default {
  name: "UserReplys",

  data() {
    return {
      commentDialog: {
        id: "",
        comment: "",
      },

      // 电影评论信息
      filmReplys: [],
      // 游戏评论信息
      gameReplys: [],
      // 书籍评论信息
      bookReplys: [],

      // 评论修改是否显示
      dialogFormVisible: false,
      formLabelWidth: "50px",
      hieght: 0,
      loading: false,
    };
  },

  mounted() {
    this.selectReply();
  },

  methods: {
    // 打开评论编辑框
    handleClick(row) {
      // row是一个对象
      this.dialogFormVisible = !this.dialogFormVisible;
      this.commentDialog.id = row.id;
      this.commentDialog.comment = row.comment;
    },

    // 删除评论
    deleteComment(row) {
      this.$confirm("是否删除该回复？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 确定的回调
          deleteById(row.id)
            .then((res) => {
              if (res.code === 1) {
                this.selectReply();
                this.$message.success("评论回复删除成功！");
              } else {
                this.$message.error(res.msg);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch(() => {
          // 取消的回调
          this.$message.info("已取消删除");
        });
    },

    // 提交编辑评论
    updateComment() {
      this.loading = true;

      updateComment(this.commentDialog)
        .then((res) => {
          if (res.code === 1) {
            // console.log(res);
            this.selectReply();
            this.loading = false;
            this.$message.success("回复修改成功！");
            this.dialogFormVisible = false;
          } else {
            this.$message.error(res.msg);
            this.dialogFormVisible = false;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 筛选电影，游戏，书籍
    filterTag(value, row) {
      return row.type === value;
    },

    // 查询当前用户的所有评论信息
    selectReply() {
      getReply(getUserId())
        .then((res) => {
          if (res.code === 1) {
            this.filmReplys = res.data.filmReply;
            this.filmReplys.forEach((film) => {
              film.type = "电影";
            });
            this.gameReplys = res.data.gameReply;
            this.gameReplys.forEach((game) => {
              game.type = "游戏";
              game.film = game.game;
            });
            this.bookReplys = res.data.bookReply;
            this.bookReplys.forEach((book) => {
              book.type = "书籍";
              book.film = book.book;
            });
            this.hieght = 580;
          } else {
            this.$message.error(res.msg);
          }
          //   console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  computed: {
    replyData() {
      // console.log(this.filmReplys.concat(this.gameReplys.concat(this.bookReplys)));
      return this.filmReplys.concat(this.gameReplys.concat(this.bookReplys));
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
  margin-top: 20px;
}

.table >>> .el-table th.el-table__cell > .cell,
.table >>> .el-table .cell {
  text-align: center;
}

.table >>> .el-table th.el-table__cell > .cell.highlight {
  color: var(--primaryColor) !important;
}

/* 表格第二列 */
.table >>> .el-table td:nth-child(2) div {
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
}

/* 表格第三列 */
.table >>> .el-table td:nth-child(3) div {
  text-align: left;
  text-indent: 2em;
  /* border: 1px solid red; */
}

/* 表格第四列 */
.table >>> .el-table td:nth-child(6) div {
  text-align: center;
}

.table >>> .el-table td:nth-child(6) div button {
  color: var(--primaryColor);
}

.table >>> .el-table td:nth-child(6) div button:hover {
  opacity: 0.9;
}

.table >>> .el-table td:nth-child(6) div button:nth-child(2) {
  color: #dd0000;
}

.table >>> .el-table td:nth-child(6) div button:nth-child(2):hover {
  color: #dd0000;
  opacity: 0.9;
}

/* ***************************************************************** */
.container >>> .el-dialog {
  /* border: 1px solid red; */
  border-radius: 4px;
}

.container >>> .el-dialog__header span {
  color: var(--primaryColor);
  font-size: 16px;
  font-weight: bold;
}

.container >>> .el-form-item__content {
  height: 40px;
  display: flex;
  align-items: center;
}

.container >>> .el-dialog__headerbtn .el-dialog__close:hover {
  color: var(--primaryColor);
}

.container >>> .el-textarea__inner {
  border-color: var(--primaryColor);
}

.container >>> .el-dialog__footer div button {
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

.container >>> .el-dialog__footer div button::before {
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

.container >>> .el-dialog__footer div button:hover::before {
  background-position: left bottom;
}
</style>