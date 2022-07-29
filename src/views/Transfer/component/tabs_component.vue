<template>
  <div class="app-container">
    <div class="count">
      {{count}}
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref,Ref } from 'vue';
  let count: Ref<number> = ref(123);

</script>

<style scoped lang="less">
.app-container {
  font-size: 20px;
  .count {
    color: red;
  }
}
</style>
