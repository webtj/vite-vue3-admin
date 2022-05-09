<template>
  <error-content code="404" desc="Oh~~您的页面好像飞走了~" :src="error404" />
</template>

<script setup>
import error404 from '@/assets/images/error-page/error-404.svg'
import errorContent from './error-content.vue'
</script>
