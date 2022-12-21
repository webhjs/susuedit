<template>
  <div class="bse-edit_status">
    <span>🟢 页码: 1 页面: 1/1</span>
    <span class="bse-page_set">
      <svg class="icon" aria-hidden="true" slot="reference">
        <use xlink:href="#icon-good"></use>
      </svg>
      <span class="bse-foot_set"
        >浏览模式:【{{ modeMapping[mode] }}】 页面设置:【{{ paper }}】</span
      >
    </span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      modeMapping: {
        "editMode": "编辑模式",
        "designMode": "设计模式",
        "previewMode": "预览模式",
      },
    };
  },
  props: {
    mode: {
      type: String,
      default: "editMode",
    },
    paper: {
      type: String,
      default: "A4",
    },
  },
};
</script>
<style scoped>
.bse-edit_status {
  height: 40px;
  line-height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3%;
  border: 1px solid #eee;
}
.bse-edit_status .bse-page_set {
  display: flex;
  justify-content: center;
  align-items: center;
}
.bse-edit_status .bse-page_set .bse-foot_set {
  margin-left: 5px;
}
</style>
