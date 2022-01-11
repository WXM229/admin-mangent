<template>
  <div>
    <el-card>
      <i class="el-icon-s-tools" @click="showDialog"></i>
      <setForm ref="setForm" :groupList="group_list"></setForm>
      <formDrawer :drawer.sync="drawer" @formChange="formChange"></formDrawer>
    </el-card>
    <el-button type="primary" @click="searchForm">查询</el-button>
  </div>
</template>

<script>
import formDrawer from "@/components/tools/form_drawer";
import setForm from "@/components/tools/set_form";
export default {
  data() {
    return {
      form: {
        city: "",
        time: "",
        status: "",
        intention: "",
        hello: "",
      },
      group_list: [],
      drawer: false,
    };
  },
  methods: {
    showDialog() {
      this.drawer = true;
    },
    formChange(list) {
      console.log(list, 64);
      this.group_list = list;
    },
    searchForm() {
      console.log(this.$refs.setForm, 99)
    },
  },
  components: {
    formDrawer,
    setForm,
  },
};
</script>

<style lang="less" scoped>
.el-icon-s-tools {
  color: #18be78;
  font-size: 20px;
  float: right;
}
</style>
