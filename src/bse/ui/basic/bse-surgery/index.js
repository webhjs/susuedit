import Vue from 'vue'
import Surgery from './index.vue'

const FactorySurgery = Vue.extend(Surgery)

export default {
  extra: {
    instance: null
  },
  getInstance(opts = {}) {
    const { el, editor } = opts
    if (!this.extra.instance) {
      this.extra.instance = new FactorySurgery({ el: document.createElement('div') })
      editor.container.appendChild(this.extra.instance.$el)
    }
    return this.extra.instance
  }
}
