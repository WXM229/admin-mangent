<template>
  <div>
    <el-card>
      <el-button class="setBtn" type="primary" size="small" @click="setChange">设置列</el-button>
      <Table
          selection
          :columns="columns"
          :tableData="tableData"
          :isPagination="true"
          :pageSizes="[10,20,50]"
          :totalCount="totalCount"
          :defaultPageSize="count"
          @handleCurrentChange="handlePageChange"
          @handleCountChange="handleCountChange"
          @buttonClick="handleButtonChange"
          @selectionChange="handleSelection"
          @select="handleSelect"
          @selectAll="handleSelectAll"
      >
      </Table>
    </el-card>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <span>
        <el-tree
          :data="data"
          node-key="id"
          :props="defaultProps"
          @node-click="handleNodeClick"
        >
        </el-tree>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSure">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
        title="提示"
        :visible.sync="setFlag"
        width="40%"
        :before-close="handleClose"
    >
      <span>
        <keep-alive>
          <draggableColumn :columns="columns" @columnChange="columnChange"></draggableColumn>
        </keep-alive>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { TABLE_LIST } from '@/store/table'
import Table from '@/components/tools/table'
import draggableColumn from "@/components/tools/draggableColumn";
import { getList, getTreeList } from '@/api/tableList'
export default {
  data() {
    return {
      dialogVisible: false,
      row: {},
      data: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      checkList: [],
      drawer: false,
      direction: 'rtl',
      editRow: {},
      queryParams: {

      },
      value: '',
      tempChildArr: [],
      ids: '',
      columns: [
        {
          key: 'id',
          label: 'ID'
        },
        {
          key: 'date',
          label: '日期'
        },
        {
          key: 'name',
          label: '姓名',
        },
        {
          key: 'address',
          label: '地址'
        },
        {
          key: 'province',
          label: '省份',
        },
        {
          type: 'action',
          label: '操作',
          buttonInfos: [
            {
              type: 'primary',
              name: 'edit',
              label: '编辑'
            }
          ]
        }
      ],
      tableData: [],
      totalCount: 0,
      page: 1,
      count: 10,
      setFlag: false,
      tempColums: []
    }
  },
  methods: {
    handleSure() {
      this.dialogVisible = false;
    },
    handleClose() {
      this.dialogVisible = false;
      this.setFlag = false;
    },
    handleCheck(checkedNodes,checkedKeys) {
      console.log(checkedNodes)
      console.log(checkedKeys, 'checkedKeys')
      this.checkList = checkedKeys.checkedKeys
      console.log(this.checkList, '123')
    },
    handleNodeClick (data) {
      this.tempChildArr = []
      if (Object.prototype.hasOwnProperty.call(data,'children')) {
        this.getAllChild(data)
      } else {
        this.tempChildArr.push(data.id)
      }
      this.ids = this.tempChildArr.join(',')
    },
    getAllChild (obj) {
      if (Object.prototype.hasOwnProperty.call(obj, 'children')) {
        for (const item of obj.children) {
          if (Object.prototype.hasOwnProperty.call(item, 'children')) {
            this.tempChildArr.push(item.id)
            this.getAllChild(item)
          } else {
            this.tempChildArr.push(item.id)
          }
        }
        this.getAllChild(obj.children)
      } else {
        return null
      }
    },
    handlePageChange(page) {
      this.page = page;
      this.getTableList()
    },
    handleCountChange(count) {
      this.count = count;
      this.getTableList()
    },
    handleButtonChange(value) {
      if (value.button === 'edit') {
        this.dialogVisible = true
        this.getTreeData()
      }
    },
    async getTreeData() {
      await getTreeList().then(res => {
        if (res.code === 0) {
          this.data = res.data
        } else {
          this.$message.warn(res.msg)
        }
      })
    },
    handleSelection(val, page) {
      console.log(val, page)
    },
    handleSelect({ selection, row }) {
      console.log(selection, row, 189)
    },
    handleSelectAll(selection) {
      console.log(selection, 193)
    },
    async getTableList() {
      await getList({page: this.page, count: this.count}).then(res => {
        if (res.code === 0) {
          this.tableData = res.data;
          this.totalCount = res.totalCount;
          this.$store.dispatch(TABLE_LIST, res.data)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    setChange() {
      this.setFlag = true
    },
    columnChange(list) {
      this.tempColums = list;
    },
    handleSave() {
      this.columns = JSON.parse(JSON.stringify(this.tempColums));
      this.setFlag = false
    }
  },
  created() {
    this.getTableList()
  },
  computed: {
    tableList() {
      return this.$store.state.TableList.tableList
    }
  },
  components: {
    Table,
    draggableColumn
  }
};
</script>

<style lang="less" scoped>
  .setBtn {
    float: right;
    margin-bottom: 10px;
  }
</style>
