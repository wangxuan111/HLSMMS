<template>
<div id="loginbox">
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <h2>用户登录</h2>
        </div>
        <div class="text item">
            <el-form :model="checkForm" status-icon :rules="rules" ref="checkForm" label-width="60px" class="demo-ruleForm">
            <el-form-item label="账号" prop="username">
                <el-input type="text" v-model="checkForm.username" autocomplete="off" class="input"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="checkForm.pass" autocomplete="off" class="input"></el-input>
            </el-form-item>
            
            <el-form-item>
                <el-button id="log" type="primary" @click="submitForm('checkForm')" >提交</el-button>
                <el-button id="res" @click="resetForm('checkForm')">重置</el-button>
            </el-form-item>
            </el-form>
        </div>
    </el-card> 
</div>  
</template>
<script>
export default {
    data() {
      return {
        checkForm: {
          username:'',
          pass: ''
        },
        rules: {
          username:[
              { required: true, trigger: 'blur' ,message:"用户名不能为空"},
              {min:6,max:18,message:"用户名长度在6-18个字符之间",trigger:'blur'}
          ],
          pass: [ 
            { required: true, trigger: 'blur' ,message:"密码不能为空"},
            {min:6,max:12,message:"密码长度在6-18个字符之间",trigger:'blur'}
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 跳转
            this.$router.push('/home')
          } else {
            alert('登录失败!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
</script>
<style>
    .box-card{width: 480px;height: 300px;position: fixed;left: 0;right: 0;top: 0;
    bottom: 0;margin: auto;border-radius: 10px !important;background: rgba(0, 0, 0, .3) !important} 
    html,body,#loginbox{
        margin: 0;
        height: 100%;
    }
    #loginbox{ background:url("../assets/loginbg.jpg") no-repeat;background-size: cover }
    .el-card__body {padding: 20px 30px 20px 20px !important};
    #log{margin-left: 50px !important;}
    .el-button+.el-button {margin-left: 110px !important;}
</style>

