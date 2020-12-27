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
      <el-aside :width="isCollapse ? '64px':'200px'">
        <div class="toggle-button" @click="togglebtn()">|||</div>
        <!-- 侧边栏长菜单项 -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409eff"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router  
          :default-active="activePath"
        >
        <!-- 开启路由跳转模式，index写的地址 -->
          <!-- 一级菜单 -->
          <el-submenu :index="item.id+''" v-for="item in menulist" :key="item.id">
            <!-- 一级菜单模板 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconslist[item.id]"></i>
              <!-- 文字 -->
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item :index="'/'+itemSon.path" v-for="itemSon in item.children"
            @click="savePath(itemSon.path)"
            >
              <!-- 二级菜单模板 -->
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文字 -->
                <span>{{itemSon.authName}}</span>
              </template>
            </el-menu-item>
            </el-menu-item>
          </el-submenu>

        </el-menu>
      </el-aside>
      <el-main>
        <!-- 主要内容区域 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>


<style lang="less" scoped>
.el-header {
  background-color: #373d41;
}
.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
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
.iconfont {
  margin-right: 10px;
}
.toggle-button {
  background-color: #333744;
  font-size: 10px;
  line-height: 24px;
  color: #ffff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>


<script>
export default {
  data() {
    return {
      menulist: [],
      iconslist: {
        125: "iconfont icon-users",
        103: "iconfont icon-tijikongjian",
        101: "iconfont icon-showpassword",
        102: "iconfont icon-danju",
        145: "iconfont icon-baobiao",
      },
      isCollapse: false,
      activePath: '',
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
      // console.log("res :>> ", res);
      if (res.meta.status !== 200) return this.$message.error("错误");
      this.menulist = res.data;
    },
    togglebtn() {
      this.isCollapse = !this.isCollapse;
    },
    savePath (path) {
      window.sessionStorage.setItem('activePath','/'+path);
      this.activePath = '/' + path;
      // console.log('this.activePath :>> ', this.activePath );
    }
  },
  created() {
    this.getMenuList();
    this.activePath = window.sessionStorage.getItem("activePath");
  },
};
</script>