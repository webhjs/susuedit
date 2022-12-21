<template>
  <el-popover
    placement="bottom"
    popper-class="bse-edit_popover"
    trigger="hover"
  >
    <span>有序编号</span>
    <svg class="icon" aria-hidden="true" slot="reference" @click="handlerClick('insertOrderedList')">
      <use xlink:href="#icon-insertOrderedList"></use>
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