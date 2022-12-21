<template>
  <el-popover
    placement="bottom"
    popper-class="bse-edit_popover"
    trigger="hover"
  >
    <span>居中对齐</span>
    <svg class="icon" aria-hidden="true" slot="reference" @click="handlerClick('justifyCenter')">
      <use xlink:href="#icon-justifyCenter"></use>
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
