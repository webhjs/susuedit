<template>
  <div class="table-wrap">
    <!-- <pre style="position: fixed;z-index: 50; top: 0;left: 0">{{ treeData }}</pre> -->
    <el-table
      :data="treeData"
      border
      row-key="_path"
      ref="multipleTable"
      height="100%"
      default-expand-all
      :tree-props="bse_custom_field"
      :row-class-name="rowClassName"
      @current-change="currentChange"
      @selection-change="selectionChange"
      @select="select"
      @select-all="selectAll"
      style="width: 100%"
    >
      <el-table-column type="index" width="40"> </el-table-column>
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="bse_code" label="编码"> </el-table-column>
      <el-table-column label=" " width="42">
        <template slot-scope="scope">
          <el-tag :type="scope.row[bse_custom_field['parentId'] || 'parentId'] ? '' : 'danger'">{{
            scope.row[bse_custom_field['parentId'] || 'parentId'] ? '次' : '主'
          }}</el-tag>
        </template>
      </el-table-column>
      <template v-if="treeData[0] && (treeData[0].bse_type === '中医诊断')">
        <el-table-column prop="bse_disease_name" label="病名称" width="180"> </el-table-column>
        <el-table-column prop="bse_disease_name_desc" label="病描述"> </el-table-column>
      </template>
      <template v-else>
        <el-table-column prop="bse_diagnose_name" label="诊断名称" width="180"> </el-table-column>
        <el-table-column prop="bse_diagnose_name_desc" label="诊断描述"> </el-table-column>
      </template>
      <el-table-column prop="bse_categery" label="类型"> </el-table-column>
      <el-table-column prop="bse_type" label="分类" width="100"> </el-table-column>
      <el-table-column prop="option" label="操作" width="50" fixed="right">
        <template slot-scope="scope">
          <i class="el-icon-delete cursor delete" @click.stop.prevent="deleteRecord(scope.row)"></i>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },
    multipleSelection: {
      type: Array,
      default() {
        return []
      }
    },
    bse_custom_field: {
      type: Object,
      default() {
        return {}
      }
    },
    bse: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      treeData: [],
      multipleCateTypeMapping: {},
      propsMap: {
        _children: 'children',
        _parentId: 'parentId',
        _order: 'order',
        _id: 'id',
        _level: 'level'
      }
    }
  },
  watch: {
    data: {
      handler(newValue) {
        const { multipleSelection } = this
        this.treeData = this.arrToTree(JSON.parse(JSON.stringify(newValue)), this.propsMap)


        const groupBy = (newArr, resultMap) => {
          return newArr.reduce((pre, cur) => {
            pre[resultMap(cur)] ? pre[resultMap(cur)].push(cur) : (pre[resultMap(cur)] = [cur])
            return pre
          }, {})
        }
        const multipTypeMap = groupBy(multipleSelection || [], ({ bse_type }) => bse_type)
        this.$nextTick(() => {
          newValue.length &&
            multipTypeMap[newValue[0].bse_type] &&
            this.toggleSelection(multipTypeMap[newValue[0].bse_type], true)
          this.$nextTick(() => {
            this.multipleCateTypeMapping = multipTypeMap
          })
        })
      },
      immediate: true
    },
    custom_field: {
      handler(newValue) {
        this.treeData.custom_field = newValue
      },
      immediate: true
    },
    multipleCateTypeMapping: {
      handler(newValue) {
        const { 中医诊断, 西医诊断 } = newValue
        const selection = (中医诊断 || []).concat(西医诊断 || [])
        this.$emit('update:multipleSelection', selection)
      },
      deep: true
    }
  },
  methods: {
    // 数组转成树型数据
    arrToTree(operateArr, props) {
      const __id = props['_id'] || '_id',
        __parentId = props['_parentId'] || '_parentId',
        __level = props['_level'] || '_level',
        __order = props['_order'] || '_order',
        __children = props['_children'] || '_children',
        __path = props['_path'] || '_path'
      let treeData = [],
        surplus = []
      operateArr.forEach(ele => {
        const some = operateArr.some(el => ele[__parentId] == el[__id])
        if (some) {
          surplus.push(ele)
        } else {
          const itemLevel = (listlevel, level, path) => {
            listlevel.forEach((li, inx) => {
              li[__level] = level
              li[__order] = inx
              li[__path] = path + '/' + inx
              if (li[__children] && li[__children].length) {
                itemLevel(li[__children], level + 1, li[__path])
              }
            })
          }
          ele[__children] && ele[__children].length && itemLevel(ele[__children], 2, String(treeData.length))
          treeData.push({
            ...ele,
            [__order]: treeData.length,
            [__path]: String(treeData.length),
            [__level]: 0
          })
        }
      })
      const findItem = (treeDataTree, sur, level) => {
        for (let tree of treeDataTree) {
          if (tree[__id] == sur[__parentId]) {
            tree[__children]
              ? tree[__children].push({
                  ...sur,
                  [__order]: tree[__children].length,
                  [__path]: tree._path + '/' + tree[__children].length,
                  [__level]: level
                })
              : (tree[__children] = [
                  {
                    ...sur,
                    [__order]: 0,
                    [__path]: tree[__path] + '/' + 0,
                    [__level]: level
                  }
                ])
            return tree
          }
          if (tree[__children] && tree[__children].length) {
            const find = findItem(tree[__children], sur, level + 1)
            if (find) return find
          }
        }
      }
      while (surplus && surplus.length) {
        for (let i = 0; i < surplus.length; i++) {
          if (findItem(treeData, surplus[i], 1)) {
            surplus.splice(i, 1)
            break
          }
        }
      }
      return treeData
    },
    findByParentId(treeData, _path) {
      for (let tree of treeData) {
        if (tree._path == _path) {
          return tree
        }
        if (tree[this.propsMap['_children']] && tree[this.propsMap['_children']].length) {
          const findtree = this.findByParentId(tree[this.propsMap['_children']], _path)
          if (findtree) return findtree
        }
      }
    },
    toggleItor(rowArr, isChecked) {
      if (Object.prototype.toString.call(rowArr) == '[object Array]') {
        rowArr.forEach(fit => {
          console.log('checked', isChecked)
          this.$refs.multipleTable.toggleRowSelection(fit, isChecked)
          if (fit[this.bse_custom_field['children'] || 'children']?.length) {
            this.toggleItor(fit[this.bse_custom_field['children'] || 'children'], isChecked)
          }
        })
      }
    },
    toggleSelection(row, select) {
      const idsList = []
      const itorIds = ids => {
        this.treeData.forEach(tree => {
          if (tree.parentId == ids) {
            idsList.push(tree.id)
            itorIds(tree.id)
          }
        })
      }
      row.forEach(item => {
        idsList.push(item.id)
        itorIds(item.id)
      })

      const itor = treeArr => {
        treeArr.forEach(tree => {
          if (idsList.includes(tree.id)) {
            this.$nextTick(() => {
              this.toggleItor([tree], select)
            })
          }
          if (tree.children && tree.children.length) {
            itor(tree.children)
          }
        })
      }
      itor(this.treeData)
    },
    // 删除当前行
    deleteRecord(row) {
      const arrToTree = JSON.parse(JSON.stringify(this.treeData))
      console.log(row._path)
      const find = this.findByParentId(
        arrToTree,
        (() => {
          if (row._path.split('/').length > 1) {
            const pathArr = row._path.split('/')
            pathArr.pop()
            return pathArr.join('/')
          } else {
            return row._path
          }
        })()
      )
      if (find && find.children && find.children.length) {
        find.children.splice(row[this.propsMap['_order']], 1)
      } else {
        arrToTree.splice(row[this.propsMap['_order']], 1)
      }
      this.$emit('updateTreeDate', this.arrToTree(arrToTree, this.propsMap), this.propsMap)
    },
    select(selection, row) {
      /* 子节点像下选中数据 */
      const find = selection.some(el => row.id === el.id)
      this.toggleItor(row[this.bse_custom_field['children'] || 'children'], find)

      /* 同级选中数据 */
      const itorIds = ids => {
        this.treeData.forEach(tree => {
          if (tree.parentId == ids) {
            this.$refs.multipleTable.toggleRowSelection(tree, find)
            itorIds(tree.id)
          }
        })
      }
      itorIds(row.id)
    },
    selectAll(selection) {
      // treeData第一层只要有在selection里面就是全选
      const isSelect = selection.some(el => {
        const tableDataIds = this.treeData.map(j => j.id)
        return tableDataIds.includes(el.id)
      })
      // treeData第一层只要有不在selection里面就是全不选
      const isCancel = !this.treeData.every(el => {
        const selectIds = selection.map(j => j.id)
        return selectIds.includes(el.id)
      })
      if (isSelect) {
        this.toggleItor(this.treeData, isSelect)
      }
      if (isCancel) {
        this.$refs.multipleTable.clearSelection()
      }
    },
    // 表格行样式
    rowClassName({ row }) {
      return this._currentRow ? (row._path == this._currentRow._path ? 'current-row' : '') : ''
    },
    clearCurrentRow() {
      this._currentRow = ''
    },
    currentChange(row) {
      this.$emit('currentChange', JSON.parse(JSON.stringify(row)))
      this._currentRow = JSON.parse(JSON.stringify(row))
    },
    selectionChange() {
      console.log('诊断selection', this.$refs.multipleTable.selection)
      const selection = this.$refs.multipleTable.selection
      const { _children, _path } = this.propsMap
      if (this.treeData.length) {
        let mapKey = this.treeData[0].bse_type
        const treeToArr = (treeData, childkey) => {
          const newTree = []
          const itor = data => {
            data.forEach(tree => {
              tree = JSON.parse(JSON.stringify(tree))
              if (tree[childkey] && tree[childkey].length) {
                itor(JSON.parse(JSON.stringify(tree[childkey])))
              }
              delete tree[childkey]
              newTree.push(tree)
            })
          }
          itor(treeData)
          return newTree
        }
        function unique(arr){
          var temp=[];
          for (var i = 0,len=arr.length; i < len; i++) {
            if(!temp.find(fin => fin[_path || '_path'] == arr[i][_path || '_path'])){
              temp.push(arr[i]);
            }
          }
          return temp;
        }
        this.$set(this.multipleCateTypeMapping, mapKey, unique(treeToArr(selection, _children)))
      }
    },
    cancelAll() {
      this.$refs.multipleTable.clearSelection()
    },
    upData() {
      const arrToTree = JSON.parse(JSON.stringify(this.treeData))
      const _path = this._currentRow._path.split('/')
      const parentId = _path.length > 1 ? _path.pop() && _path.join('/') : _path.join('/')
      const findSel = this.findByParentId(arrToTree, parentId)
      const find = this._currentRow._path.split('/').length > 1 ? findSel[this.propsMap['_children']] : arrToTree
      const id = this._currentRow._path
      const findOrd = this.findByParentId(arrToTree, id)[this.propsMap['_order']]
      let _findlist = null
      if (findOrd > 0) {
        find[findOrd] = find.splice(findOrd - 1, 1, find[findOrd])[0]
        _findlist = find[findOrd - 1]._path.split('/')
        _findlist.push(parseInt(_findlist.pop() - 1))
      } else {
        this.$message.warning('只允许同级排序')
      }
      this.$emit('updateTreeDate', this.arrToTree(arrToTree, this.propsMap), this.propsMap)
      _findlist && (this._currentRow = this.findByParentId(this.treeData, _findlist.join('/')))
    },
    downData() {
      const arrToTree = JSON.parse(JSON.stringify(this.treeData))
      const _path = this._currentRow._path.split('/')
      const parentId = _path.length > 1 ? _path.pop() && _path.join('/') : _path.join('/')
      const findSel = this.findByParentId(arrToTree, parentId)
      const find = this._currentRow._path.split('/').length > 1 ? findSel[this.propsMap['_children']] : arrToTree
      const id = this._currentRow._path
      const findOrd = this.findByParentId(arrToTree, id)[this.propsMap['_order']]
      let _findlist = null
      if (findOrd < find.length - 1) {
        find[findOrd] = find.splice(findOrd + 1, 1, find[findOrd])[0]
        _findlist = find[findOrd + 1]._path.split('/')
        _findlist.push(parseInt(_findlist.pop()) + 1)
      } else {
        this.$message.warning('只允许同级排序')
      }
      this.$emit('updateTreeDate', this.arrToTree(arrToTree, this.propsMap), this.propsMap)
      _findlist && (this._currentRow = this.findByParentId(this.treeData, _findlist.join('/')))
    },
    // 添加诊断行
    addDiagnose(formInline, fastCopy) {
      formInline = JSON.parse(JSON.stringify(formInline))
      delete formInline[this.propsMap['_id']]
      formInline[this.propsMap['_parentId']] = 0
      delete formInline._path
      if (fastCopy) {
        const deleteFromInlineId = children => {
          children && children.forEach(child => {
            delete child[this.propsMap['_id']]
            delete child[this.propsMap['_parentId']]
            delete child._path
            if (child.children && child.children.length) {
              deleteFromInlineId(child.children)
            }
          })
        }
        deleteFromInlineId(formInline[this.propsMap['_children']])
      } else {
        delete formInline[this.propsMap['_children']]
      }
      const arrToTree = JSON.parse(JSON.stringify(this.treeData))
      arrToTree.push(formInline)
      this.$emit('updateTreeDate', this.arrToTree(arrToTree, this.propsMap), this.propsMap)
    },
    // 编辑保存
    editSaveDiagnose(formInline) {
      formInline = JSON.parse(JSON.stringify(formInline))
      const arrToTree = JSON.parse(JSON.stringify(this.treeData))
      const id = this._currentRow._path
      const findSel = this.findByParentId(arrToTree, id)
      for (let [key, value] of Object.entries(formInline)) {
        findSel[key] = value
      }
      this.$emit('updateTreeDate', this.arrToTree(arrToTree, this.propsMap), this.propsMap)
    },
    // 添加子诊断
    addChildDiagnose(formInline) {
      const { _children, _parentId, _id } = this.propsMap
      delete formInline[_children]
      const arrToTree = JSON.parse(JSON.stringify(this.treeData))
      const id = this._currentRow._path
      const findSel = this.findByParentId(arrToTree, id)
      if (findSel[_children]) {
        findSel[_children].push({ ...formInline, _path: findSel._path + '/' + findSel[_children].length, [_parentId]: findSel[_id] })
      } else {
        findSel[_children] = [{ ...formInline, _path: findSel._path + '/' + 0, [_parentId]: findSel[_id] }]
      }
      this.$emit('updateTreeDate', this.arrToTree(arrToTree, this.propsMap), this.propsMap)
    }
  }
}
</script>

<style scoped>
.table-wrap {
  height: 100%;
  width: 100%;
  display: flex;
}
.border-wrap {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
}
/deep/ .drag-tree-table {
  margin: 0;
}
/deep/ .tree-column {
  padding: 0;
  font-size: 13px;
  color: #333;
}
/deep/ .drag-tree-table-header .tree-column {
  color: #28a670;
}
/deep/ .drag-tree-table-header {
  line-height: 35px;
  height: 35px;
  background: #eef8f4;
}
/deep/ .drag-tree-table-body {
  height: auto !important;
  flex: 1;
}
.cursor {
  padding: 5px;
  cursor: pointer;
}
.cursor.delete {
  color: #f56c6c;
}
/deep/ .el-tag {
  color: #4e7bea;
  background-color: #e7edfa;
  border-color: #b4c7f4;
  padding: 0px 3px;
}
/deep/ .el-tag.el-tag--danger {
  color: #fe5966;
  background-color: #feedee;
  border-color: #febcc1;
  padding: 0px 3px;
}
/deep/ .el-table__body tr.hover-row > td,
.el-table__body tr.hover-row.current-row > td {
  background-color: #d3ece1;
}
</style>
