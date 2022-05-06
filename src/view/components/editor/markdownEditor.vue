<template>
  <div class="h-full">
    <el-card>
      <template #header>Markdown编辑器 <a href="https://github.com/Vanessa219/vditor" target="_blank">vditor</a></template>
      <div ref="domRef"></div>
    </el-card>
  </div>
</template>

<script setup >
import { ref, watch, onMounted, onUnmounted } from 'vue';
import Vditor from 'vditor';
import 'vditor/src/assets/scss/index.scss';

const vditor = ref(null);
const domRef = ref(null);

//这边需根据全局主体切换编辑器主题
// 'dark' : 'classic'
// 后续做主题监听  vditor.value?.setTheme(themeMode)
function renderVditor() {
  if (!domRef.value) return;
  vditor.value = new Vditor(domRef.value, {
    minHeight: 400,
    theme: 'classic',
    icon: 'material',
    cache: { enable: false }
  });
}

onMounted(() => renderVditor())
</script>
<style scoped></style>