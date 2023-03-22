<script>
import dayjs from 'dayjs'
import hooks from '@ER/hooks'
import { ref, computed, watch } from 'vue'
import _ from 'lodash-es'
// 统一交换时间戳
export default {
  name: 'er-date',
  inheritAttrs: false,
  customOptions: {}
}
</script>
<script setup>
const {
  t
} = hooks.useI18n()
const props = defineProps(['data', 'params'])
const showPicker = ref(false)
const currentDate = ref('')
const currentTime = ref('')
const calendar = ref()
const element = ref()
const columnsType = ['hour', 'minute', 'second']
watch([() => props.params.type, () => props.data.options.defaultValue], (newVal) => {
  if (newVal[0] === 'date') {
    currentDate.value = (newVal[1] ? dayjs.unix(newVal[1]) : dayjs()).format('YYYY/MM/DD').split('/')
  } else if (newVal[0] === 'datetime') {
    let date = ''
    if (newVal[1]) {
      date = dayjs.unix(newVal[1])
    } else {
      date = dayjs()
    }
    currentDate.value = date.format('YYYY/MM/DD').split('/')
    currentTime.value = date.format('HH:mm:ss').split(':')
  }
}, {
  immediate: true
})
const currentValue = computed({
  get () {
    let result = ''
    if (props.data.options.defaultValue) {
      if (props.params.type === 'date') {
        result = dayjs.unix(props.data.options.defaultValue).format(props.data.options.format)
      } else if (props.params.type === 'dates') {
        result = props.data.options.defaultValue.map((e) => dayjs.unix(e).format(props.data.options.format)).join(',')
      } else if (props.params.type === 'daterange') {
        const [start, end] = props.data.options.defaultValue
        result = `${dayjs.unix(start).format(props.data.options.format)} - ${dayjs.unix(end).format(props.data.options.format)}`
      } else if (props.params.type === 'datetime') {
        result = dayjs.unix(props.data.options.defaultValue).format(props.data.options.format)
      }
    }
    return result
  },
  set (value) {
    if (props.params.type === 'date') {
      props.data.options.defaultValue = String(dayjs(value).unix())
    } else if (props.params.type === 'dates') {
      props.data.options.defaultValue = value.map(e => String(dayjs(e).unix()))
    } else if (props.params.type === 'daterange') {
      props.data.options.defaultValue = value.map(e => String(dayjs(e).unix()))
    } else if (props.params.type === 'datetime') {
      props.data.options.defaultValue = String(dayjs(`${value[0].join('/')} ${value[1].join(':')}`, 'YYYY/MM/DD HH:mm:ss').unix())
    }
  }
})
const onConfirm = (value) => {
  showPicker.value = false
  if (props.params.type === 'date') {
    currentValue.value = currentDate.value
  } else if (props.params.type === 'dates') {
    currentValue.value = value
  } else if (props.params.type === 'daterange') {
    currentValue.value = value
  } else if (props.params.type === 'datetime') {
    currentValue.value = [value[0].selectedValues, value[1].selectedValues]
  }
}
const onCancel = () => {
  showPicker.value = false
}
const onClear = () => {
  props.data.options.defaultValue = ''
  if (/^(dates|daterange)$/.test(props.params.type)) {
    calendar.value.reset()
  }
  element.value.validate()
}
</script>
<template>
  <van-field
    ref="element"
    readonly
    v-model="currentValue"
    v-bind="params"
    @click="!params.disabled && (showPicker = true)"
  >
    <template v-if="!params.disabled && currentValue && params.clearable" #button>
      <van-icon @click.stop="onClear" name="clear" />
    </template>
    <template #input>
      <input
        v-if="!data.options.defaultValue"
        :placeholder="params.placeholder"
        class="van-field__control"
        readonly
        type="text">
      <template v-else>
        {{currentValue}}
      </template>
    </template>
  </van-field>
  <van-popup v-if="params.type === 'date'" v-model:show="showPicker" round position="bottom">
    <van-date-picker
      v-bind="params"
      @confirm="onConfirm"
      @cancel="onCancel"
      v-model="currentDate"
    />
  </van-popup>
  <van-popup v-if="params.type === 'datetime'" v-model:show="showPicker" round position="bottom">
    <van-picker-group
      v-if="params.type === 'datetime'"
      :tabs="[t('er.form.selectDate'), t('er.form.selectTime')]"
      @confirm="onConfirm"
      @cancel="onCancel"
    >
      <van-date-picker
        v-model="currentDate"
        v-bind="params"
      />
      <van-time-picker
        :columns-type="columnsType"
        v-model="currentTime" />
    </van-picker-group>
  </van-popup>
  <van-calendar ref="calendar" v-if="params.type === 'dates'" v-bind="params" v-model:show="showPicker" type="multiple" @confirm="onConfirm" />
  <van-calendar ref="calendar" v-if="params.type === 'daterange'" v-bind="params" v-model:show="showPicker" type="range" @confirm="onConfirm" />
</template>

<style scoped>

</style>
