import Vue from 'vue'
import { MenuItem ,MenuItemGroup,Submenu,Menu, Button, Form, FormItem, Input, Message, Container, Header, Aside, Main } from 'element-ui'

Vue.use(MenuItem).use(MenuItemGroup).use(Submenu).use(Menu).use(Button).use(Form).use(FormItem).use(Input).use(Container).use(Header).use(Aside).use(Main)
// 消息提示需要全局挂载
Vue.prototype.$message = Message