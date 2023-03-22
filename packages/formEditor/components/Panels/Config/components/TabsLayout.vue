<script>
import { computed } from 'vue'
import utils from '@ER/utils'
import hooks from '@ER/hooks'
export default {
  name: 'ConfigTabsLayout'
}
</script>
<script setup>
const {
  t
} = hooks.useI18n()
const {
  checkTypeBySelected,
  target
} = hooks.useTarget()
const options = computed(() => {
  return [
    [
      {
        label: t('er.config.tabsLayout.style.options[0]'),
        value: ''
      },
      {
        label: t('er.config.tabsLayout.style.options[1]'),
        value: 'card'
      },
      {
        label: t('er.config.tabsLayout.style.options[2]'),
        value: 'border-card'
      }
    ],
    [
      {
        label: t('er.config.tabsLayout.tabPosition.options[0]'),
        value: 'top'
      },
      {
        label: t('er.config.tabsLayout.tabPosition.options[1]'),
        value: 'bottom'
      },
      {
        label: t('er.config.tabsLayout.tabPosition.options[2]'),
        value: 'left'
      },
      {
        label: t('er.config.tabsLayout.tabPosition.options[3]'),
        value: 'right'
      }
    ]
  ]
})
</script>
<template>
  <el-form-item :label="t('er.config.tabsLayout.style.label')">
    <el-radio-group v-model="target.options.type">
      <el-radio-button
        v-for="item in options[0]"
        :key="item.value"
        :label="item.value">
        {{item.label}}
      </el-radio-button>
    </el-radio-group>
  </el-form-item>
  <el-form-item :label="t('er.config.tabsLayout.tabPosition.label')">
    <el-radio-group v-model="target.options.tabPosition">
      <el-radio-button
        v-for="item in options[1]"
        :key="item.value"
        :label="item.value">
        {{item.label}}
      </el-radio-button>
    </el-radio-group>
  </el-form-item>
</template>
