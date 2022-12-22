<template>
  <el-form
    label-width="80px"
    :model="formInline"
    :rules="rules"
    ref="attributeForm"
    :inline="true"
  >
    <el-form-item label="名称" class="form-item" prop="name">
      <el-input
        class="input-item"
        v-model="formInline.name"
        placeholder="请输入名称"
      ></el-input>
    </el-form-item>
    <el-form-item label="编码" class="form-item" prop="id">
      <el-input
        class="input-item"
        v-model="formInline.id"
        placeholder="请输入编码"
      ></el-input>
    </el-form-item>
    <el-form-item label="绑定值" class="form-item">
      <el-cascader
        class="input-item"
        v-model="formInline.bind"
        :options="bindOptions"
        clearable
      >
      </el-cascader>
    </el-form-item>
    <el-form-item label="水印" class="form-item">
      <el-input
        class="input-item"
        v-model="formInline.placeholder"
        placeholder="请输入水印"
      ></el-input>
    </el-form-item>
    <el-form-item label="更新方式" class="form-item">
      <el-select
        v-model="formInline.forceUpdateWay"
        class="input-item"
        placeholder="请选择更新方式"
        @change="$forceUpdate()"
        popper-class="bse-select-dropdown"
        clearable
      >
        <el-option label="不更新" value="noUpdate"></el-option
        ><el-option label="强制下载" value="forceUpdate"></el-option>
        <el-option label="元素空值则下载" value="eleEmpty"></el-option>
        <el-option label="元素非空值则下载" value="eleNonempty"></el-option>
        <el-option label="源空值则下载" value="eleSourceEmpty"></el-option>
        <el-option label="源非空值则下载" value="eleSourceNonempty"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="默认值" class="form-item">
      <el-input
        class="input-item"
        v-model="formInline.value"
        placeholder="请输入默认值"
      ></el-input>
    </el-form-item>
    <el-form-item label="提示信息" class="form-fullitem">
      <el-input
        class="input-item"
        v-model="formInline.altTitle"
        placeholder="请输入提示信息"
      ></el-input>
    </el-form-item>
    <el-form-item label="行为属性" class="form-item">
      <el-checkbox
        v-model="notallowdeleteChecked"
        :true-label="1"
        :false-label="0"
        @change="(val) => (formInline.notallowdelete = val == 0 ? false : true)"
        label="不允许删除"
      ></el-checkbox>
    </el-form-item>
    <el-form-item label=" " class="form-item">
      <el-checkbox
        v-model="contenteditableChecked"
        :true-label="1"
        :false-label="0"
        @change="
          (val) => (formInline.contenteditable = val == 0 ? true : false)
        "
        label="只读"
      ></el-checkbox>
    </el-form-item>
    <el-form-item label="最小值" class="form-item">
      <el-input
        class="input-item"
        v-model="formInline.minValue"
        placeholder="请输入最小值"
      ></el-input>
    </el-form-item>
    <el-form-item label="最大值" class="form-item">
      <el-input
        class="input-item"
        v-model="formInline.maxValue"
        placeholder="请输入最大值"
      ></el-input>
    </el-form-item>
    <el-form-item label="数字类型" class="form-item">
      <el-select
        class="input-item"
        v-model="formInline.datatype"
        popper-class="bse-select-dropdown"
        placeholder="选择数字类型"
      >
        <el-option label="整数" value="inter"></el-option>
        <el-option label="小数" value="float"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="小数位数" class="form-item">
      <el-input-number
        class="input-item"
        :disabled="formInline.datatype !== 'float'"
        v-model="formInline.floatNumer"
        :min="0"
        placeholder="请输入保留几位小数"
      ></el-input-number>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  inject: ["getEditor"],
  data() {
    return {
      formInline: {
        forceUpdateWay: "",
      },
      activeRow: {}, // 当前活动行数据
      rules: {
        name: { required: true, message: "请输入名称", trigger: "blur" },
        id: { required: true, message: "请输入编码", trigger: "blur" },
      },
      notallowdeleteChecked: null,
      contenteditableChecked: null,
      bindOptions: [],
      cascaderPropsMap: {
        _children: "children",
        _parentId: "parentId",
        _order: "order",
        _id: "id",
        _level: "level",
      },
    };
  },
  watch: {
    data: {
      handler(newValue) {
        this.$nextTick(() => {
          Object.prototype.toString.call(this.data) === "[object Object]" &&
            (this.formInline = { ...this.formInline, ...newValue });
          this.notallowdeleteChecked = this.formInline.notallowdelete ? 1 : 0;
          this.contenteditableChecked =
            this.formInline.contenteditable === false ? 1 : 0;
          this.$refs.attributeForm.resetFields();
          this.$refs.attributeForm.clearValidate();
        });
      },
      immediate: true,
    },
  },
  mounted() {
    this._instanceOpt = this.getEditor().getOptions();
    this._instanceOpt.requestCascaderBindOptions((param) => {
      // 获取级联选择数据
      this.bindOptions = this.arrToTree(param, this.cascaderPropsMap);
    }, this.formInline);
  },
  methods: {
    // 数组转成树型数据
    arrToTree(operateArr, props) {
      const __id = props["_id"] || "_id",
        __parentId = props["_parentId"] || "_parentId",
        __level = props["_level"] || "_level",
        __order = props["_order"] || "_order",
        __children = props["_children"] || "_children",
        __path = props["_path"] || "_path";
      let treeData = [],
        surplus = [];
      operateArr.forEach((ele) => {
        const some = operateArr.some((el) => ele[__parentId] == el[__id]);
        if (some) {
          surplus.push(ele);
        } else {
          const itemLevel = (listlevel, level, path) => {
            listlevel.forEach((li, inx) => {
              li[__level] = level;
              li[__order] = inx;
              li[__path] = path + "/" + inx;
              if (li[__children] && li[__children].length) {
                itemLevel(li[__children], level + 1, li[__path]);
              }
            });
          };
          ele[__children] &&
            ele[__children].length &&
            itemLevel(ele[__children], 2, String(treeData.length));
          treeData.push({
            ...ele,
            [__order]: treeData.length,
            [__path]: String(treeData.length),
            [__level]: 0,
          });
        }
      });
      const findItem = (treeDataTree, sur, level) => {
        for (let tree of treeDataTree) {
          if (tree[__id] == sur[__parentId]) {
            tree[__children]
              ? tree[__children].push({
                  ...sur,
                  [__order]: tree[__children].length,
                  [__path]: tree._path + "/" + tree[__children].length,
                  [__level]: level,
                })
              : (tree[__children] = [
                  {
                    ...sur,
                    [__order]: 0,
                    [__path]: tree[__path] + "/" + 0,
                    [__level]: level,
                  },
                ]);
            return tree;
          }
          if (tree[__children] && tree[__children].length) {
            const find = findItem(tree[__children], sur, level + 1);
            if (find) return find;
          }
        }
      };
      while (surplus && surplus.length) {
        for (let i = 0; i < surplus.length; i++) {
          if (findItem(treeData, surplus[i], 1)) {
            surplus.splice(i, 1);
            break;
          }
        }
      }
      return treeData;
    },
  },
};
</script>

<style scoped>
/deep/ .label-desc {
  width: 73px;
}
/deep/ .el-tabs__header {
  margin: 0;
}
/deep/ .el-tabs__item {
  height: 30px;
  line-height: 30px;
  font-size: 12px;
}
/deep/ .el-tabs__content {
  border: 1px solid #e4e7ed;
  border-top: none;
  min-height: 100px;
  position: relative;
  padding: 8px;
}
.control-wrap {
  margin-top: 4px;
}
.option-list {
  font-size: 12px;
  cursor: pointer;
  overflow: auto;
  min-height: 116px;
  max-height: 150px;
}
.option-list li {
  border-bottom: 1px solid #e4e7ed;
  padding: 5px;
}
.form-item {
  width: calc(50% - 20px);
}
.form-fullitem {
  width: calc(100%);
}
.form-item_special {
  margin: 0;
}
.form-item_special,
.form-item_special /deep/ .el-form-item__content {
  width: 100%;
}
/deep/ .el-input-group__prepend {
  padding: 0;
  width: 45px;
  text-align: center;
  letter-spacing: 2px;
}
.active {
  background: #f5f5f5;
}
.language-title {
  padding: 0 5px;
  color: white;
  font-size: 12px;
  background: #54c292;
}
.dynamic-wrap {
  display: flex;
  align-items: center;
}
.param-wrap {
  width: calc(50% - 14px);
  height: 150px;
  display: flex;
  flex-direction: column;
}
.pre-code {
  flex: 1;
  display: flex;
  position: relative;
}
.language-css {
  position: absolute;
  height: 100%;
  width: 100%;
  color: #9a6e3a;
  background: hsla(0, 0%, 100%, 0.5);
  outline: none;
  display: block;
  white-space: break-spaces;
  overflow: auto;
}
.button-control {
  background: #ebf7f2;
  border: none;
  line-height: 100%;
  padding: 3px 14px;
}
.button-control /deep/ .el-icon-circle-plus-outline {
  background: #28a670;
  color: white;
  border-radius: 2px;
}
.button-control /deep/ i {
  padding: 4px;
}
.input-item /deep/ input[type="text"] {
  background: #f6f7f9;
}
/deep/ .input-item.el-date-editor.el-input,
.input-item /deep/ input[type="text"] {
  width: 165px;
}
/deep/ .el-tabs__item.is-active {
  color: white;
  background: #3cc088;
}
/deep/ .el-checkbox__label {
  font-size: 12px;
  color: #333 !important;
}
/deep/ .input-item {
  width: 100%;
}
</style>
