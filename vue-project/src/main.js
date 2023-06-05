// 解构出 createApp
import { createApp } from 'vue'

// 导入根组件
import App from './App.vue'

// 导入路由配置
import router from './router'


import ElementPlus from 'element-plus'

// 导入 element-plus 样式文件
import 'element-plus/dist/index.css'

//重置样式引入
import 'normalize.css/normalize.css'

// 导入全局状态管理
import store from '@/store/index'

//引入全局状态管理 stroe

const app = createApp(App)

// 挂载全局状态
app.use(store)

//将路由挂载到app实例中
app.use(router)

// 挂载
// app.use(ElementPlus)

app.mount('#app')
