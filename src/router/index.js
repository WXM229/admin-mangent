import Vue from 'vue'
import VueRouter from 'vue-router'

const Frame = () => import('../components/fram')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // redirect: '/home/index'
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: Frame,
    meta: {
      title: '首页',
      icon: 'class'
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
    component: Frame,
    meta: {
      title: '数据管理',
      icon: 'class'
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

const router = new VueRouter({
  routes
})

router.beforeEach((to, form, next )=>{
  let isLogin = Boolean(localStorage.getItem('user'))
  if (to.name !== 'login' && !isLogin) next({ name: 'login' })
  else next()
})

export default router
