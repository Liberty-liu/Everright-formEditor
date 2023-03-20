<script>
import { computed } from 'vue'
import hooks from '@ER/hooks'
export default {
  name: 'er-region',
  inheritAttrs: false,
  customOptions: {}
}
</script>
<script setup>
const props = defineProps(['data', 'params'])
const ns = hooks.useNamespace('FormTypesRegion_pc')
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
