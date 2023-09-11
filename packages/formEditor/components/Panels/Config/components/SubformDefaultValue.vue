<script>
import _ from 'lodash-es'
import hooks from '@ER/hooks'
import { ref, inject, nextTick, reactive, computed, watch, onMounted, provide, onBeforeUnmount } from 'vue'
import utils from '@ER/utils'
import erFormPreview from '@ER/formEditor/preview.vue'
export default {
  name: 'ConfigSubformDefaultValueComponent',
  inheritAttrs: false,
  customOptions: {}
}
</script>
<script setup>
// let observer = ''
const handle = {}
const ExtraParams = provide('EverrightExtraParams', {
  inSubformDefaultValueComponent: true,
  handle
})
const ER = inject('Everright')
const EReditorPreviewRef = ref('')
const scrollbarRef = ref()
const {
  t,
  lang
} = hooks.useI18n()
const {
  target,
  state
} = hooks.useTarget()
const ns = hooks.useNamespace('ConfigSubformDefaultValueComponent')
const dialogVisible = ref(false)
const handleClosed = () => {
  // tabs.value.forEach(tab => {
  //   tab.rules = []
  // })
}
const openDialog = async () => {
  dialogVisible.value = true
  let rawData = {}
  if (state.mode === 'config') {
    rawData = utils.generateData()
    rawData.list = [target.value]
    rawData = utils.disassemblyData1(_.cloneDeep(rawData))
  } else {
    rawData = ER.getData()
    rawData.list = [{
      type: 'inline',
      columns: [
        target.value.id
      ]
    }]
  }
  await nextTick()
  const value = {}
  value[target.value.key] = target.value.options.defaultValue
  EReditorPreviewRef.value.setData(rawData, value)
}
const closeDialog = () => {
  dialogVisible.value = false
}
const handleAction = (type) => {
  switch (type) {
    case 0:
      closeDialog()
      break
    case 1:
      handle.handleAdd()
      break
    case 2:
      target.value.options.defaultValue = EReditorPreviewRef.value.getData()[target.value.key]
      closeDialog()
      break
  }
}
const callback = (mutationsList) => {
  scrollbarRef.value.setScrollTop(scrollbarRef.value.wrapRef.scrollHeight)
}
onMounted(() => {
  // openDialog()
  nextTick(() => {
    // const config = { attributes: false, childList: true, subtree: true }
    // observer = new MutationObserver(callback)
    // observer.observe(scrollbarRef.value.wrapRef, config)
  })
})

// onBeforeUnmount(() => {
//   observer.disconnect()
//   observer = null
// })
</script>
<template>
  <el-drawer
    destroy-on-close
    size="60%"
    :modal="false"
    append-to-body
    :close-on-press-escape="false"
    :with-header="false"
    @closed="handleClosed"
    :class="[ns.b()]"
    v-model="dialogVisible">
    <div>{{ t('er.config.propsPanel.defaultContent') }}</div>
    <div>
      <el-scrollbar ref="scrollbarRef" max-height="calc(100vh - 180px)">
        <er-form-preview
          ref="EReditorPreviewRef"
          :isShowCompleteButton="false"
        />
      </el-scrollbar>
      <el-button
        :class="[ns.e('button')]"
        @click="handleAction(1)"
        v-bind="utils.addTestId('configPanel:defaultValue:addButton')"
      >
        {{ t('er.public.add')}}
      </el-button>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleAction(0)">
          {{ t('er.public.cancel')}}
        </el-button>
        <el-button type="primary" @click="handleAction(2)">
          {{ t('er.public.confirm')}}
        </el-button>
      </span>
    </template>
  </el-drawer>
  <el-button
    v-bind="utils.addTestId('configPanel:defaultValue:button')"
    style="width: 100%;"
    type="primary"
    @click="openDialog">
    {{ t('er.config.propsPanel.setDefaultContent') }}
  </el-button>
</template>
