/**
 * @Description: 医疗表达式配置
 * @Author bianpengfei
 * @create 2022/5/9 21:31
 */
// import ToothLabelContent from '@bse/element/components/ToothLabelContent.vue'
// import ToothLabelPreview from '@bse/element/components/ToothLabelPreview.vue'
// import MenHistoryContent from '@bse/element/components/MenHistoryContent.vue'
// import MenHistoryPreview from '@bse/element/components/MenHistoryPreview.vue'
// import HeartPositionContent from '@bse/element/components/HeartPositionContent.vue'
// import HeartPositionPreview from '@bse/element/components/HeartPositionPreview.vue'
// import PriTeethLabelContent from '@bse/element/components/PriTeethLabelContent.vue'
// import PriTeethLabelPreview from '@bse/element/components/PriTeethLabelPreview.vue'
// import ProEyesContent from '@bse/element/components/ProEyesContent.vue'
// import ProEyesPreview from '@bse/element/components/ProEyesPreview.vue'
// import OptPositionContent from '@bse/element/components/OptPositionContent.vue'
// import OptPositionPreview from '@bse/element/components/OptPositionPreview.vue'
// import HouseCornerContent from '@bse/element/components/HouseCornerContent.vue'
// import HouseCornerPreview from '@bse/element/components/HouseCornerPreview.vue'
// import PulTuberContent from '@bse/element/components/PulTuberContent.vue'
// import PulTuberPreview from '@bse/element/components/PulTuberPreview.vue'
import { trimSpace } from '@bse/utils'

// /**
//  * 医疗表达式配置
//  * @type {[{label: string, value: string, previewComponent: {data(): {R2: [], L1: [], L2: [], R1: []}, computed: {_RMax(): *, _LMax(): *}}, contentComponent: {data(): {R2: [], L1: [], L2: [], R1: []}, methods: {onChoose(*=, *, *, *): void, emitEvent(): void}, name: string, mounted(): void}},{label: string, value: string, previewComponent: {data(): {B2: string, S: string, V: string, T1: string, M: string, T2: string, B1: string}}, contentComponent: {data(): {B2: string, unknownChecked: boolean, S: string, dateChecked: boolean, V: string, V1: string, V2: string, T1: string, M: string, fixedChecked: boolean, T2: string, B1: string}, watch: {unknownChecked(*): void, dateChecked(*): void, fixedChecked(*): void}, methods: {onChange(): void, emitEvent(): void}, mounted(): void, updated(): void}},{label: string, value: string, previewComponent: {data(): {R2: number, C: number, L1: number, L2: number, R1: number}, computed: {}}, contentComponent: {data(): {R2: number, C: number, L1: number, L2: number, R1: number}, methods: {onChange(*): void, emitChange(): void}, mounted(): void}},{label: string, value: string, previewComponent: {data(): {R: number, D: number, L: number}, methods: {}}, contentComponent: {data(): {R: string, D: string, L: string}, methods: {onChange(*, *): void, emitEvent(): void}, mounted(): void}},{label: string, value: string, previewComponent: {data(): {R2: [], L1: [], L2: [], R1: []}, computed: {_RMax(): *, _LMax(): *}, inject: [string]}, contentComponent: {data(): {R2: [], L0: boolean, L1: [], L2: [], options: {R2: string[], L1: string[], L2: string[], R1: string[]}, R0: boolean, R1: []}, methods: {onChange(*=, *, *, *): void, emitEvent(): void}, mounted(): void}},null,null,null]}
//  */
// export const ME_TABS = [
//   {
//     value: 'tooth-labeling',
//     label: '牙齿标注',
//     contentComponent: ToothLabelContent,
//     previewComponent: ToothLabelPreview
//   },
//   {
//     value: 'men-history',
//     label: '月经史',
//     contentComponent: MenHistoryContent,
//     previewComponent: MenHistoryPreview
//   },
//   {
//     value: 'heart-position',
//     label: '胎心位置',
//     contentComponent: HeartPositionContent,
//     previewComponent: HeartPositionPreview
//   },
//   {
//     value: 'pro-eyes',
//     label: '突眼',
//     contentComponent: ProEyesContent,
//     previewComponent: ProEyesPreview
//   },
//   {
//     value: 'pri-teeth-label',
//     label: '乳牙标注',
//     contentComponent: PriTeethLabelContent,
//     previewComponent: PriTeethLabelPreview
//   },

//   {
//     value: 'opt-position',
//     label: '光定位',
//     contentComponent: OptPositionContent,
//     previewComponent: OptPositionPreview
//   },
//   { value: 'house-corner', label: '房角', contentComponent: HouseCornerContent, previewComponent: HouseCornerPreview },
//   { value: 'pul-tuber', label: '肺结核', contentComponent: PulTuberContent, previewComponent: PulTuberPreview }
// ]

/**
 * 基础元素
 * @type {*[]}
 */
export const BASIC_ELEMENT = [
  {
    value: 'radio',
    label: '单选框'
  },
  {
    value: 'checkbox',
    label: '多选框'
  },
  {
    value: 'date',
    label: '日期'
  },
  {
    value: 'input',
    label: '输入框'
  },
  {
    value: 'select',
    label: '下拉框'
  },
  {
    value: 'label',
    label: '标签'
  },
  {
    value: 'number',
    label: '数字'
  },
  {
    value: 'splitline',
    label: '分割线'
  },
  {
    value: 'pagebreak',
    label: '分页'
  },
  {
    value: 'diagnose',
    label: '诊断'
  },
  {
    value: 'surgery',
    label: '手术'
  },
  {
    value: 'sign',
    label: '签名'
  },
  {
    value: 'bloodPressure',
    label: '血压'
  }
]

function dateFormat(fmt, date) {
  date = new Date(date)
  let ret
  const opt = {
    'y+': date.getFullYear().toString(), // 年
    'M+': (date.getMonth() + 1).toString(), // 月
    'd+': date.getDate().toString(), // 日
    'H+': date.getHours().toString(), // 时
    'm+': date.getMinutes().toString(), // 分
    's+': date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  }
  for (let k in opt) {
    ret = new RegExp('(' + k + ')').exec(fmt)
    if (ret) {
      fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, '0'))
    }
  }
  return fmt
}

// 业务元素映射
export const serviceElementsMap = proto => {
  console.log(proto)
  const { type } = proto
  const rest = encodeURIComponent(JSON.stringify(proto))
  const htmlStr = {
    radio: () => `<span class="bse-element" bse-left="[" bse-right="]" bse='${rest}' contenteditable="false">
        <label contenteditable="true">
          ${
            proto.bse_options &&
            proto.bse_options
              .map(opt => {
                return `<input type="radio" id="${proto.id}${opt.value}" value="${opt.value}" name="${
                  proto.name
                }" contenteditable="false" ${proto.value == opt.value ? 'checked="checked"' : ''}></input><label for="${
                  proto.id
                }${opt.value}" contenteditable="false">${opt.value}</label>`
              })
              .join('')
          }
        </label>
      </span>`,
    checkbox: () => `<span class="bse-element" bse-left="[" bse-right="]" bse='${rest}' contenteditable="false">
        <label contenteditable="true">
          ${
            proto.bse_options &&
            proto.bse_options
              .map(opt => {
                return `<input type="checkbox" id="${proto.id}${opt.value}" value="${opt.value}" name="${proto.name}" ${
                  proto.value.includes(opt.value) ? 'checked="checked"' : ''
                } contenteditable="false"></input><label for="${proto.id}${opt.value}" contenteditable="false">${
                  opt.value
                }</label>`
              })
              .join('')
          }
        </label>
      </span>`,
    date: () => `<span class="bse-element" bse-left="[" bse-right="]" bse='${rest}' contenteditable="false">
      <label contenteditable="false" class="placehold-class" placeholder="${proto.placeholder || ''}">${
      typeof proto.value != 'undefined' ? dateFormat(proto.dateformat, proto.value) : ''
    }</label>
    </span>`,
    input: () => `<span class="bse-element" bse-left="[" bse-right="]" bse='${rest}' contenteditable="false">
        <label contenteditable="true" class="placehold-class" placeholder="${proto.placeholder || ''}">${
      typeof proto.value != 'undefined' ? proto.value : ''
    }</label>
       </span>`,
    select: () => `<span class="bse-element" bse-left="[" bse-right="]" bse='${rest}' contenteditable="false">
      <label contenteditable="false" class="placehold-class" placeholder="${proto.placeholder || ''}">${
      typeof proto.value != 'undefined' ? proto.value : ''
    }</label>
    </span>`,
    // bse-left="‹" bse-right="›"
    label: () => `<span class="bse-element" bse-left="" bse-right="" style="font-weight: bold" bse='${rest}' contenteditable="false">
        <label contenteditable="true" class="placehold-class" placeholder="${proto.placeholder || ''}">${
      typeof proto.value != 'undefined' ? proto.value : ''
    }</label>
    </span>`,
    number: () => `<span class="bse-element" bse-left="[" bse-right="]" bse='${rest}' contenteditable="false">
        <label contenteditable="true" class="placehold-class" placeholder="${proto.placeholder || ''}">${
      typeof proto.value != 'undefined' ? proto.value : ''
    }</label>
    </span>`,
    splitline: () => `<hr class="splitline"></hr>`,
    pagebreak: () => `<div class="no-print pageline"></div><div class="page-next"></div>`,
    diagnose: () => `<span class="bse-element" bse-left="[" bse-right="]" contenteditable="false" style="display:inline-flex;" bse='${rest}'>
    <label style="display: inline-block;vertical-align: text-top;list-style: none;" class="placehold-class" placeholder="${
      proto.placeholder || ''
    }" contenteditable="true"></label>
    </span>`,
    surgery: () => `<span class="bse-element" bse-left="[" bse-right="]" contenteditable="false" bse='${rest}'>
    <label style="display: inline-block;" contenteditable="true" class="placehold-class" placeholder="${
      proto.placeholder || ''
    }"></label>
    </span>`,
    sign: () => {
      return `<span class="bse-element" style="display: inline-block;" bse-left="[" bse-right="]" bse='${rest}'>
        <text style="display: inline-block;vertical-align: text-top;">
          <text style="display: block;">
          ${proto.signLabel ? `<text contenteditable="false">${proto.signLabel}</text>` : ''}
          <label contenteditable="false">
            <label contenteditable="true" class="sign placehold-class" placeholder="${proto.signplaceholder || ''}"></label>
          </label>
          </text>
          ${
            proto.isShowDate
              ? `<text style="display: block;">
            ${proto.dateLabel ? `<text contenteditable="false">${proto.dateLabel}</text>` : ''}
            <label contenteditable="false">
              <label contenteditable="true" class="date placehold-class" placeholder="${
                proto.dateplaceholder || ''
              }"></label>
            </label>
          </text>`
              : ''
          }
        </text>  
      </span>`
    },
    bloodPressure: () => `<span class="bse-element" bse-left="[" bse-right="]" bse='${rest}' contenteditable="false">
        <label contenteditable="true" id="extensional${proto.id}" class="placehold-class extensional" placeholder="${proto.leftPlaceholder || ''}"></label>
        /
        <label contenteditable="true" id="diastolic${proto.id}" class="placehold-class diastolic" placeholder="${proto.rightPlaceholder || ''}"></label>
       </span>`
  }
  return htmlStr[type] ? trimSpace(htmlStr[type]()) : null
}
