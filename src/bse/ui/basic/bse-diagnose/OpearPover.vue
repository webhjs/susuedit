<template>
  <el-popover
    placement="bottom"
    popper-class="bse-popper-xfpuo9t3"
    v-model="opearPoverIshow"
    width="400"
    trigger="click"
    @show="showFields('分类')"
  >
    <div class="flex-title">
      <el-input v-model="serachValue" placeholder="请输入搜索内容"></el-input>
      <el-button style="margin-left: 5px" @click="opearPoverIshow = false">取消</el-button>
    </div>
    <el-table
      :data="options.filter(fit => (serachValue ? fit.name.includes(serachValue) : true))"
      highlight-current-row
      @row-click="rowClick"
      :header-cell-style="{ background: '#3db683', color: 'white' }"
      max-height="500px"
    >
      <el-table-column width="100" property="code" label="编码"></el-table-column>
      <el-table-column width="100" property="name" label="名称"></el-table-column>
      <el-table-column width="172" property="memo" label="备注"></el-table-column>
    </el-table>
    <el-input
      slot="reference"
      :placeholder="placeholder"
      :class="className"
      :value="value"
      @input="changeType"
      @clear="clearRow"
      clearable
    ></el-input>
  </el-popover>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  data() {
    return {
      opearPoverIshow: false,
      serachValue: ''
    }
  },
  props: {
    options: {
      type: Array,
      default: () => []
    },
    value: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: 'cate-item'
    },
    placeholder: {
      type: String,
      default: 'cate-item'
    },
    allowInput: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    changeType(val) {
      this.allowInput && this.$emit('change', val)
    },
    showFields(type) {
      this.$emit('show', type)
    },
    rowClick(row) {
      console.log(row)
      this.$emit('row-click', row)
      this.$emit('change', row.name)
      this.opearPoverIshow = false
    },
    clearRow() {
      this.$emit('row-click', '')
      this.$emit('change', '')
    }
  }
}
</script>

<style scoped>
.cate-item,
.cate-item /deep/ .el-input {
  width: auto;
}
.flex-title {
  display: flex;
  margin-bottom: 10px;
}
.control-wrap {
  margin-bottom: 10px;
}
/deep/ .tree-row.highlight-row {
  background: #eaf6f0;
}
.input-item {
  width: 100%;
}
/deep/ .input-item.el-date-editor.el-input,
.input-item /deep/ input[type='text'],
/deep/ .input-item.el-select {
  width: 100%;
}
</style>
