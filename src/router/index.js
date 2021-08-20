import Vue from 'vue'
import VueRouter from 'vue-router'

const Frame = () => import('../components/fram');
/*
出现这两行代码的问题是为了解决：点击面包屑时出现的警告 *** NavigationDuplicated: Avoided redundant navigation to current location:***
这一问题出现的原因是因为: 当前冗余导航,重复出发了同一个路由; 这个错误问题是因为vue-router更新之后导致的
*/

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login')
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
        component: () => import('../views/myPage/index'),
        meta: {
          title: '数据统计',
          icon: 'class'
        }
      }
    ]
  },
  {
    path: '/transfer',
    name: 'transfer',
    component: Frame,
    meta: {
      title: '转介绍用户',
      icon: 'class'
    },
    children: [
      {
        path: '/transfer/introduction',
        name: 'introduction',
        component: () => import('../views/Transfer/transfer_introduction'),
      }
    ],
    redirect: '/transfer/introduction'
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
