<template>
  <div class="layout-page">
    <el-container>
      <el-aside width="200px">
        <el-col :span="24">
          <h3 class="tit">面经管理后台</h3>
          <el-menu
            :default-active="defaultActive"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            router
          >
            <el-menu-item index="/dashboard">
              <i class="el-icon-data-analysis"></i>
              <span slot="title">数据看板</span>
            </el-menu-item>
            <el-menu-item index="/article">
              <i class="el-icon-notebook-2"></i>
              <span slot="title">面经管理</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-aside>
      <el-container class="header-container">
        <el-header>
          <div class="right">
            <div class="user">
              <img :src="userInfo.avatar" alt="" />
              <div class="username">{{ userInfo.name }}</div>
            </div>
            <el-popconfirm title="这是一段内容确定删除吗？">
              <i class="el-icon-switch-button exitBtn" slot="reference"></i>
            </el-popconfirm>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
export default {
  name: 'LayoutIndex',
  data() {
    return {
      defaultActive: this.$route.path,
      userInfo: {}
    }
  },
  async mounted() {
    const { data } = await getUserInfo()
    console.log(data)
    this.userInfo = data
  }
}
</script>

<style lang="scss" scoped>
.layout-page {
  height: 100%;
  background-color: #fafbfe;

  .el-container {
    height: 100%;

    .el-aside {
      background-color: #545c64;
      .el-col {
        .tit {
          color: #fff;
          text-align: center;
        }
        .el-menu {
          width: 100%;
          .el-menu-item {
            width: 100%;
          }
        }
      }
    }

    .header-container {
      .el-header {
        background-color: #fff;
        display: flex;
        justify-content: end;
        align-items: center;

        .right {
          height: 100%;
          display: flex;
          align-items: center;
          .user {
            height: 100%;
            display: flex;
            align-items: center;
            margin-right: 20px;
            background-color: #eee;
            padding: 0 20px;

            img {
              width: 35px;
              height: 35px;
              margin-right: 7px;
            }
            .username {
              height: 16px;
              line-height: 16px;
              font-size: 14px;
              &:hover {
                color: blueviolet;
                cursor: pointer;
              }
            }
          }
          .exitBtn {
            cursor: pointer;
            font-weight: 700;
            font-size: 18px;
          }
        }
      }
    }
  }
}
</style>
