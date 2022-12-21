<template>
  <el-dialog
    v-if="dialogFormVisible"
    :title="{ diagnose: '诊断控件' }[formInline.type]"
    width="1100px"
    :visible.sync="dialogFormVisible"
    append-to-body
  >
    <div>
      <el-form
        style="width: 777px"
        label-width="80px"
        :model="formInline"
        :rules="rules"
        ref="attributeForm"
        :inline="true"
      >
        <div class="control-wrap">
          <div>
            <el-radio-group v-model="tableFormInline.bse_type" class="bse-type">
              <el-radio-button label="西医诊断">西医诊断</el-radio-button>
              <el-radio-button label="中医诊断">中医诊断</el-radio-button>
            </el-radio-group>
          </div>
          <div>
            <el-button size="mini" icon="el-icon-search" @click="serachDiagnose">查询</el-button>
            <el-button
              size="mini"
              icon="el-icon-plus"
              @click="addDiagnose()"
              :disabled="tableFormInline['id'] !== undefined"
              >新增</el-button
            >
            <el-button
              size="mini"
              icon="el-icon-document"
              @click="editSaveDiagnose"
              :disabled="!Object.keys(tableFromInlineCache).length"
              >编辑保存</el-button
            >
            <el-button
              size="mini"
              icon="el-icon-document"
              @click="addDiagnose(true)"
              :disabled="!Object.keys(tableFromInlineCache).length"
              >快速复制</el-button
            >
          </div>
        </div>
        <div class="formLable-wrap">
          <el-form-item label="类型" class="form-item" v-if="tableFormInline.bse_type == '中医诊断'">
            <OpearPover
              class-name="input-item"
              :options="bse_chinese_categery_option"
              v-model="tableFormInline.bse_categery"
              @show="showFields('中医类型')"
              placeholder="请选择中医类型"
              @row-click="row => { anotherParams('中医类型', row) }"
            />
          </el-form-item>
          <el-form-item label="类型" class="form-item" v-if="tableFormInline.bse_type == '西医诊断'">
            <OpearPover
              class-name="input-item"
              :options="bse_categery_option"
              v-model="tableFormInline.bse_categery"
              @show="showFields('西医类型')"
              placeholder="请选择西医类型"
              @row-click="row => { anotherParams('西医类型', row) }"
            />
          </el-form-item>
          <el-form-item label=" " class="form-item-full">
            <el-checkbox v-model="tableFormInline.bse_mock">拟诊断</el-checkbox>
          </el-form-item>
          <template v-if="tableFormInline.bse_type == '西医诊断'">
            <el-form-item label="诊断" class="form-item">
              <OpearPover
                placeholder="请选择诊断"
                class-name="input-item"
                :options="bse_diagnose_option"
                v-model="tableFormInline.bse_diagnose_name"
                @row-click="row => { handlerChange('诊断', row);anotherParams('西医诊断', row) }"
                @show="showFields('诊断')"
                :allowInput="tableFormInline.bse_mock"
              />
            </el-form-item>
            <el-form-item label="描述" class="form-item-full">
              <el-input
                class="input-item"
                v-model="tableFormInline.bse_diagnose_name_desc"
                placeholder="请输入病名描述"
              ></el-input>
            </el-form-item>
          </template>
          <template v-if="tableFormInline.bse_type === '中医诊断'">
            <el-form-item label="病名" class="form-item">
              <OpearPover
                placeholder="请选择病名"
                class-name="input-item"
                :options="bse_disease_option"
                v-model="tableFormInline.bse_disease_name"
                @row-click="row => { handlerChange('病名', row);anotherParams('中医病名', row) }"
                @show="showFields('病名')"
                :allowInput="tableFormInline.bse_mock"
              />
            </el-form-item>
            <el-form-item label="描述" class="form-item-full">
              <el-input
                class="input-item"
                v-model="tableFormInline.bse_disease_name_desc"
                placeholder="请输入病名描述"
              ></el-input>
            </el-form-item>
            <el-form-item label="症名" class="form-item">
              <OpearPover
                placeholder="请选择症名"
                class-name="input-item"
                :options="bse_symptom_option"
                v-model="tableFormInline.bse_symptom_name"
                @row-click="row => { handlerChange('症名', row);anotherParams('中医症名', row) }"
                @show="showFields('症名')"
                :allowInput="tableFormInline.bse_mock"
              />
            </el-form-item>
            <el-form-item label="描述" class="form-item-full">
              <el-input
                class="input-item"
                v-model="tableFormInline.bse_symptom_name_desc"
                placeholder="请输入症名描述"
              ></el-input>
            </el-form-item>
          </template>
        </div>
        <!-- <el-tabs type="border-card" class="diagnose-list">
          <el-tab-pane label="诊断列表"> -->
        <h5 class="label-title">诊断列表</h5>
        <div class="operation-wrap">
          <div>
            分类：
            <el-select
              v-model="filterDiagnoseName"
              class="operate_select"
              placeholder="请选择类型"
              clearable
              popper-class="bse-select-dropdown"
            >
              <el-option label="入院诊断" value="入院诊断"> </el-option>
              <el-option label="出院诊断" value="出院诊断"> </el-option>
            </el-select>
          </div>
          <div class="operate_label">
            <el-link
              size="mini"
              :underline="false"
              :disabled="!Object.keys(tableFromInlineCache).length"
              icon="el-icon-setting"
              @click="setCommonlyDiagnose"
              >设为常用诊断</el-link
            >
            <el-link
              size="mini"
              :underline="false"
              :disabled="!Object.keys(tableFromInlineCache).length"
              icon="el-icon-document-copy"
              @click="addChildDiagnose"
              >添加子诊断</el-link
            >
            <el-link
              size="mini"
              :underline="false"
              :disabled="!Object.keys(tableFromInlineCache).length"
              icon="el-icon-top"
              @click="upData"
              >上移</el-link
            >
            <el-link
              size="mini"
              :underline="false"
              :disabled="!Object.keys(tableFromInlineCache).length"
              icon="el-icon-bottom"
              @click="downData"
              >下移</el-link
            >
            <el-link size="mini" :underline="false" icon="el-icon-printer" @click="saveDiagnoseList">保存</el-link>
          </div>
        </div>
        <div style="height: 300px">
          <DragTable
            ref="diagnoseRef"
            :bse="_bse"
            :data="computed_bse_diagnose_list"
            :custom_field="bse_custom_field"
            :multiple-selection.sync="formInline.bse_multipleSelection"
            @currentChange="
              active => {
                tableFromInlineCache = JSON.parse(JSON.stringify(active))
                tableFormInline = active
              }
            "
            @updateTreeDate="updateTreeDate"
          />
        </div>
        <!-- </el-tab-pane>
        </el-tabs> -->
      </el-form>
    </div>

    <div style="flex: 0 0 1px; margin: 0 5px"></div>
    <!-- background: #DCE2EF; -->

    <div class="history-wrap">
      <div class="size-wrap">
        <h5 class="label-title">引用诊断</h5>
        <div class="cate-wrap">
          <div class="cate_top">
            <el-tabs type="border-card" v-model="tabChangeName">
              <el-tab-pane label="常用诊断" name="常用诊断">
                <el-radio-group v-model="commonlyDiagnoseFilterType">
                  <el-radio-button label="个人常用诊断"></el-radio-button>
                  <el-radio-button label="科室常用诊断"></el-radio-button>
                </el-radio-group>
                <el-tree
                  :data="commonlyTableData.filter(fit => fit[defTreeProps['label']] === commonlyDiagnoseFilterType)"
                  :props="defTreeProps"
                  @node-click="addDiagnoseFromShortcutTable"
                  default-expand-all
                >
                  <span class="custom-tree-node" slot-scope="{ node, data }">
                    <i
                      :class="node.level == '1' ? 'el-icon-folder-opened' : 'el-icon-document'"
                      style="margin-right: 10px"
                    ></i
                    ><span>{{ node.label }}</span>
                  </span>
                </el-tree>
              </el-tab-pane>
              <el-tab-pane label="历史诊断" name="历史诊断">
                <div class="tab-pane-item">
                  <el-table
                    :data="historyTableData"
                    border
                    stripe
                    height="100%"
                    style="width: 100%"
                    highlight-current-row
                    @row-click="historyTableRowClick"
                  >
                    <el-table-column width="100" property="code" label="诊断编码"></el-table-column>
                    <el-table-column width="100" property="name" label="诊断名称"></el-table-column>
                    <el-table-column width="172" property="memo" label="备注"></el-table-column>
                  </el-table>
                </div>
                <div class="tab-pane-item" style="margin-top: 10px">
                  <el-table
                    :data="tableDataChildren"
                    border
                    stripe
                    height="100%"
                    style="width: 100%"
                    @row-click="addDiagnoseFromShortcutTable"
                  >
                    <el-table-column width="100" property="code" label="类型"></el-table-column>
                    <el-table-column width="100" property="name" label="分类"></el-table-column>
                    <el-table-column width="172" property="memo" label="备注"></el-table-column>
                  </el-table>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitFrom">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import DragTable from './DragTable'
import OpearPover from './OpearPover'
export default {
  components: {
    DragTable,
    OpearPover
  },
  data() {
    return {
      dialogFormVisible: false,
      formInline: {
        bse_multipleSelection: []
      },
      tableFromInlineCache: {},
      tableFormInline: {
        bse_type: '西医诊断'
      },
      rules: {
        name: { required: true, message: '请输入名称', trigger: 'blur' },
        id: { required: true, message: '请输入编码', trigger: 'blur' }
      },
      currentActiveRow: {}, // 当前活动行
      historyTableData: [], // 右侧历史列表
      commonlyTableData: [], // 右侧常用列表
      tableDataChildren: [], // 右侧子分类列表
      bse_serach: {
        serachValue: ''
      },
      bse_categery_option: [],
      bse_chinese_categery_option: [],
      bse_diagnose_option: [],
      bse_disease_option: [],
      bse_symptom_option: [],
      /* 拖拽表格 */
      bse_diagnose_list: [],
      bse_custom_field: { children: 'children', hasChildren: 'hasChildren' },
      /* 拖拽表格 */
      tabChangeName: '常用诊断', // 右侧活动tab-name
      filterDiagnoseName: '', // 用于筛选数据
      commonlyDiagnoseFilterType: '个人常用诊断', // 筛选常用诊断
      defTreeProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  watch: {
    'tableFormInline.bse_type': {
      handler(newValue) {
        this.$refs.diagnoseRef.clearCurrentRow()
        this.tableFromInlineCache = {
          bse_type: newValue
        }
        this.tableFormInline = {
          bse_type: newValue
        }
      }
    },
    tabChangeName: {
      handler(newValue) {
        this.$nextTick(() => {
          this.tableDataChildren = []
          switch (newValue) {
            case '历史诊断':
              this.historyTableData = []
              this._instanceOpt &&
                this._instanceOpt.requestDiagnosHistroyTable(param => {
                  this.historyTableData = param
                }, this.formInline)
              break
            case '常用诊断':
              this.commonlyTableData = []
              this._instanceOpt &&
                this._instanceOpt.requestDiagnosCommonlyTable(param => {
                  this.commonlyTableData = param
                }, this.formInline)
              break
          }
        })
      }
    }
  },
  computed: {
    computed_bse_diagnose_list() {
      return this.bse_diagnose_list.filter(fit =>
        this.filterDiagnoseName
          ? fit.bse_categery == this.filterDiagnoseName && fit.bse_type == this.tableFormInline.bse_type
          : fit.bse_type == this.tableFormInline.bse_type
      )
    }
  },
  methods: {
    initTabeFromInline() {
      this.tableFormInline = {
        bse_type: this.tableFormInline.bse_type
      }
      this.tableFromInlineCache = {}
    },
    treeToArr(treeData, childkey) {
      const newTree = []
      const itor = data => {
        data.forEach(tree => {
          tree = JSON.parse(JSON.stringify(tree))
          if (tree[childkey] && tree[childkey].length) {
            itor(JSON.parse(JSON.stringify(tree[childkey])))
          }
          delete tree[childkey]
          newTree.push(tree)
        })
      }
      itor(treeData)
      const diagnoseList = this.bse_diagnose_list.filter(fit =>
        this.filterDiagnoseName
          ? fit.bse_categery != this.filterDiagnoseName && fit.bse_type != this.tableFormInline.bse_type
          : fit.bse_type != this.tableFormInline.bse_type
      )
      itor(diagnoseList)
      return newTree
    },
    // 排序更新数据
    updateTreeDate(newValue, props) {
      this.bse_diagnose_list = this.treeToArr(newValue, props._children)
    },
    show(cxtobj, param) {
      const { el, attr, context, getEditor, getEditorOptions } = param
      this.dialogFormVisible = true
      this._bse = getEditor ? getEditor() : cxtobj
      this._instanceOpt = getEditorOptions ? getEditorOptions() : cxtobj.getOptions()
      this.$nextTick(() => {
        Object.prototype.toString.call(attr) === '[object Object]' &&
          (this.formInline = { bse_multipleSelection: [], ...attr })
        this.$refs.attributeForm.resetFields()
        this.$refs.attributeForm.clearValidate()
        switch (this.tabChangeName) {
          case '历史诊断':
            this.historyTableData = []
            this._instanceOpt &&
              this._instanceOpt.requestDiagnosHistroyTable(param => {
                this.historyTableData = param
              }, this.formInline)
            break
          case '常用诊断':
            this.commonlyTableData = []
            this._instanceOpt &&
              this._instanceOpt.requestDiagnosCommonlyTable(param => {
                this.commonlyTableData = param
              }, this.formInline)
            break
        }
        this.serach()
      })
    },
    // 查询树形表格
    serach() {
      const { propsMap } = this.$refs.diagnoseRef.$data
      this.bse_diagnose_list = []
      this._instanceOpt.requestDiagnosTreeTable(param => {
        this.bse_diagnose_list = param
        this.bse_diagnose_list_cache = this.treeToArr(param, propsMap._children) // 缓存数组用于计算 更新删除
      }, this.formInline)
    },
    // 表单字段列表查询
    showFields(type) {
      this._instanceOpt.requestDiagnoseField(
        param => {
          const Mapping = {
            西医类型: 'bse_categery_option',
            中医类型: 'bse_chinese_categery_option',
            诊断: 'bse_diagnose_option',
            病名: 'bse_disease_option',
            症名: 'bse_symptom_option'
          }
          this[Mapping[type]] = param
        },
        type,
        this.formInline
      )
    },
    // 查询诊断
    serachDiagnose() {
      this._bse.fireEvent('serachDiagnose', { formInline: this.formInline, payload: this.tableFormInline }, result => {
        this.serach()
      })
    },
    // 新增诊断
    addDiagnose(flag = false) {
      this.$refs.diagnoseRef.addDiagnose(this.tableFormInline, flag)
      this.initTabeFromInline()
    },
    // 常用表格中新增诊断
    addDiagnoseFromShortcutTable(row) {
      this._bse.fireEvent('addDiagnose', { formInline: this.formInline, payload: row }, result => {
        console.log(result)
        this.serach()
      })
    },
    // 编辑保存诊断
    editSaveDiagnose() {
      this.$refs.diagnoseRef.editSaveDiagnose(this.tableFormInline)
      this.initTabeFromInline()
    },
    // 设为常用诊断
    setCommonlyDiagnose() {
      this._bse.fireEvent(
        'setCommonlyDiagnose',
        { formInline: this.formInline, payload: this.tableFromInlineCache },
        result => {
          console.log(result)
        }
      )
    },
    // 给更新状态打标识
    computedListUpdateStatus(newlist, cachelist, id) {
      const findUpdate = (item) => { // 检查新旧值是否更新
        const find = cachelist.find(f => f[id] === item[id]) || {}
        let upadteFlag = false
        for (let [key, value] of Object.entries(find)) {
          if (item[key] !== value) {
            console.log(item)
            console.log(find)
            upadteFlag = true
            break
          }
        }
        return upadteFlag
      }
      const newListArr = JSON.parse(JSON.stringify(newlist)).map(item => { // 检查新增、更新列表
        if (!item[id]) {
          return {
            bse_updatestatus: 'add',
            ...item
          }
        } else if (findUpdate(item)) {
          return {
            bse_updatestatus: 'update',
            ...item
          }
        } else {
          return item
        }
      })
      const deleteArr = JSON.parse(JSON.stringify(cachelist)).reduce((pre, cur) => { // 检查删除列表
        if (cur[id] && !newlist.find(f => f[id] === cur[id])) {
          pre.push({
            bse_updatestatus: 'delete',
            ...cur
          })
        }
        return pre
      }, [])
      return newListArr.concat(deleteArr)
    },
    // 保存诊断
    saveDiagnoseList() {
      const { treeData, propsMap } = this.$refs.diagnoseRef.$data
      this.bse_diagnose_list = this.treeToArr(treeData, propsMap._children)

      this._bse.fireEvent(
        'saveDiagnoseList',
        {
          formInline: this.formInline,
          payload: this.computedListUpdateStatus(this.bse_diagnose_list, this.bse_diagnose_list_cache, 'id')
        },
        result => {
          console.log(result)
          this.serach()
        }
      )
    },
    // 添加子诊断
    addChildDiagnose() {
      this.$refs.diagnoseRef.addChildDiagnose(this.tableFormInline)
    },
    // 点击历史表格行
    historyTableRowClick(row) {
      this.tableDataChildren = []
      this._instanceOpt.requestDiagnosTableChildren(
        param => {
          this.tableDataChildren = param
        },
        { formInline: this.formInline, currentRow: row }
      )
    },
    // 组件值改变事件
    handlerChange(row, payload) {
      switch (row) {
        case '诊断':
          this.$set(this.tableFormInline, 'bse_diagnose_name_desc', payload.memo)
          break
        case '病名':
          this.$set(this.tableFormInline, 'bse_disease_name_desc', payload.memo)
          break
        case '症名':
          this.$set(this.tableFormInline, 'bse_symptom_name_desc', payload.memo)
          break
      }
    },
    // 组件点击选项额外参数
    anotherParams(protoname, row) {
      this.tableFormInline[protoname] = row
    },
    // 上移动
    upData() {
      this.$refs.diagnoseRef.upData()
    },
    // 下移动
    downData() {
      this.$refs.diagnoseRef.downData()
    },
    // 提交
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
.form-item {
  width: calc(40% - 20px);
}
.form-item-full {
  width: calc(60%);
}
.form-item-full /deep/ .el-checkbox__label {
  font-size: 12px;
}
/deep/ .el-dialog__body {
  display: flex;
}
/deep/ .el-form-item__content {
  width: calc(100% - 90px);
}
.control-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
/deep/ .el-radio-group {
  text-align: center;
  margin-bottom: 5px;
}
/deep/ .el-radio-group.bse-type .el-radio-button {
  border: none;
}
/deep/ .el-radio-group.bse-type .el-radio-button:first-child .el-radio-button__inner {
  border-left: none;
}
/deep/ .el-radio-group.bse-type .el-radio-button:last-child {
  margin-left: 12px;
}
/deep/ .el-radio-group.bse-type .el-radio-button .el-radio-button__inner {
  background: #eff0f5;
}
/deep/ .el-radio-group.bse-type .el-radio-button.is-active .el-radio-button__inner {
  background: #28a670;
}
/deep/ .el-radio-group.bse-type .el-radio-button.is-active {
  border-color: #28a670;
}
/deep/ .el-radio-group.bse-type .el-radio-button {
  border-left: 1px solid #d4d4d4;
  box-sizing: border-box;
  border-radius: 4px;
  overflow: hidden;
}
/deep/ .formLable-wrap {
  background: #eff0f5;
  padding-top: 10px;
  margin-top: 10px;
}
/deep/ .el-form-item--mini.el-form-item {
  margin-bottom: 10px;
}
.label-title {
  margin: 5px 0;
  font-size: 14px;
  height: 24px;
  line-height: 24px;
  padding-left: 10px;
  background: linear-gradient(0deg, #28a670, #28a670) 1px center no-repeat;
  background-size: 3px 15px;
  color: #28a670;
}
.operation-wrap {
  padding: 0 8px;
  display: flex;
  justify-content: space-between;
  background-color: #eff0f5;
  height: 36px;
  line-height: 36px;
  margin-bottom: 7px;
  font-size: 13px;
}
.operation-wrap .operate_select {
  width: 120px;
}
.operate_label /deep/ i {
  display: block;
  height: 24px;
  width: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  margin-left: 10px;
  border-radius: 4px;
}
.history-wrap {
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
}
.history-wrap .size-wrap {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  position: absolute;
}
.history-wrap .size-wrap .cate-wrap {
  flex: 1;
  flex-direction: column;
  display: flex;
  position: relative;
}
.history-wrap .size-wrap .cate-wrap .cate_top {
  position: absolute;
  height: 100%;
  width: 100%;
}
/deep/ .el-tabs--border-card > .el-tabs__content {
  padding: 0;
}
/deep/ .el-tabs--border-card > .el-tabs__content .el-tab-pane {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 5px;
}
/deep/ .el-tabs--border-card > .el-tabs__content .el-tab-pane .tab-pane-item {
  flex: 1;
}
/deep/ .el-tabs__nav-scroll {
  display: flex;
}
/deep/ .el-tabs--border-card {
  border: none;
  display: flex;
  flex-direction: column;
  height: 100%;
}
/deep/ .el-tabs--border-card .el-tabs__content {
  flex: 1;
  background-color: #f6f7f9;
}
/deep/ .el-tabs__nav-scroll .el-tabs__nav {
  flex: 1;
  display: flex;
  border-radius: 4px 4px 0 0;
  overflow: hidden;
}
/deep/ .el-tabs--border-card > .el-tabs__header .el-tabs__item {
  flex: 1;
  text-align: center;
}
/deep/ .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
  color: #fff;
  background: #28a670;
}
/deep/ .el-tabs--border-card > .el-tabs__header .el-tabs__item {
  font-size: 13px;
}
/deep/ .el-tabs--border-card .el-tabs__item {
  height: 28px;
  line-height: 28px;
}
/deep/ .el-table .el-table__header thead tr th:before {
  background: #eff0f5;
  opacity: 1;
}
/deep/ .el-table .el-table__header thead tr th {
  color: #081122;
}
/deep/ .el-table--border th,
.el-table--border td {
  border-color: #dcdfe4;
}
.cate-wrap .cate_top,
.cate-wrap .cate_bottom {
  flex: 1;
}
.cate-wrap .cate_bottom {
  margin-top: 10px;
}
/deep/ .el-tree {
  background: transparent;
}
/deep/ .el-tree .el-tree-node.is-current {
  color: #38b071;
  background: #d3ece1;
}
/deep/ .el-tree-node:focus > .el-tree-node__content,
/deep/ .el-tree-node__content:hover {
  background: #d3ece1;
}
/deep/ .el-tree .el-tree-node__content {
  height: 30px;
}
</style>
