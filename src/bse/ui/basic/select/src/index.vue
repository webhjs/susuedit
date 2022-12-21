<!--
 * @Description: select 选择器
 * @Author bianpengfei
 * @create 2022/4/14 14:22
 -->
<template>
  <span style="visibility: hidden; z-index: -999; position: absolute">
    <el-select
      v-if="initial"
      v-model="value"
      v-bind="attrs"
      v-on="listeners"
      ref="selectRef"
      style="width: 0; height: 16px; display: inline-block"
    >
      <template v-if="Array.isArray(attrs.options) && attrs.options.length">
        <el-option v-for="item in attrs.options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
      </template>
    </el-select>
  </span>
</template>

<script>
export default {
  data() {
    return {
      initial: false, //是否初始化
      value: '', // 绑定的值
      attrs: {}, // 所有属性
      listeners: {} // 所有事件属性
    }
  },
  mounted() {
    this.init()
  },

  methods: {
    /**
     * 初始化init
     */
    init() {
      this.initial = true
    },

    /**
     * 显示
     */
    show() {
      return new Promise(resolve => {
        this.$nextTick(() => {
          this.$refs.selectRef.visible = true
          resolve()
        })
      })
    },

    /**
     * 隐藏
     */
    hide() {
      return new Promise(resolve => {
        this.$nextTick(() => {
          this.$refs.selectRef?.handleClose?.()
          resolve()
        })
      })
    }
  }
}
</script>

<style scoped lang="scss"></style>
