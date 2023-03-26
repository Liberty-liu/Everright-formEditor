<script>
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
    type: Array,
    required: true
  },
  height: {
    type: Number,
    required: true
  },
  property: {
    type: String,
    required: true
  },
  val: {
    type: [String, Number]
  },
  fontSize: {
    type: Number
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
        </div>
      </template>
      <ul ref="elements" :class="[ns.e('content')]" :style="{ height: height + 2 + 'px'}">
        <li
          @click="() => fireEvent(property, item)"
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
    </el-form-item>
  </div>
</template>
