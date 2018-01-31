import Vue from 'vue'
import Router from 'vue-router'

const Users = () => import('@/components/Users.vue');
const NewUser = () => import('@/components/NewUser.vue');
const EditUser = () => import('@/components/EditUser.vue');

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Users',
      component: Users
    },
    {
      path: '/new',
      name: 'NewUser',
      component: NewUser
    },
    {
      path: '/edit/:id',
      name: 'EditUser',
      component: EditUser
    }
  ]
})
