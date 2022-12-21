<template>
  <el-popover
    placement="bottom"
    popper-class="bse-edit_popover"
    trigger="hover"
  >
    <span>向右对齐</span>
    <svg class="icon" aria-hidden="true" slot="reference" @click="handlerClick('justifyRight')">
      <use xlink:href="#icon-justifyRight"></use>
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