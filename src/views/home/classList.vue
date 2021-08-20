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
    <el-button class="button-new-tag" size="small" @click="addTag">+新增班级</el-button>
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
      dynamicTags: ['班级一', '班级二', '班级三'],
      dialogVisible: false,
      checkedTag: [],
      tags: ['班级一', '班级二', '班级三','班级四', '班级五', '班级六','班级七', '班级八', '班级九','班级十', '班级十一', '班级十二','班级十三', '班级十四', '班级十五']
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
