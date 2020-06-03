import Vue from "vue";
import Vuex from "vuex";
import { asyncRouterMap, constantRouterMap } from "../router";

Vue.use(Vuex);

function hasPermission(roles, route) {
  if (route.meta && route.meta.role) {
      console.log(roles);
      console.log(roles.some((role) => route.meta.role.indexOf(role) >= 0));
      
    return roles.some((role) => route.meta.role.indexOf(role) >= 0);
  } else {
    return true;
  }
}

export default new Vuex.Store({
  state: {
    routers: constantRouterMap,
    roles: "",
    addRouters: [],
    getsidebar: false
  },
  getters: {
    routers(state){
        return state.routers;
    },
    roles(state) {
      return state.roles;
    },
    addRouters(state) {
        return state.addRouters;
    },
    getsidebar(state) {
        return state.getsidebar;
    }
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      console.log(constantRouterMap);
      console.log(routers);
      state.routers = constantRouterMap.concat(routers);
    },
    SET_ROLES: (state,roles) => {
        state.roles = roles;
    },
    SET_GETSIDEBAR: (state,getsidebar) => {
        state.getsidebar = getsidebar;
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise((resolve) => {
        const { roles } = data;
        
        const accessedRouters = asyncRouterMap.filter((v) => {
          if (roles.indexOf("admin") >= 0) return true;
          if (hasPermission(roles, v)) {
            if (v.children && v.children.length > 0) {
              v.children = v.children.filter((child) => {
                if (hasPermission(roles, child)) {
                  return child;
                }
                return false;
              });
              return v;
            } else {
              return v;
            }
          }
          return false;
        });
        commit("SET_ROUTERS", accessedRouters);
        commit("SET_ROLES",data);
        resolve();
      });
    },
  },
  modules: {},
});
