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
      <template v-for="(item, index) in routerList">
        <el-submenu
          v-if="item.children"
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
        <router-link
            v-else
            class="routerLink"
            :to="{ path: item.url }"
            :key="index">
          <el-menu-item  :index="item.url">
            <i class="el-icon-location"></i>
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
        </router-link>
      </template>

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
.routerLink {
  text-decoration: none;
}
</style>>
