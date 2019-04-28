import Vue from 'vue'
import Router from 'vue-router'
import DashboardLayout from '@/layout/DashboardLayout'
import AuthLayout from '@/layout/AuthLayout'
Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: 'dashboard',
      component: DashboardLayout,
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "demo" */ './views/Dashboard.vue')
        },
        {
          path: '/GraphicMaker',
          name: 'graphicMaker',
          component: () => import(/* webpackChunkName: "demo" */ './views/GraphicMaker.vue')
        },
        {
          path: '/PosterMaker',
          name: 'PosterMaker',
          component: () => import(/* webpackChunkName: "demo" */ './views/PosterMaker.vue')
        },
        {
          path: '/postAnalytics',
          name: 'postAnalytics',
          component: () => import(/* webpackChunkName: "demo" */ './views/PostAnalytics.vue')
        }
      ]
    }
  ]
})
