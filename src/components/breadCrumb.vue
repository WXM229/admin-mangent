<template>
  <div class="breadCrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data() {
    return {
      breadCrumb_list: []
    }
  },
  created() {
    this.breadCrumb_list = this.$route.matched
  },
  watch: {
    $route(to) {
      console.log(to, '70')
    }
  }
};
</script>

<style>
.breadCrumb {
  height: 100%;
}
.el-breadcrumb {
  line-height: 4;
}
</style>