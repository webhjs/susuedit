/**
 * @Description: 复制
 * @Author bianpengfei
 * @create 2022/6/3 00:12
 */
export default {
  install() {
    // 插入xml模板
    this.registerCommand('insertpageheaderxmlorhtmlstringbyparams', {
      execCommand(_, headerInfo, payload, callback) {
        for(let [key, value] of Object.entries(payload) ) {
          this.execCommand(key, value)
        }
        const result = this.insertPageHeaderXmlOrHtmlStringByParams(headerInfo, payload)
        callback && callback(result)
      },
      queryCommandState() {}
    })
  }
}
