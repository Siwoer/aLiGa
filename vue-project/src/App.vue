
<template>
  <router-view></router-view>
</template>

<style>
html,
body,
#app,
.common-layout,
.el-container {
  width: 100%;
  height: 100%;
  background-color: rgb(222, 228, 222);
  color: black;
}
/* 页面中所有都不能选中 */
*{
  
  user-select: none;
}
</style>
