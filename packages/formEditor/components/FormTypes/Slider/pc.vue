<script>
import hooks from '@ER/hooks'
export default {
  name: 'er-slider',
  inheritAttrs: false,
  customOptions: {}
}
</script>
<script setup>
const props = defineProps(['data', 'params'])
</script>
<template>
  <el-slider
    v-model="data.options.defaultValue"
    v-bind="params"
  />
</template>

<style scoped>

</style>
