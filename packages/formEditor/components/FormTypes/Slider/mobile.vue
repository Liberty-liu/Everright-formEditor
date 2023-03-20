<script>
import hooks from '@ER/hooks'
export default {
  name: 'er-slider',
  inheritAttrs: false,
  customOptions: {}
}
</script>
<script setup>
const props = defineProps(['data', 'params'])
const ns = hooks.useNamespace('FormTypesSlider_mobile')
</script>
<template>
  <van-field
    readonly
    :class="ns.b()"
    v-bind="params"
  >
    <template #input>
      <van-slider
        v-model="data.options.defaultValue"
        v-bind="params">
        <template #button>
          <div :class="ns.e('customButton')">{{ data.options.defaultValue }}</div>
        </template>
      </van-slider>
    </template>
  </van-field>
</template>

<style scoped>

</style>
