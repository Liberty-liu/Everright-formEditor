<script setup>
import { ref, provide } from 'vue'
const lang = ref(localStorage.getItem('er-lang') || 'zh-cn')
provide('globalConfig', {
  lang
})
const handle = (val) => {
  // lang.value = val
  localStorage.setItem('er-lang', val)
}
</script>
<template>
  <el-radio-group v-if="$route.name !== 'objEdit'" v-model="lang" @change="handle">
    <el-radio label="zh-cn" size="large">中文</el-radio>
    <el-radio label="en" size="large">English</el-radio>
  </el-radio-group>
  <router-view></router-view>
</template>
