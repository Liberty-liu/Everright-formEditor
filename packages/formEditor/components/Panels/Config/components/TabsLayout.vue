<script>
import utils from '@ER/utils'
import hooks from '@ER/hooks'
export default {
  name: 'ConfigGridLayout'
}
</script>
<script setup>
defineEmits(['changePanel'])
const {
  checkTypeBySelected,
  target
} = hooks.useTarget()
const options0 = [
  {
    label: '默认',
    value: ''
  },
  {
    label: '选项卡',
    value: 'card'
  },
  {
    label: '卡片化',
    value: 'border-card'
  }
]
const options1 = [
  {
    label: '顶部',
    value: 'top'
  },
  {
    label: '底部',
    value: 'bottom'
  },
  {
    label: '左侧',
    value: 'left'
  },
  {
    label: '右侧',
    value: 'right'
  }
]
</script>
<template>
  <el-form-item label="风格类型">
    <el-radio-group v-model="target.options.type">
      <el-radio-button
        v-for="item in options0"
        :key="item.value"
        :label="item.value">
        {{item.label}}
      </el-radio-button>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="选项卡位置">
    <el-radio-group v-model="target.options.tabPosition">
      <el-radio-button
        v-for="item in options1"
        :key="item.value"
        :label="item.value">
        {{item.label}}
      </el-radio-button>
    </el-radio-group>
  </el-form-item>
</template>
