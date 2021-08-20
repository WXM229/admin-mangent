<template>
  <div>
    <el-card>
      <el-button type="primary" @click="add">添加</el-button>
      <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose">
        <span>
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="标签编号" prop="num">
              <el-input :disable="true" v-model="ruleForm.num"></el-input>
            </el-form-item>
            <el-form-item label="标签名称" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="标签说明" prop="desc">
              <el-input v-model="ruleForm.desc"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm">提交</el-button>
              <el-button>重置</el-button>
            </el-form-item>
          </el-form>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    let validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('标签名称不能为空'))
      } else {
        if (!this.isCheckName(value)) {
          callback(new Error('标签名称不能重复'))
        }
      }
    };
    return {
      dialogVisible: false,
      ruleForm: {
        num: '',
        desc: '',
        name: ''
      },
      rules: {
        name: [
          { required: true, validator: validateName, trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '标签描述不能为空', trigger: 'blur' }
        ]
      },
      tagList: ['你好', '123', 'hello']
    };
  },
  methods: {
    add() {
      this.dialogVisible = true
    },
    handleClose() {
      this.dialogVisible = false
    },
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          alert('submit')
        } else {
          return false
        }
      })
    },
    isCheckName(value) {
      // 下面是前端判断的方法
      this.tagList.map(item => {
        if (value === item) {
          return false
        } else {
          return true
        }
      })
      /*
      下面是请求接口的方法
      例如:  operateApi.checkName({name: value}).then(res => {
        if (res.code === 0) { // 表示请求成功
           if (res.data === true) {
              return true or false
           } else {

           }
        }
      })
      */
    },
  },
};
</script>

<style>
.parent {
  display: flex;
  width: 100%;
  height: 200px;
  flex-wrap: wrap;
  justify-content: space-around;
}
.son {
  border: 3px solid #ffffff;
  background: chocolate;
  flex: 1;
  min-width: 24%;
  max-width: 24%;
}
</style>
