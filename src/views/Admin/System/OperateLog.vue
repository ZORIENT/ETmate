<template>
  <div class="OperateLog">
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
          <p>Email：</p>
          <el-input v-model="conditionList.email"
                    prefix-icon="el-icon-message"
                    placeholder="电子邮箱">
          </el-input>
        </div>

        <div class="item">
          <p>操作类名：</p>
          <el-input v-model="conditionList.className"
                    prefix-icon="el-icon-folder"
                    placeholder="操作类名">
          </el-input>
        </div>

        <div class="item timePicker">
          <p>操作时间：</p>
          <el-date-picker v-model="operateDate"
                          clearable
                          value-format="yyyy-MM-dd"
                          type="daterange"
                          placeholder="选择操作时间"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期">
          </el-date-picker>
        </div>

        <div class="item"></div>

        <div class="item">
          <p>操作方法：</p>
          <el-input v-model="conditionList.methodName"
                    prefix-icon="el-icon-mouse"
                    placeholder="操作方法名">
          </el-input>
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

        <el-table-column prop="id"
                         label="ID"
                         width="80">
        </el-table-column>

        <el-table-column label="操作者"
                         width="180">
          <template slot-scope="scope">
            <img :src="scope.row.avatar"
                 style="width: 60px;border-radius: 4px;" />
            <span>{{ scope.row.username }}</span>
            <span>{{ scope.row.email }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作类名"
                         width="180">
          <template slot-scope="scope">
            {{scope.row.className.replace('com.zorient.etmate.controller.','')}}
          </template>
        </el-table-column>

        <el-table-column prop="methodName"
                         label="操作方法"
                         width="150">
        </el-table-column>

        <el-table-column prop="methodParams"
                         label="方法参数"
                         width="120">
          <template slot-scope="scope">
            <el-popover placement="top-start"
                        title="参数"
                        width="300"
                        trigger="hover"
                        :content="scope.row.methodParams">

              <el-button slot="reference"
                         size="medium">
                <i class="el-icon-notebook-2">
                </i></el-button>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column prop="returnValue"
                         label="返回结果">
          <template slot-scope="scope">
            <div>
              <pre v-html="JSON.stringify(JSON.parse(scope.row.returnValue), undefined, 2)"></pre>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="方法耗时"
                         width="100">
          <template slot-scope="scope">
            {{scope.row.costTime}} ms
          </template>
        </el-table-column>

        <el-table-column label="操作时间"
                         width="160">
          <template slot-scope="scope">
            {{ scope.row.operateTime?scope.row.operateTime.replace('T',' '):'' }}
          </template>
        </el-table-column>

        <el-table-column fixed="right"
                         label="操作"
                         width="100">
          <template slot-scope="scope">
            <el-button type="text"
                       @click="handlerDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 页码选择区 -->
    <div class="pagination">
      <el-pagination background
                     layout="prev, pager, next,jumper"
                     :total="pagination.total"
                     :page-size="20"
                     @current-change="currentPageChanged"
                     :current-page.sync="pagination.currentPage">
      </el-pagination>
    </div>
  </div>
</template>
  
<script>
import { deleteByIds, selectByCondition } from "@/api/log"

export default {
  name: "OperateLog",

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
        email: "",
        className: "",
        methodName: "",
        begin: "",
        end: ""
      },
      // 表格信息数据
      tableData: [],
      operateDate: [],
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

    // 点击删除
    handlerDelete (row) {
      this.$confirm("是否删除所选信息？", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        // 成功的回调
        deleteByIds(row.id).then(res => {
          if (res.code === 1) {
            this.query(this.pagination.currentPage);
            this.$message.success("日志信息删除成功！");
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

    // 查询日志信息
    query (page) {
      let params = {
        ...this.conditionList,
        page: 1,
        pageSize: 20,
      }
      params.page = page;

      selectByCondition(params).then(res => {
        if (res.code === 1) {
          this.tableData = res.data.rows;
          this.pagination.total = res.data.total;
          this.pagination.currentPage = page;
          this.tableHeight = 560;
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
        email: "",
        className: "",
        methodName: "",
        begin: "",
        end: ""
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
        deleteByIds(this.multipleSelection).then(res => {
          if (res.code === 1) {
            this.query(1);
            this.$message.success("所选日志批量删除成功！");
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
  },

  watch: {
    pagination: {
      deep: true,
      handler () {
        this.query(this.pagination.currentPage);
      }
    },
    operateDate: {
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
.OperateLog {
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
.filters .input .item >>> .el-select .el-input .el-select__caret {
  display: none;
}
/* *************************************************** */
.filters .button {
  display: flex;
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 2;
  grid-row-end: 2;
  height: 40px;
}

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

/* *************************************************** */
.table >>> .el-table th.el-table__cell > .cell,
.table >>> .el-table .cell {
  text-align: center;
}
/* 电影名称列 */
.table >>> .el-table td:nth-child(3) div {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.table >>> .el-table td:nth-child(7) div {
  display: flex;
  justify-content: center;
  align-items: center;
}

.table >>> .el-table td:nth-child(7) div pre {
  text-align: left;
}

.table >>> .el-table td:last-child div button {
  color: #dd0000;
}
.table >>> .el-table td:last-child div button:hover {
  color: #dd0000;
  opacity: 0.9;
}
/* **************************************************** */
.OperateLog >>> .el-input__icon,
.OperateLog >>> .el-input__inner {
  height: 35px;
  line-height: 35px;
  display: flex;
  align-items: center;
}

.OperateLog >>> .table .el-input__inner,
.OperateLog >>> .table .el-input-number {
  align-items: center;
  justify-content: center;
  display: flex;
  width: 480px;
  height: 35px;
  line-height: 35px;
}
.OperateLog >>> .table .el-input-number__decrease,
.OperateLog >>> .table .el-input-number__increase {
  height: 33px;
}
.OperateLog >>> .el-input__icon {
  margin-left: 5px;
}

.OperateLog >>> .el-textarea__inner:active {
  border-color: var(--primaryColor);
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