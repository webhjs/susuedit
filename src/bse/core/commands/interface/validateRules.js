/**
 * @Description: 复制
 * @Author bianpengfei
 * @create 2022/6/3 00:12
 */
export default {
  install() {
    // 校验数据规则
    this.registerCommand('validaterules', {
      execCommand(_, callback) {
        const result = this.validateRules()
        callback && callback(result)
      },
      queryCommandState() {}
    })
  }
}
