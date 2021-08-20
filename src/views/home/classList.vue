<template>
  <div class="page">
    <el-tag
        :key="tag"
        v-for="tag in dynamicTags"
        closable
        :disable-transitions="false"
        @close="handleDelTag(tag)">
      {{tag}}
    </el-tag>
    <el-button class="button-new-tag" size="small" @click="addTag">+新增标签</el-button>
    <el-dialog
        title="编辑标签"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
      <span>
        <el-checkbox-group v-model="checkedTag">
          <el-checkbox class="checkbox" v-for="item in tags" :label="item" :key="item">{{item}}</el-checkbox>
        </el-checkbox-group>
      </span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false" size="small">取消</el-button>
    <el-button type="primary" @click="saveTag" size="small">保存</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dynamicTags: ['标签一', '标签二', '标签三'],
      dialogVisible: false,
      checkedTag: [],
      tags: ['标签一', '标签二', '标签三','标签四', '标签五', '标签六','标签七', '标签八', '标签九','标签十', '标签十一', '标签十二','标签十三', '标签十四', '标签十五']
    };
  },
  methods: {
    handleDelTag(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    addTag() {
      this.dialogVisible = true;
      this.checkedTag = JSON.parse(JSON.stringify(this.dynamicTags))
    },
    handleClose() {
      this.dialogVisible = false
    },
    saveTag() {
      this.dialogVisible = false;
      this.dynamicTags = JSON.parse(JSON.stringify(this.checkedTag))
    }
  }
};
</script>

<style scoped lang="less">
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .checkbox {
    margin: 10px;
  }
</style>
