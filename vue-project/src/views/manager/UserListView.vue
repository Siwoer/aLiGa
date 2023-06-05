<script>
// 导入获取数据接口
import { getUserList } from '../../api/user'
export default {
  name: 'UserList',
  data() {
    return {
      userList: [],
      // 分页 默认第一页
      currenPage: 1,
    }
  },
  computed: {
    computedTableData() {
      //从索引开始所以要减1
      return this.userList.slice((this.currenPage - 1) * 13, (this.currenPage - 1) * 13 + 13)
    }
  },
  mounted() {
    getUserList().then(res => {
      console.log(res)
      this.userList = res.data
    })
  }
}
</script>

<template>
  <div>
    <p>
      用户列表
    </p>
    <!-- :data="userList" 表示数据源 -->
    <!-- type和prop 后面写的表示获取的内容信息 -->
    <el-table :data="computedTableData">
      <el-table-column type="index" label="序号" width="80px" />
      <el-table-column prop="telcode" label="用户名" />
      <el-table-column prop="tel" label="手机号" />
      <el-table-column prop="email" label="邮箱" />
    </el-table>

                    <!-- 分页 -->
    <div class="example-pagination-block">
      <!-- :total="userList.length" 表示total为数据的总数    v-model:current-page="currenPage" 表示当前页面 默认为1 -->
      <el-pagination layout="prev, pager, next" 
      :page-size="13"
      :total="userList.length" v-model:current-page="currenPage" />
    </div>
    
  </div>
</template>
<!-- 
<style>
.example-pagination-block{
margin: 0 auto;
}
</style> -->