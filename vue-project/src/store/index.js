// 状态管理文件
import { createStore } from 'vuex'

//导入数据持久化操作的创建函数
import createPersistedState from 'vuex-persistedstate'

// 创建一个新的 store 实例
const store = createStore({
  // 严格模式
  strict:ProcessingInstruction.env_ENV !== 'production',
  state () {
    // 声明全局状态的地方 ‘重要’
    return {
      count: 0,
      userInfo:{},
      currentPath:'/'
    }
  },
  mutations: {
    // 状态管理器中唯一修改数据的方法
    add (state) {
    //  setTimeout(()=>{
      state.count++
    //  },1000)
    },
    addNum (state, value) {
      // state 就是我们的所有状态，value 就是我们传递过来的数据
      state.count += value
    },
    updateUserInfo(state,value){
      state.userInfo = value
    },
    //修改路径的方法
    updateCurrentPath(state,value){
      state.currentPath = value
    }
  },
  actions:{
    // 异步处理的地方
    // 也要调用 mutations 进行修改
    addActions(){
      // console.log(add)
      setTimeout(()=>{
        this.commit('add')
      },1000)
    }
  },
  getters:{
    // 相当于 vue 中计算属性
  },
  modules:{
    // 状态模块
  },
  //持久化
  plugins:[
    createPersistedState({
      reducer:state => {
        return{
          userInfo:state.userInfo
        }
      }
    })
  ]
})

export default store