import { createRouter, createWebHistory } from 'vue-router'

import ShoppingStore from '@/pages/ShoppingStore.vue'
import News from '@/pages/News.vue'
import CurrencyConverter from '@/pages/CurrencyConverter.vue'
import ProductManage from '@/pages/ProductManage.vue'
import Detail from '@/pages/Detail.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/shoppingStore',
      component: ShoppingStore
    },
    {
      path: '/productManage',
      component: ProductManage
    },
    {
      path: '/news',
      component: News,
      children: [
        {
          name: 'newsDetail',
          path: 'detail/:id/:title?/:content?',
          component: Detail,
          // 寫法一：params
          props: true
          // 寫法二：query
          // props(route){
          //   return route.query
          // }
        }
      ]
    },
    {
      path: '/currencyConverter',
      component: CurrencyConverter
    },
    {
      path: '/',
      redirect: '/productManage'
    }
  ]
})

export default router