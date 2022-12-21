<!--
 * @Description: 设计模式 鼠标悬浮框  style="visibility: hidden; z-index: -999; position: absolute"
 * @Author bianpengfei
 * @create 2022/4/14 14:22
 -->
<template>
  <el-popover
    v-bind="attrs"
    v-on="listeners"
    ref="popper"
    :popper-class="`bse-popper-xfpuo9t3 bse-popper-border-primary bse-popper-p-0 ${
      attrs[`popper-class`]
    }`"
  >
    <el-button
      slot="reference"
      style="
        visibility: hidden;
        z-index: -999;
        position: absolute;
        display: inline-block;
      "
      :style="styles"
    ></el-button>

    <div class="wd-flex wd-items-center wd-text-13px wd-px-12px wd-py-2px">
      <span class="wd-mr-4px">{{ label }}：</span>
      <el-button
        v-if="isFunction(listeners.edit)"
        type="text"
        class="wd-text-[#28A670] underline"
        @click="onEdit"
        >编辑</el-button
      >
      <el-button
        v-if="isFunction(listeners.del)"
        type="text"
        class="!wd-text-[#ed3f13] underline"
        @click="onDel"
        >删除</el-button
      >
    </div>
  </el-popover>
</template>

<script>
export default {
  props: {
    attrs: {
      type: Object,
      default() {
        return {};
      },
    },
    listeners: {
      type: Object,
      default() {
        return {};
      },
    },
    styles: {
      type: Object,
      default() {
        return {
          left: "0",
          top: "0",
          height: "0",
          width: "0",
        };
      },
    },
  },
  data() {
    return {
      label: "文本",
    };
  },

  methods: {
    isFunction(fuc) {
      return fuc
        ? Object.prototype.toString.call(fuc) === "[object Function]"
        : false;
    },
    /**
     * 显示
     */
    show() {
      return new Promise(async (resolve) => {
        this.$nextTick(() => {
          this.$refs.popper.doShow && this.$refs.popper.doShow();
          resolve();
        });
      });
    },

    /**
     * 隐藏
     */
    hide() {
      return new Promise(async (resolve) => {
        this.$nextTick(async () => {
          this.$refs.popper.doClose && this.$refs.popper.doClose();
          resolve();
        });
      });
    },

    /**
     * 编辑
     */
    onEdit() {
      this.listeners.edit && this.listeners.edit();
      this.hide()
    },

    /**
     * 删除
     */
    onDel() {
      this.listeners.del && this.listeners.del();
      this.hide()
    },
  },
};
</script>

<style scoped lang="scss"></style>
