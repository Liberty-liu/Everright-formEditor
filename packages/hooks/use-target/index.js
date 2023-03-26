import { defineProps, ref, reactive, computed, provide, getCurrentInstance, inject, onBeforeUnmount, unref } from 'vue'
import _ from 'lodash-es'
import utils from '@ER/utils'
export const useTarget = () => {
  // const Instance = getCurrentInstance()
  // const {
  //   type: {
  //     name
  //   }
  // } = Instance
  const { state, setSector } = inject('Everright')
  // onBeforeUnmount(() => {
  //   state.children.splice(state.children.indexOf(Instance), 1)
  // })
  // state.children.push(Instance)
  const sector = computed(() => {
    return state.sector
  })
  const isSelectAnyElement = computed({
    get () {
      // return !_.isEmpty(state.sector)
      return state.sector !== state.config
    }
  })
  const isSelectRoot = computed({
    get () {
      return state.sector === state.config
    }
  })
  const type = computed(() => {
    return state.sector.type
  })
  const isSelectField = computed({
    get () {
      return utils.checkIsField(type.value)
    }
  })
  const target = computed({
    get () {
      return state.sector
    }
  })
  const col = computed({
    get () {
      return !_.isEmpty(state.sector) && state.sector.context.col
    }
  })
  const checkTypeBySelected = (nodes = []) => {
    let result = false
    if (!_.isEmpty(state.sector)) {
      result = nodes.includes(type.value)
    }
    // if (!unref(isSelectRoot)) {
    //   result = nodes.includes(type.value)
    // }
    return result
  }
  const isSelectGrid = computed({
    get () {
      return checkTypeBySelected(['grid'])
    }
  })
  const isSelectTabs = computed({
    get () {
      return checkTypeBySelected(['tabs'])
    }
  })
  const isSelectCollapse = computed({
    get () {
      return checkTypeBySelected(['collapse'])
    }
  })
  const isSelectTable = computed({
    get () {
      return checkTypeBySelected(['table'])
    }
  })
  const isPc = computed({
    get () {
      return state.platform === 'pc'
    }
  })
  const isEditModel = computed({
    get () {
      return /^(edit|config)$/.test(state.mode)
    }
  })
  return {
    state,
    setSector,
    type,
    col,
    sector,
    isSelectAnyElement,
    isSelectField,
    target,
    checkTypeBySelected,
    isSelectGrid,
    isSelectTabs,
    isSelectCollapse,
    isSelectTable,
    isSelectRoot,
    isPc,
    isEditModel
  }
}
