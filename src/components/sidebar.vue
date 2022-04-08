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
      :collapse="collapse"
      >
      <template v-for="(item, index) in routerList">
        <el-submenu
          class="submenu"
          v-if="item.children"
          :key="index"
          :index="item.url"
        >
          <template>
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{ item.name }}</span>
            </template>
            <router-link
              style="text-decoration: none"
              v-for="subItem in item.children"
              :to="{ path: subItem.url }"
              :key="subItem.url"
            >
              <el-menu-item :index="subItem.url" style="padding-left: 55px">
                {{ subItem.name }}
              </el-menu-item>
            </router-link>
          </template>
        </el-submenu>
        <router-link
            v-else
            class="routerLink submenu"
            :to="{ path: item.url }"
            :key="index">
          <el-menu-item  :index="item.url">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
        </router-link>
      </template>

    </el-menu>
  </div>
</template>

<script>
import { sideList } from '@/api/sideBar'
export default {
  data() {
    return {
      routerList: [],
    }
  },
  props: ['collapse'],
  created() {
    sideList().then(res => {
      if (res.code === 0) {
        this.routerList = res.data
      } else {
        this.$message.error(res.msg)
      }
    })
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

<style lang="less">
.aside {
  height: 100%;
  overflow-y: scroll;
}
.el-menu-vertical-demo {
   height: 100%;
  .submenu {
    text-align: left;
  }
}
.routerLink {
  text-decoration: none;
}
</style>>
