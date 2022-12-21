<!--
 * @Description: TimePicker 时间选择器
 * @Author bianpengfei
 * @create 2022/4/14 14:22
 -->
<template>
  <span style="visibility: hidden; z-index: -999; position: absolute">
    <el-date-picker
      v-if="initial"
      v-model="value"
      v-bind="attrs"
      v-on="listeners"
      ref="datePicker"
      style="width: 0; height: 16px; display: inline-block"
    >
    </el-date-picker>
  </span>
</template>

<script>
export default {
  name: 'date-picker',

  data() {
    return {
      initial: false,
      value: '',
      attrs: {}, // 所有属性
      listeners: {} // 所有监听事件
    }
  },
  mounted() {},

  methods: {
    /**
     * 显示
     */
    show() {
      return new Promise(resolve => {
        this.$nextTick(() => {
          this.initial = true
          this.$nextTick(() => {
            this.$refs.datePicker?.showPicker?.()
            resolve()
          })
        })
      })
    },

    /**
     * 隐藏
     */
    hide() {
      return new Promise(async resolve => {
        // this._hideAll && (await this._hideAll())
        this.$nextTick(() => {
          this.$refs.datePicker?.hidePicker?.()
          this.initial = false
          resolve()
        })
      })
    }
  }
}
</script>

<style scoped></style>
