<template>
  <div class="page">
    <Index>
      <h1 slot="header">这是父组件的slot替代内容</h1>
    </Index>
  </div>
</template>

<script>
import Index from '../myPage/index'
export default {
  data() {
    return {

    };
  },
  components: {
    Index
  }
};
</script>

<style scoped>
</style>
