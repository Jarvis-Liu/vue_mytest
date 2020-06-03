<template>
  <div id="nav">
    <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group>
    <el-menu
        :default-active="$route.path"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
    >
    <template v-for="(item,index) in navList">
        <el-submenu :index="item.path" :key="index" v-if="item.children && !item.hidden">
            <template slot="title">
            <i :class="item.meta.icon"></i>
            <span slot="title">{{item.meta.title}}</span>
            </template>
            <el-menu-item-group >
                <template v-for="(item02,index02) in item.children">
                    <el-menu-item @click="goto(item.path + '/' + item02.path)" :key="index + index02" :index="item.path + '/' + item02.path">{{item02.meta.title}}</el-menu-item>
                </template>
            </el-menu-item-group>
        </el-submenu>
        <el-menu-item v-if="!item.children && typeof(item.hidden) != undefined && !item.hidden" @click="goto(item.path)" :key="index" :index="item.path">
            <i :class="item.meta.icon"></i>
            <span slot="title">{{item.meta.title}}</span>
        </el-menu-item>
    </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      isCollapse: true,
      navList: []
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    getNav() {
      this.$api.basic.getNav().then(res => {
        console.log(res);
      });
    },
    goto(path) {
        this.$router.push(path)
    }
  },
  created() {
      this.navList = this.$store.getters.routers;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
#nav {
    display inline-block
    position fixed
    left 0
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
