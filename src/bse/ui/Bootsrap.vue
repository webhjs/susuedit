<template>
  <div class="bse-edit_wrap">
    <MenuBar :menuList="optionsNav" @select="selectMenu" />
    <CommonBar :toolBar="optionsCommon" />
    <div class="bse-iframe" ref="iframeMountedNode"></div>
    <StatusBar :mode="optionsMode" :paper="optionsPaper" />
    <AttributeDialog ref="AttributeDialog" />
  </div>
</template>
<script>
import MenuBar from "./menu-bar";
import CommonBar from "./common-bar";
import StatusBar from "./status-bar";
import AttributeDialog from "@/bse/element/common/AttributeDialog";

/* js调用组件 */
import basicTimePicker from "@bse/ui/basic/date-picker";
import basicSelect from "@bse/ui/basic/select";
import basicDiagnose from "@bse/ui/basic/bse-diagnose";
import basicSurgery from "@bse/ui/basic/bse-surgery";
import designPopper from "@bse/ui/basic/design-popper";
/* js调用组件 */

const ME_TABS = [
  "tooth-labeling",
  "men-history",
  "heart-position",
  "pro-eyes",
  "pri-teeth-label",
  "opt-position",
  "house-corner",
  "pul-tuber",
]; // 医学表达式
const BASIC_ELEMENT = [
  "radio",
  "checkbox",
  "date",
  "input",
  "select",
  "label",
  "number",
  "splitline",
  "pagebreak",
  "diagnose",
  "surgery",
  "sign",
  "bloodPressure",
]; // 元素控件

export default {
  props: {
    optionsNav: {
      type: Array,
      default: () => [],
    },
    optionsCommon: {
      type: Array,
      default: () => [],
    },
    optionsMode: {
      type: String,
      default: "editMode",
    },
    optionsPaper: {
      type: String,
      default: "A4",
    },
  },
  components: {
    MenuBar,
    CommonBar,
    StatusBar,
    AttributeDialog,
  },
  provide() {
    return {
      getEditor: () => this.editor,
    };
  },
  mounted() {
    this.editor.addListener("onRead", async (etor) => {
      console.log("onRead获取dom节点", etor.getEditorArea());
      etor.getEditorArea().addEventListener("keydown", function (e) {
        [46].includes(e.keyCode) && etor.deleteKeyDow(e);
        ![37, 38, 39, 40, 46].includes(e.keyCode) && etor.backspace(e); // 排除上下左右键
      });

      etor.getEditorArea().addEventListener("dblclick", (e) => {
        if (this.optionsMode === "editMode") {
          this.dblclickEdit(e);
        }
      });
      
      etor.getEditorArea().addEventListener("mouseover", (e) => {
        if (this.optionsMode === "designMode") {
          this.hoverDesign(e);
        }
      });

      // 调试设置默认内容
      const cxt = await fetch("/edit_template.html").then((res) => res.text());
      etor.setContent(cxt);
    });
  },
  methods: {
    getMountedNode() {
      return this.$refs.iframeMountedNode;
    },
    selectMenu(name) {
      // 元素
      const elementMapping = [
        "radio",
        "checkbox",
        "date",
        "input",
        "select",
        "label",
        "number",
        "splitline",
        "pagebreak",
        "diagnose",
        "surgery",
        "sign",
        "bloodPressure",
      ];
      elementMapping.includes(name) &&
        this.$refs.AttributeDialog.isShow({ type: name }, false);
      // 元素

      // 命令
      const execCommandMapping = [
        "undo",
        "redo",
        "paste",
        "copy",
        "cut",
        "removeFormat",
        "subscript",
        "superscript",
        "bold",
        "italic",
        "underline",
        "strikeThrough",
        "insertHorizontalRule",
        "selectAll",
        "justifyLeft",
        "justifyCenter",
        "justifyRight",
        "justifyFull",
        "insertUnorderedList",
        "insertOrderedList",
        "print",
      ];
      execCommandMapping.includes(name) && this.editor.execCommand(name);
      // 命令

      // 尺寸设置
      const paperMapping = ["A4", "A5", "A6"];
      paperMapping.includes(name) && this.editor.execCommand("paper", name);
      // 尺寸设置

      // 模式设置
      const modeMapping = ["editMode", "designMode", "previewMode"];
      modeMapping.includes(name) && this.editor.execCommand("mode", name);
      // 模式设置

      if (name === "exportXml") {
        // 导出xml
        this.editor.createdOrExportXmlFile("导出xml文件.xml", "4.0", true);
      }

      if (name === "testCopyContentHtml") {
        navigator.clipboard
          .writeText(this.editor.getContent())
          .then(() => {
            this.$message.success("复制成功");
          })
          .catch(() => {
            this.$message.error("复制失败");
          });
      }
    },
    dblclickEdit(e) {
      // 编辑模式
      const attr = this.editor.getItorElementBseAttr(e.target);
      if (attr.descr !== '不是"bse"标签元素') {
        if (e.target.classList.contains("disabled")) return; // 编辑模式样式中包含disabled样式
        const { type } = attr;
        if (ME_TABS.includes(type)) {
          const el = e.target;
          // 医疗表达式
          el.click = async () => {
            console.log(basicMedicalExpression);
            const instance = basicMedicalExpression.getInstance({
              el: el,
              editor: this.editor,
            });
            await instance.show({ el, attr });
            this.editor.fireEvent("elementchange"); // 元素改变事件用于监听变化
          };
          el.click();
        } else if (BASIC_ELEMENT.includes(type)) {
          // 普通其他元素
          if (type == "date") {
            const decodeFormDate = (mapping, targetFromat, socurceString) => {
              const newMapping = {};
              for (let [key, value] of Object.entries(mapping)) {
                newMapping[key] = socurceString.substring(
                  targetFromat.indexOf(key),
                  targetFromat.lastIndexOf(key) + 1
                );
              }
              let newDateString = "";
              newMapping.y && (newDateString = newMapping.y || "1971");
              newMapping.M &&
                (newDateString += newDateString
                  ? "-" + (newMapping.M || "00")
                  : newMapping.M || "00");
              newMapping.d &&
                (newDateString += newDateString
                  ? "-" + (newMapping.d || "00")
                  : newMapping.d || "00");
              newMapping.H &&
                (newDateString += newDateString
                  ? " " + (newMapping.H || "00")
                  : newMapping.H || "00");
              newMapping.m &&
                (newDateString += newDateString
                  ? ":" + (newMapping.m || "00")
                  : newMapping.m || "00");
              newMapping.s &&
                (newDateString += newDateString
                  ? ":" + (newMapping.s || "00")
                  : newMapping.s || "00");
              return newDateString;
            };
            // 日期
            e.target.click = async () => {
              const el = e.target;
              const indexMap = {
                y: [],
                M: [],
                d: [],
                H: [],
                m: [],
                s: [],
              };
              const dataTime =
                decodeFormDate(
                  indexMap,
                  attr.dateformat,
                  attr.elSrc.querySelector("label").innerText
                ) || new Date();

              const instance = await basicTimePicker.getInstance({
                el: attr.elSrc,
                editor: this.editor,
              });
              instance.attrs["value-format"] = attr.dateformat;
              instance.attrs.format = attr.dateformat;
              instance.attrs.type = "date";

              /** 设置日期范围 */
              const pickerOptions = {
                disabledDate(time) {
                  return (
                    (attr.max &&
                      time.getTime() > new Date(attr.max).getTime()) ||
                    (attr.min && time.getTime() < new Date(attr.min).getTime())
                  );
                },
              };
              instance.attrs["picker-options"] = pickerOptions;
              /** 设置日期范围 */

              instance.value = new Date(dataTime);
              instance.show();
              instance.listeners = {
                // 监听 datePicker组件变化
                change: (val) => {
                  el.dataset.date = val;
                  attr.elSrc.querySelector("label").innerText = el.dataset.date; //'\u200B' +
                  this.editor.fireEvent("elementchange"); // 元素改变事件用于监听变化
                },
              };
            };
            e.target.click();
          } else if (type == "select") {
            // 下拉框
            if (e.target.click) {
              e.target.click = () => {
                const el = e.target;
                const instance = basicSelect.getInstance({
                  el: attr.elSrc,
                  editor: this.editor,
                });
                instance.value = el.dataset.selectValue || attr.value;
                instance.attrs.options = attr.bse_options || []; // 选择框内容
                instance.listeners = {
                  change: (val) => {
                    // 监听 select组件变化
                    el.dataset.selectValue = val;
                    attr.elSrc.querySelector("label").innerText =
                      instance.attrs.options.find((v) => v.value == val)
                        ?.value || el.innerText;
                    this.editor.fireEvent("elementchange"); // 元素改变事件用于监听变化
                  },
                };
                instance.show();
              };
            }
            e.target.click();
          } else if (["diagnose"].includes(type)) {
            const el = e.target;
            Promise.resolve(
              basicDiagnose.getInstance({ el, editor: this.editor })
            ).then((instance) => {
              instance.show(this.editor, {
                attr,
                getEditor: () => this.editor,
                el,
                context: this.context,
                getEditorOptions: () => this.editor.getOptions(),
              });
              instance.$once("submitFrom", (fromInline) => {
                function arrToTree(arry, pid) {
                  return arry
                    .filter((item) => {
                      if (pid === undefined) {
                        return (
                          item.parentId === 0 ||
                          !arry
                            .map((ary) => {
                              return ary.id;
                            })
                            .includes(item.parentId)
                        );
                      } else {
                        return item.parentId === pid;
                      }
                    })
                    .map((item) => {
                      item.children = arrToTree(arry, item.id);
                      return item;
                    });
                }
                const newMultOperArr = fromInline.bse_multipleSelection
                  ? arrToTree(fromInline.bse_multipleSelection)
                  : [];
                /* 递归算出树形数据 用于诊断控件层级渲染 */
                const comChildLi = (strHtml, level = 0, modeName) =>
                  `${strHtml
                    .map((li) => {
                      return {
                        horizontal: () => `<text style="font-weight: normal;">
                          ${
                            level == 0
                              ? `<text style="font-weight: bold;">${li.bse_categery}</text>`
                              : ""
                          }
                          ${
                            level == 0
                              ? `<text>${li.bse_type}</text>` + " :"
                              : ""
                          }
                          ${
                            li.bse_type == "中医诊断"
                              ? `<text>${li.bse_disease_name}</text>
                                <text style=""><text>(${li.bse_symptom_name})</text></text>`
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
                // display:${  mode == 'vertical' ? 'inline-block;' : 'inline;' }

                // attr.elSrc.innerHTML = `<label style="display:inline-block;vertical-align: text-top;list-style: none;" class="placehold-class" placeholder="${
                //   fromInline.placeholder || ' '
                // }" contenteditable="true">${comChildLi(newMultOperArr, 0, attr.mode)}</label>`

                const diagnoseTreeWalker = document.createTreeWalker(
                  this.editor.editArea,
                  NodeFilter.SHOW_ELEMENT,
                  {
                    acceptNode: (node) => {
                      const protoAttr = this.editor.getItorElementBseAttr(node);
                      return this.editor.isBseElementObserve(node) &&
                        protoAttr.type === "diagnose" &&
                        protoAttr.id === fromInline.id
                        ? NodeFilter.FILTER_ACCEPT
                        : NodeFilter.FILTER_SKIP;
                    },
                  }
                );
                while (diagnoseTreeWalker.nextNode()) {
                  let cNode = diagnoseTreeWalker.currentNode;
                  const attrDiagnose = this.editor.getItorElementBseAttr(cNode);
                  attrDiagnose.bse_multipleSelection =
                    fromInline.bse_multipleSelection.map((item) => {
                      delete item.elSrc;
                      delete item.children;
                      return item;
                    });
                  attr.elSrc.setAttribute(
                    "bse",
                    encodeURIComponent(JSON.stringify(fromInline))
                  );
                  cNode.setAttribute(
                    "bse",
                    encodeURIComponent(JSON.stringify(attrDiagnose))
                  );
                  cNode.querySelector("label").innerHTML = comChildLi(
                    newMultOperArr,
                    0,
                    attrDiagnose.mode
                  );
                }
              });
              this.editor.fireEvent("elementchange"); // 元素改变事件用于监听变化
            });
          } else if (["surgery"].includes(type)) {
            const el = e.target;
            Promise.resolve(
              basicSurgery.getInstance({ el, editor: this.editor })
            ).then((instance) => {
              instance.show(this.editor, {
                attr,
                getEditor: () => this.editor,
                el,
                context: this.context,
                getEditorOptions: () => this.editor.getOptions(),
              });
              instance.$once("submitFrom", (fromInline) => {
                attr.elSrc.setAttribute(
                  "bse",
                  encodeURIComponent(JSON.stringify(fromInline))
                );

                const surgeryTreeWalker = document.createTreeWalker(
                  this.editor.editArea,
                  NodeFilter.SHOW_ELEMENT,
                  {
                    acceptNode: (node) => {
                      const protoAttr = this.editor.getItorElementBseAttr(node);
                      return this.editor.isBseElementObserve(node) &&
                        protoAttr.type === "surgery" &&
                        protoAttr.id === fromInline.id
                        ? NodeFilter.FILTER_ACCEPT
                        : NodeFilter.FILTER_SKIP;
                    },
                  }
                );
                while (surgeryTreeWalker.nextNode()) {
                  let cNode = surgeryTreeWalker.currentNode;
                  const attrSurgery = this.editor.getItorElementBseAttr(cNode);
                  attrSurgery.bse_surgeryList = fromInline.bse_surgeryList;
                  cNode.setAttribute(
                    "bse",
                    encodeURIComponent(JSON.stringify(attrSurgery))
                  );
                  cNode.querySelector("label").innerHTML =
                    fromInline.bse_surgeryList
                      ? fromInline.bse_surgeryList[
                          fromInline.bse_surgeryList.length - 1
                        ][attrSurgery.fieldName || "name"] || ""
                      : "";
                }

                this.editor.fireEvent("elementchange"); // 元素改变事件用于监听变化
              });
            });
          }
        }
      }
    },
    async hoverDesign(e) {
      const el = e.target
      const attr = this.editor.getItorElementBseAttr(e.target);
      const { type } = attr
      if (attr.descr !== '不是"bse"标签元素') {
        const listeners = {
          del: () => {
            console.log("删除了");
          },
        };
        const instance = await designPopper.getInstance({
          el: attr.elSrc,
          editor: this.editor
        });
        instance.show();
        if (ME_TABS.includes(type)) {
          // 医疗表达式
          instance.label = `控件(医学表达式【${medExpressionElement.label}】)`;
          // 编辑
          instance.listeners.edit = () => {
            instance.hide();
            medicalDialogRef &&
              medicalDialogRef.show({
                model: 2,
                el: e.target,
                attr,
              });
          };

          // 删除
          instance.listeners.del = () => {
            instance.hide();
            el.remove();
          };
        } else if (BASIC_ELEMENT.includes(type)) {
          // 普通其他元素
          instance.label = `控件【${type}】`;
          // 编辑
          instance.listeners.edit = () => {
            instance.hide();
            this.$refs.AttributeDialog &&
              this.$refs.AttributeDialog.isShow({ ...attr, elTag: el }, "editBseEle");
          };

          // 删除
          instance.listeners.del = () => {
            instance.hide();
            attr.elSrc.remove();
          };
        } else {
          instance.listeners.edit = () => {
            const attr = this._bse.getItorElementBseAttr(el);
            this._bse.execCommand("composeelementdialog", attr, (payload) => {
              attr.elSrc.setAttribute(
                "bse",
                encodeURIComponent(JSON.stringify(payload))
              );
            });
          };
          // 删除
          instance.listeners.del = () => {
            instance.hide();
            attr.elSrc.remove();
          };
        }
      }
    },
  },
};
</script>

<style scoped>
.bse-edit_wrap {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.bse-edit_wrap .bse-iframe {
  flex: 1;
}
</style>
