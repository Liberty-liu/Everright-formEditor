<script>
import utils from '@ER/utils'
import hooks from '@ER/hooks'
import { computed, defineComponent, resolveComponent, ref, unref } from 'vue'
import { dragGableWrap } from '@ER/formEditor/components/Layout/DragGable.jsx'
import Icon from '@ER/icon'
export default {
  name: 'ConfigData3'
}
</script>
<script setup>
const {
  checkTypeBySelected,
  target
} = hooks.useTarget()
const {
  t
} = hooks.useI18n()
const ns = hooks.useNamespace('ConfigData3')
const handleAction = (type) => {
  switch (type) {
    case 1:
      const type = `${target.value.type}Col`
      const data = utils.renderFieldData(type)
      data.label = `Tab ${unref(target).columns.length + 1}`
      // console.log(unref(target))
      unref(target).columns.push(data)
      utils.addContext(data, target.value)
      break
    case 2:
      break
  }
}
</script>
<template>
  <el-form-item>
    <template v-slot:label>
      <div :class="[ns.e('title')]">
        <span class="el-form-item__label">{{t('er.config.dataComponent3.panel')}}</span>
        <el-button text @click="handleAction(1)">{{t('er.config.dataComponent3.add')}}</el-button>
      </div>
    </template>
    <div style="width: 100%;">
      <dragGableWrap
        :list="target.columns"
        item-key="id"
        tag="ul"
        handle=".handle"
        :class="[ns.e('content')]"
      >
        <template v-slot:item="{ element, index }">
          <li>
            <el-input
              size="default"
              clearable
              v-model="element.label"/>
            <div :class="ns.e('operate')">
              <Icon :class="[ns.e('icon')]" @click="target.columns.splice(index, 1)" icon="delete"></Icon>
              <Icon :class="[ns.e('icon'), 'handle']" icon="Rank"></Icon>
            </div>
          </li>
        </template>
      </dragGableWrap>
    </div>
  </el-form-item>
</template>
