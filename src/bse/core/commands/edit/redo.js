/**
 * @Description: 粘贴
 * @Author bianpengfei
 * @create 2022/6/3 00:13
 */

export default {
  install() {
    // 粘贴
    this.registerCommand('redo', {
      async execCommand() {
        this.document.execCommand('redo')
      },
      async queryCommandState() {
        return this.__cache_range?.content ? 1 : 0
      }
    })
  }
}
