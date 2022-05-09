<template>
  <div>
    <el-card class="dragPosition" v-draggable="cardOptions">
      <el-alert title="v-draggable指令" description="元素上增加v-draggable即可实现拖拽" type="warning" show-icon></el-alert><br>
      <template #header>拖动这里移动容器</template>
      <el-button v-draggable="buttonOptions" class="draggable-btn">我是个可以拖动的按钮</el-button>
    </el-card>
  </div>
</template>

<script setup>
const buttonOptions = ref({
  trigger: '.draggable-btn',
  body: '.draggable-btn'
})

const cardOptions = ref({
  trigger: '.dragPosition .el-card__header',
  body: '.dragPosition'
})
</script>

<style>
.dragPosition {
  width: 80%;
  height: 500px;
}
</style>