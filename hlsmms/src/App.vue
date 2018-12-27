<template>
  <div id="app">
    <!-- 添加路由插座（路由视图） -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style>
html,body,#app,#home,#loginbox{
        margin: 0;
        height: 100%;
    }
h1,h2,h3,h4,h4,p{margin: 0}
</style>
