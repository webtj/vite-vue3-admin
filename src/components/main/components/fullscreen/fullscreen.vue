<template>
  <div v-if="showFullScreenBtn" class="full-screen-btn-con">
    <el-tooltip effect="dark" :content="modelValue ? $t('navbar.exitFullscreen') : $t('navbar.fullscreen')"
      placement="bottom">
      <e-icon type='FullScreen' :size="20" @click.native="handleFullscreen"></e-icon>
    </el-tooltip>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
const emit = defineEmits(['update:modelValue'])
//踩了点坑，为了父组件使用v-model语法糖，默认props名称只能为modelValue！！！！！
//要是定义其他名称的props newName,父组件 v-model:newName
//https://staging-cn.vuejs.org/guide/components/events.html#usage-with-v-model 
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

//IE浏览器它的爸爸都把他放弃了,我就不自我欺骗了
const showFullScreenBtn = () => window.navigator.userAgent.indexOf('MSIE') < 0
const handleFullscreen = () => {
  let main = document.body
  if (props.modelValue) {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    }
  } else {
    if (main.requestFullscreen) {
      main.requestFullscreen()
    } else if (main.mozRequestFullScreen) {
      main.mozRequestFullScreen()
    } else if (main.webkitRequestFullScreen) {
      main.webkitRequestFullScreen()
    } else if (main.msRequestFullscreen) {
      main.msRequestFullscreen()
    }
  }
}

onMounted(() => {
  let isFullscreen = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen
  isFullscreen = !!isFullscreen
  document.addEventListener('fullscreenchange', () => emit('update:modelValue', !props.modelValue))
  document.addEventListener('mozfullscreenchange', () => emit('update:modelValue', !props.modelValue))
  document.addEventListener('webkitfullscreenchange', () => emit('update:modelValue', !props.modelValue))
  document.addEventListener('msfullscreenchange', () => emit('update:modelValue', !props.modelValue))
  emit('update:modelValue', isFullscreen)
})

</script>

<style lang="scss">
.full-screen-btn-con {
  margin: 0 5px;

  i {
    cursor: pointer;
    vertical-align: middle;
  }
}
</style>
