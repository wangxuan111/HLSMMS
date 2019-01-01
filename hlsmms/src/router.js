import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    // 配置登录路由
    {
      path: '/login',
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
    },
    {
      path: '/addclass',
      component: () => import(/* webpackChunkName: "addClass" */ './views/addClass.vue')
    },
    {
      path: '/classmanage',
      component: () => import(/* webpackChunkName: "classManage" */ './views/classManage.vue')
    },
    {
      path: '/addgoods',
      component: () => import(/* webpackChunkName: "addGoods" */ './views/addGoods.vue')
    },
    {
      path: '/goodsmanage',
      component: () => import(/* webpackChunkName: "goodsManage" */ './views/goodsManage.vue')
    },
    {
      path: '/addwarehouse',
      component: () => import(/* webpackChunkName: "addWareHouse" */ './views/addWareHouse.vue')
    }
  ]
})
