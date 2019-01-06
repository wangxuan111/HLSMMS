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
          <h3>修改密码</h3>
          <el-form
            :model="checkForm"
            status-icon
            :rules="rules"
            label-position="top"
            ref="checkForm"
            label-width="60px"
            class="demo-ruleForm"
          >
            <el-form-item label="原密码" prop="userpwd">
              <el-input type="text" v-model="checkForm.userpwd" autocomplete="off" class="input"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newpass">
              <el-input type="password" v-model="checkForm.newpass" autocomplete="off" class="input"></el-input>
            </el-form-item>
            <el-form-item label="确认新密码" prop="checkPass">
              <el-input type="password" v-model="checkForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button id="log" type="primary" @click="submitForm('checkForm')">修改</el-button>
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
    var validatePass = (rule, value, callback) => {
        if (value !== this.checkForm.newpass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
        checkForm: {
          userpwd:'',
          newpass: '',
          checkPass:''
        },
        rules: {
          userpwd:[
              { required: true, trigger: 'blur' ,message:"请输入原密码"},
              {min:6,max:18,message:"用户名长度在6-18个字符之间",trigger:'blur'}
          ],
          newpass: [ 
            { required: true, trigger: 'blur' ,message:"请输入新密码"},
            {min:6,max:12,message:"密码长度在6-18个字符之间",trigger:'blur'}
          ],
          checkPass: [ 
            { required: true, trigger: 'blur' ,message:"确认密码不能为空"},
            {min:6,max:12,message:"确认密码长度在6-18个字符之间",trigger:'blur'},
            {validator:validatePass,trigger:"blur"}
          ]
        }
      };
  },
  methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 前端验证通过
            //alert('修改密码成功!!');
            //发起Ajax请求
            this.axios.post(this.apiHost+"/user/passwordEdit",
            this.qs.stringify(this.checkForm)
            ).then(result=>{
              //console.log("成功",result)
              if(result.data.isok){
                this.$message({
                  message: result.data.message,
                  type: "success"
                });
                 this.$router.push("/login");
              }else{
                this.$message.error(result.data.message);
              }
            }).catch(err=>{
              console.error("错误了",err.message);
            })
          } else {
            alert('修改密码失败!!');
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

