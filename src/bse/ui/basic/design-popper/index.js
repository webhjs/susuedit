/**
 * @Description: 设计模式 popper弹出框
 * @Author bianpengfei
 * @create 2022/5/11 10:25
 */
import Vue from 'vue'
import Main from './src/index.vue'

const Constructor = Vue.extend(Main)

let POOLS = [
  {
    target: null, // 当前的触发事件dom节点
    componentInstance: null // 组件实例
  }
] // 实例池，创建的实例都会放在这里，不重复的添加，重复的

const defaultOpts = {
  el: undefined, // 当前操作的dom对象
  editor: undefined, // 电子编辑器实例
  styles: { left: 0, top: 0 }, // 样式
  attrs: {
    // 这边存放el-popper 属性，参考文档：https://element.eleme.cn/#/zh-CN/component/popover
    options: [], // [{label: '数学', value: 1}]
    placement: 'bottom',
    width: 'fit-content',
    trigger: 'hover',
    'visible-arrow': true,
    'open-delay': 400,
    'popper-class': ''
  },
  listeners: {
    beforeShow: new Function(),
    beforeHide: new Function()
  }
}

const designPopperBubble = {
  /**
   * 创建vue的实例
   * @param opts
   */
  getInstance(opts = {}) {
    if (!opts.editor) return console.error(`[error：传入的editor实例不能为空]`)
    designPopperBubble.hideAll()
    opts = {
      ...defaultOpts,
      ...opts
    }
    const existItem = POOLS.find(v => v?.target === opts.el) // 查询是否已存在
    const { left, top } = opts.editor.getDomRectRelative(opts.el)
    opts.styles = {
      ...(opts.styles || {}),
      left: `${left}px`,
      top: opts.attrs.placement.includes('bottom') ? `${top - 7}px` : `${top + 7}px`,
      width: `${opts.el.clientWidth}px`,
      height: `${opts.el.clientHeight}px`
    }
    let { componentInstance } = existItem || {}
    if (!componentInstance) {
      // 如果组件实例不存在
      componentInstance = new Constructor({
        el: document.createElement('div')
      })
      POOLS.push({ target: opts.el, componentInstance })
      componentInstance.styles = opts.styles
      componentInstance.attrs = opts.attrs
      componentInstance.listeners = opts.listeners
      opts.editor.container.appendChild(componentInstance.$el)
      designPopperBubble.bindEvent(opts, componentInstance)
      return componentInstance
    }
    componentInstance.styles = opts.styles
    componentInstance.attrs = opts.attrs
    componentInstance.listeners = opts.listeners
    designPopperBubble.bindEvent(opts, componentInstance)
    return componentInstance
  },
  hideAll() {
    POOLS.forEach(pl => {
      pl.componentInstance?.hide()
    })
  },
  bindEvent(opts, instance) {
    let timmer
    const callBack = (e) => {
      const el = e.target
      const attr = opts.editor.getItorElementBseAttr(e.target);
      if (attr.descr === '不是"bse"标签元素') {
        timmer && clearTimeout(timmer)
        timmer = setTimeout(() => {
          instance.hide()
          opts.editor.document.removeEventListener('mouseover', callBack)
        }, 350)
      }
    }
    opts.editor.document.addEventListener('mouseover', callBack)


    const clearTimmer = () => {
      timmer && clearTimeout(timmer)
      instance.$refs.popper.$refs.popper.removeEventListener('mouseenter', clearTimmer)
    }
    instance.$refs.popper.$refs.popper.addEventListener('mouseenter', clearTimmer)
  }
}

export default designPopperBubble
