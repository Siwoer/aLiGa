<script>
// 1.导入账号管理图标 2.导入首页图标
import { UserFilled,HomeFilled } from "@element-plus/icons-vue"

// 导入routes
import { routes } from '../router/index'
// import { formContextKey } from "element-plus"

// 导入vuex
import { mapState } from 'vuex'

export default {
  name:'AsideCom',
  data (){
    return {
      color:'#409eff',
      routes:routes[0].children
    }
  },
  computed :{
    //通过mapstate 拿到全局状态中的userInfo
    // ...mapState(['userInfo'])
    ...mapState(['userInfo',
    'currentPath']),

    // 
    menus () {
      return this.userInfo.adminname == 'admin' ? this.routes : this.userInfo.checkedkeys
    }
  },
  mounted(){

  },
  props:['collapse'],
  components:{
    UserFilled,
    HomeFilled,
  
  }
}
</script>

<template>
  <el-menu router :collapse="collapse" active-text-color="#ffd04c" background-color="#rgb(164, 238, 220)" class="el-menu-vertical-demo" :default-active="currentPath" text-color="#fff">
    <el-menu-item>
      <el-icon size="24px">
        <HomeFilled />
      </el-icon>
      <span>首页</span>
    </el-menu-item>

<el-sub-menu v-for="item in menus" :key="item.path" :index="'/' + item.path">
      <template #title>
        <el-icon size="24px">
            <UserFilled />
        </el-icon>
        <span>{{ item.label }}</span>
      </template>
      <el-menu-item v-for="child in item.children" :key="child.path" :index=" `/${item.path}/${child.path}`">{{ child.label }}</el-menu-item>


      <!-- <el-menu-item :index="'/' + item.children.path">用户列表</el-menu-item> -->


    </el-sub-menu>

    <!-- 账号管理 -->
    <!-- <el-sub-menu index="/manager">
      <template #title>
        <el-icon size="24px">
            <UserFilled />
        </el-icon>
        <span>账号管理</span>
      </template>
      <el-menu-item index="/manager/managerlist">管理员账号</el-menu-item>
      <el-menu-item index="/manager/userlist">用户列表</el-menu-item>
    </el-sub-menu> -->

    <!-- 轮播图管理 -->
    <!-- <el-sub-menu index="/banner">
      <template #title>
        <el-icon size="24px">
            <UserFilled />
        </el-icon>
        <span>轮播图管理</span>
      </template>
      <el-menu-item index="/banner/bannerlist">轮播图列表</el-menu-item>
      <el-menu-item index="/banner/addbanner">添加轮播图</el-menu-item>
    </el-sub-menu> -->




  </el-menu>


</template> 


