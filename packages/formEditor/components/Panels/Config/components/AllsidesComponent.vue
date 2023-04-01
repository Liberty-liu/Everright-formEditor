<script>
import utils from '@ER/utils'
import hooks from '@ER/hooks'
import { isReactive } from 'vue'
export default {
  name: 'ConfigAllsides',
  inheritAttrs: false,
  customOptions: {}
}
</script>
<script setup>
const {
  t
} = hooks.useI18n()
const {
  target
} = hooks.useTarget()
const ns = hooks.useNamespace('ConfigAllsides')
const props = defineProps({
  field: {
    type: String,
    required: true
  },
  min: {
    type: Number,
    default: 0
  }
})
if (!target.value.style[props.field]) {
  const defaultVal = props.field === 'margin' ? 0 : 16
  target.value.style[props.field] = {
    top: defaultVal,
    right: defaultVal,
    bottom: defaultVal,
    left: defaultVal
  }
}
// console.log(target.value.style)
</script>
<template>
  <div>
    <div :class="[ns.b()]">
      <el-row :gutter="14" justify="center">
        <el-col :span="12">
          <el-input-number
            :step="10"
            :min="props.min"
            v-model="target.style[props.field].left"
            controls-position="right"
          />
        </el-col>
        <el-col :span="12">
          <el-input-number
            :step="10"
            :min="props.min"
            v-model="target.style[props.field].top"
            controls-position="right"
          />
        </el-col>
      </el-row>
      <el-row :gutter="14" justify="center">
        <el-col :span="12">
          <el-input-number
            :step="10"
            :min="props.min"
            v-model="target.style[props.field].right"
            controls-position="right"
          />
        </el-col>
        <el-col :span="12">
          <el-input-number
            :step="10"
            :min="props.min"
            v-model="target.style[props.field].bottom"
            controls-position="right"
          />
        </el-col>
      </el-row>
    </div>
  </div>
</template>
