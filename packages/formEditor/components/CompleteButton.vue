<script>
import { ref, unref, inject } from 'vue'
import _ from 'lodash-es'
import hooks from '@ER/hooks'
export default {
  name: 'er-CompleteButton'
}
</script>
<script setup>
const ER = inject('Everright')
const props = defineProps({
  handle: {
    type: Object
  },
  mode: {
    type: String,
    default: 'edit'
  }
})
const ns = hooks.useNamespace('CompleteButton')
const {
  state,
  isPc
} = hooks.useTarget()
const element = ref('')
const handleClick = async (type) => {
  if (props.mode === 'preview') return false
  try {
    await Promise.resolve(unref(props.handle).validate())
    // await ER.checkFieldsValidation()
    ER.fireEvent('submit', ER.getData())
  } catch (e) {
    console.log(e)
  }
}
const dataset = process.env.NODE_ENV === 'test' ? { 'data-test': 'er-complete-button' } : {}
</script>
<template>
  <div v-bind="dataset">
    <div v-if="isPc" style="text-align: center;">
      <el-button @click="handleClick" :color="state.config[state.platform].completeButton.backgroundColor" type="primary">
        <span :style="{color: state.config[state.platform].completeButton.color }">{{ state.config[state.platform].completeButton.text }}</span>
      </el-button>
    </div>
    <div v-else>
      <van-button @click="handleClick" round block type="primary" :color="state.config[state.platform].completeButton.backgroundColor">
        <span :style="{color: state.config[state.platform].completeButton.color }">{{ state.config[state.platform].completeButton.text }}</span>
      </van-button>
    </div>
  </div>
</template>

<style scoped>

</style>
