<script>
import { ref, computed, reactive, watchEffect, watch, unref, provide } from 'vue'
import utils from '@ER/utils'
import hooks from '@ER/hooks'
import PanelsConfigComponentsCheckboxComponent from './CheckboxComponent.vue'
import PanelsConfigComponentsCollapseComponent from './CollapseComponent.vue'
import PanelsConfigComponentsTypeComponent from './TypeComponent.vue'
import PanelsConfigComponentsBorderComponent from './BorderComponent.vue'
import PanelsConfigComponentsLimitComponent from './LimitComponent.vue'
// import PanelsConfigComponentsGridLayoutComponent from './GridLayoutComponent.vue'
// import PanelsConfigComponentsTabsLayout from './TabsLayout.vue'
import PanelsConfigComponentsAllsidesComponent from './AllsidesComponent.vue'
import PanelsConfigComponentsBackgroundComponent from './BackgroundComponent.vue'
import PanelsConfigComponentsDataComponent1 from './DataComponent1.jsx'
import PanelsConfigComponentsDataComponent2 from './DataComponent2.jsx'
import PanelsConfigComponentsDataComponent3 from './DataComponent3.vue'
import Icon from '@ER/icon'
export default {
  name: 'ConfigPropsPanel',
  inheritAttrs: false,
  customOptions: {}
}
</script>
<script setup>
const ns = hooks.useNamespace('PropsPanel')
const {
  t
} = hooks.useI18n()
const {
  type,
  state,
  checkTypeBySelected,
  target,
  isSelectField,
  isSelectGrid,
  isSelectTabs,
  isSelectCollapse,
  isSelectTable,
  isPc
} = hooks.useTarget()
defineEmits(['changePanel'])
const bgStatus = ref(false)
provide('Everright-propsPanel', {
  bgStatus
})
const dialogVisible = ref(false)
const dataRef = ref()
const options = [
  {
    value: 'date',
    label: 'date'
  },
  {
    value: 'dates',
    label: 'dates'
  },
  {
    value: 'datetime',
    label: 'datetime'
  },
  // {
  //   value: 'week',
  //   label: 'week'
  // },
  // {
  //   value: 'datetimerange',
  //   label: 'datetimerange'
  // },
  {
    value: 'daterange',
    label: 'daterange'
  }
  // {
  //   value: 'monthrange',
  //   label: 'monthrange'
  // }
]
const options0 = computed(() => {
  let result = []
  if (checkTypeBySelected(['time'])) {
    result = [
      {
        label: 'HH:mm:ss',
        value: 'HH:mm:ss'
      },
      {
        label: 'HH时mm分ss秒',
        value: 'HH时mm分ss秒'
      }
    ]
  }
  if (checkTypeBySelected(['date'])) {
    if (target.value.options.type === 'datetime') {
      result = [
        {
          label: 'YYYY-MM-DD HH:mm:ss',
          value: 'YYYY-MM-DD HH:mm:ss'
        },
        {
          label: 'YYYY-MM-DD hh:mm:ss',
          value: 'YYYY-MM-DD hh:mm:ss'
        }
      ]
    } else {
      result = [
        {
          label: 'YYYY-MM-DD',
          value: 'YYYY-MM-DD'
        },
        {
          label: 'YYYY/MM/DD',
          value: 'YYYY/MM/DD'
        },
        {
          label: 'YYYY年MM月DD日',
          value: 'YYYY年MM月DD日'
        }
      ]
    }
  }
  return result
})
const widthOptions = ['1/4', '1/3', '1/2', '2/3', '3/4', '1']
const options1 = computed(() => {
  return widthOptions.map((e, index) => {
    const result = {
      value: e,
      disabled: false,
      icon: `widthRatioP${index + 1}`
    }
    const otherNodes = target.value.context.parent.columns
    switch (otherNodes.length) {
      case 2:
        result.disabled = /^(1)$/.test(result.value)
        break
      case 3:
        result.disabled = /^(1|3\/4|2\/3|1\/4)$/.test(result.value)
        break
    }
    return result
  })
})
const options2 = [
  'none',
  'solid',
  'dotted',
  'dashed',
  'double',
  'groove',
  'ridge',
  'inset',
  'outset'
]
const options4 = computed(() => {
  return [
    {
      label: t('er.config.tabsLayout.style.options[0]'),
      value: '',
      icon: 'tabStyleP1'
    },
    {
      label: t('er.config.tabsLayout.style.options[1]'),
      value: 'card',
      icon: 'tabStyleP2'
    },
    {
      label: t('er.config.tabsLayout.style.options[2]'),
      value: 'border-card',
      icon: 'tabStyleP3'
    }
  ]
})
const options5 = computed(() => {
  return [
    {
      label: t('er.config.tabsLayout.tabPosition.options[0]'),
      value: 'top',
      icon: 'tabsLocationP1'
    },
    {
      label: t('er.config.tabsLayout.tabPosition.options[1]'),
      value: 'bottom',
      icon: 'tabsLocationP2'
    },
    {
      label: t('er.config.tabsLayout.tabPosition.options[2]'),
      value: 'left',
      icon: 'tabsLocationP3'
    },
    {
      label: t('er.config.tabsLayout.tabPosition.options[3]'),
      value: 'right',
      icon: 'tabsLocationP4'
    }
  ]
})
const options6 = computed(() => {
  return [
    {
      label: t('er.config.gridLayout.justify.options[0]'),
      value: 'start',
      icon: 'horizontalLayoutP1'
    },
    {
      label: t('er.config.gridLayout.justify.options[1]'),
      value: 'end',
      icon: 'horizontalLayoutP2'
    },
    {
      label: t('er.config.gridLayout.justify.options[2]'),
      value: 'center',
      icon: 'horizontalLayoutP3'
    },
    {
      label: t('er.config.gridLayout.justify.options[3]'),
      value: 'space-around',
      icon: 'horizontalLayoutP4'
    },
    {
      label: t('er.config.gridLayout.justify.options[4]'),
      value: 'space-between',
      icon: 'horizontalLayoutP5'
    }
  ]
})
const options7 = computed(() => {
  return [
    {
      label: t('er.config.propsPanel.layout.options[0]'),
      value: 'block'
    },
    {
      label: t('er.config.propsPanel.layout.options[1]'),
      value: 'inline'
    }
  ]
})
const options8 = computed(() => {
  return [
    {
      label: t('er.config.propsPanel.region.options[0]'),
      value: 1
    },
    {
      label: t('er.config.propsPanel.region.options[1]'),
      value: 2
    },
    {
      label: t('er.config.propsPanel.region.options[2]'),
      value: 3
    }
  ]
})
// const typeProps = computed(() => {
//   return utils.bindProps(target.value, true)
// })
const typeProps = hooks.useProps(state, target, true, false, (type, props) => {
  switch (type) {
    case 'time':
    case 'cascader':
    case 'number':
    case 'date':
    case 'rate':
    case 'switch':
    case 'slider':
      delete props.disabled
      break
  }
})
const handleChange0 = (value) => {
  if (/^(dates|datarange)$/.test(value)) {
    target.value.options.defaultValue = []
  } else {
    target.value.options.defaultValue = ''
  }
  if (!options0.value.includes(value)) {
    target.value.options.format = options0.value[0].value
  }
}
const handleMultipleChange = (value) => {
  if (value) {
    target.value.options.defaultValue = []
  } else {
    target.value.options.defaultValue = ''
  }
}
const handleAction = (type, value) => {
  switch (type) {
    case 1:
      if (state.mode === 'config') {
        unref(dataRef).getData().then(({ data }) => {
          dialogVisible.value = false
        })
        return false
      }
      if (checkTypeBySelected(['cascader'])) {
        unref(dataRef).getData().then(({ data }) => {
          state.data[target.value.options.dataKey].list = data
          dialogVisible.value = false
        })
      } else {
        unref(dataRef).getData().then(({ data, defaultValue }) => {
          state.data[target.value.options.dataKey].list = data
          target.value.options.defaultValue = defaultValue
          dialogVisible.value = false
        })
      }
      break
    case 2:
      dialogVisible.value = false
      break
  }
}
const handleTypeListener = ({ property, data }) => {
  switch (property) {
    case 'width':
      // eslint-disable-next-line
      const val = eval(data.value) * 100
      utils.syncWidthByPlatform(target.value, state.platform, val)
      break
    case 'type':
      target.value.options.type = data.value
      break
    case 'tabPosition':
      target.value.options.tabPosition = data.value
      break
    case 'justify':
      target.value.options.justify = data.value
      break
    case 'displayStyle':
      target.value.options.displayStyle = data.value
      break
    case 'selectType':
      target.value.options.selectType = data.value
      target.value.options.defaultValue = ''
      break
  }
}
</script>
<template>
  <el-form-item v-if="isSelectField" :label="t('er.config.propsPanel.id')" prop="key">
    <el-input
      v-model="target.key"
    />
  </el-form-item>
  <PanelsConfigComponentsCollapseComponent
    v-if="isSelectField"
    :label="t('er.config.propsPanel.title')"
    operationKey="options"
    field="isShowLabel">
    <template v-slot:content>
      <div :class="[ns.e('collapseWrap'), ns.e('collapseWrap-left')]">
        <el-row justify="space-between" align="middle">
          <el-col :span="isPc ? 11 : 24">
            <el-form-item>
              <template v-slot:label>
                <Icon icon="title"/>
              </template>
              <el-input
                clearable
                v-model="target.label"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="isPc">
            <el-form-item>
              <template v-slot:label>
                <Icon icon="dragWidth"/>
              </template>
              <el-input-number
                controls-position="right"
                v-model="target.options.labelWidth"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </template>
  </PanelsConfigComponentsCollapseComponent>
  <PanelsConfigComponentsTypeComponent
    :label="t('er.config.propsPanel.defaultContent')"
    :layoutType="0"
    v-if="checkTypeBySelected([
      'input',
      'textarea',
      'time',
      'date',
      'number',
      'rate',
      'color',
      'switch',
      'slider',
      'button',
      'divider',
      'cascader',
      'region'
    ])">
    <template v-if="checkTypeBySelected(['cascader', 'region'])">
      <el-cascader
        v-model="target.options.defaultValue"
        v-bind="typeProps"
        clearable
        style="width: 100%;"
      />
    </template>
    <template v-else-if="checkTypeBySelected(['textarea'])">
      <el-input
        type="textarea"
        rows="4"
        v-model="target.options.defaultValue"
      />
    </template>
    <template v-else-if="checkTypeBySelected(['input', 'divider'])">
      <el-input
        v-model="target.options.defaultValue"
        clearable
      />
    </template>
    <template v-else-if="checkTypeBySelected(['number'])">
      <el-input-number
        style="width: 100%;"
        v-bind="typeProps"
        v-model="target.options.defaultValue"
      />
    </template>
    <template v-else-if="checkTypeBySelected(['time'])">
      <el-time-picker
        v-bind="typeProps"
        style="width: 100%"
        clearable
        v-model="target.options.defaultValue"
      />
    </template>
    <template v-else-if="checkTypeBySelected(['date'])">
      <el-date-picker
        v-bind="typeProps"
        style="width: 100%"
        v-model="target.options.defaultValue"
        clearable
      />
    </template>
    <template v-else-if="checkTypeBySelected(['rate'])">
      <el-rate
        v-bind="typeProps"
        v-model="target.options.defaultValue"
      />
      <el-button v-if="target.options.defaultValue > 0" link @click="target.options.defaultValue = 0">{{t('er.public.clear')}}</el-button>
    </template>
    <template v-else-if="checkTypeBySelected(['switch'])">
      <el-switch
        v-bind="typeProps"
        v-model="target.options.defaultValue"
      />
    </template>
    <template v-else-if="checkTypeBySelected(['slider'])">
      <el-slider
        v-bind="typeProps"
        v-model="target.options.defaultValue"
        style="padding: 0 14px;"
      />
    </template>
  </PanelsConfigComponentsTypeComponent>
  <PanelsConfigComponentsTypeComponent
    :label="t('er.public.Data')"
    :layoutType="0"
    v-if="checkTypeBySelected(['select', 'radio', 'checkbox', 'cascader', 'rate'])">
    <el-button style="width: 100%;" type="primary" @click="dialogVisible = true">{{t('er.public.dataEntry')}}</el-button>
  </PanelsConfigComponentsTypeComponent>
<!-- placeholder -->
  <PanelsConfigComponentsTypeComponent
    :layoutType="0"
    :label="t('er.config.propsPanel.placeholder')"
    v-if="checkTypeBySelected([
      'input',
      'textarea',
      'select',
      'cascader',
      'time',
      'date',
      'html',
      'region'
    ])">
    <el-input
      v-if="checkTypeBySelected(['input', 'select', 'cascader', 'time', 'date', 'html', 'region'])"
      v-model="target.options.placeholder"
      clearable
    />
    <el-input
      v-else-if="checkTypeBySelected(['textarea'])"
      type="textarea"
      v-model="target.options.placeholder"
      clearable
    />
  </PanelsConfigComponentsTypeComponent>
  <PanelsConfigComponentsTypeComponent
    :layoutType="0"
    v-if="checkTypeBySelected(['signature'])"
    :label="t('er.config.propsPanel.brushColor')">
    <el-color-picker
      color-format="rgb"
      v-model="target.options.penColor"
    />
  </PanelsConfigComponentsTypeComponent>
  <PanelsConfigComponentsTypeComponent
    v-if="checkTypeBySelected(['time', 'date'])"
    :layoutType="0"
    :label="t('er.config.propsPanel.format')">
    <el-select v-model="target.options.format" placeholder="Select" style="width: 100%">
      <el-option
        v-for="item in options0"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </PanelsConfigComponentsTypeComponent>
  <PanelsConfigComponentsTypeComponent
    v-if="checkTypeBySelected(['date'])"
    :layoutType="0"
    :label="t('er.config.propsPanel.dateType')">
    <el-select v-model="target.options.type" @change="handleChange0" style="width: 100%">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </PanelsConfigComponentsTypeComponent>
  <PanelsConfigComponentsTypeComponent
    v-if="checkTypeBySelected(['radio', 'checkbox'])"
    @listener="handleTypeListener"
    property="displayStyle"
    :label="t('er.config.propsPanel.layout.label')"
    :val="target.options.displayStyle"
    :nodes="options7"
    :layoutType="2"
  />
  <PanelsConfigComponentsTypeComponent
    :layoutType="0"
    v-if="checkTypeBySelected(['divider'])"
    :label="t('er.config.propsPanel.contentPosition.label')">
    <el-radio-group v-model="target.options.contentPosition" size="large">
      <el-radio-button name="left" label="left">{{t('er.config.propsPanel.contentPosition.options[0]')}}</el-radio-button>
      <el-radio-button name="center" label="center">{{t('er.config.propsPanel.contentPosition.options[1]')}}</el-radio-button>
      <el-radio-button name="right" label="right">{{t('er.config.propsPanel.contentPosition.options[2]')}}</el-radio-button>
    </el-radio-group>
  </PanelsConfigComponentsTypeComponent>
  <PanelsConfigComponentsTypeComponent
    :layoutType="0"
    v-if="checkTypeBySelected(['textarea'])"
    :label="t('er.config.propsPanel.textareaHeight')">
    <el-slider v-model="target.options.rows" :max="10" show-input />
  </PanelsConfigComponentsTypeComponent>
  <div v-if="checkTypeBySelected(['uploadfile'])">
    <el-form-item :label="t('er.config.propsPanel.uploadfile.fileType')">
      <el-input
        v-model="target.options.accept"
        placeholder="输入只接受的文件类型后缀。例如 .png,.jpg" />
    </el-form-item>
    <el-row :gutter="8">
      <el-col :span="12">
        <el-form-item :label="t('er.config.propsPanel.uploadfile.uploadLimit')">
          <el-input-number
            style="width: 100%;"
            :min="1"
            controls-position="right"
            v-model="target.options.limit" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="`${t('er.config.propsPanel.uploadfile.fileSize')}(MB)`">
          <el-input-number
            style="width: 100%;"
            v-model="target.options.size"
            controls-position="right"
            :min="1"
          />
        </el-form-item>
      </el-col>
    </el-row>
  </div>
  <el-row v-if="checkTypeBySelected(['input']) && target.options.renderType === 1 && isPc" :gutter="8">
    <el-col :span="12">
      <el-form-item :label="t('er.config.propsPanel.prepend')">
        <el-input
          style="width: 100%;"
          v-model="target.options.prepend" />
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item :label="t('er.config.propsPanel.append')">
        <el-input
          style="width: 100%;"
          v-model="target.options.append"
        />
      </el-form-item>
    </el-col>
  </el-row>
  <el-row :gutter="8" v-if="checkTypeBySelected(['number', 'slider'])">
    <el-col :span="type !== 'slider' ? 12 : 24">
      <el-form-item :label="t('er.config.propsPanel.step')">
        <el-input-number
          :min="0"
          style="width: 100%;"
          controls-position="right" v-model="target.options.step" />
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item v-if="type !== 'slider'" :label="t('er.config.propsPanel.precision')">
        <el-input-number
          :min="0"
          controls-position="right" v-model="target.options.precision" />
      </el-form-item>
    </el-col>
  </el-row>
  <el-row :gutter="8" v-if="checkTypeBySelected(['slider'])">
    <el-col :span="12">
      <el-form-item :label="t('er.public.max')">
        <el-input-number
          controls-position="right"
          v-model="target.options.max" />
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item :label="t('er.public.min')">
        <el-input-number
          controls-position="right" v-model="target.options.min" />
      </el-form-item>
    </el-col>
  </el-row>
  <PanelsConfigComponentsTypeComponent
    v-if="checkTypeBySelected(['region'])"
    :label="t('er.config.propsPanel.region.label')"
    :layoutType="0">
    <el-select v-model="target.options.selectType" @change="target.options.defaultValue = ''">
      <el-option
        v-for="item in options8"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </PanelsConfigComponentsTypeComponent>
  <PanelsConfigComponentsTypeComponent
    v-if="utils.checkIslineChildren(target) && target.context.parent.columns.length !== 4"
    @listener="handleTypeListener"
    property="width"
    :label="t('er.public.width')"
    :height="40"
    :fontSize="28"
    :nodes="options1"
  />
  <PanelsConfigComponentsCheckboxComponent v-if="checkTypeBySelected(['input', 'textarea'])" :label="t('er.config.propsPanel.trim')" field="isShowTrim"/>
  <PanelsConfigComponentsCheckboxComponent v-if="(checkTypeBySelected(['input']) && target.options.renderType === 1) || checkTypeBySelected(['textarea', 'number'])" :label="t('er.config.propsPanel.wordLimit')" field="isShowWordLimit">
    <el-row align="middle" :gutter="8">
      <el-col :span="11">
        <el-form-item :label="t('er.public.min')">
          <el-input-number
            controls-position="right"
            :max="(target.options.max === null || target.options.max === undefined) ? undefined : target.options.max - 1"
            v-model="target.options.min" />
        </el-form-item>
      </el-col>
      <el-col :span="2">~</el-col>
      <el-col :span="11">
        <el-form-item :label="t('er.public.max')">
          <el-input-number
            :min="target.options.min + 1"
            controls-position="right"
            :step="10"
            v-model="target.options.max" />
        </el-form-item>
      </el-col>
    </el-row>
  </PanelsConfigComponentsCheckboxComponent>
  <PanelsConfigComponentsCheckboxComponent v-if="checkTypeBySelected(['date'])" :label="t('er.config.propsPanel.dateRange')" field="isShowWordLimit">
    <PanelsConfigComponentsLimitComponent/>
  </PanelsConfigComponentsCheckboxComponent>
  <PanelsConfigComponentsCheckboxComponent v-if="isSelectField && !checkTypeBySelected(['rate', 'switch', 'slider', 'divider'])" :label="t('er.validateMsg.required')" field="required"/>
  <PanelsConfigComponentsTypeComponent
    v-if="isSelectGrid"
    @listener="handleTypeListener"
    property="justify"
    :label="t('er.config.gridLayout.justify.label')"
    :height="40"
    :fontSize="40"
    :val="target.options.justify"
    :nodes="options6"
  />
<!--  <PanelsConfigComponentsGridLayoutComponent-->
<!--    v-if="isSelectGrid"-->
<!--  />-->
  <PanelsConfigComponentsDataComponent3
    v-if="checkTypeBySelected(['collapse', 'tabs'])"
  />
  <PanelsConfigComponentsTypeComponent
    v-if="isSelectTabs"
    @listener="handleTypeListener"
    property="type"
    :label="t('er.config.tabsLayout.style.label')"
    :height="66"
    :fontSize="70"
    :val="target.options.type"
    :nodes="options4"
  />
  <PanelsConfigComponentsTypeComponent
    v-if="isSelectTabs"
    @listener="handleTypeListener"
    property="tabPosition"
    :label="t('er.config.tabsLayout.tabPosition.label')"
    :height="40"
    :fontSize="66"
    :val="target.options.tabPosition"
    :nodes="options5"
  />
<!--  <PanelsConfigComponentsTabsLayout-->
<!--    v-if="isSelectTabs"-->
<!--  />-->
  <PanelsConfigComponentsCollapseComponent
    v-if="checkTypeBySelected(['table', 'grid', 'col', 'collapse', 'collapseCol', 'tabs', 'tabsCol'])"
    :label="t('er.public.margin')"
    operationKey="style"
    field="isShowMargin">
    <template v-slot:content>
      <PanelsConfigComponentsAllsidesComponent
        field="margin"
      />
    </template>
  </PanelsConfigComponentsCollapseComponent>

  <PanelsConfigComponentsCollapseComponent
    v-if="checkTypeBySelected(['grid', 'col', 'collapse', 'collapseCol', 'tabs', 'tabsCol', 'td'])"
    :label="t('er.public.padding')"
    operationKey="style"
    field="isShowPadding">
    <template v-slot:content>
      <PanelsConfigComponentsAllsidesComponent
        field="padding"
      />
    </template>
  </PanelsConfigComponentsCollapseComponent>
<!--  <PanelsConfigComponentsAllsidesComponent-->
<!--    field="margin"-->
<!--    v-if="checkTypeBySelected(['table', 'grid', 'col', 'collapse', 'collapseCol', 'tabs', 'tabsCol'])"-->
<!--  />-->
<!--  <PanelsConfigComponentsAllsidesComponent-->
<!--    field="padding"-->
<!--    v-if="checkTypeBySelected(['grid', 'col', 'collapse', 'collapseCol', 'tabs', 'tabsCol', 'td'])"-->
<!--  />-->
  <PanelsConfigComponentsCollapseComponent
    v-if="checkTypeBySelected(['grid', 'col', 'collapse', 'collapseCol', 'tabs', 'tabsCol', 'td', 'table'])"
    :label="t('er.public.background')"
    operationKey="style"
    field="isShowBackground">
    <template v-slot:subSelect>
      <div :class="[ns.e('collapseSubSelect')]">
        <el-dropdown
          @command="(command) => { bgStatus = command }"
        >
        <span>
          {{ bgStatus ? t('er.public.image') : t('er.public.color') }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
        </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item :command="0">{{t('er.public.color')}}</el-dropdown-item>
              <el-dropdown-item :command="1">{{t('er.public.image')}}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </template>
    <template v-slot:content>
      <PanelsConfigComponentsBackgroundComponent/>
    </template>
  </PanelsConfigComponentsCollapseComponent>
<!--  <PanelsConfigComponentsBackgroundComponent-->
<!--    v-if="checkTypeBySelected(['grid', 'col', 'collapse', 'collapseCol', 'tabs', 'tabsCol', 'td', 'table'])"-->
<!--  />-->
  <PanelsConfigComponentsCollapseComponent
    v-if="checkTypeBySelected(['grid', 'col', 'collapse', 'collapseCol', 'tabs', 'tabsCol', 'table'])"
    :label="t('er.config.borderComponent.borderLine')"
    operationKey="style"
    field="isShowBorder">
    <template v-if="!checkTypeBySelected(['table'])" v-slot:subSelect>
      <div :class="[ns.e('collapseSubSelect')]">
        <el-dropdown
          @command="(command) => target.style.border.style = command"
        >
        <span>
          {{ target.style.border.style }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
        </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item :command="item" v-for="item in options2" :key="item">{{ item }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </template>
    <template v-slot:content>
      <div :class="[ns.e('collapseWrap'), ns.e('collapseWrap-left')]">
        <PanelsConfigComponentsBorderComponent
        />
      </div>
    </template>
  </PanelsConfigComponentsCollapseComponent>
<!--  <PanelsConfigComponentsBorderComponent-->
<!--    v-if="checkTypeBySelected(['grid', 'col', 'collapse', 'collapseCol', 'tabs', 'tabsCol', 'table'])"-->
<!--  />-->
  <PanelsConfigComponentsCheckboxComponent v-if="isSelectCollapse" :label="t('er.config.propsPanel.accordion')" field="accordion">
  </PanelsConfigComponentsCheckboxComponent>
  <template v-if="isSelectField && !checkTypeBySelected(['divider'])">
    <PanelsConfigComponentsCheckboxComponent :label="t('er.public.disabled')" field="disabled">
    </PanelsConfigComponentsCheckboxComponent>
    <PanelsConfigComponentsCheckboxComponent v-if="checkTypeBySelected(['input']) && target.options.renderType === 1" :label="t('er.config.propsPanel.showPassword')" field="showPassword">
    </PanelsConfigComponentsCheckboxComponent>
    <PanelsConfigComponentsCheckboxComponent v-if="checkTypeBySelected(['select', 'cascader', 'uploadfile'])" :label="t('er.config.propsPanel.multiple')" @change="handleMultipleChange" field="multiple">
    </PanelsConfigComponentsCheckboxComponent>
    <PanelsConfigComponentsCheckboxComponent v-if="checkTypeBySelected(['select', 'cascader', 'transfer', 'region'])" :label="t('er.config.propsPanel.filterable')" field="filterable">
    </PanelsConfigComponentsCheckboxComponent>
    <PanelsConfigComponentsCheckboxComponent v-if="isPc && checkTypeBySelected(['number'])" :label="t('er.config.propsPanel.numberControls.label')" field="controls">
      <el-row align="middle">
        <el-col :span="10">{{ t('er.config.propsPanel.numberControls.position') }}</el-col>
        <el-col :span="14">
          <el-radio-group v-model="target.options.controlsPosition">
            <el-radio-button :label="false">{{ t('er.config.propsPanel.numberControls.options[0]') }}</el-radio-button>
            <el-radio-button :label="true">{{ t('er.config.propsPanel.numberControls.options[1]') }}</el-radio-button>
          </el-radio-group>
        </el-col>
      </el-row>
    </PanelsConfigComponentsCheckboxComponent>
    <PanelsConfigComponentsCheckboxComponent v-if="checkTypeBySelected(['rate'])" :label="t('er.config.propsPanel.allowHalf')" field="allowHalf">
    </PanelsConfigComponentsCheckboxComponent>
    <PanelsConfigComponentsCheckboxComponent v-if="checkTypeBySelected(['color'])" :label="t('er.config.propsPanel.alpha')" field="showAlpha">
    </PanelsConfigComponentsCheckboxComponent>
    <PanelsConfigComponentsCheckboxComponent v-if="checkTypeBySelected(['cascader'])" :label="t('er.config.propsPanel.anyNode')" field="checkStrictly">
    </PanelsConfigComponentsCheckboxComponent>
    <PanelsConfigComponentsCheckboxComponent v-if="checkTypeBySelected(['input', 'select', 'time', 'date', 'cascader', 'region'])" :label="t('er.config.propsPanel.clearable')" field="clearable">
    </PanelsConfigComponentsCheckboxComponent>
  </template>
  <el-dialog
    v-model="dialogVisible"
    :title="t('er.public.dataEntry')"
    :destroy-on-close="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="80%"
    draggable
  >
    <PanelsConfigComponentsDataComponent2 v-if="checkTypeBySelected(['cascader'])" ref="dataRef"></PanelsConfigComponentsDataComponent2>
    <PanelsConfigComponentsDataComponent1 v-else ref="dataRef"></PanelsConfigComponentsDataComponent1>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleAction(2)">
          {{t('er.public.cancel')}}
        </el-button>
        <el-button type="primary" @click="handleAction(1)">
          {{t('er.public.confirm')}}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
