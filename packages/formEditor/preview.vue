<script>
import { defineProps, ref, reactive, computed, provide, getCurrentInstance, watch, nextTick, onMounted } from 'vue'
import CanvesPanel from '@ER/formEditor/components/Panels/Canves'
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
  selection: {},
  platform: utils.isPc() ? 'pc' : 'mobile',
  mode: 'preview',
  config: {},
  Namespace: 'formEditor',
  validateStates: [],
  data: {},
  fields: []
})
const ns = hooks.useNamespace('Main', state.Namespace)
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
const setData2 = (data, value) => {
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
const setData1 = (data, value) => {
  if (_.isEmpty(data)) return false
  const newData = utils.combinationData1(_.cloneDeep(data))
  console.log(newData)
  state.store = newData.list
  state.config = newData.config
  state.data = newData.data
  state.fields = newData.fields
  state.store.forEach((e) => {
    utils.addContext(e, state.store)
  })
  if (!_.isEmpty(value)) {
    state.fields.forEach((e) => {
      if (value[e.key]) {
        e.options.defaultValue = value[e.key]
      }
    })
  }
}
const setData = props.layoutType === 1 ? setData1 : setData2
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
  <CanvesPanel v-if="state.store.length"></CanvesPanel>
</template>
