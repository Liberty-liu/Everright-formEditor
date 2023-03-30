<script>
import utils from '@ER/utils'
import hooks from '@ER/hooks'
import { ref, computed, reactive, watch, onMounted, inject } from 'vue'
import _ from 'lodash-es'
import Icon from '@ER/icon'
import PanelsConfigComponentsPropsPanel from '@ER/formEditor/components/Panels/Config/components/PropsPanel.vue'
import GlobalConfigPanel from './components/GlobalConfigPanel.vue'
// import PanelsConfigComponentsDataPanel from './components/Data.jsx'
export default {
  name: 'Config',
  inheritAttrs: false,
  customOptions: {}
}
</script>
<script setup>
const props = defineProps({
  mode: {
    type: String,
    default: 'editor'
  }
})
const {
  state,
  isSelectAnyElement,
  isSelectField,
  isSelectRoot,
  setSector,
  type,
  checkTypeBySelected,
  target,
  isSelectGrid,
  isSelectTabs,
  isSelectCollapse,
  isSelectTable
} = hooks.useTarget()
const ER = inject('Everright')
const {
  t
} = hooks.useI18n()
const activeName0 = ref('props')
const isShow = computed(() => {
  return !_.isEmpty(state.sector) && state.sector.type !== 'grid'
})
const ns = hooks.useNamespace('Config')
const form = ref()
const handleChangePanel = (panel) => {
  // activeName0.value = panel
}
const validator = (rule, value, callback) => {
  const newValue = value.trim()
  const fn = (type) => {
    switch (type) {
      case 0:
        callback(new Error(t('er.validateMsg.required')))
        break
      case 1:
        callback()
        break
      case 2:
        callback(new Error(t('er.validateMsg.idUnique')))
        break
    }
  }
  if (props.mode === 'editor') {
    state.validator(target.value, fn)
  } else {
    if (utils.isNull(newValue)) {
      fn(0)
    } else {
      fn(1)
    }
  }

  // if (newValue === '' || newValue === null || newValue === undefined) {
  //   callback(new Error('必填'))
  //   return false
  // } else {
  //   state.validator(newValue, (valid) => {
  //     if (valid) {
  //       callback()
  //     } else {
  //       callback(new Error('重复'))
  //     }
  //   })
  //
  // }
}
onMounted(() => {
  form.value.validate()
})
const rules = reactive({
  key: [
    {
      required: true,
      trigger: 'blur',
      validator
    }
  ]
})
const bars = computed(() => {
  let nodes = ['root']
  let result = []
  // if (!_.isEmpty(target.value)) {
  //   result = result.concat(target.value.context.parents)
  // }
  if (!isSelectRoot.value) {
    nodes = nodes.concat(target.value.context.parents.filter(e => !/^(inline|tr)$/.test(e.type)))
  }
  if (nodes.length > 4) {
    result.push(nodes[0])
    result.push({
      value: 'placeholder'
    })
    result.push(nodes[nodes.length - 2])
    result.push(nodes[nodes.length - 1])
  } else {
    result = nodes
  }
  console.log(result)
  return result.map(node => {
    const result = {
      // eslint-disable-next-line
      node: node,
      label: ''
    }
    if (node === 'root') {
      result.label = t('er.panels.config')
    } else if (node.value !== 'placeholder') {
      if (/^(col|collapseCol|tabsCol|td)$/.test(node.type)) {
        result.label = t(`er.layout.${node.type}`)
      } else {
        result.label = utils.fieldLabel(t, node)
      }
    }
    return result
  })
})
const handleBreadcrumbClick = (item) => {
  if (item !== 'root') {
    setSector(item)
  } else {
    setSector('root')
  }
}
watch(target, () => {
  if (isSelectRoot.value) {
    activeName0.value = 'root'
  } else {
    activeName0.value = 'props'
  }
}, {
  immediate: true
})
</script>
<template>
  <el-aside :class="[ns.b()]" :width="ER.props.configPanelWidth">
    <el-breadcrumb :class="[ns.e('breadcrumb')]" separator-icon="ArrowRight">
      <el-breadcrumb-item @click="(index !== bars.length - 1 && item.node.value !== 'placeholder') && handleBreadcrumbClick(item.node)" v-for="(item, index) in bars" :key="index">
        {{item.node.value === 'placeholder' ? '...' : item.label}}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      ref="form"
      :model="target"
      :rules="rules"
      label-width="120px"
      label-position="top">
      <el-scrollbar>
        <div :class="[ns.e('wrap')]">
          <div v-if="isSelectAnyElement">
            <PanelsConfigComponentsPropsPanel
              :key="target.id"
            />
          </div>
          <div v-if="isSelectRoot">
            <GlobalConfigPanel></GlobalConfigPanel>
          </div>
        </div>
      </el-scrollbar>
<!--      <el-tabs-->
<!--        v-model="activeName0" type="border-card"-->
<!--        :class="[ns.e('wrap')]"-->
<!--        name="content">-->
<!--        <el-tab-pane-->
<!--          v-if="isSelectAnyElement"-->
<!--          name="props">-->
<!--          <el-scrollbar>-->
<!--            <PanelsConfigComponentsPropsPanel-->
<!--              :key="target.id"-->
<!--            />-->
<!--          </el-scrollbar>-->
<!--        </el-tab-pane>-->
<!--&lt;!&ndash;        v-if="!checkTypeBySelected(['table', 'td', 'grid', 'col', 'tabsCol', 'collapseCol'])"&ndash;&gt;-->
<!--        <el-tab-pane-->
<!--          v-if="isSelectRoot"-->
<!--          name="root">-->
<!--          <el-scrollbar>-->
<!--            <GlobalConfigPanel></GlobalConfigPanel>-->
<!--          </el-scrollbar>-->
<!--        </el-tab-pane>-->
<!--      </el-tabs>-->
    </el-form>
  </el-aside>
</template>
