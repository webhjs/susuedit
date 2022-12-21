/**
 * @Description: 设置A4、A5、A6
 * @Author bianpengfei
 * @create 2022/5/30 09:56
 */

export default {
  install() {
    // 设置A4、A5、A6
    this.registerCommand('paper', {
      async execCommand(_, options, callback) {
        const { paper, pt, pb, pl, pr, w, h } = typeof options === 'string' ? { paper: options } : options // 可以设置一个对象或者一个字符串 
        const paperMapping = {
          A4: {
            w: 210, // 宽
            h: 297, // 高
            pt: 20, // 页边距 上
            pb: 15, // 页边距 下
            pl: 15, // 页边距 左
            pr: 15, // 页边距 右
            hh: 6.6, // 页眉
            fh: 14 // 页脚
          },
          A5: {
            w: 148,
            h: 210,
            pt: 20, // 页边距 上
            pb: 15, // 页边距 下
            pl: 15, // 页边距 左
            pr: 15, // 页边距 右
            hh: 6.6, // 页眉
            fh: 14 // 页脚
          },
          A6: {
            w: 105,
            h: 148,
            pt: 20, // 页边距 上
            pb: 15, // 页边距 下
            pl: 15, // 页边距 左
            pr: 15, // 页边距 右
            hh: 6.6, // 页眉
            fh: 14 // 页脚
          }
        }
        const _style = {
          height: computedPageSize(h ?? paperMapping[paper].h),
          width: computedPageSize(w ?? paperMapping[paper].w, 'horizontal'),
          paddingTop: computedPageSize(pt ?? paperMapping[paper].pt), // 页边距 上
          paddingBottom: computedPageSize(pb ?? paperMapping[paper].pb), // 页边距 下
          paddingLeft: computedPageSize(pl ?? paperMapping[paper].pl, 'horizontal'), // 页边距 左
          paddingRight: computedPageSize(pr ?? paperMapping[paper].pr, 'horizontal'), // 页边距 右
        }
        // a4 a5尺寸 vertical horizontal 
        function computedPageSize(physical, direction = 'vertical') {
          function get_dpi() {
            const result = []
            if (window.screen.deviceXDPI != undefined) {
              result[0] = window.screen.deviceXDPI
              result[1] = window.screen.deviceYDPI
            } else {
              const tmpNode = document.createElement('DIV')
              tmpNode.style.cssText = 'width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden'
              document.body.appendChild(tmpNode)
              result[0] = parseInt(tmpNode.offsetWidth)
              result[1] = parseInt(tmpNode.offsetHeight)
              tmpNode.parentNode.removeChild(tmpNode)
            }
            return result
          }
          const DPI = get_dpi()
          return `${direction === 'vertical' ? physical * (DPI[0] / 25.4) : physical * (DPI[1] / 25.4)}px`
        }
        function setPageStyle() {
          Array.from(this.getEditorArea().querySelectorAll('.bse-edit_page')).forEach(item => {
            Object.entries(_style).forEach(([key, value]) => {
              item.style[key] = value
            })
          })
        }
        
        this.setOption({ paper: paper })
        const result = setPageStyle.call(this)
        callback && callback(result)
      },

      queryCommandState() {},

      async queryCommandValue() {}
    })
  }
}
