<template>
  <el-container>
    <!-- 左边菜单 -->
    <leftMenu></leftMenu>

    <el-container id="mainContent">
      <!-- 右边顶部 -->
      <rightTop></rightTop>
      <!-- 右边中间 -->
      <el-main>
        <el-card class="box-card">
          <h3>系统信息</h3>
          <el-alert title="成功提示的文案" type="success" show-icon></el-alert>
          <el-alert title="消息提示的文案" type="info" show-icon></el-alert>
          <el-row :gutter="40">
            <el-col :span="12">
              <el-card class="box-card">
                <h3>销售排行</h3>
                <el-table :data="tableData" stripe style="width: 100%">
                  <el-table-column prop="goodsname" label="商品名称"></el-table-column>
                  <el-table-column prop="salenum" label="销量"></el-table-column>
                </el-table>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card class="box-card">
                <h3>缺货的商品</h3>
                <el-table :data="lackgoods" stripe style="width: 100%">
                  <el-table-column prop="goodsname" label="商品名称"></el-table-column>
                  <el-table-column prop="residuenum" label="库存"></el-table-column>
                  <el-table-column prop="edit" label="操作"></el-table-column>
                </el-table>
              </el-card>
            </el-col>
          </el-row>
        </el-card>
      </el-main>
      <!-- 右侧底部 -->
      <rightBottom></rightBottom>

    </el-container>
  </el-container>
</template>

<script>
import leftMenu from "../components/leftMenu";
import rightTop from "../components/rightTop";
import rightBottom from "../components/rightBottom";
export default {
  data() {
      return {
        tableData: [{
          goodsname: '海飞丝去屑洗发水',
          salenum: 20
        }, {
          goodsname: '海飞丝去屑洗发水',
          salenum: 20
        }, {
          goodsname: '海飞丝去屑洗发水',
          salenum: 20
        },{
          goodsname: '海飞丝去屑洗发水',
          salenum: 20
        }],
        lackgoods:[
          {goodsname:'优乐美',residuenum:0,edit:"入库"},
          {goodsname:'优乐美',residuenum:0,edit:"入库"}
        ]
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
.el-alert--success,.el-alert--info {
  margin-bottom: 10px;
}

</style>

