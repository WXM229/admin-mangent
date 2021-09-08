<template>
  <div class="page">
    <div class="uUsed">
      <h1>已使用</h1>
      <div class="d-list">
        <draggable v-model="usedList" group="drag" :list="usedList" @start="drag=true" @end="drag=false">
          <div class="d-content" v-for="item in usedList" :key="item.key">
            <span>{{item.label}}</span>
          </div>
        </draggable>
      </div>
    </div>
    <div class="uUsed">
      <h1>未使用</h1>
      <div class="d-list">
        <draggable v-model="unUsedList" group="drag" :list="unUsedList" @start="drag=true" @ended="drag=false">
          <div class="d-content" v-for="item in unUsedList" :key="item.key">
            {{item.label}}
          </div>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  data() {
    return {
      drag: false,
      usedList: [],
      unUsedList: []
    }
  },
  components: {
    draggable
  },
  props: {
    columns: {
      type: Array,
      required: true
    },
    columnsAction: {
      type: Object,
      required: false
    }
  },
  created() {
    const tempAry = [];
    if (this.columns && this.columns.length > 0) {
      this.columns.map((item) => {
        // eslint-disable-next-line no-prototype-builtins
        if (item.hasOwnProperty('key')) {
          tempAry.push(item)
        }
      })
    }
    this.usedList = JSON.parse(JSON.stringify(tempAry));
  },
  watch: {
    usedList(val) {
      this.$emit('columnChange', val)
    }
  }
}
</script>

<style scoped lang="less">
  .page {
    display: flex;
    justify-content: center;
    margin: auto;
    .uUsed {
      flex: 1;
      text-align: -webkit-center;
      .d-list {
        width: 150px;
        /*height: 100%;*/
        height: 360px;
        border: 1px solid #cccccc;
        .d-content {
          text-align: center;
          border-bottom: 1px solid #cccccc;
          line-height: 40px;
        }
      }
    }
  }
</style>
