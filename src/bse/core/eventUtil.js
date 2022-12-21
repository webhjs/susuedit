import {
  isHasNotAllowDeleteEle,
  isItorPrevChildNode,
  isItorLastChildNode,
  isBseNotAllowDeleteElement,
} from "@bse/core/domBase.js";
import { getSelection } from "@bse/core/editorBase.js";
import domUtils from "@bse/core/domUtils.js";
import eventBaseUtil from "@bse/core/eventBase.js";
import { isBseElement } from "@bse/core/domBase.js";

// 前删 需要this指向
function backspace(e) {
  // /* 焦点在外部操作 */
  if (isHasNotAllowDeleteEle.call(this)) {
    e.preventDefault();
    console.log("选中区域存在禁止删除元素");
    return;
  }
  const selection = getSelection.call(this);
  let focus = selection.focusNode;
  /* 焦点在内部操作 */
  const bseProps = domUtils.getItorElementBseAttr(focus);

  const { contenteditable, notallowdelete, elSrc } = bseProps || {};

  if (contenteditable === false) {
    e.preventDefault();
    return;
  }
  /* 焦点在禁止删除元素开头位置 */
  if (
    notallowdelete === true &&
    [0, 1].includes(elSrc.children.length) &&
    (/^(\s|\\n)$/.test(selection.focusNode.textContent) ||
      /^(\s|\\n)$/.test(elSrc.innerText)) &&
    [8].includes(e.keyCode)
  ) {
    e.preventDefault();
    return;
  }
  /* 焦点在内部操作 */
  /* 开头是元素标签 */
  if (
    focus.nodeName === "P" &&
    [0].includes(selection.focusOffset) &&
    [8].includes(e.keyCode)
  ) {
    e.preventDefault();
    const index = domUtils.getNodeIndex(focus);
    const prevNode = focus.parentNode.childNodes[index - 1];
    const Range = selection.getRangeAt(0);
    prevNode && Range.selectNodeContents(prevNode);
    Range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(Range);

    prevNode &&
      prevNode.childNodes.length == 1 &&
      prevNode.childNodes[0].nodeName == "BR" &&
      prevNode.childNodes[0].remove();
    prevNode &&
      prevNode.insertAdjacentHTML &&
      prevNode.insertAdjacentHTML("beforeend", focus.innerHTML);
    focus.remove();
    return;
  }
  /* 开头是元素标签 */

  /* 焦点定位在zero元素外层需要元素选区定位至内部 */
  if (focus.nodeName === "P" && [8].includes(e.keyCode)) {
    let focusOffsetNode = focus.childNodes[selection.focusOffset - 1];
    if (/^(\u200B|\u200C|\u200D)+$/g.test(focusOffsetNode.textContent)) {
      const Range = selection.getRangeAt(0);
      Range.selectNodeContents(focusOffsetNode);
      Range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(Range);
      focus = selection.focusNode; // 重新定位选择区
    }
  }
  /* 焦点定位在zero元素外层需要元素选区定位至内部 */

  /* 焦点在外部操作 */
  let index = domUtils.getNodeIndex(focus);
  let prevNode = focus.parentNode.childNodes[index - 1];

  /* 递归删除空节点 */
  const { isPrevChildFlag, prevChildNode } = isItorPrevChildNode(focus);
  if (isPrevChildFlag && [8].includes(e.keyCode)) {
    const prevParent = prevChildNode.parentNode;
    index = domUtils.getNodeIndex(prevParent);
    let prevNextNode = prevParent.parentNode?.childNodes[index - 1];
    if (prevNextNode) {
      while (
        /^(\u200B|\u200C|\u200D)+$/g.test(prevNextNode.textContent) ||
        (prevNextNode.textContent == "" &&
          !isBseNotAllowDeleteElement(prevNextNode))
      ) {
        // 如何后一个节点是零宽字符就删除 在前移一位
        prevNextNode.remove();
        index--;
        prevNextNode = prevParent.parentNode?.childNodes[index];
      }
    }
    prevNode = prevNextNode;
  }
  /* 递归删除空节点 */
  if (prevNode) {
    if (isBseNotAllowDeleteElement(prevNode)) {
      [0].includes(selection.focusOffset) &&
        [8].includes(e.keyCode) &&
        e.preventDefault();
      [1].includes(selection.focusOffset) &&
        [8].includes(e.keyCode) &&
        /^(\u200B|\u200C|\u200D)+$/g.test(focus.textContent) &&
        e.preventDefault();
    } else {
      if ([8].includes(e.keyCode) && isBseElement(prevNode)) {
        if ([0].includes(selection.focusOffset)) {
          e.preventDefault();
          prevNode.remove();
          if (/^(\u200B|\u200C|\u200D)+$/g.test(focus.textContent)) {
            focus.remove();
          }
        } else if ([1].includes(selection.focusOffset)) {
          if (/^(\u200B|\u200C|\u200D)+$/g.test(focus.textContent))
            prevNode.remove();
          else {
            prevNode.insertAdjacentHTML("afterend", "\u200D");
          }
        }
      }
    }
  }
  /* 焦点在外部操作 */
}

// 后删
function deleteKeyDow(e) {
  // 需要绑定this
  if (isHasNotAllowDeleteEle.call(this)) {
    e.preventDefault();
    this.$message.warning("选中区域存在禁止删除元素");
    return;
  }
  const selection = getSelection.call(this);
  const length = selection.focusNode.length;
  const focus = selection.focusNode;

  /* 焦点在内部操作 */
  const bseProps = domUtils.getItorElementBseAttr(focus);
  const { contenteditable } = bseProps || {};

  if (contenteditable === false) {
    e.preventDefault();
    return;
  }
  /* 焦点在内部操作 */

  /* 焦点在行首操作 */
  if ([0].includes(selection.focusOffset) && focus.nodeName === "P") {
    const nextNode = focus.childNodes[0];
    if (nextNode) {
      if (isBseNotAllowDeleteElement.call(this, nextNode)) {
        e.preventDefault();
        return;
      } else if (isBseElement(nextNode)) {
        nextNode.remove(); // 移除整个节点
        return;
      }
    }
  }
  /* 焦点在行首操作 */

  /* 焦点在行尾操作 */
  let focusParentIsP = focus;
  while (
    focusParentIsP &&
    focusParentIsP.parentNode &&
    focusParentIsP.parentNode.nodeName !== "P"
  ) {
    focusParentIsP = focusParentIsP.parentNode;
  }
  const focusIsIndex = domUtils.getNodeIndex(focus);

  if (
    [length].includes(selection.focusOffset) &&
    focusParentIsP.parentNode &&
    focusParentIsP.parentNode.childNodes.length === focusIsIndex + 1
  ) {
    e.preventDefault();
    const focusIsP = focusParentIsP.parentNode;
    const isPindex = domUtils.getNodeIndex(focusIsP);
    const nextNode = focusIsP.parentNode.childNodes[isPindex + 1];
    if (nextNode) {
      focusIsP.insertAdjacentHTML("beforeend", nextNode.innerHTML || "");
      nextNode.remove();
    }
    return;
  }
  /* 焦点在行尾操作 */

  /* 焦点在外部操作 */
  let index = domUtils.getNodeIndex(focus);
  let nextNode = focus.parentNode.childNodes[index + 1];

  /* 递归删除空节点 */
  const { isLastChildFlag, lastChildNode } = isItorLastChildNode(focus);
  if (isLastChildFlag) {
    const lastParent = lastChildNode.parentNode;
    index = domUtils.getNodeIndex(lastParent);
    let lastNextNode = lastParent.parentNode?.childNodes[index + 1];
    if (lastNextNode) {
      while (
        /^(\u200B|\u200C|\u200D)+$/g.test(lastNextNode.textContent) ||
        (lastNextNode.textContent == "" &&
          !isBseNotAllowDeleteElement.call(this, lastNextNode))
      ) {
        // 如何后一个节点是零宽字符就删除 在后移一位
        lastNextNode.remove();
        index++;
        lastNextNode = lastParent.parentNode?.childNodes[index];
      }
    }
    nextNode = lastNextNode;
  }
  /* 递归删除空节点 */

  if (nextNode) {
    if (isBseNotAllowDeleteElement.call(this, nextNode)) {
      ([length].includes(selection.focusOffset) ||
        /^(\u200B|\u200C|\u200D)+$/g.test(focus.textContent)) &&
        e.preventDefault();
    } else if (
      ([length].includes(selection.focusOffset) ||
        /^(\u200B|\u200C|\u200D)+$/g.test(focus.textContent)) &&
      isBseElement(nextNode)
    ) {
      e.preventDefault();
      nextNode.remove(); // 移除整个节点
    }
  }
  /* 焦点在外部操作 */
}

export default {
  ...eventBaseUtil,
  backspace,
  deleteKeyDow,
};
