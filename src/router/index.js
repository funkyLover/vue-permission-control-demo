import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/page/Login'
import store from '../store'

Vue.use(Router)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  } else {
    const position = {}
    if (to.hash) {
      position.selector = to.hash
    }
    if (to.matched.some(m => m.meta.scrollToTop)) {
      position.x = 0
      position.y = 0
    }
    return position
  }
}

const router = new Router({
  routes,
  scrollBehavior,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (to.name === 'Login') {
    if (store.getters.user.isLogin) {
      return next('/')
    } else {
      return next()
    }
  } else {
    if (store.getters.user.isLogin) {
      return next()
    } else {
      return next('/login')
    }
  }
})

export default router
