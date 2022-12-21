<template>
  <el-dialog
    v-if="dialogFormVisible"
    :title="{ surgery: '手术控件' }[formInline.type]"
    width="1100px"
    :visible.sync="dialogFormVisible"
    append-to-body
  >
    <div class="control-wrap">
      <el-button size="mini" icon="el-icon-plus" @click="addSurgery">新增</el-button>
      <el-button size="mini" icon="el-icon-plus" @click="addPrevSurgery">上插行</el-button>
      <el-button size="mini" icon="el-icon-plus" @click="clearSurgery">清空行</el-button>
      <el-button size="mini" icon="el-icon-setting" @click="setCommonlySurgery">设为常用手术</el-button>
      <el-button size="mini" icon="el-icon-setting" @click="upData">上移</el-button>
      <el-button size="mini" icon="el-icon-setting" @click="downData">下移</el-button>
    </div>
    <div style="height: 200px; margin-bottom: 10px">
      <SortTable
        ref="sortTableRef"
        :data.sync="formInline.bse_surgeryList"
        v-bind="attribute"
        @currentChange="
          active => {
            tableFormInline = active
          }
        "
        @refresh="serach"
      />
    </div>
    <el-tabs type="border-card" v-model="tabChangeName">
      <el-tab-pane label="常用手术" name="常用手术">
        <el-table
          :data="commonlyTableData"
          border
          height="100%"
          style="width: 100%"
          @row-click="addSurgeryFromShortcutTable"
        >
          <el-table-column width="100" property="type" label="类型"></el-table-column>
          <el-table-column property="code" label="手术编码"></el-table-column>
          <el-table-column property="name" label="手术名称"></el-table-column>
          <el-table-column property="surgeryLevel" label="手术级别"></el-table-column>
          <el-table-column property="anesthesia" label="麻醉方式"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitFrom">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import SortTable from './SortTable'
export default {
  components: {
    SortTable
  },
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  watch: {
    data: {
      handler(newValue) {
        this.$nextTick(() => {
          Object.prototype.toString.call(this.data) === '[object Object]' &&
            (this.formInline = { ...this.formInline, ...newValue })
        })
      },
      immediate: true
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      formInline: {
        bse_surgeryList: []
      },
      commonlyTableData: [], // 常用列表
      /* 拖拽表格 */
      bse_surgery_list: [],
      /* 拖拽表格 */
      tabChangeName: '常用手术',
      attribute: {}
    }
  },
  methods: {
    show(cxtobj, param) {
      const { el, attr, context, getEditor, getEditorOptions } = param
      this._bse = getEditor ? getEditor() : cxtobj
      this._instanceOpt = getEditorOptions ? getEditorOptions() : cxtobj.getOptions()
      this.attribute = {
        ...param,
        getEditor: getEditor ? getEditor : () => (cxtobj),
        getEditorOptions: getEditorOptions ? getEditorOptions : cxtobj.getOptions
      }
      this.dialogFormVisible = true
      this.$nextTick(() => {
        Object.prototype.toString.call(attr) === '[object Object]' &&
          (this.formInline = { bse_surgeryList: [], ...attr })
        this.serach()
      })
    },
    // 查询树形表格
    serach() {
      this.commonlyTableData = []
      this._instanceOpt.requestSurgeryTreeTable(param => {
        this.commonlyTableData = param
      }, this.formInline)
    },
    // 表单字段列表查询
    showFields(type) {
      const Mapping = {
        分类: 'bse_categery_option',
        类型: 'bse_type_option',
        病名: 'bse_disease_option',
        症名: 'bse_symptom_option'
      }
      this[Mapping[type]] = [
        {
          code: '1',
          name: '门诊诊断',
          memo: '临床初步诊断'
        }
      ]
    },
    // 新增诊断
    addSurgery() {
      // type,code,name,date,surgeryLevel,doctor,firstAssistant,secondAssistant,incisionLevel,healingLevel,anesthesia,anesthesiologist
      const newLine = this.formInline?.bse_surgeryList[this.formInline.bse_surgeryList.length - 1]
      const {
        type,
        doctor,
        firstAssistant,
        secondAssistant,
        incisionLevel,
        healingLevel,
        anesthesia,
        anesthesiologist
      } = newLine || {}
      this.formInline.bse_surgeryList.push({
        type,
        doctor,
        firstAssistant,
        secondAssistant,
        incisionLevel,
        healingLevel,
        anesthesia,
        anesthesiologist,
        id: null
      })
    },
    // 上插诊断
    addPrevSurgery() {
      // type,code,name,date,surgeryLevel,doctor,firstAssistant,secondAssistant,incisionLevel,healingLevel,anesthesia,anesthesiologist
      const newLine = this.formInline?.bse_surgeryList[0]
      const {
        type,
        doctor,
        firstAssistant,
        secondAssistant,
        incisionLevel,
        healingLevel,
        anesthesia,
        anesthesiologist
      } = newLine || {}
      this.formInline.bse_surgeryList.unshift({
        type,
        doctor,
        firstAssistant,
        secondAssistant,
        incisionLevel,
        healingLevel,
        anesthesia,
        anesthesiologist,
        id: null
      })
    },
    // 清空行
    clearSurgery() {
      this.formInline.bse_surgeryList = this.formInline.bse_surgeryList.map(m => {
        if (this.tableFormInline.id == m.id) {
          return { id: m.id }
        } else {
          return m
        }
      })
    },
    // 从常用表格中新增诊断
    addSurgeryFromShortcutTable(row) {
      const newLine = this.formInline.bse_surgeryList[this.formInline.bse_surgeryList.length - 1]
      const {
        type,
        doctor,
        firstAssistant,
        secondAssistant,
        incisionLevel,
        healingLevel,
        anesthesia,
        anesthesiologist
      } = newLine || {}
      this.formInline.bse_surgeryList.push({
        type,
        doctor,
        firstAssistant,
        secondAssistant,
        incisionLevel,
        healingLevel,
        anesthesia,
        anesthesiologist,
        ...row,
        id: null
      })
    },
    // 设为常用诊断
    setCommonlySurgery() {
      this._bse.fireEvent('setCommonlySurgery', { formInline: this.formInline, payload: this.tableFormInline }, _ => {
        this.serach()
      })
    },
    // 移动数组
    swapItems(arr, index1, index2) {
      arr[index1] = arr.splice(index2, 1, arr[index1])[0]
      return arr
    },
    // 上移动
    upData() {
      const index = this.formInline.bse_surgeryList.findIndex(m => m.id == this.tableFormInline.id)
      if (this.formInline.bse_surgeryList.length > 1 && index !== 0) {
        this.swapItems(this.formInline.bse_surgeryList, index, index - 1)
      }
    },
    // 下移动
    downData() {
      const index = this.formInline.bse_surgeryList.findIndex(m => m.id == this.tableFormInline.id)
      if (this.formInline.bse_surgeryList.length > 1 && index !== this.formInline.bse_surgeryList.length - 1) {
        this.swapItems(this.formInline.bse_surgeryList, index, index + 1)
      }
    },
    submitFrom() {
      console.log(this.formInline)
      this.$emit('submitFrom', this.formInline)
      this.dialogFormVisible = false
    }
  }
}
</script>

<style scoped>
/deep/ .el-dialog__body {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.control-wrap {
  margin-bottom: 10px;
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
  height: 200px;
  position: relative;
  padding: 8px;
  display: flex;
}
/deep/ .el-tabs__content .el-tab-pane {
  width: 100%;
}
</style>
