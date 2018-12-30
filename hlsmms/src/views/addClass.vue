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
          <h3>添加管理</h3>
          <el-form
            :model="checkForm"
            status-icon
            :rules="rules"
            label-position="top"
            ref="checkForm"
            label-width="60px"
            class="demo-ruleForm"
          >
            <el-form-item label="所属分类" prop="class">
              <el-select v-model="checkForm.class" placeholder="-------顶级分类-------">
                <el-option label="分类1" value="class1"></el-option>
                <el-option label="分类2" value="class2"></el-option>
                <el-option label="分类3" value="class3"></el-option>
                <el-option label="分类4" value="class4"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="分类名称" prop="classname">
                <el-input type="text" v-model="checkForm.classname" autocomplete="off" class="input"></el-input>
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
      checkForm: {
        class: "",
        classname:""
      },
      rules: {
        class: [
          { required: true, trigger: "change", message: "请选择分类" }
        ],
        classname:[
            { required: true, trigger: 'blur' ,message:"请输入分类名称"},
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 添加成功
          alert("添加成功！！")
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
/*输入框和下拉框的宽度*/ 
.el-input{width: 30%}
.el-input--suffix{width: 100%}
</style>

