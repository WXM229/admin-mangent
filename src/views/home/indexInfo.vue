<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model='form.name'></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" size="small" @click="submitChange">提交</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: ''
      }
    }
  },
  props:['userInfo'],
  created() {
    console.log(this.userInfo, 'userInfo')
  },
  methods: {
    submitChange() {
      this.userInfo.name = this.form.name
    }
  }
}
</script>

<style>

</style>