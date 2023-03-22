<script>
import { ClickOutside as vClickOutside } from 'element-plus'
import { defineProps, ref, reactive, computed, provide, getCurrentInstance, nextTick, onMounted } from 'vue'
import PanelsBlocks from '@ER/formEditor/components/Panels/Blocks'
import PanelsCanves from '@ER/formEditor/components/Panels/Canves'
import PanelsConfig from '@ER/formEditor/components/Panels/Config/index.vue'
import Icon from '@ER/icon'
import NAME from '@ER/formEditor/name.js'
import ClipboardJS from 'clipboard'
import hooks from '@ER/hooks'
import utils from '@ER/utils'
import { fieldConfig } from './componentsConfig'
import _ from 'lodash-es'
import defaultProps from './defaultProps'
// import utilsa from '@ER/formEditor/name.js'
export default {
  name: NAME.EVERRIGHTEDITOR
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
  blocks: fieldConfig,
  store: [],
  sector: {},
  mode: 'edit',
  platform: 'pc',
  children: [],
  config: {
    isSync: true,
    pc: {
      size: 'default',
      labelPosition: 'left',
      completeButton: {
        text: '提交',
        color: '',
        backgroundColor: ''
      }
    },
    mobile: {
      labelPosition: 'left',
      completeButton: {
        text: '提交',
        color: '',
        backgroundColor: ''
      }
    }
  },
  previewVisible: false,
  widthScaleLock: false,
  data: {},
  validateStates: [],
  fields: [],
  Namespace: 'formEditor'
})
state.validator = (target, fn) => {
  if (target) {
    const count = _.countBy(state.validateStates, 'data.key')
    const newValue = target.key.trim()
    if (newValue === '' || newValue === null || newValue === undefined) {
      _.find(state.validateStates, { data: { key: target.key } }).isWarning = true
      fn && fn(0)
      return false
    }
    state.validateStates.forEach(e => {
      if (count[e.data.key] > 1) {
        e.isWarning = true
      } else {
        e.isWarning = false
      }
    })
    if (fn) {
      fn(!(count[newValue] > 1) ? 1 : 2)
    }
  } else {
    fn(state.validateStates.every(e => !e.isWarning))
  }
}
const {
  canUndo,
  canRedo,
  undo,
  redo,
  undoStack,
  redoStack,
  last
  // stop,
  // restart
} = hooks.useHistory(state)
const {
  t
} = hooks.useI18n(props)
const element = ref('')
const copyElement = ref(null)
const isShow = ref(true)
const isShowConfig = ref(true)
const loading = ref(false)
const setSector = (node) => {
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
  isShowConfig.value = false
  state.sector = result
  nextTick(() => {
    isShowConfig.value = true
  })
}
setSector(state.config)
const addField = (node) => {
  if (utils.checkIsField(node.type)) {
    const findIndex = _.findIndex(state.fields, {
      id: node.id
    })
    if (findIndex === -1) {
      state.fields.push(node)
    } else {
      state.fields.splice(findIndex, 1, node)
    }
  }
}
const delField = (node) => {
  const fieldIndex = _.findIndex(state.fields, {
    id: node.id
  })
  if (fieldIndex !== -1) {
    state.fields.splice(fieldIndex, 1)
  }
}
const addFieldData = (node) => {
  if (/^(radio|cascader|checkbox|select)$/.test(node.type)) {
    if (!state.data[node.id]) {
      node.options.dataKey = node.id
      state.data[node.id] = {
        type: node.type,
        list: utils.generateOptions(3).map((e, i) => {
          e.label += i + 1
          return e
        })
      }
    }
  }
  if (/^(uploadfile|signature|html)$/.test(node.type)) {
    node.options.action = props.fileUploadURI
  }
}
const wrapElement = (el, isWrap = true, isSetSector = true, sourceBlock = true) => {
  const newEl = isWrap
    ? {
        type: 'inline',
        columns: [
          el
        ]
      }
    : el
  if (sourceBlock) {
    el.label = utils.fieldLabel(t, el)
  }
  const node = sourceBlock
    ? utils.wrapElement(newEl, (node) => {
      addFieldData(node)
      addField(node)
    })
    : newEl
  if (isSetSector) {
    nextTick(() => {
      setSector(node)
    })
  }
  return node
}
const syncLayout = (platform, fn) => {
  const isPc = platform === 'pc'
  const original = _.cloneDeep(state.store)
  utils.disassemblyData2(original)
  layout[isPc ? 'mobile' : 'pc'] = original
  if (_.isEmpty(isPc ? layout.pc : layout.mobile)) {
    // const newData = _.cloneDeep(state.fields.map(e => wrapElement(e, true, false)))
    const newData = state.fields.map(e => wrapElement(e, true, false))
    fn && fn(newData)
  } else {
    const layoutFields = utils.pickfields(isPc ? layout.pc : layout.mobile).map(e => {
      return {
        id: e
      }
    })
    const copyData = _.cloneDeep(isPc ? layout.pc : layout.mobile)
    const addFields = _.differenceBy(state.fields, layoutFields, 'id')
    utils.combinationData2(copyData, state.fields)
    copyData.push(...addFields.map(e => wrapElement(e, true, false)))
    fn && fn(copyData)
  }
}
const getLayoutDataByplatform = (platform) => {
  const isPc = platform === 'pc'
  if (_.isEmpty(isPc ? layout.pc : layout.mobile)) {
    if (platform === state.platform) {
      const original = _.cloneDeep(state.store)
      utils.disassemblyData2(original)
      return original
    } else {
      const newData = _.cloneDeep(state.fields.map(e => wrapElement(e, true, false)))
      utils.disassemblyData2(newData)
      return newData
    }
  } else {
    if (platform === state.platform) {
      const isPc = platform === 'pc'
      const original = _.cloneDeep(state.store)
      utils.disassemblyData2(original)
      layout[isPc ? 'pc' : 'mobile'] = original
    }
    const layoutFields = utils.pickfields(isPc ? layout.pc : layout.mobile).map(e => {
      return {
        id: e
      }
    })
    const copyData = _.cloneDeep(isPc ? layout.pc : layout.mobile)
    const addFields = _.differenceBy(state.fields, layoutFields, 'id')
    utils.combinationData2(copyData, state.fields)
    copyData.push(...addFields.map(e => wrapElement(e, true, false)))
    utils.disassemblyData2(copyData)
    return copyData
  }
}
window.layout = layout
const switchPlatform = (platform) => {
  if (props.layoutType === 2) {
    syncLayout(platform, (newData) => {
      state.store = newData
      state.store.forEach((e) => {
        utils.addContext(e, state.store)
      })
    })
  }
  state.platform = platform
  setSector('root')
}
provide('Everright', {
  state,
  setSector,
  props,
  wrapElement,
  delField,
  addField,
  switchPlatform,
  addFieldData
})
window.state = state
const ns = hooks.useNamespace('Main', state.Namespace)
hooks.useTarget()
const getData1 = () => {
  return utils.disassemblyData1(_.cloneDeep({
    list: state.store,
    config: state.config,
    data: state.data
  }))
}
const getData2 = () => {
  layout.pc = getLayoutDataByplatform('pc')
  layout.mobile = getLayoutDataByplatform('mobile')
  return _.cloneDeep({
    layout,
    data: state.data,
    config: state.config,
    fields: state.fields
  })
}
const setData1 = (data) => {
  if (_.isEmpty(data)) return false
  // stop()
  const newData = utils.combinationData1(data)
  isShow.value = false
  // console.log(data.list.slice(data.list.length - 1))
  state.store = newData.list
  // state.store = data.list.slice(data.list.length - 1)
  state.config = newData.config
  state.data = newData.data
  setSector(state.config)
  state.store.forEach((e) => {
    utils.addContext(e, state.store)
  })
  nextTick(() => {
    isShow.value = true
    // restart()
  })
}
const setData2 = (data) => {
  if (_.isEmpty(data)) return false
  // stop()
  const newData = _.cloneDeep(data)
  layout.pc = newData.layout.pc
  layout.mobile = newData.layout.mobile
  isShow.value = false
  state.store = newData.list
  state.fields = newData.fields
  const curLayout = _.cloneDeep(newData.layout[state.platform])
  utils.combinationData2(curLayout, state.fields)
  state.store = curLayout
  state.config = newData.config
  state.data = newData.data
  setSector(state.config)
  state.store.forEach((e) => {
    utils.addContext(e, state.store)
  })
  nextTick(() => {
    isShow.value = true
    // restart()
  })
}
const clearData = () => {
  // layout.pc = []
  // layout.mobile = []
  // state.fields.splice(0)
  // state.store.splice(0)
}
const getData = props.layoutType === 1 ? getData1 : getData2
const setData = props.layoutType === 1 ? setData1 : setData2
defineExpose({
  state,
  switchPlatform (platform) {
    switchPlatform(platform)
  },
  setData,
  getData
})
const handleOperation = (type) => {
  switch (type) {
    case 1:
      break
    case 2:
      // state.store = []
      layout.pc = []
      layout.mobile = []
      state.fields.splice(0)
      state.store.splice(0)
      setSector('root')
      break
    case 3:
      state.previewVisible = true
      nextTick(() => {
        element.value.setData(getData())
      })
      break
    case 4:
      emit('listener', {
        type: 'getJson',
        data: getData()
      })
      break
  }
}
const onClickOutside = () => {
  // setSector('root')
}
</script>
<template>
<!--  <el-dialog destroy-on-close :class="[ns.e('previewDialog')]" fullscreen v-model="state.previewVisible">-->
<!--    <el-scrollbar>-->
<!--      <div :class="[ns.e('device')]">-->
<!--        <div>-->
<!--          <Icon @click="element.swtchPlatform('pc')" icon="pc" :class="[ns.e('icon'), element && element.state.platform === 'pc' && 'active']"></Icon>-->
<!--          <Icon @click="element.swtchPlatform('mobile')" icon="iphone" :class="[ns.e('icon'), element && element.state.platform === 'mobile' && 'active']"></Icon>-->
<!--        </div>-->
<!--      </div>-->
<!--      <current ref="element" mode="preview"></current>-->
<!--    </el-scrollbar>-->
<!--    <div>123123</div>-->
<!--  </el-dialog>-->
  <el-container v-loading="loading" :class="[ns.b()]" direction="vertical">
    <el-container :class="[ns.e('operation')]">
      <el-aside width="300px"></el-aside>
      <el-container>
        <el-row align="middle" justify="space-between" style="width:100%;">
          <el-col :span="6" :class="[ns.e('device')]">
            <Icon :disabled="!canUndo" :class="[ns.e('icon')]" @click="undo()" icon="undo"></Icon>
            <Icon :disabled="!canRedo" :class="[ns.e('icon')]" @click="redo()" icon="redo"></Icon>
          </el-col>
          <el-col :span="3">
            <Icon @click="handleOperation(1)" :class="[ns.e('icon')]" icon="jurassic_import-form"></Icon>
            <Icon @click="handleOperation(2)" :class="[ns.e('icon')]" icon="CLEAR"></Icon>
            <Icon @click="handleOperation(3)" :class="[ns.e('icon')]" icon="yulan"></Icon>
            <Icon @click="handleOperation(4)" :class="[ns.e('icon'), 'getJson']" icon="json"></Icon>
            <div></div>
          </el-col>
        </el-row>
      </el-container>
      <el-aside width="350px"></el-aside>
    </el-container>
    <el-container :class="[ns.e('container')]">
      <PanelsBlocks></PanelsBlocks>
      <PanelsCanves v-click-outside="onClickOutside" v-if="isShow" :data="state.store"></PanelsCanves>
      <PanelsConfig v-if="isShow && isShowConfig"></PanelsConfig>
    </el-container>
  </el-container>
</template>
