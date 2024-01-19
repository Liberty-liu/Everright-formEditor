<script>
import hooks from '@ER/hooks'
import { ref } from 'vue'
import Other from '../Other/mobile.vue'
export default {
  name: 'er-checkbox',
  inheritAttrs: false,
  customOptions: {}
}
</script>
<script setup>
const props = defineProps(['data', 'params'])
const ns = hooks.useNamespace('FormTypesCheckbox')
const element = ref()
</script>
<template>
  <van-field
    readonly
    v-bind="params"
    ref="element"
  >
    <template #input>
      <div style="width: 100%;">
        <el-checkbox-group
          @change="element.resetValidation()"
          :class="[ns.e('radioGroup'), data.options.displayStyle === 'block' && ns.e('blockLayout')]"
          v-model="data.options.defaultValue"
          v-bind="params">
          <el-checkbox v-for="item in params.options" :key="item.value" :label="item.value">
            {{ item.label }}
          </el-checkbox>
        </el-checkbox-group>
        <Other :data="data" :params="params"/>
      </div>
    </template>
  </van-field>
</template>

<style scoped>

</style>
