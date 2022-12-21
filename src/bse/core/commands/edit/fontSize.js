/**
 * @Description: 粘贴
 * @Author bianpengfei
 * @create 2022/6/3 00:13
 */

export default {
  install() {
    // 粘贴
    this.registerCommand('fontName', {
      async execCommand(_, showUi, fontName) {
        this.document.execCommand('fontName', showUi, fontName)
      },
      async queryCommandState() {
        return this.__cache_range?.content ? 1 : 0
      }
    })
  }
}
