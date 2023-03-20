<script>
import hooks from '@ER/hooks'
import { computed } from 'vue'

export default {
  name: 'er-number',
  inheritAttrs: false,
  customOptions: {}
}
</script>
<script setup>
const props = defineProps(['data', 'params'])
const model = computed({
  get () {
    return props.data.options.defaultValue === null ? '' : props.data.options.defaultValue
  },
  set (value) {
    props.data.options.defaultValue = value
  }
})
</script>
<template>
  <van-field
    readonly
    v-bind="params"
  >
    <template #input>

      <van-stepper
        v-model="model"
        v-bind="params"
      />
    </template>
  </van-field>
</template>

<style scoped>

</style>
