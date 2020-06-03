<template>
  <div class="home">
      <Nav></Nav>
    home
    <router-link to="about">关于</router-link>
    <router-link to="admin">管理员</router-link>
    <router-link to="user">一般用户</router-link>
    <el-input v-model="role" placeholder="请输入内容" @keyup.enter.native="setRole" class="roleInp" :clearable=true>
        <el-button slot="append" icon="el-icon-edit" @click="setRole"></el-button>
    </el-input>
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue'

export default {
  name: 'Home',
  data() {
      return {
          role: ""
      }
  },
  components: {
    Nav
  },
  methods: {
      getRole() {
          var role = localStorage.getItem("role");
          if(role) {
              console.log("拿到");
              this.role = role
          }else {
              console.log("没有获取到");
              
          }
      },
      setRole() {
          localStorage.setItem("role",this.role);
          console.log("写入成功");
          
      }
  },
  mounted() {
      this.getRole();
  }
}
</script>
<style lang="stylus" scoped>
.roleInp {
    width 200px
}
</style>
