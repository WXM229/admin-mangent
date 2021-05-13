<template>
  <div class="breadCrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item, index) in breadCrumb_list" :key="index"  :to="item.path">
        {{item.meta.title}}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
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
      this.breadCrumb_list = to.matched
    }
  }
};
</script>

<style>
.breadCrumb {
  height: 100%;
}
.el-breadcrumb {
  line-height: 2;
  margin-bottom: 10px;
}
</style>