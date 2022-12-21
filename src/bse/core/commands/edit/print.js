/**
 * @Description: 设置A4、A5、A6
 * @Author bianpengfei
 * @create 2022/5/30 09:56
 */
import Print from "@bse/plugins/print";
export default {
  install() {
    // 设置A4、A5、A6
    this.registerCommand("print", {
      async execCommand(_, callback) {
        const print = new Print(this.getEditorArea(), {
          document: this.document,
        });
        const result = await print.run();
        callback && callback(result);
      },

      queryCommandState() {},
    });
  },
};
