import composeDialog from '@bse/ui/basic/bse-compose'
export default {
  install() {
    // 插入图片
    this.registerCommand('composeelementdialog', {
      execCommand(_, params, callback) {
        if (this.__composeDialog) {
          this.__composeDialog.show(this, params)
        } else {
          this.__composeDialog = composeDialog.getInstance({ editor: this })
          this.__composeDialog.show(this, params)
        }
        this.__composeDialog.$on('submitFrom', payload => {
          const html = this.getContent()
          const labelEle = payload.module === 'moduleEle' ? 'section' : 'dnf'
          const divContainer = this.document.createElement(labelEle)
          divContainer.setAttribute('bse', encodeURIComponent(JSON.stringify(payload)))
          divContainer.setAttribute('class', 'bse-element')
          divContainer.innerHTML = html
          // 回调函数
          callback && callback(divContainer.outerHTML, payload)
          this.__composeDialog.$off('submitFrom')
        })
      },
      queryCommandState() {}
    })
  }
}
