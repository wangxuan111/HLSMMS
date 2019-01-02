<template>
  <el-container id="home">
    <!-- 左边菜单 -->
    <leftMenu></leftMenu>

    <el-container id="mainContent">
      <!-- 右边顶部 -->
      <rightTop></rightTop>
      <!-- 右边中间 -->
      <el-main>
        <el-card class="box-card" id="goodsadd">
          <h3>添加商品</h3>
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
              <el-input
                type="text"
                v-model="goodsForm.marketprice"
                autocomplete="off"
                class="input"
              ></el-input>&nbsp;元
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
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 添加成功
          //alert("添加成功！！");
          //发起Ajax请求
          this.axios.post(this.apiHost+"/goods/add",
          this.qs.stringify(this.goodsForm)
          ).then(result=>{
            //console.log(result)
            if(result.data.isok){
              this.$confirm("商品添加成功，是否继续添加？", "提示", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning"
                })
                  .then(() => {
                    this.goodsForm={
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
                      }
                   })
                  .catch(() => {
                    this.$router.push("/goodsmanage");
                  });
          }else{
            this.$message.error(result.data.message);
          }
          }).catch(err=>{
            console.error(err.message)
          })

        } else {
          alert("添加失败!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //生成条形码
    createbarcode(){
      this.goodsForm.barcode=new Date().getTime();
    },
    //输入进价后，更新售价和市场价
    updatePrice(){
      this.goodsForm.marketprice=this.goodsForm.costprice*4;
      this.goodsForm.saleprice=this.goodsForm.marketprice*0.9;
    }
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

/*lable与输入框的距离*/
.el-form-item__label {
  font-weight: bold !important;
}
/*获取条形码按钮*/
.el-button--success {
  margin-left: 20px;
  padding: 10px 20px;
  background: linear-gradient(#7dbc00, #459300);
}
/*输入框和下拉框的宽度*/ 
.el-input{width: 30%}
.el-input--suffix{width: 100%}
</style>





