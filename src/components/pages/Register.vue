<template>
    <div>
        <van-nav-bar title="用户注册" left-text="返回" left-arrow @click-left="goBack"></van-nav-bar>
        <div class="register-pannel">
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

            <div class="register-button">
                <van-button type="primary" size="large" @click="registerAction" :loading="openLoading"> 注 册 </van-button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import url from '@/apiConfig.js'
    export default {
        data() {
            return {
                userName: '',
                password: '',
                openLoading: false,
                userNameErrorMsg: '',// 用户名错误提示，
                passwdErrorMsg: '',// 密码错误提示
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1)
            },
            registerAction() {
                this.checkForm() && this.doRegisterUser()
            },
            doRegisterUser() {
                this.openLoading = true
                axios({ 
                    url: url.registerUser,
                    method: 'post',
                    data: {
                        userName: this.userName,
                        password: this.password
                    }
                }).then(res => {
                    console.log(res)
                    if (res.data.code === 200) {
                        this.$toast(res.data.message)
                        this.$router.push('/')
                    } else {
                        console.log(res.data.message)
                        this.openLoading = false
                        this.$toast.fail('注册失败')
                    }
                }).catch(err => { 
                    console.log(err)
                    this.openLoading = false
                })
            },
            /**
             * 表单验证
             */
            checkForm() {
                let isOk = true
                if (this.userName.length < 3) {
                    this.userNameErrorMsg = '用户名不能少于3位'
                    isOk = false
                } else {
                    this.userNameErrorMsg = ''
                }
                if (this.password.length < 5) {
                    this.passwdErrorMsg = '密码不能少于6位'
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
.register-pannel{
    width: 98%;
    border-radius: 5px;
    margin: 20px auto;
    padding-bottom: 80px;
    .register-button{
        padding-top: 10px;
    }
}
</style>