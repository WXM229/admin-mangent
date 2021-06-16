<template>
  <div class="page">
    <div class="content">
      <h1>后台管理系统</h1>
      <el-form style="margin-top: 50px" ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="">
          <el-input style="max-width:400px" v-model="form.num" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item label="">
          <el-input style="max-width:400px" v-model="form.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="singIn">Login</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        password: '',
        num: ''
      },
      rules: {
        num: [
          {required: true, message: '请输入账号', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    singIn() {
       if (this.form.num && this.form.password) {
         this.$message({
           message: '登录成功',
           type: 'success'
         })
         localStorage.setItem('user', this.form.num)
         this.$router.push('/home/index')
       } else {
         this.$message.error('请先输入账号密码在进行登录哦~')
       }
    }
  }
}
</script >

<style lang="less" scoped>
.page {
  width: 100%;
  padding-top: 1px;
  background-color: #2b384c;
  height: 850px;
  .content {
    width: 100%;
    background-color: #2b384c;
    color: #ffffff;
    height: 100%;
    margin: 150px auto;
    text-align: center;
  }
}
</style>
