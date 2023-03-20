<script>
import hooks from '@ER/hooks'
import { ref } from 'vue'
export default {
  name: 'er-radio',
  inheritAttrs: false,
  customOptions: {}
}
</script>
<script setup>
const props = defineProps(['data', 'params'])
const ns = hooks.useNamespace('FormTypesRadio')
const element = ref()
</script>
<template>
  <van-field
    readonly
    v-bind="params"
    ref="element"
  >
    <template #input>
      <el-radio-group
        @change="element.resetValidation()"
        v-model="data.options.defaultValue"
        :class="[ns.e('radioGroup'), data.options.displayStyle === 'block' && ns.e('blockLayout')]"
        v-bind="params">
        <el-radio v-for="item in params.options" :key="item.value" :label="item.value">
          {{ item.label }}
        </el-radio>
      </el-radio-group>
    </template>
  </van-field>
</template>

<style scoped>

</style>
