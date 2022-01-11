<template>
  <div>
    <el-drawer size="20%" :visible.sync="showDialog" :direction="direction">
      <div>
        <draggable
          :list="new_group_list"
          group="site"
          animation="300"
          dragClass="dragClass"
          ghostClass="ghostClass"
          chosenClass="chosenClass"
        >
          <transition-group>
            <el-card
              style="margin-top: 10px"
              class="item"
              v-for="item in new_group_list"
              :key="item.id"
            >
              <div slot="header" class="clearfix">
                <span>{{ item.title }}</span>
              </div>
              <draggable
                :list="item.data"
                group="site"
                animation="300"
                dragClass="dragClass"
                ghostClass="ghostClass"
                chosenClass="chosenClass"
              >
                <el-checkbox
                  v-for="sonItem in item.data"
                  v-model="checkList"
                  @change="
                    (e) => {
                      checkChange(e, item, sonItem);
                    }
                  "
                  :key="sonItem.key"
                  :label="sonItem.key"
                  >{{ sonItem.label }}</el-checkbox
                >
              </draggable>
            </el-card>
          </transition-group>
        </draggable>
        <div class="demo-drawer__footer" style="margin-top: 10px">
          <el-button size="small" @click="cancelForm">取 消</el-button>
          <el-button size="small" type="primary" @click="submit"
            >确 定</el-button
          >
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import lodash from "lodash";
export default {
  data() {
    return {
      group_list: [],
      new_group_list: [],
      showDialog: false,
      list: [],
      dialog: false,
      dialogForm: {},
      value: "",
      direction: "rtl",
      checkList: [],
      ary: [],
    };
  },
  props: {
    drawer: {
      type: Boolean,
    },
  },
  methods: {
    getFormList() {
      this.group_list = [
        {
          id: 1,
          title: "学员信息",
          data: [
            {
              key: "city",
              label: "所在城市",
              type: 'input'
            },
            {
              key: "time",
              label: "注册时间",
              type: 'datePicker'
            },
            {
              key: "student_status",
              label: "学员状态",
              type: 'select'
            },
            {
              key: "intention",
              label: "付费意向",
              type: 'select'
            },
          ],
        },
        {
          id: 2,
          title: "跟进信息",
          data: [
            {
              key: "hello",
              label: "你好",
              type: 'input'
            },
            {
              key: "lll",
              label: "啦啦啦",
              type: 'input'
            },
          ],
        },
      ];
      this.new_group_list = [
        {
          id: 1,
          title: "学员信息",
          data: [
            {
              key: "city",
              label: "所在城市",
              type: 'input'
            },
            {
              key: "time",
              label: "注册时间",
              type: 'datePicker'
            },
            {
              key: "student_status",
              label: "学员状态",
              type: 'select'
            },
            {
              key: "intention",
              label: "付费意向",
              type: 'select'
            },
          ],
        },
        {
          id: 2,
          title: "跟进信息",
          data: [
            {
              key: "hello",
              label: "你好",
              type: 'input'
            },
            {
              key: "lll",
              label: "啦啦啦",
              type: 'input'
            },
          ],
        },
      ];
      this.list = [
        {
          id: 1,
          data: [
            {
              key: "city",
              label: "所在城市",
              type: 'input'
            },
            {
              key: "time",
              label: "注册时间",
              type: 'datePicker'
            },
          ]
        },
        {
          id: 2,
          data: [
            {
              key: "hello",
              label: "你好",
              type: 'input'
            },
          ],
        },
      ]; // 假设是后端返回的已选数据

      this.list.map((item) => {
        item.data.map((sonItem) => {
          this.checkList.push(sonItem.key);
        });
      });

      this.isSelectForm(this.group_list, this.list);
    },
    // 遍历formList 和 已勾选的list
    isSelectForm(ary, useList) {
      console.log(ary, 194)
      if (useList && useList.length > 0) {
        for (let i in ary) {
          for (let k in useList) {
            if (useList.find(item => {
              return item.id === ary[i].id
            })) {
              ary[i].data = useList[i].data
            } else {
              ary = ary.filter(item => item.id === useList[k].id)
            }
          }
        }
      } else {
        ary = []
      }
      this.group_list = lodash.cloneDeep(ary);
    },
    checkChange(e, item, sonObj) {
      sonObj.checked = e;
      if (this.list && this.list.length) {
        this.list.map((listItem) => {
          if (listItem.id === item.id) {
            if (sonObj.checked) {
              listItem.data.push(sonObj);
            } else {
              listItem.data.pop(sonObj);
            }
          } else {
            let obj = {id : item.id, data: [sonObj]}
             this.list.push(obj)
          }
        });
      } else {
        let obj = { id: item.id , data: [sonObj]}
        this.list.push(obj)
      }

    },
    cancelForm() {
      this.showDialog = false;
    },
    submit() {
      this.showDialog = false;
      this.group_list = lodash.cloneDeep(this.new_group_list)
      this.isSelectForm(this.group_list, this.list)
    },
  },
  created() {
    this.getFormList();
  },
  components: {
    draggable,
  },
  watch: {
    drawer() {
      this.showDialog = this.drawer;
    },
    showDialog() {
      this.$emit("update:drawer", this.showDialog);
    },
    group_list: {
      handler() {
        console.log(this.group_list, 268)
        let groupList = lodash.cloneDeep(this.group_list);
        this.$emit("formChange", groupList);
      },
      deep: true,
      immediate: true
    }
  },
};
</script>

<style>
</style>