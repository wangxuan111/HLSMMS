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
          <el-form :inline="true" :model="formInline" class="demo-form-inline" id="goodsmanage">
            <el-form-item>
              <el-select v-model="formInline.classoption" placeholder="选择分类">
                <el-option label="分类1" value="class1"></el-option>
                <el-option label="分类2" value="class2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="关键字：">
              <el-input v-model="formInline.keyword"></el-input>(商品名称，条形码)
            </el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form>

          <el-table :data="tableData" stripe style="width: 100%" id="goods">
            <el-table-column prop="goodsbarcode" label="商品条形码" width="120"></el-table-column>
            <el-table-column prop="goodsname" label="商品名称"></el-table-column>
            <el-table-column prop="belong" label="所属分类" width="70"></el-table-column>
            <el-table-column prop="saleprice" label="售价(元)" width="70"></el-table-column>
            <el-table-column prop="sellP" label="促销价(元)"></el-table-column>
            <el-table-column prop="marketprice" label="市场价(元)"></el-table-column>
            <el-table-column prop="repertory" label="库存" width="70"></el-table-column>
            <el-table-column prop="totalrepertory" label="库存总额(元)"></el-table-column>
            <el-table-column prop="totalsale" label="销售总额(元)"></el-table-column>
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
              :current-page.sync="currentPage"
              :page-size="100"
              layout="prev, pager, next, jumper"
              :total="1000"
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
      formInline: {
        keyword: "",
        classoption: ""
      },
      tableData: [
        {
          goodsbarcode: "1234567890245",
          goodsname: "优乐美",
          belong: "食品",
          saleprice: "2.00",
          sellP: "未促销",
          marketprice: "2.40",
          repertory: "0",
          totalrepertory: "0.00",
          totalsale: "0.00"
        },
        {
          goodsbarcode: "1234567890245",
          goodsname: "优乐美",
          belong: "食品",
          saleprice: "2.00",
          sellP: "未促销",
          marketprice: "2.40",
          repertory: "0",
          totalrepertory: "0.00",
          totalsale: "0.00"
        },
        {
          goodsbarcode: "1234567890245",
          goodsname: "优乐美",
          belong: "食品",
          saleprice: "2.00",
          sellP: "未促销",
          marketprice: "2.40",
          repertory: "0",
          totalrepertory: "0.00",
          totalsale: "0.00"
        },
        {
          goodsbarcode: "1234567890245",
          goodsname: "优乐美",
          belong: "食品",
          saleprice: "2.00",
          sellP: "未促销",
          marketprice: "2.40",
          repertory: "0",
          totalrepertory: "0.00",
          totalsale: "0.00"
        }
      ],
      currentPage: 5
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
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
.block{margin-top: 20px;}
</style>

