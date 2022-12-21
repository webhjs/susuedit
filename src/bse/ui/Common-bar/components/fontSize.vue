<template>
  <el-popover
    placement="bottom"
    popper-class="bse-edit_popover"
    trigger="hover"
  >
    <span>字号</span>
    <div slot="reference">
      <span>12px</span>
    </div>
  </el-popover>
</template>

<script>
export default {
  inject: ['getEditor'],
  methods: {
    handlerClick(commandName, showUI, fontSize) {
      this.getEditor().execCommand(commandName, showUI, fontSize)
    }
  }
};
</script>