<template>
  <div class="BookManage">
    <!-- 条件筛选区 -->
    <div class="filters">
      <div class="input">
        <div class="item">
          <p>IBSN：</p>
          <el-input v-model="conditionList.ibsn"
                    prefix-icon="el-icon-magic-stick"
                    placeholder="书籍IBSN"></el-input>
        </div>
        <div class="item">
          <p>书籍名称：</p>
          <el-input v-model="conditionList.bookName"
                    prefix-icon="el-icon-collection"
                    placeholder="书籍的准确名称"></el-input>
        </div>
        <div class="item">
          <p>书籍作者：</p>
          <el-input v-model="conditionList.author"
                    prefix-icon="el-icon-user"
                    placeholder="书籍作者"></el-input>
        </div>
        <div class="item">
          <p>出版厂商：</p>
          <el-input v-model="conditionList.publisher"
                    prefix-icon="el-icon-bank-card"
                    placeholder="出版厂商"></el-input>
        </div>
        <div class="item">
          <p>书籍标签：</p>
          <el-input v-model="conditionList.tags"
                    prefix-icon="el-icon-location-information"
                    placeholder="标签以 / 分隔"></el-input>
        </div>
        <div class="item">
          <p>上映年份：</p>
          <el-date-picker v-model="conditionList.releaseYear"
                          value-format="yyyy"
                          format="yyyy 年"
                          type="year"
                          placeholder="书籍上映年份">
          </el-date-picker>
        </div>
        <div class="item">
          <p>排序方式：</p>
          <el-select v-model="conditionList.sortId"
                     placeholder="请选择排序方式">
            <el-option label="按豆瓣评分排列"
                       :value="1"></el-option>
            <el-option label="按出版时间排列"
                       :value="2"></el-option>
            <el-option label="按售卖价格排列"
                       :value="3"></el-option>
          </el-select>
        </div>
        <div class="item button">
          <el-button type="primary"
                     @click="query(1)">查询</el-button>
          <el-button type="info"
                     @click="clear()">清空</el-button>
          <el-button type="danger"
                     :disabled="!multipleSelection.length"
                     @click="deleteByIds()">批量删除</el-button>
          <el-upload class="importExcel"
                     ref="importExcel"
                     action=""
                     accept=".xls,.xlsx"
                     :http-request="importExcel"
                     :on-remove="handleRemove"
                     :before-remove="beforeRemove"
                     :on-change="handleChange"
                     :on-exceed="handleExceed"
                     :limit="1"
                     :file-list="excelList"
                     :auto-upload="false">

            <el-button style="margin-left: 10px;"
                       type="primary"
                       v-loading="excelLoading"
                       @click="handleInsert()">添加书籍</el-button>
            <el-button slot="trigger"
                       type="success"
                       :disabled="excelList.length!=0">选取xls文件</el-button>
          </el-upload>
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
                         width="40"></el-table-column>

        <el-table-column prop="bookName"
                         label="书籍名称"
                         width="150">
          <template slot-scope="scope">
            <img :src="scope.row.cover"
                 style="width: 50px" />
            <span>《{{ scope.row.bookName }}》</span>
          </template>
        </el-table-column>

        <el-table-column prop="author"
                         label="作者"
                         width="130">
          <template slot-scope="scope">
            {{ scope.row.author?scope.row.author:'N/A' }}
          </template>
        </el-table-column>

        <el-table-column prop="translator"
                         label="译者"
                         width="120">
          <template slot-scope="scope">
            {{ scope.row.translator?scope.row.translator:'N/A' }}
          </template>
        </el-table-column>

        <el-table-column prop="publisher"
                         label="出版商"
                         width="120">
        </el-table-column>

        <el-table-column prop="publicationTime"
                         label="出版时间"
                         width="120">
        </el-table-column>

        <el-table-column prop="doubanScore"
                         label="豆瓣评分"
                         width="120">
        </el-table-column>

        <el-table-column prop="price"
                         label="价格"
                         width="120">
          <template slot-scope="scope">
            ￥{{ scope.row.price}}
          </template>
        </el-table-column>

        <el-table-column prop="tags"
                         label="标签"
                         width="250">
          <template slot-scope="scope">
            <el-tag v-for="(tag,index) in splitTags(scope.row.tags)"
                    :key="index"
                    size="small">
              {{ tag }}
            </el-tag>
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
      <el-dialog :title="type===1?'书籍信息修改':'书籍信息添加'"
                 width="500px"
                 :close-on-click-modal="false"
                 :visible.sync="dialogFormVisible">
        <!-- 表单 -->
        <el-form :model="dialogData"
                 ref="dialogForm"
                 label-position="right"
                 label-width="80px">

          <el-form-item label="书籍封面"
                        prop="cover"
                        :rules="[{required: true, message: '请上传书籍封面！', trigger: 'blur'}]">
            <el-upload class="cover-uploader"
                       action=""
                       :http-request="uploadCover"
                       :show-file-list="false"
                       :before-upload="beforeCoverUpload"
                       v-loading="uploadLoading">
              <img v-if="dialogData.cover"
                   :src="dialogData.cover"
                   class="cover" />
              <i v-else
                 class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="书籍名称"
                        prop="bookName"
                        :rules="[{required: true, message: '请输入书籍名称！', trigger: 'blur'}]">
            <el-input v-model="dialogData.bookName"
                      prefix-icon="el-icon-collection"
                      placeholder="书籍名称">
            </el-input>
          </el-form-item>

          <el-form-item label="IBSN"
                        prop="ibsn"
                        :rules="[{required: true, message: '请输入书籍的IBSN！', trigger: 'blur'}]">
            <el-input v-model="dialogData.ibsn"
                      prefix-icon="el-icon-view"
                      placeholder="IBSN"
                      maxlength="13">
            </el-input>
          </el-form-item>

          <el-form-item label="作者"
                        prop="author"
                        :rules="[{required: true, message: '请输入作者名称！', trigger: 'blur'}]">
            <el-input v-model="dialogData.author"
                      prefix-icon="el-icon-user"
                      placeholder="作者">
            </el-input>
          </el-form-item>

          <el-form-item label="译者">
            <el-input v-model="dialogData.translator"
                      prefix-icon="el-icon-user"
                      placeholder="译者">
            </el-input>
          </el-form-item>

          <el-form-item label="出版厂商"
                        prop="publisher"
                        :rules="[{required: true, message: '请输入出版厂商名称！', trigger: 'blur'}]">
            <el-input v-model="dialogData.publisher"
                      prefix-icon="el-icon-bank-card"
                      placeholder="出版厂商">
            </el-input>
          </el-form-item>

          <el-form-item label="出版时间">
            <el-date-picker v-model="dialogData.publicationTime"
                            type="date"
                            :clearable="false"
                            value-format="yyyy-MM-dd"
                            placeholder="出版时间">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="价格 ￥">
            <el-input-number v-model="dialogData.price"
                             :precision="2"
                             :step="1"
                             :min="0">
            </el-input-number>
          </el-form-item>

          <el-form-item label="豆瓣评分">
            <el-input-number v-model="dialogData.doubanScore"
                             :precision="1"
                             :step="0.1"
                             :max="10"
                             :min="2">
            </el-input-number>
          </el-form-item>

          <el-form-item label="书籍页数">
            <el-input-number v-model="dialogData.pages"
                             :precision="0"
                             :step="1"
                             :min="0">
            </el-input-number>
          </el-form-item>

          <el-form-item label="书籍标签"
                        prop="tags"
                        :rules="[{required: true, message: '请输入书籍标签！', trigger: 'blur'}]">
            <el-input v-model="dialogData.tags"
                      placeholder="不同标签间以 / 分隔"
                      type="textarea"
                      :autosize="{ minRows: 2, maxRows: 2}">
            </el-input>
          </el-form-item>

          <el-form-item label="书籍简介"
                        prop="introduction"
                        :rules="[{required: true, message: '请输入书籍简介！', trigger: 'blur'}]">
            <el-input v-model="dialogData.introduction"
                      placeholder="书籍简介"
                      type="textarea"
                      :autosize="{ minRows: 2, maxRows: 4}">
            </el-input>
          </el-form-item>

          <el-form-item label="作者简介">
            <el-input v-model="dialogData.authorIntro"
                      placeholder="作者简介"
                      type="textarea"
                      :autosize="{ minRows: 2, maxRows: 4}">
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
import XLSX from "xlsx"
import { deleteByIds, insertBook, updateBook, selectByCondition } from "@/api/book"

export default {
  name: "BookManage",

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
        ibsn: "",
        bookName: "",
        releaseYear: "",
        author: "",
        publisher: "",
        tags: "",
        sortId: 1
      },
      //   电影信息数据
      tableData: [],
      // 弹框表单是否显示
      dialogFormVisible: false,
      // 弹出表单数据
      dialogData: {
        id: "",
        ibsn: "",
        bookName: "",
        author: "",
        translator: "",
        publisher: "",
        publicationTime: "",
        price: "",
        doubanScore: "",
        pages: "",
        introduction: "",
        authorIntro: "",
        tags: "",
        cover: ""
      },
      // 上传加载
      uploadLoading: false,
      dialogLoading: false,
      excelLoading: false,
      // type，1 更新，2 添加
      type: 1,
      // 上传的excel文件列表
      excelList: [],
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

    // 将tags按/分隔成数组
    splitTags (tags) {
      return tags.split('/').map(tag => tag.trim()).filter(item => item.trim() != '');
    },

    // 复选框被选中之后执行的方法
    handleSelectionChange (val) {
      this.multipleSelection = [];
      val.forEach(item => {
        this.multipleSelection.push(item.id);
      });
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

    // 点击编辑
    handleEdit (row) {
      this.type = 1;
      this.dialogFormVisible = !this.dialogFormVisible;
      this.dialogData.id = row.id;
      this.dialogData.ibsn = row.ibsn;
      this.dialogData.bookName = row.bookName;
      this.dialogData.author = row.author;
      this.dialogData.translator = row.translator;
      this.dialogData.publisher = row.publisher;
      this.dialogData.publicationTime = row.publicationTime;
      this.dialogData.price = row.price;
      this.dialogData.doubanScore = row.doubanScore;
      this.dialogData.pages = row.pages;
      this.dialogData.introduction = row.introduction;
      this.dialogData.authorIntro = row.authorIntro;
      this.dialogData.tags = row.tags;
      this.dialogData.cover = row.cover;
    },

    // 点击添加按钮
    handleInsert () {
      // 正常添加一条数据
      if (this.excelList.length === 0) {
        this.dialogData = {
          id: "",
          ibsn: "",
          bookName: "",
          author: "",
          translator: "",
          publisher: "",
          publicationTime: "",
          price: "",
          doubanScore: "",
          pages: "",
          introduction: "",
          authorIntro: "",
          tags: "",
          cover: ""
        }
        this.dialogFormVisible = !this.dialogFormVisible;
        this.type = 2;
      } else {
        // 批量添加xls中的数据
        this.$refs.importExcel.submit();
      }
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
            this.$message.success("书籍信息删除成功！");
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

    // 添加电影信息
    insertInfo () {
      this.dialogLoading = true;

      insertBook(this.dialogData).then(res => {
        if (res.code === 1) {
          this.query(1);
          this.dialogLoading = false;
          this.$message.success("书籍信息添加成功！");
          this.dialogFormVisible = false;
        } else {
          this.$message.error(res.msg);
          this.dialogFormVisible = false;
        }
      }).catch(err => {
        console.log(err);
      })
    },

    // 查询电影信息
    query (page) {
      let params = {
        ...this.conditionList,
        type: 3,
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
        ibsn: "",
        bookName: "",
        releaseYear: "",
        author: "",
        publisher: "",
        tags: "",
        sortId: 1
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
            this.$message.success("所选书籍批量删除成功！");
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

      updateBook(this.dialogData).then(res => {
        if (res.code === 1) {
          this.query(this.pagination.currentPage);
          this.dialogLoading = false;
          this.$message.success("书籍信息更新成功！");
          this.dialogFormVisible = false;
        } else {
          this.$message.error(res.msg);
          this.dialogFormVisible = false;
        }
      }).catch(err => {
        console.log(err);
      })
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
          this.dialogData.cover = res.data;
          this.uploadLoading = false;
        } else {
          this.$message.error(res.msg);
        }
      })
        .catch((err) => {
          console.log(err);
        });
    },

    // 上传前
    beforeCoverUpload (file) {
      const isJPG = file.type === "image/jpeg"|| file.type==="image/png";
      const isLt5M = file.size / 1024 / 1024 < 5;

      if (!isJPG) {
        this.$message.error("封面只能是 JPG/PNG 格式!");
      }
      if (!isLt5M) {
        this.$message.error("封面大小不能超过 5MB!");
      }
      return isJPG && isLt5M;
    },

    // 批量上传书籍信息
    importExcel (params) {
      this.excelLoading = true;
      const { file } = params;
      // 读取file中的数据
      // 把文件解析成二进制数据，把二级制数据变成excel表格式的数据
      const fileReader = new FileReader();
      fileReader.readAsBinaryString(file);
      fileReader.onload = (ev) => {
        try {
          const data = ev.target.result;
          // console.log(data);
          const workbook = XLSX.read(data, { type: 'binary' });
          const wsname = workbook.SheetNames[0];// 取第一张表的数据
          const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]);// 生成json数据

          let count = 0;
          let successCount = 0;
          let failCount = 0;

          ws.forEach(item => {
            let excelData = {
              ibsn: item["ibsn"],
              bookName: item["bookName"],
              author: item["author"],
              translator: item["translator"],
              publisher: item["publisher"],
              publicationTime: item["publicationTime"],
              price: item["price"],
              doubanScore: item["doubanScore"],
              pages: item["pages"],
              introduction: item["introduction"],
              authorIntro: item["authorIntro"],
              tags: item["tags"],
              cover: item["cover"]
            }
            // 添加电影信息
            insertBook(excelData).then(res => {

              if (res.code === 1) {
                count++;
                successCount++;
                if (count === ws.length) {
                  this.query(1);
                  this.$message.success("成功上传" + successCount + "条数据，上传失败" + failCount + "条数据！");
                  this.excelLoading = false;
                }
              } else {
                count++;
                failCount++;
                this.$message.error(res.msg);
                this.excelLoading = false;
              }
            }).catch(err => {
              console.log(err);
              this.excelLoading = false;
            });
          });

        } catch (e) {
          console.log(e);
          return false;
        }
      }
      this.excelList = [];
    },

    // 文件改变的钩子
    handleChange (file) {
      if (this.excelList.length < 1) {
        this.excelList.push(file);
      } else {
        this.excelList = []
      }
    },
    // 文件超出限制的钩子
    handleExceed () {
      this.$message.warning("请完成提交后再选择其他文件！");
    },

    // 移出文件前的钩子
    beforeRemove (file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },

    // 移出文件的钩子
    handleRemove () {
      this.excelList = [];
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
.BookManage {
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
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row-start: 2;
  grid-row-end: 2;
  height: 40px;
}
.importExcel {
  display: flex;
  align-items: center;
  margin-left: 10px;
}
.importExcel >>> .el-upload-list__item:first-child {
  margin: 0px;
  margin-left: 5px;
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
  align-items: center;
}
/* 标签列 */
.table >>> .el-table td:nth-child(9) div {
  text-align: left;
  display: flex;
  flex-flow: wrap;
  justify-content: center;
  /* border: 1px solid red; */
}
.table >>> .el-table td:nth-child(9) div .el-tag {
  margin: 2px;
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
.BookManage >>> .el-dialog {
  border-radius: 4px;
}
.BookManage >>> .el-dialog__body {
  padding-top: 10px;
  padding-bottom: 10px;
}
.BookManage >>> .el-dialog__header span {
  color: var(--primaryColor);
  font-size: 16px;
  font-weight: bold;
}
.BookManage >>> .el-input__icon,
.BookManage >>> .el-input__inner {
  height: 35px;
  line-height: 35px;
  display: flex;
  align-items: center;
}

.BookManage >>> .table .el-input__inner,
.BookManage >>> .table .el-input-number {
  align-items: center;
  justify-content: center;
  display: flex;
  width: 380px;
  height: 35px;
  line-height: 35px;
}
.BookManage >>> .table .el-input-number__decrease,
.BookManage >>> .table .el-input-number__increase {
  height: 33px;
}
.BookManage >>> .el-input__icon {
  margin-left: 5px;
}
.BookManage >>> .el-dialog__headerbtn .el-dialog__close:hover {
  color: var(--primaryColor);
}
.BookManage >>> .el-textarea__inner:active {
  border-color: var(--primaryColor);
}
.BookManage >>> .el-dialog__footer div button {
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
.BookManage >>> .el-dialog__footer div button::before {
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
.BookManage >>> .el-dialog__footer div button:hover::before {
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
  align-items: center;
  margin: 10px 0px;
  color: var(--primaryColor) !important;
}
.pagination
  >>> .el-pagination.is-background
  .el-pager
  li:not(.disabled).active {
  background: rgba(14, 85, 113, 0.95);
}
</style>