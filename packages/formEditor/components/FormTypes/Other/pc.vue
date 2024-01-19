<script>
import hooks from '@ER/hooks'
import { ref, watch, inject, computed } from 'vue'
import _ from 'lodash-es'
export default {
  name: 'er-other',
  inheritAttrs: false,
  customOptions: {}
}
</script>
<script setup>
const ER = inject('Everright')
const ns = hooks.useNamespace('FormTypesOther_pc')
const props = defineProps(['data', 'params'])
const key = props.data.key + '_other'
const value = computed({
  set (newVal) {
    ER.state.othersFiles[key] = newVal
  },
  get () {
    return ER.state.othersFiles[key] || ''
  }
})
const isShow = ref(false)
watch(() => props.data.options.defaultValue, (newVal) => {
  isShow.value = (_.isArray(newVal) ? newVal : [newVal]).includes('other')
}, {
  immediate: true
})
</script>

<template>
<div
  v-if="isShow"
  :class="[ns.b()]">
  <el-input
    v-model="value"
    type="textarea"
    :placeholder="data.options.otherPlaceholder"
    :rows="2"/>
</div>
</template>
