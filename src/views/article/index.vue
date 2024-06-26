<template>
  <div class="article-page">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>面经管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main">
      <el-card class="box-card">
        <template #header>
          <div class="count">当前页共{{ tableData.length }}条数据</div>
          <el-button type="primary" round size="mini" @click="openDrawer('add')">
            <i class="el-icon-plus"></i>
            添加面经
          </el-button>
        </template>
        <el-table :data="tableData" height="645" style="width: 100%">
          <el-table-column prop="stem" label="标题" width="180"></el-table-column>
          <el-table-column prop="creator" label="作者" width="180"></el-table-column>
          <el-table-column prop="likeCount" label="点赞数"></el-table-column>
          <el-table-column prop="createdAt" label="更新时间"></el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <i class="el-icon-view icon" @click="openDrawer('preview', scope.row)"></i>
              <i class="el-icon-edit icon" @click="openDrawer('edit', scope.row)"></i>
              <el-popconfirm title="这是一段内容确定删除吗？" @confirm="del(scope.row.id)">
                <i class="el-icon-delete icon" slot="reference"></i>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <div class="pager">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            background
            :current-page="current"
            :page-sizes="[3, 10, 20, 30, 40]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount"
          ></el-pagination>
        </div>
      </el-card>
    </div>

    <el-drawer
      :title="titleType"
      size="50%"
      :visible.sync="isShowDrawer"
      :direction="direction"
      :before-close="handleClose"
    >
      <el-form
        :model="formData"
        status-icon
        :rules="rules"
        ref="form"
        label-width="100px"
        v-if="drawerType != 'preview'"
      >
        <el-form-item label="标题" prop="stem">
          <el-input type="text" v-model="formData.stem" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <quillEditor
            v-model="formData.content"
            @blur="$refs.form.validateField('content')"
          ></quillEditor>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="previewBox" v-else>
        <div class="header">
          <h3 class="headline">{{ currentArticle.stem }}</h3>
          <div class="info">
            <img :src="currentArticle.avatar" alt="" />
            <div class="right">
              <div class="create">
                {{ currentArticle.creator }} | {{ currentArticle.createdAt }}
              </div>
              <div class="data">
                点赞数 {{ currentArticle.likeCount }} | 阅读数 {{ currentArticle.views }}
              </div>
            </div>
          </div>
        </div>
        <div class="content" v-html="currentArticle.content"></div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import {
  getArticleList,
  createArticle,
  getArticleById,
  updateArticle,
  delArticle
} from '@/api/article'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  name: 'ArticleIndex',
  components: {
    quillEditor
  },
  data() {
    return {
      current: 1,
      pageSize: 10,
      tableData: [],
      totalCount: null,
      isShowDrawer: false,
      direction: 'rtl',
      drawerType: 'add',
      formData: {
        stem: '',
        content: ''
      },
      currentArticle: {},
      rules: {
        stem: [{ required: true, message: '请输入标题', trigger: ['blur', 'change'] }],
        content: [{ required: true, message: '请输入内容', trigger: ['blur', 'change'] }]
      }
    }
  },
  computed: {
    titleType() {
      let title = null
      if (this.drawerType === 'add') title = '新增面经'
      if (this.drawerType === 'preview') title = '预览面经'
      if (this.drawerType === 'edit') title = '修改面经'
      return title
    }
  },
  methods: {
    async initData() {
      const { data } = await getArticleList(this.current, this.pageSize)
      console.log(data)
      this.tableData = data.rows
      this.totalCount = data.total
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.initData()
    },
    handleCurrentChange(val) {
      this.current = val
      this.initData()
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(() => {
          done()
          this.resetForm()
        })
        .catch(() => {})
    },
    async del(id) {
      await delArticle(id)
      this.$message.success('删除成功')
      if ((this.formData.length = 1 & (this.current > 1))) {
        this.current--
      }
      this.initData()
    },
    async openDrawer(type, data) {
      this.isShowDrawer = true
      this.drawerType = type
      if (type === 'preview') {
        const res = await getArticleById(data.id)
        this.currentArticle = res.data
        console.log(this.currentArticle)
      }
      if (type === 'edit') {
        const res = await getArticleById(data.id)
        this.formData = res.data
      }
    },
    async onSubmit() {
      await this.$refs.form.validate()
      if (this.drawerType === 'add') {
        await createArticle(this.formData)
        this.$message.success('新增成功')
        this.isShowDrawer = false
        this.resetForm()
        this.initData()
      }
      if (this.drawerType === 'edit') {
        await updateArticle(this.formData)
        this.$message.success('修改成功')
        this.isShowDrawer = false
        this.resetForm()
        this.initData()
      }
    },
    resetForm() {
      this.$refs.form.resetFields()
    }
  },
  async mounted() {
    this.initData()
  }
}
</script>

<style lang="scss" scoped>
.article-page {
  height: 100%;
  .el-breadcrumb {
    margin-bottom: 20px;
  }
  .main {
    .el-card {
      ::v-deep .el-card__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      ::v-deep .el-card__body {
        padding-bottom: 0;
        .pager {
          text-align: center;
          margin: 20px 0;
        }
        .el-table {
          .icon {
            font-weight: 700;
            font-size: 16px;
            margin: 0 3px;
            color: #b2b2b2;
            &:hover {
              color: orange;
              cursor: pointer;
            }
          }
        }
      }
    }
  }

  .el-drawer__body {
    .el-form {
      padding-right: 50px;
    }
  }

  ::v-deep .el-form-item__content {
    .quill-editor {
      display: flex;
      flex-direction: column;
      height: 600px;
      .ql-container {
        overflow: hidden;
      }
    }
  }
  .previewBox {
    padding: 0 40px 0;
    .header {
      .headline {
        margin: 18px 0;
      }
      .info {
        display: flex;
        align-items: center;
        img {
          width: 30px;
          height: 30px;
          margin-right: 16px;
        }
        .right {
          font-size: 14px;
          color: gray;
        }
      }
    }
  }
}
</style>
