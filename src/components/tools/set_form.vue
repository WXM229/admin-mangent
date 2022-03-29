<template>
  <div>
    <el-form :model="form" size="small" :inline="true">
        <div class="group_search" v-for="item in groupList" :key="item.id">
          <span v-if="item.data.length" class="group_title"
            >{{ item.title }}:</span
          >
          <div class="group_content">
            <el-form-item
              v-for="(sonItem, index) in item.data"
              :key="index"
              :label="sonItem.label"
              :class="[
                sonItem.label.length === 2
                  ? 'label_2'
                  : sonItem.label.length === 3
                  ? 'label_3'
                  : sonItem.label.length === 5
                  ? 'label_5'
                  : sonItem.label.length === 6
                  ? 'label_6'
                  : 'label_4',
              ]"
            >
              <el-input
                v-if="sonItem.type === 'input'"
                clearable
                v-model="form[sonItem.key]"
                :placeholder="`请输入${sonItem.label}`"
              ></el-input>
              <el-select
                v-else-if="sonItem.type === 'select'"
                v-model="form[sonItem.key]"
                clearable
                :placeholder="`请输入${sonItem.label}`"
              >
                <el-option
                  v-for="(item) in options[sonItem.key]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <el-date-picker
                clearable
                style="width: 200px"
                v-else-if="sonItem.type === 'datePicker'"
                v-model="form[sonItem.key]"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </el-form-item>
          </div>
        </div>
      </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      options: {
        student_status: [{
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }],
        intention: [
            {
            value: '1',
            label: 'S'
          }, {
            value: '2',
            label: 'A'
          }, {
            value: '3',
            label: 'B'
          }, {
            value: '4',
            label: 'C'
          },
          ]
      }
    };
  },
  props: {
    groupList: {
      type: Array,
      require: true,
    }
  },
  methods: {

  },
  mounted() {
  }
};
</script>

<style>
</style>
