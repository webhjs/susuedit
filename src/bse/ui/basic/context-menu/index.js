/**
 * @Description: contex-menu
 * @Author bianpengfei
 * @create 2022/5/11 10:25
 */
import Vue, {defineAsyncComponent} from 'vue'
import Contextmenu from './src/Contextmenu'
import Submenu from './src/Submenu'
import { COMPONENT_NAME } from './utils/constant'

const ContextmenuConstructor = Vue.extend(Contextmenu)
Vue.component(COMPONENT_NAME, Submenu)

function install(app) {
  let lastInstance = null
  const ContextmenuProxy = function (options) {
    let instance = new ContextmenuConstructor()
    instance.items = options.items
    instance.editoInstance = options.editoInstance
    instance.position.x = options.x || 0
    instance.position.y = options.y || 0
    if (options.event) {
      instance.position.x = options.event.clientX
      instance.position.y = options.event.clientY
    }
    instance.customClass = options.customClass
    options.minWidth && (instance.style.minWidth = options.minWidth)
    options.zIndex && (instance.style.zIndex = options.zIndex)
    ContextmenuProxy.destroy()
    lastInstance = instance
    instance.$mount()
  }
  ContextmenuProxy.destroy = function () {
    if (lastInstance) {
      lastInstance.$destroy()
      lastInstance.$el?.remove()
      lastInstance = null
    }
  }
  app.prototype.$contextmenu = ContextmenuProxy
}

export default {
  install
}
