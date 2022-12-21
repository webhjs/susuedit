/**
 * @Description: 复制
 * @Author bianpengfei
 * @create 2022/6/3 00:12
 */
export default {
  install() {
    // 插入xml模板
    this.registerCommand('inserthtmlorxmlstringbyparams', {
      execCommand(_, payload, fileString, callback) {
        for(let [key, value] of Object.entries(fileString) ) {
          this.execCommand(key, value)
        }
        const result = this.insertHtmlOrXmlStringByParams(payload, fileString)
        callback && callback(result)
      },
      queryCommandState() {}
    })
  }
}
