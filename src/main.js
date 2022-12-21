/*
 * @Descripttion: 
 * @version: 
 * @Author: 金苏
 * @Date: 2021-08-30 09:21:49
 * @LastEditors: 金苏
 * @LastEditTime: 2021-08-30 10:30:22
 */
import Vue from "vue";
import ElementUI from "element-ui";
// element全局样式
import "element-ui/lib/theme-chalk/index.css";
import "element-ui/lib/theme-chalk/display.css";


import App from "@/App";

Vue.use(ElementUI, {
  size: "medium"
});

import Fragment from "vue-fragment";
Vue.use(Fragment.Plugin)

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: h => h(App)
});
