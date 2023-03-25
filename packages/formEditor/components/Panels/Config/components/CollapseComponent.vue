<script>
import utils from '@ER/utils'
import hooks from '@ER/hooks'
import Icon from '@ER/icon'
export default {
  name: 'ConfigCollapseComponent',
  inheritAttrs: false,
  customOptions: {}
}
</script>
<script setup>
const {
  target
} = hooks.useTarget()
const {
  t
} = hooks.useI18n()
const ns = hooks.useNamespace('ConfigCollapseComponent')
const props = defineProps({
  field: {
    type: String,
    required: true
  },
  operationKey: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  }
})
</script>
<template>
  <div :class="ns.b()">
    <el-form-item :label="t('er.config.propsPanel.brushColor')">
      <template v-slot:label>
        <div :class="ns.e('label')">
          <div>
            <div>{{label}}</div>
            <slot name="subSelect" v-if="target[operationKey][field]"></slot>
          </div>
          <Icon :icon="target[operationKey][field] ? 'del' : 'signature'" @click="target[operationKey][field] = !target[operationKey][field]"></Icon>
        </div>
      </template>
      <slot name="content" v-if="target[operationKey][field]"></slot>
    </el-form-item>
  </div>
<!--  <div :class="[ns.b(), target.options[field] && ns.e('open')]">-->
<!--    <el-checkbox v-model="target.options[field]" @change="(newValue) => $emit('change', newValue)" :label="label" size="large"></el-checkbox>-->
<!--    <template v-if="mode === 1">-->
<!--      <template v-if="$slots.default">-->
<!--        <div :class="[ns.e('slot')]" v-show="target.options[field]"><slot></slot></div>-->
<!--      </template>-->
<!--    </template>-->
<!--    <template v-else>-->
<!--      <div :class="[ns.e('slot')]"><slot></slot></div>-->
<!--    </template>-->
<!--  </div>-->
</template>
