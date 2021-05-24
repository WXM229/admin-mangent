<template>
  <div>
    <el-card>
      <slot name="header"></slot>
      <el-checkbox-group v-model="checkList">
         <el-checkbox v-for="item in checkData" :label="item" :key="item">{{item}}</el-checkbox>
      </el-checkbox-group>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkList: [],
      checkData: ["选中且禁用", "复选框 A"],
    };
  },
};
</script>

<style>
</style>
