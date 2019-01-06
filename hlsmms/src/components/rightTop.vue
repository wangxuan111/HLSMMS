<template>
    <el-header height="auto">
        <h1>
          欢迎您
          <span v-text="username">
      </span>
        </h1>
        <p>查看详细的系统信息。</p>
      </el-header>
</template>
<script>
export default {
  data(){
    return{
      username:""
    }
  },
  //发起Ajax请求，拿cookie的username
  created(){
    this.axios.get(this.apiHost+"/user/getusername")
    .then(result=>{
      //console.log("成功",result)
      this.username=result.data
    }).catch(err=>{
      console.error(err.message)
    })
  },
};
</script>

