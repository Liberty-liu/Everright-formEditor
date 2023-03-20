<script>
import { ref, inject } from 'vue'
import hooks from '@ER/hooks'
import Icon from '@ER/icon'
export default {
  name: 'er-DeviceSwitch'
}
</script>
<script setup>
const props = defineProps({
  justifyContent: {
    type: String,
    required: true
  }
})
const ER = inject('Everright')
const ns = hooks.useNamespace('DeviceSwitch')
const {
  state
} = hooks.useTarget()
const element = ref('')
// defineExpose({
//   $el: element
// })
</script>
<template>
  <div :class="[ns.b()]" :style="{ justifyContent: justifyContent}">
    <div>
      <Icon @click="() => ER.switchPlatform('pc')" icon="pc" :class="[ns.e('icon'), state.platform === 'pc' && 'active']"></Icon>
      <Icon @click="() => ER.switchPlatform('mobile')" icon="iphone" :class="[ns.e('icon'), state.platform === 'mobile' && 'active']"></Icon>
    </div>
  </div>
</template>

<style scoped>

</style>
