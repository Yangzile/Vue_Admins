import Vue from 'vue'
import { Button, Input, Message, Form, FormItem } from 'element-ui'



Vue.use(Button).use(Form).use(FormItem).use(Input)
// 把Message挂载到全局,可以通过this.$message引用
Vue.prototype.$message = Message