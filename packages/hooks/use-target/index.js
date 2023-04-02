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
  const {
    state,
    setSelection,
    props
  } = inject('Everright')
  // onBeforeUnmount(() => {
  //   state.children.splice(state.children.indexOf(Instance), 1)
  // })
  // state.children.push(Instance)
  // console.log(props.checkTypeBySelected)
  const selection = computed(() => {
    return state.selected
  })
  const isSelectAnyElement = computed({
    get () {
      return state.selected !== state.config
    }
  })
  const isSelectRoot = computed({
    get () {
      return state.selected === state.config
    }
  })
  const type = computed(() => {
    return state.selected.type
  })
  const isSelectField = computed({
    get () {
      // return utils.checkIsField(type.value)
      return utils.checkIsField(state.selected)
    }
  })
  const target = computed({
    get () {
      return state.selected
    }
  })
  const col = computed({
    get () {
      return !_.isEmpty(state.selected) && state.selected.context.col
    }
  })
  const checkTypeBySelected = (nodes = [], propType) => {
    let result = false
    if (!_.isEmpty(state.selected)) {
      if (type.value) {
        const fn = props.checkPropsBySelected(state.selected, propType)
        // console.log(fn !== undefined ? fn : nodes.includes(type.value))
        result = fn !== undefined ? fn : nodes.includes(type.value)
      } else {
        result = nodes.includes(type.value)
      }
    }
    // props.checkTypeBySelected
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
    setSelection,
    type,
    col,
    selection,
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
