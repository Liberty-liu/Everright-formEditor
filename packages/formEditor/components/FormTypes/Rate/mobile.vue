<script>
import hooks from '@ER/hooks'
export default {
  name: 'er-rate',
  inheritAttrs: false,
  customOptions: {}
}
</script>
<script setup>
const props = defineProps(['data', 'params'])
</script>
<template>
  <van-field
    readonly
    v-bind="params"
  >
    <template #input>
      <van-rate
        v-model="data.options.defaultValue"
        v-bind="params"
      />
    </template>
  </van-field>
</template>

<style scoped>

</style>
