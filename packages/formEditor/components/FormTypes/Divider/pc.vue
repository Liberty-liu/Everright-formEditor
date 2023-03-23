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
const ns = hooks.useNamespace('FormTypesDivider_pc')
</script>
<template>
  <el-divider
    :class="[ns.b()]"
    v-bind="params"
  >{{data.options.defaultValue}}</el-divider>
</template>

<style scoped>

</style>
