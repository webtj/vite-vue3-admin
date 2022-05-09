<template>
  <div class="switchLang">
    <el-dropdown @command="selectLang">
      <el-button type="text">{{ title }}
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item :command="key" v-for="(value, key) in localList" :key="`lang-${key}`">
            {{ value }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
const store = useStore()
const { locale } = useI18n()
const langList = reactive({
  'zh-CN': '语言',
  'en-US': 'Lang'
})
const localList = reactive({
  'zh-CN': '中文简体',
  'en-US': 'English'
})


//下拉菜单国际化
const title = computed(() => {
  return langList[locale.value]
})

//切换语言
const selectLang = name => {
  if (locale.value == name) return
  locale.value = name
  store.commit('app/setLocal', name)
}
</script>
<style lang="scss">
.switchLang {
  margin: 0 5px;
}
</style>
