<template>
  <div class="h-full">
    <el-card>
      <template #header>富文本编辑器
        <a href="https://github.com/wangeditor-team/wangEditor" target="_blank">wangEditor</a>&nbsp;
        <a href="https://www.wangeditor.com/v5/getting-started.html" target="_blank">doc</a>&nbsp;
        <a href="https://www.wangeditor.com/v5/API.html" target="_blank">API</a>
      </template>
      <div ref="domRef"></div>
    </el-card>
  </div>
</template>

<script setup >
import WangEditor from 'wangeditor';
const editor = ref(null);
const domRef = ref(null);
function renderWangEditor() {
  editor.value = new WangEditor(domRef.value);
  setEditorConfig();
  editor.value.create();
}
function setEditorConfig() {
  if (editor.value?.config?.zIndex) {
    editor.value.config.zIndex = 10;
  }
}
onMounted(() => {
  renderWangEditor();
});
</script>
<style scoped>
:deep(.w-e-toolbar) {
  background: inherit !important;
  border-color: #999 !important;
}

:deep(.w-e-text-container) {
  background: inherit;
  border-color: #999 !important;
}
</style>