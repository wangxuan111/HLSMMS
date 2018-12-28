import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      component: Home
    },
    // 配置登录路由
    {
      path: '/',
      component: Login
    },
    {
      path: '/useradd',
      component: () => import(/* webpackChunkName: "userAdd" */ './views/userAdd.vue')
    },
    {
      path: '/userlist',
      component: () => import(/* webpackChunkName: "userList" */ './views/userList.vue')
    },
    {
      path: '/passwordedit',
      component: () => import(/* webpackChunkName: "passwordEdit" */ './views/passwordEdit.vue')
    }
  ]
})
