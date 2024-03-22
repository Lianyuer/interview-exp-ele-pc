<template>
  <div class="login-page">
    <el-card class="box-card">
      <div slot="header">登录</div>
      <el-form :model="formData" status-icon :rules="rules" ref="form" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="formData.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="formData.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item class="actions">
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'LoginIndex',
  data() {
    return {
      formData: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: ['blur', 'change'] },
          { min: 5, max: 11, message: '长度在5-11位', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: ['blur', 'change'] },
          { pattern: /^\w{5,11}$/, message: '长度在5-11位', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  methods: {
    async onSubmit() {
      await this.$refs.form.validate()
    },
    async resetForm() {
      await this.$refs.form.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  height: 100%;
  background: url('@/assets/login-bg.svg') no-repeat center center;
  background-size: cover;
  .el-card {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    width: 480px;
    margin: auto;
    ::v-deep .el-card__header {
      background-color: #727cf5;
      color: #fff;
      div {
        text-align: center;
      }
    }
    .el-card__body {
      .el-form {
        .actions {
          text-align: center;
          ::v-deep .el-form-item__content {
            margin: 0 !important;
          }
        }
      }
    }
  }
}
</style>
