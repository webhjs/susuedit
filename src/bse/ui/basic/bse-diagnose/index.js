import Vue from 'vue'
import Diagnose from './index.vue'

const FactoryDiagnose = Vue.extend(Diagnose)

export default {
  extra: {
    instance: null
  },
  getInstance(opts = {}) {
    const { editor } = opts
    if (!this.extra.instance) {
      this.extra.instance = new FactoryDiagnose({ el: document.createElement('div') })
      editor.container.appendChild(this.extra.instance.$el)
    }
    return this.extra.instance
  }
}
