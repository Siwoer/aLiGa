
<script>
//导入banner列表数据接口
import { getBannerList } from '../../api/banner'

import { delBanner } from '../../api/banner'

export default {
  name: 'BannerList',
  data() {
    return {
      // 创建一个bannerList 用来接收数据
      bannerList: [],
      currenPage: 1
    }
  },
  computed: {
    computedTableData() {
      //从索引开始所以要减1
      return this.bannerList.slice((this.currenPage - 1) * 5, (this.currenPage - 1) * 5 + 5)
    }
  },
  mounted() {
    getBannerList().then(res => {
      // console.log(res)
      this.bannerList = res.data
    })
  },
  methods: {
    delClick(row) {
      console.log(row)
      delBanner({ bannerid: row.bannerid }).then(res => {
        console.log(res)
        getBannerList().then(res => {
          console.log(res)
          this.bannerList = res.data
        })
      })
    }
  },
}
</script>
<template>
  <div>
    <p>轮播图列表</p>
    <el-table :data="computedTableData">
      <el-table-column type="index" label="序号" width="80px" />
      <el-table-column prop="img" label="图片">
        <template #default="scope">
          <div>
            <el-image :src="scope.row.img">

            </el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="alt" label="提示信息" />
      <el-table-column prop="bannerid" label="id" />
      <el-table-column label="操作">

        <template #default="scope">
          <div>
            <el-button @click="delClick(scope.row)">
              删除
            </el-button>
          </div>
        </template>


      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="example-pagination-block">
      <!-- :total="userList.length" 表示total为数据的总数    v-model:current-page="currenPage" 表示当前页面 默认为1 -->
      <el-pagination layout="prev, pager, next" :page-size="5" :total="bannerList.length"
        v-model:current-page="currenPage" />
    </div>

  </div>
</template>