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
          <h3>账号管理</h3>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column label="用户名称" width="200px;">
              <template slot-scope="scope">{{ scope.row.username }}</template>
            </el-table-column>
            <el-table-column label="添加日期" width="300px;">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.addDate | foramtData}}</span>
              </template>
            </el-table-column>
            <el-table-column label="用户组">
              <template slot-scope="scope">{{ scope.row.usergroup }}</template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.row.userid)">
                  <i class="el-icon-edit"></i> 编辑
                </el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.row.userid)">
                  <i class="el-icon-delete"></i> 删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-main>
      <!-- 右侧底部 -->
      <rightBottom></rightBottom>
    </el-container>
    <!-- 模态框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form
        :model="checkForm"
        status-icon
        :rules="rules"
        label-position="right"
        ref="checkForm"
        label-width="70px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="username">
          <el-input type="text" v-model="checkForm.username" autocomplete="off" class="input"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="userpwd">
          <el-input type="text" v-model="checkForm.userpwd" autocomplete="off" class="input"></el-input>
        </el-form-item>
        <el-form-item label="用户组" prop="usergroup">
          <el-select v-model="checkForm.usergroup" placeholder="请选择">
            <el-option label="超级管理员" value="超级管理员"></el-option>
            <el-option label="管理员" value="管理员"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('checkForm')">确 定</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
import leftMenu from "../components/leftMenu";
import rightTop from "../components/rightTop";
import rightBottom from "../components/rightBottom";
import moment from "moment";
export default {
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      checkForm: {
        userid: "",
        username: "",
        userpwd: "",
        usergroup: "",
        addDate: ""
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
        ],
        usergroup: [
          { required: true, trigger: "change", message: "请选择用户组" }
        ]
      }
    };
  },
  components: {
    // 注册组件
    leftMenu,
    rightTop,
    rightBottom
  },
  methods: {
    // 模态框函数
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    // 确定修改按钮触发的函数
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //console.log(this.checkForm);
          //发送Ajax  post方式请求
          this.axios
            .post(
              this.apiHost+"/user/usersave",
              this.qs.stringify(this.checkForm)
            )
            .then(result => {
              if (result.data.isok) {
                this.$message({
                  message: result.data.message,
                  type: "success"
                });
                this.dialogVisible = false;
                this.getusers();
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
    //更新用户列表封装函数
    getusers() {
      this.axios
        .get(this.apiHost+"/user/getusers")
        .then(result => {
          //console.log("后端返回的数据",result.data);
          this.tableData = result.data; //把返回的数据赋值给表格数据属性
        })
        .catch(err => {
          console.error(err.message);
        });
    },
    // 修改用户
    handleEdit(userid) {
      //console.log(userid);
      //准备模态框（数据回填）
      this.dialogVisible = true;
      //发起ajax请求
      this.axios
        .get(`${this.apiHost}/user/getuserData?userid=${userid}`)
        .then(olduserData => {
          //console.log("成功",olduserData)
          this.checkForm = olduserData.data[0];
        })
        .catch(err => {
          console.error("失败", err.message);
        });
    },
    // 删除用户
    handleDelete(userid) {
      //console.log(userid);
      //发起Ajax请求，把userid传到后台
      this.axios
        .get(`${this.apiHost}/user/deluser?userid=${userid}`)
        .then(result => {
          //console.log("成功",result)
          //前端处理业务逻辑
          if (result.data.isok) {
            this.$message({
              message: result.data.message,
              type: "success"
            });
            //更新用户列表
            this.getusers();
          } else {
            this.$message.error(result.data.message);
          }
        })
        .catch(err => {
          console.error(err.message);
        });
    }
  },
  created() {
    //获取用户列表
    this.getusers();
  },
  //日期格式
  filters: {
    foramtData(oldDate) {
      return moment(oldDate).format("YYYY-MM-DD");
    }
  }
};
</script>
<style scoped>
/* 右边中间卡片 */
.box-card h3 {
  margin-bottom: 20px;
  line-height: 45px;
  background: linear-gradient(#fff, #e5e5e5);
  padding-left: 10px;
}
.el-alert--success,
.el-alert--info {
  margin-bottom: 20px;
}
/* 删除按钮的左边外边距 */
.el-button + .el-button {
  margin-left: 20px;
}
#mainContent {
  display: flex;
  flex-wrap: wrap;
}
#mainContent > * {
  width: 100%;
}
</style>

