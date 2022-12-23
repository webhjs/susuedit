/**
 * @Description: 打包iframe.css 并压缩
 * @Author bianpengfei
 * @create 2022/5/20 09:50
 */
const baseIframeCssConfig = require('./webpack.iframe-css.bse')
const { THEME_CSS_ENTRY, APP_OUTPUT } = require('./utils')
const path = require('path')

module.exports = () => {
  const config = baseIframeCssConfig()
  config.mode('production')
  config
    // Interact with entry points
    .entry('index')
    .add(THEME_CSS_ENTRY)
  config.output.path(path.resolve(APP_OUTPUT, 'theme')).filename('[name].js').end()
  return config.toConfig()
}
