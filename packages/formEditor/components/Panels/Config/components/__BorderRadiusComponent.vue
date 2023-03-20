<script>
export default {
  name: 'ConfigPadding',
  inheritAttrs: false,
  customOptions: {}
}
</script>
<script setup>
// const {
//   setupState:
//       {
//         state
//       }
// } = inject('EverrightEditor')
const {
  state
} = hooks.useTarget()
const nums = reactive([0, 0, 0, 0])
const cssStyle = utils.cssStyle()
watch(() => state.sector.style['border-radius'], (newVal) => {
  console.log(newVal)
  console.log(cssStyle.stringConverJson('borderRadius', newVal))
  // cssStyle.stringConverJson('border-radius', newVal).forEach((e, i) => {
  //   nums[i] = e
  // })
})
watch(nums, (newVal) => {
  // console.log(cssStyle.jsonConvertString('border-radius', newVal))
  state.sector.style['border-radius'] = cssStyle.jsonConvertString('borderRadius', newVal)
})
</script>
<template>
  <el-form-item label="Border radius">
    <el-row :gutter="14">
      <el-col :span="12">
        <div>Top Left</div>
        <el-input-number
            v-model="nums[0]"
            controls-position="right"
        />
      </el-col>
      <el-col :span="12">
        <div>Top Right</div>
        <el-input-number
            v-model="nums[1]"
            controls-position="right"
        />
      </el-col>
    </el-row>
    <el-row :gutter="14">
      <el-col :span="12">
        <div>Bottom Left</div>
        <el-input-number
            v-model="nums[2]"
            controls-position="right"
        />
      </el-col>
      <el-col :span="12">
        <div>Bottom Right</div>
        <el-input-number
            v-model="nums[3]"
            controls-position="right"
        />
      </el-col>
    </el-row>
  </el-form-item>
</template>
