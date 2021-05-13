<template>
  <div class="aside">
    <el-container style="height: 100%;">
      <el-aside width="250px">
        <side-bar></side-bar>
      </el-aside>
      <el-container>
        <el-header>
          <el-button type="text" style="float: right; margin-top: 10px" @click="singout">退出登录</el-button>
          <bread-crumb></bread-crumb>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import sideBar from './sidebar'
import breadCrumb from './breadCrumb'
export default {
  components: {
    sideBar,
    breadCrumb
  },
  methods: {
    singout() {
      this.$router.push('/login')
    }
  }
};
</script>

<style>
html,body,#app,.el-container {
  padding: 0px;
  margin: 0px;
  height: 100%;
}
.aside {
  height: 100%;
  overflow-y: scroll;
}
.el-header, .el-footer {
  background-color: #ffffff;
  color: #333;
  text-align: center;
  line-height: 40px;
}

.el-aside {
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #f7f7f7;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>