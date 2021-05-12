import Vue from 'vue'
import VueRouter from 'vue-router'

const Frame = () => import('../components/fram')

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/',
    name: 'frame',
    component: Frame,     
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('../views/home/index.vue'),
        meta: {
          title: '首页',
          icon: 'home'
        }
      },
      {
        path: '/myPage',
        name: 'myPage',
        component: () => import('../views/myPage/index.vue'),
        meta: {
          title: '数据管理',
          icon: 'home'
        }
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
