<script>
import { ArrowRight } from '@element-plus/icons-vue'
import NAME from '@ER/formEditor/name.js'
import hooks from '@ER/hooks'
import { ref, computed, reactive, watch, onMounted } from 'vue'
import _ from 'lodash-es'
import Icon from '@ER/icon'
import PanelsConfigComponentsPropsPanel from '@ER/formEditor/components/Panels/Config/components/PropsPanel.vue'
import GlobalConfigPanel from './components/GlobalConfigPanel.vue'
// import PanelsConfigComponentsDataPanel from './components/Data.jsx'
export default {
  name: NAME.ERCONFIG,
  inheritAttrs: false,
  customOptions: {}
}
</script>
<script setup>
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
  state.validator(target.value, (type) => {
    switch (type) {
      case 0:
        callback(new Error('必填'))
        break
      case 1:
        callback()
        break
      case 2:
        callback(new Error('重复'))
        break
    }
  })
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
  let result = ['root']
  // if (!_.isEmpty(target.value)) {
  //   result = result.concat(target.value.context.parents)
  // }
  if (!isSelectRoot.value) {
    result = result.concat(target.value.context.parents.filter(e => e.type !== 'inline'))
  }
  return result
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
  <el-aside :class="[ns.b()]" width="412px">
    <el-breadcrumb :class="[ns.e('breadcrumb')]" :separator-icon="ArrowRight">
<!--      <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>-->
<!--      <el-breadcrumb-item>promotion list</el-breadcrumb-item>-->
<!--      <el-breadcrumb-item>promotion detail</el-breadcrumb-item>-->
      <el-breadcrumb-item @click="index !== bars.length - 1 && handleBreadcrumbClick(item)" v-for="(item, index) in bars" :key="index">
        {{index ? item.type : item}}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      size="large"
      ref="form"
      :model="target"
      :rules="rules"
      label-width="120px"
      label-position="top">
      <el-tabs
        v-model="activeName0" type="border-card"
        :class="[ns.e('wrap')]"
        name="content">
        <el-tab-pane
          v-if="isSelectAnyElement"
          name="props">
          <template #label>
            <span class="custom-tabs-label">
              <span>属性</span>
            </span>
          </template>
          <el-scrollbar>
            <PanelsConfigComponentsPropsPanel
              :key="target.id"
            />
          </el-scrollbar>
        </el-tab-pane>
<!--        v-if="!checkTypeBySelected(['table', 'td', 'grid', 'col', 'tabsCol', 'collapseCol'])"-->
        <el-tab-pane
          v-if="isSelectRoot"
          name="root">
          <template #label>
            <span class="custom-tabs-label">
              <span>全局配置</span>
            </span>
          </template>
          <el-scrollbar>
            <GlobalConfigPanel></GlobalConfigPanel>
          </el-scrollbar>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </el-aside>
</template>
