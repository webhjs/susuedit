<template>
  <div class="bse-wrap">
    <div class="left-wrap">
      <el-button slot="append" icon="el-icon-download" @click="composeElement('moduleEle')">模板元素</el-button>
      <el-button slot="append" icon="el-icon-download" @click="composeElement('composeEle')">组合元素</el-button>
      <el-button slot="append" icon="el-icon-download" @click="diagnoseElement">诊断元素</el-button>
      <el-button slot="append" icon="el-icon-download" @click="surgeryElement">手术元素</el-button>
      <el-button slot="append" icon="el-icon-download" @click="validateRules">验证数据</el-button>
      <el-button slot="append" icon="el-icon-download" @click="inserXmlModule">插入xml</el-button>
      <el-button slot="append" icon="el-icon-download" @click="getXmlorhtmlString">获取xml或html字符串</el-button>
      <el-button slot="append" icon="el-icon-download" @click="addTab">快速生成编辑器测试</el-button>
      <el-button slot="append" icon="el-icon-download" @click="updateApiDate">更新数据</el-button>
      <el-button slot="append" icon="el-icon-download" @click="getInnerContent">获取文本行内内容</el-button>
      <el-button slot="append" icon="el-icon-download" @click="setContent">设置内容为空</el-button>
      <el-button slot="append" icon="el-icon-download" @click="getContent">获取内容</el-button>
      <el-button slot="append" icon="el-icon-download" @click="getContentFocus">focus编辑器区域</el-button>
      <el-radio-group v-model="mode" @change="switchEditorMode">
        <el-radio-button label="designMode">设计</el-radio-button>
        <el-radio-button label="editMode">编辑</el-radio-button>
        <el-radio-button label="previewMode">预览</el-radio-button>
      </el-radio-group>
      <el-radio-group v-model="modePaper" @change="switchEditorModePaper">
        <el-radio-button label="A4">A4</el-radio-button>
        <el-radio-button label="A5">A5</el-radio-button>
        <el-radio-button label="A6">A6</el-radio-button>
      </el-radio-group>
      <div class="left-top">
        <ul>
          <li @click="handlerChangeSection"><i class="el-icon-message"></i> 段落</li>
          <li @click="handlerChangeSection"><i class="el-icon-message"></i> 段落1</li>
          <li @click="handlerChangeSection"><i class="el-icon-message"></i> 段落2</li>
          <li @click="handlerChangeSection"><i class="el-icon-message"></i> 段落3</li>
          <li @click="handlerChangeSection"><i class="el-icon-message"></i> 段落4</li>
          <li @click="handlerChangeSection"><i class="el-icon-message"></i> 段落5</li>
          <li @click="handlerChangeSection"><i class="el-icon-message"></i> 段落6</li>
          <li @click="handlerChangeSection"><i class="el-icon-message"></i> 段落7</li>
          <li @click="handlerChangeSection"><i class="el-icon-message"></i> 段落8</li>
        </ul>
      </div>
    </div>
    <div class="center-wrap">
      <div :ref="`bseRef`" style="height: 800px;width: 500px;"></div>
    </div>
    <div class="right-wrap">
      <div class="right-top">
        <ul>
          <li @click="handlerChangeModule"><i class="el-icon-message"></i> 组合元素</li>
          <li @click="handlerChangeModule"><i class="el-icon-message"></i> 组合元素1</li>
          <li @click="handlerChangeModule"><i class="el-icon-message"></i> 组合元素2</li>
          <li @click="handlerChangeModule"><i class="el-icon-message"></i> 组合元素3</li>
          <li @click="handlerChangeModule"><i class="el-icon-message"></i> 组合元素4</li>
          <li @click="handlerChangeModule"><i class="el-icon-message"></i> 组合元素5</li>
          <li @click="handlerChangeModule"><i class="el-icon-message"></i> 组合元素6</li>
          <li @click="handlerChangeModule"><i class="el-icon-message"></i> 组合元素7</li>
          <li @click="handlerChangeModule"><i class="el-icon-message"></i> 组合元素8</li>
        </ul>
      </div>
      <div class="right-bottom">
        <ul>
          <li @click="handlerChangeModule"><i class="el-icon-message"></i> 模板元素</li>
          <li @click="handlerChangeModule"><i class="el-icon-message"></i> 模板元素1</li>
          <li @click="handlerChangeModule"><i class="el-icon-message"></i> 模板元素2</li>
          <li @click="handlerChangeModule"><i class="el-icon-message"></i> 模板元素3</li>
          <li @click="handlerChangeModule"><i class="el-icon-message"></i> 模板元素4</li>
          <li @click="handlerChangeModule"><i class="el-icon-message"></i> 模板元素5</li>
          <li @click="handlerChangeModule"><i class="el-icon-message"></i> 模板元素6</li>
          <li @click="handlerChangeModule"><i class="el-icon-message"></i> 模板元素7</li>
          <li @click="handlerChangeModule"><i class="el-icon-message"></i> 模板元素8</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Bse from "./bse";
export default {
  data() {
    return {
      activeName: 'first',
      editableTabs: [],
      mode: 'previewMode',
      modePaper: 'A4'
    }
  },
  mounted() {
    const instance = (this._instance = new Bse.BSEedit({
      el: this.$refs.bseRef,
      height: '900px',
      toolbars: {
        // 菜单栏
        // nav: [
        //   {
        //     name: 'file',
        //     title: '文件',
        //     items: [{ name: '打开', title: '打开', disabled: true }]
        //   },
        //   {
        //     name: 'custom-menu',
        //     title: '自定义菜单',
        //     items: [
        //       {
        //         name: '打开',
        //         title: '打开',
        //         onClick: (name, editor) => {
        //           console.log(name, editor)
        //         }
        //       }
        //     ]
        //   },
        //   {
        //     name: 'element',
        //     title: '元素',
        //     items: [
        //       { name: 'insertPicture', title: '图片' },
        //       { name: 'bseLabel', title: '标签' },
        //       { name: 'bseInput', title: '输入框' },
        //       { name: 'bseNumber', title: '数字' },
        //       { name: 'bseDate', title: '日期' },
        //       { name: 'bseRadio', title: '单选框' },
        //       { name: 'bseCheckBox', title: '多选框' },
        //       { name: '文本域', title: '文本域', disabled: true },
        //       { name: '条形码', title: '条形码', disabled: true },
        //       { name: 'bseSelect', title: '下拉框' },
        //       { name: 'bseSplitline', title: '分割线' },
        //       {
        //         name: 'medicalExpression',
        //         title: '医学表达式'
        //         // items: [
        //         //   { name: '牙齿标注', title: '牙齿标注', disabled: true },
        //         //   { name: '月经史', title: '月经史', disabled: true },
        //         //   { name: '胎心位置', title: '胎心位置', disabled: true },
        //         //   { name: '乳牙标注', title: '乳牙标注', disabled: true },
        //         //   { name: '突眼', title: '突眼', disabled: true },
        //         //   { name: '光定位', title: '光定位', disabled: true },
        //         //   { name: '房角', title: '房角', disabled: true },
        //         //   { name: '肺结核', title: '肺结核', disabled: true }
        //         // ]
        //       },
        //       { name: 'bseDiagnose', title: '诊断控件' },
        //       { name: 'bseSurgery', title: '手术控件' },
        //       { name: 'bseSign', title: '签名控件' },
        //       { name: 'bseBloodPressure', title: '血压控件' }
        //     ]
        //   },
        //   {
        //     name: 'test',
        //     title: '测试功能',
        //     items: [
        //       { name: 'testCopyHtml', title: '【复制】整个html' },
        //       { name: 'testExportWholeHtml', title: '【导出】整个html' },
        //       { name: 'testCopyContentHtml', title: '【复制】内容html' },
        //       { name: 'testExportHtml', title: '【导出】内容html' },
        //       // { name: 'testExportWholeTxt', title: '导出整个txt' },
        //       { name: 'testExportPageHeader', title: '【导出】页眉模版' },
        //       { name: 'testExportPageHeaderTxt', title: '【导出】当前页眉' },
        //       { name: 'testUploadPageHeader', title: '【上传】页眉' },
        //       { name: 'testUploadPageWrap', title: '【上传】整个html' },
        //       { name: 'testSetContentEmpty', title: '【设置】内容为空' },
        //       {
        //         name: 'testMedicalRecord',
        //         title: '【病历模板】🎉',
        //         items: [
        //           { name: 'testMedicalRecordTemplate', title: 'ICU入院护理评估单.html' },
        //           { name: 'testMedicalRecordTemplate', title: '入院记录.html' },
        //           { name: 'testMedicalRecordTemplate', title: '出院记录.html' },
        //           { name: 'testMedicalRecordTemplate', title: '成人跌倒风险表.html' },
        //           { name: 'testMedicalRecordTemplate', title: '痔疮风险评分表.html' },
        //           { name: 'testMedicalRecordTemplate', title: '痔疮风险评分表.html' },
        //           { name: 'testMedicalRecordTemplate', title: '项目表格1.html' },
        //           { name: 'testMedicalRecordTemplate', title: '首次病程录-页眉.html' },
        //           { name: 'testMedicalRecordTemplate', title: '600页卡顿测试.html' }
        //         ]
        //       }
        //     ]
        //   }
        // ],
        // 菜单图标
        // common: [
        //   {
        //     name: 'undo',
        //     title: '撤销',
        //     visible: true
        //   },
        //   {
        //     name: 'redo',
        //     title: '恢复',
        //     visible: true
        //   },
        //   {
        //     name: 'paste',
        //     title: '粘贴',
        //     visible: true
        //   },
        //   {
        //     name: 'copy',
        //     title: '复制',
        //     visible: true
        //   },
        //   {
        //     name: 'custom',
        //     icon: 'el-icon-edit',
        //     title: '操作',
        //     visible: true,
        //     onClick: function (name, editor) {
        //       console.log(editor, name)
        //     }
        //   }
        // ]
      },
      contextMenus: [
        {
          label: '组套',
          icon: 'el-icon-printer',
          onClick: () => {
            console.log('11111')
          },
          disable: true
        },
        {
          label: '快捷组套',
          icon: 'el-icon-printer',
          onClick: (_, editor) => {
            console.log(editor)
          }
        }
      ],
      // 获取表格数据 外部接口实现
      getDynamicTable(callback, formInline) {
        console.log('动态表单', formInline)
        setTimeout(() => {
          callback({
            tablelist: [
              {
                bseTableName: '性别表'
              },
              {
                bseTableName: '备注表'
              },
              {
                bseTableName: '计算表'
              }
            ], // 动态表格数据
            tableMapping: {
              表名: 'bseTableName'
            } // 动态表格映射
          })
        }, 2000)
      },
      // 点击表格 外部接口实现
      requestTable(callback, param) {
        console.log('点击表格', param)
        setTimeout(() => {
          callback({
            tablefieldlist: [
              {
                bseFieldName: '男'
              },
              {
                bseFieldName: '女'
              }
            ], // 动态表格数据
            tablefieldMapping: {
              字段名: 'bseFieldName'
            } // 动态表格映射
          })
        }, 2000)
      },
      // 点击字段 外部接口实现
      requestTableField(callback, param) {
        console.log('点击字段', param)
        setTimeout(() => {
          callback([
            {
              value: '男'
            },
            {
              value: '女'
            }
          ])
        }, 2000)
      },
      /* 诊断接口定义 */
      // 获取诊断表单字段
      requestDiagnoseField(callback, param, formInline) {
        console.log('点击字段', param, formInline, this.activeName)
        setTimeout(() => {
          callback([
            {
              code: '1',
              name: '门诊诊断',
              memo: '临床初步诊断'
            },
            {
              code: '1',
              name: '门诊诊断',
              memo: '临床初步诊断'
            },
            {
              code: '1',
              name: '门诊诊断',
              memo: '临床初步诊断'
            },
            {
              code: '1',
              name: '门诊诊断',
              memo: '临床初步诊断'
            },
            {
              code: '1',
              name: '门诊诊断',
              memo: '临床初步诊断'
            },
            {
              code: '1',
              name: '门诊诊断',
              memo: '临床初步诊断'
            },
            {
              code: '1',
              name: '门诊诊断',
              memo: '临床初步诊断'
            },
            {
              code: '1',
              name: '门诊诊断',
              memo: '临床初步诊断'
            },
            {
              code: '1',
              name: '门诊诊断',
              memo: '临床初步诊断'
            },
            {
              code: '1',
              name: '门诊诊断',
              memo: '临床初步诊断'
            },
            {
              code: '1',
              name: '门诊诊断',
              memo: '临床初步诊断'
            },
            {
              code: '1',
              name: '门诊诊断',
              memo: '临床初步诊断'
            },
            {
              code: '1',
              name: '门诊诊断',
              memo: '临床初步诊断'
            },
            {
              code: '1',
              name: '门诊诊断',
              memo: '临床初步诊断'
            }
          ])
        }, 2000)
      },
      // 获取历史诊断
      requestDiagnosHistroyTable(callback, formInline) {
        console.log('点击字段', formInline)
        setTimeout(() => {
          callback([
            {
              code: '1',
              name: '门诊诊断',
              memo: '临床初步诊断'
            }
          ])
        }, 2000)
      },
      // 获取诊断拖拽表格
      requestDiagnosTreeTable(callback, formInline) {
        console.log('点击字段', formInline)
        setTimeout(() => {
          callback([
            // 必须纯在唯一id 和 children 和 parentId
            {
              id: 1,
              parentId: 0,
              bse_type: '中医诊断',
              bse_categery: '入院诊断',
              bse_disease_name: '肾虚',
              bse_disease_name_desc: '病描述',
              bse_symptom_name: '症名',
              bse_symptom_name_desc: '症描述',
              bse_diagnose_name: '',
              bse_diagnose_name_desc: '',
              children: [
                {
                  id: 11,
                  parentId: 1,
                  bse_type: '中医诊断',
                  bse_categery: '入院诊断',
                  bse_disease_name: '子病',
                  bse_disease_name_desc: '病描述',
                  bse_symptom_name: '一期症名',
                  bse_symptom_name_desc: '症描述',
                  bse_diagnose_name: '',
                  bse_diagnose_name_desc: '',
                  children: [
                    {
                      id: 111,
                      parentId: 11,
                      bse_type: '中医诊断',
                      bse_categery: '入院诊断',
                      bse_disease_name: '子子病',
                      bse_disease_name_desc: '病描述',
                      bse_symptom_name: '二期症名',
                      bse_symptom_name_desc: '症描述',
                      bse_diagnose_name: '',
                      bse_diagnose_name_desc: ''
                    }
                  ]
                }
              ]
            },
            {
              id: 2,
              parentId: 0,
              bse_type: '中医诊断',
              bse_categery: '入院诊断',
              bse_disease_name: '巨唇',
              bse_disease_name_desc: '病描述',
              bse_symptom_name: '症名',
              bse_symptom_name_desc: '症描述',
              bse_diagnose_name: '',
              bse_diagnose_name_desc: ''
            },
            {
              id: 3,
              parentId: 0,
              bse_type: '西医诊断',
              bse_categery: '出院诊断',
              bse_disease_name: '',
              bse_disease_name_desc: '',
              bse_symptom_name: '',
              bse_symptom_name_desc: '',
              bse_diagnose_name: '西医诊断',
              bse_diagnose_name_desc: '西医诊断描述',
              children: [
                {
                  id: 31,
                  parentId: 3,
                  bse_type: '西医诊断',
                  bse_categery: '出院诊断',
                  bse_disease_name: '不适',
                  bse_disease_name_desc: '',
                  bse_symptom_name: '',
                  bse_symptom_name_desc: '',
                  bse_diagnose_name: '西医诊断',
                  bse_diagnose_name_desc: '西医诊断描述',
                  children: [
                    {
                      id: 333,
                      parentId: 31,
                      bse_type: '西医诊断',
                      bse_categery: '出院诊断',
                      bse_disease_name: '嗜睡',
                      bse_disease_name_desc: '',
                      bse_symptom_name: '',
                      bse_symptom_name_desc: '',
                      bse_diagnose_name: '西医诊断',
                      bse_diagnose_name_desc: '西医诊断描述'
                    }
                  ]
                },
                {
                  id: 32,
                  parentId: 3,
                  bse_type: '西医诊断',
                  bse_categery: '出院诊断',
                  bse_disease_name: '',
                  bse_disease_name_desc: '',
                  bse_symptom_name: '',
                  bse_symptom_name_desc: '',
                  bse_diagnose_name: '西医诊断',
                  bse_diagnose_name_desc: '西医诊断描述'
                }
              ]
            },
            {
              id: 4,
              parentId: 0,
              bse_type: '西医诊断',
              bse_categery: '临床诊断',
              bse_disease_name: '',
              bse_disease_name_desc: '',
              bse_symptom_name: '',
              bse_symptom_name_desc: '',
              bse_diagnose_name: '西医诊断',
              bse_diagnose_name_desc: '西医诊断描述'
            }
          ])
        }, 2000)
      },
      // 获取常用诊断
      requestDiagnosCommonlyTable(callback, formInline) {
        console.log('点击字段', formInline)
        setTimeout(() => {
          callback([
            {
              code: '1',
              name: '个人常用诊断',
              memo: '临床初步诊断',
              children: [
                {
                  code: '1.1',
                  name: '门诊诊断',
                  memo: '临床初步诊断'
                }
              ]
            },
            {
              code: '2',
              name: '科室常用诊断',
              memo: '临床初步诊断',
              children: [
                {
                  code: '2.1',
                  name: '科室常用门诊诊断',
                  memo: '临床初步诊断'
                }
              ]
            }
          ])
        }, 2000)
      },
      // 获取常用子诊断分类
      requestDiagnosTableChildren(callback, formInline) {
        console.log('点击字段', formInline)
        setTimeout(() => {
          callback([
            {
              code: '类型',
              name: '分类',
              memo: '备注'
            }
          ])
        }, 2000)
      },
      /* 诊断接口定义 */
      /* 手术接口定义 */
      requestSurgeryTreeTable(callback, formInline) {
        console.log('点击字段', formInline)
        setTimeout(() => {
          callback([
            {
              type: '类型',
              code: '手术编码',
              name: '手术名称',
              surgeryLevel: '手术等级',
              anesthesia: '麻醉方法'
            }
          ])
        }, 2000)
      },
      requestSurgeryField(callback, param, formInline) {
        console.log('点击字段', param, formInline)
        setTimeout(() => {
          callback([
            {
              code: '1',
              name: '门诊诊断',
              memo: '临床初步诊断'
            }
          ])
        })
      }
      /* 手术接口定义 */
    }))
    /* 诊断接口定义 */
    // 查询诊断
    instance.addListener('serachDiagnose', (payload, callback) => {
      console.log(payload)
      setTimeout(() => {
        callback(
          {
            status: 200,
            data: [],
            msg: '查询诊断成功'
          },
          2000
        )
      })
    })
    // 设为常用诊断
    instance.addListener('setCommonlyDiagnose', (payload, callback) => {
      console.log(payload)
      setTimeout(() => {
        callback({
          status: 200,
          data: [],
          msg: '设置常用诊断成功'
        })
      }, 2000)
    })
    // 保存诊断
    instance.addListener('saveDiagnoseList', (payload, callback) => {
      console.log('保存诊断', payload)
      setTimeout(() => {
        callback({
          status: 200,
          data: [],
          msg: '保存诊断列表成功'
        })
      }, 2000)
    })
    /* 诊断接口定义 */
    /* 手术接口定义 */
    // 设为常用手术
    instance.addListener('setCommonlySurgery', (payload, callback) => {
      console.log(payload)
      setTimeout(() => {
        callback({
          status: 200,
          data: [],
          msg: '设置常用诊断成功'
        })
      }, 2000)
    })
    /* 手术接口定义 */
  },
  methods: {
    setContent() {
      this._instance.setContent('<dnf bse="%7B%22module%22%3A%22composeEle%22%2C%22name%22%3A%22333%22%2C%22id%22%3A%22333%22%7D" class="bse-element"><span class="bse-element" bse-left="" bse-right="" style="font-weight: bold" bse="%7B%22notallowdelete%22%3Atrue%2C%22contenteditable%22%3Afalse%2C%22type%22%3A%22label%22%2C%22name%22%3A%22111%22%2C%22id%22%3A%221111%22%2C%22placeholder%22%3A%221111%22%2C%22value%22%3A%2211111%22%7D" contenteditable="false"><label contenteditable="true" class="placehold-class" placeholder="1111">11111</label></span>​<span class="bse-element" bse-left="[" bse-right="]" bse="%7B%22forceUpdateWay%22%3A%22%22%2C%22type%22%3A%22input%22%2C%22name%22%3A%22222%22%2C%22id%22%3A%22222%22%2C%22value%22%3A%222222%22%7D" contenteditable="false"><label contenteditable="true" class="placehold-class" placeholder="">2222</label></span>​</dnf>')
    },
    getContent() {
      this._tempHtml = this._instance.getContent()
    },
    getContentFocus() {
      this._instance.getEditorAreaFocus()
    },
    // 获取文本内容
    getInnerContent() {
      console.log(this._instance.getContent())
    },

    addTab() {
      this.editableTabs.push({
        title: 'New Tab',
        content: 'New Tab content'
      })
    },

    handlerChangeModule() {
      
    },

    // 组合元素弹窗
    composeElement(module = 'moduleEle') {
      /**
       * 组合元素弹框
       * @param {String} 事件名
       * @param {Object} 参数
       * @param {Boolean} dialog确认回调函数
       */
      this._instance.execCommand('composeelementdialog', { module }, (payload, formInline) => {
        const download_html = fileName => {
          const pom = document.createElement('a')
          pom.setAttribute('href', 'data:html/plain;charset=utf-8,' + encodeURIComponent(payload))
          pom.setAttribute('download', fileName + '.html')
          if (document.createEvent) {
            const event = document.createEvent('MouseEvents')
            event.initEvent('click', true, true)
            pom.dispatchEvent(event)
          } else {
            pom.click()
          }
        }
        download_html(formInline.name)
      })
    },

    // 外部调用诊断控件
    diagnoseElement() {
      this._instance.execCommand(
        'diagnoseelementdialog',
        {
          attr: {
            type: 'diagnose',
            bse_multipleSelection: [
              {
                id: 333,
                parentId: 31,
                bse_code: 1,
                bse_type: '西医诊断',
                bse_categery: '出院诊断',
                bse_diagnose_name: '诊断',
                bse_diagnose_name_desc: '诊断描述',
                bse_disease_name: '嗜睡',
                bse_disease_name_desc: '病描述',
                bse_symptom_name: '',
                bse_symptom_name_desc: '症描述',
                level: 3,
                order: 0,
                _path: '0/0/0'
              }
            ]
          }
        },
        payload => {
          console.log(payload)
        }
      )
    },

    // 外部调用手术控件
    surgeryElement() {
      this._instance.execCommand(
        'surgeryelementdialog',
        {
          attr: {
            type: 'surgery',
            bse_surgeryList: [
              {
                type: '类型',
                anesthesia: '麻醉方法',
                code: '手术编码',
                name: '手术名称',
                surgeryLevel: '手术等级',
                id: 'bse_0',
                date: '2022-07-06'
              }
            ]
          }
        },
        payload => {
          console.log(payload)
        }
      )
    },

    // 验证数据
    validateRules() {
      this._instance.execCommand('validaterules', payload => {
        console.log(payload)
      })
    },

    // 插入内容
    inserXmlModule() {
      const strings = `<?xml version="1.0" encoding="UTF-8"?><data version="4.0"><bloodPressure_0001><name>高血压</name><id>0001</id><leftPlaceholder>输入</leftPlaceholder><rightPlaceholder></rightPlaceholder></bloodPressure_0001><select_001><bse_card>axios</bse_card><bse_json_request><bseTableObj></bseTableObj><bseFieldObj></bseFieldObj></bse_json_request><name>名字</name><id>001</id><placeholder>23424</placeholder><groupName>学生考试</groupName><disabledExpression>002=女</disabledExpression></select_001><radio_002><bse_card>fixed</bse_card><bse_json_request><bseTableObj></bseTableObj><bseFieldObj></bseFieldObj></bse_json_request><name>性别</name><value>女</value><bse_options><value>男</value></bse_options><bse_options><value>女</value></bse_options><id>002</id><groupName>学生考试</groupName></radio_002><select_精神状态><bse_card>fixed</bse_card><bse_json_request><bseTableObj></bseTableObj><bseFieldObj></bseFieldObj></bse_json_request><name>精神状态</name><id>精神状态</id><placeholder>精神状态</placeholder><value></value><bse_options><value>了解自己能力</value></bse_options><bse_options><value>忘记自己限制</value></bse_options><groupName>成人跌倒风险</groupName><settleExpression>了解自己能力=0,忘记自己限制=15</settleExpression></select_精神状态><input_患者跌倒风险><name>患者跌倒风险</name><id>患者跌倒风险</id><altTitle></altTitle><groupName>成人跌倒风险</groupName><settleExpression>患者曾跌倒+超过一个医学诊断+使用助行器具+静脉输液+步态+精神状态+分</settleExpression><placeholder>患者跌倒风险</placeholder></input_患者跌倒风险>
		<html>
			<p data-cache-id="9e4f6cdf-82bb-4430-89fa-3cbe3f608c19" _="g0dLlOPZaznYifhZ"><br data-cache-id="12f0531c-d488-40ae-b4bc-ba8ea9e0bc4d"></p><p data-cache-id="9e4f6cdf-82bb-4430-89fa-3cbe3f608c19" _="EB925dKuK-joM-J9"><strong data-cache-id="f99a1da5-791f-4899-965a-c11052da6dfd" _="Vod6Ms0H1BsGJIvc">成人跌倒风险评估量表(Morse量表)</strong></p><p data-cache-id="9e4f6cdf-82bb-4430-89fa-3cbe3f608c19" _="NxOgJT6Zpua4a6bu"><strong data-cache-id="f99a1da5-791f-4899-965a-c11052da6dfd" _="Vod6Ms0H1BsGJIvc"><br></strong></p><p data-cache-id="9e4f6cdf-82bb-4430-89fa-3cbe3f608c19" _="yPMbPT9cxrlokE2X"><strong data-cache-id="f99a1da5-791f-4899-965a-c11052da6dfd" _="Vod6Ms0H1BsGJIvc"><br></strong></p><p data-cache-id="9e4f6cdf-82bb-4430-89fa-3cbe3f608c19" _="ueuYpE05GvASWw2T"><strong data-cache-id="f99a1da5-791f-4899-965a-c11052da6dfd" _="Vod6Ms0H1BsGJIvc"><br><span class="bse-element validateFaild" bse-left="[" bse-right="]" bse="%7B%22type%22%3A%22bloodPressure%22%2C%22name%22%3A%22%E9%AB%98%E8%A1%80%E5%8E%8B%22%2C%22id%22%3A%220001%22%2C%22leftPlaceholder%22%3A%22%E8%BE%93%E5%85%A5%22%2C%22rightPlaceholder%22%3A%22%22%7D" contenteditable="false"><label contenteditable="true" id="extensional0001" class="placehold-class" placeholder="输入"></label>/<label contenteditable="true" id="diastolic0001" class="placehold-class" placeholder=""></label></span>​</strong></p><p data-cache-id="9e4f6cdf-82bb-4430-89fa-3cbe3f608c19" _="i0BT2wOPqKGf7AMx"><strong data-cache-id="f99a1da5-791f-4899-965a-c11052da6dfd" _="Vod6Ms0H1BsGJIvc"><br></strong></p><p data-cache-id="9e4f6cdf-82bb-4430-89fa-3cbe3f608c19" _="A4MPM7x8OoORDnN0"><strong data-cache-id="f99a1da5-791f-4899-965a-c11052da6dfd" _="Vod6Ms0H1BsGJIvc"><br></strong></p><table id="bcrlxnxvvc773348" class="bse-table" cellspacing="1" style="width: 100%;" _="tH_yVwrlUqHEpk0c" data-resize-id="d0OGuwvO"><colgroup><col style="width: 11.1112%;"><col style="width: 11.1111%"><col style="width: 11.1111%"><col style="width: 11.1111%"><col style="width: 11.1111%"><col style="width: 11.1111%"><col style="width: 11.1111%"><col style="width: 11.1111%"><col style="width: 11.1111%"></colgroup><tbody><tr><td colspan="1" rowspan="2" _="fVS4WdHFlGyyTqle" style="border: 1px dashed rgb(204, 204, 204);"><p><br></p></td><td colspan="1" rowspan="1" _="8f9CdmU2rP1INk2T" style="border: 1px dashed rgb(204, 204, 204); height: 29px;"><p><br></p></td><td colspan="1" rowspan="1" _="0nvDs9iq0XBrhOTH" style="border: 1px dashed rgb(204, 204, 204); height: 29px;"><p><br></p></td><td colspan="1" rowspan="1" _="NUw8ToDPm3F0hbwF" style="border: 1px dashed rgb(204, 204, 204); height: 29px;"><p><br></p></td><td colspan="1" rowspan="1" _="nK24SsdKSL_EAlcx" style="border: 1px dashed rgb(204, 204, 204); height: 29px;"><p><br></p></td><td colspan="1" rowspan="1" _="zYRLVcKzghts4XjF" style="border: 1px dashed rgb(204, 204, 204); height: 29px;"><p><br></p></td><td colspan="1" rowspan="1" _="Kucl0_jD3LVA8DGO" style="border: 1px dashed rgb(204, 204, 204); height: 29px;"><p><br></p></td><td colspan="1" rowspan="1" _="qezurniOAfw1j2lA" style="border: 1px dashed rgb(204, 204, 204); height: 29px;"><p><br></p></td><td colspan="1" rowspan="1" _="mSJwMPLtBRy3gmKQ" style="border: 1px dashed rgb(204, 204, 204); height: 29px;"><p><br></p></td></tr><tr><td colspan="1" rowspan="1" _="W5jDbwRwBaHz0tzC" style="border: 1px dashed rgb(204, 204, 204);"><p><br></p></td><td colspan="1" rowspan="1" _="dhdQIamIZFGfgRPr" style="border: 1px dashed rgb(204, 204, 204);"><p><br></p></td><td colspan="1" rowspan="1" _="p0TPonI2WmpDne-9" style="border: 1px dashed rgb(204, 204, 204);"><p><br></p></td><td colspan="1" rowspan="1" _="AgckKJPopHpCffPW" style="border: 1px dashed rgb(204, 204, 204);"><p><br></p></td><td colspan="1" rowspan="1" _="Me2-G5tfwi4JpLwo" style="border: 1px dashed rgb(204, 204, 204);"><p><br></p></td><td colspan="1" rowspan="1" _="lEpHAmB0Xlvd-T7n" style="border: 1px dashed rgb(204, 204, 204);"><p><br></p></td><td colspan="1" rowspan="1" _="vctGGMwjP7uRNBD-" style="border: 1px dashed rgb(204, 204, 204);"><p><br></p></td><td colspan="1" rowspan="1" _="x1wF5P00qzMJxA93" style="border: 1px dashed rgb(204, 204, 204);"><p><br></p></td></tr><tr><td colspan="1" rowspan="1" _="7ZGrnaPr3q53XUtU" style="border: 1px dashed rgb(204, 204, 204);"><p><br></p></td><td colspan="1" rowspan="1" _="7Zs56alPbpt9kUpo" style="border: 1px dashed rgb(204, 204, 204);"><p><br></p></td><td colspan="1" rowspan="1" _="V0VAaUzKRkjod8O1" style="border: 1px dashed rgb(204, 204, 204);"><p><br></p></td><td colspan="1" rowspan="1" _="s6B2kGS9cUV1LiD1" style="border: 1px dashed rgb(204, 204, 204);"><p><br></p></td><td colspan="1" rowspan="1" _="Q2fZPXY0m6UIXhc0" style="border: 1px dashed rgb(204, 204, 204);"><p><br></p></td><td colspan="1" rowspan="1" _="Fzqh86fC-Fhym_Ky" style="border: 1px dashed rgb(204, 204, 204);"><p><br></p></td><td colspan="1" rowspan="1" _="FtUKt19AtMSDGSs6" style="border: 1px dashed rgb(204, 204, 204);"><p><br></p></td><td colspan="1" rowspan="1" _="XvMZfemyvUp7R6mV" style="border: 1px dashed rgb(204, 204, 204);"><p><br></p></td><td colspan="1" rowspan="1" _="Flky1yK2G05VWobQ" style="border: 1px dashed rgb(204, 204, 204);"><p><br></p></td></tr><tr><td colspan="1" rowspan="1" _="syy51qZAKCKsanph" style="border: 1px dashed rgb(204, 204, 204);"><p><br></p></td><td colspan="1" rowspan="1" _="NOytZvUEr2z__fkj" style="border: 1px dashed rgb(204, 204, 204);"><p><br></p></td><td colspan="1" rowspan="1" _="8H3bL2klAwMY56Sq" style="border: 1px dashed rgb(204, 204, 204);"><p><br></p></td><td colspan="1" rowspan="1" _="Juz-uEXm5EPiVMwo" style="border: 1px dashed rgb(204, 204, 204);"><p><br></p></td><td colspan="1" rowspan="1" _="iy694Xsa6dGE3ri1" style="border: 1px dashed rgb(204, 204, 204);"><p><br></p></td><td colspan="1" rowspan="1" _="zdr0Q2CwZ86oyR2F" style="border: 1px dashed rgb(204, 204, 204);"><p><br></p></td><td colspan="1" rowspan="1" _="uepk9d8Wd_yRpKt6" style="border: 1px dashed rgb(204, 204, 204);"><p><br></p></td><td colspan="1" rowspan="1" _="Cczt9PXjlvpcqkVz" style="border: 1px dashed rgb(204, 204, 204);"><p><br></p></td><td colspan="1" rowspan="1" _="magepA_JnQuWke2E" style="border: 1px dashed rgb(204, 204, 204);"><p><br></p></td></tr></tbody></table><p data-cache-id="9e4f6cdf-82bb-4430-89fa-3cbe3f608c19" _="A4MPM7x8OoORDnN0"><strong data-cache-id="f99a1da5-791f-4899-965a-c11052da6dfd" _="Vod6Ms0H1BsGJIvc">​</strong></p><p data-cache-id="9e4f6cdf-82bb-4430-89fa-3cbe3f608c19" _="KOksb6uzbXV1ClJb"><strong data-cache-id="f99a1da5-791f-4899-965a-c11052da6dfd" _="Vod6Ms0H1BsGJIvc"><br></strong></p><p data-cache-id="9e4f6cdf-82bb-4430-89fa-3cbe3f608c19" _="Z7U0z3HujCgLMz29"><strong data-cache-id="f99a1da5-791f-4899-965a-c11052da6dfd" _="Vod6Ms0H1BsGJIvc"><br></strong></p><p data-cache-id="9e4f6cdf-82bb-4430-89fa-3cbe3f608c19" _="0Kibg8uvUvHQ_jt1"><strong data-cache-id="f99a1da5-791f-4899-965a-c11052da6dfd" _="Vod6Ms0H1BsGJIvc"><br></strong></p><p data-cache-id="9e4f6cdf-82bb-4430-89fa-3cbe3f608c19" _="M81jgdVBAgBF8LmL"><strong data-cache-id="f99a1da5-791f-4899-965a-c11052da6dfd" _="Vod6Ms0H1BsGJIvc"><br></strong></p><p data-cache-id="9e4f6cdf-82bb-4430-89fa-3cbe3f608c19" _="7uTwl95SLu9Rmzyi"><strong data-cache-id="f99a1da5-791f-4899-965a-c11052da6dfd" _="Vod6Ms0H1BsGJIvc"><br><span class="bse-element disabled" bse-left="[" bse-right="]" bse="%7B%22bse_card%22%3A%22axios%22%2C%22bse_json_request%22%3A%7B%22bseTableObj%22%3A%7B%7D%2C%22bseFieldObj%22%3A%7B%7D%7D%2C%22type%22%3A%22select%22%2C%22name%22%3A%22%E5%90%8D%E5%AD%97%22%2C%22id%22%3A%22001%22%2C%22placeholder%22%3A%2223424%22%2C%22groupName%22%3A%22%E5%AD%A6%E7%94%9F%E8%80%83%E8%AF%95%22%2C%22disabledExpression%22%3A%22002%3D%E5%A5%B3%22%7D" contenteditable="false"><label contenteditable="false" class="placehold-class" placeholder="23424"></label></span>​<span class="bse-element" bse-left="[" bse-right="]" bse="%7B%22bse_card%22%3A%22fixed%22%2C%22bse_json_request%22%3A%7B%22bseTableObj%22%3A%7B%7D%2C%22bseFieldObj%22%3A%7B%7D%7D%2C%22type%22%3A%22radio%22%2C%22name%22%3A%22%E6%80%A7%E5%88%AB%22%2C%22value%22%3A%22%E5%A5%B3%22%2C%22bse_options%22%3A%5B%7B%22value%22%3A%22%E7%94%B7%22%7D%2C%7B%22value%22%3A%22%E5%A5%B3%22%7D%5D%2C%22id%22%3A%22002%22%2C%22groupName%22%3A%22%E5%AD%A6%E7%94%9F%E8%80%83%E8%AF%95%22%7D" contenteditable="false"><input type="radio" id="undefined男" value="男" name="性别" contenteditable="false"><label for="undefined男" contenteditable="false">男</label><input type="radio" id="undefined女" value="女" name="性别" contenteditable="false" checked=""><label for="undefined女" contenteditable="false">女</label>​⁮</span>​</strong></p><p data-cache-id="9e4f6cdf-82bb-4430-89fa-3cbe3f608c19" _="W2J3hEBdzDwPbOmc"><strong data-cache-id="f99a1da5-791f-4899-965a-c11052da6dfd" _="Vod6Ms0H1BsGJIvc"><br></strong></p><p data-cache-id="9e4f6cdf-82bb-4430-89fa-3cbe3f608c19" _="UwzIBmc8WyxYvb3Q"><strong data-cache-id="f99a1da5-791f-4899-965a-c11052da6dfd" _="Vod6Ms0H1BsGJIvc"><br></strong></p><table id="bs0z1uov023s92304" class="bse-table" cellspacing="1" data-cache-id="3e160eb5-a2df-467d-b5cc-1b6aab628c74" _="7ivYUuLZa9c9sXbl" data-resize-id="eAEcJpdY" bse_selected="master" style="width: 100%;"><colgroup _="UitAaEGkjD-PwvAc"><col style="width: 20.2346%;"><col style="width: 48.0939%;"><col style="width: 31.6715%;"></colgroup><tbody _="BcRUUTMM-qxpAT3-"><tr data-cache-id="9c66b21e-1147-47ac-a9f2-3275568a0d3c" _="Y1ZwBprJ3LRIaKJb"><td colspan="1" rowspan="1" style="border: 1px dashed rgb(204, 204, 204); word-break: break-all; vertical-align: middle;" data-cache-id="6ea72c20-faed-422c-835f-c0ac417b43b2" valign="middle" align="center" _="7RC5NELhoYuV-sqx" data-old-row-span="3"><p><br></p></td><td colspan="1" rowspan="1" style="border: 1px dashed rgb(204, 204, 204); word-break: break-all; height: 42px; vertical-align: middle;" data-cache-id="1b216996-d3c0-4a2e-a9d9-670da90f4aa4" valign="middle" align="center" _="2tM_ownYiDDor2va"><p data-cache-id="3539d86c-eec8-4813-af48-e1189557efdd" _="Gc9lU_f6LbTlXz-z">失调及不平衡&nbsp; &nbsp;20分​</p></td><td colspan="1" rowspan="1" style="border: 1px dashed rgb(204, 204, 204); word-break: break-all; vertical-align: middle;" data-cache-id="6ae50f37-1785-4b88-9eb9-4512300368f5" valign="middle" align="center" _="NYTXR6DLasDkk7jr" data-old-row-span="3"><p><br></p></td></tr><tr data-cache-id="fee2ee9c-9a0f-4c86-8435-438bbb835e10" _="wTmx2jEkd9UsXu6U"><td colspan="1" rowspan="3" style="border: 1px dashed rgb(204, 204, 204); word-break: break-all; vertical-align: middle;" valign="middle" align="center" data-cache-id="96c45350-4977-4a77-9b49-02daeedac215" _="g538Ns_pU-kISi2N" data-old-row-span="2"><p><br></p><p _="C937NkDfzz5b7xjH"><br></p><p data-cache-id="42544638-3d9b-4f9e-a856-221a2a002310" _="709eW9Y3NfIgmg2i">精神状态</p></td><td colspan="1" rowspan="1" style="border: 1px dashed rgb(204, 204, 204); word-break: break-all; vertical-align: middle; height: 41.75px;" data-cache-id="fe760865-7efb-4ee3-b8f8-e782af45a5e9" valign="middle" align="center" _="9iMdLSd-VEVMnXtT"><p data-cache-id="515cd84d-4d2d-4ad0-b566-202bead139c0" _="_45GDvjb6DgrWWry">了解自己能力&nbsp; &nbsp;0分​</p></td><td colspan="1" rowspan="3" style="border: 1px dashed rgb(204, 204, 204); word-break: break-all; vertical-align: middle;" valign="middle" align="center" data-cache-id="9985a7aa-44d4-4a10-9feb-448feb62ca26" _="JdjL2oAZssp5bUBn" data-old-row-span="2"><p><br></p><p _="YKpp0_xoS8bjs4Gu"><br></p><p data-cache-id="b543ffd9-8977-4636-9816-a930b95b1134" _="tDFua9tg6Jiz2GES"><span class="bse-element" bse-left="[" bse-right="]" bse="%7B%22bse_card%22%3A%22fixed%22%2C%22bse_json_request%22%3A%7B%22bseTableObj%22%3A%7B%7D%2C%22bseFieldObj%22%3A%7B%7D%7D%2C%22type%22%3A%22select%22%2C%22name%22%3A%22%E7%B2%BE%E7%A5%9E%E7%8A%B6%E6%80%81%22%2C%22id%22%3A%22%E7%B2%BE%E7%A5%9E%E7%8A%B6%E6%80%81%22%2C%22placeholder%22%3A%22%E7%B2%BE%E7%A5%9E%E7%8A%B6%E6%80%81%22%2C%22value%22%3A%22%22%2C%22bse_options%22%3A%5B%7B%22value%22%3A%22%E4%BA%86%E8%A7%A3%E8%87%AA%E5%B7%B1%E8%83%BD%E5%8A%9B%22%7D%2C%7B%22value%22%3A%22%E5%BF%98%E8%AE%B0%E8%87%AA%E5%B7%B1%E9%99%90%E5%88%B6%22%7D%5D%2C%22groupName%22%3A%22%E6%88%90%E4%BA%BA%E8%B7%8C%E5%80%92%E9%A3%8E%E9%99%A9%22%2C%22settleExpression%22%3A%22%E4%BA%86%E8%A7%A3%E8%87%AA%E5%B7%B1%E8%83%BD%E5%8A%9B%3D0%2C%E5%BF%98%E8%AE%B0%E8%87%AA%E5%B7%B1%E9%99%90%E5%88%B6%3D15%22%7D" contenteditable="false" data-cache-id="35e08492-f7dc-4ea9-a1ae-898e7656802e" _="9hBdI8C8epXzWiYB"><label contenteditable="false" class="placehold-class" placeholder="精神状态" data-cache-id="57a7d73c-9ad0-4400-bfea-760aa6874905" _="MZ4zYqgtgSoUN24C"></label></span>​</p></td></tr><tr data-cache-id="b2be7c60-afa0-418c-9633-37a5b48b4545" _="HgXQhp23DSP9mWUW"><td colspan="1" rowspan="1" style="border: 1px dashed rgb(204, 204, 204); word-break: break-all; vertical-align: middle; height: 40.9688px;" data-cache-id="28ea5a3b-a9c5-4f9b-9681-eef07d3eab88" valign="middle" align="center" _="MVHDYV_nHSzSnwDD"><p data-cache-id="bb22cb40-7387-4253-aa24-1bd457d2df9c" _="_IdQTMj7II4ZPsRD">忘记自己限制&nbsp; &nbsp;15分​</p></td></tr><tr data-cache-id="1bc1301e-3667-4573-ae53-c59374a71816" _="JncoV4AynsmVEAjJ"><td colspan="1" rowspan="1" style="border: 1px dashed rgb(204, 204, 204); word-break: break-all; vertical-align: middle; height: 30.5px;" data-cache-id="6689663b-b1b7-42b6-a93f-b1a9394b6f31" valign="middle" align="center" _="N8Zgtk0YapsCbqM_"><p data-cache-id="b80491cb-4762-4fa7-8284-4ebecdda0855" _="1lgcLtncRs4XUvC-">总分</p></td><td colspan="2" rowspan="1" style="border: 1px dashed rgb(204, 204, 204); word-break: break-all; height: 30.5px;" data-cache-id="68c0326c-c450-4d86-8147-b592a501015b" _="4SvozJZ5o0PqMkRn"><p data-cache-id="6353ce10-6ad3-4b2c-a7ad-52d0a2a8e12d" _="Qtxjcq3LuriUk8l5"><span class="bse-element" bse-left="[" bse-right="]" bse="%7B%22type%22%3A%22input%22%2C%22name%22%3A%22%E6%82%A3%E8%80%85%E8%B7%8C%E5%80%92%E9%A3%8E%E9%99%A9%22%2C%22id%22%3A%22%E6%82%A3%E8%80%85%E8%B7%8C%E5%80%92%E9%A3%8E%E9%99%A9%22%2C%22altTitle%22%3A%22%22%2C%22groupName%22%3A%22%E6%88%90%E4%BA%BA%E8%B7%8C%E5%80%92%E9%A3%8E%E9%99%A9%22%2C%22settleExpression%22%3A%22%E6%82%A3%E8%80%85%E6%9B%BE%E8%B7%8C%E5%80%92%2B%E8%B6%85%E8%BF%87%E4%B8%80%E4%B8%AA%E5%8C%BB%E5%AD%A6%E8%AF%8A%E6%96%AD%2B%E4%BD%BF%E7%94%A8%E5%8A%A9%E8%A1%8C%E5%99%A8%E5%85%B7%2B%E9%9D%99%E8%84%89%E8%BE%93%E6%B6%B2%2B%E6%AD%A5%E6%80%81%2B%E7%B2%BE%E7%A5%9E%E7%8A%B6%E6%80%81%2B%E5%88%86%22%2C%22placeholder%22%3A%22%E6%82%A3%E8%80%85%E8%B7%8C%E5%80%92%E9%A3%8E%E9%99%A9%22%7D" contenteditable="false" data-cache-id="84d71841-e0e2-4074-81a2-c61afc910472" _="3q2hP2WjYZwWxZZL"><label contenteditable="true" class="placehold-class" placeholder="患者跌倒风险">
			  患者曾跌倒超过一个医学诊断使用助行器具静脉输液步态0分
			</label></span>​</p></td></tr><tr data-cache-id="1e9cff3b-59e9-4beb-910a-3418281b1fd5" _="1m3-oNMJGMQQ8i_X"><td colspan="1" rowspan="1" style="border: 1px dashed rgb(204, 204, 204); word-break: break-all; vertical-align: middle; height: 78.9688px;" data-cache-id="e8ed439f-6094-4bd2-b092-46fea71a7fad" valign="middle" align="center" _="lLKftLkmtT_j4bje"><p _="IsdPA20GfA7ibqGw"><br></p><p data-cache-id="7f6ecfd0-2cd4-4185-87bd-4bc8c40011cb" _="4XHdIg8lAtgsY4FI">结果解读</p><p _="jiCBKm9qUg-Io1Xa"><br></p></td><td colspan="2" rowspan="1" style="border: 1px dashed rgb(204, 204, 204); word-break: break-all; height: 78.9688px;" data-cache-id="7769958e-52cc-4b72-9245-cb1ebb1e848c" _="JbyWxmqt7_q4JZQx"><p _="5D88frIp2aK5N6E0"><br></p><p data-cache-id="23d8164c-8427-486b-aac9-e27f0d830caa" _="pTDXsZmGSB7SXNpW">&lt;25分 低风险</p><p data-cache-id="23d8164c-8427-486b-aac9-e27f0d830caa" _="u45-dT2cZrLC9JWU">20-45分 中风险</p><p data-cache-id="23d8164c-8427-486b-aac9-e27f0d830caa" _="0lJD1aPaX04HUUX3">≥&nbsp;45分 高风险</p></td></tr></tbody></table><p data-cache-id="ddd102c3-7dd0-4807-9e96-24a77082eb74" _="gKe-TzCMBEDULDqO"><br data-cache-id="1fb7da94-f67a-410d-9454-04d594741309"></p><p _="rELVgoJRShHr0fW_"><br></p><p _="hbJeHSTzsBEAI-Dd"><br></p><p _="jKGCaPQVDmVEcaq_"><br></p>
		</html>
		</data>
		</xml>`

      this._instance.execCommand(
        'insertxmlorhtmlmodulestring',
        { contentXmlOrHtmlString: strings, paper: 'A6' },
        payload => {
          console.log(payload)
        }
      )
    },

    // 获取xml或html字符串
    getXmlorhtmlString() {
      this._instance.execCommand(
        'getexportxmlorhtmlstring',
        { version: '4.0', htmlstring: true }, // 定义数据版本号
        payload => {
          console.log(payload)
        }
      )
    },

    // 插入段落元素
    handlerChangeSection() {
      const strings = `<p _="9SdoZKx8hvJ-ONWo">​</p><p _="Ou5Sj_wf4WcPPIJi">​手术名称<span class="bse-element" bse-left="[" bse-right="]" contenteditable="false" bse="%7B%22bse_surgeryList%22%3A%5B%7B%22id%22%3A%220%22%2C%22type%22%3A%22%E7%B1%BB%E5%9E%8B%22%2C%22code%22%3A%22%E6%89%8B%E6%9C%AF%E7%BC%96%E7%A0%8101%22%2C%22name%22%3A%22%E7%AC%AC%E4%B8%80%E5%8F%B0%E6%89%8B%E6%9C%AF111%22%2C%22date%22%3A%222016-05-04%22%2C%22surgeryLevel%22%3A%22%E6%89%8B%E6%9C%AF%E7%AD%89%E7%BA%A7%22%2C%22doctor%22%3A%22%E6%9C%AF%E8%80%85%22%2C%22firstAssistant%22%3A%22%E4%B8%80%E5%8A%A9%22%2C%22secondAssistant%22%3A%22%E4%BA%8C%E5%8A%A9%22%2C%22incisionLevel%22%3A%22%E5%88%87%E5%8F%A3%E7%AD%89%E7%BA%A7%22%2C%22healingLevel%22%3A%22%E6%84%88%E5%90%88%E7%AD%89%E7%BA%A7%22%2C%22anesthesia%22%3A%22%E9%BA%BB%E9%86%89%E6%96%B9%E6%B3%95%22%2C%22anesthesiologist%22%3A%22%E9%BA%BB%E9%86%89%E5%8C%BB%E5%B8%88%22%7D%5D%2C%22type%22%3A%22surgery%22%2C%22name%22%3A%22%E6%89%8B%E6%9C%AF%E6%8E%A7%E4%BB%B6id%22%2C%22id%22%3A%22%E6%89%8B%E6%9C%AF%E6%8E%A7%E4%BB%B6id%22%2C%22fieldName%22%3A%22name%22%2C%22elSrc%22%3A%7B%7D%7D"><label contenteditable="true" class="placehold-class" placeholder="">
                    第一台手术111
                  </label></span>​<br></p><p _="VYhnOtnoxpn7GFcQ">手术编码<span class="bse-element" bse-left="[" bse-right="]" contenteditable="false" bse="%7B%22type%22%3A%22surgery%22%2C%22fieldName%22%3A%22code%22%2C%22name%22%3A%22%E6%89%8B%E6%9C%AF%E6%8E%A7%E4%BB%B6id%22%2C%22id%22%3A%22%E6%89%8B%E6%9C%AF%E6%8E%A7%E4%BB%B6id%22%2C%22bse_surgeryList%22%3A%5B%7B%22id%22%3A%220%22%2C%22type%22%3A%22%E7%B1%BB%E5%9E%8B%22%2C%22code%22%3A%22%E6%89%8B%E6%9C%AF%E7%BC%96%E7%A0%8101%22%2C%22name%22%3A%22%E7%AC%AC%E4%B8%80%E5%8F%B0%E6%89%8B%E6%9C%AF%22%2C%22date%22%3A%222016-05-04%22%2C%22surgeryLevel%22%3A%22%E6%89%8B%E6%9C%AF%E7%AD%89%E7%BA%A7%22%2C%22doctor%22%3A%22%E6%9C%AF%E8%80%85%22%2C%22firstAssistant%22%3A%22%E4%B8%80%E5%8A%A9%22%2C%22secondAssistant%22%3A%22%E4%BA%8C%E5%8A%A9%22%2C%22incisionLevel%22%3A%22%E5%88%87%E5%8F%A3%E7%AD%89%E7%BA%A7%22%2C%22healingLevel%22%3A%22%E6%84%88%E5%90%88%E7%AD%89%E7%BA%A7%22%2C%22anesthesia%22%3A%22%E9%BA%BB%E9%86%89%E6%96%B9%E6%B3%95%22%2C%22anesthesiologist%22%3A%22%E9%BA%BB%E9%86%89%E5%8C%BB%E5%B8%88%22%7D%5D%7D"><label style="display: inline-block;" contenteditable="true" class="placehold-class" placeholder="">手术编码01</label></span>​</p><p _="B0eJoJz9js1DRKU-">​手术类型<span class="bse-element" bse-left="[" bse-right="]" contenteditable="false" bse="%7B%22type%22%3A%22surgery%22%2C%22name%22%3A%22%E6%89%8B%E6%9C%AF%E6%8E%A7%E4%BB%B6id%22%2C%22id%22%3A%22%E6%89%8B%E6%9C%AF%E6%8E%A7%E4%BB%B6id%22%2C%22fieldName%22%3A%22type%22%7D"><label style="display: inline-block;" contenteditable="true" class="placehold-class" placeholder=""></label></span>​</p><br><p _="VfdNVdLil0u6UWv6"></p>
                  
                  
                  `

      this._instance.execCommand(
        'inserthtmlorxmlstringbyparams',
        {
          初步诊断元素: [
            {
              id: 1,
              parentId: 0,
              bse_code: 1,
              bse_type: '中医诊断',
              bse_categery: '入院诊断',
              bse_disease_name: '肾虚',
              bse_disease_name_desc: '病描述',
              bse_symptom_name: '症名',
              bse_symptom_name_desc: '症描述',
              bse_diagnose_name: '',
              bse_diagnose_name_desc: '',
              open: true,
              checked: true
            },
            {
              id: 11,
              parentId: 1,
              bse_code: 12,
              bse_type: '中医诊断',
              bse_categery: '入院诊断',
              bse_disease_name: '子病',
              bse_disease_name_desc: '病描述',
              bse_symptom_name: '一期症名',
              bse_symptom_name_desc: '症描述',
              bse_diagnose_name: '',
              bse_diagnose_name_desc: '',
              open: true,
              checked: true
            },
            {
              id: 111,
              parentId: 11,
              bse_code: 123,
              bse_type: '中医诊断',
              bse_categery: '入院诊断',
              bse_disease_name: '子子病',
              bse_disease_name_desc: '病描述',
              bse_symptom_name: '二期症名',
              bse_symptom_name_desc: '症描述',
              bse_diagnose_name: '',
              bse_diagnose_name_desc: '',
              open: true,
              checked: true
            }
          ],
          年龄元素: 28,
          姓名元素: '苏苏苏'
        },
        {
          contentXmlOrHtmlString: strings,
          paper: 'A4',
          pagesizes: {
            w: 210, // 整个宽
            h: 697, // 整个高
            pt: 20, // 页边距 上
            pb: 15, // 页边距 下
            pl: 15, // 页边距 左
            pr: 15, // 页边距 右
            hh: 6.6, // 页眉
            fh: 14 // 页脚
          }
        },
        payload => {
          console.log(payload)
        }
      )
    },

    // 切换编辑器模式
    switchEditorMode(name) {
      this._instance.execCommand(
        'mode',
        name, // 定义编辑器模式
        payload => {
          console.log(payload)
        }
      )
    },
    switchEditorModePaper(name) {
      this._instance.execCommand(
        'paper',
        { paper: name }, // 定义编辑器模式
        payload => {
          console.log(payload)
        }
      )
    },

    // 更新数据内容
    updateApiDate() {
      this._instance.execCommand(
        'updatedocumentbyparams',
        {
          'h1': '苏苏苏',
          'h2': 28
        },
        payload => {
          console.log(payload)
        }
      )
    }
  }
}
</script>

<style scoped>
.bse-wrap {
  display: flex;
}
.bse-wrap .left-wrap,
.bse-wrap .right-wrap {
  width: 20%;
  display: flex;
  flex-direction: column;
}
.bse-wrap .center-wrap {
  flex: 1;
}
.bse-wrap .right-wrap .right-top,
.bse-wrap .right-wrap .right-bottom,
.bse-wrap .left-wrap .left-top {
  flex: 1;
}
ul {
  background: white;
}
ul li {
  border-bottom: 1px solid #efefef;
  line-height: 40px;
  padding: 0 20px;
  cursor: pointer;
}
.input-with-select {
  margin: 20px 0;
}
/deep/ .el-tabs__content,
/deep/ .el-tab-pane {
  height: 500px;
}
</style>

