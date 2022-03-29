<template>
  <div>
    <el-form :model="searchField" size="small">
      <div class="form_search_group" v-for="list in searchList" :key="list.group_key">
        <span v-if="list.used" class="form_title">
          <span v-if="list.group_name">{{list.group_name}}:</span>
        </span>
        <div class="form_content">
         <span style="vertical-align: top" v-for="item in list.group_label" :key="item.label_key">
           <div v-if="item.label_type === 'number_input' && item.checked && searchField[item.label_key]" class="form_search_range">
             <div class="form_search_range_item">
               <span class="num_label">{{item.label_name}}:</span>
               <el-input
                   :maxlength="maxLength3.includes(item.label_key) ? 3 : 2"
                   size="small"
                   v-model="searchField[item.label_key][0]"
                   :class="`num_label_${item.label_name.length}`"
                   oninput="value=value.replace(/[^0-9]+$/g,'')"
                   @change="($event) => onNumChange($event, item.label_key, item.label_name)"
                   placeholder="全部">
               </el-input>
             </div>
             <span style="color: #C0C4CC;">~</span>
             <div class="form_search_range_item">
               <span class="num_label">{{item.label_name}}:</span>
               <el-input
                   size="small"
                   :maxlength="maxLength3.includes(item.label_key) ? 3 : 2"
                   v-model="searchField[item.label_key][1]"
                   :class="`num_label_${item.label_name.length}`"
                   oninput="value=value.replace(/[^0-9]+$/g,'')"
                   @change="($event) => onNumChange($event, item.label_key, item.label_name)"
                   placeholder="全部">
               </el-input>
             </div>
           </div>
           <el-form-item v-if="item.checked && item.label_type === 'input'" :label="`${item.label_name}:`" :class="`label_${item.label_name.length}`">
             <el-input v-model="searchField[item.label_key]" clearable class="val" :maxlength="item.label_key === 'location' ? 10 : false" :placeholder="`请输入${item.label_name}`"></el-input>
           </el-form-item>
           <el-form-item v-if="item.checked && item.label_type === 'select'" :label="`${item.label_name}:`" :class="`label_${item.label_name.length}`">
              <el-select v-if="item.label_key === 'user_id'" filterable class="val" clearable v-model="searchField[item.label_key]" placeholder="请选择">
               <el-option
                   v-for="dropItem in options[item.label_key]"
                   :key="dropItem.id"
                   :label="dropItem.name"
                   :value="dropItem.id">
               </el-option>
             </el-select>
             <el-select v-else class="val" clearable v-model="searchField[item.label_key]" placeholder="请选择">
               <el-option
                   v-for="dropItem in options[item.label_key]"
                   :key="dropItem.code"
                   :label="dropItem.value"
                   :value="dropItem.code">
               </el-option>
             </el-select>
           </el-form-item>
           <el-form-item v-if="item.checked && item.label_type === 'multiple_select'" :label="`${item.label_name}:`" :class="`label_${item.label_name.length}`">
             <el-select class="val" clearable multiple v-model="searchField[item.label_key]" placeholder="请选择">
               <el-option
                   v-for="dropItem in options[item.label_key]"
                   :key="dropItem.code"
                   :label="dropItem.value"
                   :value="dropItem.code">
               </el-option>
             </el-select>
           </el-form-item>
           <el-form-item v-if="item.checked && item.label_type === 'search_select'" :label="`${item.label_name}:`" :class="`label_${item.label_name.length}`">
             <el-select class="val" clearable filterable remote v-model="searchField[item.label_key]" placeholder="请选择" :loading="searchLoading"  :remote-method="(e)=>{ remoteMethod(e,item.label_key) }">
               <el-option
                   v-for="searchItem in options[item.label_key]"
                   :key="searchItem.id"
                   :label="searchItem.name"
                   :value="searchItem.id">
               </el-option>
             </el-select>
           </el-form-item>
           <el-form-item v-if="item.checked && item.label_type === 'datePicker'" :label="`${item.label_name}:`" :class="`label_${item.label_name.length}`">
              <el-date-picker
                  v-if="datePickerKey.includes(item.label_key)"
                  class="val"
                  v-model="searchField[item.label_key]"
                  type="datetimerange"
                  :default-time="defaultTime"
                  :picker-options="dataPickerOption"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  align="right"
              >
              </el-date-picker>
             <el-date-picker
                 v-else
                 class="val"
                 v-model="searchField[item.label_key]"
                 type="datetimerange"
                 :default-time="defaultTime"
                 value-format="yyyy-MM-dd HH:mm:ss"
                 range-separator="至"
                 start-placeholder="开始日期"
                 end-placeholder="结束日期"
                 align="right"
             >
              </el-date-picker>
            </el-form-item>
           <el-form-item v-if="item.checked && item.label_type === 'quick_datepicker'" :label="`${item.label_name}:`" :class="`label_${item.label_name.length}`">
             <el-date-picker
                 v-if="quickDataKey1.includes(item.label_key)"
                 class="val"
                 v-model="searchField[item.label_key]"
                 type="datetimerange"
                 value-format="yyyy-MM-dd HH:mm:ss"
                 :default-time="defaultTime"
                 :picker-options="quickPickerOption1"
                 range-separator="至"
                 start-placeholder="开始日期"
                 end-placeholder="结束日期"
                 align="right"
             >
             </el-date-picker>
             <el-date-picker
                 v-else-if="quickDataKey2.includes(item.label_key)"
                 class="val"
                 v-model="searchField[item.label_key]"
                 type="datetimerange"
                 value-format="yyyy-MM-dd HH:mm:ss"
                 :default-time="defaultTime"
                 :picker-options="quickPickerOption2"
                 range-separator="至"
                 start-placeholder="开始日期"
                 end-placeholder="结束日期"
                 align="right"
             >
             </el-date-picker>
              <el-date-picker
                  v-else
                  class="val"
                  v-model="searchField[item.label_key]"
                  type="datetimerange"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  :default-time="defaultTime"
                  :picker-options="dataPickerOption"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  align="right"
              >
             </el-date-picker>
           </el-form-item>
           <el-form-item v-if="item.checked && item.label_type === 'cascader'" :label="`${item.label_name}:`" :class="`label_${item.label_name.length}`">
             <el-cascader
                 v-model="searchField[item.label_key]"
                 class="val"
                 clearable
                 :options="options[item.label_key]"
                 :props="defaultProps"
                 :show-all-levels="false"
                 @change="(value) => {changeParent(value, item.label_key)}"
             >
             </el-cascader>
           </el-form-item>
         </span>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
  import { api } from '@/api/index'
  import dayjs from 'dayjs'
  import {yesterday, currentWeek, currentMonth, today, tomorrow, afterTomorrow} from '@/utils/datepickerShortcuts'

  export default {
    data() {
      return {
        searchField: {},
        cascaderSearchField: {},
        searchSelectLoading: false,
        options: {},
        dataPickerOption: {
          disabledDate: this.disabledDate
        },
        quickPickerOption: {
          shortcuts: [ yesterday, currentWeek, currentMonth ]
        },
        quickPickerOption2: {
          disabledDate: this.disabledDate,
          shortcuts: [ yesterday, currentWeek, currentMonth ]
        },
        quickPickerOption1: {
          shortcuts: [ today, tomorrow,afterTomorrow ]
        },
        datePickerKey: ['book_time'],
        quickDataKey2: ['register_time', 'allocate_time', 'remark_time', 'first_pay_time', 'lead_active_time', 'main_course_intend_time'],
        quickDataKey1: ['last_reminder_time', 'schedule_start_time'],
        searchList: [],
        defaultProps: {
          children: 'child',
          label: 'name',
          value: 'id',
          checkStrictly: true
        },
        isShowCC: true,
        defaultTime: ['00:00:00', '23:59:59'],
        maxLength3: ['remain_count']
      }
    },
    props: {
      searchData: {
        required: false,
        type: Array
      },
      searchFields: {
        required: true,
        type: Object
      },
      searchFieldsArray: { // 数字范围字段, 若不需要设置筛选器则可以忽略
        required: false,
        type: Array
      },
      searchOptions: {
        required: false,
        type: Object
      },
      searchLoading: {
        required: false,
        type: Boolean
      },
      isShow: {
        required: false, // 判断所属部门，所属CC是否需要展示默认值
        type: Boolean,
        default: false
      },
      isDept: { // 判断是否需要获取所属部门，所属CC数据
        required: false,
        type: Boolean
      }
    },
    methods: {
      async getUserSetFilter() {
        try {
          const data = (await api.getUserSetFilter({ unique_en_name: this.$route.meta.unique }));
          if (data.code === 0) {
            this.searchList = data.data.set_filter
            this.searchList.map(item => {
              item.group_label.some(groupItem => {
                if (groupItem.checked) {
                  item.used = true
                }
              })
            })
          }
        } catch (e) {
          console.log(e)
        }
      },
      onNumChange(val, key, name) {
        if (this.searchField[key][1] && this.searchField[key][0]) {
          if (Number(this.searchField[key][1]) < Number(this.searchField[key][0])) {
            this.$message.warning(`【${name}】后面的数字不能小于前面的数字`)
            this.searchField[key] = []
          }
        }
      },
      async remoteMethod(val = '', key) {
        this.$emit('updateSearch', { searchLoading: true, val, key })
      },
      async getDeptData() {
        try {
          const data = await api.getAuthDept();
          if (data.code === 0) {
            if (this.isShow) {
              this.searchField.dept_id = data.data.dept.id;
            }
            this.options.dept_id = data.data.tree;
          } else {
            this.$error(data)
          }
        } catch (e) {
          console.log(e)
        }
      },
      async getAuthUserInfo() {
        try {
          const data = await api.getAuthUserInfo({ dept_id: this.cascaderSearchField.dept_id })
          if (data.code === 0) {
            const datas = []; // 若当前角色不是CC/CCTl 则不展示默认值
            data.data.users.map(item => {
              datas.push(item.id)
            })
            const user_id = data.data.user.id
            if (this.isShowCC && this.isShow && datas.includes(user_id)) {
              this.searchField.user_id = data.data.user.id;
            } else {
              this.searchField.user_id = ''
            }
            this.options.user_id = data.data.users;
            this.$forceUpdate()
          } else {
            this.$error(data)
          }
        } catch (e) {
          console.log(e)
        }
      },
      changeParent(value, key) {
        if (key === 'dept_id') { // 所属部门和所属CC存在联动，兼容后端接口特殊处理dept_id，user_id的参数
          this.isShowCC = false
          if (value && value.length > 0) {
            const length = value.length - 1;
            this.cascaderSearchField[key] = value[length]
          } else {
            this.searchField[key] = 0
            this.searchField.user_id = ''
            this.cascaderSearchField[key] = ''
          }
          this.getAuthUserInfo()
        } else {
          this.cascaderChange(value, key)
        }
      },
      cascaderChange(value, key) {
        if (value && value.length > 0) {
          const length = value.length - 1;
          this.cascaderSearchField[key] = value[length]
        } else {
          this.cascaderSearchField[key] = ''
        }
      },
      checkSearchFiled(key) {
        this.searchField[key] = '';
        if (this.searchFieldsArray && this.searchFieldsArray.length > 0) {
          if (this.searchFieldsArray.includes(key)) this.searchField[key] = []; // 因为查询条件中大多为数组, 需特殊处理
        }
      },
      disabledDate(time) {
        const date = new Date(dayjs().startOf('day').format('YYYY-MM-DD 23:59:59')).getTime()
        return time.getTime() > date
      }
    },
    watch: {
      searchData(val) {
        const newList = JSON.parse(JSON.stringify(val))
        newList.map(item => {
          item.group_label.some(groupItem => {
            if (groupItem.checked) {
              item.used = true
            }
          })
          item.group_label.map(groupItem => {
            if (!groupItem.checked) {
              this.checkSearchFiled(groupItem.label_key)
            }
          })
        })
        this.searchList = newList
      },
      searchOptions: {
        deep: true,
        handler(val) {
          this.options = Object.assign(val, this.options)
        },
        immediate: true
      },
      searchFields: {
        deep: true,
        handler(val) {
          this.searchField = val
          Object.keys(this.cascaderSearchField).map(item => {
            if (Object.keys(val).includes(item)) {
              if (!val[item]) {
                this.cascaderSearchField[item] = val[item]
              }
            }
          })
        },
        immediate: true
      }
    },

    mounted() {
      setTimeout(() => {
        this.getUserSetFilter()
      }, 1000)
      if (this.isDept) {
        Promise.all([this.getAuthUserInfo(), this.getDeptData()]).then(() => {
          if (this.isShow) {
            this.$bus.$emit('searchStudentList')
          }
        })
      }
    }
  }
</script>

