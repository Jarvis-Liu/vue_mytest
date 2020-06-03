import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Admin from "../views/Admin.vue";
import User from "../views/User.vue";
import NotFound from "../views/404.vue";
import AboutDetail from "../views/AboutDetail.vue";
import AdminDetail from "../views/AdminDetail.vue";
import UserControl from "../views/UserControl";
import UserDetail from "../views/UserDetail";

Vue.use(VueRouter);

const defaultParent = {
  template: "<div><router-view/></div>",
};

export const constantRouterMap = [
  {
    path: "/",
    name: "Home",
    hidden: true,
    meta: {
      title: "首页",
    },
    component: Home,
  },
  {
    path: "/index",
    hidden: true,
    redirect: "/",
  },
  {
    path: "/ab",
    meta: {
      title: "相关信息",
      icon: "el-icon-s-help",
    },
    component: defaultParent,
    redirect: "/ab/about",
    children: [
      {
        path: "about",
        name: "About",
        meta: {
          title: "关于",
          icon: "el-icon-s-help",
        },
        component: About,
      },
      {
        path: "aboutDetail",
        name: "AboutDetail",
        meta: {
          title: "关于详情",
        },
        component: AboutDetail,
      },
    ],
  },
  {
    path: "/404",
    name: "NotFound",
    meta: {
      title: "404",
    },
    component: NotFound,
    hidden: true,
  },
];

export const asyncRouterMap = [
  {
    path: "/admin",
    name: "Admin",
    meta: {
      role: ["admin"],
      title: "管理项",
      icon: "el-icon-s-check",
    },
    redirect: "/admin/index",
    component: defaultParent,
    children: [
      {
        path: "index",
        name: "Admin",
        meta: {
          role: ["admin"],
          title: "管理",
        },
        component: Admin,
      },
      {
        path: "adminDetail",
        name: "AdminDetail",
        meta: {
          role: ["admin"],
          title: "管理详情",
        },
        component: defaultParent,
        redirect: "/adminDetail/index",
        children: [
            {
                path: "index",
                name: "AdminDetail",
                meta: {
                role: ["admin"],
                title: "管理详情",
                },
                component: AdminDetail,
            },
            {
                path: "userControl",
                name: "UserControl",
                meta: {
                role: ["admin"],
                title: "用户管理",
                },
                component: UserControl,
            }
        ]
      }
    ],
  },
  {
    path: "/user",
    name: "User",
    meta: {
      role: ["admin", "user"],
      title: "用户项",
      icon: "el-icon-s-custom",
    },
    component: defaultParent,
    redirect: "/user/index",
    children: [
      {
        path: "index",
        name: "User",
        meta: {
          role: ["admin", "user"],
          title: "用户",
        },
        component: User
      },{
        path: "userDetail",
        name: "UserDetail",
        meta: {
          role: ["admin", "user"],
          title: "用户详情",
        },
        component: UserDetail
      },
    ],
  },
  {
    path: "/control/userControl",
    name: "UserControl",
    meta: {
      role: ["admin"],
      title: "用户管理",
      icon: "el-icon-s-tools"
    },
    component: UserControl,
  },
  { path: "*", redirect: "/404", hidden: true },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: constantRouterMap,
});

export default router;
