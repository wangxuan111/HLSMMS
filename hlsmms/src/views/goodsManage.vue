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
          <h3>商品管理</h3>
          <el-form :inline="true" :model="goodsForm" class="demo-form-inline" id="goodsmanage">
            <el-form-item>
              <el-select v-model="goodsForm.classname" placeholder="-------顶级分类-------">
                <el-option label="食品" value="食品"></el-option>
                <el-option label="服装" value="服装"></el-option>
                <el-option label="鞋包" value="鞋包"></el-option>
                <el-option label="美妆" value="美妆"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="关键字：">
              <el-input v-model="goodsForm.keyword"></el-input>(商品名称，条形码)
            </el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button type="primary" @click="reset">重置</el-button>
          </el-form>

          <el-table :data="tableData" stripe style="width: 100%" id="goods">
            <el-table-column prop="barcode" label="商品条形码"></el-table-column>
            <el-table-column prop="goodsname" label="商品名称"></el-table-column>
            <el-table-column prop="classname" label="所属分类"></el-table-column>
            <el-table-column prop="saleprice" label="售价(元)" ></el-table-column>
            <el-table-column prop="costprice" label="成本价(元)"></el-table-column>
            <el-table-column prop="marketprice" label="市场价(元)"></el-table-column>
            <el-table-column prop="stocknum" label="库存"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" circle></el-button>
                <el-button type="danger" icon="el-icon-delete" circle></el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[100, 200, 300, 400]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              background
            ></el-pagination>
          </div>
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
      goodsForm: {
        keywords: "",
        classname: ""
      },
      currentPage: 1,
      tableData: []
    };
  },
  methods: {
    getGoods(){
      //发起Ajax请求
      this.axios.get(this.apiHost+`/goods/goodsmanage?classname=${this.goodsForm.classname}&keywords=${this.goodsForm.keywords}`)
      .then(result=>{
        console.log("成功"+result)
        //把后端查询到的数据赋值给tableData
        this.tableData=result.data
      }).catch(err=>{
        console.error("错误：",err.message)
      })
    },
    reset(){
      this.goodsForm.classname="";
      this.goodsForm.keywords="";
      //获取数据，查询全表
      this.getGoods();
    },
    onSubmit() {
      //console.log("submit!");
      //发送Ajax请求，桉树是classname和keywords
      this.getGoods();
    },
     handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
  },
  created(){
    //发起Ajax请求，获取商品列表
    this.getGoods();
  },
  components: {
    // 注册组件
    leftMenu,
    rightTop,
    rightBottom
  }
};
</script>
 <style scoped>
.el-button--primary {
  margin-top: 0px;
}
.el-form-item__content {
  width: 700px;
}
.el-input {
  width: 62%;
}
.block {
  margin-top: 20px;
}
</style>

