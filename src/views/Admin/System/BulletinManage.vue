<template>
  <div class="BulletinManage">
    <!-- 条件筛选区 -->
    <div class="filters">
      <div class="item button">
        <el-button type="primary"
                   @click="handleInsert()">添加</el-button>
        <el-button type="danger"
                   :disabled="!multipleSelection.length"
                   @click="deleteByIds()">批量删除</el-button>
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

        <el-table-column label="发布者"
                         width="180">
          <template slot-scope="scope">
            <img :src="scope.row.avatar"
                 style="width: 60px;border-radius: 4px;" />
            <span>{{ scope.row.username }}</span>
            <span>{{ scope.row.email }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="title"
                         label="公告标题"
                         width="180">
        </el-table-column>

        <el-table-column prop="content"
                         label="公告内容"
                         width="200">
        </el-table-column>

        <el-table-column label="公告图片"
                         width="210">
          <template slot-scope="scope">
            <img :src="scope.row.image"
                 style="height: 100px;
                 border-radius: 4px;" />
          </template>
        </el-table-column>

        <el-table-column label="发布时间"
                         width="180">
          <template slot-scope="scope">
            {{ scope.row.createTime?scope.row.createTime.replace('T',' '):'' }}
          </template>
        </el-table-column>

        <el-table-column label="最后修改时间"
                         width="180">
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
      <el-dialog :title="type===1?'公告信息修改':'公告信息添加'"
                 width="600px"
                 :close-on-click-modal="false"
                 :visible.sync="dialogFormVisible">
        <!-- 表单 -->
        <el-form :model="dialogData"
                 ref="dialogForm"
                 label-position="right"
                 label-width="80px">

          <el-form-item label="公告图片">
            <el-upload class="cover-uploader"
                       action=""
                       :http-request="uploadImage"
                       :show-file-list="false"
                       :before-upload="beforeCoverUpload"
                       v-loading="uploadLoading">
              <img v-if="dialogData.image"
                   :src="dialogData.image"
                   class="cover" />
              <i v-else
                 class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-input v-model="dialogData.image"
                      :clearable="true"></el-input>
          </el-form-item>

          <el-form-item label="公告标题"
                        prop="title"
                        :rules="[{required: true, message: '请输入公告标题！', trigger: 'blur'}]">
            <el-input v-model="dialogData.title"
                      prefix-icon="el-icon-postcard"
                      placeholder="公告标题">
            </el-input>
          </el-form-item>

          <el-form-item label="公告内容"
                        prop="content"
                        :rules="[{required: true, message: '请输入公告内容！', trigger: 'blur'}]">
            <el-input v-model="dialogData.content"
                      type="textarea"
                      :autosize="true"
                      placeholder="公告内容">
            </el-input>
          </el-form-item>
        </el-form>

        <!-- 底部footer -->
        <div slot="footer"
             class="dialog-footer">
          <el-button @click="dialogFormVisible = false;dialogLoading = false;">取 消</el-button>
          <el-button type="primary"
                     v-loading="dialogLoading"
                     @click="submit(type)">确 定</el-button>
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
import { selectAllBulletin, deleteBulletinByIds, insertBulletin, updateBulletin } from "@/api/bulletin"
import { getUserId } from '@/utils/auth';

export default {
  name: "BulletinManage",

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
      // 公告信息数据
      tableData: [],
      // type，1 更新，2 添加
      type: 1,
      // 上传加载
      uploadLoading: false,
      uploadLoading2: false,
      dialogLoading: false,

      // 弹出表单的数据
      dialogData: {
        id: "",
        userId: "",
        avatar: "",
        username: "",
        email: "",
        title: "",
        content: "",
        image: "",
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
        page: 1,
        pageSize: 10,
      }
      params.page = page;

      selectAllBulletin(params).then(res => {
        if (res.code === 1) {
          this.tableData = res.data.rows;
          this.pagination.total = res.data.total;
          this.pagination.currentPage = page;
          this.tableHeight = 620;
        } else {
          this.$message.error(res.msg);
        }
      }).catch(err => {
        console.log(err);
      });
    },
    // 批量删除电影
    deleteByIds () {
      this.$confirm("是否删除所选信息？", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        // 成功的回调
        deleteBulletinByIds(this.multipleSelection).then(res => {
          if (res.code === 1) {
            this.query(1);
            this.$message.success("所选公告批量删除成功！");
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
    // 复选框被选中之后执行的方法
    handleSelectionChange (val) {
      this.multipleSelection = [];
      // val是一个对象数组，对象是每一条评论的具体信息
      val.forEach(item => {
        this.multipleSelection.push(item.id);
      });
    },
    // 点击编辑
    handleEdit (row) {
      this.type = 1;
      this.dialogFormVisible = !this.dialogFormVisible;
      this.dialogData.id = row.id;
      this.dialogData.userId = row.userId;
      this.dialogData.avatar = row.avatar;
      this.dialogData.username = row.username;
      this.dialogData.email = row.email;
      this.dialogData.title = row.title;
      this.dialogData.content = row.content;
      this.dialogData.image = row.image;
      this.dialogData.createTime = row.createTime;
      this.dialogData.updateTime = row.updateTime;
    },
    // 点击添加按钮
    handleInsert () {
      // 正常添加一条数据
      this.dialogData = {
        id: "",
        userId: "",
        avatar: "",
        username: "",
        email: "",
        title: "",
        content: "",
        image: "",
        createTime: "",
        updateTime: ""
      }
      this.dialogFormVisible = !this.dialogFormVisible;
      this.type = 2;
    },

    // 点击删除
    handlerDelete (row) {
      this.$confirm("是否删除所选信息？", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        // 成功的回调
        deleteBulletinByIds(row.id).then(res => {
          if (res.code === 1) {
            this.query(this.pagination.currentPage);
            this.$message.success("公告信息删除成功！");
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
    // 上传图片
    uploadImage (params) {
      const { file } = params;
      const formData = new FormData();
      // 加载中
      this.uploadLoading = true;

      formData.append("file", file);

      upload(formData).then((res) => {
        if (res.code === 1) {
          this.dialogData.image = res.data;
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
      const isLt5M = file.size / 1024 / 1024 < 5;

      if (!isJPG) {
        this.$message.error("图片只能是 JPG/PNG 格式!");
      }
      if (!isLt5M) {
        this.$message.error("图片大小不能超过 5MB!");
      }
      return isJPG && isLt5M;
    },
    // 点击dialog的确定按钮
    submit (type) {
      this.$refs['dialogForm'].validate((valid) => {
        if (valid) {
          if (type === 1) {
            this.updateInfo();
          } else {
            this.insertInfo();
          }
        } else {
          console.log('Error submit!');
          return false;
        }
      });
    },
    // 添加信息
    insertInfo () {
      this.dialogLoading = true;

      this.dialogData.userId = getUserId();

      insertBulletin(this.dialogData).then(res => {
        if (res.code === 1) {
          this.query(1);
          this.dialogLoading = false;
          this.$message.success("公告信息发布成功！");
          this.dialogFormVisible = false;
        } else {
          this.$message.error(res.msg);
          this.dialogFormVisible = false;
        }
      }).catch(err => {
        console.log(err);
      })
    },

    // 更新信息
    updateInfo () {
      this.dialogLoading = true;

      updateBulletin(this.dialogData).then(res => {
        if (res.code === 1) {
          this.query(this.pagination.currentPage);
          this.dialogLoading = false;
          this.$message.success("公告信息更新成功！");
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
    }
  }
}
 </script>
    
<style scoped>
.BulletinManage {
  display: flex;
  /* border: 1px solid red; */
  flex-direction: column;
}

/* *************************************************** */
.filters .button {
  display: flex;
  height: 40px;
  margin: 10px 0px;
}

/* *************************************************** */

.table >>> .el-table th.el-table__cell > .cell,
.table >>> .el-table .cell {
  text-align: center;
}

/* 电影名称列 */
.table >>> .el-table td:nth-child(2) div {
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
}

/* 标签列 */
.table >>> .el-table td:nth-child(4) div {
  text-align: left;
  display: flex;
  flex-flow: wrap;
  justify-content: center;
  text-indent: 2em;
}

.table >>> .el-table td:nth-child(5) div {
  display: flex;
  justify-content: center;
  align-items: center;
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
.BulletinManage >>> .el-dialog {
  /* border: 1px solid red; */
  border-radius: 4px;
}

.BulletinManage >>> .el-dialog__body {
  padding-top: 10px;
  padding-bottom: 10px;
}

.BulletinManage >>> .el-dialog__header span {
  color: var(--primaryColor);
  font-size: 16px;
  font-weight: bold;
}

.BulletinManage >>> .el-input__icon,
.BulletinManage >>> .el-input__inner {
  /* border:1px solid red; */
  height: 35px;
  line-height: 35px;
  display: flex;
  align-items: center;
}

.BulletinManage >>> .table .el-input__inner,
.BulletinManage >>> .table .el-input-number {
  /* border: 1px solid red; */
  align-items: center;
  justify-content: center;
  display: flex;
  width: 480px;
  height: 35px;
  line-height: 35px;
}

.BulletinManage >>> .table .el-input-number__decrease,
.BulletinManage >>> .table .el-input-number__increase {
  /* top:0px !important; */
  height: 33px;
}

.BulletinManage >>> .el-input__icon {
  margin-left: 5px;
}

.BulletinManage >>> .el-dialog__headerbtn .el-dialog__close:hover {
  color: var(--primaryColor);
}

.BulletinManage >>> .el-textarea__inner:active {
  border-color: var(--primaryColor);
}

.BulletinManage >>> .el-dialog__footer div button {
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

.BulletinManage >>> .el-dialog__footer div button::before {
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

.BulletinManage >>> .el-dialog__footer div button:hover::before {
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
  width: 200px;
  line-height: 100px;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.cover-uploader .el-upload:hover {
  border-color: #409eff;
}
.cover-uploader >>> .cover-uploader-icon {
  font-size: 28px;
  /* height: 100px;
      width: 100px; */
  color: #8c939d;
  text-align: center;
}

.cover {
  /* width: 100%; */
  height: 100px;
  /* display: block; */
  /* border: 1px solid red; */
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