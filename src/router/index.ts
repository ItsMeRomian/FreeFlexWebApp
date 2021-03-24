import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/client',
    name: 'Client',
    component: () => import('../views/Client.vue')
  },
  // {
  //   path: '/job',
  //   name: 'Job',
  //   component: () => import('../views/view/Job.vue')
  // },
  {
    path: '/account',
    name: 'Account',
    component: () => import('../views/Account.vue')
  },
  {
    path: '/periodsummary/:period_id',
    name: 'PeriodSummary',
    component: () => import('../views/PeriodSummary.vue')
  },
  {
    path: '/view/job/:id',
    name: 'JobView',
    component: () => import('../views/view/JobView.vue')
  },
  {
    path: '/view/client/:id',
    name: 'ClientView',
    component: () => import('../views/view/ClientView.vue')
  },
  {
    path: '/view/job/:job_id/expense/:expense_id',
    name: 'ExpenseView',
    component: () => import('../views/view/ExpenseView.vue')
  },
  {
    path: '/create/job',
    name: 'JobCreate',
    component: () => import('../views/create/JobCreate.vue')
  },
  {
    path: '/create/client',
    name: 'ClientCreate',
    component: () => import('../views/create/ClientCreate.vue')
  },
  {
    path: '/create/expense/:id',
    name: 'ExpenseCreate',
    component: () => import('../views/create/ExpenseCreate.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
