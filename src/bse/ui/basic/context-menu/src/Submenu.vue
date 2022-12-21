<template>
  <transition name="contextmenu-submenu-fade">
    <div
      ref="menu"
      :class="[commonClass.menu, 'bse-context-menu', customClass]"
      :style="{ left: style.left + 'px', top: style.top + 'px', minWidth: style.minWidth + 'px', zIndex: style.zIndex }"
      v-if="visible"
      @contextmenu="e => e.preventDefault()"
    >
      <div class="menu_body">
        <template v-for="(item, index) of items">
          <template v-if="!item.hidden">
            <template v-if="item.component">
              <!--  自定义视图禁用   -->
              <div
                v-if="item.disabled"
                :class="[
                  commonClass.menuItem,
                  commonClass.unclickableMenuItem,
                  'bse-menu-item',
                  'bse-menu-item__disabled',
                  item.divided ? 'bse-menu-item__divided' : null
                ]"
                :key="index"
              >
                <div class="bse-menu-item_icon" v-if="hasIcon">
                  <i :class="item.icon" v-if="item.icon"></i>
                </div>
                <span class="bse-menu-item_label">{{ item.label }}</span>
                <div class="bse-menu-item_expand_icon"></div>
              </div>

              <!--  自定义视图   -->
              <component
                v-else
                v-bind="item"
                :attrs="item.attrs"
                :listeners="item.listeners"
                :is="item.component"
                :key="index"
                @mouseenter.native="$event => enterItem($event, item, index)"
              ></component>
            </template>

            <template v-else>
              <!--  禁用     -->
              <div
                v-if="item.disabled"
                :class="[
                  commonClass.menuItem,
                  commonClass.unclickableMenuItem,
                  'bse-menu-item',
                  'bse-menu-item__disabled',
                  item.divided ? 'bse-menu-item__divided' : null
                ]"
                :key="index"
              >
                <div class="bse-menu-item_icon" v-if="hasIcon">
                  <i :class="item.icon" v-if="item.icon"></i>
                </div>
                <span class="bse-menu-item_label">{{ item.label }}</span>
                <div class="bse-menu-item_expand_icon"></div>
              </div>

              <!--  有子菜单  ▶ -->
              <div
                v-else-if="item.children"
                :class="[
                  commonClass.menuItem,
                  commonClass.unclickableMenuItem,
                  'bse-menu-item',
                  'bse-menu-item__available',
                  activeSubmenu.index === index ? 'bse-menu-item_expand' : null,
                  item.divided ? 'bse-menu-item__divided' : null
                ]"
                :key="index"
                @mouseenter="$event => enterItem($event, item, index)"
              >
                <div class="bse-menu-item_icon" v-if="hasIcon">
                  <i :class="item.icon" v-if="item.icon"></i>
                </div>
                <span class="bse-menu-item_label">{{ item.label }}</span>
                <div class="bse-menu-item_expand_icon">
                  <i class="el-icon-arrow-right !wd-font-bold"></i>
                </div>
              </div>

              <!--  其他正常   -->
              <div
                v-else
                :class="[
                  commonClass.menuItem,
                  commonClass.clickableMenuItem,
                  'bse-menu-item',
                  'bse-menu-item__available',
                  item.active && 'bse-menu-item--active',
                  item.divided ? 'bse-menu-item__divided' : null
                ]"
                :key="index"
                @mouseenter="$event => enterItem($event, item, index)"
                @click="itemClick(item)"
              >
                <div class="bse-menu-item_icon" v-if="hasIcon">
                  <i :class="item.icon" v-if="item.icon"></i>
                </div>
                <span class="bse-menu-item_label">{{ item.label }}</span>
                <div class="bse-menu-item_expand_icon">
                  <i v-if="item.active" class="el-icon-check"></i>
                </div>
              </div>
            </template>
          </template>
        </template>
      </div>
    </div>
  </transition>
</template>

<script>
import Vue from 'vue'
import {
  SUBMENU_X_OFFSET,
  SUBMENU_Y_OFFSET,
  SUBMENU_OPEN_TREND_LEFT,
  SUBMENU_OPEN_TREND_RIGHT,
  COMPONENT_NAME
} from '../utils/constant'
import { debounceDtor } from '@bianpengfei/utils'
export default {
  name: COMPONENT_NAME,
  data() {
    return {
      commonClass: {
        menu: null,
        menuItem: null,
        clickableMenuItem: null,
        unclickableMenuItem: null
      },
      activeSubmenu: {
        index: null,
        instance: null
      },
      items: [],
      position: {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      },
      style: {
        left: 0,
        top: 0,
        zIndex: 2,
        minWidth: 150
      },
      editoInstance: {
        type: Object,
        default: () => ({})
      },
      customClass: null,
      visible: false,
      hasIcon: false,
      openTrend: SUBMENU_OPEN_TREND_RIGHT
    }
  },
  mounted() {
    this.visible = true
    for (let item of this.items) {
      if (item.icon) {
        this.hasIcon = true
        break
      }
    }
    this.$nextTick(() => {
      const windowWidth = document.documentElement.clientWidth
      const windowHeight = document.documentElement.clientHeight
      const menu = this.$refs.menu
      const menuWidth = menu.offsetWidth
      const menuHeight = menu.offsetHeight

      ;(this.openTrend === SUBMENU_OPEN_TREND_LEFT ? this.leftOpen : this.rightOpen)(
        windowWidth,
        windowHeight,
        menuWidth
      )

      this.style.top = this.position.y
      if (this.position.y + menuHeight > windowHeight) {
        if (this.position.height === 0) {
          this.style.top = this.position.y - menuHeight
        } else {
          this.style.top = windowHeight - menuHeight
        }
      }
      this.style.top = this.style.top < 0 ? 0 : this.style.top
    })
  },
  methods: {
    leftOpen(windowWidth, windowHeight, menuWidth) {
      this.style.left = this.position.x - menuWidth
      this.openTrend = SUBMENU_OPEN_TREND_LEFT
      if (this.style.left < 0) {
        this.openTrend = SUBMENU_OPEN_TREND_RIGHT
        if (this.position.width === 0) {
          this.style.left = 0
        } else {
          this.style.left = this.position.x + this.position.width
        }
      }
    },
    rightOpen(windowWidth, windowHeight, menuWidth) {
      this.style.left = this.position.x + this.position.width
      this.openTrend = SUBMENU_OPEN_TREND_RIGHT
      if (this.style.left + menuWidth > windowWidth) {
        this.openTrend = SUBMENU_OPEN_TREND_LEFT
        if (this.position.width === 0) {
          this.style.left = windowWidth - menuWidth
        } else {
          this.style.left = this.position.x - menuWidth
        }
      }
    },

    @debounceDtor(50)
    enterItem(e, item, index) {
      if (!this.visible) {
        return
      }
      if (this.activeSubmenu.instance) {
        if (this.activeSubmenu.index === index) {
          return
        } else {
          this.activeSubmenu.instance.close()
          this.activeSubmenu.instance = null
          this.activeSubmenu.index = null
        }
      }
      if (!item.children) {
        return
      }
      const menuItemClientRect = e.target.getBoundingClientRect()
      const SubmenuConstructor = Vue.component(COMPONENT_NAME)
      this.activeSubmenu.index = index
      this.activeSubmenu.instance = new SubmenuConstructor()
      this.activeSubmenu.instance.items = item.children
      this.activeSubmenu.instance.openTrend = this.openTrend
      this.activeSubmenu.instance.commonClass = this.commonClass
      this.activeSubmenu.instance.position = {
        x: menuItemClientRect.x + SUBMENU_X_OFFSET,
        y: menuItemClientRect.y + SUBMENU_Y_OFFSET,
        width: menuItemClientRect.width - 2 * SUBMENU_X_OFFSET,
        height: menuItemClientRect.width
      }
      this.activeSubmenu.instance.style.minWidth =
        typeof item.minWidth === 'number' ? item.minWidth : this.style.minWidth
      this.activeSubmenu.instance.style.zIndex = this.style.zIndex
      this.activeSubmenu.instance.customClass =
        typeof item.customClass === 'string' ? item.customClass : this.customClass
      this.activeSubmenu.instance.$mount()
      document.body.appendChild(this.activeSubmenu.instance.$el)
    },
    itemClick(item) {
      if (!this.visible) {
        return
      }
      if (item && !item.disabled && !item.hidden && typeof item.onClick === 'function') {
        return item.onClick(this.editoInstance)
      }
    },
    close() {
      this.visible = false
      if (this.activeSubmenu.instance) {
        this.activeSubmenu.instance.close()
      }
      this.$nextTick(() => {
        this.$destroy()
      })
    }
  }
}
</script>

<style lang="scss">
.bse-context-menu,
.bse-context-menu__wrap-xlrtokd {
  position: fixed;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  background: #fff;
  border-radius: 4px;
  padding: 2px 6px;
  $height: 23px;
  $border-color: #d4d4d4;
  $divided-top: 2px;
  border: 1px solid $border-color;
  .menu_body {
    display: block;
  }
  .bse-menu-item {
    line-height: $height;
    position: relative;
    padding: 0 16px;
    font-size: 13px;
    outline: 0;
    display: flex;
    align-items: center;
    transition: 0.2s;
    list-style: none;
    margin: $divided-top 0;
    .bse-menu-item_label {
      flex: 1;
    }
    .bse-menu-item_icon {
      width: 21px;
      text-align: left;
      display: inline-block;
      i {
        display: inline-block;
      }
    }
    .bse-menu-item_expand_icon {
      margin-left: 16px;
      font-size: 12px;
      text-align: right;
      font-weight: bold;
    }

    &.bse-menu-item__divided {
      margin: $divided-top 0 calc(#{$divided-top} * 2);
      &:before {
        content: '';
        width: 100%;
        height: 1px;
        position: absolute;
        bottom: -$divided-top;
        left: 0;
        background: #ebeef5;
      }
    }
    &.bse-menu-item__available {
      color: #333;
      cursor: pointer;
      &:hover {
        background-color: rgb($--color-primary, 0.24);
        color: $--color-primary;
      }
    }
    &.bse-menu-item--active {
      background: rgba($--color-primary, 0.1);
      color: $--color-primary;
    }
    &.bse-menu-item__available,
    &.bse-menu-item__disabled {
      height: $height;
      border-radius: 4px;
      padding: 0 6px;
      line-height: $height;
      font-size: 12px;
    }

    &.bse-menu-item__disabled {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.bse-menu-item_expand {
      background-color: rgb($--color-primary, 0.1);
    }
  }
}

.bse-context-menu__wrap-xlrtokd {
  border: none;
  position: relative;
  box-shadow: none;
}
</style>

<style>
.contextmenu-submenu-fade-enter-active,
.contextmenu-submenu-fade-leave-active {
  transition: opacity 0.1s;
}
.contextmenu-submenu-fade-enter,
.contextmenu-submenu-fade-leave-to {
  opacity: 0;
}
</style>
