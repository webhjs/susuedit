/**
 * @Description: 复制
 * @Author bianpengfei
 * @create 2022/6/3 00:12
 */
export default {
  install() {
    // 获取xml字符串
    this.registerCommand('getexportxmlorhtmlstring', {
      execCommand(_, payload, callback) {
        let result = ''
        if (payload.htmlstring) {
          result = this.getContent()
        } else {
          result = this.exportXmlFile(null, payload.version || '4.0')
        }
        callback && callback(result)
      },
      queryCommandState() {}
    })
  }
}
