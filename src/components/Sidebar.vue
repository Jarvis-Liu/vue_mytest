<template>
  <div>
    <el-menu
      :default-active="$route.path"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      mode="vertical"
      router
      :collapse="isCollapse"
    >
      <sidebar-item :menu="getrouters" />
    </el-menu>
  </div>
</template>

<script>
import { asyncRouterMap, commontRouterMap } from "@/router";
export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters(["getsidebar"]),
    isCollapse() {//是否折叠
      return !this.getsidebar.opened;
    },
    getrouters() { //路由表
      return commontRouterMap.concat(asyncRouterMap);
    }
  }
};
</script>
<style></style>

