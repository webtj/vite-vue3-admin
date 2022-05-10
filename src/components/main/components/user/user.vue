<template>
  <div class="user-area">
    <el-dropdown @command="handleClick">
      <el-badge is-dot>
        <avatar :src="userAvatar"></avatar>
      </el-badge>
      &nbsp;<e-icon type="ArrowDown"></e-icon>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item :icon="UserFilled">{{ userName }}</el-dropdown-item>
          <el-dropdown-item command="github">Github</el-dropdown-item>
          <el-dropdown-item command="logout">{{ $t('navbar.logout') }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import config from '@/config'
import { UserFilled } from '@element-plus/icons-vue'
import Avatar from './avatar'
const store = useStore()
const router = useRouter()
const { loginName, github } = config
//登录用户信息
const userName = computed(() => store.state.user.userName)
const userAvatar = computed(() => store.state.user.userAvatar)
const handleClick = command => {
  if (command === 'logout') {
    //退出登录
    store.dispatch('user/handleLogout').then(() => {
      router.push({ name: loginName })
    })
  } else if (command === 'github') {
    window.open(github, '_blank')
  }
}
</script>
<style lang="scss">
.user-area {
  margin-left: 10px;

  .el-dropdown {
    cursor: pointer;
  }
}
</style>