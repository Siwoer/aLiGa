<script>
// 导入Plus
import { Plus } from '@element-plus/icons-vue';

//导入添加轮播图数据接口
import {addBanner} from '../../api/banner.js'

import { ElMessage  } from 'element-plus';
export default {
  data(){
    return {
      imageUrl:'',
      FormData:{
        alt:'',//图片提示内容
        link:'',//点击轮播图要跳转的路径
        img:'', // 图片的地址
      }
    }
  },
  components:{
    Plus
  },
  methods:{
    httpRequest(data){
      console.log('选择图片成功',data.file)

      // URL.createObjectURL() 通过一个fila创建一个临时的URL地址
      // this.imageUrl = URL.createObjectURL(data.file)

      // 判断格式
      if(data.file.type !== 'image/png' ){
        return
      }

      
      //第二种方法
        // 创建一个文件加载器
        const reader = new FileReader()
        // 指定加载的文件和加载的类型
        // base64
        // 将文件读取成base64 格式
        //readAsDataURL方法用于读取指定 Blob 或 File 
        reader.readAsDataURL(data.file)
        //读取完成之后的回调
        //onload事件绑定了一个回调函数，在文件读取完成后会自动执行。在回调函数中，我们可以通过reader.result获取到文件内容。
        reader.onload = () => {
          this.imageUrl = reader.result
          this.FormData.img = reader.result
        }
    },
    addBannerClick(){
      //点击添加轮播图事件
      //1.发送数据请求将数据提交到服务器
      // 如果数据为空报错
      if(!this.FormData.alt || !this.FormData.link || !this.FormData.img){
        ElMessage.error('数据没填完整')
        return
      }
      
      addBanner(this.FormData).then(res => {
        console.log(res)
        // 如果添加成功 把表单内数据清空
        if(res.code == '200'){
          this.FormData = {
            alt:'',
            link:'',
            img:''
          },
          this.imageUrl = ''
          // 轮播图添加成功后跳转到轮播图列表页面
          this.$router.push('/banner/bannerlist')
        } else {
          ElMessage.error('轮播图添加失败,请重新提交')
        }
      })
    }
  }
}

</script>

<template>
  <div>
    <p>添加轮播图</p>

    <el-form>
      <el-form-item label="请输入Alt">
        <el-input v-model="FormData.alt" />
      </el-form-item>

      <el-form-item label="请输入Link">
        <el-input v-model="FormData.link" />
      </el-form-item>

      <el-form-item label="请选择">
      </el-form-item>

      <!-- 上传照片 -->
        <!-- http-request  可以获取图片信息-->
      <el-upload class="avatar-uploader" :http-request="httpRequest">
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon">
          <Plus />
        </el-icon>
      </el-upload>


      <el-button @click="addBannerClick">添加</el-button>


    </el-form>


  </div>
</template>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>