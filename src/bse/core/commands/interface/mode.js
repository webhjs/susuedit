/**
 * @Description: 页面设置
 * @Author bianpengfei
 * @create 2022/6/3 00:11
 */

export default {
  install() {
    // 页面设置
    this.registerCommand('mode', {
      async execCommand(_, name) {
        let modeList = [`previewMode`, `editMode`, `designMode`]
        if (!modeList.includes(name)) {
          return this.ui.$notify.error(`切换的模式需为 ${modeList.map(v => `[${v}]`).join('、')}`)
        }

        switch (name) {
          case 'previewMode':
            // 预览模式
            this.getEditorArea().classList = ['bse-area__preview']
            this.getEditorArea().contentEditable = false
            break
          case 'editMode':
            // 编辑模式
            this.getEditorArea().classList = ['bse-area__edit']
            this.getEditorArea().contentEditable = false
            break
          case 'designMode':
            // 设计模式
            this.getEditorArea().classList = ['bse-area__design']
            this.getEditorArea().contentEditable = false
            break
          default:
            break
        }
        this.setOption({ mode: name })
        return `切换${name}模式成功`
      },
      queryCommandState() {}
    })
  }
}
