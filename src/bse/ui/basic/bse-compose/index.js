import Vue from 'vue'
import Compose from './index.vue'

const FactoryCompose = Vue.extend(Compose)

export default {
  extra: {
    instance: null
  },
  getInstance(opts = {}) {
    const { editor } = opts
    if (!this.extra.instance) {
      this.extra.instance = new FactoryCompose({ el: editor.document.createElement('div') })
      editor.container.appendChild(this.extra.instance.$el)
    }
    return this.extra.instance
  }
}
