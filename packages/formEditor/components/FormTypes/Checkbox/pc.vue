<script>
import hooks from '@ER/hooks'
import Other from '../Other/pc.vue'
export default {
  name: 'er-checkbox',
  inheritAttrs: false,
  customOptions: {}
}
</script>
<script setup>
const props = defineProps(['data', 'params'])
const ns = hooks.useNamespace('FormTypesCheckbox')
</script>
<template>
  <el-checkbox-group
    :class="[ns.e('radioGroup'), data.options.displayStyle === 'block' && ns.e('blockLayout')]"
    v-model="data.options.defaultValue"
    v-bind="params">
    <el-checkbox v-for="item in params.options" :key="item.value" :label="item.value">
      {{ item.label }}
    </el-checkbox>
  </el-checkbox-group>
  <Other :data="data" :params="params"/>
</template>

<style scoped>

</style>
