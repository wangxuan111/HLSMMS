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
            <h3>销售统计报表</h3>
            <div id="main" style="width: 90%;height:420px;">

            </div>
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
//引入ecarts模块
import echarts from 'echarts';
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
    },
    created(){
        
    }
    ,
    mounted(){
        // this.axios.get(this.apiHost+"/goods/saleecharts").
        // then(result=>{
        //     console.log(result)
        //     //console.log(option.series[0].data)
        //     option.series[0].data[0]=result.data[0].stocknum;
        //     console.log( option.series[0].data)
        // }).catch(err=>{
        //     console.error(err.message)
        // })
        var myChart = echarts.init(document.getElementById('main'));
        var option = {
            title: {
                text: '销售统计报表'
            },
            
            tooltip: {},
            legend: {
                data:['销量']
            },
            //x轴的数据
            xAxis: {
                data: ["食品","服装","鞋包","美妆"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [100,270,30,230]
            }]
        };
        myChart.setOption(option);
    }
 
};
</script>
<style scoped>

</style>

