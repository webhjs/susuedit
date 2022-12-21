<!--
 * @Description: 普通元素弹出框
 -->
<template>
  <el-dialog
    v-if="dialogVisible"
    :title="_title"
    :visible.sync="dialogVisible"
    custom-class="bse-dialog_fxgef8sl"
    width="800px"
    :close-on-click-modal="false"
    append-to-body
  >
    <component
      ref="bseEleRef"
      :is="bseEleComponents[formInline.type]"
      :data="formInline"
    />
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="dialogVisible = false">取 消</el-button>
      <el-button
        size="small"
        class="bse-btn_fsag8xlg"
        type="success"
        @click="submitFrom"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>
<script>
const modulesFiles = require.context("@bse/element/components", true, /\.vue$/);
const bseEleComponents = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});
import {
  serviceElementsMap,
  BASIC_ELEMENT,
} from "@bse/element/components/config.js";
export default {
  inject: ["getEditor"],
  provide() {
    return {
      getEditor: this.getEditor,
    };
  },
  data() {
    return {
      title: "",
      dialogVisible: false,
      bseEleComponents,
      formInline: {},
      editModel: null,
    };
  },
  computed: {
    _title() {
      const label = BASIC_ELEMENT.find(
        (v) => v.value == this.formInline.type
      )?.label;
      const editModelLabel = this.editModel ? "编辑" : "新增";
      return `${editModelLabel}${label}控件`;
    },
  },
  methods: {
    // 展示下拉框
    isShow(row, edit) {
      this.formInline = row;
      this.editModel = edit;
      this.dialogVisible = true;
    },
    // 确认按钮
    submitFrom() {
      if (this.$refs.bseEleRef.$refs.attributeForm) {
        this.$refs.bseEleRef.$refs.attributeForm.validate((valid) => {
          if (valid) {
            if (this.editModel) {
              const attr = JSON.parse(
                JSON.stringify(this.$refs.bseEleRef.formInline)
              );
              delete attr.elSrc;
              delete attr.elTag;
              const { elSrc } = this.formInline;
              elSrc.setAttribute(
                "bse",
                encodeURIComponent(JSON.stringify(attr))
              );
              let innerHTMLStr = "";
              switch (attr.type) {
                case "radio":
                  innerHTMLStr = `${
                    attr.bse_options &&
                    attr.bse_options
                      .map((opt) => {
                        return `<input type="radio" id="${opt.id}${
                          opt.value
                        }" value="${opt.value}" name="${
                          attr.name
                        }" contenteditable="false" ${
                          attr.value == opt.value ? "checked" : ""
                        } /><label for="${opt.id}${
                          opt.value
                        }" contenteditable="false">${opt.value}</label>`;
                      })
                      .join("")
                  }&#8302;`;
                  break;
                case "checkbox":
                  innerHTMLStr = `${
                    attr.bse_options &&
                    attr.bse_options
                      .map((opt) => {
                        return `<input type="checkbox" id="${opt.id}${
                          opt.value
                        }" value="${opt.value}" name="${
                          attr.name
                        }" contenteditable="false" ${
                          attr.value.includes(opt.value) ? "checked" : ""
                        } /><label for="${opt.id}${
                          opt.value
                        }" contenteditable="false">${opt.value}</label>`;
                      })
                      .join("")
                  }&#8302;`;
                  break;
                case "select":
                  const label = attr.value;
                  innerHTMLStr = `<label contenteditable="true" class="placehold-class" placeholder="${
                    attr.placeholder || ""
                  }">${label || ""}</label>`;
                  break;
                case "diagnose":
                  const { mode } = attr;
                  function formatToTree(arry, pid) {
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
                        item.children = formatToTree(arry, item.id);
                        return item;
                      });
                  }
                  const newMultOperArr = attr.bse_multipleSelection
                    ? formatToTree(attr.bse_multipleSelection)
                    : [];
                  // console.log('newMultOperArr', newMultOperArr, attr.bse_multipleSelection)
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
                          ${
                            level == 0
                              ? `<text>${li.bse_type}</text>` + " :"
                              : ""
                          }
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
                  innerHTMLStr = `<label style="display:inline-block;vertical-align: text-top;list-style: none;" class="placehold-class" placeholder="${
                    attr.placeholder || ""
                  }" contenteditable="true">${comChildLi(
                    newMultOperArr,
                    0,
                    mode
                  )}</label>`;
                  break;
                case "surgery":
                  innerHTMLStr = `<label style="display: inline-block;" contenteditable="true" class="placehold-class" placeholder="${
                    attr.placeholder || ""
                  }">${
                    attr.bse_surgeryList
                      ? attr.bse_surgeryList.pop()[attr.fieldName || "name"] ||
                        ""
                      : ""
                  }</label>`;
                  break;
                case "sign":
                  innerHTMLStr = `
                      <text style="display: inline-block;vertical-align: text-top;">
                        <text style="display: block;">
                          ${
                            attr.signLabel
                              ? `<text contenteditable="false">${attr.signLabel}</text>`
                              : ""
                          }
                          <label contenteditable="false">
                            <label contenteditable="true" class="sign placehold-class" placeholder="${
                              attr.signplaceholder || ""
                            }"></label>
                          </label>
                        </text>
                        ${
                          attr.isShowDate
                            ? `<text style="display: block;">
                          ${
                            attr.dateLabel
                              ? `<text contenteditable="false">${attr.dateLabel}</text>`
                              : ""
                          }
                          <label contenteditable="false">
                            <label contenteditable="true" class="date placehold-class" placeholder="${
                              attr.dateplaceholder || ""
                            }"></label>
                          </label>
                        </text>`
                            : ""
                        }
                      </text>
                    `;
                  break;
                case "date":
                  function dateFormat(fmt, date) {
                    if (!date) return "";
                    date = new Date(date);
                    let ret;
                    const opt = {
                      "y+": date.getFullYear().toString(), // 年
                      "M+": (date.getMonth() + 1).toString(), // 月
                      "d+": date.getDate().toString(), // 日
                      "H+": date.getHours().toString(), // 时
                      "m+": date.getMinutes().toString(), // 分
                      "s+": date.getSeconds().toString(), // 秒
                      // 有其他格式化字符需求可以继续添加，必须转化成字符串
                    };
                    for (let k in opt) {
                      ret = new RegExp("(" + k + ")").exec(fmt);
                      if (ret) {
                        fmt = fmt.replace(
                          ret[1],
                          ret[1].length == 1
                            ? opt[k]
                            : opt[k].padStart(ret[1].length, "0")
                        );
                      }
                    }
                    return fmt;
                  }
                  innerHTMLStr = `<label style="display: inline-block;vertical-align: text-top;" contenteditable="false" class="placehold-class" placeholder="${
                    attr.placeholder || ""
                  }">${dateFormat(attr.dateformat, attr.value)}</label>`;
                  break;
                case "bloodPressure":
                  innerHTMLStr = `
                    <label contenteditable="true" id="extensional${
                      attr.id
                    }" class="extensional placehold-class" placeholder="${
                    attr.leftPlaceholder || ""
                  }"></label>
                    /
                    <label contenteditable="true" id="diastolic${
                      attr.id
                    }" class="diastolic placehold-class" placeholder="${
                    attr.rightPlaceholder || ""
                  }"></label>
                  `;
                  break;
                default:
                  innerHTMLStr = `<label style="display: inline-block;vertical-align: text-top;" contenteditable="true" class="placehold-class" placeholder="${
                    attr.placeholder || ""
                  }">${attr.value || ""}</label>`;
                  break;
              }
              elSrc.innerHTML = innerHTMLStr;
            } else {
              this.getEditor().insertHtml(
                serviceElementsMap(this.$refs.bseEleRef.formInline)
              );
            }
            this.dialogVisible = false;
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      } else {
        // 手术控件自定义验证
        const formInline = this.$refs.bseEleRef.formInline;
        const { bse_surgeryList } = formInline;
        let passFlag = true;
        const validList = [
          "code",
          "name",
          "doctor",
          "firstAssistant",
          "secondAssistant",
          "anesthesia",
          "anesthesiologist",
        ];
        const message = {
          code: "编码不能为空",
          name: "手术名称不能为空",
          doctor: "术者不能为空",
          firstAssistant: "一助不能为空",
          secondAssistant: "二助不能为空",
          anesthesia: "麻醉方式不能为空",
          anesthesiologist: "麻醉医师不能为空",
        };
        for (let item of bse_surgeryList) {
          for (let key of validList) {
            if (!item[key]) {
              this.$message.warning(message[key]);
              passFlag = false;
              break;
            }
            if (!passFlag) break;
          }
        }
        if (passFlag) {
          if (this.editModel) {
            const attr = JSON.parse(
              JSON.stringify(this.$refs.bseEleRef.formInline)
            );
            delete attr.elSrc;
            delete attr.elTag;
            const { elSrc } = this.formInline;
            elSrc.setAttribute("bse", JSON.stringify(attr));
            const innerHTMLStr = attr.bse_surgeryList
              .map((sur) => {
                return `<label style="display: inline-block;width: 100%;">
                  <em  style="color: black;font-weight: bold;margin-right: 6px;font-style: normal">手术名称:</em> <text style="color: #ccc;">${sur.name}</text>
                  <em style="color: black;font-weight: bold;;margin-left: 30px;margin-right: 6px;font-style: normal">日期:</em> <text style="color: #ccc;">${sur.date}</text>
                </label>
                <label style="display: inline-block;width: 100%;">
                  <em style="color: black;font-weight: bold;margin-right: 6px;font-style: normal">手术者:</em> <text style="color: #ccc;">${sur.doctor}</text>
                  <em style="color: black;font-weight: bold;;margin-left: 30px;margin-right: 6px;font-style: normal">护士:</em> <text style="color: #ccc;">${sur.firstAssistant}</text>
                  <em style="color: black;font-weight: bold;;margin-left: 30px;margin-right: 6px;font-style: normal">助手:</em> <text style="color: #ccc;">${sur.secondAssistant}</text>
                </label>
                <label style="display: inline-block;width: 100%;">
                  <em style="color: black;font-weight: bold;margin-right: 6px;font-style: normal">麻醉方式:</em> <text style="color: #ccc;">${sur.anesthesia}</text>
                  <em style="color: black;font-weight: bold;margin-left: 50px;margin-right: 6px;font-style: normal">麻醉医师:</em> <text style="color: #ccc;">${sur.anesthesiologist}</text>
                </label>`;
              })
              .join(
                '<title style="height: 1px;background: #dedede;margin: 2px 0;width: 100%;display: block;"></title>'
              );
            elSrc.innerHTML = innerHTMLStr;
          } else {
            // this.getEditor.editArea.focus()
            this.getEditor.insertHtml(
              serviceElementsMap(this.$refs.bseEleRef.formInline)
            );
          }
          this.dialogVisible = false;
        }
      }
    },
  },
};
</script>
<style>
.bse-dialog_fxgef8sl .el-dialog__header {
  background: #28a670;
  padding: 15px 20px 10px 20px;
}
.bse-dialog_fxgef8sl .el-dialog__header .el-dialog__title {
  font-weight: 700;
  line-height: 20px;
  font-size: 15px;
}
.bse-dialog_fxgef8sl .el-dialog__header .el-dialog__title,
.bse-dialog_fxgef8sl .el-dialog__headerbtn .el-dialog__close {
  color: white;
}
.bse-dialog_fxgef8sl .el-dialog__headerbtn {
  top: 15px;
}
.bse-btn_fsag8xlg {
  color: #fff;
  background-color: #28a670;
  border-color: #28a670;
  margin-left: 15px!important;
}
</style>
