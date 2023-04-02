<script>
import { defineProps, ref, reactive, computed, provide, getCurrentInstance, watch, nextTick, onMounted } from 'vue'
import ConfigPanel from '@ER/formEditor/components/Panels/Config/index.vue'
import hooks from '@ER/hooks'
import utils from '@ER/utils'
import _ from 'lodash-es'
import defaultProps from './defaultProps'
import { globalConfig } from './componentsConfig'
export default {
  name: 'Everright-form-config'
}
</script>
<script setup>
const emit = defineEmits(['listener'])
const props = defineProps(_.merge({
  field: {
    type: [Object, String],
    required: true
  }
}, defaultProps))
const layout = {
  pc: [],
  mobile: []
}
const state = reactive({
  store: [],
  selected: {},
  config: globalConfig,
  platform: 'pc',
  Namespace: 'formEditor',
  validateStates: [],
  data: {},
  mode: 'config',
  fields: []
})
const element = ref('')
const ns = hooks.useNamespace('Main', state.Namespace)
const loading = ref(false)
const setSelection = (node) => {
  let result = ''
  if (node === 'root') {
    result = state.config
  } else {
    if (node.type === 'inline') {
      result = node.columns[0]
    } else {
      result = node
    }
  }
  state.selected = result
}
const switchPlatform = (platform) => {
  state.platform = platform
}
provide('Everright', {
  state,
  emit,
  props,
  setSelection,
  switchPlatform
})
watch(() => props.field, (newVal) => {
  if (newVal !== 'root') {
    state.store[0] = newVal
    utils.addContext(newVal, state.store)
  }
  setSelection(newVal)
}, {
  immediate: true
})
defineExpose({
  state,
  switchPlatform (platform) {
    state.platform = platform
  }
})
watch(() => state.selected, (newVal) => {
  emit('listener', {
    type: 'changeParams',
    data: _.cloneDeep(newVal)
  })
}, {
  deep: true,
  immediate: true
})
</script>
<template>
  <ConfigPanel mode="config"></ConfigPanel>
</template>
