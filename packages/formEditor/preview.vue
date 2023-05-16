<script>
import { defineProps, ref, reactive, computed, provide, getCurrentInstance, watch, nextTick, onMounted } from 'vue'
import CanvesPanel from '@ER/formEditor/components/Panels/Canves'
import hooks from '@ER/hooks'
import utils from '@ER/utils'
import _ from 'lodash-es'
import defaultProps from './defaultProps'
import { ElMessage } from 'element-plus'
import { showNotify } from 'vant'
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
  fields: [],
  logic: {},
  // fieldsVisibility: ref(new WeakMap()),
  // fieldsRequired: ref(new WeakMap()),
  // fieldsValidation: new Map(),
  fieldsLogicState: new Map()
})
const ns = hooks.useNamespace('Main', state.Namespace)
hooks.useLogic(state)
// const checkFieldsValidation = async () => {
//   for (const [key, value] of state.fieldsValidation) {
//     if (value) {
//       if (utils.isPc()) {
//         ElMessage({
//           message: key.value,
//           type: 'warning'
//         })
//       } else {
//         showNotify({ type: 'warning', message: key.value })
//       }
//       return Promise.reject(key)
//     }
//   }
//   return Promise.resolve()
// }
// window.checkFieldsValidation = checkFieldsValidation
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
  // checkFieldsValidation
})
window.state = state
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
  state.logic = newData.logic
  state.store.forEach((e) => {
    utils.addContext(e, state.store, false)
  })
  if (!_.isEmpty(value)) {
    state.fields.forEach((e) => {
      if (e.type === 'time' && !e.options.valueFormat) {
        e.options.valueFormat = 'HH:mm:ss'
      }
      if (value[e.key]) {
        e.options.defaultValue = value[e.key]
      }
    })
  }
}
const setData1 = (data, value) => {
  if (_.isEmpty(data)) return false
  const newData = utils.combinationData1(_.cloneDeep(data))
  state.store = newData.list
  state.config = newData.config
  state.data = newData.data
  state.fields = newData.fields
  state.logic = newData.logic
  state.store.forEach((e) => {
    utils.addContext(e, state.store)
  })
  if (!_.isEmpty(value)) {
    state.fields.forEach((e) => {
      if (e.type === 'time' && !e.options.valueFormat) {
        e.options.valueFormat = 'HH:mm:ss'
      }
      if (value[e.key]) {
        e.options.defaultValue = value[e.key]
      }
    })
  }
}
const setData = props.layoutType === 1 ? setData1 : setData2
defineExpose({
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
