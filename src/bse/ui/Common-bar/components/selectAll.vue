<template>
  <el-popover
    placement="bottom"
    popper-class="bse-edit_popover"
    trigger="hover"
  >
    <span>选择全部</span>
    <svg class="icon" aria-hidden="true" slot="reference" @click="handlerClick('selectAll')">
      <use xlink:href="#icon-selectAll"></use>
    </svg>
  </el-popover>
</template>

<script>
export default {
  inject: ['getEditor'],
  methods: {
    handlerClick(commandName) {
      this.getEditor().execCommand(commandName)
    }
  }
};
</script>
