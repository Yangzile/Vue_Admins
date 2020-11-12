<template>
  <div>
    <el-button type="info" @click="loginout()">推出</el-button>
  </div>
</template>
<script>
export default {
  methods: {
    // 退出登录，清空token，重定向到login
    loginout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
  },
}
</script>
<style lang="less" scoped>
</style>