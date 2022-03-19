<template>
    <div class="login_container">
        <div class="login_box">
            <!-- 登录表单 -->
            <el-form ref="loginFormRef" :model="loginform" :rules="loginFormRules" label-width="0px" class="login_from">
                <!-- 用户名 -->
                <el-form-item prop="username">
                    <el-input v-model="loginform.username" prefix-icon="el-icon-s-custom"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="password">
                    <el-input type="password" v-model="loginform.password" prefix-icon="el-icon-key"></el-input>
                </el-form-item>
                <!-- 按钮 -->
                <el-form-item class="btns">
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button type="info">注册</el-button>
                    <el-button type="info" @click="resetLoginForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 这是登录表单的数据绑定对象
            loginform: {
                username: "admin",
                password: '123456',
            },
            // 这是表单的验证规则对象
            loginFormRules: {
                // 验证用户名是否合法
                username: [
                    { required: false,message: '请输入用户名称',trigger: 'blur'},
                    { min: 3,max: 10,message: '长度在 3 到 10 个字符',trigger: 'blur'}
                ],
                // 验证密码是否合法
                password: [
                    { required: true,message: '请输入正确的密码',trigger: 'blur'},
                    { min: 6,max: 15,message: '长度在 6 到 15 个字符',trigger: 'blur'}
                ]
            }
        }
    },
    methods: {
        // 点击重置表单元素
        resetLoginForm() {
            // console.log(this)
            this.$refs.loginFormRef.resetFields()
        },
        login() {
            this.$refs.loginFormRef.validate(async valid => {
                if (!valid) return
                const {data: res} = await this.$http.post('login',this.loginform)
                if (res.meta.status !== 200 ) return this.$message.error('登录失败了哦');
                this.$message.success('登录成功')
                // 将登录成功之后的 token，保存到客户端的 sessionStorage 中
                // 项目中出了登录之外的其他API接口，必须在登录之后才能访问
                // token 只应在当前网站打开期间生效，所以将 token 保存在 sessionStorage 中
                window.sessionStorage.setItem('token',res.data.token)
                // 通过编程式导航跳转到后台主页，路由地址是 /home
                this.$router.push('/home')
            })
        }
    }
}
</script>

<style lang="less" scoped>
.login_container {
    background-color: rgb(87, 230, 255);
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.login_box {
    height: 280px;
    width: 450px;
    background-color: rgba(240, 248, 255, 0.6);
    border-radius: 8%;
    display: flex;
    justify-content: center;
    align-content: center;
    // left: 50%;
    // top: 50%;
    // transform: translate(-50%,-50%);
}
.login_from {
    // position: relative;
    // bottom: 0;
    width: 100%;
    padding: 50px 20px;
    // box-sizing: border-box;
}
.btns {
    display: flex;
    justify-content: center;
}
</style>