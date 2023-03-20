<script>
import { ref, computed, reactive } from 'vue'
import hooks from '@ER/hooks'
export default {
  name: 'er-time',
  inheritAttrs: false,
  customOptions: {}
}
</script>
<script setup>
const props = defineProps(['data', 'params'])
const ns = hooks.useNamespace('FormTypesTime_pc')
</script>
<template>
  <el-time-picker
    :class="[ns.b()]"
    v-model="data.options.defaultValue"
    v-bind="params"
  />
</template>

<style scoped>

</style>
