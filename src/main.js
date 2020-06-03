import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "../public/css/reset.css"
import api from './api'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.use(ElementUI);

Vue.config.productionTip = false
Vue.prototype.$api = api;

let whiteList = ["/","/404","/about"];

router.beforeEach((to, from, next) => {
    console.log("进入路由守卫");
    
    let role = localStorage.getItem("role");
    if (role) { // 判断是否有token
      if (to.path === '/') {
        next();
      } else {
        if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
            const roles = role.split(",");
            store.dispatch('GenerateRoutes', { roles }).then(() => { // 生成可访问的路由表
              router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
              next(to.path)
            //   next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
            })
          
        } else {
          next() //当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入404页面
        }
      }
    } else {
      if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
        next();
      } else {
        next("/404"); // 否则全部重定向到登录页
      }
    }
  });


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
