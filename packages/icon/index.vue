<script>
import { ref, computed } from 'vue'
import hooks from '@ER/hooks'
import svg from './svg'
import _ from 'lodash-es'
export default {
  name: 'er-icon'
}
</script>
<script setup>
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String,
    required: true
  },
  fontSize: {
    type: Number
  }
})
const style = computed(() => {
  const result = {}
  if (!_.isUndefined(props.fontSize)) {
    result.fontSize = `${props.fontSize}px`
  }
  return result
})
const element = ref('')
// defineExpose({
//   $el: element
// })
</script>
<template>
<i ref="element" :class="[
  `ER-icon`,
  // `ER-icon-${props.icon}`,
  props.disabled && 'is-disabled'
  // props.disabled && ns.e('disabled')
  ]"
   :style="style"
>
  <component :is="svg[props.icon]"></component>
</i>
</template>

<style scoped>

</style>
