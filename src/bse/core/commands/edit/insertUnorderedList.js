/**
 * @Description: 复制
 * @Author bianpengfei
 * @create 2022/6/3 00:12
 */
export default {
  install() {
    // 复制
    this.registerCommand('insertUnorderedList', {
      execCommand() {
        this.document.execCommand('insertUnorderedList')
      },
      queryCommandState() {}
    })
  }
}
