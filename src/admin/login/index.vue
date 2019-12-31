<template>
  <!-- 盒子 -->
  <div id="login" class="center">
    <!-- 面板 -->
    <div class="login-form center">
      <!-- 表单 -->
      <el-tabs v-model="activeName" tab-position="top" :span="24" @tab-click="handleClick">
        <!-- 登录 -->
        <el-tab-pane :span="12" label="登录" name="loginForm">
          <el-form
            :model="loginData"
            status-icon
            :rules="loginForm"
            ref="loginForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="用户名或邮箱" prop="userName">
              <el-input v-model="loginData.userName"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                type="password"
                v-model="loginData.password"
                autocomplete="off"
                @input="onPass('loginForm')"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="loginBtn('loginForm')">登录</el-button>
              <el-button @click="removeFormData('loginForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <!-- 注册 -->
        <el-tab-pane :span="12" label="注册" name="registerFrom">
          <el-form
            :model="registerData"
            status-icon
            :rules="registerFrom"
            ref="registerFrom"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="用户名" prop="userName">
              <el-input v-model="registerData.userName"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                type="password"
                v-model="registerData.password"
                autocomplete="off"
                @input="onPass('registerFrom')"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input type="password" v-model="registerData.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="registerData.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="registerBtn('registerFrom')">注册</el-button>
              <el-button @click="removeFormData('registerFrom')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { getIsRegister, loginUser, registerUser } from "../../ults/http";

export default {
  data() {
    let validateLogin = {
      loginUserName: (rule, value, callback) => {
        if (!value) {
          return callback(new Error("请输入"));
        }
        if (value.toString().length < 4) {
          callback(new Error("必须大于等于4位"));
        } else {
          callback();
        }
      },
      loginPassword: (rule, value, callback) => {
        if (!value) {
          callback(new Error("请输入密码"));
        } else {
          if (value.toString().length < 6) {
            callback(new Error("必须大于等于6位"));
          } else {
            callback();
          }
        }
      }
    };
    let validateRegister = {
      checkUserName: async (rule, value, callback) => {
        if (!value) {
          return callback(new Error("请输入"));
        }
        if (value.toString().length < 4) {
          callback(new Error("必须大于等于4位"));
        } else {
          let res = await getIsRegister(this.registerData.userName);
          console.log(res);
          if (res.data.code == 401) {
            return callback(new Error("该用户名已被注册"));
          }
          callback();
        }
      },
      validatePass: (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入密码"));
        } else {
          if (value.toString().length < 6) {
            callback(new Error("必须大于等于6位"));
          } else {
            this.$refs.registerFrom.validateField("checkPass");
            callback();
          }
        }
      },
      validateCheckPassword: (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请再次输入密码"));
        } else if (value !== this.registerData.password) {
          callback(new Error("两次输入密码不一致!"));
        } else {
          callback();
        }
      },
      validateEmail: async (rule, value, callback) => {
        // console.log(value);
        // console.log(value === "");
        let rexEmail = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
        if (value === "") {
          callback(new Error("请输入邮箱"));
        } else {
          if (!rexEmail.test(value)) {
            callback(new Error("请输入正确的邮箱格式"));
          } else {
            let res = await getIsRegister(this.registerData.email);
            console.log(res);
            if (res.data.code == 202) {
              callback();
              return;
            }
            callback(new Error("该邮箱已被注册"));
          }
        }
      }
    };
    return {
      loginData: {
        userName: "",
        password: ""
      },
      registerData: {
        userName: "",
        password: "",
        checkPass: "",
        email: ""
      },
      loginForm: {
        userName: [{ validator: validateLogin.loginUserName, trigger: "blur" }],
        password: [{ validator: validateLogin.loginPassword, trigger: "blur" }]
      },
      registerFrom: {
        userName: [
          { validator: validateRegister.checkUserName, trigger: "blur" }
        ],
        password: [
          { validator: validateRegister.validatePass, trigger: "blur" }
        ],
        checkPass: [
          { validator: validateRegister.validateCheckPassword, trigger: "blur" }
        ],
        email: [{ validator: validateRegister.validateEmail, trigger: "blur" }]
      },
      activeName: "loginForm"
    };
  },
  methods: {
    // 注册方法
    registerBtn(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let res = await registerUser(this.registerData);
          if (res.data.code === 200) {
            this.alertTost(res.data.msg, "success");
            // 注册成功携带账号密码跳转登录
            this.activeName = "loginForm";
            this.loginData = {
              userName: this.registerData.userName,
              password: this.registerData.password
            };
          }
        } else {
          this.alertTost("请输入完全", "error");
          return false;
        }
      });
    },
    // 登录方法
    loginBtn(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let res = await loginUser(this.loginData);
          console.log(res);
          if (res.data.code == 200) {
            this.alertTost(res.data.msg, "success");
            localStorage.setItem("token", res.data.token);
            this.$router.push('/')
          }
          if (res.data.code == 404) {
            this.alertTost(res.data.msg, "error");
          }
        } else {
          this.alertTost("请确认!", "error");
          return false;
        }
      });
    },
    // 去除密码空格
    onPass(formName) {
      if (formName == "loginForm") {
        this.loginData.password = this.loginData.password.replace(/\s+/g, "");
        return;
      }
      this.registerData.password = this.registerData.password.replace(
        /\s+/g,
        ""
      );
    },
    // 点击tab重置表单
    handleClick(tab) {
      this.removeFormData(tab.name);
    },
    // 重置表单
    removeFormData(formName) {
      this.$refs[formName].resetFields();
      if (formName == "loginForm") {
        this.loginData = {
          userName: "",
          password: ""
        };
        return;
      }
      this.registerData = {
        userName: "",
        password: "",
        checkPass: "",
        email: ""
      };
    },
    // 提示方法
    alertTost(msg, type) {
      this.$message({
        showClose: true,
        message: msg,
        type: type
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#login {
  width: 100%;
  height: 100%;
  .login-form {
    width: 450px;
    height: 400px;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 8px 2px 12px 0 rgba(0, 0, 0, 0.1);
    padding-right: 45px;
    .el-tabs {
      width: 302px;
      height: 345px;
    }
  }
}
</style>
