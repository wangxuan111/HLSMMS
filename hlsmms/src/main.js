import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/style/public.css'
//引入axios
import axios from 'axios'
//把axios挂载在Vue原型上，vue实例（其他页面组件就可以无限使用）
Vue.prototype.axios=axios;
//引入qs并挂载在vue原型上,用于处理post请求的参数
import qs from 'qs'
Vue.prototype.qs=qs
//引入moment
// import moment from 'moment'
// Vue.prototype.moment=moment

//构造全局守卫
router.beforeEach((to,from,next)=>{
  //只有登录成功才放行
  //让ajax携带cookie证书
  axios.defaults.withCredentials=true;
  //发起Ajax请求到后端，获取cookie，如果cookie存在（或在登录页面）就放行
  axios.get("http://127.0.0.1:9191/user/getCookie").then(result=>{
    //console.log("验证成功的结果",result)
    if(result.data.isok || to.path=="/login"){
      //放行
      next();
    }else{
      // $message.error("请先登录");
      next("/login");
    }
  }).catch(err=>{
    console.error("验证失败的结果",err.message)
  })
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
