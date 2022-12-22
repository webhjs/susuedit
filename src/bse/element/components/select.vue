<template>
  <el-form label-width="80px" :model="formInline" :rules="rules" ref="attributeForm" :inline="true">
    <div class="layout-wrap">
      <div class="left">
        <el-form-item label="名称" class="form-item" prop="name">
          <el-input class="input-item" v-model="formInline.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="编码" class="form-item" prop="id">
          <el-input class="input-item" v-model="formInline.id" placeholder="请输入编码"></el-input>
        </el-form-item>
        <el-form-item label="绑定值" class="form-item">
          <el-cascader
            class="input-item"
            v-model="formInline.bind"
            :options="bindOptions"
            clearable
          >
          </el-cascader>
        </el-form-item>
        <el-form-item label="水印" class="form-item">
          <el-input class="input-item" v-model="formInline.placeholder" placeholder="请输入水印"></el-input>
        </el-form-item>
        <el-form-item label="更新方式" class="form-item">
          <el-select
            v-model="formInline.forceUpdateWay"
            class="input-item"
            placeholder="请选择更新方式"
            @change="$forceUpdate()"
            popper-class="bse-select-dropdown"
            clearable
          >
            <el-option label="不更新" value="noUpdate"></el-option
            ><el-option label="强制下载" value="forceUpdate"></el-option>
            <el-option label="元素空值则下载" value="eleEmpty"></el-option>
            <el-option label="元素非空值则下载" value="eleNonempty"></el-option>
            <el-option label="源空值则下载" value="eleSourceEmpty"></el-option>
            <el-option label="源非空值则下载" value="eleSourceNonempty"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="默认值" class="form-item">
          <el-tooltip placement="top" effect="light">
            <div slot="content">
              <div style="color: #e6a23c; width: 155px; margin-bottom: 5px">友情提示:</div>
              值来源于固定值或动态数据选项卡
            </div>
            <el-select
              v-model="formInline.value"
              class="input-item"
              placeholder="请选择默认值"
              @change="$forceUpdate()"
              popper-class="bse-select-dropdown"
            >
              <el-option
                v-for="item in formInline.bse_options"
                :key="item.value"
                :label="item.value"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="提示信息" class="form-fullitem">
          <el-input class="input-item" v-model="formInline.altTitle" placeholder="请输入提示信息"></el-input>
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
        <el-form-item class="form-item_special" prop="bse_options">
          <el-tabs type="card" v-model="formInline.bse_card" @tab-click="switchTabsPane">
            <el-tab-pane label="固定值" name="fixed">
              <ul class="option-list">
                <li
                  v-for="(opt, index) in formInline.bse_options"
                  :key="opt.value"
                  @click="acitveRowChange(opt, index)"
                  :class="{ active: activeRow.value == opt.value }"
                >
                  <tr style="display: flex">
                    <td style="width: 145px; margin-right: 20px">{{ opt.value }}</td>
                  </tr>
                </li>
              </ul>
              <div class="control-wrap">
                <el-input
                  placeholder="请输入内容"
                  style="width: 150px; margin-right: 10px"
                  v-model="form_bse_model.value"
                >
                  <template slot="prepend">选项</template>
                </el-input>
                <el-button-group style="margin-left: 10px">
                  <el-button class="button-control" icon="el-icon-circle-plus-outline" @click="addOption"></el-button>
                  <el-button
                    class="button-control"
                    icon="el-icon-edit"
                    :disabled="operDisabled"
                    @click="editOption"
                  ></el-button>
                  <el-button
                    class="button-control"
                    icon="el-icon-top"
                    :disabled="operDisabled"
                    @click="operateOption('top')"
                  ></el-button>
                  <el-button
                    class="button-control"
                    icon="el-icon-bottom"
                    :disabled="operDisabled"
                    @click="operateOption('bottom')"
                  ></el-button>
                  <el-button
                    class="button-control"
                    icon="el-icon-delete"
                    :disabled="operDisabled"
                    @click="removeOption"
                  ></el-button>
                </el-button-group>
              </div>
            </el-tab-pane>
            <el-tab-pane label="动态数据" name="axios" class="dynamic-wrap">
              <div class="domain-wrap-left">
                <el-table
                  ref="singleTable"
                  :data="callbackTable.tablelist"
                  height="200"
                  border
                  highlight-current-row
                  @current-change="handleCurrentChangeTable"
                  style="width: 100%"
                >
                  <el-table-column
                    v-for="[key, value] in Object.entries(callbackTable.tableMapping)"
                    :key="key"
                    :prop="value"
                    :label="key"
                  >
                    <template slot="header" slot-scope="scope">
                      <span>{{ scope.column.label }}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="domain-wrap-right">
                <el-table
                  ref="singleTableField"
                  :data="callbackField.tablefieldlist"
                  height="200"
                  border
                  highlight-current-row
                  style="width: 100%"
                  @current-change="handleCurrentChangeField"
                >
                  <el-table-column
                    v-for="[key, value] in Object.entries(callbackField.tablefieldMapping)"
                    :key="key"
                    :prop="value"
                    :label="key"
                  >
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-form-item>
      </div>
      <div style="flex: 0 0 1px; margin: 0 8px; background: #eee"></div>
      <div class="right">
        <el-form-item class="form-item">
          <span slot="label" class="label-title">分组</span>
          <el-input class="input-item" v-model="formInline.groupName" placeholder="请输入分组名"></el-input>
        </el-form-item>
        <el-form-item class="form-item">
          <span slot="label" class="label-title">结算表达式</span>
          <el-input class="input-item" v-model="formInline.settleExpression" placeholder="结算表达式"></el-input>
        </el-form-item>
        <el-form-item class="form-item-full">
          <span slot="label" class="label-title">显示属性</span>
          <ul>
            <li>
              禁用<el-input
                class="input-item"
                v-model="formInline.disabledExpression"
                placeholder="禁用表达式"
              ></el-input>
            </li>
            <li>
              隐藏<el-input
                class="input-item"
                v-model="formInline.visibilityExpression"
                placeholder="隐藏表达式"
              ></el-input>
            </li>
            <li>
              显示<el-input
                class="input-item"
                v-model="formInline.isshowExpression"
                placeholder="显示表达式"
              ></el-input>
            </li>
          </ul>
        </el-form-item>
      </div>
    </div>
  </el-form>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  inject: ['getEditor'],
  computed: {
    operDisabled() {
      return !!!Object.keys(this.activeRow).length
    }
  },
  data() {
    var validateOptions = (rule, value, callback) => {
      if (this.formInline.bse_card == 'fixed' && !value.length) {
        callback(new Error('选项不能为空'))
      } else {
        callback()
      }
    }
    return {
      formInline: {
        bse_card: 'axios',
        bse_json_request: {
          bseTableObj: {},
          bseFieldObj: {}
        },
        forceUpdateWay: ''
      },
      rules: {
        name: { required: true, message: '请输入名称', trigger: 'blur' },
        id: { required: true, message: '请输入编码', trigger: 'blur' },
        bse_options: { validator: validateOptions, message: '选项不能为空', trigger: 'blur' }
      },
      form_bse_model: {}, // 选项模板
      activeRow: {}, // 当前活动行数据
      notallowdeleteChecked: null, // 中间量用于转换 true-label 不能设置为布尔型false
      contenteditableChecked: null,
      callbackTable: {
        tableMapping: {}
      },
      callbackField: {
        tablefieldMapping: {}
      },
      bindOptions: [],
      cascaderPropsMap: {
        _children: "children",
        _parentId: "parentId",
        _order: "order",
        _id: "id",
        _level: "level",
      },
    }
  },
  watch: {
    data: {
      handler(newValue) {
        this.$nextTick(() => {
          Object.prototype.toString.call(this.data) === '[object Object]' &&
            (this.formInline = { ...this.formInline, ...newValue })
          this.notallowdeleteChecked = this.formInline.notallowdelete ? 1 : 0
          this.contenteditableChecked = this.formInline.contenteditable === false ? 1 : 0
          this.$refs.attributeForm.resetFields()
          this.$refs.attributeForm.clearValidate()
        })
      },
      immediate: true
    },
    'formInline.bse_card': {
      handler(newValue) {
        this._instanceOpt = this.getEditor().getOptions()
        // 初始化默认请求参数
        if (newValue == 'axios') {
          this._instanceOpt.getDynamicTable(param => {
            this.callbackTable = param
            const activeTable = this.callbackTable.tablelist?.find(tab => {
              return (
                tab[param.tableMapping.表名] == this.formInline.bse_json_request?.bseTableObj?.[param.tableMapping.表名]
              )
            })
            activeTable && this.$refs.singleTable.setCurrentRow(activeTable)
          }, this.formInline)
        }
      },
      immediate: true
    }
  },
  mounted() {
    this._instanceOpt.requestCascaderBindOptions((param) => {
      // 获取级联选择数据
      this.bindOptions = this.arrToTree(param, this.cascaderPropsMap);
    }, this.formInline);
  },
  methods: {
    // 数组转成树型数据
    arrToTree(operateArr, props) {
      const __id = props["_id"] || "_id",
        __parentId = props["_parentId"] || "_parentId",
        __level = props["_level"] || "_level",
        __order = props["_order"] || "_order",
        __children = props["_children"] || "_children",
        __path = props["_path"] || "_path";
      let treeData = [],
        surplus = [];
      operateArr.forEach((ele) => {
        const some = operateArr.some((el) => ele[__parentId] == el[__id]);
        if (some) {
          surplus.push(ele);
        } else {
          const itemLevel = (listlevel, level, path) => {
            listlevel.forEach((li, inx) => {
              li[__level] = level;
              li[__order] = inx;
              li[__path] = path + "/" + inx;
              if (li[__children] && li[__children].length) {
                itemLevel(li[__children], level + 1, li[__path]);
              }
            });
          };
          ele[__children] &&
            ele[__children].length &&
            itemLevel(ele[__children], 2, String(treeData.length));
          treeData.push({
            ...ele,
            [__order]: treeData.length,
            [__path]: String(treeData.length),
            [__level]: 0,
          });
        }
      });
      const findItem = (treeDataTree, sur, level) => {
        for (let tree of treeDataTree) {
          if (tree[__id] == sur[__parentId]) {
            tree[__children]
              ? tree[__children].push({
                  ...sur,
                  [__order]: tree[__children].length,
                  [__path]: tree._path + "/" + tree[__children].length,
                  [__level]: level,
                })
              : (tree[__children] = [
                  {
                    ...sur,
                    [__order]: 0,
                    [__path]: tree[__path] + "/" + 0,
                    [__level]: level,
                  },
                ]);
            return tree;
          }
          if (tree[__children] && tree[__children].length) {
            const find = findItem(tree[__children], sur, level + 1);
            if (find) return find;
          }
        }
      };
      while (surplus && surplus.length) {
        for (let i = 0; i < surplus.length; i++) {
          if (findItem(treeData, surplus[i], 1)) {
            surplus.splice(i, 1);
            break;
          }
        }
      }
      return treeData;
    },
    // tab 被选中时触发
    switchTabsPane() {
      // 初始选项卡数据
      this.formInline.value = ''
      this.formInline.bse_options = []
      this.formInline.bse_json_request = {
        bseTableObj: {},
        bseFieldObj: {}
      }
      this.callbackTable = {
        tableMapping: {}
      }
      this.callbackField = {
        tablefieldMapping: {}
      }
    },
    // 上下移动选项
    operateOption(active) {
      const arr = this.formInline.bse_options
      const index = this._index
      switch (active) {
        case 'top':
          if (index != 0) {
            arr[index] = arr.splice(index - 1, 1, arr[index])[0]
          }
          this._index--
          break
        case 'bottom':
          if (index != arr.length - 1) {
            arr[index] = arr.splice(index + 1, 1, arr[index])[0]
          }
          this._index++
          break
      }
      this.$forceUpdate()
    },
    // 数据验证
    isValidate(filterIndex) {
      const { value } = this.form_bse_model
      if (!value) {
        this.$message.warning('选项值和描述不能为空')
        return false
      }
      !this.formInline.bse_options && (this.formInline.bse_options = [])
      const newOption = this.formInline.bse_options.filter((fit, inx) => inx !== filterIndex)
      for (const option of newOption) {
        if (option.value === value) {
          this.$message.warning('选项值或描述重复')
          return false
        }
      }
      return true
    },
    // 添加选项
    addOption() {
      if (!this.isValidate()) return
      this.$refs.attributeForm.clearValidate(['bse_options'])
      const { value } = this.form_bse_model
      this.formInline.bse_options.push({
        value
      })
      this.form_bse_model = {}
      this.activeRow = {}
      this.$forceUpdate()
    },
    // 删除选项
    removeOption() {
      this.formInline.bse_options = this.formInline.bse_options.filter(fit => fit.value !== this.activeRow.value)
      this.activeRow = {}
      this._index = -1
    },
    // 点击活动行
    acitveRowChange(row, index) {
      this.activeRow = row
      this._index = index
      this.form_bse_model = JSON.parse(JSON.stringify(this.activeRow))
    },
    // 编辑选项
    editOption() {
      if (!this.isValidate(this._index)) return
      const index = this.formInline.bse_options.indexOf(this.activeRow)
      const row = JSON.parse(JSON.stringify(this.form_bse_model))
      this.formInline.bse_options.splice(index, 1, row)
      this.activeRow = row
    },
    // 请求参数失焦格式化
    blurJsonRequest() {
      try {
        this.formInline.bse_json_request = JSON.parse(event.target.innerText)
      } catch {
        this.$message.warning('json格式错误')
      }
    },
    // 点击选择表格
    handleCurrentChangeTable(val) {
      if (!val) return
      this.formInline.bse_json_request.bseTableObj = val
      this._instanceOpt.requestTable(param => {
        this.callbackField = param
        const activeTableField = this.callbackField.tablefieldlist?.find(
          fie =>
            fie[param.tablefieldMapping.字段名] ==
            this.formInline.bse_json_request?.bseFieldObj?.[param.tablefieldMapping.字段名]
        )
        activeTableField && this.$refs.singleTableField.setCurrentRow(activeTableField)
      }, this.formInline.bse_json_request)
    },
    // 点击选择字段
    handleCurrentChangeField(val) {
      if (!val) return
      this.formInline.bse_json_request.bseFieldObj = val
      this._instanceOpt.requestTableField(param => {
        this.formInline.bse_options = param
        this.$forceUpdate()
      }, this.formInline.bse_json_request)
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
  margin-top: 4px;
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
.input-item /deep/ input[type='text'] {
  background: #f6f7f9;
}
/deep/ .input-item.el-date-editor.el-input,
.input-item /deep/ input[type='text'] {
  width: 165px;
}
/deep/ .el-button-group > .el-button.is-disabled {
  background: #f6f7f9;
}
/deep/ .el-tabs__item.is-active {
  color: white;
  background: #3cc088;
}
/deep/ .el-checkbox__label {
  font-size: 12px;
  color: #333 !important;
}
.dynamic-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.domain-wrap-left {
  width: 40%;
}
.domain-wrap-right {
  width: 50%;
}
/deep/ .el-table .el-table__header thead tr th {
  padding: 2px 0;
  background: #1ebf7a;
  color: #fefefe;
}
/deep/ .el-table.el-table--mini td {
  height: 32px;
}
/deep/ .el-table--border th .cell {
  display: flex;
  white-space: nowrap;
  align-items: center;
}
.layout-wrap {
  display: flex;
  justify-content: space-between;
}
.layout-wrap .right {
  display: flex;
  flex-direction: column;
}
.layout-wrap .right .form-item-full {
  flex: 1;
}
.layout-wrap .label-title {
  display: inline-block;
  width: 100px;
  text-align: left;
  margin: 5px 0;
  font-size: 14px;
  height: 24px;
  line-height: 24px;
  padding-left: 10px;
  background: linear-gradient(0deg, #28a670, #28a670) 1px center no-repeat;
  background-size: 3px 15px;
  color: #28a670;
}
</style>
