import * as VueRouter from 'vue-router'
import { exampleRoutes } from './component'

export const routes = VueRouter.createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: VueRouter.createWebHistory(),
  routes: [
    {
      path: '/components',
      component: () => import('../views/example.vue'),
      children: [
        {
          path: '',
          component: () => import('../views/components.vue')
        },
        ...exampleRoutes
      ]
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/404.vue')
    }
  ]
})
