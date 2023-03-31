<script>
import { resolveComponent } from 'vue'
import utils from '@ER/utils'
import hooks from '@ER/hooks'
import Icon from '@ER/icon'
export default {
  name: 'ConfigTypeComponent'
}
</script>
<script setup>
const emit = defineEmits(['listener'])
const {
  target
} = hooks.useTarget()
const {
  t
} = hooks.useI18n()
const ns = hooks.useNamespace('ConfigTypeComponent')
const props = defineProps({
  label: {
    type: String
  },
  nodes: {
    type: Array
  },
  height: {
    type: Number
  },
  property: {
    type: String
  },
  val: {
    type: [String, Number, Boolean]
  },
  fontSize: {
    type: Number
  },
  layoutType: {
    type: Number,
    default: 1
  }
})
const fireEvent = (property, item) => {
  emit('listener', {
    property,
    data: item
  })
}
</script>
<template>
  <div :class="ns.b()">
    <el-form-item>
      <template v-if="label" v-slot:label>
        <div :class="ns.e('label')">
          <div>
            <div>{{label}}</div>
          </div>
          <template v-if="layoutType === 2">
            <el-radio-group size="small" :modelValue="val" @change="(curVal) => fireEvent(property, { value: curVal })">
              <el-radio-button v-for="item in nodes" :label="item.value" :key="item.value">{{ item.label }}</el-radio-button>
            </el-radio-group>
          </template>
        </div>
      </template>
      <ul v-if="layoutType === 1" ref="elements" :class="[ns.e('content')]" :style="{ height: height + 2 + 'px'}">
        <li
          @click="() => !item.disabled && fireEvent(property, item)"
          v-for="item in nodes"
          :key="item.value"
          :class="[
            val !== undefined && item.value === val && ns.is('Selected'),
            item.disabled && ns.is('Disabled')
          ]"
        >
          <Icon
            :icon="item.icon"
            :fontSize="fontSize"
          />
        </li>
      </ul>
      <div :class="[ns.e('slot')]">
        <slot v-if="layoutType === 0"></slot>
      </div>
    </el-form-item>
  </div>
</template>
