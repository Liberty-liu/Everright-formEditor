<script>
import utils from '@ER/utils'
import hooks from '@ER/hooks'
import { computed, defineComponent, resolveComponent, ref, unref, watch } from 'vue'
import { dragGableWrap } from '@ER/formEditor/components/Layout/DragGable.jsx'
import Icon from '@ER/icon'
import _ from 'lodash-es'
export default {
  name: 'ConfigData3'
}
</script>
<script setup>
const {
  checkTypeBySelected,
  target
} = hooks.useTarget()
const checkList = ref([])
const {
  t
} = hooks.useI18n()
const ns = hooks.useNamespace('ConfigData3')
if (checkTypeBySelected(['collapse'])) {
  watch(() => target.value.options.accordion, (newVal) => {
    if (newVal) {
      target.value.options.defaultValue = target.value.columns[0].id
    } else {
      target.value.options.defaultValue = [target.value.columns[0].id]
    }
    checkList.value = [target.value.columns[0].id]
  })
  checkList.value = target.value.options.accordion ? [target.value.options.defaultValue] : _.cloneDeep(target.value.options.defaultValue)
} else if (checkTypeBySelected(['tabs'])) {
  checkList.value = [target.value.columns[0].id]
}
const addTab = (type) => {
  const data = utils.renderFieldData(`${target.value.type}Col`)
  data.label = `Tab ${unref(target).columns.length + 1}`
  unref(target).columns.push(data)
  utils.addContext(data, target.value)
}
const handleChange = (value, item) => {
  if (checkTypeBySelected(['collapse'])) {
    if (target.value.options.accordion) {
      if (!value) {
        checkList.value.push(item.id)
        return false
      }
      checkList.value.filter(e => e !== item.id).forEach((e) => {
        checkList.value.splice(checkList.value.indexOf(e), 1)
      })
      target.value.options.defaultValue = _.head(checkList.value)
    } else {
      target.value.options.defaultValue = _.cloneDeep(checkList.value)
    }
  } else if (checkTypeBySelected(['tabs'])) {
    if (!value) {
      return false
    }
    checkList.value.filter(e => e !== item.id).forEach((e) => {
      checkList.value.splice(checkList.value.indexOf(e), 1)
    })
    target.value.options.defaultValue = _.head(checkList.value)
  }
}
</script>
<template>
  <el-form-item>
    <template v-slot:label>
      <div :class="[ns.e('title')]">
        <span class="el-form-item__label">{{t('er.config.dataComponent3.panel')}}</span>
        <el-button text @click="addTab">{{t('er.config.dataComponent3.add')}}</el-button>
      </div>
    </template>
    <div style="width: 100%;">
      <el-checkbox-group v-model="checkList">
        <dragGableWrap
          :list="target.columns"
          item-key="id"
          tag="ul"
          handle=".handle"
          :class="[ns.e('content')]"
        >
          <template v-slot:item="{ element, index }">
            <li>
              <el-checkbox @change="(e) => handleChange(e, element)" :label="element.id"><br/></el-checkbox>
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
      </el-checkbox-group>
    </div>
  </el-form-item>
</template>
