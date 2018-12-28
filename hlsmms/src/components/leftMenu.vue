<template>
    <el-aside width="230px">
      <h1>华联超市管理系统</h1>
      <p id="hy">
        您好，<span>admin</span>
      </p>
      <div id="melink">
        <a href="#">管理首页</a>
        <a href="#">退出系统</a>
      </div>
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :unique-opened="true"
      >
        <el-submenu index="1">
          <template slot="title">
            <span>分类管理</span>
          </template>
          <el-menu-item index="1-1">分类管理</el-menu-item>
          <el-menu-item index="1-2">添加分类</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <span>商品管理</span>
          </template>
          <el-menu-item index="2-1">商品管理</el-menu-item>
          <el-menu-item index="2-2">添加商品</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <span>进货管理</span>
          </template>
          <el-menu-item index="3-1">库存管理</el-menu-item>
          <el-menu-item index="3-2">添加库存</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <span>出货管理</span>
          </template>
          <el-menu-item index="4-1">销售列表</el-menu-item>
          <el-menu-item index="4-2">商品出库</el-menu-item>
          <el-menu-item index="4-3">商品退货</el-menu-item>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">
            <span>统计管理</span>
          </template>
          <el-menu-item index="5-1">销售统计</el-menu-item>
          <el-menu-item index="5-2">进货统计</el-menu-item>
        </el-submenu>
        <el-submenu index="6">
          <template slot="title">
            <span>账号管理</span>
          </template>
          <el-menu-item index="/userlist"><router-link to="/userlist">账号管理</router-link></el-menu-item>
          <el-menu-item index="/useradd"><router-link to="/useradd">添加账号</router-link></el-menu-item>
          <el-menu-item index="/passwordedit"><router-link to="/passwordedit">密码修改</router-link></el-menu-item>
        </el-submenu>
        <el-submenu index="7">
          <template slot="title">
            <span>会员管理</span>
          </template>
          <el-menu-item index="5-1">账号管理</el-menu-item>
          <el-menu-item index="5-2">添加账号</el-menu-item>
        </el-submenu>
        <el-submenu index="8">
          <template slot="title">
            <span>系统管理</span>
          </template>
          <el-menu-item index="5-1">系统信息</el-menu-item>
          <el-menu-item index="5-2">系统配置</el-menu-item>
          <el-menu-item index="5-3">权限管理</el-menu-item>
          <el-menu-item index="5-4">添加管理组</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
</template>

<script>
export default {
    methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      //console.log(key, keyPath);
    }
  }
}
</script>

<style>

</style>


