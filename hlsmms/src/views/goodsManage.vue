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
          <el-form :inline="true" :model="goods" class="demo-form-inline" id="goodsmanage">
            <el-form-item>
              <el-select v-model="goods.classname" placeholder="-------顶级分类-------">
                <el-option label="食品" value="食品"></el-option>
                <el-option label="服装" value="服装"></el-option>
                <el-option label="鞋包" value="鞋包"></el-option>
                <el-option label="美妆" value="美妆"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="关键字：">
              <el-input v-model="goods.keyword"></el-input>(商品名称，条形码)
            </el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button type="primary" @click="reset">重置</el-button>
          </el-form>

          <el-table :data="tableData" stripe style="width: 100%" id="goods">
            <el-table-column prop="barcode" label="商品条形码"></el-table-column>
            <el-table-column prop="goodsname" label="商品名称"></el-table-column>
            <el-table-column prop="classname" label="所属分类"></el-table-column>
            <el-table-column prop="saleprice" label="售价(元)"></el-table-column>
            <el-table-column prop="costprice" label="成本价(元)"></el-table-column>
            <el-table-column prop="marketprice" label="市场价(元)"></el-table-column>
            <el-table-column prop="stocknum" label="库存"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  circle
                  @click="goodsEdit(scope.row.goodsid)"
                ></el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  @click="goodsDelete(scope.row.goodsid)"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[2, 4, 6, 10]"
              :page-size="pageSize"
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
    <!-- 模态框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="60%" :before-close="handleClose">
      <!-- 表单 -->
      <el-form
        :model="goodsForm"
        status-icon
        :rules="rules"
        label-position="right"
        ref="goodsForm"
        label-width="110px"
        class="demo-ruleForm"
      >
        <el-form-item label="所属分类：" prop="classname">
          <el-select v-model="goodsForm.classname" placeholder="-------顶级分类-------">
            <el-option label="食品" value="食品"></el-option>
            <el-option label="服装" value="服装"></el-option>
            <el-option label="鞋包" value="鞋包"></el-option>
            <el-option label="美妆" value="美妆"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品条形码：" prop="barcode">
          <el-input type="text" v-model="goodsForm.barcode" autocomplete="off" class="input"></el-input>
          <el-button type="success" @click="createbarcode()">生成条形码</el-button>
        </el-form-item>
        <el-form-item label="商品名称：" prop="goodsname">
          <el-input type="text" v-model="goodsForm.goodsname" autocomplete="off" class="input"></el-input>
        </el-form-item>
        <el-form-item label="商品进价：" prop="costprice">
          <el-input type="text" v-model="goodsForm.costprice" @blur="updatePrice()" class="input"></el-input>&nbsp;元
        </el-form-item>
        <el-form-item label="商品售价：" prop="saleprice">
          <el-input type="text" v-model="goodsForm.saleprice" autocomplete="off" class="input"></el-input>&nbsp;元
        </el-form-item>
        <el-form-item label="市场价：" prop="marketprice">
          <el-input type="text" v-model="goodsForm.marketprice" autocomplete="off" class="input"></el-input>&nbsp;元
        </el-form-item>

        <el-form-item label="入库数量：" prop="stocknum">
          <el-input type="text" v-model="goodsForm.stocknum" autocomplete="off" class="input"></el-input>
        </el-form-item>
        <el-form-item label="商品重量：" prop="weight">
          <el-input type="text" v-model="goodsForm.weight" autocomplete="off" class="input"></el-input>
        </el-form-item>
        <el-form-item label="商品单位：" prop="unit">
          <el-input type="text" v-model="goodsForm.unit" autocomplete="off" class="input"></el-input>
        </el-form-item>
        <el-form-item label="会员优惠：" prop="isdiscount">
          <el-radio v-model="goodsForm.isdiscount" label="1">享受</el-radio>
          <el-radio v-model="goodsForm.isdiscount" label="0">不享受</el-radio>
        </el-form-item>
        <el-form-item label="是否促销：" prop="ispromotion">
          <el-radio v-model="goodsForm.ispromotion" label="1">启用</el-radio>
          <el-radio v-model="goodsForm.ispromotion" label="0">禁用</el-radio>
        </el-form-item>
        <el-form-item label="商品简介：">
          <el-input
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 4}"
            placeholder="请输入内容"
            v-model="goodsForm.details"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button id="log" type="primary" @click="submitForm('goodsForm')">添加</el-button>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false" >确 定</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
import leftMenu from "../components/leftMenu";
import rightTop from "../components/rightTop";
import rightBottom from "../components/rightBottom";

export default {
  data() {
    return {
      currentPage: 1, //默认当前页为第一页
      pageSize: 4, //默认每页显示五条数据
      total: 0, //默认总数为 0
      dialogVisible: false,
      goods: {
        keywords: "",
        classname: ""
      },
      goodsForm:{
        classname:"",
        barcode:"",
        goodsname:"",
        saleprice:0,
        marketprice:0,
        costprice:0,
        stocknum:"",
        weight:"",
        unit:"",
        details:"",
        isdiscount:"0",
        ispromotion:"0"
      },
       rules: {
        classname: [
          { required: true, trigger: "blur", message: "请选择商品类别" }
        ],
        barcode: [{ required: true, trigger: "blur", message: "请填写条形码" }],
        goodsname: [
          { required: true, trigger: "blur", message: "请填写商品名称" }
        ],
        costprice:[ { required: true, trigger: "blur", message: "请输入商品进价" }]
      },
      tableData: []
    };
  },
  methods: {
    getGoods() {
      //发起Ajax请求
      this.axios
        .get(
          this.apiHost +
            `/goods/goodsmanage?classname=${this.goods.classname}&keywords=${
              this.goods.keywords
            }&pagesize=${this.pageSize}&currentpage=${this.currentPage}`
        )
        .then(result => {
          //console.log("成功"+result)
          //把查询到的商品信息的数组对象赋值给表格数据属性
          //{"total":total,"goodsArray":goodsArray}
          this.tableData = result.data.goodsArray;
          //把后端返回的total总记录数赋值给total属性
          this.total = result.data.total;
        })
        .catch(err => {
          console.error("错误：", err.message);
        });
    },
    reset() {
      this.goods.classname = "";
      this.goods.keywords = "";
      //获取数据，查询全表
      this.getGoods();
    },
    onSubmit() {
      //console.log("submit!");
      //发送Ajax请求，桉树是classname和keywords
      this.getGoods();
    },
    //改变pagesize的方法(下拉框)
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getGoods();
    },
    //改变当前页（页码）
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getGoods();
    },
    //修改商品的方法
    goodsEdit(goodsid) {
      //准备模态框（数据回填）
      console.log(goodsid);
      this.dialogVisible = true;
      //发起ajax请求
      this.axios
        .get(`${this.apiHost}/goods/getgoodsData?goodsid=${goodsid}`)
        .then(result => {
          console.log("成功",result)
          this.goodsForm = result.data[0];
        })
        .catch(err => {
          console.error("失败", err.message);
        });
    },

    //删除商品的方法
    goodsDelete(goodsid) {
      //发起Ajax请求，把goodsid传到后台
      console.log(goodsid);
      this.axios
        .get(`${this.apiHost}/goods/delgoods?goodsid=${goodsid}`)
        .then(result => {
          //console.log("成功",result)
          //前端处理业务逻辑
          if (result.data.isok) {
            this.$confirm("是否确认删除该商品？", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
              .then(() => {
                this.$message({
                  type: "success",
                  message: result.data.message
                });
                //更新用户列表
                this.getGoods();
              })
              .catch(() => {});
          } else {
            this.$message.error(result.data.message);
          }
        })
        .catch(err => {
          console.error(err.message);
        });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  },
  created() {
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

