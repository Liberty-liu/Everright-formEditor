<script>
import { ref, computed, reactive, watchEffect, watch, unref } from 'vue'
import utils from '@ER/utils'
import hooks from '@ER/hooks'
import PanelsConfigComponentsCheckboxComponent from './CheckboxComponent.vue'
import PanelsConfigComponentsBorderComponent from './BorderComponent.vue'
import PanelsConfigComponentsLimitComponent from './LimitComponent.vue'
import PanelsConfigComponentsGridLayoutComponent from './GridLayoutComponent.vue'
import PanelsConfigComponentsTabsLayout from './TabsLayout.vue'
import PanelsConfigComponentsTableLayout from './TableLayout.vue'
import PanelsConfigComponentsAllsidesComponent from './AllsidesComponent.vue'
import PanelsConfigComponentsBackgroundComponent from './BackgroundComponent.vue'
import PanelsConfigComponentsDataComponent1 from './DataComponent1.jsx'
import PanelsConfigComponentsDataComponent2 from './DataComponent2.jsx'
import PanelsConfigComponentsDataComponent3 from './DataComponent3.vue'
export default {
  name: 'ConfigPropsPanel',
  inheritAttrs: false,
  customOptions: {}
}
</script>
<script setup>
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
  return widthOptions.map(e => {
    const result = {
      value: e,
      disabled: false
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
    case 3:
      // console.log(eval(value) * 100)
      // eslint-disable-next-line
      const val = eval(value) * 100
      utils.syncWidthByPlatform(target.value, state.platform, val)
      break
  }
}
</script>
<template>
<!--  <template v-if="isSelectField">-->
<!--  </template>-->
  <el-form-item label="唯一标识" prop="id">
    <el-tag type="warning">
      {{target.id}}
    </el-tag>
  </el-form-item>
  <PanelsConfigComponentsCheckboxComponent v-if="isSelectField" label="标题" field="isShowLabel">
    <el-row style="margin-bottom: 16px;" align="middle">
      <el-col :span="10">标题</el-col>
      <el-col :span="14">
        <el-input
          v-model="target.label"
        />
      </el-col>
    </el-row>
    <el-row align="middle" v-if="isPc">
      <el-col :span="10">宽度</el-col>
      <el-col :span="14">
        <el-input-number
          style="width: 100%;"
          controls-position="right"
          v-model="target.options.labelWidth"
        />
      </el-col>
    </el-row>
  </PanelsConfigComponentsCheckboxComponent>
  <el-form-item v-if="isSelectField" label="字段唯一标识" prop="key">
    <el-input
      v-model="target.key"
    />
  </el-form-item>
  <el-form-item label="默认内容" v-if="checkTypeBySelected([
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
        v-model="target.options.defaultValue"
      />
    </template>
    <template v-else-if="checkTypeBySelected(['date'])">
      <el-date-picker
        v-bind="typeProps"
        v-model="target.options.defaultValue"
      />
    </template>
    <template v-else-if="checkTypeBySelected(['rate'])">
      <el-rate
        v-bind="typeProps"
        v-model="target.options.defaultValue"
      />
      <el-button link @click="target.options.defaultValue = 0">清空</el-button>
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
  </el-form-item>
  <el-form-item label="数据" v-if="checkTypeBySelected(['select', 'radio', 'checkbox', 'cascader', 'rate'])">
    <el-button style="width: 100%;" type="primary" @click="dialogVisible = true">录入数据</el-button>
  </el-form-item>
<!-- placeholder -->
  <el-form-item label="提示文字" v-if="checkTypeBySelected([
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
    />
    <el-input
      v-else-if="checkTypeBySelected(['textarea'])"
      type="textarea"
      v-model="target.options.placeholder"
    />
  </el-form-item>
  <div v-if="checkTypeBySelected(['signature'])">
    <el-form-item label="画笔颜色">
      <el-color-picker
        color-format="rgb"
        v-model="target.options.penColor"
      />
    </el-form-item>
  </div>
  <el-form-item v-if="checkTypeBySelected(['time', 'date'])" label="显示格式">
    <el-select v-model="target.options.format" placeholder="Select" style="width: 100%">
      <el-option
        v-for="item in options0"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </el-form-item>
  <el-form-item v-if="checkTypeBySelected(['date'])" label="显示类型">
    <el-select v-model="target.options.type" placeholder="Select" size="large" @change="handleChange0">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </el-form-item>
  <el-form-item v-if="checkTypeBySelected(['radio', 'checkbox'])" label="布局方式">
    <el-radio-group v-model="target.options.displayStyle" size="large">
      <el-radio-button name="块级" label="block" />
      <el-radio-button name="行级" label="inline" />
    </el-radio-group>
  </el-form-item>
  <el-form-item v-if="checkTypeBySelected(['divider'])" label="文案位置">
    <el-radio-group v-model="target.options.contentPosition" size="large">
      <el-radio-button name="left" label="left" />
      <el-radio-button name="center" label="center" />
      <el-radio-button name="right" label="right" />
    </el-radio-group>
  </el-form-item>
  <el-form-item v-if="checkTypeBySelected(['textarea'])" label="文本域高度">
    <el-slider v-model="target.options.rows" :max="10" show-input />
  </el-form-item>
  <div v-if="checkTypeBySelected(['uploadfile'])">
    <el-form-item label="文件类型">
      <el-input
        v-model="target.options.accept"
        placeholder="输入只接受的文件类型后缀。例如 .png,.jpg" />
    </el-form-item>
    <el-row :gutter="8">
      <el-col :span="12">
        <el-form-item label="上传个数限制">
          <el-input-number
            style="width: 100%;"
            :min="1"
            controls-position="right"
            v-model="target.options.limit" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="文件大小(MB)">
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
  <el-row v-if="checkTypeBySelected(['input']) && target.options.renderType === 1 && state.isPc" :gutter="8">
    <el-col :span="12">
      <el-form-item label="前缀">
        <el-input
          style="width: 100%;"
          v-model="target.options.prepend" />
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="后缀">
        <el-input
          style="width: 100%;"
          v-model="target.options.append"
        />
      </el-form-item>
    </el-col>
  </el-row>
  <el-row :gutter="8" v-if="checkTypeBySelected(['number', 'slider'])">
    <el-col :span="12">
      <el-form-item label="步长">
        <el-input-number
          controls-position="right" v-model="target.options.step" />
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item v-if="type !== 'slider'" label="精度">
        <el-input-number
          controls-position="right" v-model="target.options.precision" />
      </el-form-item>
    </el-col>
  </el-row>
  <el-row :gutter="8" v-if="checkTypeBySelected(['slider'])">
    <el-col :span="12">
      <el-form-item label="最大">
        <el-input-number
          controls-position="right"
          v-model="target.options.max" />
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="最小">
        <el-input-number
          controls-position="right" v-model="target.options.min" />
      </el-form-item>
    </el-col>
  </el-row>
  <el-form-item v-if="checkTypeBySelected(['region'])" label="选择范围">
    <el-radio-group v-model="target.options.selectType" @change="target.options.defaultValue = ''" size="large">
      <el-radio-button :label="1">省</el-radio-button>
      <el-radio-button :label="2">省/市</el-radio-button>
      <el-radio-button :label="3">省/市/县</el-radio-button>
    </el-radio-group>
  </el-form-item>
  <el-form-item v-if="utils.checkIslineChildren(target) && target.context.parent.columns.length !== 4" label="宽度">
    <el-button-group>
      <el-button @click="() => handleAction(3, item.value)" v-for="item in options1" :disabled="item.disabled" :key="item.value">{{ item.value }}</el-button>
    </el-button-group>
  </el-form-item>
  <PanelsConfigComponentsCheckboxComponent v-if="checkTypeBySelected(['input', 'textarea'])" label="去除首尾空格" field="isShowTrim"/>
  <PanelsConfigComponentsCheckboxComponent v-if="(checkTypeBySelected(['input']) && target.options.renderType === 1) || checkTypeBySelected(['textarea', 'number'])" label="限定字符" field="isShowWordLimit">
    <el-row align="middle" :gutter="8">
      <el-col :span="11">
        <el-form-item label="最少">
          <el-input-number
            controls-position="right"
            :max="target.options.max - 1"
            v-model="target.options.min" />
        </el-form-item>
      </el-col>
      <el-col :span="2">~</el-col>
      <el-col :span="11">
        <el-form-item label="最多">
          <el-input-number
            :min="target.options.min + 1"
            controls-position="right"
            v-model="target.options.max" />
        </el-form-item>
      </el-col>
    </el-row>
  </PanelsConfigComponentsCheckboxComponent>
  <PanelsConfigComponentsCheckboxComponent v-if="checkTypeBySelected(['date'])" label="限定日期范围" field="isShowWordLimit">
    <PanelsConfigComponentsLimitComponent/>
  </PanelsConfigComponentsCheckboxComponent>
  <PanelsConfigComponentsCheckboxComponent v-if="isSelectField && !checkTypeBySelected(['rate', 'switch', 'slider', 'divider'])" label="必填" field="required"/>
  <PanelsConfigComponentsGridLayoutComponent
    v-if="isSelectGrid"
  />
  <PanelsConfigComponentsDataComponent3
    v-if="checkTypeBySelected(['collapse', 'tabs'])"
  />
  <PanelsConfigComponentsTabsLayout
    v-if="isSelectTabs"
  />
  <PanelsConfigComponentsTableLayout
    v-if="isSelectTable"
  />
  <PanelsConfigComponentsAllsidesComponent
    field="margin"
    v-if="checkTypeBySelected(['grid', 'col', 'collapse', 'collapseCol', 'tabs', 'tabsCol'])"
  />
  <PanelsConfigComponentsAllsidesComponent
    field="padding"
    v-if="checkTypeBySelected(['grid', 'col', 'collapse', 'collapseCol', 'tabs', 'tabsCol', 'td'])"
  />
  <PanelsConfigComponentsBackgroundComponent
    v-if="checkTypeBySelected(['grid', 'col', 'collapse', 'collapseCol', 'tabs', 'tabsCol', 'td', 'table'])"
  />
  <PanelsConfigComponentsBorderComponent
    v-if="checkTypeBySelected(['grid', 'col', 'collapse', 'collapseCol', 'tabs', 'tabsCol', 'table'])"
  />
  <PanelsConfigComponentsCheckboxComponent v-if="isSelectCollapse" label="手风琴模式" field="accordion">
  </PanelsConfigComponentsCheckboxComponent>
  <template v-if="isSelectField && !checkTypeBySelected(['divider'])">
    <PanelsConfigComponentsCheckboxComponent label="禁用" field="disabled">
    </PanelsConfigComponentsCheckboxComponent>
    <PanelsConfigComponentsCheckboxComponent v-if="checkTypeBySelected(['input']) && target.options.renderType === 1" label="作为密码" field="showPassword">
    </PanelsConfigComponentsCheckboxComponent>
    <PanelsConfigComponentsCheckboxComponent v-if="checkTypeBySelected(['select', 'cascader', 'uploadfile'])" label="多选" @change="handleMultipleChange" field="multiple">
    </PanelsConfigComponentsCheckboxComponent>
    <PanelsConfigComponentsCheckboxComponent v-if="checkTypeBySelected(['select', 'cascader', 'transfer', 'region'])" label="搜索" field="filterable">
    </PanelsConfigComponentsCheckboxComponent>
    <PanelsConfigComponentsCheckboxComponent v-if="isPc && checkTypeBySelected(['number'])" label="控制按钮" field="controls">
      <el-row align="middle">
        <el-col :span="10">按钮位置</el-col>
        <el-col :span="14">
          <el-radio-group v-model="target.options.controlsPosition" size="large">
            <el-radio-button :label="false">左右</el-radio-button>
            <el-radio-button :label="true">上下</el-radio-button>
          </el-radio-group>
        </el-col>
      </el-row>
    </PanelsConfigComponentsCheckboxComponent>
    <PanelsConfigComponentsCheckboxComponent v-if="checkTypeBySelected(['rate'])" label="半选" field="allowHalf">
    </PanelsConfigComponentsCheckboxComponent>
    <PanelsConfigComponentsCheckboxComponent v-if="checkTypeBySelected(['color'])" label="透明度" field="showAlpha">
    </PanelsConfigComponentsCheckboxComponent>
    <PanelsConfigComponentsCheckboxComponent v-if="checkTypeBySelected(['cascader'])" label="选择任意节点" field="checkStrictly">
    </PanelsConfigComponentsCheckboxComponent>
    <PanelsConfigComponentsCheckboxComponent v-if="checkTypeBySelected(['input', 'select', 'time', 'date', 'cascader', 'region'])" label="一键清除按钮" field="clearable">
    </PanelsConfigComponentsCheckboxComponent>
  </template>
  <el-dialog
    v-model="dialogVisible"
    title="录入数据"
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
          取消
        </el-button>
        <el-button type="primary" @click="handleAction(1)">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
