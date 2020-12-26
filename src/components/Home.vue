<template>
  <el-container class="home_container">
    <!-- 头部导航 -->
    <el-header class="heder">
      <div class="heder_title">
        <!-- logo图片 -->
        <img src="../assets/img/heima.png" alt="" class="logo" />
        <span>电商后台管理系统</span>
      </div>
      <!-- 退出登录 -->
      <el-button type="info" @click="outlogin()">退出</el-button>
    </el-header>
    <!-- 侧边栏 -->
    <el-container>
      <el-aside width="200px">
        <!-- 侧边栏长菜单项 -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <!-- 一级菜单 -->
          <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id">
            <!-- 一级菜单模板 -->
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-location"></i>
              <!-- 文字 -->
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item :index="itemSon.id" v-for="itemSon in item.children">
              <!-- 二级菜单模板 -->
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-location"></i>
                <!-- 文字 -->
                <span>{{itemSon.authName}}</span>
              </template>
            </el-menu-item>
            </el-menu-item>
          </el-submenu>

        </el-menu>
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>


<style lang="less" scoped>
.el-header {
  background-color: #373d41;
}
.el-aside {
  background-color: #333744;
}
.el-main {
  background-color: #eaeaea;
}
.home_container {
  width: 100%;
  height: 100%;
}
.heder {
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
}
.heder_title {
  display: flex;
  align-items: center;
  color: #ffff;
  img {
    margin: 0 10px;
  }
}
</style>


<script>
export default {
  data() {
    return {
      menulist: [],
    };
  },
  methods: {
    // 退出登录,清空sessionStorage,重定向到登录页面
    outlogin() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    // 获取侧边菜单数据
    async getMenuList() {
      const { data: res } = await this.$http.get("menus");
      console.log("res :>> ", res);
      if (res.meta.status !== 200) return this.$message.error("错误");
      this.menulist = res.data;
    },
  },
  created() {
    this.getMenuList();
  },
};
</script>