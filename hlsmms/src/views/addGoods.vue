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
          <h3>添加商品</h3>
          <el-form
            :model="checkForm"
            status-icon
            :rules="rules"
            label-position="top"
            ref="checkForm"
            label-width="60px"
            class="demo-ruleForm"
          >
            <el-form-item label="所属分类：" prop="class">
              <el-select v-model="checkForm.class" placeholder="-------顶级分类-------">
                <el-option label="分类1" value="class1"></el-option>
                <el-option label="分类2" value="class2"></el-option>
                <el-option label="分类3" value="class3"></el-option>
                <el-option label="分类4" value="class4"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="商品条形码：" prop="barcode">
              <el-input type="text" v-model="checkForm.barcode" autocomplete="off" class="input"></el-input>
              <el-button type="success">生成条形码</el-button>
            </el-form-item>
            <el-form-item label="商品名称：" prop="goodname">
              <el-input type="text" v-model="checkForm.goodname" autocomplete="off" class="input"></el-input>
            </el-form-item>
            <el-form-item label="商品售价：" prop="price">
              <el-input type="text" v-model="checkForm.price" autocomplete="off" class="input"></el-input>&nbsp;元
            </el-form-item>
            <el-form-item label="市场价：" prop="marketprice">
              <el-input
                type="text"
                v-model="checkForm.marketprice"
                autocomplete="off"
                class="input"
              ></el-input>&nbsp;元
              <br>默认市场价为售价的1.2倍
            </el-form-item>
            <el-form-item label="商品进价：" prop="jinjia">
              <el-input type="text" v-model="checkForm.jinjia" autocomplete="off" class="input"></el-input>&nbsp;元
            </el-form-item>
            <el-form-item label="入库数量：" prop="number">
              <el-input type="text" v-model="checkForm.number" autocomplete="off" class="input"></el-input>
              <br>记重商品单位为千克
            </el-form-item>
            <el-form-item label="商品重量：" prop="weight">
              <el-input type="text" v-model="checkForm.weight" autocomplete="off" class="input"></el-input>
            </el-form-item>
            <el-form-item label="商品单位：" prop="goodsunit">
              <el-input type="text" v-model="checkForm.goodsunit" autocomplete="off" class="input"></el-input>
            </el-form-item>
            <el-form-item label="会员优惠：" prop="a">
              <el-radio v-model="radio1" label="1">享受</el-radio>
              <el-radio v-model="radio1" label="2">不享受</el-radio>
            </el-form-item>
            <el-form-item label="是否促销：" prop="b">
              <el-radio v-model="radio2" label="3">启用</el-radio>
              <el-radio v-model="radio2" label="4">禁用</el-radio>
            </el-form-item>
            <el-form-item label="商品简介：">
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入内容"
                v-model="goodsintro"
              ></el-input><br>不超过200个汉字
            </el-form-item>

            <el-form-item>
              <el-button id="log" type="primary" @click="submitForm('checkForm')">添加</el-button>
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
      radio1: "1",
      radio2: "4",
      goodsintro: "",
      checkForm: {
        classname: "",
        barcode:"",
        goodname:"",
        price:""

      },
      rules: {
        barcode: [{ required: true, trigger: "blur", message: "请填写条形码" }],
        class: [
          { required: true, trigger: "change", message: "请选择分类" }
        ],
        goodname: [
          { required: true, trigger: "blur", message: "请输入商品名称" }
        ],
        price:[ { required: true, trigger: "blur", message: "请输入商品售价" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 添加成功
          alert("添加成功！！");
        } else {
          alert("添加失败!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
.el-form-item {
  margin-bottom: 10px !important;
}
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





