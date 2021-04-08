import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import store from '../store/index'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: { requiresLogin: true }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/client',
    name: 'Client',
    component: () => import('../views/Client.vue'),
    meta: { requiresLogin: true }
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import('../views/Account.vue'),
    meta: { requiresLogin: true }
  },
  {
    path: '/periodsummary/:period_id',
    name: 'PeriodSummary',
    component: () => import('../views/PeriodSummary.vue'),
    meta: { requiresLogin: true }
  },
  {
    path: '/view/job/:id',
    name: 'JobView',
    component: () => import('../views/view/JobView.vue'),
    meta: { requiresLogin: true }
  },
  {
    path: '/view/job/:id/checkout',
    name: 'JobCheckOut',
    component: () => import('../views/view/JobCheckout.vue'),
    meta: { requiresLogin: true }
  },
  {
    path: '/view/client/:id',
    name: 'ClientView',
    component: () => import('../views/view/ClientView.vue'),
    meta: { requiresLogin: true }
  },
  {
    path: '/view/job/:job_id/expense/:expense_id',
    name: 'LinkedExpenseView',
    component: () => import('../views/view/LinkedExpenseView.vue'),
    meta: { requiresLogin: true }
  },
  {
    path: '/view/expense/:id',
    name: 'ExpenseView',
    component: () => import('../views/view/ExpenseView.vue'),
    meta: { requiresLogin: true }
  },
  {
    path: '/create/job',
    name: 'JobCreate',
    component: () => import('../views/create/JobCreate.vue'),
    meta: { requiresLogin: true }
  },
  {
    path: '/create/client',
    name: 'ClientCreate',
    component: () => import('../views/create/ClientCreate.vue'),
    meta: { requiresLogin: true }
  },
  {
    path: '/create/expense/:id',
    alias: '/create/expense',
    name: 'ExpenseCreate',
    component: () => import('../views/create/ExpenseCreate.vue'),
    meta: { requiresLogin: true }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresLogin) && store.state.loggedIn == false) {
    console.error("User requested restricted page, rerouting...")
    next({name: 'Login'})
  } else {
    next()
  }
})
export default router
