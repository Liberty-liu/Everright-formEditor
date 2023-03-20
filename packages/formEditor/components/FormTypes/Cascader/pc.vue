<script>
import hooks from '@ER/hooks'
export default {
  name: 'er-cascader',
  inheritAttrs: false,
  customOptions: {}
}
</script>
<script setup>
const props = defineProps(['data', 'params'])
const ns = hooks.useNamespace('FormTypesCascader_pc')
</script>
<template>
  <el-cascader
    :class="[ns.b()]"
    v-model="data.options.defaultValue"
    v-bind="params"
  />
</template>

<style scoped>

</style>
