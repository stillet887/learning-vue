import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Users',
      component: () => import('@/pages/Users.vue')
    },
    {
      path: '/new',
      name: 'NewUser',
      component: () => import('@/pages/NewUser.vue')
    },
    {
      path: '/edit/:id',
      name: 'EditUser',
      component: () => import('@/pages/EditUser.vue')
    }
  ]
})
