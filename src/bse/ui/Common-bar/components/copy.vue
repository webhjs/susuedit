<template>
  <el-popover
    placement="bottom"
    popper-class="bse-edit_popover"
    trigger="hover"
  >
    <span>复制</span>
    <svg class="icon" aria-hidden="true" slot="reference" @click="handlerClick('copy')">
      <use xlink:href="#icon-copy"></use>
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