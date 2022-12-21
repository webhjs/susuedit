<template>
  <el-popover
    placement="bottom"
    popper-class="bse-edit_popover"
    trigger="hover"
  >
    <span>文字颜色</span>
    <svg class="icon" aria-hidden="true" slot="reference" @click="handlerClick('foreColor', true, 'red')">
      <use xlink:href="#icon-foreColor"></use>
    </svg>
  </el-popover>
</template>

<script>
export default {
  inject: ['getEditor'],
  methods: {
    handlerClick(commandName, showUI, foreColor) {
      this.getEditor().execCommand(commandName, showUI, foreColor)
    }
  }
};
</script>