<template>
  <div>
    <div v-if="activeName === 'first'">用户管理</div>
    <div v-else>配置管理</div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  props: ['activeName']
}
</script>

<style scoped>

</style>
