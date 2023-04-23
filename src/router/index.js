import { createRouter, createWebHashHistory } from 'vue-router'

import LoginView from '../views/login/LoginView.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/home/HomeView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    beforeEnter (to, from, next) {
      const { isLogin } = localStorage
      if (isLogin) {
        next({ name: 'home ' })
      } else { next() }
    }
  }, {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '../views/register/RegisterView.vue'),
    beforeEnter (to, from, next) {
      const { isLogin } = localStorage
      if (isLogin) {
        next({ name: 'home ' })
      } else { next() }
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isLogin = localStorage.isLogin
  if (!isLogin && (to.name !== 'login' && to.name !== 'register')) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
