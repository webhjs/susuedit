<template>
  <el-popover
    placement="bottom"
    popper-class="bse-edit_popover"
    trigger="hover"
  >
    <span>无序编号</span>
    <svg class="icon" aria-hidden="true" slot="reference" @click="handlerClick('insertUnorderedList')">
      <use xlink:href="#icon-insertUnorderedList"></use>
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