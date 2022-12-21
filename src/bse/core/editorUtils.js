import { isBseElementInside, isFocusInsidePTag } from "@bse/core/domBase.js";
import domUtils from "@bse/core/domUtils.js";
import { getSelection, creatRange } from "@bse/core/editorBase.js";

// 设置文本内容 需要this指向
function setContent(htmlStr) {
  const result = domUtils.addZeroWidth(htmlStr);
  const edit = this.getEditorArea().querySelector(".bse-content_editable");
  edit.innerHTML = result;
}

// 获取页面内容 需要this指向
function getContent() {
  let innerHTMLStr = "";
  this.getEditorArea()
    .querySelectorAll(".bse-content_editable")
    .forEach((content) => {
      innerHTMLStr += content.innerHTML;
    });
  return innerHTMLStr;
}

// 用于插入html标签
function insertHtml(html, isAddZero = true) {
  const selection = getSelection.call(this);
  if (
    isBseElementInside(selection.focusNode).isInside ||
    !selection.focusNode ||
    domUtils.getItorElementBseAttr(selection.focusNode).contenteditable ===
      false
  ) {
    console.error("不可在业务元素中插入节点");
    return;
  }
  const Range = selection.getRangeAt(0);
  !Range.collapsed & Range & Range.deleteContents();
  const edit = this.getEditorAreaFocus();
  edit.focus();
  // if (!Range.startOffset && !isFocusInsidePTag(Range.commonAncestorContainer)) {
  //   // 当处于页面div.bse-page-body下
  //   Range.selectNodeContents(Range.commonAncestorContainer.childNodes[0]);
  //   Range.collapse(true);
  // }
  const pTag = this.document.createElement("p");
  pTag.innerHTML = html;
  Range.insertNode(pTag);
  Range.collapse(true);
  const index = domUtils.getNodeIndex(pTag);
  const pTagParent = pTag.parentNode;
  domUtils.removePrentNode(pTag);
  let nextDom = pTagParent.childNodes[index + 1];
  let prevDom = pTagParent.childNodes[index - 1];
  if (isAddZero) {
    if (prevDom && prevDom.nodeName == "BR") {
      // 新增元素前面是br元素时
      prevDom.remove();
      nextDom = document.createTextNode("\u200B");
      pTagParent.appendChild(nextDom);
    } else if (nextDom && nextDom.nodeName == "BR") {
      // 新增元素后面是br元素时
      nextDom.remove();
      nextDom = document.createTextNode("\u200B");
      pTagParent.appendChild(nextDom);
    } else if (nextDom) {
      (!nextDom.data || /\s+/.test(nextDom.data)) && (nextDom.data = "\u200B");
    } else {
      nextDom = document.createTextNode("\u200B"); // 当前处于最后一个节点就新建一个隐藏字符
      pTagParent.appendChild(nextDom);
    }
  }
  Range.selectNodeContents(nextDom);
  selection.removeAllRanges();
  selection.addRange(Range);
  /^(\u200B|\u200C|\u200D)+$/g.test(nextDom.textContent)
    ? Range.collapse(false)
    : Range.collapse(true);
  // Range.setEnd(div, 2); Range.setStart(div, 2);
}

// 创建书签 需要this指向
function createdBookMark() {
  return new Promise((reslove) => {
    const result = { startMark: "", endMark: "" };
    const selection = getSelection.call(this),
      edit = this.document,
      { isCollapsed } = selection,
      Range = selection.getRangeAt(0);
    edit.focus();
    const span = this.document.createElement("span");
    span.style.display = "inline";
    const uniq = guid();
    const uniqStar = `_bseEdit_star${uniq}`;
    span.setAttribute("id", uniqStar);
    Range.insertNode(span);
    result.startMark = span;
    if (!isCollapsed) {
      const endspan = this.document.createElement("span");
      endspan.style.display = "inline";
      const uniqend = `_bseEdit_end${uniq}`;
      endspan.setAttribute("id", uniqend);
      Range.collapse(false);
      Range.insertNode(endspan);
      Range.setStartAfter(span);
      Range.setEndBefore(endspan);
      selection.removeAllRanges();
      selection.addRange(Range);
      result.endMark = endspan;
    }
    reslove(result);
  });
}
// 移除书签
function removeBookMark(bookObj) {
  return new Promise((reslove) => {
    for (let [_, value] of Object.entries(bookObj)) {
      value && value.remove();
    }
    reslove(true);
  });
}
// 移动到书签位置
function moveToBookMark(bookObj) {
  return new Promise((reslove) => {
    const edit = this.document;
    edit.focus();
    const Range = creatRange.call();
    bookObj.startMark && Range.setStartAfter(bookObj.startMark);
    bookObj.endMark && Range.setEndBefore(bookObj.endMark);
    Range.collapse(false);
    const selection = getSelection.call(this);
    selection.removeAllRanges();
    selection.addRange(Range);

    for (let [_, value] of Object.entries(bookObj)) {
      value && value.remove();
    }
    reslove(true);
  });
}

// 根据页面内容生成xml格式字符串
function getContentXml() {
  function itorFuc(payload, _label) {
    // 递归计算xml格式数据
    let result = "";
    switch (Object.prototype.toString.call(payload)) {
      case "[object Object]":
        for (let [key, value] of Object.entries(payload)) {
          Object.prototype.toString.call(value) == "[object Array]"
            ? (result += itorFuc(value, key))
            : (result += `<${key}>${itorFuc(value)}</${key}>`);
        }
        break;
      case "[object Array]":
        for (let value of payload) {
          result += `<${_label}>${itorFuc(value)}</${_label}>`;
        }
        break;
      default:
        result = payload;
        break;
    }
    return result;
  }

  // 根据节点获取元素内容
  function getEleComValue(node) {
    const { type, bse_multipleSelection, bse_surgeryList } =
      domUtils.getItorElementBseAttr(node);
    let content = "";
    switch (type) {
      case "radio":
        Array.from(node.querySelectorAll("label input")).forEach((inp) => {
          inp.getAttribute("checked") &&
            (content += `<content>${inp.getAttribute("value")}</content>`);
        });
        break;
      case "checkbox":
        Array.from(node.querySelectorAll("label input")).forEach((inp) => {
          inp.getAttribute("checked") &&
            (content += `<content>${inp.getAttribute("value")}</content>`);
        });
        break;
      case "diagnose":
        bse_multipleSelection?.length &&
          (content += `<content>${itorFuc({
            bse_multipleSelection,
          })}</content>`);
        break;
      case "surgery":
        bse_surgeryList?.length &&
          (content += `<content>${itorFuc({ bse_surgeryList })}</content>`);
        break;
      case "bloodPressure":
        (node.querySelector("label.extensional").innerHTML ||
          node.querySelector("label.diastolic").innerHTML) &&
          (content = `<content>${itorFuc({
            extensional: node.querySelector("label.extensional").innerHTML,
            diastolic: node.querySelector("label.diastolic").innerHTML,
          })}</content>`);
        break;
      case "sign":
        (node.querySelector("label.date")?.innerHTML ||
          node.querySelector("label.sign img")?.getAttribute("src")) &&
          (content = `<content>${itorFuc({
            date: node.querySelector("label.date")?.innerHTML,
            sign:
              node.querySelector("label.sign img")?.getAttribute("src") || "",
          })}</content>`);
        break;
      default:
        node.querySelector("label").innerHTML &&
          (content = `<content>${
            node.querySelector("label").innerHTML
          }</content>`);
        break;
    }
    return content;
  }

  const content = getContent.call(this);
  const cloneDom = document.createRange().createContextualFragment(content);
  const treeWalker = document.createTreeWalker(
    cloneDom,
    NodeFilter.SHOW_ELEMENT,
    {
      acceptNode: (node) =>
        this.isBseElementObserve(node)
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_SKIP,
    }
  );
  let xml = "";
  while (treeWalker.nextNode()) {
    let cNode = treeWalker.currentNode;
    const attr = domUtils.getItorElementBseAttr(cNode);
    const { elSrc, ...rest } = attr;
    xml += `<default>${itorFuc(rest)}${getEleComValue.call(
      this,
      cNode
    )}</default>`;
  }
  return xml + `<html>${content}</html>`;
}

// 下载xml文件
function downloadXml(filename, text) {
  const pom = this.document.createElement("a");
  pom.setAttribute(
    "href",
    "data:xml/plain;charset=utf-8," + encodeURIComponent(text)
  );
  pom.setAttribute("download", filename);
  if (document.createEvent) {
    const event = document.createEvent("MouseEvents");
    event.initEvent("click", true, true);
    pom.dispatchEvent(event);
  } else {
    pom.click();
  }
}

// 生成xml字符串
function createdOrExportXmlFile(filename, version = '4.0', isdownload = false) {
  const xmlContent = getContentXml.call(this);
  const schemeStart = `<?xml version="1.0" encoding="UTF-8"?><data version="${version}">`;
  const schemeEnd = `</data></xml>`;
  const xmlFile = schemeStart + xmlContent + schemeEnd;
  isdownload && downloadXml.call(this, filename, xmlFile);
  return xmlFile;
}

// 插入图片
function insertPicture() {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.click();
  input.onchange = (e) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const img = document.createElement("img");
      img.src = reader.result;
      img.width = "100";
      img.height = "100";
      const selection = getSelection.call(this);
      if (!selection.focusNode) return;
      const Range = selection.getRangeAt(0);
      Range.insertNode(img);
      Range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(Range);
    });
    reader.readAsDataURL(e.target.files[0]);
  };
}

/**
 * 数据更新
 * @param userInfo 用户信息
 * @param editNodeStr 编辑字符串
 * @param resultHtml 返回(虚拟节点)还是(字符串)
 */
function updateReplaceApi(userInfo, editNodeStr, resultHtml = false) {
  const cloneDom = this.document.createRange().createContextualFragment(editNodeStr);
  const treeWalker = this.document.createTreeWalker(
    cloneDom,
    NodeFilter.SHOW_ELEMENT,
    {
      acceptNode: (node) =>
        this.isBseElementObserve(node)
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_SKIP,
    }
  );
  // 更新函数
  function forceUpdateFun(
    typeTemp,
    currentNodeTemp,
    userInfoTemp,
    attrTemp,
    idTemp
  ) {
    switch (typeTemp) {
      case "radio":
        currentNodeTemp.querySelectorAll("input").forEach((input) => {
          input.getAttribute("value") === userInfoTemp[idTemp]
            ? input.setAttribute("checked", "checked")
            : input.removeAttribute("checked");
        });
        break;
      case "checkbox":
        currentNodeTemp.querySelectorAll("input").forEach((input) => {
          userInfoTemp[idTemp].includes(input.getAttribute("value"))
            ? input.setAttribute("checked", "checked")
            : input.removeAttribute("checked");
        });
        break;
      case "diagnose":
        const diagnoseNewAttr = {
          ...attrTemp,
          bse_multipleSelection: userInfoTemp[idTemp],
        };
        currentNodeTemp.setAttribute(
          "bse",
          encodeURIComponent(JSON.stringify(diagnoseNewAttr))
        );
        function formatToTree(arry, pid) {
          return arry
            .filter((item) => {
              if (pid === undefined) {
                return (
                  item.parentId === 0 ||
                  !arry
                    .map((ary) => {
                      return ary.idTemp;
                    })
                    .includes(item.parentId)
                );
              } else {
                return item.parentId === pid;
              }
            })
            .map((item) => {
              item.children = formatToTree(arry, item.idTemp);
              return item;
            });
        }

        attrTemp.bse_multipleSelection
          ? formatToTree(attrTemp.bse_multipleSelection)
          : [];
        // console.log('newMultOperArr', newMultOperArr, attrTemp.bse_multipleSelection)
        /* 递归算出树形数据 用于诊断控件层级渲染 */
        const comChildLi = (strHtml, level = 0, modeName) =>
          `${strHtml
            .map((li, inx) => {
              return {
                horizontal: () => `<text style="font-weight: normal;">
                      ${
                        level == 0
                          ? `<text style="font-weight: bold;">${li.bse_categery}</text>`
                          : ""
                      }
                      ${level == 0 ? `<text>${li.bse_type}</text>` + " :" : ""}
                      ${
                        li.bse_type == "中医诊断"
                          ? `<text>${li.bse_disease_name}</text>
                            <text style=""><text>${li.bse_symptom_name}</text></text>`
                          : li.bse_diagnose_name
                      }
                      ${
                        li.children && li.children.length
                          ? comChildLi(li.children, level + 1, modeName)
                          : ""
                      }
                    </text>`,
                vertical:
                  () => `<text style="display: block;font-weight: normal;">
                      ${
                        level == 0
                          ? `<text style="display: block;font-weight: bold;">${li.bse_categery}</text>`
                          : ""
                      }
                      <text style="display: inline-block;width: 115px;">&emsp;&emsp;${
                        level == 0 ? li.bse_type + " :" : ""
                      }</text>
                      ${
                        li.bse_type == "西医诊断"
                          ? Array.from({ length: level })
                              .map((_) => "&emsp;&emsp;")
                              .join("")
                          : ""
                      }
                      ${
                        li.bse_type == "中医诊断"
                          ? `<text style="display: inline-block;">${li.bse_disease_name}</text>
                            <text style="display: block;"><text style="display: inline-block;width: 115px;">&emsp;&emsp;</text><text style="display: inline-block;">&emsp;&emsp;${li.bse_symptom_name}</text></text>`
                          : li.bse_diagnose_name
                      }
                      ${
                        li.children && li.children.length
                          ? comChildLi(li.children, level + 1, modeName)
                          : ""
                      }
                    </text>`,
              }[modeName]();
            })
            .join("")}`;
        currentNodeTemp.querySelector("label").innerHTML = comChildLi(
          userInfoTemp[idTemp],
          0,
          attrTemp.mode
        );
        break;
      case "surgery":
        const surgeryNewAttr = {
          ...attrTemp,
          bse_surgeryList: userInfoTemp[idTemp],
        };
        currentNodeTemp.setAttribute(
          "bse",
          encodeURIComponent(JSON.stringify(surgeryNewAttr))
        );
        currentNodeTemp.querySelector("label").innerHTML =
          userInfoTemp[idTemp][userInfoTemp[idTemp].length - 1][
            attrTemp.fieldName || "name"
          ];
        break;
      case "sign":
        currentNodeTemp.querySelector("label.date").innerHTML =
          userInfoTemp[idTemp].date;
        currentNodeTemp.querySelector(
          "label.sign"
        ).innerHTML = `<img src="${userInfoTemp[idTemp].sign}" style="display: inline-block;height: 30px;width: 100px;" />`;
        break;
      case "bloodPressure":
        currentNodeTemp.querySelector("label.extensional").innerHTML =
          userInfoTemp[idTemp].extensional;
        currentNodeTemp.querySelector("label.diastolic").innerHTML =
          userInfoTemp[idTemp].diastolic;
        break;
      default:
        currentNodeTemp.querySelector("label").innerHTML = userInfoTemp[idTemp];
        break;
    }
  }
  // 根据节点获取元素内容
  function isEleEmpty(node) {
    const { type, bse_multipleSelection, bse_surgeryList } =
      domUtils.getElementAttribute(node);
    let isEmpty = false;
    switch (type) {
      case "radio":
        Array.from(node.querySelectorAll("label input")).some((inp) => {
          isEmpty = inp.getAttribute("checked");
        });
        break;
      case "checkbox":
        Array.from(node.querySelectorAll("label input")).some((inp) => {
          isEmpty = inp.getAttribute("checked");
        });
        break;
      case "diagnose":
        isEmpty = !!bse_multipleSelection?.length;
        break;
      case "surgery":
        isEmpty = !!bse_surgeryList?.length;
        break;
      case "bloodPressure":
        isEmpty = !!(
          node.querySelector("label.extensional").innerHTML ||
          node.querySelector("label.diastolic").innerHTML
        );
        break;
      case "sign":
        isEmpty = !!(
          node.querySelector("label.date")?.innerHTML ||
          node.querySelector("label.sign img")?.getAttribute("src")
        );
        break;
      default:
        isEmpty = !!node.querySelector("label").innerHTML;
        break;
    }
    return isEmpty;
  }
  let currentNode;
  while (userInfo && (currentNode = treeWalker.nextNode())) {
    const attr = domUtils.getElementAttribute(currentNode);
    if (attr) {
      const { type, id, value, forceUpdateWay } = attr;
      if (!userInfo[id]) continue; // 未查到数据就跳转下次
      if (
        forceUpdateWay === "forceUpdate" ||
        typeof forceUpdateWay === "undefined"
      ) {
        // 强制下载
        forceUpdateFun(type, currentNode, userInfo, attr, id);
      } else if (forceUpdateWay === "eleEmpty" && !isEleEmpty(currentNode)) {
        // 元素空值则下载
        forceUpdateFun(type, currentNode, userInfo, attr, id);
      } else if (forceUpdateWay === "eleNonempty" && isEleEmpty(currentNode)) {
        // 元素非空值则下载
        forceUpdateFun(type, currentNode, userInfo, attr, id);
      } else if (forceUpdateWay === "eleSourceEmpty" && !value) {
        // 源空值则下载
        forceUpdateFun(type, currentNode, userInfo, attr, id);
      } else if (forceUpdateWay === "eleSourceNonempty" && value) {
        // 源非空值则下载
        forceUpdateFun(type, currentNode, userInfo, attr, id);
      }
    }
  }
  let result = null;
  if (resultHtml) {
    const div = document.createElement("div");
    div.appendChild(cloneDom);
    result = div.innerHTML;
  } else {
    result = cloneDom;
  }
  return result;
}

/**
 * 根据模板插入段落
 * @param payload  更新数据
 * @param fileobj { contentXmlOrHtmlString: 内容 }
 */
function insertHtmlOrXmlStringByParams(payload, fileobj) {
  // 需要this指向
  const xmlString = fileobj.contentXmlOrHtmlString.replace(/\n+\s*/g, "");
  let matchStr = "";
  if (/^<\?xml.*<\/xml>$/g.test(xmlString)) {
    matchStr = xmlString.match(/<html>(.*?)<\/html>/)[1];
  } else {
    matchStr = xmlString;
  }
  const div = updateReplaceApi.call(this, payload, matchStr);
  const edit = this.getEditorAreaFocus();
  edit.focus();
  const selection = getSelection.call(this);
  if (
    !selection.focusNode ||
    domUtils.getItorElementBseAttr(selection.focusNode).contenteditable ===
      false
  )
    return;
  const Range = selection.getRangeAt(0);
  const tempDiv = document.createElement("div");
  tempDiv.append(div);
  Range.insertNode(tempDiv);
  Range.selectNodeContents(tempDiv);
  Range.collapse(false);
  domUtils.removePrentNode(tempDiv);
  const zeroDom = document.createTextNode("\u200B");
  Range.insertNode(zeroDom);
  Range.selectNodeContents(zeroDom);
  Range.collapse(false);
  selection.removeAllRanges();
  selection.addRange(Range);
}

/**
 * 根据json数据更新模板
 * @param payload  更新数据
 */
function updatedocumentbyparams(payload) {
  const xmlString = getContent.call(this);
  const div = updateReplaceApi.call(this, payload, xmlString, true);
  setContent.call(this, div);
}

/**
 * 验证输入值的合法性
 * @param attr 元素属性
 * @param cNode 触发元素元素
 */
function validateRules() {
  let validateFields = [];
  const treeWalker = this.document.createTreeWalker(
    this.getEditorArea(),
    NodeFilter.SHOW_ELEMENT,
    {
      acceptNode: (node) =>
        this.isBseElementObserve(node)
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_SKIP
    }
  );
  while (treeWalker.nextNode()) {
    let cNode = treeWalker.currentNode;

    const attr = domUtils.getItorElementBseAttr(cNode);

    const content = cNode.querySelector("label")?.innerHTML;
    if (["number"].includes(attr.type)) {
      const { floatNumer, maxValue, minValue } = attr;
      if (
        parseFloat(content) < parseFloat(minValue) ||
        parseFloat(content) > parseFloat(maxValue) ||
        (attr.datatype == "inter" && content.split(".")[1]) ||
        (attr.datatype == "float" && floatNumer && !content.split(".")[1]) ||
        (attr.datatype == "float" &&
          floatNumer &&
          content.split(".")[1] &&
          content.split(".")[1].length != floatNumer)
      ) {
        !cNode.classList.contains("validateFaild") &&
          cNode.classList.add("validateFaild");
        validateFields = validateFields.filter((find) => find.id != attr.id);
        validateFields.push({
          id: attr.id,
          message: `<<${content || "-"}>>不在范围内${minValue || "-∞"}-${
            maxValue || "+∞"
          }${attr.datatype ? `数据类型<<${attr.datatype}>>` : ""}${
            floatNumer ? `小数位${floatNumer || "∞"}` : ""
          }`,
        });
      } else {
        validateFields = validateFields.filter((find) => find.id != attr.id);
        cNode.classList.remove("validateFaild");
      }
    } else if (["input"].includes(attr.type)) {
      const { maxNumber, minNumber } = attr;
      if (
        content &&
        (parseInt(content.length) < parseInt(minNumber) ||
          parseInt(content.length) > parseInt(maxNumber))
      ) {
        !cNode.classList.contains("validateFaild") &&
          cNode.classList.add("validateFaild");
        validateFields = validateFields.filter((find) => find.id != attr.id);
        validateFields.push({
          id: attr.id,
          message: `<<${content || "-"}>>限制在${minNumber || "-∞"}-${
            maxNumber || "+∞"
          }数位内`,
        });
      } else {
        validateFields = validateFields.filter((find) => find.id != attr.id);
        cNode.classList.remove("validateFaild");
      }
    } else if (["bloodPressure"].includes(attr.type)) {
      const extensional = cNode.querySelector("label.extensional")?.innerHTML,
        diastolic = cNode.querySelector("label.diastolic")?.innerHTML;
      if (
        !extensional ||
        !diastolic ||
        isNaN(Number(extensional)) ||
        isNaN(Number(diastolic)) ||
        Number(extensional) > Number(diastolic)
      ) {
        !cNode.classList.contains("validateFaild") &&
          cNode.classList.add("validateFaild");
        validateFields = validateFields.filter((find) => find.id != attr.id);
        validateFields.push({
          id: attr.id,
          message: `${attr.leftPlaceholder || "伸缩压:"}<<${
            extensional || "+∞"
          }>>不能大于${attr.rightPlaceholder || "舒张压:"}<<${
            diastolic || "-∞"
          }>>`,
        });
      } else {
        validateFields = validateFields.filter((find) => find.id != attr.id);
        cNode.classList.remove("validateFaild");
      }
    }
  }
  console.log("验证信息", validateFields);
  return validateFields;
}

/**
 * 插入xml模板字符串
 * @param payload: { contentXmlOrHtmlString: xml字符串 }
 */
function insertXmlOrHtmlModuleString(payload) {
  const contentXmlOrHtmlString = payload.contentXmlOrHtmlString.replace(
    /\n+\s*/g,
    ""
  );
  if (!/^<\?xml.*<\/xml>$/g.test(contentXmlOrHtmlString)) {
    const matchStr = contentXmlOrHtmlString.match(/<html>(.*?)<\/html>/);
    this.setContent(matchStr[1]);
  } else {
    this.setContent(payload.contentXmlOrHtmlString);
  }
}

export default {
  ...domUtils,
  setContent,
  getContent,
  insertHtml,
  createdBookMark,
  removeBookMark,
  moveToBookMark,
  createdOrExportXmlFile,
  insertPicture,
  insertHtmlOrXmlStringByParams,
  updatedocumentbyparams,
  validateRules,
  insertXmlOrHtmlModuleString,
  getSelection,
  creatRange,
};
