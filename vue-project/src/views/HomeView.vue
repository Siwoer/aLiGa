<script>
//导入logo
import ins from '@/assets/instagram.png'

//导入侧边栏
import AsideCom from '@/components/AsideCom.vue'


import { Fold, Expand, ArrowRightBold } from "@element-plus/icons-vue"

// 导入面包屑
import  BreadCrumbCom  from '@/components/BreadCrumbCom.vue'

export default {
  name: 'HomeView',
  data() {
    return {
      url: ins,
      collapse: false
    }
  },
  mounted(){
    if(!this.$store.state.userInfo.adminname){
      this.$router.push('/login')
    }
  },
  methods:{
    InfoOut(){
      this.$store.commit('updateUserInfo',{})
      this.$router.push('/login')
    },
    // Infologin(){
    //   this.$router.push('login')
    // }
  },
  computed: {
    headerLeft() {
      // 默认为false 则为Expand 展开
      return this.collapse ? 'Expand' : 'Fold'
    },
    asideWidth() {
      return this.collapse ? '60px' : '200px'
    }
  },
  components: {
    AsideCom,
    Fold,
    Expand,
    ArrowRightBold,
    BreadCrumbCom
}
}
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside>
        <!-- logo -->
        <div class="logo-box">
          <el-image :src="url"></el-image>
          <h2 v-show="!collapse" class="title">Instagram</h2>
        </div>

        <AsideCom :collapse="collapse" />
      </el-aside>

      <el-container>
        <el-header>
          <el-icon @click="collapse = !collapse" size="32px">
            <!-- <Fold /> -->
            <component :is="headerLeft"></component>
          </el-icon>
          <span v-if="this.$store.state.userInfo.adminname">
            欢迎  {{ $store.state.userInfo.adminname }}
            <!-- <button>退出登录</button> -->
            <el-button  type="info" @click="InfoOut">退出</el-button>
          </span>
          <el-button v-else type="info">请登录</el-button>
        </el-header>
        <BreadCrumbCom />
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>



<style scoped lang="scss">

.logo-box {
  height: 70px;
  display: flex;
  align-items: center;

  .el-image {
    width: 58px;
    height: 58px;
    margin-left: 2px;
  }

  .title {
    font-size: 24px;
    margin: auto;
    font-family: 'Nanum Myeongjo', serif;
  }
}

.el-aside {
  background-color: rgb(164, 238, 220);
  color: rgb(135, 164, 157);
  width: v-bind(asideWidth);
  // transition: all .2s;

  transition: width 0.15s;
  -webkit-transition: width 0.15s;
  -moz-transition: width 0.15s;
  -webkit-transition: width 0.15s;
  -o-transition: width 0.15s;

}

.el-header {
  background-color: rgb(119, 119, 160);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-main {
  background-color: rgb(223, 223, 180);
}

</style>
