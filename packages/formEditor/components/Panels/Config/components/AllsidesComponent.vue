<script>
import utils from '@ER/utils'
import hooks from '@ER/hooks'
export default {
  name: 'ConfigAllsides',
  inheritAttrs: false,
  customOptions: {}
}
</script>
<script setup>
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
</script>
<template>
  <el-form-item size="default" :label="props.field">
    <span class="subhead">单位：px</span>
    <div :class="[ns.b()]">
      <el-row :gutter="14" justify="center">
        <el-col :span="12">
          <el-input-number
            :step="10"
            :min="props.min"
            size="large"
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
            size="large"
            v-model="target.style[props.field].left"
            controls-position="right"
          />
        </el-col>
        <el-col :span="12">
          <el-input-number
            :step="10"
            :min="props.min"
            size="large"
            v-model="target.style[props.field].right"
            controls-position="right"
          />
        </el-col>
      </el-row>
      <el-row :gutter="14" justify="center">
        <el-col :span="12">
          <el-input-number
            :step="10"
            :min="props.min"
            size="large"
            v-model="target.style[props.field].bottom"
            controls-position="right"
          />
        </el-col>
      </el-row>
    </div>
<!--    <el-row :gutter="14">-->
<!--      <el-col :span="12">-->
<!--        <div>Top</div>-->
<!--        <el-input-number-->
<!--          :step="10"-->
<!--          v-model="target.style[props.field].top"-->
<!--          controls-position="right"-->
<!--        />-->
<!--      </el-col>-->
<!--      <el-col :span="12">-->
<!--        <div>Bottom</div>-->
<!--        <el-input-number-->
<!--          :step="10"-->
<!--          v-model="target.style[props.field].bottom"-->
<!--          controls-position="right"-->
<!--        />-->
<!--      </el-col>-->
<!--    </el-row>-->
<!--    <el-row :gutter="14">-->
<!--      <el-col :span="12">-->
<!--        <div>Left</div>-->
<!--        <el-input-number-->
<!--          :step="10"-->
<!--          v-model="target.style[props.field].left"-->
<!--          controls-position="right"-->
<!--        />-->
<!--      </el-col>-->
<!--      <el-col :span="12">-->
<!--        <div>Right</div>-->
<!--        <el-input-number-->
<!--          :step="10"-->
<!--          v-model="target.style[props.field].right"-->
<!--          controls-position="right"-->
<!--        />-->
<!--      </el-col>-->
<!--    </el-row>-->
  </el-form-item>
</template>
