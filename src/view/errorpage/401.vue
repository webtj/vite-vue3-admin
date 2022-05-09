<template>
  <error-content code="401" desc="Oh~~您没有浏览这个页面的权限~" :src="error401" />
</template>

<script setup>
import error401 from '@/assets/images/error-page/error-401.svg'
import errorContent from './error-content.vue'
</script>
