<template>
  <el-aside width="230px">
    <h1>华联超市管理系统</h1>
    <p id="hy">您好，
      <span>admin</span>
    </p>
    <div id="melink">
      <a href="#">管理首页</a>
      <a href="#" @click="loginOut()">退出系统</a>
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
        <router-link to="/classmanage">
          <el-menu-item index="/classmanage">分类管理</el-menu-item>
        </router-link>
        <router-link to="/addclass">
          <el-menu-item index="/addclass">添加分类</el-menu-item>
        </router-link>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <span>商品管理</span>
        </template>
        <router-link to="/goodsmanage">
          <el-menu-item index="/goodsmanage">商品管理</el-menu-item>
        </router-link>
        <router-link to="/addgoods">
          <el-menu-item index="/addgoods">添加商品</el-menu-item>
        </router-link>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <span>进货管理</span>
        </template>
        <el-menu-item index="3-2">库存管理</el-menu-item>
        <router-link to="/addwarehouse">
          <el-menu-item index="/addwarehouse">添加库存</el-menu-item>
        </router-link>
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
        <router-link to="/userlist">
          <el-menu-item index="/userlist">账号管理</el-menu-item>
        </router-link>
        <router-link to="/useradd">
          <el-menu-item index="/useradd">添加账号</el-menu-item>
        </router-link>
        <router-link to="/passwordedit">
          <el-menu-item index="/passwordedit">密码修改</el-menu-item>
        </router-link>
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
      console.log(key, keyPath);
      console.log(this);
      //this.style.backgroundColor='#fff';
    },
    handleClose(key, keyPath) {
      //console.log(key, keyPath);
    },
    loginOut() {
      //发起Ajax请求到后端执行清除cookie的操作
      this.axios
        .get("http://127.0.0.1:9191/user/loginOut")
        .then(result => {
          //console.log("成功",result)
          //根据返回的json数据处理业务逻辑
          if (result.data.isok) {
            this.$message({
              message: "退出成功",
              type: "success"
            });
            this.$router.push("/login")
          }
        })
        .catch(err => {
          console.error(err.message);
        });
    }
  }
};
</script>

<style>
</style>


