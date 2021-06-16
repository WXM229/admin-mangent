<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="date" label="日期" width="150">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
      <el-table-column prop="province" label="省份" width="120">
      </el-table-column>
      <el-table-column prop="city" label="市区" width="120"> </el-table-column>
      <el-table-column prop="address" label="地址" width="300">
      </el-table-column>
      <el-table-column prop="zip" label="邮编" width="120"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >授权</el-button
          >
          <el-button type="text" size="small" @click="handleEditChange(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
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
    <el-drawer
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleDrawClose">
      <span>
        <IndexInfo :userInfo="editRow"></IndexInfo>
      </span>
</el-drawer>
  </div>
</template>

<script>
import IndexInfo from './indexInfo'
export default {
  data() {
    return {
      tableData: [
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
      ],
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
      ids: ''
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
    handleEditChange(row) {
      this.editRow = row
      this.drawer = true
    },
    handleDrawClose() {
      this.drawer = false
    },
    getTableList(systemid) {
      console.log(systemid, 'id')
      this.queryParams.systemid = systemid
    },

    handleNodeClick (data) {
      console.log(data, 'data')
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
  },
  components: {
    IndexInfo
  },
  created() {
    this.getTableList(this.$router.query.systemid)
  }
};
</script>

<style lang="less" scoped>
</style>
