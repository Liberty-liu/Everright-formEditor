<script>
import hooks from '@ER/hooks'
export default {
  name: 'ConfigTableLayout'
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
</script>
<template>
  <el-form-item :label="t('er.public.width')">
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
  <el-form-item :label="t('er.public.borderWidth')">
    <el-input-number
      style="width: 100%;"
      :min="0"
      controls-position="right"
      v-model="target.options.borderWidth" />
  </el-form-item>
  <el-form-item :label="t('er.public.borderColor')">
    <el-color-picker
      color-format="rgb"
      v-model="target.options.borderColor"
    />
  </el-form-item>
</template>
