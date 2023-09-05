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
  fieldsLogicState: new Map()
})
const ns = hooks.useNamespace('Main', state.Namespace)
hooks.useLogic(state)
const getData = () => {
  const result = {}
  state.fields.forEach(e => {
    if (e.type === 'subform') {
      result[e.key] = e.list.map(e => {
        const cur = {}
        const children = []
        e.forEach(e => {
          e.columns.forEach(e => {
            children.push(e)
          })
        })
        children.forEach(e => {
          cur[e.key] = e.options.defaultValue
        })
        return cur
      })
    } else {
      if (!utils.checkIsInSubform(e)) {
        result[e.key] = e.options.defaultValue
      }
    }
  })
  return _.cloneDeep(result)
}
const fireEvent = (type, data) => {
  emit('listener', {
    type,
    data
  })
}
provide('Everright', {
  state,
  getData,
  props,
  fireEvent
  // checkFieldsValidation
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
const setValue = (field, value) => {
  if (field.type === 'time' && !field.options.valueFormat) {
    field.options.valueFormat = 'HH:mm:ss'
  }
  field.options.defaultValue = value
}
const setData1 = async (data, value) => {
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
  // For SubformLayout.jsx to get the first data
  await nextTick()
  if (!_.isEmpty(value)) {
    state.fields.forEach((field) => {
      if (field.type === 'subform') {
        const addData = _.cloneDeep(field.list[0])
        for (let i = 1; i < value[field.key].length; i++) {
          field.list.push(addData)
        }
        field.list[field.list.length - 1].forEach(e => {
          utils.addContext(e, field)
        })
        field.list.forEach((e, index) => {
          e.forEach(e => {
            e.columns.forEach(e => {
              if (value[field.key]) {
                setValue(e, value[field.key][index][e.key])
              }
            })
          })
        })
      } else {
        if (!utils.checkIsInSubform(field)) {
          if (value[field.key]) {
            setValue(field, value[field.key])
          }
        }
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
