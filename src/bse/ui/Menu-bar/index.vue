<template>
  <component :is="isTag" class="bse-menu-demo" mode="horizontal" @select="activeName => $emit('select', activeName)">
    <template v-for="(menu, index) in menuList">
      <el-submenu v-if="menu.items && menu.items.length" :disabled="menu.disabled" :key="menu.name + index" :index="menu.name" popper-class="bse-menu-demo" popper-append-to-body>
        <template slot="title">{{ menu.title }}</template>
        <bse-menu v-if="menu.items && menu.items.length" :menuList="menu.items" isMenu="no"></bse-menu>
      </el-submenu>
      <el-menu-item v-else :disabled="menu.disabled" :key="menu.name + index" :index="menu.name">{{ menu.title }}</el-menu-item>
    </template>
  </component>
</template>

<script>
export default {
  name: 'bse-menu',
  data() {
    return {
      isTag: this.isMenu == 'yes' ? 'el-menu' : 'fragment'
    }
  },
  props: {
    menuList: {
      type: Array,
      default() {
        return []
      }
    },
    isMenu: {
      type: String,
      default: 'yes'
    }
  }
}
</script>

<style>
.bse-menu-demo.el-menu--horizontal.el-menu {
  background: var(--light-gray);
  padding-left: 50px;
  border-bottom: 0;
}
.bse-menu-demo.el-menu--horizontal .el-submenu:hover .el-submenu__title {
  background: var(--teal);
  color: var(--white);
}
.bse-menu-demo.el-menu--horizontal>.el-submenu .el-submenu__icon-arrow {
  display: none;
}
.bse-menu-demo.el-menu--horizontal>.el-menu-item,
.bse-menu-demo.el-menu--horizontal>.el-submenu,
.bse-menu-demo.el-menu--horizontal .el-menu .el-menu-item,
.bse-menu-demo.el-menu--horizontal .el-menu .el-submenu__title {
  height: 29px;
  line-height: 29px;
  font-size: 12px;
  padding: 3px 6px;
  background: var(--light-gray);
  color: var(--dark);
  border-bottom: 0;
}
.bse-menu-demo.el-menu--horizontal>.el-submenu.is-active .el-submenu__title {

}
.bse-menu-demo.el-menu--horizontal>.el-submenu .el-submenu__title {
  height: 100%;
  line-height: 24px;
  font-size: 12px;
  background: var(--light-gray);
  color: var(--dark);
  border-bottom: 0;
  border-radius: 3px;
}
.bse-menu-demo.el-menu--horizontal>.el-submenu.is-active .el-submenu__title {
  border-bottom: 0;
  background: var(--white);
  color: var(--dark);
}
.bse-menu-demo.el-menu--horizontal>.el-submenu.is-active  .el-submenu__title i {
  color: var(--dark);
}
.bse-menu-demo.el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
  background: var(--teal);
  color: var(--white);
}
.bse-menu-demo.el-menu--horizontal .el-menu-item:not(.is-disabled):focus, .bse-menu-demo.el-menu--horizontal>.el-menu-item.is-active {
  border-bottom: 0;
}
.bse-menu-demo.el-menu--horizontal>.el-menu-item.is-active {
  background: var(--white);
}
.bse-menu-demo.el-menu--horizontal .el-menu {
  background: var(--light-gray);
  border-radius: 4px;
}
.bse-menu-demo.el-menu--horizontal .el-menu-item.is-disabled {
  background: var(--light-gray)!important;
}
</style>