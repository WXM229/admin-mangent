<template>
  <div class="table">
    <el-card>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column
          v-for="(item, index) in columns"
          :key="index"
          :fixed="item.fixed"
          :prop="item.key"
          :label="item.label"
          :width="item.width"
          :align="item.align || 'center'"
        >
          <template slot-scope="scope">
            <div v-if="item.type === 'action'">
              <el-button
                  v-for="button in item.buttonInfos"
                  size="mini"
                  :type="button.type"
                  :key="button.name"
                  :style="button.innerStyle"
                  :disabled="scope.row[item.disabled] || button.disabled"
                  @click="handleButtonClick(button.name, scope.row, scope.$index)"
              >
                {{ button.label }}
              </el-button>
            </div>
            <div v-else-if="item.type === 'render'">
              <myRender :row="scope.row" :render="item.render"></myRender>
            </div>
            <div v-else-if="item.type === 'select'">
              <el-select v-model="scope.row[item.key]" placeholder="请选择" clearable @click="selectChange(scope, scope.row[item.key])">
                <el-option
                    v-for="item in selectData"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div v-else-if="item.type === 'input'">
              <el-input
                v-model="scope.row[item.key]"
                :readonly="item.readonly"
                :type="item.inputType ? item.inputType : 'text'"
                @change="inputHandler($event, scope.row, item.key, scope.$index)"
                @keyup.native="keyupLimit($event, scope.row, item.key, scope.$index)"
                :value="scope.row[item.key]"
                :disabled="scope.row[item.disabled]"
                :min="item.min"
                :max="item.max"
                :maxlength="item.maxlength">
              </el-input>
            </div>
<!--            <span v-else>{{ scope.row[item.key] | filter(item.filter, item.filterProps) }}</span>-->
            <span v-else>{{ scope.row[item.key] }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination" v-if="isPagination">
        <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next"
            :total="totalCount">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import myRender from "../myRender/myRender";
export default {
  components: { myRender },
  data() {
    return {
      currentPage: 1,
      pageSize: this.defaultPageSize,
    }
  },
  props: {
    tableData: {
      type: Array,
      required: true,
      default: () => ([])
    },
    columns: {
      type: Array,
      required: true,
      default: () => ([])
    },
    isPagination: {
      type: Boolean,
      required: true,
      default: true
    },
    defaultPageSize: {
      type: Number,
      required: false,
      default: 20
    },
    pageSizes: {
      type: Array,
      default: () => ([10, 20, 50, 100, 500, 1000])
    },
    totalCount: {
      type: Number,
      required: true
    },
    selectData: {
      type: Array,
      required: false,
      default: () => ([])
    }
  },
  methods: {
    handleSizeChange(count) {
      this.pageSize = count;
      this.$emit('handleCountChange', count)
    },
    handleCurrentChange(page) {
      this.currentPage = page;
      this.$emit('handleCurrentChange', page)
    },
    handleButtonClick(button, row, index) {
      this.$emit('buttonClick', {
        button: button,
        data: Object.assign({}, row),
        rowIndex: index
      })
    },
    //  切换下拉选择
    selectChange(id, index, key) {
      this.$emit('handleSelect', {
        id,
        index,
        key
      })
    },
    inputHandler(val, row, column, row_index) {
      this.$emit('inputChange', {
        val,
        row,
        column,
        row_index
      })
    },

    keyupLimit(val, row, column, row_index) {
      this.$emit('keyupHandlerLimit', {
        val,
        row,
        column,
        row_index
      })
    },
  }
}
</script>

<style scoped lang="less">
.table {
  .pagination {
    margin-top: 20px;
    margin-bottom: 20px;
    float: right;
  }
  .multi-actions {
    margin: 0 0 5px 0;
  }
}
</style>
