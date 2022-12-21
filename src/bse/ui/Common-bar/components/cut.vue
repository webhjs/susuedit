<template>
  <el-popover
    placement="bottom"
    popper-class="bse-edit_popover"
    trigger="hover"
  >
    <span>剪切</span>
    <svg class="icon" aria-hidden="true" slot="reference" @click="handlerClick('cut')">
      <use xlink:href="#icon-cut"></use>
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