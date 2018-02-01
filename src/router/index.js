import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Users',
      component: () => import('@/components/Users.vue')
    },
    {
      path: '/new',
      name: 'NewUser',
      component: () => import('@/components/NewUser.vue')
    },
    {
      path: '/edit/:id',
      name: 'EditUser',
      component: () => import('@/components/EditUser.vue')
    }
  ]
})
