<template>
  <el-container>
    <!-- 左边菜单 -->
    <leftMenu></leftMenu>

    <el-container id="mainContent">
      <!-- 右边顶部 -->
      <rightTop></rightTop>
      <!-- 右边中间 -->
      <el-main id="useradd">
        <el-card class="box-card">
          <h3>添加管理员账号</h3>
          <el-form
            :model="checkForm"
            status-icon
            :rules="rules"
            label-position="top"
            ref="checkForm"
            label-width="60px"
            class="demo-ruleForm"
          >
            <el-form-item label="账号" prop="username">
              <el-input type="text" v-model="checkForm.username" autocomplete="off" class="input"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="checkForm.pass" autocomplete="off" class="input"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input type="password" v-model="checkForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="用户组" prop="usergroup">
              <el-select v-model="checkForm.usergroup" placeholder="请选择">
                <el-option label="超级管理员" value="超级管理员"></el-option>
                <el-option label="管理员" value="管理员"></el-option>
              </el-select>
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
    var validatePass = (rule, value, callback) => {
      if (value !== this.checkForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      checkForm: {
        username: "",
        pass: "",
        checkPass: "",
        usergroup: ""
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
        pass: [
          { required: true, trigger: "blur", message: "密码不能为空" },
          {
            min: 6,
            max: 12,
            message: "密码长度在6-18个字符之间",
            trigger: "blur"
          }
        ],
        checkPass: [
          { required: true, trigger: "blur", message: "确认密码不能为空" },
          {
            min: 6,
            max: 12,
            message: "确认密码长度在6-18个字符之间",
            trigger: "blur"
          },
          { validator: validatePass, trigger: "blur" }
        ],
        usergroup: [
          { required: true, trigger: "change", message: "请选择用户组" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //console.log(this.checkForm);
          //发送Ajax  post方式请求
          this.axios
            .post(
              "http://127.0.0.1:9191/user/useradd",
              this.qs.stringify(this.checkForm)
            )
            .then(result => {
              console.log("成功", result);
              //前端处理业务逻辑
              if (result.data.isok) {
                this.$confirm("是否继续添加用户？", "提示", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning"
                })
                  .then(() => {
                    this.$message({
                      type: "success",
                      message: "继续添加用户!"
                    });
                    
                  })
                  .catch(() => {
                    this.$router.push("/userlist");
                  });
              } else {
                this.$message.error(result.data.message);
              }
            })
            .catch(err => {
              console.error("失败", err);
            });
        } else {
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
.el-input {
  width: 30%;
}
.el-input--suffix {
  width: 100%;
}
</style>

