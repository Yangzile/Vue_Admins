<template>
  <div>
    <!-- 导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card class="box-card">
      <!-- 搜索与添加用户区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            clearable
            placeholder="请输入内容"
            class="input-with-select"
            v-model="queryInfo.query"
            @clear="getUserlist"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUserlist"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="adduserbtn()">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表区域 -->
      <el-table stripe border :data="userlist" style="width: 100%">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="username" label="姓名"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <!-- 状态 -->
        <el-table-column label="状态" prop="mg_state">
          <!-- 作用插槽，scope是子组件传回来的参数 -->
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="userstateChanged(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-tooltip
              :enterable="false"
              effect="dark"
              content="修改"
              placement="top"
            >
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                circle
                @click="showUpdataDialog(scope.row.id)"
              ></el-button>
            </el-tooltip>
            <!-- 分配角色 -->
            <el-tooltip
              :enterable="false"
              effect="dark"
              content="分配角色"
              placement="top"
            >
              <el-button
                size="mini"
                type="warning"
                icon="el-icon-setting"
                circle
              ></el-button>
            </el-tooltip>
            <!-- 删除按钮 -->
            <el-tooltip
              :enterable="false"
              effect="dark"
              content="删除"
              placement="top"
            >
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                circle
                @click="removeUserById(scope.row.id)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <!-- layout数组显示功能结构 total（总条数） sizes(页大小选择) pager（页码值）jumper（输入跳转） -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <!-- 添加用户对话框 -->
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClose"
    >
      <!-- 主要内容 -->
      <el-form
        :model="addForm"
        :rules="addFromRules"
        ref="addFromRef"
        label-width="70px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部按钮区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogClose">取 消</el-button>
        <el-button type="primary" @click="adduser()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改用户对话框 -->
    <el-dialog
      title="修改用户"
      :visible.sync="updataDialogVisible"
      width="50%"
      :before-close="UpdataDialogClose"
    >
      <!-- 主要内容 -->
      <el-form
        :model="updataFrom"
        :rules="updataFromRules"
        ref="updataFromRef"
        label-width="70px"
      >
        <el-form-item label="用户ID">
          <el-input v-model="updataFrom.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="updataFrom.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="updataFrom.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="UpdataDialogClose()">取 消</el-button>
        <el-button type="primary" @click="updata()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    // 自定义验证邮箱规则
    // 1、先声明规则处理函数
    // 2、在规则中添加  validator: checkEmali(自定义名称)，进行规则的绑定
    var checkEmali = (rule, value, callback) => {
      const regmali = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/;
      if (regmali.test(value)) {
        return callback();
      }
      callback(new Error("请输入合法的邮箱"));
    };
    // 验证手机号规则
    var checkMobile = (rule, value, callback) => {
      const regmobile = /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/;
      if (regmobile.test(value)) {
        return callback();
      }
      callback(new Error("请输入合法的手机号"));
    };

    return {
      // 获取用户参数对象
      queryInfo: {
        query: "",
        // 当前页数
        pagenum: 1,
        // 一页多少条数据
        pagesize: 2,
      },
      userlist: [],
      total: 0,
      // 添加用户对话框的显示已隐藏
      addDialogVisible: false,
      // 修改对话框对话框的显示已隐藏
      updataDialogVisible: false,
      // 添加用户表单数据
      // 数据名字和表单规则名字要一样username
      addForm: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      //添加用户表单规则
      addFromRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        // 自定义验证规则
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          { validator: checkEmali, trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" },
        ],
      },
      // 修改用户信息数据
      updataFrom: {},
      // 修改用户信息表单规则
      updataFromRules: {
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          { validator: checkEmali, trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" },
        ],
      },
    };
  },
  // 初始化加载数据
  created() {
    this.getUserlist();
  },
  methods: {
    // 更新加载用户列表信息
    async getUserlist() {
      const { data: res } = await this.$http.get("users", {
        params: this.queryInfo,
      });
      // console.log('object :>> ', res);
      if (res.meta.status !== 200) return this.$message("获取用户列表失败");
      this.userlist = res.data.users;
      this.total = res.data.total;
      // console.log("this.userlist :>> ", this.userlist);
    },
    // 监听页码大小改变事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getUserlist();
    },
    // 监听页码值改变事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getUserlist();
    },
    // 监听开关的事件
    async userstateChanged(userinfo) {
      // console.log('data :>> ', data);
      const { data: res } = await this.$http.put(
        `users/${userinfo.id}/state/${userinfo.mg_state}`
      );
      if (res.meta.status !== 200) {
        userinfo.mg_state = !userinfo.mg_state;
        return this.$message.error("更新用户失败");
      }
      this.$message.success("更新用户成功");
    },
    // 控制对话框的显示
    adduserbtn() {
      this.addDialogVisible = true;
    },
    // 监听对话框关闭事件
    addDialogClose() {
      // 重置表单,通过ref获取对象,调用resetFields函数
      this.$refs.addFromRef.resetFields();
      this.addDialogVisible = false;
    },
    // 添加用户
    adduser() {
      // 表单预校验
      this.$refs.addFromRef.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http.post("users", this.addForm);
        if (res.meta.status !== 201)
          return this.$message.error("添加用户失败!");
        this.$message.success("添加用户成功!");
        this.addDialogVisible = false;
        this.getUserlist();
      });
    },
    // 弹出修改对话框
    async showUpdataDialog(id) {
      this.updataDialogVisible = true;
      const { data: res } = await this.$http.get("users/" + id);
      if (res.meta.status !== 200)
        return this.$message.error("获取用户数据失败");
      this.updataFrom = res.data;
      console.log("this.updataFrom :>> ", this.updataFrom);
    },
    // 监听关闭的事件修改用户对话框
    UpdataDialogClose() {
      this.$refs.updataFromRef.resetFields();
      this.updataDialogVisible = false;
    },
    // 发起请求更新数据库,修改用户数据
    updata() {
      // 表单预校验
      this.$refs.updataFromRef.validate(async (valid) => {
        if (!valid) return;
        var params = {
          mobile: this.updataFrom.mobile,
          email: this.updataFrom.email,
        };
        const { data: res } = await this.$http.put(
          "users/" + this.updataFrom.id,
          params
        );

        // 更新数据库后的提示
        if (res.meta.status !== 200)
          return this.$message.error("更新用户信息失败");
        this.updataDialogVisible = false;
        this.getUserlist();
        this.$message.success("修改用户成功!");
      });
    },
    // 根据ID删除用户信息id
    async removeUserById(id) {
      const confirmRes = await this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
      // var p =this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).catch(err => err)
        // .then(() => {
        //   this.$message({
        //     type: "success",
        //     message: "删除成功!",
        //   });
        // })
        // .catch(() => {
        //   this.$message({
        //     type: "info",
        //     message: "已取消删除",
        //   });
        // });
        console.log('confirmRes :>> ', confirmRes);
        // 如果用户确认删除,则返回值为字符串confirm
        // 如果用户取消删除,则返回值为字符串cancel
        if(confirmRes !== 'confirm') {
          return this.$message.info("已经取消删除")
        }

       const { data : res } = await this.$http.delete('users/'+ id );
      if(res.meta.status !== 200 )  return this.$message.error("删除用户信息失败");
      this.getUserlist();
      this.$message.success("删除用户信息成功");
    },
  },
};
</script>
<style lang="less" scoped>
.el-table {
  margin-top: 15px;
  font-size: 12px;
}
</style>