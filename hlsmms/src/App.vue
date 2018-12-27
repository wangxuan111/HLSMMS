<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div>
      <el-row>
        <el-button plain>朴素按钮</el-button>
        <el-button type="primary" plain>主要按钮</el-button>
        <el-button type="success" plain>成功按钮</el-button>
        <el-button type="info" plain>信息按钮</el-button>
        <el-button type="warning" plain>警告按钮</el-button>
        <el-button type="danger" plain>危险按钮</el-button>
      </el-row>
      <br>
      <br>
      <el-switch
        v-model="value3"
        active-text="按月付费"
        inactive-text="按年付费">
      </el-switch>
      <el-switch
        style="display: block"
        v-model="value4"
        active-color="#13ce66"
        inactive-color="#ff4949"
        active-text="按月付费"
        inactive-text="按年付费">
      </el-switch>
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  },
  data() {
    return {
      value3: true,
      value4: true
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
