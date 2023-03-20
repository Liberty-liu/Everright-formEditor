<script>
import hooks from '@ER/hooks'
export default {
  name: 'er-select',
  inheritAttrs: false,
  customOptions: {}
}
</script>
<script setup>
const props = defineProps(['data', 'params'])
const ns = hooks.useNamespace('FormTypesSelect_pc')
</script>
<template>
<!--  :style="{-->
<!--  width: data.options.width + data.options.widthType-->
<!--  }"-->
<!--  v-bind="data.options"-->
  <el-select
    :class="[ns.b()]"
    v-model="data.options.defaultValue"
    v-bind="params">
    <el-option
      v-for="item in params.options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<style scoped>

</style>
