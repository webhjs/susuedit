<template>
  <el-popover
    placement="bottom"
    popper-class="bse-edit_popover"
    trigger="hover"
  >
    <span>两端对齐</span>
    <svg class="icon" aria-hidden="true" slot="reference" @click="handlerClick('justifyFull')">
      <use xlink:href="#icon-justifyFull"></use>
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