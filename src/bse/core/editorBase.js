// 获取select属性
function getSelection() {
  // ie: const selection = document.selection.createRange();
  const selection = this.window.getSelection()
  return selection
}

// 创建range对象
function creatRange() {
  // range = document.createRange();
  const range = new this.window.Range()
  return range
}

export {
  getSelection,
  creatRange
}