<template>
  <div class="table-wrap">
    <el-table
      :data="treeData"
      border
      row-key="id"
      ref="multipleTable"
      default-expand-all
      highlight-current-row
      height="100%"
      style="width: 100%"
      @row-click="handlerctiveFieldsRow"
    >
      <el-table-column prop="type" label="类型" width="100">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.类型"
            value-key="type"
            placeholder="请选择"
            filterable
            popper-class="bse-select-dropdown"
            v-if="
              activeFieldsRow.row &&
              activeFieldsRow.row.id == scope.row.id &&
              activeFieldsRow.column.label == scope.column.label
            "
            @visible-change="isShow => isShow && showFields('类型')"
          >
            <el-option v-for="(item, index) in bse_type_option" :key="index" :label="item.name" :value="item">
            </el-option>
          </el-select>
          <div style="width: 100%; height: 100%" v-else>
            {{ scope.row.type }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="code" label="手术编码">
        <template slot-scope="scope">
          <div style="width: 100%; height: 100%">
            {{ scope.row.code }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="手术名称" width="200">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.name"
            placeholder="请输入"
            v-if="
              activeFieldsRow.row &&
              activeFieldsRow.row.id == scope.row.id &&
              activeFieldsRow.column.label == scope.column.label
            "
          ></el-input>
          <div style="width: 100%; height: 100%" v-else>{{ scope.row.name }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="手术日期" width="150">
        <template slot-scope="scope">
          <el-date-picker
            v-model="scope.row.date"
            type="date"
            popper-class="bse-date-picker"
            placeholder="选择日期"
            v-if="
              activeFieldsRow.row &&
              activeFieldsRow.row.id == scope.row.id &&
              activeFieldsRow.column.label == scope.column.label
            "
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
          <div style="width: 100%; height: 100%" v-else>{{ scope.row.date }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="surgeryLevel" label="手术级别">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.手术级别"
            value-key="surgeryLevel"
            placeholder="请选择"
            filterable
            popper-class="bse-select-dropdown"
            v-if="
              activeFieldsRow.row &&
              activeFieldsRow.row.id == scope.row.id &&
              activeFieldsRow.column.label == scope.column.label
            "
            @visible-change="isShow => isShow && showFields('手术级别')"
          >
            <el-option v-for="(item, index) in bse_surgeryLevel_option" :key="index" :label="item.name" :value="item">
            </el-option>
          </el-select>
          <div style="width: 100%; height: 100%" v-else>
            {{ scope.row.surgeryLevel }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="doctor" label="术者">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.术者"
            value-key="name"
            placeholder="请选择"
            filterable
            popper-class="bse-select-dropdown"
            @change="value => changeTableRow(scope.row, value, 'doctor')"
            v-if="
              activeFieldsRow.row &&
              activeFieldsRow.row.id == scope.row.id &&
              activeFieldsRow.column.label == scope.column.label
            "
            @visible-change="isShow => isShow && showFields('术者')"
          >
            <el-option v-for="(item, index) in bse_doctor_option" :key="index" :label="item.name" :value="item">
            </el-option>
          </el-select>
          <div style="width: 100%; height: 100%" v-else>
            {{ scope.row.doctor }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="firstAssistant" label="一助">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.一助"
            :value="scope.row.firstAssistant"
            value-key="name"
            placeholder="请选择"
            filterable
            popper-class="bse-select-dropdown"
            v-if="
              activeFieldsRow.row &&
              activeFieldsRow.row.id == scope.row.id &&
              activeFieldsRow.column.label == scope.column.label
            "
            @visible-change="isShow => isShow && showFields('一助')"
            @change="value => changeTableRow(scope.row, value, 'firstAssistant')"
          >
            <el-option v-for="(item, index) in bse_firstAssistant_option" :key="index" :label="item.name" :value="item">
            </el-option>
          </el-select>
          <div style="width: 100%; height: 100%" v-else>
            {{ scope.row.firstAssistant }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="secondAssistant" label="二助">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.二助"
            value-key="name"
            placeholder="请选择"
            filterable
            popper-class="bse-select-dropdown"
            v-if="
              activeFieldsRow.row &&
              activeFieldsRow.row.id == scope.row.id &&
              activeFieldsRow.column.label == scope.column.label
            "
            @visible-change="isShow => isShow && showFields('二助')"
            @change="value => changeTableRow(scope.row, value, 'secondAssistant')"
          >
            <el-option
              v-for="(item,index) in bse_secondAssistant_option"
              :key="index"
              :label="item.name"
              :value="item"
            >
            </el-option>
          </el-select>
          <div style="width: 100%; height: 100%" v-else>
            {{ scope.row.secondAssistant }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="incisionLevel" label="切口等级">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.切口等级"
            value-key="name"
            placeholder="请选择"
            filterable
            popper-class="bse-select-dropdown"
            v-if="
              activeFieldsRow.row &&
              activeFieldsRow.row.id == scope.row.id &&
              activeFieldsRow.column.label == scope.column.label
            "
            @visible-change="isShow => isShow && showFields('切口等级')"
            @change="value => changeTableRow(scope.row, value, 'incisionLevel')"
          >
            <el-option v-for="(item,index) in bse_incisionLevel_option" :key="index" :label="item.name" :value="item">
            </el-option>
          </el-select>
          <div style="width: 100%; height: 100%" v-else>
            {{ scope.row.incisionLevel }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="healingLevel" label="愈合等级">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.愈合等级"
            value-key="name"
            placeholder="请选择"
            filterable
            popper-class="bse-select-dropdown"
            v-if="
              activeFieldsRow.row &&
              activeFieldsRow.row.id == scope.row.id &&
              activeFieldsRow.column.label == scope.column.label
            "
            @visible-change="isShow => isShow && showFields('愈合等级')"
            @change="value => changeTableRow(scope.row, value, 'healingLevel')"
          >
            <el-option v-for="(item, index) in bse_healingLevel_option" :key="index" :label="item.name" :value="item">
            </el-option>
          </el-select>
          <div style="width: 100%; height: 100%" v-else>
            {{ scope.row.healingLevel }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="anesthesia" label="麻醉方式">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.麻醉方式"
            value-key="name"
            placeholder="请选择"
            filterable
            popper-class="bse-select-dropdown"
            v-if="
              activeFieldsRow.row &&
              activeFieldsRow.row.id == scope.row.id &&
              activeFieldsRow.column.label == scope.column.label
            "
            @visible-change="isShow => isShow && showFields('麻醉方式')"
            @change="value => changeTableRow(scope.row, value, 'anesthesia')"
          >
            <el-option v-for="(item, index) in bse_anesthesia_option" :key="index" :label="item.name" :value="item">
            </el-option>
          </el-select>
          <div style="width: 100%; height: 100%" v-else>
            {{ scope.row.anesthesia }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="anesthesiologist" label="麻醉医师">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.麻醉医师"
            value-key="name"
            placeholder="请选择"
            filterable
            popper-class="bse-select-dropdown"
            v-if="
              activeFieldsRow.row &&
              activeFieldsRow.row.id == scope.row.id &&
              activeFieldsRow.column.label == scope.column.label
            "
            @visible-change="isShow => isShow && showFields('麻醉医师')"
            @change="value => changeTableRow(scope.row, value, 'anesthesiologist')"
          >
            <el-option
              v-for="(item,index) in bse_anesthesiologist_option"
              :key="index"
              :label="item.name"
              :value="item"
            >
            </el-option>
          </el-select>
          <div style="width: 100%; height: 100%" v-else>
            {{ scope.row.anesthesiologist }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="option" label="操作" width="50" fixed="right">
        <template slot-scope="scope">
          <i class="el-icon-delete cursor" @click="deleteRecord(scope.row)"></i>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import dragTreeTable from 'drag-tree-table'

export default {
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },
    getEditorOptions: {
      type: Function,
      default() {}
    }
  },
  watch: {
    data: {
      handler(newValue) {
        this.treeData = newValue.map((m, inx) => {
          ;(!m.id || m.id?.startsWith('bse_')) && (m.id = 'bse_' + inx)
          return m
        })
      },
      immediate: true
    }
  },
  data() {
    return {
      treeData: [],
      activeFieldsRow: {},
      /* 手术接口选项 */
      bse_type_option: [],
      bse_surgeryLevel_option: [],
      bse_doctor_option: [],
      bse_firstAssistant_option: [],
      bse_secondAssistant_option: [],
      bse_incisionLevel_option: [],
      bse_healingLevel_option: [],
      bse_anesthesia_option: [],
      bse_anesthesiologist_option: []
      /* 手术接口选项 */
    }
  },
  components: {
    dragTreeTable
  },
  mounted() {
    this._instanceOpt = this.getEditorOptions()
  },
  methods: {
    // 表单字段列表查询
    showFields(type) {
      this._instanceOpt.requestSurgeryField(
        param => {
          const Mapping = {
            类型: 'bse_type_option',
            手术级别: 'bse_surgeryLevel_option',
            术者: 'bse_doctor_option',
            一助: 'bse_firstAssistant_option',
            二助: 'bse_secondAssistant_option',
            切口等级: 'bse_incisionLevel_option',
            愈合等级: 'bse_healingLevel_option',
            麻醉方式: 'bse_anesthesia_option',
            麻醉医师: 'bse_anesthesiologist_option'
          }
          this[Mapping[type]] = param
        },
        type,
        this.formInline
      )
    },
    deleteRecord(row) {
      const newlists = this.treeData.filter(fit => fit.id != row.id)
      this.$emit('update:data', newlists)
    },
    handlerctiveFieldsRow(row, column) {
      this.activeFieldsRow = { row, column }
      this.$emit('currentChange', row)
    },
    changeTableRow(scoped, value, key) {
      scoped[key] = value.name
    }
  }
}
</script>

<style scoped>
.table-wrap {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.border-wrap {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
}
/deep/ .drag-tree-table {
  margin: 0;
}
/deep/ .tree-column {
  padding: 0;
  font-size: 13px;
  color: #333;
}
/deep/ .drag-tree-table-header .tree-column {
  color: #28a670;
}
/deep/ .drag-tree-table-header {
  line-height: 35px;
  height: 35px;
  background: #eef8f4;
}
/deep/ .drag-tree-table-body {
  height: auto !important;
  flex: 1;
}
.cursor {
  padding: 5px;
  cursor: pointer;
}
/deep/ .el-date-editor.el-input {
  width: 100%;
}
</style>
