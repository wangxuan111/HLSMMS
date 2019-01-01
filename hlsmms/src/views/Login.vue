<template>
  <div id="loginbox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h2>用户登录</h2>
      </div>
      <div class="text item">
        <el-form
          :model="checkForm"
          status-icon
          :rules="rules"
          ref="checkForm"
          label-width="60px"
          class="demo-ruleForm"
        >
          <el-form-item label="账号" prop="username">
            <el-input type="text" v-model="checkForm.username" autocomplete="off" class="input"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="userpwd">
            <el-input type="password" v-model="checkForm.userpwd" autocomplete="off" class="input"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button id="log" type="primary" @click="submitForm('checkForm')">提交</el-button>
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
        username: "",
        userpwd: ""
      },
      rules: {
        username: [
          { required: true, trigger: "blur", message: "用户名不能为空" },
          {
            min: 6,
            max: 18,
            message: "用户名长度在6-18个字符之间",
            trigger: "blur"
          }
        ],
        userpwd: [
          { required: true, trigger: "blur", message: "密码不能为空" },
          {
            min: 6,
            max: 12,
            message: "密码长度在6-18个字符之间",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 跳转
          //this.$router.push('/')
          this.axios.defaults.withCredentials = true;
          //前端验证通过后，发起ajax请求
          this.axios
            .post(
              "http://127.0.0.1:9191/user/checkLogin",
              this.qs.stringify(this.checkForm)
            )
            .then(result => {
              //console.log("成功",result)
              if (result.data.isok) {
                this.$message({
                  message: result.data.message,
                  type: "success"
                });
                this.$router.push("/");
              } else {
                this.$message.error(result.data.message);
              }
            })
            .catch(err => {
              console.error("错误", err.message);
            });
        } else {
          alert("登录失败!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style scoped>
</style>

