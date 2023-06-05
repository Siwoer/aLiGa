<script>
import * as echarts from 'echarts';

export default {
  name: 'ECharts',
  data() {
    return {
      myChart: null
    }
  },
  methods: {
    changeType(type,x,y) {
      //绘制图表
      this.myChart.setOption({
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        toolbox:{
          feature:{
            saveAsImage:{}
          }
          
        },
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: x || ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: type || 'line',
            //折线阴影
            areaStyle: {},
            data: y ||  [5, 20, 36, 10, 10, 20]
          }
        ]
      })
    }
  },
  mounted() {
    // 基于准备好的dom 初始化echarts实例
    //挂载完成后找dom元素
    this.myChart = echarts.init(document.getElementById('echarts'))
    // 调用图表的绘制方法
    this.changeType()
  }
}
</script>
<template>
  <div>
    <el-button @click="changeType('line')">折线图</el-button>
    <el-button @click="changeType('bar')">柱状图</el-button>
    <el-button @click="changeType('pie')">饼图</el-button>
    <el-button @click="changeType('scatter')">散点图</el-button>
    <el-button @click="changeType('line',['榴莲','芒果','蓝莓','释迦','牛油果','哈密瓜'],[999,666,333,111,444,888])">水果销量</el-button>
    <el-button @click="changeType('',['彩电','冰箱','VCD','DVD','小霸王','收音机'],[1388,2388,10086,10010,12345,43421])">家电销量</el-button>
    <main id="echarts">

    </main>
  </div>
</template>
<style lang="scss" >
#echarts {
  height: 600px;
  background-color: rgb(190, 196, 194);
}
</style>