<script>
import { defineProps, ref, reactive, computed, provide, getCurrentInstance, watch, nextTick, onMounted } from 'vue'
import PanelsCanves from '@ER/formEditor/components/Panels/Canves'
import hooks from '@ER/hooks'
import utils from '@ER/utils'
import _ from 'lodash-es'
import defaultProps from './defaultProps'
export default {
  name: 'Everright-form-preview'
}
</script>
<script setup>
const emit = defineEmits(['listener'])
const props = defineProps(defaultProps)
const layout = {
  pc: [],
  mobile: []
}
const state = reactive({
  store: [],
  sector: {},
  platform: utils.isPc() ? 'pc' : 'mobile',
  mode: 'preview',
  config: {},
  Namespace: 'formEditor',
  validateStates: [],
  data: {},
  fields: []
})
const ns = hooks.useNamespace('EverrightEditor', state.Namespace)
const getData = () => {
  const result = {}
  state.fields.forEach(e => {
    result[e.key] = e.options.defaultValue
  })
  return _.cloneDeep(result)
}
provide('Everright', {
  state,
  emit,
  getData,
  props
})
const setData = (data, value) => {
  const newData = _.cloneDeep(data)
  layout.pc = newData.layout.pc
  layout.mobile = newData.layout.mobile
  state.store = newData.list
  state.fields = newData.fields
  const curLayout = _.cloneDeep(newData.layout[state.platform])
  utils.combinationData2(curLayout, state.fields)
  state.store = curLayout
  state.config = newData.config
  state.data = newData.data
  state.store.forEach((e) => {
    utils.addContext(e, state.store, false)
  })
  if (!_.isEmpty(value)) {
    state.fields.forEach((e) => {
      if (value[e.key]) {
        e.options.defaultValue = value[e.key]
      }
    })
  }
}
defineExpose({
  state,
  switchPlatform (platform) {
    state.platform = platform
  },
  setData,
  getData
})
</script>
<template>
  <PanelsCanves v-if="state.store.length"></PanelsCanves>
</template>