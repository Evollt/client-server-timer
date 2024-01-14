import { RouteRecordRaw, Router, createRouter, createWebHistory } from "vue-router";
import HomePage from '@/pages/HomePage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import RegisterPage from '@/pages/RegisterPage.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage
  }
]

const router: Router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
})

router.beforeEach((to, from, next) => {
  if (to.name == 'login' || to.name == 'register') {
    if (document.cookie.includes('jwt_token')) {
      next('/')
    } else {
      next()
    }
  }
  if (!document.cookie.includes('jwt_token')) {
    next({
      name: 'login'
    })
  }
  next()
});

export default router
