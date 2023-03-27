<script>
import dayjs from 'dayjs'
import hooks from '@ER/hooks'
import DeviceSwitch from '@ER/formEditor/components/DeviceSwitch.vue'
import _ from 'lodash-es'
import { ref, unref, computed } from 'vue'
import { ClickOutside as vClickOutside } from 'element-plus'
import CompleteButton from '@ER/formEditor/components/CompleteButton.vue'
export default {
  name: 'GlobalConfigPanel',
  inheritAttrs: false,
  customOptions: {}
}
</script>
<script setup>
const {
  target,
  state,
  isPc
} = hooks.useTarget()
const {
  t
} = hooks.useI18n()
const ns = hooks.useNamespace('GlobalConfigPanel')
const compareKeys = ['labelPosition', 'completeButton']
const visible = ref(false)
const buttonRef = ref()
const popoverRef = ref()
const radio1 = ref('pc')
const handleModelValue = (type, value) => {
  const platforms = target.value.isSync ? ['pc', 'mobile'] : [state.platform]
  platforms.forEach((e) => {
    _.set(target.value, `${e}.${type}`, value)
  })
}
const popperPaneRef = computed(() => {
  return _.get(unref(popoverRef), 'popperRef.contentRef', '')
})
let handleConfirm = ''
const handleBeforeChange = () => {
  // visible.value = true
  return new Promise((resolve, reject) => {
    const pcObj = _.pick(unref(target).pc, compareKeys)
    const mobileObj = _.pick(unref(target).mobile, compareKeys)
    if (_.isEqual(pcObj, mobileObj)) {
      resolve(true)
    } else {
      visible.value = true
      handleConfirm = resolve
    }
  })
}
const onClickOutside = () => {
  visible.value = false
}
const handleClick = (type) => {
  visible.value = false
  switch (type) {
    case 2:
      const targetObj = target.value[radio1.value === 'pc' ? 'mobile' : 'pc']
      const sourceObj = _.pick(unref(target)[radio1.value], compareKeys)
      Object.assign(targetObj, _.cloneDeep(sourceObj))
      handleConfirm(true)
      break
  }
}
</script>
<template>
  <div>
    <el-popover
      virtual-triggering
      :visible="visible"
      ref="popoverRef"
      :virtual-ref="buttonRef"
      :width="200">
      <div>
        <div :class="[ns.e('syncContent')]">
          <el-icon color="#f90">
            <QuestionFilled />
          </el-icon>
          {{ t('er.config.globalConfig.sync.warning') }}
        </div>
        <el-radio-group :class="[ns.e('syncType')]" v-model="radio1" class="ml-4">
          <el-radio label="pc">pc</el-radio>
          <el-radio label="mobile">mobile</el-radio>
        </el-radio-group>
      </div>
      <div :class="[ns.e('syncActions')]">
        <el-button
          size="small"
          :text="true"
          @click="handleClick(1)"
        >{{t('er.public.cancel')}}</el-button>
        <el-button
          size="small"
          type="primary"
          @click="handleClick(2)"
        >
          {{ t('er.public.confirm') }}
        </el-button>
      </div>
    </el-popover>
<!--    <DeviceSwitch justify-content="center"></DeviceSwitch>-->
    <el-form-item :label="t('er.config.globalConfig.sync.label')" label-position="left">
      <el-switch
        ref="buttonRef"
        v-click-outside:[popperPaneRef]="onClickOutside"
        :before-change="handleBeforeChange"
        v-model="target.isSync"/>
    </el-form-item>
    <el-form-item :label="t('er.config.globalConfig.componentSize.label')" v-if="isPc">
      <el-radio-group v-model="target[state.platform].size" size="large">
        <el-radio-button label="large">{{t('er.config.globalConfig.componentSize.large')}}</el-radio-button>
        <el-radio-button label="default" >{{t('er.config.globalConfig.componentSize.default')}}</el-radio-button>
        <el-radio-button label="small" >{{t('er.config.globalConfig.componentSize.small')}}</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item :label="t('er.config.globalConfig.labelPosition.label')">
<!--      <el-radio-group v-model="target[state.platform].labelPosition" size="large">-->
      <el-radio-group :model-value="target[state.platform].labelPosition" @update:modelValue="(e) => handleModelValue('labelPosition', e)" size="large">
        <el-radio-button name="left" label="left">{{t('er.config.globalConfig.labelPosition.left')}}</el-radio-button>
        <el-radio-button name="top" label="top">{{t('er.config.globalConfig.labelPosition.top')}}</el-radio-button>
        <el-radio-button name="right" label="right">{{t('er.config.globalConfig.labelPosition.right')}}</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item :label="t('er.public.button')">
      <div>
        <div>
          <CompleteButton mode="preview"/>
        </div>
        <div>
          <el-row :gutter="8">
            <el-col>
              <el-form-item :label="t('er.public.text')">
                <el-input
                  :model-value="target[state.platform].completeButton.text"
                  show-word-limit
                  :maxlength="20"
                  @update:modelValue="(e) => handleModelValue('completeButton.text', e)"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="8">
            <el-col :span="12">
              <el-form-item :label="t('er.public.color')">
                <el-color-picker
                  :popper-class="ns.e('completeButtonColor')"
                  :model-value="target[state.platform].completeButton.color"
                  @update:modelValue="(e) => handleModelValue('completeButton.color', e)"
                  show-alpha
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="t('er.public.backgroundColor')">
                <el-color-picker
                  :popper-class="ns.e('completeButtonColor')"
                  :model-value="target[state.platform].completeButton.backgroundColor"
                  @update:modelValue="(e) => handleModelValue('completeButton.backgroundColor', e)"
                  show-alpha
                />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-form-item>
  </div>
</template>
