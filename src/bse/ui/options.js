export default {
  baseUrl: "", // 静态资源基础路径，主要用于内部加载iframe.css有关
  mode: "designMode", //默认为设计模式设计模式（designMode）、编辑模式（editMode）、预览模式（previewMode）
  loading: false, // 处于loading
  autoPaging: true, // 是否开启分页
  height: "", // 编辑器高度
  el: null, //querySelector满足的值，比如#id、.className、Element。可以是Element，也可以是#id等, 必传
  footer: "曼荼罗软件股份有限公司技术提供", //element或者string 表示底部显示内容
  iframeCssSrc: [], //string/Array数组 扩展css
  iframeJsSrc: [], //string/Array数组 扩展js
  beforeunload: true, // 刷新之前是否询问
  paper: "A4", // A5 A6 A4
  papersizes: {
    // 尺寸配置，注意以下尺寸单位都是以【毫米】为单位 mm
    A4: {
      w: 210, // 整个宽
      h: 297, // 整个高
      pt: 20, // 页边距 上
      pb: 15, // 页边距 下
      pl: 15, // 页边距 左
      pr: 15, // 页边距 右
      hh: 6.6, // 页眉
      fh: 14, // 页脚
    },
    A5: {
      w: 148,
      h: 210,
      pt: 20, // 页边距 上
      pb: 15, // 页边距 下
      pl: 15, // 页边距 左
      pr: 15, // 页边距 右
      hh: 6.6, // 页眉
      fh: 14, // 页脚
    },
    A6: {
      w: 105,
      h: 148,
      pt: 20, // 页边距 上
      pb: 15, // 页边距 下
      pl: 15, // 页边距 左
      pr: 15, // 页边距 右
      hh: 6.6, // 页眉
      fh: 14, // 页脚
    },
  },

  // 工具栏，导航
  toolbars: {
    // 菜单栏
    nav: [
      {
        name: "file",
        title: "文件",
        items: [
          { name: "打开", title: "打开", disabled: true },
          { name: "保存", title: "保存", disabled: true },
          { name: "exportXml", title: "导出xml" },
          {
            name: "打印",
            title: "打印",
            items: [
              { name: "预览", title: "预览", disabled: true },
              { name: "print", title: "打印" },
              { name: "续打", title: "续打", disabled: true },
              { name: "套打", title: "套打", disabled: true },
            ],
          },
          {
            name: "页面设置",
            title: "页面设置",
            items: [
              { name: "A4", title: "A4" },
              { name: "A5", title: "A5" },
              { name: "A6", title: "A6" },
            ],
          },
          {
            name: "mode",
            title: "浏览模式选择",
            items: [
              { name: "editMode", title: "编辑模式" },
              { name: "designMode", title: "设计模式" },
              { name: "previewMode", title: "预览模式" },
            ],
          },
        ],
      },

      {
        name: "edit",
        title: "编辑",
        items: [
          {
            name: "undo",
            title: "撤销",
          },
          {
            name: "redo",
            title: "恢复",
          },
          {
            name: "paste",
            title: "粘贴",
          },
          { name: "选择性粘贴", title: "选择性粘贴", disabled: true },
          {
            name: "copy",
            title: "复制",
          },
          {
            name: "cut",
            title: "剪切",
          },
          // {
          //   name: "fontName",
          //   title: "字体",
          // },
          // {
          //   name: "fontSize",
          //   title: "字号",
          // },
          // {
          //   name: "foreColor",
          //   title: "文字颜色",
          // },
          // {
          //   name: "backcolor",
          //   title: "背景颜色",
          // },
          {
            name: "removeFormat",
            title: "清除格式",
          },
          {
            name: "subscript",
            title: "下标",
          },
          {
            name: "superscript",
            title: "上标",
          },
          {
            name: "bold",
            title: "加粗 ctrl+b",
          },
          {
            name: "italic",
            title: "倾斜 ctrl+i",
          },
          {
            name: "underline",
            title: "下划线",
          },
          {
            name: "strikeThrough",
            title: "删除线",
          },
          {
            name: "insertHorizontalRule",
            title: "分割线",
          },
          {
            name: "selectAll",
            title: "选择全部 ctrl+a",
          },
          // { name: "find", title: "查找" },
          // {
          //   name: "spechars",
          //   title: "特殊字符",
          // },
          {
            name: "justifyLeft",
            title: "向左对齐",
          },
          {
            name: "justifyCenter",
            title: "居中对齐",
          },
          {
            name: "justifyRight",
            title: "向右对齐",
          },
          {
            name: "justifyFull",
            title: "两端对齐",
          },
          {
            name: "insertUnorderedList",
            title: "无序编号",
          },
          {
            name: "insertOrderedList",
            title: "有序编号",
          },
          // { name: "delete", title: "删除" }
        ],
      },
      {
        name: "element",
        title: "元素",
        items: [
          {
            name: "radio",
            title: "单选框",
          },
          {
            name: "checkbox",
            title: "多选框",
          },
          {
            name: "date",
            title: "日期",
          },
          {
            name: "input",
            title: "输入框",
          },
          {
            name: "select",
            title: "下拉框",
          },
          {
            name: "label",
            title: "标签",
          },
          {
            name: "number",
            title: "数字",
          },
          {
            name: "splitline",
            title: "分割线",
          },
          {
            name: "pagebreak",
            title: "分页",
          },
          {
            name: "diagnose",
            title: "诊断",
          },
          {
            name: "surgery",
            title: "手术",
          },
          {
            name: "sign",
            title: "签名",
          },
          {
            name: "bloodPressure",
            title: "血压",
          },

          {
            name: "medicalExpression",
            title: "医学表达式",
            // items: [
            //   { name: '牙齿标注', title: '牙齿标注', disabled: true },
            //   { name: '月经史', title: '月经史', disabled: true },
            //   { name: '胎心位置', title: '胎心位置', disabled: true },
            //   { name: '乳牙标注', title: '乳牙标注', disabled: true },
            //   { name: '突眼', title: '突眼', disabled: true },
            //   { name: '光定位', title: '光定位', disabled: true },
            //   { name: '房角', title: '房角', disabled: true },
            //   { name: '肺结核', title: '肺结核', disabled: true }
            // ]
          },
        ],
      },

      {
        name: "table",
        title: "表格",
        items: [
          { name: "inserttable", title: "插入表格" },
          { name: "deletetable", title: "删除表格" },
          {
            name: "alignway",
            title: "对齐方式",
            items: [
              { name: "tablealigntopleft", title: "顶端左对齐" },
              { name: "tablealigntopcenter", title: "顶端居中对齐" },
              { name: "tablealigntopright", title: "顶端右对齐" },
              { name: "tablealignmiddleleft", title: "垂直左对齐" },
              { name: "tablealignmiddlecenter", title: "垂直居中对齐" },
              { name: "tablealignmiddleright", title: "垂直右对齐" },
              { name: "tablealignbottomleft", title: "底端左对齐" },
              { name: "tablealignbottomcenter", title: "底端居中对齐" },
              { name: "tablealignbottomright", title: "底端右对齐" },
            ],
          },
          { name: "inserttablerowtop", title: "上面插入表格行" },
          { name: "inserttablerowbottom", title: "下面插入表格行" },
          { name: "deletetablerow", title: "删除表格行" },
          { name: "inserttablecolleft", title: "左边插入表格列" },
          { name: "inserttablecolright", title: "右边插入表格列" },
          { name: "deletetablecol", title: "删除表格列" },
          { name: "mergetablecell", title: "合并单元格" },
          { name: "splittablecell", title: "拆分单元格" },
          {
            name: "cellborder",
            title: "单元格网格线",
            items: [
              { name: "tableborderlinesolid", title: "实线" },
              { name: "tableborderlinedashed", title: "虚线" },
              { name: "tableborderlinenone", title: "无" },
            ],
          },
          { name: "tablelineheight", title: "设置行高" },
        ],
      },
      {
        name: "test",
        title: "测试功能",
        items: [
          { name: "testCopyContentHtml", title: "【复制】内容html" },
          { name: "testExportPageHeaderTxt", title: "【上传】页眉测试" },
          { name: "testSetContentEmpty", title: "【设置】内容为空" },
          {
            name: "testMedicalRecord",
            title: "【病历模板】🎉",
            items: [
              {
                name: "testMedicalRecordTemplate",
                title: "ICU入院护理评估单.html",
              },
              { name: "testMedicalRecordTemplate", title: "入院记录.html" },
              { name: "testMedicalRecordTemplate", title: "出院记录.html" },
              {
                name: "testMedicalRecordTemplate",
                title: "成人跌倒风险表.html",
              },
              {
                name: "testMedicalRecordTemplate",
                title: "痔疮风险评分表.html",
              },
              {
                name: "testMedicalRecordTemplate",
                title: "痔疮风险评分表.html",
              },
              { name: "testMedicalRecordTemplate", title: "项目表格1.html" },
              {
                name: "testMedicalRecordTemplate",
                title: "首次病程录-页眉.html",
              },
              {
                name: "testMedicalRecordTemplate",
                title: "600页卡顿测试.html",
              },
            ],
          },
        ],
      },
    ],

    // 菜单图标
    common: [
      {
        name: "undo",
        title: "撤销",
      },
      {
        name: "redo",
        title: "恢复",
      },
      {
        name: "paste",
        title: "粘贴",
      },
      {
        name: "copy",
        title: "复制",
      },
      {
        name: "cut",
        title: "剪切",
      },
      {
        name: "fontName",
        title: "字体",
      },
      {
        name: "fontSize",
        title: "字号",
      },
      {
        name: "foreColor",
        title: "文字颜色",
      },
      {
        name: "backcolor",
        title: "背景颜色",
      },
      {
        name: "removeFormat",
        title: "清除格式",
      },
      {
        name: "subscript",
        title: "下标",
      },
      {
        name: "superscript",
        title: "上标",
      },
      {
        name: "bold",
        title: "加粗 ctrl+b",
      },
      {
        name: "italic",
        title: "倾斜 ctrl+i",
      },
      {
        name: "underline",
        title: "下划线",
      },
      {
        name: "strikeThrough",
        title: "删除线",
      },
      {
        name: "insertHorizontalRule",
        title: "分割线",
      },
      {
        name: "selectAll",
        title: "选择全部 ctrl+a",
      },
      {
        name: "spechars",
        title: "特殊字符",
      },
      {
        name: "justifyLeft",
        title: "向左对齐",
      },
      {
        name: "justifyCenter",
        title: "居中对齐",
      },
      {
        name: "justifyRight",
        title: "向右对齐",
      },
      {
        name: "justifyFull",
        title: "两端对齐",
      },
      {
        name: "insertUnorderedList",
        title: "无序编号",
      },
      {
        name: "insertOrderedList",
        title: "有序编号",
      },
    ],
    // name: 'bse-toolbar-editor',
    // title: '编辑',
  },
};
