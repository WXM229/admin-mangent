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
      activeName: 'first',
      messageObj: {},
      list: [],
    }
  },
  methods: {
    // myIntanceOf(left, right) {
    //   let proto = Object.getPrototypeOf(left);
    //   const prototype = right.prototype;

    //   while(true) {
    //     if (!proto) return false
    //     if (proto === prototype) return true
    //     proto = Object.getPrototypeOf(proto)
    //   }
    // }
  }
}
</script>

<style scoped lang="less">
  .card {
    display: flex;
    margin-top: 10px;
    .card-item {
      margin-right: 20px;
      .borderBottom {
        margin-top: 10px;
        width: 40px;
        height: 2px;
        background: #18BE78;
      }
    }
  }
  .content {
    margin-top: 20px;
    display: flex;
    .content1 {
      width: 300px;
      height: 100px;
      border: 1px solid #ccc;
      border-radius: 5px;
      display: flex;
      .left {
        padding: 5px;
        width: 50px;
        border-right: 1px solid #cccccc;
        div {
          line-height: 2;
        }
      }
      .right {
        padding: 5px;
        div {
          line-height: 2;
        }
      }
    }
    .content2 {
    }
  }
</style>
