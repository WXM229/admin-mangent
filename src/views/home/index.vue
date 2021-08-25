<template>
  <div>
    <Table
        selection
        :columns="columns"
        :tableData="tableData"
        :isPagination="true"
        :pageSizes="[10,20,50]"
        :totalCount="4"
        @handleCurrentChange="handlePageChange"
        @handleCountChange="handleCountChange"
        @buttonClick="handleButtonChange"
        @selectionChange="handleSelection"
        @select="handleSelect"
        @selectAll="handleSelectAll"
    >
    </Table>
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
        <el-button type="primary" @click="handkeSure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { TABLE_LIST } from '../../store/table'
import Table from '../../components/tools/table'
export default {
  data() {
    return {
      dialogVisible: false,
      row: {},
      data: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
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
              name: 'detail',
              label: '查看'
            },
            {
              type: 'primary',
              name: 'edit',
              label: '编辑'
            }
          ]
        }
      ],
      tableData: []
    }
  },
  methods: {
    handleClick(row) {
      this.row = row;
      this.dialogVisible = true;
    },
    handkeSure() {
      this.dialogVisible = false;
    },
    handleClose() {
      this.dialogVisible = false;
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
      console.log(page, 180)
    },
    handleCountChange(count) {
      console.log(count)
    },
    handleButtonChange(value) {
      console.log(value, 206)
    },
    handleSelection(val, page) {
      console.log(val, page)
    },
    handleSelect({ selection, row }) {
      console.log(selection, row, 189)
    },
    handleSelectAll(selection) {
      console.log(selection, 193)
    }
  },
  created() {
    let tableData =  [
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1517 弄",
          zip: 200333,
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1519 弄",
          zip: 200333,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
    ];
    this.tableData = tableData;
    this.$store.dispatch(TABLE_LIST, tableData)
  },
  computed: {
    tableList() {
      return this.$store.state.TableList.tableList
    }
  },
  components: {
    Table
  }
};
</script>

<style lang="less" scoped>
</style>
