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
          <el-button type="primary" round size="mini">
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
            <template>
              <i class="el-icon-view icon"></i>
              <i class="el-icon-edit icon"></i>
              <i class="el-icon-delete icon"></i>
            </template>
          </el-table-column>
        </el-table>
        <div class="pager">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            background
            :current-page="current"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount"
          ></el-pagination>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getArticleList } from '@/api/article'
export default {
  name: 'ArticleIndex',
  data() {
    return {
      current: 1,
      pageSize: 10,
      tableData: [],
      totalCount: null
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
}
</style>
