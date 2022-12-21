
import { getSelection } from '@bse/core/editorBase.js'
import domUtils from '@bse/core/domUtils.js'
import { jsonparse } from '@bse/utils/index.js'

// 当前节点是否是bse元素
function isBseElement(node) {
  return node && node.hasAttribute && node.hasAttribute('bse')
}

// 依赖分割线

// 当前节点是否是bse只读元素
function isBseNotAllowDeleteElement(node) {
  const attr = isBseElement(node)
    ? node &&
      (() => {
        const jsonify = node.getAttribute && node.getAttribute('bse')
        return jsonparse(jsonify)
      })()
    : { descr: '不是"bse"标签元素' }
  return attr.notallowdelete
}

// 当前节点是否是observe-bse元素
function isBseElementObserve(node) {
  return node && node.hasAttribute && node.hasAttribute('bse') && !node.hasAttribute('no-observe')
  ///^<(\S+)(?:(?!no-observe)[^<])*?bse\s*?=(?:(?!no-observe)[^<])*?>.*<\/\1>$/.test(node.outerHTML)
}

// 当时聚焦元素时候在标签内
function isBseElementInside(node) {
  let isInside = false
  while (node !== null && !isInside && node.nodeName !== 'BODY') {
    const hasAttr = isBseElement(node) && !node.hasAttribute('no-observe')
    hasAttr ? (isInside = true) : (node = node.parentNode)
  }
  return { node, isInside }
}

// 递归判断当前节点是否处于第一个节点
function isItorPrevChildNode(focus) {
  let isPrevChildFlag = false,
    prevChildNode = null,
    currentFocus = focus
  while (currentFocus && currentFocus.parentNode && currentFocus.parentNode.nodeName !== 'P' && isPrevChildFlag) {
    prevChildNode = currentFocus
    isPrevChildFlag = !currentFocus.previousSibling
    currentFocus = currentFocus.parentNode
  }
  return { isPrevChildFlag, prevChildNode } // { 是否是最后一个节点, 最后一个节点 }
}

// 递归判断当前节点是否处于最后一个节点
function isItorLastChildNode(focus) {
  let isLastChildFlag = false,
    lastChildNode = null,
    currentFocus = focus
  while (currentFocus && currentFocus.parentNode && currentFocus.parentNode.nodeName !== 'P' && isLastChildFlag) {
    lastChildNode = currentFocus
    isLastChildFlag = !currentFocus.nextSibling
    currentFocus = currentFocus.parentNode
  }
  return { isLastChildFlag, lastChildNode } // { 是否是最后一个节点, 最后一个节点 }
}

// 当前selection是否存在不可删除节点
function isHasNotAllowDeleteEle() {
  const selection = getSelection.call(this)
  const Range = selection.getRangeAt(0)
  const rangeContent = Range.cloneContents()
  for (let node of rangeContent.childNodes) {
    const attr = domUtils.getElementAttribute(node)
    return attr.notallowdelete
  }
  return false
}

// 当时聚焦元素时候在标签内
function isFocusInsideEle() {
  const select = getSelection.call(this)
  let current = select.focusNode,
    Flag = null
  while (current !== null && !Flag && current.nodeName !== 'BODY') {
    const hasAttr = isBseElement(current)
    hasAttr ? (Flag = current) : (current = current.parentNode)
  }
  return Flag
}

// 当时聚焦元素时候在P标签内
function isFocusInsidePTag(current) {
  let Flag = false
  while (current !== null && !Flag && current.getAttribute('class') !== 'bse-page-body' && current.nodeName !== 'BODY') {
    current = current.parentNode
    const hasAttr = current.nodeName === 'P'
    hasAttr && (Flag = true)
  }
  return Flag
}

export {
  isBseNotAllowDeleteElement,
  isBseElementObserve,
  isBseElementInside,
  isBseElement,
  isItorPrevChildNode,
  isHasNotAllowDeleteEle,
  isItorLastChildNode,
  isFocusInsideEle,
  isFocusInsidePTag
}