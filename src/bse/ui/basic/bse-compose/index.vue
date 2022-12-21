<template>
  <el-dialog v-if="dialogFormVisible" :title="formInline.module == 'moduleEle' ? '模板元素' : '组合元素'" width="600px" :visible.sync="dialogFormVisible" append-to-body>
    <el-form label-width="80px" :model="formInline" :rules="rules" ref="attributeForm" :inline="true">
      <el-form-item label="名称" class="form-item" prop="name">
        <el-input class="input-item" v-model="formInline.name" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="编码" class="form-item" prop="id">
        <el-input class="input-item" v-model="formInline.id" placeholder="请输入编码"></el-input>
      </el-form-item>
      <el-form-item label="行为属性" class="form-item">
        <el-checkbox
          v-model="notallowdeleteChecked"
          :true-label="1"
          :false-label="0"
          @change="val => (formInline.notallowdelete = val == 0 ? false : true)"
          label="不允许删除"
        ></el-checkbox>
      </el-form-item>
      <el-form-item label=" " class="form-item">
        <el-checkbox
          v-model="contenteditableChecked"
          :true-label="1"
          :false-label="0"
          @change="val => (formInline.contenteditable = val == 0 ? true : false)"
          label="只读"
        ></el-checkbox>
      </el-form-item>
      <!-- <el-form-item label="权限" class="form-item" prop="authUserList">
        <el-checkbox
          v-model="forbidOperateChecked"
          :true-label="1"
          :false-label="0"
          @change="val => (formInline.forbidOperate = val == 1 ? true : false)"
          label="禁止操作"
        ></el-checkbox>
      </el-form-item>
      <el-form-item label=" " class="form-item">
        <el-checkbox
          v-model="visibilityChecked"
          :true-label="1"
          :false-label="0"
          @change="val => (formInline.visibility = val == 1 ? true : false)"
          label="是否隐藏"
        ></el-checkbox>
      </el-form-item> -->
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitFrom">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      formInline: {},
      rules: {
        name: { required: true, message: '请输入名称', trigger: 'blur' },
        id: { required: true, message: '请输入编码', trigger: 'blur' }
      },
      forbidOperateChecked: null,
      visibilityChecked: null,
      notallowdeleteChecked: null,
      contenteditableChecked: null
    }
  },
  methods: {
    show(cxtobj, newValue) {
      this.dialogFormVisible = true
      this.$nextTick(() => {
        Object.prototype.toString.call(newValue) === '[object Object]' && (this.formInline = newValue)
        this.forbidOperateChecked = this.formInline.forbidOperate ? 1 : 0
        this.visibilityChecked = this.formInline.visibility ? 1 : 0
        this.notallowdeleteChecked = this.formInline.notallowdelete ? 1 : 0
        this.contenteditableChecked = this.formInline.contenteditable === false ? 1 : 0
        this.$refs.attributeForm.resetFields()
        this.$refs.attributeForm.clearValidate()
      })
    },
    submitFrom() {
      this.$refs.attributeForm.validate(valid => {
        if (valid) {
          this.$emit('submitFrom', this.formInline)
          this.dialogFormVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
/deep/ .label-desc {
  width: 73px;
}
/deep/ .el-tabs__header {
  margin: 0;
}
/deep/ .el-tabs__item {
  height: 30px;
  line-height: 30px;
  font-size: 12px;
}
/deep/ .el-tabs__content {
  border: 1px solid #e4e7ed;
  border-top: none;
  min-height: 100px;
  position: relative;
  padding: 8px;
}
.control-wrap {
  margin-bottom: 10px;
}
.option-list {
  font-size: 12px;
  cursor: pointer;
  overflow: auto;
  min-height: 116px;
  max-height: 150px;
}
.option-list li {
  border-bottom: 1px solid #e4e7ed;
  padding: 5px;
}
.form-item {
  width: calc(50% - 20px);
}
.form-fullitem {
  width: calc(100%);
}
.form-item_special {
  margin: 0;
}
.form-item_special,
.form-item_special /deep/ .el-form-item__content {
  width: 100%;
}
/deep/ .el-input-group__prepend {
  padding: 0;
  width: 45px;
  text-align: center;
  letter-spacing: 2px;
}
.active {
  background: #f5f5f5;
}
.language-title {
  padding: 0 5px;
  color: white;
  font-size: 12px;
  background: #54c292;
}
.dynamic-wrap {
  display: flex;
  align-items: center;
}
.param-wrap {
  width: calc(50% - 14px);
  height: 150px;
  display: flex;
  flex-direction: column;
}
.pre-code {
  flex: 1;
  display: flex;
  position: relative;
}
.language-css {
  position: absolute;
  height: 100%;
  width: 100%;
  color: #9a6e3a;
  background: hsla(0, 0%, 100%, 0.5);
  outline: none;
  display: block;
  white-space: break-spaces;
  overflow: auto;
}
.button-control {
  background: #ebf7f2;
  border: none;
  line-height: 100%;
  padding: 3px 14px;
}
.button-control /deep/ .el-icon-circle-plus-outline {
  background: #28a670;
  color: white;
  border-radius: 2px;
}
.button-control /deep/ i {
  padding: 4px;
}
/deep/ .el-tabs__item.is-active {
  color: white;
  background: #3cc088;
}
/deep/ .el-checkbox__label {
  font-size: 12px;
  color: #333 !important;
}
/deep/ .el-form-item__content {
  width: calc(100% - 90px);
  font-size: 12px;
}
.history {
  flex: 1;
  position: relative;
  margin-left: 10px;
}
.history .cate-wrap {
  position: absolute;
  width: 100%;
  height: 100%;
}
.history .cate-wrap .cate_top {
  height: 40%;
}
.history .cate-wrap .cate_bottom {
  height: calc(60% - 10px);
  margin-top: 10px;
}
/deep/ .diagnose-list.el-tabs--border-card {
  height: 344px;
}
/deep/ .diagnose-list .el-tab-pane {
  height: 100%;
}
/deep/ .diagnose-list .el-table--border,
/deep/ .diagnose-list .el-tabs__content {
  border: 0;
}
/deep/ .diagnose-list .el-table::before,
/deep/ .diagnose-list .el-table--group::after,
/deep/ .diagnose-list .el-table--border::after {
  background: none;
}
.cate_top /deep/ .el-tabs--border-card,
.cate_top /deep/ .el-tab-pane {
  height: 100%;
}
.cate_top /deep/ .el-table--border,
.cate_top /deep/ .el-tabs__content {
  border: 0;
}
/deep/ .el-tabs__content {
  height: calc(100% - 30px);
  padding: 2px;
}
.cate_top /deep/ .el-table::before,
.cate_top /deep/ .el-table--group::after,
.cate_top /deep/ .el-table--border::after {
  background: none;
}
/deep/ .el-dialog__body {
  display: flex;
  justify-content: space-between;
}
</style>
