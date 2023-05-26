<template>
  <div class="CommentManage">
    <!-- 条件筛选区 -->
    <div class="filters">
      <div class="input">
        <div class="item">
          <p>用户昵称：</p>
          <el-input v-model="conditionList.username"
                    prefix-icon="el-icon-user"
                    placeholder="请输入用户昵称"></el-input>
        </div>

        <div class="item">
          <p>来源：</p>
          <el-input v-model="conditionList.itemName"
                    prefix-icon="el-icon-notebook-2"
                    placeholder="电影书籍游戏名称">
          </el-input>
        </div>

        <div class="item">
          <p>类别：</p>
          <el-select v-model="conditionList.type"
                     placeholder="请选择排序方式">
            <el-option label="电影"
                       :value="1"></el-option>
            <el-option label="游戏"
                       :value="2"></el-option>
            <el-option label="书籍"
                       :value="3"></el-option>
          </el-select>
        </div>

        <div class="item timePicker">
          <p>评论时间：</p>
          <el-date-picker v-model="commentDate"
                          clearable
                          value-format="yyyy-MM-dd"
                          type="daterange"
                          placeholder="选择评论时间"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期">
          </el-date-picker>
        </div>

        <div class="item button">
          <el-button type="primary"
                     @click="query(1)">查询</el-button>
          <el-button type="info"
                     @click="clear()">清空</el-button>
          <el-button type="danger"
                     :disabled="!multipleSelection.length"
                     @click="deleteByIds()">批量删除</el-button>
        </div>
      </div>
    </div>

    <!-- 表单展示区 -->
    <div class="table">
      <el-table border
                :height="tableHeight"
                :data="tableData"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection"
                         width="40">
        </el-table-column>

        <el-table-column prop="type"
                         label="类型"
                         width="80">
        </el-table-column>

        <el-table-column label="来源"
                         width="150">
          <template slot-scope="scope">
            <div v-show="scope.row.type==='电影'">
              <img :src="scope.row.film.cover"
                   style="width: 50px" />
              <span>《{{ scope.row.film.filmName }}》</span>
            </div>

            <div v-show="scope.row.type==='游戏'">
              <img :src="scope.row.film.cover"
                   style="width: 50px" />
              <span>《{{ scope.row.film.gameName }}》</span>
            </div>

            <div v-show="scope.row.type==='书籍'">
              <img :src="scope.row.film.cover"
                   style="width: 50px" />
              <span>《{{ scope.row.film.bookName }}》</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="用户"
                         width="150">
          <template slot-scope="scope">
            {{scope.row.user.username}}
          </template>
        </el-table-column>

        <el-table-column prop="comment"
                         label="评论内容"
                         width="250">
        </el-table-column>

        <el-table-column prop="score"
                         label="评分"
                         width="150">
          <template slot-scope="scope">
            <el-rate v-model="scope.row.score"
                     disabled
                     show-score
                     text-color="#ff9900"
                     score-template="{value}">
            </el-rate>
          </template>
        </el-table-column>

        <el-table-column prop="createTime"
                         label="评论时间"
                         width="175">
          <template slot-scope="scope">
            {{ scope.row.createTime?scope.row.createTime.replace('T',' '):'' }}
          </template>
        </el-table-column>

        <el-table-column prop="updateTime"
                         label="最后修改时间"
                         width="175">
          <template slot-scope="scope">
            {{ scope.row.updateTime?scope.row.updateTime.replace('T',' '):'' }}
          </template>
        </el-table-column>

        <el-table-column fixed="right"
                         label="操作"
                         width="100">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)"
                       type="text">编辑</el-button>
            <el-button type="text"
                       @click="handlerDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 编辑区域 -->
      <el-dialog title="评论信息修改"
                 width="500px"
                 :close-on-click-modal="false"
                 :visible.sync="dialogFormVisible">
        <!-- 表单 -->
        <el-form :model="dialogData"
                 ref="dialogForm"
                 label-position="right"
                 label-width="80px">

          <el-form-item label="评分">
            <el-rate v-model="dialogData.score"
                     show-score
                     text-color="#ff9900"
                     score-template="{value}">
            </el-rate>
          </el-form-item>

          <el-form-item label="评论"
                        prop="comment"
                        :rules="[{required: true, message: '请输入评论内容！', trigger: 'blur'}]">
            <el-input v-model="dialogData.comment"
                      type="textarea"
                      :autosize="true"
                      placeholder="输入评论内容">
            </el-input>
          </el-form-item>

        </el-form>
        <!-- 底部footer -->
        <div slot="footer"
             class="dialog-footer">
          <el-button @click="dialogFormVisible = false;dialogLoading = false;">取 消</el-button>
          <el-button type="primary"
                     v-loading="dialogLoading"
                     @click="submit()">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <!-- 页码选择区 -->
    <div class="pagination">
      <el-pagination background
                     layout="prev, pager, next,jumper"
                     :total="pagination.total"
                     :page-size="10"
                     @current-change="currentPageChanged"
                     :current-page.sync="pagination.currentPage">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { deleteById, selectCommentByCondition, updateComment } from "@/api/comment"

export default {
  name: "CommentManage",

  data () {
    return {
      // 表单的高度
      tableHeight: 560,
      // 分页条相关数据
      pagination: {
        total: 1,
        currentPage: 1,
      },

      // 复选框选中数据集合
      multipleSelection: [],

      // 筛选条件
      conditionList: {
        username: "",
        itemName: "",
        begin: "",
        end: "",
        type: 1
      },

      //   电影信息数据
      tableData: [],

      // 弹框表单是否显示
      dialogFormVisible: false,

      // 弹出表单数据
      dialogData: {
        id: "",
        comment: "",
        score: "",
      },
      // 上传加载
      uploadLoading: false,
      dialogLoading: false,
      excelLoading: false,

      commentDate: [],
    };
  },

  mounted () {
    this.query(1);
  },

  methods: {
    // 修改页码
    currentPageChanged (currentPage) {
      this.pagination.currentPage = currentPage;
    },

    // 复选框被选中之后执行的方法
    handleSelectionChange (val) {
      this.multipleSelection = [];
      val.forEach(item => {
        this.multipleSelection.push(item.id);
      });
    },

    // 点击dialog的确定按钮
    submit () {
      this.$refs['dialogForm'].validate((valid) => {
        if (valid) {
          this.updateInfo();
        } else {
          console.log('Error submit!');
          return false;
        }
      });
    },

    // 点击编辑
    handleEdit (row) {
      this.dialogFormVisible = !this.dialogFormVisible;
      this.dialogData.id = row.id;
      this.dialogData.comment = row.comment;
      this.dialogData.score = row.score;
    },

    // 点击删除
    handlerDelete (row) {
      this.$confirm("是否删除所选信息？", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        // 成功的回调
        deleteById(row.id).then(res => {
          if (res.code === 1) {
            this.query(this.pagination.currentPage);
            this.$message.success("评论信息删除成功！");
          } else {
            this.$message.error(res.msg);
          }
        }).catch(err => {
          console.log(err);
        })

      }).catch(() => {
        // 取消的回调
        this.$message.info("已取消删除");
      });
    },

    // 查询评论信息
    query (page) {
      let params = {
        ...this.conditionList,
        page: 1,
        pageSize: 10,
      }
      params.page = page;

      selectCommentByCondition(params).then(res => {
        if (res.code === 1) {
          this.tableData = res.data.rows;
          this.pagination.total = res.data.total;
          this.pagination.currentPage = page;
          this.tableHeight = 560;

          switch (params.type) {
            case 1:
              this.tableData.forEach(item => {
                item.type = "电影";
              })
              break;
            case 2:
              this.tableData.forEach(item => {
                item.type = "游戏";
                item.film = item.game;
              })
              break;
            case 3:
              this.tableData.forEach(item => {
                item.type = "书籍";
                item.film = item.book;
              })
              break;
          }
          // console.log(this.tableData);

        } else {
          this.$message.error(res.msg);
        }
      }).catch(err => {
        console.log(err);
      });
    },

    // 清空选项
    clear () {
      let empty = {
        username: "",
        itemName: "",
        begin: "",
        end: "",
        type: 1
      };

      this.conditionList = empty;
      this.query(1);
    },

    // 批量删除电影
    deleteByIds () {
      this.$confirm("是否删除所选信息？", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        // 成功的回调
        deleteById(this.multipleSelection).then(res => {
          if (res.code === 1) {
            this.query(1);
            this.$message.success("所选评论批量删除成功！");
          } else {
            this.$message.error(res.msg);
          }
        }).catch(err => {
          console.log(err);
        })

      }).catch(() => {
        // 取消的回调
        this.$message.info("已取消批量删除");
      });
    },

    // 更新电影信息
    updateInfo () {
      this.dialogLoading = true;
      updateComment(this.dialogData).then(res => {
        if (res.code === 1) {
          this.query(this.pagination.currentPage);
          this.dialogLoading = false;
          this.$message.success("评论信息更新成功！");
          this.dialogFormVisible = false;
        } else {
          this.$message.error(res.msg);
          this.dialogFormVisible = false;
        }
      }).catch(err => {
        console.log(err);
      })
    },
  },

  watch: {
    pagination: {
      deep: true,
      handler () {
        this.query(this.pagination.currentPage);
      }
    },
    commentDate: {
      deep: true,
      handler (val) {
        if (val && val.length >= 2) {
          this.conditionList.begin = val[0];
          this.conditionList.end = val[1];
        } else {
          this.conditionList.begin = "";
          this.conditionList.end = "";
        }
      }
    },
  }
}
</script>

<style scoped>
.CommentManage {
  display: flex;
  flex-direction: column;
}

/* *************************************************** */
.filters {
  margin: 10px 0px;
  border-bottom: 1px solid var(--lightTheme);
}

.filters .input {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(5, 20%);
  grid-gap: 10px 0px;
  margin-bottom: 10px;
}

.filters .input .item {
  display: flex;
}

.filters .input .item:not(:nth-child(5)) {
  /* border: 1px solid red; */
  margin-right: 20px;
}

.filters .input .item .el-input,
.filters .input .item .el-select {
  width: 280px;
}

.filters .input .item p {
  width: 120px;
  line-height: 35px;
  text-align: center;
}

/* *************************************************** */
.filters .timePicker {
  display: flex;
  /* justify-content: space-between; */
  grid-column-start: 4;
  grid-column-end: 5;
  grid-row-start: 1;
  grid-row-end: 1;
  width: 350px;
}

.filters >>> .el-range-separator {
  width: 24px;
  line-height: 35px;
  height: 35px;
}

.filters .button {
  display: flex;
  /* justify-content: space-between; */
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 2;
  grid-row-end: 2;
}

.filters .input .item >>> .el-select .el-input .el-select__caret {
  display: none;
}
/* *************************************************** */

.table >>> .el-table th.el-table__cell > .cell,
.table >>> .el-table .cell {
  text-align: center;
}

/* 电影名称列 */
.table >>> .el-table td:nth-child(3) div {
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
}

.table >>> .el-table td:nth-child(5) div {
  text-align: left;
  text-indent: 2em;
  /* 限制文字显示行数 */
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
}

.table >>> .el-table td:last-child div button {
  color: var(--primaryColor);
}

.table >>> .el-table td:last-child div button:hover {
  opacity: 0.9;
}

.table >>> .el-table td:last-child div button:nth-child(2) {
  color: #dd0000;
}

.table >>> .el-table td:last-child div button:nth-child(2):hover {
  color: #dd0000;
  opacity: 0.9;
}

/* **************************************************** */
.CommentManage >>> .el-dialog {
  /* border: 1px solid red; */
  border-radius: 4px;
}

.CommentManage >>> .el-dialog__body {
  padding-top: 10px;
  padding-bottom: 10px;
}

.CommentManage >>> .el-dialog__header span {
  color: var(--primaryColor);
  font-size: 16px;
  font-weight: bold;
}

.CommentManage >>> .el-input__icon,
.CommentManage >>> .el-input__inner {
  /* border:1px solid red; */
  height: 35px;
  line-height: 35px;
  display: flex;
  align-items: center;
}

.CommentManage >>> .el-input__icon {
  margin-left: 5px;
}

.CommentManage >>> .table .el-input__inner,
.CommentManage >>> .table .el-input-number {
  /* border: 1px solid red; */
  align-items: center;
  justify-content: center;
  display: flex;
  width: 380px;
  height: 35px;
  line-height: 35px;
}

.CommentManage >>> .el-dialog__headerbtn .el-dialog__close:hover {
  color: var(--primaryColor);
}

.CommentManage >>> .el-textarea__inner:active {
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
  content: '';
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

/* ****************************************************** */
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
  background: rgba(14, 85, 113, 0.95);
}
</style>