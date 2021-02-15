<template>
  <el-container class="layout-container">
    <el-aside
      width="auto"
      class="aside"
    >
      <AppAside :is-collapse="isCollapse" class="aside-menu"/>
    </el-aside>
    <el-container>
      <el-header class="header">
        <div>
          <i :class="{
            'el-icon-s-fold': isCollapse,
            'el-icon-s-unfold': !isCollapse
          }"
             @click="isCollapse = !isCollapse"
          ></i>
          <span>江苏传智播客科技教育有限公司</span>
        </div>
        <el-dropdown>
          <div class="avatar-wrap">
            <img class="avatar" :src="user.photo" alt="">
            <span>{{user.name}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item @click.native="onLogout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main class="main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import AppAside from './components/aside'
  import {getUserProfile} from "../../api/user";
  export default {
    name: "LayoutIndex",
    components:{
      AppAside,
    },
    data(){
      return{
        user:{},
        isCollapse: false
      }
    },
    created() {
      this.loadUserProfile()
    },
    methods:{
      loadUserProfile(){
        getUserProfile().then(res => {
          console.log(res)
          this.user = res.data.data
        })
      },
      onLogout(){
        this.$confirm('确认退出吗?','退出提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // window.localStorage.removeItem('user')
          this.$router.push('/login')
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          })
        })


      }
    }
  }
</script>

<style scoped lang="less">
  .layout-container{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
  .aside {
    background-color: #d3dce6;
    .aside-menu{
      height: 100%;
    }
  }

  .header {
    background-color: #b3c0d1;
  }

  .main {
    background-color: #e9eef3;
  }
  .header{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    .avatar-wrap {
      display: flex;
      align-items: center;
      .avatar {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 10px;
      }
    }
  }

</style>
