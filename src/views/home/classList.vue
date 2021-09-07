<template>
  <div class="page">
    <el-tag
        :key="tag.tagId"
        v-for="tag in dynamicTags"
        closable
        :disable-transitions="false"
        @close="handleDelTag(tag.tagId)">
      {{tag.tagName}}
    </el-tag>
    <el-button class="button-new-tag" size="small" @click="addTag">+新增班级</el-button>
    <el-dialog
        title="编辑标签"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
      <span>
        <el-checkbox-group v-model="checkedTag">
          <el-checkbox class="checkbox" v-for="item in tags" :label="item.tagId" :key="item.tagId">{{item.tagName}}</el-checkbox>
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
import { getClassTags, addTagList, saveTag, delTag } from '@/api/tableList'
export default {
  data() {
    return {
      dynamicTags: [],
      dialogVisible: false,
      checkedTag: [],
      tags: []
    };
  },
  created() {
    this.getTagList();
    this.getAddTagList();
  },
  methods: {
    async getTagList() {
      await getClassTags().then(res => {
        if (res.code === 0) {
          this.dynamicTags = res.data;
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    async getAddTagList() {
      await addTagList().then(res => {
        if (res && res.code === 0) {
          this.tags = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleDelTag(tag) {
      delTag({ tagId: tag }).then(res => {
        if (res.code === 0) {
          this.getTagList()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    addTag() {
      this.dialogVisible = true;
      const tempAry = [];
      for (let i in this.dynamicTags) {
        for (let k in this.tags) {
          if (this.dynamicTags[i].tagId === this.tags[k].tagId) {
            tempAry.push(this.dynamicTags[i].tagId)
          }
        }
      }
      this.checkedTag = JSON.parse(JSON.stringify(tempAry))
    },
    handleClose() {
      this.dialogVisible = false
    },
    async saveTag() {
      let ary = [];
      ary = this.checkedTag;
      this.dialogVisible = false;
      await saveTag({checkTag: ary}).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg);
          this.getTagList();
        } else {
          this.$message.error('添加失败')
        }
      })
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
