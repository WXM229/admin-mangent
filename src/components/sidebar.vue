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
      >
      <el-submenu
        v-for="(item, index) in routerList"
        :key="index"
        :index="item.url"
      >
        <template>
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>{{ item.name }}</span>
          </template>
          <router-link
            style="text-decoration: none"
            v-for="subItem in item.children"
            :to="{ path: subItem.url }"
            :key="subItem.url"
          >
            <el-menu-item :index="subItem.url">
              {{ subItem.name }}
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>

      <!-- <el-menu-item v-for="(item, index) in routerList" :key="index" :index="item.url">
        <i class="el-icon-menu"></i>
        <span slot="title">{{item.name}}</span>
      </el-menu-item> -->
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
    console.log(this.routerList, 'list')
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
