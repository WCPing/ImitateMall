// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { Tabbar, TabbarItem, Stepper, PullRefresh, Button, Row, Col, Swipe, SwipeItem, Lazyload, List, Field, NavBar, Toast, Tab, Tabs, Cell, CellGroup } from 'vant'

Vue.use(Tabbar).use(TabbarItem).use(Stepper).use(PullRefresh).use(Button).use(Row).use(Col).use(Swipe).use(SwipeItem).use(Lazyload).use(List).use(Field).use(NavBar).use(Toast).use(Tab).use(Tabs).use(Cell).use(CellGroup)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
