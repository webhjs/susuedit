import { isBseElement, isBseElementObserve } from "@bse/core/domBase.js";
import { jsonparse } from "@bse/utils/index.js";

// 创建元素并添加属性
function createElement(createdTag, prototype) {
  const newTag = document.createElement(createdTag);
  prototype && Object.entries(prototype).forEach(([key, value]) => {
    newTag[key] = value;
  });
  return newTag;
}

// 替换0宽字符
function addZeroWidth(str = "") {
  return str.replace(
    /(<\/[^<]+>)?(<(\S+)(?:(?!no-observe)[^<])*?bse=(?:(?!no-observe)[^<])*?>)(?:(?:\b&#8203;\b)*)(.*?<\/\3>)(<[^>]*?>)?/g,
    (_, capture1, capture2, _3, capture4, capture5) => {
      const zero = "&#8203;";
      return capture1
        ? capture5
          ? capture1 + zero + capture2 + capture4 + zero + capture5
          : capture1 + zero + capture2 + capture4
        : capture5
        ? capture2 + capture4 + zero + capture5
        : capture2 + capture4;
    }
  );
}

// 获取标签位置索引
function getNodeIndex(node, ignoreTextNode) {
  let preNode = node,
    i = 0;
  while ((preNode = preNode.previousSibling)) {
    if (ignoreTextNode && preNode.nodeType == 3) {
      if (preNode.nodeType != preNode.nextSibling.nodeType) {
        i++;
      }
      continue;
    }
    i++;
  }
  return i;
}

// 获取当前元素属性
function getElementAttribute(ele) {
  return isBseElement(ele)
    ? ele && jsonparse(ele.getAttribute && ele.getAttribute("bse"))
    : { descr: '不是"bse"标签元素' };
}

// 递归获取bse标签属性
function getItorElementBseAttr(target) {
  let result = { descr: '不是"bse"标签元素' };
  while (target && target.nodeName !== "BODY") {
    const attr = getElementAttribute(target);
    if (attr.descr !== '不是"bse"标签元素') {
      result = { ...attr, elSrc: target };
      break;
    }
    target = target.parentNode;
  }
  return result;
}

// 只删除删除父节点，保留子节点
function removePrentNode(node) {
  let parent = node.parentNode,
    child;
  if (parent) {
    if (node.hasChildNodes()) {
      while ((child = node.firstChild)) {
        parent.insertBefore(child, node);
      }
    }
    parent.removeChild(node);
  }
  return node;
}

// 获取当前元素位置
function getElementPosition(ele) {
  let top = ele.offsetTop
  let left = ele.offsetLeft
  var current = ele.offsetParent
  while (current !== null && current.nodeName !== 'BODY') {
    console.dir(current)
    top += current.offsetTop - current.scrollTop
    left += current.offsetLeft - current.scrollLeft
    current = current.offsetParent
  }
  return {
    top,
    left
  }
}

export default {
  createElement,
  addZeroWidth,
  getNodeIndex,
  getElementAttribute,
  getItorElementBseAttr,
  removePrentNode,
  getElementPosition,
  isBseElementObserve  
};
