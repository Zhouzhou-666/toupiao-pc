<template>
  <div class="login-container">
    <div class="login-form-wrap">
      <div class="login-head">
        <div class="login"></div>
      </div>

      <el-form class="login-form" ref="login-form" :model="user" :rules="formRules">
        <el-form-item prop="mobile">
          <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
        </el-form-item>
        <el-form-item prop="agree">
          <el-checkbox v-model="user.agree">
            我已阅读并同意用户协议和隐私条款
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" type="primary" @click="onLogin" :loading="loginLoading">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '../../api/user'

export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '13922222222', // 手机号
        code: '246810', // 验证码
        agree: '' // 是否同意协议
      },
      checked: false, // 是否同意协议的选中状态
      loginLoading: false,
      formRules: {
        // 表单验证规则配置
        // 要验证的数据名称：规则列表[]
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'change' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确的号码格式', trigger: 'change' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'change' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码格式' }
        ],
        agree: [
          {
            // 自定义校验规则：https://element.eleme.cn/#/zh-CN/component/form#zi-ding-yi-xiao-yan-gui-ze
            // 验证通过：callback()
            // 验证失败：callback(new Error('错误消息'))
            validator: (rule, value, callback) => {
              if (value) {
                callback()
              } else {
                callback(new Error('请同意用户协议'))
              }
            },
            // message: '请勾选同意用户协议',
            trigger: 'change'
          }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onLogin () {
      this.$refs['login-form'].validate(valid => {
        if (!valid) {
          return
        }
        this.login()
      })
    },
    login () {
      this.loginLoading = true

      login(this.user).then(res => {
        //登录成功
        this.$message({
          message: '登录成功',
          type: 'success'
        })
        this.$router.push('/')
        this.loginLoading = false
        // window.localStorage.setItem('user',JSON.stringify(res.data.data))
      }).catch(err =>{
        console.log('登录失败',err)
        this.$message.error('登录失败，手机号或验证码错误')

        this.loginLoading = false
      })
    }
  }
}
</script>

<style scoped lang="less">
  .login-container{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url("bg.jpg") no-repeat;
    background-size: cover;
    .login-form {
      .login-btn {
        width: 100%;
      }
    }
  }
</style>
