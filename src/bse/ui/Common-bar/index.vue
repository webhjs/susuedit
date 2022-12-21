<template>
  <div class="bse-common_bar">
    <div class="bse-bar_wrap">
      <template v-for="tool in toolBar">
        <component :key="tool.name" :is="commonBarComponents[tool.name]"></component>
      </template>
    </div>
  </div>
</template>

<script>
const modulesFiles = require.context("@bse/ui/Common-bar/components", true, /\.vue$/);
const commonBarComponents = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});
export default {
  props: {
    toolBar: {
      type: Array,
      default:() => ([])
    }
  },
  data() {
    return {
      commonBarComponents
    }
  }
};
</script>

<style>
.bse-common_bar {
  height: 40px;
  line-height: 40px;
  text-align: center;
}
.bse-common_bar .bse-bar_wrap {
  display: inline-block;
}
.bse-common_bar .bse-bar_wrap>span {
  display: inline-block;
  height: 40px;
  line-height: 40px;
  min-width: 40px;
  cursor: pointer;
}
.bse-common_bar .bse-bar_wrap>span .el-popover__reference-wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.bse-common_bar .bse-bar_wrap>span i{
  color: var(--teal);
  font-size: 20px;
}
.bse-edit_popover.el-popper[x-placement^="bottom"] {
  padding: 3px 8px;
  min-width: auto;
  font-size: 12px;
}
</style>
