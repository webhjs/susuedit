import Vue from "vue";
import '@/bse/ui/iconfont/iconfont.js'
import editorUtils from "@bse/core/editorUtils";
import eventUtil from "@bse/core/eventUtil";
import { trimNewlineSpace } from "@bse/utils";
import commandPlugin from '@bse/core/commands'

import Bootsrap from "./Bootsrap.vue";
const FactoryBootsrapVNode = Vue.extend(Bootsrap);

import optionsDefault from "./options.js";

const htmlStr = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <style media="print">
          .no-print {
            display: none;
          }
          .page-next {
            page-break-after: always;
          }
        </style>
        <link rel="stylesheet" type="text/css" href="/statics/index.css" media="all">
      </head>
      <body class="h-full w-full bg-gray overflow-auto pt-4">
        <div class="bse-area__edit" id="bse-edit_area" contenteditable="true">
          <div class="bse-edit_page flex flex-col">
            <div class="flex bse-page_header" contenteditable="false">
              <div class="flex-1 bse-header_editable" contenteditable="true"></div>
            </div>
            <div class="flex-1 flex bse-page_content" contenteditable="false">
              <div class="flex-1 bse-content_editable" contenteditable="true">
                页内容
              </div>
            </div>
            <div class="flex bse-page_footer" contenteditable="false">
              <div class="flex-1 bse-footer_editable" contenteditable="true">
                第 1 页 / 共 1 页
              </div>
            </div>
          </div>
        </div>
        <div class="bse-edit_patent">${optionsDefault.footer}</div>
      </body>
    </html>`;
const scriptStr = `javascript:void((function(){document.open();document.write("${trimNewlineSpace(
  htmlStr
)}");document.close()})())`;

let editId = 0;
const bseEditPool = []; // 编辑器应用池

export default function Editor(options = {}) {
  let proxy = {
    constructor: function () {
      const bootsrapInstance = this.render(options.el);
      bseEditPool.push(bootsrapInstance);
      return bootsrapInstance;
    },
    getEditorArea() {
      return bseEditPool
        .find((f) => f.editId === this.editId)
        ?.document.querySelector("#bse-edit_area");
    },
    getEditorAreaFocus() {
      return bseEditPool
        .find((f) => f.editId === this.editId)
        ?.document.querySelector("#bse-edit_area ._bseActiveFoucs");
    },
    getOptions() {
      return options;
    },
    getDomRectRelative(dom) {
      const { left, top } = dom.getBoundingClientRect()
      const iframeReact = this.iframe.getBoundingClientRect()
      return {
        left: left + iframeReact.left,
        top: top + iframeReact.top,
      }
    },
    setOption(_opt) {
      options = { ...options, ..._opt }
      const { toolbars, mode, paper } = options;
      const optionsNav = toolbars?.nav ?? optionsDefault.toolbars.nav;
      const optionsCommon = toolbars?.common ?? optionsDefault.toolbars.common;
      const findInstance = bseEditPool.find((f) => f.editId === this.editId).componetInstance
      findInstance.optionsNav = optionsNav;
      findInstance.optionsCommon = optionsCommon;

      const optionsMode = mode ?? optionsDefault.mode
      const optionsPaper = paper ?? optionsDefault.paper
      findInstance.optionsMode = optionsMode;
      findInstance.optionsPaper = optionsPaper;
    },
    render: function (bseMountedDom) {
      const componetInstance = new FactoryBootsrapVNode({
        el: bseMountedDom,
        data: {
          editor: this,
        },
      });
      const iframe = editorUtils.createElement("iframe", {
        id: "bseditor_id",
        width: "100%",
        height: "100%",
        frameborder: "0",
        // scrolling :'no',
        src: scriptStr,
      });
      componetInstance.getMountedNode().appendChild(iframe); // 将iframe挂载到.bse-iframe元素上
      this.editId = ++editId;
      this.iframe = iframe;
      this.document = iframe.contentWindow.document;
      this.window = iframe.contentWindow;
      this.componetInstance = componetInstance;
      this.container = componetInstance.getMountedNode();
      return this;
    },
    destroy: function () {
      const findComInstance = bseEditPool.find(
        (pool) => pool.editId === this.editId
      );
      findComInstance.iframe.remove(); // 删除实列iframe
      bseEditPool.splice(
        bseEditPool.indexOf((pool) => pool === this),
        1
      );
    },
  };
  Object.entries(proxy).forEach(([key, value]) => {
    this[key] = value.bind(this);
  });

  const resutInstance = this.constructor(); // 创建实列
  commandPlugin.install.call(this) // 初始化注册命令
  this.iframe.onload = () => { // iframe挂载完成触发
    this.fireEvent("onRead", this);
    console.log('编辑器实例', this);
    this.window.addEventListener('click', event => { // 聚焦元素
      let current = event.srcElement
      while (current !== null && current.nodeName !== 'BODY') {
        if (current.hasAttribute && current.hasAttribute('contenteditable') && current.getAttribute('contenteditable') === 'true') {
          this.document.querySelectorAll('._bseActiveFoucs').forEach(node => {
            node.classList.remove('_bseActiveFoucs')
          })
          current.classList.add('_bseActiveFoucs')
          break
        }
        current = current.parentNode
      }
    })
    this.document.execCommand('defaultParagraphSeparator', false, 'p') // 设置换行标签
    this.execCommand('mode', options.mode || 'designMode')
    this.execCommand('paper', options.paper || 'A4')
    this.setOption(options) // 设置options
  };
  return resutInstance;
}

function eventClass() {
  Object.entries(eventUtil).forEach(([key, value]) => {
    this[key] = value;
  });
}
function editorClass() {
  Object.entries(editorUtils).forEach(([key, value]) => {
    this[key] = value;
  });
}
editorClass.prototype = new eventClass();
Editor.prototype = new editorClass();
