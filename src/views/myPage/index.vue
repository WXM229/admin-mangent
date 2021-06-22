<template>
  <div>
    <el-card>
      <el-button type="primary" @click="add">添加</el-button>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {},
      handle: {},
      count: 1,
    };
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
}
</style>
