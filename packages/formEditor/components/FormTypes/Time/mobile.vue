<script>
import hooks from '@ER/hooks'
import { ref, computed, watch } from 'vue'
import dayjs from 'dayjs'
export default {
  name: 'er-time',
  inheritAttrs: false,
  customOptions: {}
}
</script>
<script setup>
const props = defineProps(['data', 'params'])
const showPicker = ref(false)
const currentTime = ref()
const columnsType = ['hour', 'minute', 'second']
watch(() => props.data.options.defaultValue, (newVal) => {
  let date = ''
  if (newVal) {
    date = dayjs(`${dayjs().format('YYYY/MM/DD')} ${newVal.split(':')}`, 'YYYY/MM/DD HH:mm:ss')
  } else {
    date = dayjs()
  }
  currentTime.value = date.format('HH:mm:ss').split(':')
}, {
  immediate: true
})
const currentValue = computed({
  get () {
    let result = ''
    if (props.data.options.defaultValue) {
      result = dayjs(`${dayjs().format('YYYY/MM/DD')} ${props.data.options.defaultValue.split(':')}`, 'YYYY/MM/DD HH:mm:ss').format(props.data.options.format)
    }
    return result
  },
  set (value) {
    props.data.options.defaultValue = value.join(':')
  }
})
const onConfirm = (value) => {
  showPicker.value = false
  currentValue.value = value.selectedValues
}
const onCancel = ({ selectedOptions }) => {
  showPicker.value = false
}
const onClear = () => {
  props.data.options.defaultValue = ''
}
</script>
<template>
  <van-field
    readonly
    v-model="currentValue"
    v-bind="params"
    @click="!params.disabled && (showPicker = true)"
  >
    <template v-if="!params.disabled && currentValue && params.clearable" #button>
      <van-icon @click.stop="onClear" name="clear" />
    </template>
  </van-field>
  <van-popup v-model:show="showPicker" round position="bottom">
    <van-time-picker
      v-bind="params"
      @confirm="onConfirm"
      @cancel="onCancel"
      :columns-type="columnsType"
      v-model="currentTime"
    />
  </van-popup>
</template>

<style scoped>

</style>
