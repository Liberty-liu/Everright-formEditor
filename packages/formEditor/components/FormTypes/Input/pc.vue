<script>
import { watch } from 'vue'
import hooks from '@ER/hooks'
export default {
  name: 'er-input',
  inheritAttrs: false,
  customOptions: {}
}
</script>
<script setup>
const props = defineProps(['data', 'params'])
</script>
<template>
  <el-input
    v-model="data.options.defaultValue"
    v-bind="params">
    <template #prepend v-if="params.prepend">{{params.prepend}}</template>
    <template #append v-if="params.append">{{params.append}}</template>
  </el-input>
</template>

<style scoped>

</style>
