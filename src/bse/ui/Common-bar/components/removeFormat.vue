<template>
  <el-popover
    placement="bottom"
    popper-class="bse-edit_popover"
    trigger="hover"
  >
    <span>清除格式</span>
    <svg class="icon" aria-hidden="true" slot="reference" @click="handlerClick('removeFormat')">
      <use xlink:href="#icon-removeFormat"></use>
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
