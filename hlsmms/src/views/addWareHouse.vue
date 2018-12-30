<template>
  <el-container id="home">
    <!-- 左边菜单 -->
    <leftMenu></leftMenu>

    <el-container id="mainContent">
      <!-- 右边顶部 -->
      <rightTop></rightTop>
      <!-- 右边中间 -->
       <el-main>
        <el-card class="box-card">
         <h3>商品入库</h3>
        </el-card>
      </el-main>
      <!-- 右侧底部 -->
      <rightBottom></rightBottom>

    </el-container>
  </el-container>
</template>

<script>
import leftMenu from '../components/leftMenu';
import rightTop from '../components/rightTop';
import rightBottom from '../components/rightBottom';
export default {
  data() {
      return {
        
      }
    },
    components:{
      // 注册组件
      leftMenu,
      rightTop,
      rightBottom
    }
 
};
</script>
<style scoped>

</style>


