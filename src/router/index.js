import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMail from '@/components/pages/shoppingMail'
import Register from '@/components/pages/Register'
import Login from '@/components/pages/Login'
import Goods from '@/components/pages/Goods'
import CategoryList from '@/components/pages/CategoryList'
import Cart from '@/components/pages/Cart'
import Test from '@/components/pages/test'
import Main from '@/components/pages/Main'
import Member from '@/components/pages/Member'

Vue.use(Router)

export default new Router({ 
  routes: [
    {
      path: '/', 
      redirect: '/main'
    },
    {
      path: '/main', 
      component: Main, 
      children: [
        {
          path: '/', name: 'ShoppingMail', component: ShoppingMail
        },
        {
          path: '/categoryList', name: 'CategoryList', component: CategoryList
        },
        {
          path: '/cart', name: 'Cart', component: Cart
        },
        {
          path: '/member', name: 'Member', component: Member
        },
      ]
    },
    {
      path: '/Register', name: 'Register', component: Register
    },
    {
      path: '/Login', name: 'Login', component: Login
    },
    {
      path: '/goods', name: 'Goods', component: Goods
    },
    {
      path: '/test', name: 'Test', component: Test
    }
  ]
})
