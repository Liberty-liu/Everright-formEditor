<script>
import hooks from '@ER/hooks'
import { ref, watch, inject, computed } from 'vue'
import _ from 'lodash-es'
export default {
  name: 'er-other',
  inheritAttrs: false,
  customOptions: {}
}
</script>
<script setup>
const ER = inject('Everright')
const ns = hooks.useNamespace('FormTypesOther_mobile')
const props = defineProps(['data', 'params'])
const isShow = ref(false)
const key = props.data.key + '_other'
const value = computed({
  set (newVal) {
    ER.state.othersFiles[key] = newVal
  },
  get () {
    return ER.state.othersFiles[key] || ''
  }
})
watch(() => props.data.options.defaultValue, (newVal) => {
  isShow.value = (_.isArray(newVal) ? newVal : [newVal]).includes('other')
}, {
  immediate: true
})
</script>

<template>
  <div
    v-if="isShow"
    :class="[ns.b()]">
    <van-field
      v-model="value"
      :clearable="true"
      type="textarea"
      :placeholder="data.options.otherPlaceholder"
    />
  </div>
<!--<div-->
<!--  v-if="isShow"-->
<!--  :class="[ns.b()]">-->
<!--  <el-input-->
<!--    v-model="data.options.defaultValue"-->
<!--    type="textarea"-->
<!--    placeholder="Please input"-->
<!--    :rows="2"-->
<!--    v-bind="params"/>-->
<!--</div>-->
</template>
