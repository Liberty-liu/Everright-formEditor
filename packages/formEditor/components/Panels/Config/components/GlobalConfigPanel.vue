<script>
import dayjs from 'dayjs'
import hooks from '@ER/hooks'
import DeviceSwitch from '@ER/formEditor/components/DeviceSwitch.vue'
import _ from 'lodash-es'
import { ref, unref, computed, inject } from 'vue'
import { ClickOutside as vClickOutside } from 'element-plus'
import CompleteButton from '@ER/formEditor/components/CompleteButton.vue'
import PanelsConfigComponentsTypeComponent from './TypeComponent.vue'
import PanelsConfigComponentsLogicComponent from './LogicComponent.vue'
import utils from '@ER/utils'
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
const ER = inject('Everright')
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
const options0 = computed(() => {
  return [
    {
      label: t('er.config.globalConfig.labelPosition.top'),
      value: 'top',
      icon: 'labelStructureP1'
    },
    {
      label: t('er.config.globalConfig.labelPosition.left'),
      value: 'left',
      icon: 'labelStructureP2'
    },
    {
      label: t('er.config.globalConfig.labelPosition.right'),
      value: 'right',
      icon: 'labelStructureP3'
    }
  ]
})
const options1 = computed(() => {
  return [
    {
      label: t('er.config.globalConfig.componentSize.large'),
      value: 'large'
    },
    {
      label: t('er.config.globalConfig.componentSize.default'),
      value: 'default'
    },
    {
      label: t('er.config.globalConfig.componentSize.small'),
      value: 'small'
    }
  ]
})
const handleTypeListener = ({ property, data }) => {
  switch (property) {
    case 'labelPosition':
      handleModelValue('labelPosition', data.value)
      break
    case 'size':
      target.value[state.platform].size = data.value
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
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728=""><path fill="currentColor" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm23.744 191.488c-52.096 0-92.928 14.784-123.2 44.352-30.976 29.568-45.76 70.4-45.76 122.496h80.256c0-29.568 5.632-52.8 17.6-68.992 13.376-19.712 35.2-28.864 66.176-28.864 23.936 0 42.944 6.336 56.32 19.712 12.672 13.376 19.712 31.68 19.712 54.912 0 17.6-6.336 34.496-19.008 49.984l-8.448 9.856c-45.76 40.832-73.216 70.4-82.368 89.408-9.856 19.008-14.08 42.24-14.08 68.992v9.856h80.96v-9.856c0-16.896 3.52-31.68 10.56-45.76 6.336-12.672 15.488-24.64 28.16-35.2 33.792-29.568 54.208-48.576 60.544-55.616 16.896-22.528 26.048-51.392 26.048-86.592 0-42.944-14.08-76.736-42.24-101.376-28.16-25.344-65.472-37.312-111.232-37.312zm-12.672 406.208a54.272 54.272 0 0 0-38.72 14.784 49.408 49.408 0 0 0-15.488 38.016c0 15.488 4.928 28.16 15.488 38.016A54.848 54.848 0 0 0 523.072 768c15.488 0 28.16-4.928 38.72-14.784a51.52 51.52 0 0 0 16.192-38.72 51.968 51.968 0 0 0-15.488-38.016 55.936 55.936 0 0 0-39.424-14.784z"></path></svg>
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
    <el-form-item
      :label="t('er.config.globalConfig.sync.label')"
      label-position="left"
      v-bind="utils.addTestId('configPanel:isSync')"
    >
      <el-switch
        ref="buttonRef"
        v-click-outside:[popperPaneRef]="onClickOutside"
        :before-change="handleBeforeChange"
        v-model="target.isSync"/>
    </el-form-item>
    <PanelsConfigComponentsTypeComponent
      v-if="isPc"
      @listener="handleTypeListener"
      property="size"
      :layoutType="2"
      :label="t('er.config.globalConfig.componentSize.label')"
      :val="target[state.platform].size"
      :nodes="options1"
      v-bind="utils.addTestId('configPanel:size')"
    />
    <PanelsConfigComponentsTypeComponent
      @listener="handleTypeListener"
      property="labelPosition"
      :label="t('er.config.globalConfig.labelPosition.label')"
      :height="66"
      :fontSize="80"
      :val="target[state.platform].labelPosition"
      :nodes="options0"
      v-bind="utils.addTestId('configPanel:labelPosition')"
    />
    <el-form-item
      v-if="ER.props.isShowCompleteButton"
      :label="t('er.public.button')"
      v-bind="utils.addTestId('configPanel:completeButton')"
    >
      <div style="width: 100%;">
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
          <el-row :gutter="8" style="margin-top: 20px;">
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
    <PanelsConfigComponentsLogicComponent/>
  </div>
</template>
