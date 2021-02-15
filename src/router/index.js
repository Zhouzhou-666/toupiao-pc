import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
Vue.use(VueRouter)

// 路由配置表
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/')
  },
  {
    path: '/',
    // name: 'layout',
    component: () => import('@/views/layout/'),
    children:
      [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/home/')
        },
        {
          path: '',
          name: 'article',
          component: () => import('@/views/article/')
        }
      ]
  },
]

const router = new VueRouter({
  routes
})

// router.beforeEach((to, from, next) => {
//   // 开启顶部导航进度条特效
//   NProgress.start()
//   const user = JSON.parse(window.localStorage.getItem('user'))
//   if(to.path !== '/login'){
//     if (user) {
//       next()
//     } else {
//       next('/login')
//     }
//   }else{
//     next()
//   }
// })
//
// router.afterEach((to, from) => {
//   // 结束顶部的导航进度条
//   NProgress.done();
// });

export default router
