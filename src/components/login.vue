<template>
  <div class="login_content">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="" />
      </div>
      <!-- 表单区域 -->
      <el-form
        ref="loginFormRef"
        class="login_form"
        :model="loginform"
        :rules="loginFormRules"
      >
        <!-- 账号区域 -->
        <el-form-item label="账号" label-width="60px" prop="username">
          <el-input
            v-model="loginform.username"
            placeholder="请输入内容"
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <!-- 密码区域 -->
        <el-form-item label="密码" label-width="60px" prop="password">
          <el-input
            v-model="loginform.password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            show-password
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login()" round>登录</el-button>
          <el-button type="info" @click="resetloginform()" round
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginform: {
        username: 'admin',
        password: '123456',
      },
      loginFormRules: {
        // 验证密码和用户名是否合法
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' },
          {
            min: 6,
            max: 15,
            message: '长度在 6 到 15 个字符',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    resetloginform() {
      // console.log('this :>> ', this)
      // 重置使用ref设置表单的引用对象（loginFormRef），然后用this.$refs,调用自带的方法resetFields
      this.$refs.loginFormRef.resetFields()
    },
    login () {
      // 表单的预验证  validate方法中的回调函数获得验证结果
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return
        const { data: res } = await this.$http.post('login', this.loginform)
        // console.log('res :>> ', res);
        if (res.meta.status !== 200) return this.$message.error('登录失败！')
        this.$message.success('登录成功')
        console.log('res :>> ', res)
        window.sessionStorage.setItem('token', res.data.token)
        this.$router.push('/home')
      })
    },
  },
}
</script>

<style lang="less"scoped>
.login_content {
  height: 100%;
  background-color: #2b4b6b;
}

.login_box {
  background-color: #fff;
  width: 450px;
  height: 300px;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.avatar_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #eee;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}
.btns {
  display: flex;
  justify-content: center;
  align-content: center;
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 0 50px;
}
</style>
