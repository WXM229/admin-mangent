<template>
  <div>
    <el-card>
      <el-tabs v-model="activeName">
        <el-tab-pane label="用户管理" name="first">
          <tabsComponent :activeName="activeName"></tabsComponent>
        </el-tab-pane>
        <el-tab-pane label="配置管理" name="second">
          <tabsComponent :activeName="activeName"></tabsComponent>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import tabsComponent from "./component/tabs_component";
export default {
  components: { tabsComponent },
  data() {
    return {
      activeName: 'first'
    }
  },
}
</script>

<style scoped>

</style>
