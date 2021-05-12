<template>
  <div class="aside">
    <el-menu
      :default-active="this.$route.path"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#29394d"
      text-color="#fff"
      active-text-color="#409EFF"
      router
      >
      <!-- <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
      </el-submenu> -->
      <el-menu-item v-for="(item, index) in routerList" :key="index" :index="item.url">
        <i class="el-icon-menu"></i>
        <span slot="title">{{item.name}}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import routerList from './data/routerList';
export default {
  data() {
    return {
      routerList: [],
    }
  },
  created() {
    this.routerList = routerList.router_list;
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style>
.aside {
  height: 100%;
  overflow-y: scroll;
}
.el-menu-vertical-demo {
   height: 100%;
}
</style>>
