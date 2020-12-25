import Vue from 'vue'
import { Button ,Form,FormItem,Input,Message} from 'element-ui'

Vue.use(Button).use(Form).use(FormItem).use(Input)
// 消息提示需要全局挂载
Vue.prototype.$message = Message