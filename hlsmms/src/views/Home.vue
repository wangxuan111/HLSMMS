<template>
  <el-container id="home">
    <!-- 左边菜单 -->
    <el-aside width="240px">
      <h1>华联超市管理系统</h1>
      <p id="hy">您好，<span> admin</span></p>
      <div id="melink"> 
        <a href="#">管理首页</a>
        <a href="#">退出系统</a>
      </div>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :unique-opened="true"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-submenu index="1">
          <template slot="title">
            <span>分类管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1">分类管理</el-menu-item>
            <el-menu-item index="1-2">添加分类</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <span>商品管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1">商品管理</el-menu-item>
            <el-menu-item index="2-2">添加商品</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <span>进货管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="3-1">选项1</el-menu-item>
            <el-menu-item index="3-2">选项2</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <span>出货管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="4-1">选项1</el-menu-item>
            <el-menu-item index="4-2">选项2</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">
            <span>统计管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="5-1">选项1</el-menu-item>
            <el-menu-item index="5-2">选项2</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="6">
          <template slot="title">
            <span>账号管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="5-1">选项1</el-menu-item>
            <el-menu-item index="5-2">选项2</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="7">
          <template slot="title">
            <span>会员管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="5-1">选项1</el-menu-item>
            <el-menu-item index="5-2">选项2</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="8">
          <template slot="title">
            <span>系统管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="5-1">选项1</el-menu-item>
            <el-menu-item index="5-2">选项2</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <h1>欢迎您 <span>admin</span> </h1>
        <p>查看详细的系统信息。</p>
      </el-header>
      <el-main>Main</el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
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
};
</script>
<style>

.el-header,.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  height: 100px !important;
  text-align: left;
}
.el-header h1{line-height: 60px;}

.el-aside {
  background: #3a3a3a;
  color: #fff;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
/*h1标题样式*/
.el-aside h1{line-height: 60px;}
/*欢迎您和两个a标签*/
#hy,#melink{text-align: right;line-height: 40px;margin: 10px 20px;}
#melink a{text-decoration: none;color: #fff !important;display: inline-block;width: 80px;
border-right: 1px solid #fff;line-height: 22px;text-align: center;}
#melink a:last-child{border: none}
/**/
.el-submenu__title {height: 45px !important;line-height: 45px !important;
background: #67C23A !important}
.el-menu-item{background: #3a3a3a !important;}

</style>

