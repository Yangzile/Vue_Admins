import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login.vue'
import Home from '../components/Home.vue'


Vue.use(VueRouter)

const routes = [
  { path :'/', redirect : '/login'},
 { path : '/login', component: Login },
 { path : '/home', component: Home}
]

const router = new VueRouter({
  routes
})
// 挂载路由导航守卫,拦截非法请求
router.beforeEach(function(to, from, next) {
  // 请求登录也面就直接放行
  if(to.path ==='/login' ) return next();
  const tohenStr = window.sessionStorage.getItem('token');
  if( !tohenStr ) return next('/login');
  next();

  
})
export default router
