<template>
  <div class="userManage">
    <!-- 条件筛选区 -->
    <div class="filters">
      <div class="input">
        <div class="item">
          <p>用户昵称：</p>
          <el-input v-model="conditionList.username"
                    prefix-icon="el-icon-user"
                    placeholder="用户昵称"></el-input>
        </div>
        <div class="item">
          <p>Email：</p>
          <el-input v-model="conditionList.email"
                    prefix-icon="el-icon-message"
                    placeholder="电子邮箱"></el-input>
        </div>

        <div class="item">
          <p>用户权限：</p>
          <el-select v-model="conditionList.privilege"
                     placeholder="请选择用户权限">
            <el-option label="管理员"
                       :value="1"></el-option>
            <el-option label="普通用户"
                       :value="2"></el-option>
            <el-option label="封禁用户"
                       :value="3"></el-option>
          </el-select>
        </div>

        <div class="item">
          <p>用户性别：</p>
          <el-select v-model="conditionList.gender"
                     placeholder="请选择用户性别">
            <el-option label="男"
                       :value="1"></el-option>
            <el-option label="女"
                       :value="2"></el-option>
          </el-select>
        </div>

        <div class="item button">
          <el-button type="primary"
                     @click="query(1)">查询</el-button>
          <el-button type="info"
                     @click="clear()">清空</el-button>
        </div>
      </div>
    </div>

    <!-- 表单展示区 -->
    <div class="table">
      <el-table border
                :height="tableHeight"
                :data="tableData">
        <el-table-column prop="id"
                         label="ID"
                         width="80">
        </el-table-column>

        <el-table-column prop="avatar"
                         label="头像"
                         width="150">
          <template slot-scope="scope">
            <img :src="scope.row.avatar"
                 style="width: 60px;border-radius: 4px;" />
          </template>
        </el-table-column>

        <el-table-column prop="email"
                         label="Email"
                         width="160">
        </el-table-column>

        <el-table-column prop="username"
                         label="用户昵称"
                         width="160">
        </el-table-column>

        <el-table-column prop="gender"
                         label="性别"
                         width="100">
          <template slot-scope="scope">
            <div v-show="scope.row.gender">
              {{ scope.row.gender===1?"男":"女" }}
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="privilege"
                         label="权限"
                         width="120">
          <template slot-scope="scope">
            <el-tag type="warning"
                    size="medium"
                    v-show="scope.row.privilege===1">管理员</el-tag>

            <el-tag type="primary"
                    size="medium"
                    v-show="scope.row.privilege===2">普通用户</el-tag>

            <el-tag type="danger"
                    size="medium"
                    v-show="scope.row.privilege===3">封禁用户</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="createTime"
                         label="注册时间"
                         width="200">
          <template slot-scope="scope">
            {{ scope.row.createTime?scope.row.createTime.replace('T',' '):'' }}
          </template>
        </el-table-column>

        <el-table-column prop="updateTime"
                         label="最后修改时间"
                         width="200">
          <template slot-scope="scope">
            {{ scope.row.updateTime?scope.row.updateTime.replace('T',' '):'' }}
          </template>
        </el-table-column>

        <el-table-column fixed="right"
                         label="操作"
                         width="100">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)"
                        v-show="scope.row.privilege!=3"
                       type="text">编辑</el-button>

            <!-- <el-button type="text"
                       v-show="scope.row.privilege!=1"
                       @click="handlerDelete(scope.row)">删除</el-button> -->

            <el-button type="text"
                       @click="handleBan(scope.row)"
                       v-show="scope.row.privilege!=3 && scope.row.privilege!=1">封禁</el-button>

            <el-button type="text"
                       @click="handleDisban(scope.row)"
                       v-show="scope.row.privilege===3">解封</el-button>

          </template>
        </el-table-column>
      </el-table>

      <!-- 编辑区域 -->
      <el-dialog title="用户信息修改"
                 width="500px"
                 :close-on-click-modal="false"
                 :visible.sync="dialogFormVisible">
        <!-- 表单 -->
        <el-form :model="dialogData"
                 ref="dialogForm"
                 label-position="right"
                 label-width="80px">

          <el-form-item label="用户头像"
                        prop="avatar"
                        :rules="[{required: true, message: '请上传用户头像', trigger: 'blur'}]">
            <el-upload class="cover-uploader"
                       action=""
                       :http-request="uploadCover"
                       :show-file-list="false"
                       :before-upload="beforeCoverUpload"
                       v-loading="uploadLoading">
              <img v-if="dialogData.avatar"
                   :src="dialogData.avatar"
                   class="cover" />
              <i v-else
                 class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="Email">
            <el-input v-model="dialogData.email"
                      :disabled="true"
                      prefix-icon="el-icon-message"
                      placeholder="Email">
            </el-input>
          </el-form-item>

          <el-form-item label="用户昵称">
            <el-input v-model="dialogData.username"
                      prefix-icon="el-icon-user"
                      placeholder="用户昵称">
            </el-input>
          </el-form-item>

          <el-form-item label="用户性别">
            <el-select v-model="dialogData.gender"
                       placeholder="请选择用户性别">
              <el-option label="男"
                         :value="1"></el-option>
              <el-option label="女"
                         :value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="用户权限">
            <el-select v-model="dialogData.privilege"
                       placeholder="请选择用户权限">
              <el-option label="管理员"
                         :value="1">
              </el-option>
              <el-option label="普通用户"
                         :value="2">
              </el-option>
            </el-select>
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
import { upload } from "@/api/upload"
import { selectByCondition, updateUser,banUser,disbanUser } from "@/api/user"

export default {
  name: "userManage",

  data () {
    return {
      // 表单的高度
      tableHeight: 560,
      // 分页条相关数据
      pagination: {
        total: 1,
        currentPage: 1,
      },
      // 筛选条件
      conditionList: {
        email: "",
        username: "",
        gender: "",
        privilege: ""
      },
      // 用户数据
      tableData: [],

      // 上传加载
      uploadLoading: false,
      uploadLoading2: false,
      dialogLoading: false,

      // 弹出表单的数据
      dialogData: {
        id: "",
        email: "",
        username: "",
        gender: "",
        avatar: "",
        privilege: "",
        createTime: "",
        updateTime: ""
      },
      // 弹框表单是否显示
      dialogFormVisible: false,
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
    // 查询游戏信息
    query (page) {
      let params = {
        ...this.conditionList,
        page: 1,
        pageSize: 10,
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
        email: "",
        username: "",
        gender: "",
        privilege: ""
      };

      this.conditionList = empty;
      this.query(1);
    },

    // 点击添加按钮
    handleInsert () {
      // 正常添加一条数据
      this.dialogData = {
        id: "",
        email: "",
        username: "",
        gender: "",
        avatar: "",
        privilege: "",
        createTime: "",
        updateTime: ""
      }
      this.dialogFormVisible = !this.dialogFormVisible;
    },

    // 点击编辑
    handleEdit (row) {
      this.dialogFormVisible = !this.dialogFormVisible;
      this.dialogData.id = row.id;
      this.dialogData.email = row.email;
      this.dialogData.username = row.username;
      this.dialogData.gender = row.gender;
      this.dialogData.avatar = row.avatar;
      this.dialogData.privilege = row.privilege;
      this.dialogData.createTime = row.createTime;
      this.dialogData.updateTime = row.updateTime;
    },

    // 点击删除
    // handlerDelete (row) {
    //   this.$confirm("是否删除所选用户？", "提示", {
    //     confirmButtonText: "删除",
    //     cancelButtonText: "取消",
    //     type: "warning",
    //   }).then(() => {
    //     // 成功的回调
    //     deleteByIds(row.id).then(res => {
    //       if (res.code === 1) {
    //         this.query(this.pagination.currentPage);
    //         this.$message.success("用户删除成功！");
    //       } else {
    //         this.$message.error(res.msg);
    //       }
    //     }).catch(err => {
    //       console.log(err);
    //     })
    //   }).catch(() => {
    //     // 取消的回调
    //     this.$message.info("已取消删除");
    //   });
    // },

    // 封禁用户
    handleBan(row){
      this.$confirm("是否封禁所选用户？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        // 成功的回调
        banUser(row.id).then(res => {
          if (res.code === 1) {
            this.query(this.pagination.currentPage);
            this.$message.success("用户封禁成功！");
          } else {
            this.$message.error(res.msg);
          }
        }).catch(err => {
          console.log(err);
        })
      }).catch(() => {
        // 取消的回调
        this.$message.info("封禁已取消");
      });
    },
      
    // 解封用户
    handleDisban(row){
      this.$confirm("是否解封所选用户？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        // 成功的回调
        disbanUser(row.id).then(res => {
          if (res.code === 1) {
            this.query(this.pagination.currentPage);
            this.$message.success("用户解封成功！");
          } else {
            this.$message.error(res.msg);
          }
        }).catch(err => {
          console.log(err);
        })
      }).catch(() => {
        // 取消的回调
        this.$message.info("解封已取消");
      });
    },

    // 上传封面
    uploadCover (params) {
      const { file } = params;
      const formData = new FormData();
      // 加载中
      this.uploadLoading = true;
      formData.append("file", file);

      upload(formData).then((res) => {
        if (res.code === 1) {
          this.dialogData.avatar = res.data;
          this.uploadLoading = false;
        } else {
          this.$message.error(res.msg);
        }
      }).catch((err) => {
        console.log(err);
      });
    },

    // 上传前
    beforeCoverUpload (file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("头像只能是 JPG/PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("头像大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
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

    // 更新电影信息
    updateInfo () {
      this.dialogLoading = true;

      updateUser(this.dialogData).then(res => {
        if (res.code === 1) {
          this.query(this.pagination.currentPage);
          this.dialogLoading = false;
          this.$message.success("用户信息更新成功！");
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
  }
}
  </script>
  
  <style scoped>
.userManage {
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

.filters .input .item >>> .el-select .el-input .el-select__caret {
  display: none;
}

/* *************************************************** */
.filters .button {
  display: flex;
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row-start: 2;
  grid-row-end: 2;
  height: 40px;
}

/* *************************************************** */

.table >>> .el-table th.el-table__cell > .cell,
.table >>> .el-table .cell {
  text-align: center;
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
.filters .button {
  display: flex;
  /* justify-content: space-between; */
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 2;
  grid-row-end: 2;
}

/* **************************************************** */
.userManage >>> .el-dialog {
  /* border: 1px solid red; */
  border-radius: 4px;
}

.userManage >>> .el-dialog__body {
  padding-top: 10px;
  padding-bottom: 10px;
}

.userManage >>> .el-dialog__header span {
  color: var(--primaryColor);
  font-size: 16px;
  font-weight: bold;
}

.userManage >>> .el-input__icon,
.userManage >>> .el-input__inner {
  /* border:1px solid red; */
  height: 35px;
  line-height: 35px;
  display: flex;
  align-items: center;
}

.userManage >>> .table .el-input__inner,
.userManage >>> .table .el-input-number {
  /* border: 1px solid red; */
  align-items: center;
  justify-content: center;
  display: flex;
  width: 380px;
  height: 35px;
  line-height: 35px;
}

.userManage >>> .table .el-input-number__decrease,
.userManage >>> .table .el-input-number__increase {
  /* top:0px !important; */
  height: 33px;
}

.userManage >>> .el-input__icon {
  margin-left: 5px;
}

.userManage >>> .el-dialog__headerbtn .el-dialog__close:hover {
  color: var(--primaryColor);
}

.userManage >>> .el-textarea__inner:active {
  border-color: var(--primaryColor);
}

.userManage >>> .el-dialog__footer div button {
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

.userManage >>> .el-dialog__footer div button::before {
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

.userManage >>> .el-dialog__footer div button:hover::before {
  background-position: left bottom;
}

/* *************************************************** */
.cover-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.cover-uploader >>> .el-upload {
  border: 1px dashed var(--lightTheme);
  display: flex;
  height: 100px;
  width: 100px;
  line-height: 100px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  overflow: hidden;
}

.cover-uploader .el-upload:hover {
  border-color: #409eff;
}
.cover-uploader >>> .cover-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  text-align: center;
}

.cover {
  height: 100px;
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
  /* color: var(--primaryColor); */
  /* color: red; */
  background: rgba(14, 85, 113, 0.95);
}
</style>