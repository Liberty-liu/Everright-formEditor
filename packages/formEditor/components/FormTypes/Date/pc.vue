<script>
import hooks from '@ER/hooks'
export default {
  name: 'er-date',
  inheritAttrs: false,
  customOptions: {}
}
</script>
<script setup>
const props = defineProps(['data', 'params'])
const ns = hooks.useNamespace('FormTypesDate_pc')
</script>
<template>
  <el-date-picker
    :class="[ns.b()]"
    v-model="data.options.defaultValue"
    v-bind="params"
  />
</template>

<style scoped>

</style>
