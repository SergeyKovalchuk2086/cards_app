import Vue from 'vue'
import VueRouter from 'vue-router'
import LayoutMain from '@/layouts/LayoutMain'
import Cards from '@/views/Cards'
import CardsList from '@/components/CardsList'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: "LayoutMain",
    component: LayoutMain,
    redirect: '/cards/list',
    children: [
      {
        path: 'cards',
        component: Cards,
        children: [
          {
            path: 'list',
            name: "Cards",
            component: CardsList
          }
        ]
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
