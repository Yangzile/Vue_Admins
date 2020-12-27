import Vue from 'vue'
import { Dialog,Pagination,Tooltip,Switch,TableColumn,Table,Col,Row,Card,BreadcrumbItem,Breadcrumb,MenuItem ,MenuItemGroup,Submenu,Menu, Button, Form, FormItem, Input, Message, Container, Header, Aside, Main } from 'element-ui'
import { MessageBox } from 'element-ui';
Vue.use(Dialog).use(Pagination).use(Tooltip).use(Switch).use(TableColumn).use(Table).use(Col).use(Row).use(Card).use(BreadcrumbItem).use(Breadcrumb).use(MenuItem).use(MenuItemGroup).use(Submenu).use(Menu).use(Button).use(Form).use(FormItem).use(Input).use(Container).use(Header).use(Aside).use(Main)
// 消息提示需要全局挂载
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm