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
    <el-popover
      id="popover"
      placement="top-start"
      title="标题"
      width="200"
      trigger="hover"
      content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
      <el-button size="small" style="margin-left: 10px" type="primary" slot="reference">hover 激活</el-button>
    </el-popover>
    <div style="margin-top: 20px">
      <draggable v-model="arr2" group="site" animation="300" dragClass="dragClass" ghostClass="ghostClass" chosenClass="chosenClass" @start="onStart" @end="onEnd">
        <transition-group>
          <el-card style="margin-top: 10px" class="item" v-for="item in dragList" :key="item.typeId">
            <div slot="header" class="clearfix">
              <span>{{item.type}}</span>
            </div>
            <draggable v-model="item.data" group="site" animation="300" dragClass="dragClass"  ghostClass="ghostClass" chosenClass="chosenClass" @start="sonStart" @end="sonEnd">
              <transition-group>
                <div class="item" v-for="(sonItem) in item.data" :key="sonItem.name + sonItem.id">
                  <el-input size="small" v-model="sonItem.name" placeholder=""></el-input>
                </div>
              </transition-group>
            </draggable> 
          </el-card>
        </transition-group>
      </draggable> 
    </div>
  </div>
</template>

<script>
import { getClassTags, addTagList, saveTag, delTag } from '@/api/tableList'
import draggable from 'vuedraggable'
export default {
  components: {
    draggable
  },
  data() {
    return {
      dynamicTags: [],
      dialogVisible: false,
      checkedTag: [],
      tags: [],
      arr2: [],
      dragList: [
        {
          typeId: 111,
          type: 'A',
          data: [
            {id:1,name:'www.itxst.com'},
            {id:2,name:'www.jd.com'},
            {id:3,name:'www.baidu.com'},
            {id:3,name:'www.taobao.com'}
          ]
        },
        {
          type: 'B',
          typeId: 222,
          data: [
            {id:4,name:'title4'},
            {id:5,name:'title5'},
            {id:6,name:'title6'},
            {id:7,name:'title7'}
          ]
        },
         {
          type: 'C',
          typeId: 333,
          data: [
            {id:8,name:'title8'},
            {id:9,name:'title9'},
            {id:10,name:'title10'},
            {id:11,name:'title11'}
          ]
        },
      ]
    };
  },
  created() {
    this.getTagList();
    this.getAddTagList();
    this.arr2 = JSON.parse(JSON.stringify(this.dragList))
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
    },
    onStart() {
      console.log('start')
    },
    onEnd() {
      console.log('end')
      console.log(this.arr2, 171)
    },
    sonStart() {
      console.log('sonStart')
    },
    sonEnd() {
      console.log('sonEnd')
      console.log(this.dragList, 177)
    }
  },
  mounted() {
    let fatherDom = document.getElementById('popover')
    let tempDom = document.getElementById(fatherDom.children[0].id)
    let small = document.createElement('span')
    small.innerHTML = '我是小字'
    small.style.fontSize = '10px'
    small.style.marginLeft = '5px'
    tempDom.children[0].appendChild(small)
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
