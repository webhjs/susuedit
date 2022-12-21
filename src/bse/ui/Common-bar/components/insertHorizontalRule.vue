<template>
  <el-popover
    placement="bottom"
    popper-class="bse-edit_popover"
    trigger="hover"
  >
    <span>分割线</span>
    <svg class="icon" aria-hidden="true" slot="reference" @click="handlerClick('insertHorizontalRule')">
      <use xlink:href="#icon-insertHorizontalRule"></use>
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