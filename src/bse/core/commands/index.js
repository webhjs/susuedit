export default {
  install () {
    const excommand = require.context('@bse/core/commands', true, /^(?!\.\/index).*?\.js$/)
    excommand.keys().reduce((pre, cur) => {
      const context = excommand(cur).default
      context.install.call(this)
    }, {})
  }
}