<template>
  <el-popover
    placement="bottom"
    popper-class="bse-edit_popover"
    trigger="hover"
  >
    <span>向左对齐</span>
    <svg class="icon" aria-hidden="true" slot="reference" @click="handlerClick('justifyLeft')">
      <use xlink:href="#icon-justifyLeft"></use>
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