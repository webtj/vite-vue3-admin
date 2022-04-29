<template>
  <div>
    <el-card>
      <template #header>package.json基础配置项</template>
      <el-alert title="整个项目package.json可能插件较多，下面为基础的安装依赖" type="success" :closable="false" show-icon>
      </el-alert>
      <json-viewer :value="packjson" copyable expanded :expand-depth="2"></json-viewer>
    </el-card>
  </div>
</template>
<script setup>
const packjson = {
  "name": "vite-vue3-admin",
  "private": true,
  "version": "0.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "element-plus": "^2.1.9",
    "vue": "^3.1.2",
    "vue-i18n": "^9.1.9",
    "vue-router": "^4.0.10",
    "vuex": "^4.0.2"
  },
  "devDependencies": {
    "@intlify/vite-plugin-vue-i18n": "^3.4.0",
    "@vitejs/plugin-vue": "^2.3.0",
    "@vue/compiler-sfc": "^3.1.2",
    "sass": "^1.50.0",
    "stylus": "^0.57.0",
    "unplugin-auto-import": "^0.7.0",
    "unplugin-vue-components": "^0.19.2",
    "vite": "^2.9.0",
    "vite-auto-import-resolvers": "^2.2.3"
  }
}
</script>
