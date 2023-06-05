<script>
import { ElButton, ElMessage, ElPopconfirm } from 'element-plus'
import { adminList, addAdmin, adminUpdate, adminDelete } from '../../api/user'
import { routes } from '@/router/index.js'
export default {
  data() {
    return {
      adminList: [], // 管理员列表数据
      drawer: false, //是否显示抽屉
      //表单中管理员信息
      formData: {
        adminname: '',
        password: '',
        role: '',
        checkedKeys: []
      },
      menus: routes[0].children,
      currentPage: 1, // 分页 当前页面
      dialogVisible: false, // 对话框 当前是否打开对话框
      defaultCheckedKeys: [] // 设置树形结构的默认选中项
    }
  },
  computed: {
    tableData() {
      return this.adminList.slice((this.currentPage - 1) * 10, (this.currentPage - 1) * 10 + 10)
    }
  },
  mounted() {
    //发送数据请求
    adminList().then(res => {
      console.log(res)

      this.adminList = res.data
    })
  },
  methods: {
    handleClose() {
      this.drawer = false
    },
    // 获取树形结构中选中的值
    formatCheckedKeys(code) {
      //得到用户选择的路由路径
      const list = code == '10010' ? this.$refs.treeRef1.getCheckedNodes(true) : this.$refs.treeRef2.getCheckedNodes(true)
      //放父级路由的label用的数组
      const tempList = []

      // 放最终结果用的
      const result = []

      list.forEach(item => {
        const parent = this.menus.find(mitem => {
          return mitem.children.some(child => child.label == item.label)
        })
        // console.log(parent)

        if (tempList.includes(parent.label)) {
          result.find(item => item.label == parent.label).children.push(item)
        } else {
          tempList.push(parent.label)

          result.push({
            label: parent.label,
            path: parent.path,
            children: [item]
          })
        }
        this.formData.checkedKeys = result
      });
    },
    addClick() {
      // 调用获取用户选择的权限
      this.formatCheckedKeys('10010')

      addAdmin(this.formData).then(res => {
        console.log('111', res)
        if (res.code == 200) {
          this.drawer = false

          adminList().then(res => {
            this.adminList = res.data
          });
          //清空表单数据
          this.formData.adminname = '',
            this.formData.password = '',
            this.formData.role = '',
            this.formData.checkedKeys = [],
            this.$refs.treeRef1.setCheckedKeys([])
        } else {
          ElMessage({
            type: 'error',
            message: res.message
          })
        }
      })
    },
    // 编辑按钮的点击事件
    editClick(row) {
      this.dialogVisible = true
      console.log(row)
      this.formData.adminname = row.adminname
      this.formData.password = row.password
      this.formData.role = row.role
      // this.formData.checkedKeys = row.checkedKeys
      const list = []
      // console.log('1111111',row.checkedKeys)
      row.checkedKeys.forEach(parent => {
        parent.children.forEach(item => {
          list.push(item.path)
        })
      })
      this.defaultCheckedKeys = list
    },
    updateClick() {
      //获取所有被选中项
      this.formatCheckedKeys('10086')

      adminUpdate(this.formData).then(res => {
        if (res.code == 200) {
          this.dialogVisible = false

          adminList().then(res => {
            this.adminList = res.data
          });
          console.log(res)
          //清空表单数据
          this.formData.adminname = '',
            this.formData.password = '',
            this.formData.role = '',
            this.formData.checkedKeys = [],
            this.$refs.treeRef2.setCheckedKeys([])
        } else {
          ElMessage({
            type: 'error',
            message: res.message
          })
        }
      })
    },
    delClick(row) {
      adminDelete({
        adminid: row.adminid
      }).then(res => {
        console.log(res)
        if (res.code == 200) {
          adminList().then(res => {
            this.adminList = res.data
          })
        } else {
          ElMessage({
            type: 'error',
            message: res.message
          })
        }
      })
    },
    close (){
      //关闭对话框的时候清除 数据
      this.formData.adminname = '',
      this.formData.password = '',
      this.formData.role = '',
      this.formData.checkedKeys = []
    }
  },
  components: { ElButton, ElPopconfirm }
}
</script>
<template>
  <div>

    <h4>管理员列表 <el-button @click="drawer = true" v-if="$store.state.userInfo.adminname == 'admin'">添加管理员</el-button></h4>

    <el-table :data="tableData">
      <!-- 第二页的序号从11开始  -->
      <el-table-column type="index" label="序号" width="80px" >
        <template #default="scope">
          <div>
            {{ (currentPage - 1) * 10 + scope.$index + 1 }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="adminname" label="管理员名称" />
      <el-table-column prop="role" label="管理员权限">
        <template #default="scope">
          <el-tag :type="scope.row.role == 1 ? '' : 'success'">
            {{ scope.row.role == 1 ? '管理员' : '超级管理员' }}
          </el-tag>

        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="danger" @click="editClick(scope.row)">编辑</el-button>

          <el-Popconfirm title="求求你别离开我" @confirm="delClick(scope.row)">
            <template #reference>
              <el-button type="primary">删除</el-button>
            </template>
          </el-Popconfirm>


        </template>
      </el-table-column>
    </el-table>

    <el-pagination background v-model:current-page="currentPage" layout="prev, pager, next" :total="adminList.length" />


            <!---------- 抽屉效果  -------------->
    <el-drawer @close="close " v-model="drawer" title="添加管理员" :before-close="handleClose">
      <el-form>
        <el-form-item label="管理员账号">
          <el-input placeholder="请输入管理员账号" v-model="formData.adminname" />
        </el-form-item>
        <el-form-item label="管理员密码">
          <el-input placeholder="请输入管理员密码" v-model="formData.password" type="password" />
        </el-form-item>

        <el-form-item label="管理员角色">
          <el-select placeholder="请选择角色" v-model="formData.role">
            <el-option label="管理员" value="1" />
            <el-option label="超级管理员" value="2" />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-tree :data="menus" :default-expand-all="true" node-key="path" ref="treeRef1"
            :default-expanded-keys="defaultCheckedKeys" :show-checkbox="true" />

        </el-form-item>

        <el-form-item>
          <el-button @click="addClick" type="primary">
            添加
          </el-button>
        </el-form-item>
      </el-form>

    </el-drawer>


    <!------------------ 对话框 ------------------------->
    <!-- close 表示关闭的回调 -->
    <el-dialog @close="close " v-model="dialogVisible">

      <el-form>
        <el-form-item label="管理员账号">
          <el-input placeholder="请输入管理员账号" v-model="formData.adminname" />
        </el-form-item>
        <el-form-item label="管理员密码">
          <el-input placeholder="请输入管理员密码" v-model="formData.password" type="password" />
        </el-form-item>

        <el-form-item label="管理员角色">
          <el-select placeholder="请选择角色" v-model="formData.role">
            <el-option label="管理员" :value="1" />
            <el-option label="超级管理员" :value="2" />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-tree :data="menus" :default-expand-all="true" node-key="path" ref="treeRef2"
            :default-checked-keys="defaultCheckedKeys" :show-checkbox="true" />

        </el-form-item>

        <el-form-item>
          <el-button @click="updateClick" type="primary">
            提交
          </el-button>
        </el-form-item>
      </el-form>

    </el-dialog>


  </div>
</template>

