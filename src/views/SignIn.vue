<template>
  <div class="login-wrap" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.8)">
    <div class="ms-login">
      <div class="title">
        <!-- <img src="../assets/img/logoWhite.png" alt> -->
        <h2>运营数据大屏</h2>
      </div>
      <div class="bottom">
        <div class="loginLeft">
          <img src="http://swap.wondware.com/backstageImg/loginLeftimg.png" alt>
        </div>

        <div class="loginRight">
          <div class="selectType">
            <span :class="usertype==index?'active':''" v-for="(item,index) in typeList" :key="index"
              @click="selectTypeFun(item,index)">{{item.label}}</span>
          </div>

          <!-- <div class="loginRightimg">
            <img :src="$imgUrl+'logoBlue.png'" alt>
          </div> -->

          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
            <!-- <div style="margin-bottom:15px;">
              <el-radio v-model="ruleForm.usertype" label="1">运营商</el-radio>
              <el-radio v-model="ruleForm.usertype" label="2">代理商</el-radio>
            </div> -->

            <el-form-item prop="username" class="loginInput">
              <div class="itemFlex">
                <el-input v-model="ruleForm.username" placeholder="请输入员工编号或手机号" maxlength="20"></el-input>
              </div>
            </el-form-item>
            <el-form-item prop="password">
              <div class="itemFlex">
                <el-input class="loginInput" type="password" placeholder="请输入密码" maxlength="20"
                  v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
              </div>
            </el-form-item>
            <div class="login-btn">
              <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            </div>
            <p style="font-size:14px;line-height:30px;color:#999;"></p>
          </el-form>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
  import router from "../router/index";
  export default {
    name: "signin",
    data() {
      return {
        loading: false,
        typeList: [{
          label: '运营商',
          value: 1
        }, {
          label: '代理商',
          value: 2
        }],
        usertype: 0,
        ruleForm: {
          usertype: '1',
          username: sessionStorage.getItem("usernameInfo") ?
            sessionStorage.getItem("usernameInfo") : "",
          password: sessionStorage.getItem("passwordInfo") ?
            sessionStorage.getItem("passwordInfo") : ""
        },
        rules: {
          usertype: [{
            required: true,
            message: "请选择账户类型",
            trigger: "blur"
          }],
          username: [{
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }],
          password: [{
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }]
        },
        isMemery: false
      };
    },
    methods: {
      selectTypeFun(item, index) {
        this.usertype = index;
      },
      submitForm(formName) {

        this.$refs[formName].validate(valid => {
          if (valid) {
            this.loading = true;
            this.loginFun(this.usertype + 1, this.ruleForm.username, this.ruleForm.password);
          } else {
            this.loading = false;
            return false;
          }
        });
      },
      async loginFun(loginType, account, password) {
        let that = this;
        this.loading = true;
        let params = {
          loginType,
          account,
          password
        };
        let [err, res] = await this.api_post(
          "index/login",
          params
        );

        if (err != null) {
          this.$message.error('请输入正确的手机号或密码')
          this.loading = false;
          return false;
        }
        let objData = res.data.data;
        sessionStorage.setItem("loginInfo", JSON.stringify(objData));
        sessionStorage.setItem("webToken", objData.webToken);

        //动态设置标题log
        let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = objData.photoIcoUrl;
        document.getElementsByTagName('head')[0].appendChild(link);


        that.$router.push("/index");
      },

    },
    watch: {
      isMemery(n, o) {
        if (n) {
          sessionStorage.userInfo = this.form.name;
          sessionStorage.passwordInfo = this.form.password;
        } else {
          sessionStorage.removeItem("userInfo");
          sessionStorage.removeItem("passwordInfo");
        }
      }
    }
  };
</script>
<style scoped>
  .login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background: #0b101b;
  }

  .ms-title {
    position: absolute;
    top: 50%;
    width: 100%;
    margin-top: -230px;
    text-align: center;
    font-size: 30px;
    color: #fff;
  }

  .ms-login {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 800px;
    height: 500px;
    margin: auto auto;
    /* border-radius: 8px; */
    /* background: red; */

  }

  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    width: 100%;
    height: 100px;
  }

  .title img {
    width: 121.6px;
    height: 32px;
  }

  .title h2 {
    margin-left: 30px;
    color: #fff;
    font-size: 35px;
  }

  .bottom {
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    width: 100%;
    height: 400px;
  }

  .loginLeft {
    /* width: 343px; 
    height: 347px;
    */
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    width: 396px;
    height: 400px;
  }

  .loginLeft img {
    width: 100%;
    height: 100%;
  }

  .loginRight {
    width: 400px;
    height: 100%;
    background: #fff;
    /* background: #eee; */
    border-bottom-right-radius: 8px;
    border-top-right-radius: 8px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
  }

  .loginRight .selectType {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 64px;
    margin-bottom: 60px;
    border-top-right-radius: 8px;
    cursor: pointer;
    background: #F5F5F5;
  }

  .loginRight .selectType span {
    display: inline-block;
    width: 50%;
    height: 100%;
    color: #999;
    font: 500 18px "PingFangSC-Medium";
    text-align: center;
    line-height: 64px;
  }

  .loginRight .selectType span:nth-child(2) {
    border-top-right-radius: 8px;
  }


  .loginRight .selectType span.active {
    background: #1A6EFF;
    color: #fff;

  }

  .loginRight .loginRightimg img {
    /* width: 160px; */
    width: 145px;
    margin-bottom: 50px;
  }

  .logologin img {
    width: 160px;
    margin-bottom: 30px;
  }

  .itemFlex {
    justify-content: flex-start;
    align-items: center;
    align-content: center;
    width: 280px;
  }

  .el-input {
    margin: 0 0 5px 5px;
    width: 100%;
  }

  .login-btn {
    text-align: center;
  }

  .login-btn button {
    width: 100%;
    height: 50px;
    font-size: 16px;
  }

  .languageLogin {
    height: 50px;
    display: flex;
    /* justify-content:center; */
    align-items: center;
    font-size: 13px;
    margin-top: 30px;
    color: #999;
  }

  .languageLogin span {
    margin-bottom: 2px;
  }

  .languageLogin .radio {
    height: 100%;
    display: flex;
    align-items: center;
    margin-left: 10px;
  }

  .el-radio__label {
    padding-left: 5px !important;
  }

  .el-radio+.el-radio {
    margin-left: 15px;
  }
</style>