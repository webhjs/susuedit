<template>
  <el-popover
    placement="bottom"
    popper-class="bse-edit_popover"
    trigger="hover"
  >
    <span>字体</span>
    <div slot="reference"><span>默认字体</span></div>
  </el-popover>
</template>

<script>
export default {
  inject: ['getEditor'],
  methods: {
    handlerClick(commandName, showUI, fontName) {
      this.getEditor().execCommand(commandName, showUI, fontName)
    }
  }
};
</script>