<template>
  <div id="app">
    <button type="info" @click="outlogin()">tu出</button>
  </div>
</template>


<style lang="less" scoped>

</style>


<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    // 退出登录,清空sessionStorage,重定向到登录页面
    outlogin () {
      window.sessionStorage.clear();
      this.$router.push('/login');
    }
  }
}
</script>