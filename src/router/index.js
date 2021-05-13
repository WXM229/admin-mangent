import Vue from 'vue'
import VueRouter from 'vue-router'

const Frame = () => import('../components/fram')
const Index = () => import('@/views')
const Layout = () => import('../components/breadCrumb')

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
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'index',
        component: Index,
      },
      {
        path: '/home',
        name: 'home',
        component: Layout,
        meta: {
          title: '首页',
          icon: 'home'
        },
        children: [
          {
            path: '/home/index',
            name: 'index',
            component: () => import('../views/home/index.vue'),
            meta: {
              title: '课程列表',
              icon: 'class'
            }
          },
          {
            path: '/home/classList',
            name: 'classList',
            component: () => import('../views/home/classList.vue'),
            meta: {
              title: '班级列表',
              icon: 'class'
            }
          }
        ]
      },
      {
        path: '/myPage',
        name: 'myPage',
        component: Layout,
        meta: {
          title: '数据管理',
          icon: 'home'
        },
        children: [
          {
            path: '/myPage/index',
            name: 'index',
            component: () => import('../views/myPage/index.vue'),
            meta: {
              title: '数据统计',
              icon: 'class'
            }
          }
        ]
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
