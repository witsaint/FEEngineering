<template>
<main>
  <el-row justify="center" align="middle" type="flex">
    <el-col class="card-box">
      <el-form label-width="70px" class="loginform" :rules="rules" :model="user" ref="user">
        <h3 class="title">人工催收系统</h3>
        <el-form-item prop="username" label="用户名">
          <el-input type="text" placeholder="用户名" autofocus
            @keyup.native.enter="login('user')"
            v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input type="password" placeholder="密码"
            @keyup.native.enter="login('user')"
            v-model="user.password"></el-input>
        </el-form-item>
        <!-- <el-form-item prop="password" label="验证码">
          <el-input type="password" placeholder="密码"
            @keyup.native.enter="login('user')"
            v-model="user.password"></el-input>
        </el-form-item> -->
        <el-form-item>
          <el-checkbox :checked="user.remember" v-model="user.remember">记住密码</el-checkbox>
          <el-checkbox :checked="user.autologin" v-model="user.autologin">下次自动登录</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" @click="login('user')">登录</el-button>
        </el-form-item>
      </el-form>
      <img :src="imgCode" alt="">
    </el-col>
  </el-row>
</main>
</template>

<script>
// import Vue from 'vue'
// import { Row, Col, Form, FormItem, Input, Button, Checkbox, MessageBox } from 'element-ui'
// import api from '@/utils/api'

// Vue.use(Row)
// Vue.use(Col)
// Vue.use(Form)
// Vue.use(FormItem)
// Vue.use(Input)
// Vue.use(Button)
// Vue.use(Checkbox)

// Vue.prototype.$msgbox = MessageBox

export default {
  name: 'login',
  data () {
    return {
      loading: false,
      imgCode: '',
      user: {
        username: '',
        password: '',
        remember: !!localStorage.getItem('remember'),
        autologin: !!localStorage.getItem('autologin')
      },
      rules: {
        username: [{
          required: true,
          message: '用户名不能为空！',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '密码不能为空！',
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    validationCodeServlet () {
//      api.validationCodeServlet().then(response => {
//        this.imgCode = response
//      }).catch()
    },
    setToken (data) {
      localStorage.token = data
    },
    remember_update (data) {
      localStorage.username = data.username
      if (data.remember) {
        localStorage.remember = true
        localStorage.password = data.password
      } else {
        localStorage.removeItem('remember')
        localStorage.removeItem('password')
      }
    },
    autologin_update (data) {
      if (data.autologin) {
        localStorage.autologin = true
      } else {
        localStorage.removeItem('autologin')
      }
    },
    login (ref) {
      this.$router.push('/')
//      this.$refs[ref].validate(valid => {
//        if (valid) {
//          this.loading = true
//          api.login(this.user).then(response => {
//            if (response.data.code === 200) {
//              this.setToken(+new Date())
//              if (this.user.autologin) {
//                this.autologin_update({ autologin: this.user.autologin })
//                this.user.remember = true
//              } else {
//                this.autologin_update({ autologin: false })
//              }
//              if (this.user.remember) {
//                this.remember_update({
//                  remember: this.user.remember,
//                  username: this.user.username,
//                  password: this.user.password
//                })
//              } else {
//                this.remember_update({
//                  username: this.user.username,
//                  remember: false
//                })
//              }
//              // let redirect = decodeURIComponent(this.$route.query.redirect || '/')
//              this.$router.push({
//                path: '/'
//              })
//            } else {
//              this.$msgbox({
//                title: '登陆失败！',
//                message: response.data.message
//              })
//            }
//            this.loading = false
//          })
//        }
//      })
    }
  },
  mounted () {
    this.validationCodeServlet()
    if (localStorage.getItem('username')) {
      this.user.username = localStorage.getItem('username')
    }
    if (this.user.remember) {
      this.user.username = localStorage.getItem('username')
      this.user.password = localStorage.getItem('password')
    }
    if (this.user.autologin) {
      this.login('user')
    }
  }
}
</script>

<style lang="less" scoped>
main {
  height: 100%;
  background: #1F2D3D;
  > div {
    height: 100%;
  }
  .card-box {
    width: 380px;
    box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);
    border-radius: 5px;
    background-clip: padding-box;
    margin-bottom: 20px;
    background-color: #F9FAFC;
    border: 2px solid #8492A6;
  }
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
   .loginform {
    padding: 35px 35px 15px 35px;
  }
}
</style>
