<script>
import hooks from '@ER/hooks'
export default {
  name: 'er-number',
  inheritAttrs: false,
  customOptions: {}
}
</script>
<script setup>
const props = defineProps(['data', 'params'])
</script>
<template>
  <el-input-number
    v-model="data.options.defaultValue"
    v-bind="params"
  />
</template>

<style scoped>

</style>
