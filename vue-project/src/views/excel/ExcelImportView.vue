<script>
import * as XLSX from 'xlsx'

export default {
  data() {
    return {
      tableData: [],
      currentPage: 1
    }
  },
  computed: {
    computedTableData() {
      return this.tableData.slice((this.currentPage - 1) * 3, (this.currentPage - 1) * 3 + 3)
    }
  },
  methods: {
    importChange(event) {
      // console.log(event.target.files)
      // 将上传的文件存到file里
      const file = event.target.files[0]
      // 创建文件加载器
      const reader = new FileReader()
      // 将文件读取成数据流
      // readAsBinaryString 该方法非标准 不推荐生产环境使用
      // reader.readAsArrayBuffer(file)
      reader.readAsBinaryString(file)
      //读取成功之后的回调函数
      reader.onload = () => {
        // 将数据流的文件转换成js对象 type:binary 表示转换的类型文件的是数据流类型
        const box = XLSX.read(reader.result, { type: 'binary' })
        // 将内容数据提取出来
        let res = box.Sheets['工作表1']
        //将 内容转换成 json数据(js对象)

        res = XLSX.utils.sheet_to_json(res)
        console.log(res)
        this.tableData = res
      }
    },
    goFile(){
      this.$refs.files.click()
    }
  }
}
</script>

<template>
  <div>
    <!-- input 配合 type="file" 可以选择本地文件 -->
    <!-- change事件 当元素数据发生变化的时候触发  该事件适用于input标签 select标签 textarea标签 -->
    <el-button type="primary" class="button" size="small" @click="goFile">
    选择文件
    </el-button>
    <input ref="files" hidden type="file" @change="importChange">

    <template v-if="tableData.length > 0">
      <el-table :data="computedTableData">
        <el-table-column width="70px" type="index" label="序号" />
        <el-table-column width="160px" label="图片">

          <template #default="scope">
            <div>
              <el-image :src="scope.row.img1"></el-image>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="proname" label="名称" />
        <el-table-column prop="category" label="分类" />
        <el-table-column prop="originprice" label="价格" />
      </el-table>
      <div class="example-pagination-block">
        <el-pagination layout="prev, pager, next" v-model:current-page="currentPage" :page-size="3"
          :total="tableData.length" />
      </div>
    </template>
  </div>
</template>