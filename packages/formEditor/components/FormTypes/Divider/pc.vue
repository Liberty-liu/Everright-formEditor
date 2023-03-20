<script>
import hooks from '@ER/hooks'
export default {
  name: 'er-divider',
  inheritAttrs: false,
  customOptions: {}
}
</script>
<script setup>
const props = defineProps(['data', 'params'])
</script>
<template>
  <el-divider
    v-bind="params"
  >{{data.options.defaultValue}}</el-divider>
</template>

<style scoped>

</style>
