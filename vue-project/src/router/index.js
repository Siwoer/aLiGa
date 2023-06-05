import { createRouter, createWebHistory ,createWebHashHistory} from 'vue-router'
//导入 home 组件
import HomeView from '../views/HomeView.vue'

//导入 mangerindexview 
import MangerIndexView from '../views/manager/MangerIndexView.vue'

//导入 mangerlistview
import MangerListView from '../views/manager/MangerListView.vue'

//导入 userlistview
import UserListView from '../views/manager/UserListView.vue'

//导入 bannerindexview
import BannerIndexView from '../views/banner/BannerIndexView.vue'

//导入 bannerlistview
import BannerListView from '../views/banner/BannerListView.vue'

//导入 addbannerview 
import AddBannerView from '../views/banner/AddBannerView.vue'

//导入 proindexview
import ProIndexView from '../views/pro/ProIndexView.vue'

//导入 prolistview
import ProListView from '../views/pro/ProListView.vue'

//导入 proindexview
import AddProView from '../views/pro/AddProView.vue'

//导入 EChartsIndexView
import EChartsIndexView from '../views/echarts/EChartsIndexView.vue'

//导入 EChartsSHowView
import EChartsSHowView from '../views/echarts/EChartsSHowView.vue'

// 导入 EChartsView
import EChartsView  from '../views/echarts/EChartsView.vue'

//导入 ExcelIndexView
import ExcelIndexView from '../views/excel/ExcelIndexView.vue'

//导入 ExcelImportView
import ExcelImportView from '../views/excel/ExcelImportView.vue'

//导入 ExcelExportView
import ExcelExportView from '../views/excel/ExcelExportView.vue'

//导入 EditorIndexView
import EditorIndexView from '../views/editor/EditorIndexView.vue'

//导入 EditorShowView
import EditorShowView from '../views/editor/EditorShowView.vue'

//导入 MapIndexView
import MapIndexView from '../views/map/MapIndexView.vue'

//导入 MapShowView
import MapShowView from '../views/map/MapShowView.vue'

export const routes = [
  {
    path:'/',
    name:'home',
    component:HomeView,
    label:'首页',
    //二级路由
    children:[
      {
        path:'manager',
        name:'manager',
        label:'账号管理',
        component:MangerIndexView,
        children:[
          {
            path:'managerlist',
            name:'managerlist',
            label:'管理员列表',
            component:MangerListView
          },
          {
            path:'userlist',
            name:'userlist',
            label:'用户列表',
            component:UserListView
          },
        ]
      },
      {
        path:'banner',
        name:'banner',
        label:'轮播图管理',
        component:BannerIndexView,
        children:[
          {
            path:'bannerlist',
            name:'bannerlist',
            label:'轮播图列表',
            component:BannerListView
          },
          {
            path:'addbanner',
            name:'addbanner',
            label:'添加轮播图',
            component:AddBannerView
          }
        ]
      },
      {
        path:'pro',
        name:'pro',
        label:'商品管理',
        component:ProIndexView,
        children:[
          {
            path:'prolist',
            name:'prolist',
            label:'商品列表',
            component:ProListView
          },
          {
            path:'addpro',
            name:'addpro',
            label:'添加商品',
            component:AddProView
          }
        ]
      },
      {
        path:'echarts',
        name:'echarts',
        label:'图表管理',
        component:EChartsIndexView,
        children:[
          {
            path:'echartsshow',
            name:'echartsshow',
            label:'图表显示',
            component:EChartsSHowView
          },
          {
            path:'myecharts',
            name:'myecharts',
            label:'显示图表',
            component:EChartsView
          },
        ]
      },
      {
        path:'excel',
        name:'excel',
        label:'excel 管理',
        component:ExcelIndexView,
        children:[
          {
            path:'excelimport',
            name:'excelimport',
            label:'excel 导入',
            component:ExcelImportView
          },
          {
            path:'excelexport',
            name:'excelexport',
            label:'excel 导出',
            component:ExcelExportView
          },
        ]
      },
      {
        path:'editor',
        name:'editor',
        label:'富文本编辑器',
        component:EditorIndexView,
        children:[
          {
            path:'editorshow',
            name:'editorshow',
            label:'编辑器',
            component:EditorShowView
          }
        ]
      },
      {
        path:'map',
        name:'map',
        label:'地图管理',
        component:MapIndexView,
        children:[
          {
            path:'mapshowview',
            name:'mapshowview',
            label:'百度地图',
            component:MapShowView
          }
        ]
      }
    ]
  },
  {
    path:'/login',
    name:'login',
    component:() => import('../views/loginView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
  // : [
  //   {
  //     path: '/',
  //     name: 'home',
  //     component: HomeView
  //   },
  //   {
  //     path: '/login',
  //     name: 'login',
  //   //   // route level code-splitting
  //   //   // this generates a separate chunk (About.[hash].js) for this route
  //   //   // which is lazy-loaded when the route is visited.
  //     component: () => import('../views/loginView.vue')
  //   }
  // ]
})

export default router
