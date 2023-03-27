<script>
import utils from '@ER/utils'
import hooks from '@ER/hooks'
export default {
  name: 'ConfigCheckboxComponent',
  inheritAttrs: false,
  customOptions: {}
}
</script>
<script setup>
const {
  target
} = hooks.useTarget()
const ns = hooks.useNamespace('ConfigCheckboxComponent')
const props = defineProps({
  field: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  }
  // mode: {
  //   type: Number,
  //   default: 1
  // }
})
</script>
<template>
  <div :class="[ns.b(), target.options[field] && ns.e('open')]">
    <el-checkbox v-model="target.options[field]" @change="(newValue) => $emit('change', newValue)" :label="label" size="large"></el-checkbox>
    <template v-if="$slots.default">
      <div :class="[ns.e('slot')]" v-show="target.options[field]"><slot></slot></div>
    </template>
<!--    <template v-if="mode === 1">-->
<!--      <template v-if="$slots.default">-->
<!--        <div :class="[ns.e('slot')]" v-show="target.options[field]"><slot></slot></div>-->
<!--      </template>-->
<!--    </template>-->
<!--    <template v-else>-->
<!--      <div :class="[ns.e('slot')]"><slot></slot></div>-->
<!--    </template>-->
  </div>
</template>
