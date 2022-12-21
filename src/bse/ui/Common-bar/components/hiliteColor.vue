<template>
  <el-popover
    placement="bottom"
    popper-class="bse-edit_popover"
    trigger="hover"
  >
    <span>背景颜色</span>
    <svg class="icon" aria-hidden="true" slot="reference" @click="handlerClick('hiliteColor', true, 'red')">
      <use xlink:href="#icon-hiliteColor"></use>
    </svg>
  </el-popover>
</template>

<script>
export default {
  inject: ['getEditor'],
  methods: {
    handlerClick(commandName, showUI, hiliteColor) {
      this.getEditor().execCommand(commandName, showUI, hiliteColor)
    }
  }
};
</script>