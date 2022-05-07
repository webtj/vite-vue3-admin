<template>
  <el-button @click="login">这里是登录页面</el-button>
</template>

<script setup>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import config from '@/config'
const { homeName } = config
const store = useStore()
const router = useRouter()
const login = () => {
  let params = {
    userName: 'taojian',
    password: 'taojian'
  }
  store.dispatch('user/handleLogin', params).then(() => {
    //登录成功后获取到token，请求用户信息
    store.dispatch('user/getUserInfo').then(() => {
      router.push({ name: homeName })
    })
  })
}
</script>

<style lang="scss">
@import "./login.scss";
</style>