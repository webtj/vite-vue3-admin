<template>
  <div class="login" ref="loginArea">
    <div class="login-top-left" style="z-index: 1;">
      <a href="https://github.com/webtj/vite-vue3-admin" target="_blank">
        <p-icon type="github-one" color="#fff"></p-icon>
        GitHub
      </a>
    </div>
    <div class="login-introduce">
      <h1> Vue3.js </h1>
      <h3> Background management system based on vite/vue3/element-plus. </h3>
    </div>
    <div class="login-con">
      <el-card class="loginCard">
        <template #header><span>
            <e-icon type="UserFilled"></e-icon>&nbsp;欢迎登录
          </span></template>
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
        </div>
      </el-card>
    </div>
  </div>

</template>

<script setup>
import BIRDS from 'vanta/src/vanta.birds'
import config from '@/config'
import LoginForm from '_c/login-form'

const { homeName } = config
const store = useStore()
const router = useRouter()
const handleSubmit = (params) => {
  store.dispatch('user/handleLogin', params).then(() => {
    //登录成功后获取到token，请求用户信息
    store.dispatch('user/getUserInfo').then(() => {
      router.push({ name: homeName })
    })
  })
}

let vantaEffect = null
const loginArea = ref(null)
onMounted(() => {
  vantaEffect = BIRDS({
    el: loginArea.value,
    backgroundColor: 0x61120
  })
})
onBeforeUnmount(() => {
  if (vantaEffect) vantaEffect.destroy()
})
</script>

<style lang="scss">
@import "./login.scss";
</style>