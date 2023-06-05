<script>

//导入消息提示
import { ElMessage } from 'element-plus'

//导入md5
import md5 from "md5"

// 导入axios
import axios from "axios"

// 导入封装好的登录数据请求
import { loginFn } from '../api/user'
export default {
  name: 'loginView',
  data() {
    return {
      adminname: '',
      password: '',
    }
  },
  methods: {
    loginClick() {
      // console.log(this.adminname, this.password);
      // 点击登录 将下面的内容传递给user.js 的data中
      loginFn({ adminname: this.adminname, password: this.password }).then(res => {
//!!!!!!
        console.log('11111', res)
//!!!!!!!
        if (res.code == 200) {

           // 将token存起来
          //  console.log(res.data.data.token)
// !!!!!!
          localStorage.setItem('token', res.data.token)

          // 将用户信息保存在全局状态中
//!!!!!!!
          this.$store.commit('updateUserInfo',res.data)
          this.$router.push('/')
        } else {
          ElMessage({
            type: 'error',
            message: '给老子重新输'
          })
        }
      })
      //账号验证
      // if (this.adminname.length < 5) {
      //   ElMessage({
      //     message: '给老子重新输',
      //     type: 'error'
      //   })
      //   return
      // }
      //密码验证
      // if (!/^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/.test(this.password)) {
      //   ElMessage({
      //     message: '给老子重新输',
      //     type: 'error'
      //   })
      //   return
      // }

      // console.log(md5(this.password))
      // // console.log(md5('123456'))

      //121.89.205.189:3000/admindoc/

      // axios.post('http://121.89.205.189:3000/admin/admin/login', {
      //   adminname: this.adminname,
      //   password: this.password
      // })
      //   .then(function (response) {
      //     console.log(response);
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });

    },
    btn(){
      // this.$store.commit('add')
      this.$store.dispatch('addActions')
    }
  }
}
</script>

<template slot-scope="scope">
  <div class="login-container">
    <h2>{{ this.$store.state.count }}
    <button @click="btn">修改</button>
    </h2>
    <div class="form-wrap">
      <h2 class="title">Instagram</h2>
      <el-input type="text" v-model="adminname" placeholder="Please enter your account number
          " autocomplete="off" />
      <el-input class="psw" v-model="password" type="password" placeholder="Please enter your password
        " autocomplete="off" />
      <el-button class="btn" @click="loginClick" type="primary">Login</el-button>
    </div>



  </div>
</template>


<style scoped lang="scss">
.login-container {
  height: 100%;
  background-color: rgb(204, 204, 227);
  background-image: url(../assets/xihu.jpeg);
  background-size: cover;

  .form-wrap {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 360px;
    padding: 32px;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    background: rgba($color: #ffffff, $alpha: 0.2);

    .title {
      text-align: center;
      margin-bottom: 30px;
      font-family: 'Nanum Myeongjo', serif;
      font-size: 34px;
      color: #f5cfdf;
    }

    .psw {
      margin-top: 20px;
    }

    .btn {
      margin-top: 20px;
      width: 100%;
      border: none;
      background: rgba($color: #96f5f8, $alpha: 0.5);
      background: rgba($color: #b9f5f7, $alpha: 0.5);
    }
  }
}
</style>