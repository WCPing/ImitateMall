<template>
    <div>
        <van-nav-bar title="登录" left-text="返回" left-arrow @click-left="goBack"></van-nav-bar>
        <div class="login-pannel">
            <van-field label="用户名" 
                       icon="clear"
                       placeholder="请输入用户名" 
                       required
                       v-model="userName"
                       @click-icon="userName = ''"
                       :error-message="userNameErrorMsg">
            </van-field>

            <van-field label="密码" 
                       type="password"
                       placeholder="请输入密码" 
                       required
                       v-model="password"
                       :error-message="passwdErrorMsg">
            </van-field>

            <div class="login-button">
                <van-button type="primary" size="large" @click="loginAction" :loading="loading"> 登 录 </van-button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import url from '@/apiConfig.js'
import { setTimeout } from 'timers';
    export default {
        data() {
            return {
                userName: '',
                password: '',
                userNameErrorMsg: '',// 用户名错误提示，
                passwdErrorMsg: '',// 密码错误提示,
                loading: false
            }
        },
        created() {
            if (localStorage.userInfo) {
                this.$toast('你已登录')
                this.$router.push('/')
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1)
            },
            loginAction() {
                this.checkForm() && this.dologinUser()
            },
            dologinUser() {
                axios({ 
                    url: url.login,
                    method: 'post',
                    data: {
                        userName: this.userName,
                        password: this.password
                    }
                }).then(res => {
                    console.log(res)
                    this.loading = false
                    if (res.data.code === 200 && res.data.message) {
                        new Promise((resolve, reject) => {
                            localStorage.setItem('userInfo', JSON.stringify({userName: this.userName}))
                            setTimeout(() => {resolve()}, 500)
                        }).then(() => {
                            this.$router.push('/')
                            this.$toast('登录成功')
                        }).catch(err => {
                            this.$toast('登录状态保存失败')
                        })
                        
                    } else {
                        this.$toast.fail('登录失败')
                        this.loading = false
                    }
                }).catch(err => { 
                    console.log(err)
                    this.$toast.fail('登录失败')
                    this.loading = false
                })
            },
            /**
             * 表单验证
             */
            checkForm() {
                let isOk = true
                if (this.userName === '') {
                    this.userNameErrorMsg = '用户名不能为空'
                    isOk = false
                } else {
                    this.userNameErrorMsg = ''
                }
                if (this.password.length < 5) {
                    this.passwdErrorMsg = '密码不能为空'
                    isOk = false
                } else {
                    this.passwdErrorMsg = ''
                }
                return isOk
            }
        }
    }
</script>

<style lang="scss" scoped>
.login-pannel{
    width: 98%;
    border-radius: 5px;
    margin: 20px auto;
    padding-bottom: 80px;
    .login-button{
        padding-top: 10px;
    }
}
</style>