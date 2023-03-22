<script>
import { reactive, ref, onUpdated, onMounted } from 'vue'
import utils from '@ER/utils'
import hooks from '@ER/hooks'
import Icon from '@ER/icon'
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
const borderActions = [
  'jurassic_border-none',
  'jurassic_border-all',
  'border-outer',
  'border-inner',
  'border-left',
  'border-right',
  'border-top',
  'border-bottom'
]
const elements = ref([])
const bindingEvent = () => {
  state.default = target.value.style.borderType
  elements.value.forEach(e => {
    e.addEventListener('click', (e) => {
      let value = ''
      if (e.target.tagName === 'I') {
        value = e.target.parentNode.dataset.value
      } else {
        value = e.target.dataset.value
      }
      target.value.style.borderType = state.default = borderActions.indexOf(value)
    })
    e.addEventListener('mouseenter', (e) => {
      target.value.style.borderType = borderActions.indexOf(e.target.dataset.value)
    })
    e.addEventListener('mouseleave', (e) => {
      target.value.style.borderType = state.default
    })
  })
}
onUpdated(bindingEvent)
onMounted(bindingEvent)
</script>
<template>
  <div v-if="checkTypeBySelected(['table'])">
    <el-form-item size="default" :label="t('er.config.borderComponent.borderLine')">
      <div style="width: 100%">
        <ul :class="ns.e('borderStyle')">
          <li :class="index === state.default && 'active'" :data-value="item" ref="elements" v-for="(item, index) in borderActions" :key="item">
            <Icon :class="[ns.e('icon')]" :icon="item"></Icon>
          </li>
          <li>
            <el-color-picker
              v-model="target.style.borderColor"
            />
          </li>
        </ul>
      </div>
    </el-form-item>
    <el-form-item size="default" :label="t('er.config.borderComponent.borderWidth')">
      <el-input-number
        :min="0"
        v-model="target.style.borderWidth"
        controls-position="right"
      />
    </el-form-item>
  </div>
  <div v-else>
    <el-form-item size="default" label="Border">
      <div>
        <el-row :gutter="14">
          <el-col :span="12">
            <div>{{t('er.public.width')}}</div>
            <el-input-number
              :step="10"
              v-model="target.style.border.width"
              controls-position="right"
            />
          </el-col>
          <el-col :span="12">
            <div>{{t('er.public.radius')}}</div>
            <el-input-number
              :step="10"
              v-model="target.style.borderRadius"
              controls-position="right"
            />
          </el-col>
        </el-row>
        <el-row :gutter="14">
          <el-col :span="12">
            <div>{{t('er.public.style')}}</div>
            <el-select v-model="target.style.border.style" placeholder="Select" size="large">
              <el-option
                v-for="item in options0"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-col>
          <el-col :span="12">
            <div>{{t('er.public.color')}}</div>
            <el-color-picker
              v-model="target.style.border.color"
            />
          </el-col>
        </el-row>
      </div>
    </el-form-item>
  </div>
</template>
