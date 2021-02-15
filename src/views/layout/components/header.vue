<template>
  <div class="header-container">

  </div>
</template>

<script>
  import { getUserProfile } from "../../../api/user";

  export default {
    name: "AppHeader",
    data(){
      return{
        user:{},
      }
    },
    created() {
      this.loadUserProfile()
    },
    methods:{
      loadUserProfile(){
        getUserProfile().then(res => {
          this.user = res.data.data
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .header-container{


  }
</style>
