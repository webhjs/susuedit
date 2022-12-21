/**
 * @Description: 日期选择
 * @Author bianpengfei
 * @create 2022/5/11 10:25
 */
import Vue from 'vue'
import TimePicker from './src/index.vue'

const Constructor = Vue.extend(TimePicker)

const POOLS = [
  {
    target: null, // 当前的触发事件dom节点
    componentInstance: null // 组件实例
  }
] // 实例池，创建的实例都会放在这里，不重复的添加，重复的

const defaultOpts = {
  value: '', // timePicker绑定的值
  el: undefined, // 当前操作的dom对象
  editor: undefined, // 电子编辑器实例
  attrs: {
    // 这边存放el-time-picker 属性，参考文档：https://element.eleme.cn/#/zh-CN/component/date-picker
    type: 'date',
    'picker-options': {},
    'value-format': 'yyyy-MM-dd',
    format: 'yyyy-MM-dd',
    'popper-class': 'bse-date-picker'
  },
  listeners: {} // 监听事件
}

const datePicker = {
  /**
   * 创建vue的实例
   * @param opts
   */
  getInstance(opts = defaultOpts) {
    if (!opts.editor) return console.error(`[error：传入的editor实例不能为空]`)
    opts = Object.assign(defaultOpts, opts)
    const existItem = POOLS.find(v => v?.target === opts.el) // 查询是否已存在
    const { left, top } = opts.editor.getDomRectRelative(opts.el)
    let { componentInstance } = existItem || {}
    if (!componentInstance) {
      // 如果组件实例不存在
      componentInstance = new Constructor({
        el: document.createElement('div')
      })
      POOLS.push({ target: opts.el, componentInstance })
      componentInstance.$el.style.left = `${left}px`
      componentInstance.$el.style.top = `${top}px`
      componentInstance.attrs = opts.attrs
      componentInstance.listeners = opts.listeners
      opts.editor.container.appendChild(componentInstance.$el)
      datePicker.bindEvent(opts, componentInstance)
      return componentInstance
    }
    componentInstance.$el.style.left = `${left}px`
    componentInstance.$el.style.top = `${top}px`
    componentInstance.attrs = opts.attrs
    componentInstance.listeners = opts.listeners
    datePicker.bindEvent(opts, componentInstance)
    return componentInstance
  },

  bindEvent(opts, instance) {
    opts.editor.getEditorArea().removeEventListener('click', callBack)
    const callBack = () => {
      instance.hide()
      opts.editor.getEditorArea().removeEventListener('click', callBack)
    }
    opts.editor.getEditorArea().addEventListener('click', callBack)
  }
}

export default datePicker
