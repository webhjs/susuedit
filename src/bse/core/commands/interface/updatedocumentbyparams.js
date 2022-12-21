/**
 * @Description: 复制
 * @Author bianpengfei
 * @create 2022/6/3 00:12
 */
export default {
  install() {
    // 插入xml模板
    this.registerCommand('updatedocumentbyparams', {
      execCommand(_, payload, callback) {
        const result = this.updatedocumentbyparams(payload)
        callback && callback(result)
      },
      queryCommandState() {}
    })
  }
}
