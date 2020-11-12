import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login.vue'
import Home from '../components/home.vue';

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {path:'/', redirect:'/login'},
    { path: '/login' , component: Login  },
    { path: '/home' , component: Home  }
  ]
})
// 挂载路由导航守卫  用于拦截非登录时进行的非法地址跳转

router.beforeEach((to,from,next)=>{

  if(to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if(!tokenStr) return next('/login')
  next()
  
})

export default router
