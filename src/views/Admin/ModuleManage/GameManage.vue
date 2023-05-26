<template>
  <div class="GameManage">
    <!-- 条件筛选区 -->
    <div class="filters">
      <div class="input">
        <div class="item">
          <p>游戏名称：</p>
          <el-input v-model="conditionList.gameName"
                    prefix-icon="el-icon-coordinate"
                    placeholder="游戏准确名称"></el-input>
        </div>
        <div class="item">
          <p>游戏类型：</p>
          <el-input v-model="conditionList.genres"
                    prefix-icon="el-icon-tickets"
                    placeholder="类型以 / 分隔"></el-input>
        </div>
        <div class="item">
          <p>游戏平台：</p>
          <el-input v-model="conditionList.platforms"
                    prefix-icon="el-icon-medal"
                    placeholder="平台以 / 分隔"></el-input>
        </div>
        <div class="item">
          <p>游戏厂商：</p>
          <el-input v-model="conditionList.publisher"
                    prefix-icon="el-icon-box"
                    placeholder="厂商以 / 分隔"></el-input>
        </div>
        <div class="item">
          <p>游戏标签：</p>
          <el-input v-model="conditionList.tags"
                    prefix-icon="el-icon-price-tag"
                    placeholder="标签以 / 分隔"></el-input>
        </div>
        <div class="item">
          <p>发行年份：</p>
          <el-date-picker v-model="conditionList.releaseYear"
                          value-format="yyyy"
                          format="yyyy 年"
                          type="year"
                          placeholder="游戏发行年份">
          </el-date-picker>
        </div>
        <div class="item">
          <p>排序方式：</p>
          <el-select v-model="conditionList.sortId"
                     placeholder="请选择排序方式">
            <el-option label="按名称降序排列"
                       :value="1"></el-option>
            <el-option label="按发行时间排列"
                       :value="2"></el-option>
            <el-option label="按平台降序排列"
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
                       @click="handleInsert()">添加游戏</el-button>
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
                         width="40">
        </el-table-column>
        <el-table-column prop="gameName"
                         label="游戏名称"
                         width="150">
          <template slot-scope="scope">
            <img :src="scope.row.cover"
                 style="width: 50px" />
            <span>《{{ scope.row.gameName }}》</span>
          </template>
        </el-table-column>
        <el-table-column prop="gameNameEn"
                         label="游戏别称"
                         width="150">
          <template slot-scope="scope">
            {{ scope.row.gameNameEn?scope.row.gameNameEn:'N/A' }}
          </template>
        </el-table-column>
        <el-table-column prop="publisher"
                         label="发行商"
                         width="150">
          <template slot-scope="scope">
            {{ scope.row.publisher?scope.row.publisher:'N/A' }}
          </template>
        </el-table-column>
        <el-table-column prop="platforms"
                         label="平台"
                         width="150">
          <template slot-scope="scope">
            <el-tag type="danger"
                    v-for="(platform,index) in splitTags(scope.row.platforms)"
                    :key="index"
                    size="small">
              {{ platform }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="genres"
                         label="游戏类型"
                         width="150">
        </el-table-column>
        <el-table-column prop="timePlatform"
                         label="发行时间"
                         width="150">
        </el-table-column>
        <el-table-column prop="tags"
                         label="标签"
                         width="230">
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
      <el-dialog :title="type===1?'游戏信息修改':'游戏信息添加'"
                 width="600px"
                 :close-on-click-modal="false"
                 :visible.sync="dialogFormVisible">
        <!-- 表单 -->
        <el-form :model="dialogData"
                 ref="dialogForm"
                 label-position="right"
                 label-width="80px">

          <el-form-item label="游戏封面"
                        prop="cover"
                        :rules="[{required: true, message: '请上传游戏封面！', trigger: 'blur'}]">
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

          <el-form-item label="游戏截图"
                        prop="img"
                        :rules="[{required: true, message: '请上传游戏截图！', trigger: 'blur'}]">
            <el-upload class="cover-uploader"
                       action=""
                       :http-request="uploadImg"
                       :show-file-list="false"
                       :before-upload="beforeCoverUpload"
                       v-loading="uploadLoading2">
              <img v-if="dialogData.img"
                   :src="dialogData.img"
                   class="cover" />
              <i v-else
                 class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <!-- <el-form-item label="游戏截图"
                        prop="img"
                        :rules="[{required: true, message: '请上传游戏截图！', trigger: 'blur'}]">
            <el-input v-model="dialogData.img"
                      prefix-icon="el-icon-picture-outline"
                      placeholder="游戏截图">
            </el-input>
          </el-form-item> -->

          <!-- <el-form-item label="封面地址"
                        prop="cover">
            <el-input v-model="dialogData.cover"
                      prefix-icon="el-icon-video-camera"
                      placeholder="封面地址">
            </el-input>
          </el-form-item> -->

          <el-form-item label="游戏名称"
                        prop="gameName"
                        :rules="[{required: true, message: '请输入游戏名称！', trigger: 'blur'}]">
            <el-input v-model="dialogData.gameName"
                      prefix-icon="el-icon-coordinate"
                      placeholder="游戏名称">
            </el-input>
          </el-form-item>

          <el-form-item label="英文名称">
            <el-input v-model="dialogData.gameNameEn"
                      prefix-icon="el-icon-coordinate"
                      placeholder="英文名称">
            </el-input>
          </el-form-item>

          <el-form-item label="游戏平台"
                        prop="platforms"
                        :rules="[{required: true, message: '请输入游戏平台！', trigger: 'blur'}]">
            <el-input v-model="dialogData.platforms"
                      prefix-icon="el-icon-medal"
                      placeholder="不同平台已/分隔">
            </el-input>
          </el-form-item>

          <!-- <el-form-item label="发行时间"
                        prop="timePlatform"
                        :rules="[{required: true, message: '请输入发行时间！', trigger: 'blur'}]">
            <el-input v-model="dialogData.timePlatform"
                      prefix-icon="el-icon-medal"
                      placeholder="发行时间">
            </el-input>
          </el-form-item> -->

          <el-form-item label="发行时间"
                        :rules="[{required: true, message: '请输入发行时间！', trigger: 'blur'}]">
            <el-date-picker v-model="dialogData.timePlatform"
                            type="date"
                            :clearable="false"
                            value-format="yyyy-MM-dd"
                            placeholder="发行时间">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="游戏类型"
                        prop="genres"
                        :rules="[{required: true, message: '请输入游戏类型！', trigger: 'blur'}]">
            <el-input v-model="dialogData.genres"
                      prefix-icon="el-icon-tickets"
                      placeholder="游戏类型">
            </el-input>
          </el-form-item>

          <el-form-item label="游戏厂商"
                        prop="publisher"
                        :rules="[{required: true, message: '请输入游戏厂商！', trigger: 'blur'}]">
            <el-input v-model="dialogData.publisher"
                      prefix-icon="el-icon-box"
                      placeholder="不同厂商间以 / 分隔">
            </el-input>
          </el-form-item>

          <el-form-item label="游戏视频"
                        prop="video"
                        :rules="[{required: true, message: '请上传游戏视频！', trigger: 'blur'}]">
            <el-input v-model="dialogData.video"
                      prefix-icon="el-icon-video-camera"
                      placeholder="游戏视频">
            </el-input>
          </el-form-item>

          <el-form-item label="游戏链接"
                        prop="gameUrl"
                        :rules="[{required: true, message: '请输入游戏链接！', trigger: 'blur'}]">
            <el-input v-model="dialogData.gameUrl"
                      prefix-icon="el-icon-paperclip"
                      placeholder="游戏链接">
            </el-input>
          </el-form-item>

          <el-form-item label="游戏标签"
                        prop="tags"
                        :rules="[{required: true, message: '请输入游戏标签！', trigger: 'blur'}]">
            <el-input v-model="dialogData.tags"
                      placeholder="不同标签间以 / 分隔"
                      type="textarea"
                      :autosize="{ minRows: 2, maxRows: 2}">
            </el-input>
          </el-form-item>

          <el-form-item label="游戏评测"
                        prop="evalute">
            <el-input v-model="dialogData.evalute"
                      placeholder="游戏评测"
                      type="textarea"
                      :autosize="true">
            </el-input>
          </el-form-item>

          <el-form-item label="游戏简介"
                        prop="introduce"
                        :rules="[{required: true, message: '请输入游戏简介！', trigger: 'blur'}]">
            <el-input v-model="dialogData.introduce"
                      placeholder="游戏简介"
                      type="textarea"
                      :autosize="true">
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
import { selectByCondition, deleteByIds, insertGame, updateGame } from "@/api/game"
import XLSX from "xlsx"
import { upload } from "@/api/upload"

export default {
  name: "GameManage",

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
        gameName: "",
        platforms: "",
        releaseYear: "",
        genres: "",
        publisher: "",
        tags: "",
        sortId: 1
      },
      // 上传的excel文件列表
      excelList: [],
      // 复选框选中数据集合
      multipleSelection: [],
      //   游戏信息数据
      tableData: [],
      // type，1 更新，2 添加
      type: 1,
      // 上传加载
      uploadLoading: false,
      uploadLoading2: false,
      dialogLoading: false,
      excelLoading: false,

      // 弹出表单的数据
      dialogData: {
        id: "",
        gameName: "",
        gameNameEn: "",
        platforms: "",
        timePlatform: "",
        genres: "",
        publisher: "",
        introduce: "",
        cover: "",
        img: "",
        video: "",
        evalute: "",
        tags: "",
        gameUrl: ""
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
        type: 2,
        page: 1,
        pageSize: 10,
      }

      params.page = page;
      // console.log(params);

      selectByCondition(params).then(res => {
        if (res.code === 1) {
          // console.log(res.data);
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
        gameName: "",
        platforms: "",
        releaseYear: "",
        genres: "",
        publisher: "",
        tags: "",
        sortId: 1
      };

      this.conditionList = empty;
      this.query(1);
    },
    // 将tags按/分隔成数组
    splitTags (tags) {
      return tags.split('/').map(tag => tag.trim()).filter(item => item.trim() != '');
    },
    // 批量删除游戏
    deleteByIds () {
      this.$confirm("是否删除所选信息？", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        // 成功的回调
        deleteByIds(this.multipleSelection).then(res => {
          if (res.code === 1) {
            this.$message.success("所选游戏批量删除成功！");
            this.query(1);
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
    // 批量上传游戏信息
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
              gameName: item["gameName"],
              gameNameEn: item["gameNameEn"],
              platforms: item["platforms"],
              timePlatform: item["timePlatform"],
              genres: item["genres"],
              publisher: item["publisher"],
              introduce: item["introduce"],
              cover: item["cover"],
              img: item["img"],
              video: item["video"],
              evalute: item["evalute"],
              tags: item["tags"],
              gameUrl: item["gameUrl"]
            }
            // 添加游戏信息
            insertGame(excelData).then(res => {
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
    // 移出文件的钩子
    handleRemove () {
      this.excelList = [];
    },
    // 移出文件前的钩子
    beforeRemove (file) {
      return this.$confirm(`确定移除 ${file.name}？`);
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
    // 点击添加按钮
    handleInsert () {
      // 正常添加一条数据
      if (this.excelList.length === 0) {
        this.dialogData = {
          id: "",
          gameName: "",
          gameNameEn: "",
          platforms: "",
          timePlatform: "",
          genres: "",
          publisher: "",
          introduce: "",
          cover: "",
          img: "",
          video: "",
          evalute: "",
          tags: "",
          gameUrl: ""
        }
        this.dialogFormVisible = !this.dialogFormVisible;
        this.type = 2;
      } else {
        // 批量添加xls中的数据
        this.$refs.importExcel.submit();
      }
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
      this.dialogData.id = row.id;
      this.dialogData.gameName = row.gameName;
      this.dialogData.gameNameEn = row.gameNameEn
      this.dialogData.platforms = row.platforms;
      this.dialogData.timePlatform = row.timePlatform;
      this.dialogData.genres = row.genres;
      this.dialogData.publisher = row.publisher;
      this.dialogData.introduce = row.introduce;
      this.dialogData.cover = row.cover;
      this.dialogData.img = row.img;
      this.dialogData.video = row.video;
      this.dialogData.evalute = row.evalute;
      this.dialogData.tags = row.tags;
      this.dialogData.gameUrl = row.gameUrl;
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
            this.$message.success("游戏信息删除成功！");
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
    // 上传截图
    uploadImg (params) {
      const { file } = params;
      const formData = new FormData();
      // 加载中
      this.uploadLoading2 = true;

      formData.append("file", file);

      upload(formData).then((res) => {
        if (res.code === 1) {
          this.dialogData.img = res.data;
          this.uploadLoading2 = false;
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
    // 添加游戏信息
    insertInfo () {
      this.dialogLoading = true;

      let tempTime = this.dialogData.timePlatform.slice(0, 10) + "(" + this.splitTags(this.dialogData.platforms)[0] + ")";
      this.dialogData.timePlatform = tempTime;

      insertGame(this.dialogData).then(res => {
        if (res.code === 1) {
          this.query(1);
          this.dialogLoading = false;
          this.$message.success("游戏信息添加成功！");
          this.dialogFormVisible = false;
        } else {
          this.$message.error(res.msg);
          this.dialogFormVisible = false;
        }
      }).catch(err => {
        console.log(err);
      })
    },

    // 更新游戏信息
    updateInfo () {
      this.dialogLoading = true;

      let tempTime = this.dialogData.timePlatform.slice(0, 10) + "(" + this.splitTags(this.dialogData.platforms)[0] + ")";

      this.dialogData.timePlatform = tempTime;

      updateGame(this.dialogData).then(res => {
        if (res.code === 1) {
          this.query(this.pagination.currentPage);
          this.dialogLoading = false;
          this.$message.success("游戏信息更新成功！");
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
        // console.log("watch");
        this.query(this.pagination.currentPage);
      }
    }
  }
}
  </script>
  
  <style scoped>
.GameManage {
  display: flex;
  /* border: 1px solid red; */
  flex-direction: column;
}

/* *************************************************** */
.filters {
  margin: 10px 0px;
  /* border: 1px solid orange; */
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
  /* width: 200px; */
  width: 120px;
  line-height: 35px;
  /* border: 1px solid red; */
  text-align: center;
}

.filters .input .item >>> .el-select .el-input .el-select__caret {
  display: none;
}

/* *************************************************** */
.filters .button {
  display: flex;
  /* justify-content: space-between; */
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
.table {
  /* border: 1px solid red; */
}

.table >>> .el-table th.el-table__cell > .cell,
.table >>> .el-table .cell {
  text-align: center;
  /* border:1px solid red; */
  /* 限制文字显示行数 */
  /* text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden; */
}

/* 游戏名称列 */
.table >>> .el-table td:nth-child(2) div {
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
}

/* 标签列 */
.table >>> .el-table td:nth-child(5) div,
.table >>> .el-table td:nth-child(8) div {
  text-align: left;
  display: flex;
  flex-flow: wrap;
  justify-content: center;
  /* border: 1px solid red; */
}

.table >>> .el-table td:nth-child(5) div .el-tag,
.table >>> .el-table td:nth-child(8) div .el-tag {
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
.GameManage >>> .el-dialog {
  /* border: 1px solid red; */
  border-radius: 4px;
}

.GameManage >>> .el-dialog__body {
  padding-top: 10px;
  padding-bottom: 10px;
}

.GameManage >>> .el-dialog__header span {
  color: var(--primaryColor);
  font-size: 16px;
  font-weight: bold;
}

.GameManage >>> .el-input__icon,
.GameManage >>> .el-input__inner {
  /* border:1px solid red; */
  height: 35px;
  line-height: 35px;
  display: flex;
  align-items: center;
}

.GameManage >>> .table .el-input__inner,
.GameManage >>> .table .el-input-number {
  /* border: 1px solid red; */
  align-items: center;
  justify-content: center;
  display: flex;
  width: 480px;
  height: 35px;
  line-height: 35px;
}

.GameManage >>> .table .el-input-number__decrease,
.GameManage >>> .table .el-input-number__increase {
  /* top:0px !important; */
  height: 33px;
}

.GameManage >>> .table .el-form-item {
  /* margin-bottom: 5px; */
}

.GameManage >>> .el-input__icon {
  margin-left: 5px;
}

.GameManage >>> .el-dialog__headerbtn .el-dialog__close:hover {
  color: var(--primaryColor);
}

.GameManage >>> .el-textarea__inner:active {
  border-color: var(--primaryColor);
}

.GameManage >>> .el-dialog__footer div button {
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

.GameManage >>> .el-dialog__footer div button::before {
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

.GameManage >>> .el-dialog__footer div button:hover::before {
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

.cover{
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