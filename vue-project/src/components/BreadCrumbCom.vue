<!-- 面包屑组件 -->
<script>
//导入面包屑组件
import { ArrowRight } from '@element-plus/icons-vue';

//导入路由规则
import { routes } from '@/router/index'

// 导入mapmutations
import { mapMutations } from 'vuex'
export default {
  data() {
    //用来记录所有路由 name 对应的 label
    // Map 是一个类似数组但是 是键值对的方式展示,其不能出现重复的东西
    this.routesMap = new Map()
    // 用来处理将路由规则 转换成 map 对象
    this.initRoutesMap(routes)
    return {
      list:[]
    }
  },
  methods:{
    ...mapMutations(['updateCurrentPath']),
    initRoutesMap (routes) {
      routes.forEach(route => {
        // 在 map中添加对象
        this.routesMap.set(route.name,route.label)
        // 如果有子路由
        if(route.children) {
          this.initRoutesMap(route.children)
        }
      })
    }
  },
  mounted (){
    //$route 路由配置对象 不带r是用来查询路由信息的
    //¥router.push() 带r的是用来跳转路由页面用的
  },
  comments:{
    ArrowRight
  },
  watch:{
    $route:{
      // 非惰性
      immediate:true,
      handler(route){
        // 处理路由路径
        // console.log(route)

        this.updateCurrentPath(route.path)
       this.list = route.matched.map(item => {
        return {
          name: item.name,
          label: this.routesMap.get(item.name)
        }
        })
      }
    }
  }
}
</script>
<template>
  <el-breadcrumb separator=">">
    <!-- 根据当前页面的路由路径 来决定面包屑显示什么内容 -->
    <!-- <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
    <el-breadcrumb-item>promotion management</el-breadcrumb-item>
    <el-breadcrumb-item>promotion list</el-breadcrumb-item>
    <el-breadcrumb-item>promotion detail</el-breadcrumb-item> -->

    <el-breadcrumb-item v-for="item in list" :to="{ name: item.name}">{{ item.label }}</el-breadcrumb-item>


  </el-breadcrumb>
</template>
<style lang="scss" scoped>
.el-breadcrumb{
  padding-top: 10px;
  padding-left: 20px;
  background-color: rgb(223, 223, 180);
}
</style>