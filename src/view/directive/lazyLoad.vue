<template>
  <div class="imageList">
    <el-alert title="v-lazyload指令" description="F12控制台-网络-图片 查看资源加载情况" type="warning" show-icon></el-alert><br>
    <div class="imgItem" v-for="item in imageList" :key="item">
      <img v-lazyload="item" alt="" class="item">
    </div>
  </div>
</template>
<script setup>
import { reactive } from "vue";
const imageList = reactive([])
//vite处理静态资源有点坑啊 
// https://cn.vitejs.dev/guide/assets.html#the-public-directory
for (let i = 1; i < 14; i++) {
  let img = new URL(`../../assets/images/gameList/game${i}.jpeg`, import.meta.url).href
  imageList.push(img)
}
</script>
<style lang="scss">
.imageList {
  height: 100%;
  overflow: auto;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;

  .imgItem {
    width: 300px;
    height: 400px;
    margin: 10px;
    border-radius: 10px;
    box-shadow: 2px 2px 2px #888;

    .item {
      width: 100%;
      height: 100%;
      border-radius: 10px;
    }
  }
}
</style>