<script>
import { getProList } from '../../api/pro'

// 导入 导出插件
import ExportJsonExcel from 'js-export-excel'

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
  mounted() {
    getProList().then(res => {
      console.log(res)
      this.tableData = res.data
    })
  },
  methods: {
    exportClick(){
      // 2.导出
      let option = {fileName: '导出的文件'}
      option.datas = [
        {
          // 3. 配置需要导出的原数据
          sheetData:this.tableData,
          // 4. 配置工作表名称
          sheetName : 'siwoer',
          // 5. 配置需要导出的字段
          sheetFilter:['proname','brand'],
          // 6. 配置表头名称
          sheetHeader:['商品名称','商品分类'],
          // 7. 配置每列的宽度
          columnWidths:[20,40],
        }
      ]
      // 8. 将配置对象来创建表格
      let toExcel = new ExportJsonExcel(option)

      // 9.将 excel 保存到本地
      toExcel.saveExcel()
    }
  }
}
</script>

<template>
  <div>

    <!-- 文件导出有两种方法
        1.直接给a标签 点击下载文件 <a href="https://unpkg.com/vue@3/dist/vue.global.js" download="" >点击下载文件</a>
        
        2.自己将数据处理后保存在本地即可
    -->
    
    <el-button @click="exportClick"> 文件导出 </el-button>

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
  </div>
</template>