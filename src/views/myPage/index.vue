<template>
  <div>
    <el-card>
      <slot name="header"></slot>
      <el-checkbox-group v-model="checkList">
        <el-checkbox v-for="item in checkData" :label="item" :key="item">{{
          item
        }}</el-checkbox>
      </el-checkbox-group>
    </el-card>
    <el-card>
      <div slot="header"></div>
      <el-button type="primary" @click="add">添加</el-button>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkList: [],
      checkData: ["选中且禁用", "复选框 A"],
      list: [
        { id: 1, name: "xxx" },
        { id: 2, name: "vvvv" },
      ],
      info: {},
      handle: {},
      count: 1,
    };
  },
  created() {
  },
  methods: {
    add() {
      console.log(123)
      var i = 1;
      this.handle = setInterval(() => {
        i++;
        if (i === 3) {
        clearInterval(this.handle);
      }
      }, 1000);
    },
  },
};
</script>

<style>
.parent {
  display: flex;
  width: 100%;
  height: 200px;
  flex-wrap: wrap;
  justify-content: space-around;
}
.son {
  border: 3px solid #ffffff;
  background: chocolate;
  flex: 1;
  min-width: 24%;
  max-width: 24%;

  /* flex: 0 0 25%; */
}
</style>
