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
const ns = hooks.useNamespace('FormTypesNumber_pc')
</script>
<template>
  <el-input-number
    :class="[ns.b()]"
    v-model="data.options.defaultValue"
    v-bind="params"
  />
</template>

<style scoped>

</style>
