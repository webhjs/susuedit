/**
 * @Description: 工具
 * @Author bianpengfei
 * @create 2022/5/20 10:32
 */
const path = require('path')

const ROOT_PATH = path.resolve(__dirname, '../') // 根目录路径
const LIB_HOME = path.join(ROOT_PATH, 'src/bse') // lib库路径
const IS_PRO = process.env.NODE_ENV === 'production' // 是否是生产环境
const IS_LIB = process.argv.includes('--target') && process.argv.includes('lib') // 是否库模式
const LIB_OUTPUT = path.join(ROOT_PATH, 'dist-lib') // 库模式打包出来
const APP_OUTPUT = path.join(ROOT_PATH, 'dist-app') // app 模式打包出来
const DOCS_OUTPUT = path.join(ROOT_PATH, 'dist-docs') // 文档打包出来
const THEME_CSS_ENTRY = path.join(ROOT_PATH, 'public/statics/index.css') // theme主题css入口

module.exports = {
  LIB_HOME,
  IS_PRO,
  ROOT_PATH,
  IS_LIB,
  LIB_OUTPUT,
  APP_OUTPUT,
  DOCS_OUTPUT,
  THEME_CSS_ENTRY
}
