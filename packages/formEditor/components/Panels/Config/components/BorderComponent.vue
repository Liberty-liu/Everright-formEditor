<script>
import PanelsConfigComponentsTypeComponent from './TypeComponent.vue'
import { reactive, ref, onUpdated, onMounted } from 'vue'
import utils from '@ER/utils'
import hooks from '@ER/hooks'
import Icon from '@ER/icon'
import _ from 'lodash-es'
export default {
  name: 'ConfigBorder',
  inheritAttrs: false,
  customOptions: {}
}
</script>
<script setup>
const {
  target,
  checkTypeBySelected
} = hooks.useTarget()
const {
  t
} = hooks.useI18n()
const ns = hooks.useNamespace('ConfigBorder')
const options0 = [
  'none',
  'solid',
  'dotted',
  'dashed',
  'double',
  'groove',
  'ridge',
  'inset',
  'outset'
]
const state = reactive({
  default: 0
})
// const borderActions = [
//   'jurassic_border-none',
//   'jurassic_border-all',
//   'border-outer',
//   'border-inner',
//   'border-left',
//   'border-right',
//   'border-top',
//   'border-bottom'
// ]
const borderActions = new Array(8).fill('tableStokeP').map((e, i) => {
  return {
    value: i,
    icon: e + (i + 1)
  }
})
if (checkTypeBySelected(['table'])) {
  if (!_.has(target.value.style, 'borderColor') || !_.has(target.value.style, 'borderWidth') || !_.has(target.value.style, 'borderType')) {
    target.value.style.borderColor = '#000'
    target.value.style.borderWidth = target.value.style.borderType = 1
  }
} else {
  if (!target.value.style.border) {
    target.value.style.borderRadius = 0
    target.value.style.border = {
      width: 1,
      style: 'solid',
      color: '#4285f4'
    }
  }
}
// const bindingEvent = () => {
//   state.default = target.value.style.borderType
//   elements.value.forEach(e => {
//     e.addEventListener('click', (e) => {
//       let value = ''
//       if (e.target.tagName === 'I') {
//         value = e.target.parentNode.dataset.value
//       } else {
//         value = e.target.dataset.value
//       }
//       target.value.style.borderType = state.default = borderActions.indexOf(value)
//     })
//     e.addEventListener('mouseenter', (e) => {
//       target.value.style.borderType = borderActions.indexOf(e.target.dataset.value)
//     })
//     e.addEventListener('mouseleave', (e) => {
//       target.value.style.borderType = state.default
//     })
//   })
// }
// onUpdated(bindingEvent)
// onMounted(bindingEvent)
const handleTypeListener = ({ property, data }) => {
  if (property === 'borderType') {
    target.value.style.borderType = data.value
  }
}
</script>
<template>
  <div :class="[ns.b()]">
    <div v-if="checkTypeBySelected(['table'])">
      <PanelsConfigComponentsTypeComponent
        @listener="handleTypeListener"
        property="borderType"
        :height="30"
        :fontSize="18"
        :val="target.style.borderType"
        :nodes="borderActions"
      />
      <el-row justify="space-between" align="middle">
        <el-col :span="5">
          <el-color-picker
            v-model="target.style.borderColor"
          />
        </el-col>
        <el-col :span="18">
          <el-form-item size="default" :label="t('er.config.borderComponent.borderWidth')">
            <el-input-number
              style="width: 100%;"
              :min="0"
              v-model="target.style.borderWidth"
              controls-position="right"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </div>
    <div v-else>
      <el-row justify="space-between" align="middle">
        <el-col :span="3">
          <el-form-item >
            <el-color-picker
              v-model="target.style.border.color"
            />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item>
            <template v-slot:label>
              <Icon icon="lineThickness"/>
            </template>
            <el-input-number
              :step="1"
              :min="0"
              v-model="target.style.border.width"
              controls-position="right"
            />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item>
            <template v-slot:label>
              <Icon icon="radius"/>
            </template>
            <el-input-number
              :step="1"
              :min="0"
              v-model="target.style.borderRadius"
              controls-position="right"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
