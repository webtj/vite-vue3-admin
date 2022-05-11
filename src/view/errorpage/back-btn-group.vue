<template>
  <div>
    <el-button size="large" text type="primary" @click="backHome">返回首页</el-button>
    <el-button size="large" text type="primary" @click="backPrev">返回上一页({{ second }}s)</el-button>
  </div>
</template>

<script setup>
import config from '@/config'
const { homeName } = config
let second = ref(5)
let timer = ref(null)
const router = useRouter()
const backHome = () => {
  router.replace({
    name: homeName
  })
}
const backPrev = () => router.go(-1)
onMounted(() => {
  timer.value = setInterval(() => {
    if (second.value === 0) backPrev()
    else second.value--
  }, 1000)
})
onBeforeUnmount(() => clearInterval(timer.value))
</script>
<style lang="scss">
@import "./error.scss";
</style>
