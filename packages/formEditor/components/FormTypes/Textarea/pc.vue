<script>
import hooks from '@ER/hooks'
export default {
  name: 'er-textarea',
  inheritAttrs: false,
  customOptions: {}
}
</script>
<script setup>
const props = defineProps(['data', 'params'])
</script>
<template>
<!--  <el-input-->
<!--    type="textarea"-->
<!--    v-model="data.options.defaultValue"-->
<!--    v-bind="data.options"-->
<!--    :style="{-->
<!--      width: data.options.width + data.options.widthType-->
<!--    }"-->
<!--    :maxlength="data.options.maxlength"-->
<!--    :show-word-limit="data.options.isShowWordLimit"-->
<!--  />-->
  <el-input
    v-model="data.options.defaultValue"
    v-bind="params"/>
</template>

<style scoped>

</style>
