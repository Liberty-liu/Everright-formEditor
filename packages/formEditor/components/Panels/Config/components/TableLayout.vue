<script>
import hooks from '@ER/hooks'
export default {
  name: 'ConfigTableLayout'
}
</script>
<script setup>
defineEmits(['changePanel'])
const {
  checkTypeBySelected,
  target
} = hooks.useTarget()
</script>
<template>
  <el-form-item label="宽度">
    <el-input
      v-model="target.options.width"
    >
      <template #append>
        <el-select v-model="target.options.widthType" placeholder="Select" style="width: 80px">
          <el-option label="%" value="%" />
          <el-option label="px" value="px" />
        </el-select>
      </template>
    </el-input>
  </el-form-item>
  <el-form-item label="边框宽度">
    <el-input-number
      style="width: 100%;"
      :min="0"
      controls-position="right"
      v-model="target.options.borderWidth" />
  </el-form-item>
  <el-form-item label="边框颜色">
    <el-color-picker
      color-format="rgb"
      v-model="target.options.borderColor"
    />
  </el-form-item>
</template>
