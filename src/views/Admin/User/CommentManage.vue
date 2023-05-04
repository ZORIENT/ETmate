<template>
  <div class="CommentManage">
    <!-- 条件筛选区域 -->
    <div class="filters">
      <el-form label-position="left" :model="searchComment">
        <el-form-item label="用户名">
          <el-input
            v-model="searchComment.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="类别">
          <el-select v-model="searchComment.type" placeholder="请选择">
            <el-option label="电影" value="1"></el-option>
            <el-option label="游戏" value="2"></el-option>
            <el-option label="书籍" value="3"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="来源">
          <el-input
            v-model="searchComment.name"
            placeholder="电影/游戏/书籍名"
          ></el-input>
        </el-form-item>

        <el-form-item label="评论时间">
          <el-date-picker
            v-model="commentDate"
            clearable
            value-format="yyyy-MM-dd"
            type="daterange"
            placeholder="选择日期"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="info" @click="clear">清空</el-button>
          <el-button type="danger" :disabled="!multipleSelection.length">批量删除</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 内容展示区域 -->
    <div class="table">
      <el-table
        border
        height="500"
        :data="commentData"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="40"></el-table-column>

        <el-table-column prop="type" label="类型" width="80"></el-table-column>

        <el-table-column prop="name" label="来源" width="200">
          <template slot-scope="scope">
            <img :src="scope.row.img" style="width: 50px" />
            <span>《{{ scope.row.name }}》</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="username"
          label="用户"
          width="150"
        ></el-table-column>

        <el-table-column prop="comment" label="评论内容"> </el-table-column>

        <el-table-column
          prop="releaseTime"
          label="发布时间"
          width="160"
        ></el-table-column>

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

      <el-dialog title="修改评论" :visible.sync="dialogFormVisible">
        <el-form :model="commentDialog">
          <el-form-item label="评论" :label-width="formLabelWidth">
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
          <el-button type="primary" @click="dialogFormVisible = false"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </div>

    <!-- 底部分页 -->
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="pagination.total"
        @current-change="currentPageChanged"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommentManage",

  data() {
    return {
      // 分页条相关数据
      pagination: {
        total: 200,
        currentPage: 1,
      },

      //   评论修改相关数据
      commentDialog: {
        type: "",
        name: "",
        comment: "",
        data: "",
        img: "",
      },

      //   评论的数据
      commentData: [
        {
          type: "电影",
          name: "疾速追杀",
          username: "暴走d姜撞奶",
          comment:
            "这里是一条评论大卡卡的微辣这里是一条评论大卡卡的微辣这里是一条评论大卡卡的微辣这里是一条评论大卡卡的微辣这里是一条评论大卡卡的微辣这里是一条评论大卡卡的微辣这里是一条评论大卡卡的微辣这里是一条评论大卡卡的微辣这里是一条评论大卡卡的微辣这里是一条评论大卡卡的微辣这里是一条评论大卡卡的微辣这里是一条评论大卡卡的微辣这里是一条评论大卡卡的微辣这里是一条评论大卡卡的微辣这里是一条评论大卡卡的微辣",
          data: "2023-10-25 10:15:20",
          img: "https://1b2a.net/img/tv/ZXXG.webp",
          releaseTime: "2023-05-01 12:15:24",
        },
        {
          type: "游戏",
          name: "GTA5",
          username: "暴走d姜撞奶",
          comment: "这里是一条评论",
          data: "2023-10-25 10:15:20",
          img: "https://1b2a.net/img/tv/67Xw.webp",
          releaseTime: "2023-05-01 12:15:24",
        },
        {
          type: "书籍",
          name: "假如给我三天光明",
          username: "暴走d姜撞奶",
          comment: "这里是一条评论",
          data: "2023-10-25 10:15:20",
          img: "https://1b2a.net/img/tv/ZXXG.webp",
          releaseTime: "2023-05-01 12:15:24",
        },
        {
          type: "电影",
          name: "复仇者联盟",
          comment: "这里是一条评论",
          username: "暴走d姜撞奶",
          data: "2023-10-25 10:15:20",
          img: "https://1b2a.net/img/tv/67Xw.webp",
          releaseTime: "2023-05-01 12:15:24",
        },
        {
          type: "电影",
          name: "龙与地下城",
          comment: "这里是一条评论",
          username: "暴走d姜撞奶",
          data: "2023-10-25 10:15:20",
          img: "https://1b2a.net/img/tv/67Xw.webp",
          releaseTime: "2023-05-01 12:15:24",
        },
        {
          type: "书籍",
          name: "假如给我三天光明",
          comment: "这里是一条评论",
          username: "暴走d姜撞奶",
          data: "2023-10-25 10:15:20",
          img: "https://1b2a.net/img/tv/ZXXG.webp",
          releaseTime: "2023-05-01 12:15:24",
        },
        {
          type: "电影",
          name: "复仇者联盟",
          comment: "这里是一条评论",
          username: "暴走d姜撞奶",
          data: "2023-10-25 10:15:20",
          img: "https://1b2a.net/img/tv/67Xw.webp",
          releaseTime: "2023-05-01 12:15:24",
        },
        {
          type: "电影",
          name: "龙与地下城",
          comment: "这里是一条评论",
          username: "暴走d姜撞奶",
          data: "2023-10-25 10:15:20",
          img: "https://1b2a.net/img/tv/67Xw.webp",
          releaseTime: "2023-05-01 12:15:24",
        },
      ],
      formLabelWidth: "50px",
      //   弹框表单是否显示
      dialogFormVisible: false,

      // 复选框选中数据集合
      multipleSelection: [],

      searchComment: {
        username: "",
        type: "",
        name:"",
      },

      beginTime: "",
      endTime: "",
      commentDate: [],
    };
  },

  mounted() {},

  methods: {
    handleClick(row) {
      // row是一个对象
      this.dialogFormVisible = !this.dialogFormVisible;
      this.commentDialog = row;
      console.log(row);
    },
    deleteComment(row) {
      this.commentData.splice(this.commentData.indexOf(row), 1);
      // console.log("删除成功",obj);
    },

    currentPageChanged(currentPage) {
      this.pagination.currentPage = currentPage;
      // console.log(this.pagination.currentPage);
    },
    // 复选框被选中之后执行的方法
    handleSelectionChange(val) {
      // console.log("选中了：",val);
      // val是一个对象数组，对象是每一条评论的具体信息
      this.multipleSelection = val;
      // console.log(this.multipleSelection.length)
    },

    // 查询方法
    onSubmit() {
      this.currentPage = 1;
      //   this.page();
      console.log(this.beginTime,this.endTime);
    },
    // 清除
    clear() {
      this.searchComment = {
        username: "",
        type: "",
      };

      (this.beginTime = ""), (this.endTime = "");
      this.commentDate = [];

      console.log("清除成功");
    },
  },

  watch: {
    commentDate(val) {
      console.log("@", val);
      if (val && val.length >= 2) {
        this.beginTime = val[0];
        this.endTime = val[1];
      } else {
        this.beginTime = "";
        this.endTime = "";
      }
    },
  },
};
</script>

<style scoped>
.CommentManage {
  /* border: 1px solid red; */
  /* background: red; */
  /* height: 100%; */
  display: flex;
  flex-direction: column;
  margin: 0px 20px;
}

/* ************************************************************************ */
.filters {
  /* border: 1px solid red; */
  margin: 10px 0px;
}

.filters .el-form{
    /* border: 1px solid green; */
    display: grid;
    grid-template-columns:repeat(4,25%);
    border-bottom: 1px solid var(--lightTheme);
}

.filters >>> .el-form .el-form-item__label{
    font-size: 14px;
}

.filters >>> .el-form .el-form-item{
    display: flex;
    margin:10px 0px;
}

.filters >>> .el-form .el-input__inner{
    width: 250px;
    /* height: 30px; */
    border-radius: 4px;
}

.filters >>> .el-form .el-range-separator{
  margin-right: 15px;
}

.filters >>> .el-form .el-form-item:last-child .el-form-item__content{
  display: flex;
  width: 100%;
}


/* ************************************************************************* */
.table {
  /* border: 1px solid red; */
  margin: 10px 0px;
}

.table >>> .el-table th.el-table__cell > .cell,
.table >>> .el-table .cell {
  text-align: center;
}

/* 表格第二列 */
.table >>> .el-table td:nth-child(3) div {
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
}

/* 表格第四列 */
.table >>> .el-table td:nth-child(5) div {
  text-align: left;
  /* border: 1px solid red; */
}

/* 表格第六列 */
.table >>> .el-table td:nth-child(7) div {
  text-align: center;
}

.table >>> .el-table td:nth-child(7) div button {
  color: var(--primaryColor);
}

.table >>> .el-table td:nth-child(7) div button:hover {
  opacity: 0.9;
}

.table >>> .el-table td:nth-child(7) div button:nth-child(2) {
  color: #dd0000;
}

.table >>> .el-table td:nth-child(7) div button:nth-child(2):hover {
  color: #dd0000;
  opacity: 0.9;
}

/* ***************************************************************** */
.CommentManage >>> .el-dialog {
  /* border: 1px solid red; */
  border-radius: 4px;
}

.CommentManage >>> .el-dialog__header span {
  color: var(--primaryColor);
  font-size: 16px;
  font-weight: bold;
}

.CommentManage >>> .el-dialog__headerbtn .el-dialog__close:hover {
  color: var(--primaryColor);
}

.CommentManage >>> .el-textarea__inner {
  border-color: var(--primaryColor);
}

.CommentManage >>> .el-dialog__footer div button {
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

.CommentManage >>> .el-dialog__footer div button::before {
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

.CommentManage >>> .el-dialog__footer div button:hover::before {
  background-position: left bottom;
}

/* *********************************************************************** */
.pagination {
  display: flex;
  flex-direction: column;
  /* justify-items: center; */
  align-items: center;
  margin: 10px 0px;
  color: var(--primaryColor) !important;
  /* border:1px solid orange; */
}

.pagination
  >>> .el-pagination.is-background
  .el-pager
  li:not(.disabled).active {
  /* color: var(--primaryColor); */
  /* color: red; */
  background: rgba(14, 85, 113, 0.95);
}

.pagination >>> .el-pager li:hover {
  color: var(--primaryColor) !important;
  /* color: red !important; */
}
</style>