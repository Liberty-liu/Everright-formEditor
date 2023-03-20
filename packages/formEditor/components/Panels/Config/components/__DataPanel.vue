<script>
export default {
  name: 'ConfigDataPanel',
  inheritAttrs: false,
  customOptions: {}
}
</script>
<script setup>
const {
  target,
  checkTypeBySelected
} = hooks.useTarget()
</script>
<template>
  <div>

    <el-form-item label="默认内容" v-if="checkTypeBySelected([
      'input',
      'textarea',
      'select',
      'radio',
      'checkbox',
      'time',
      'date',
      'number',
      'rate',
      'color',
      'switch',
      'slider',
      'button',
      'divider',
      'cascader'
    ])">
      <template v-if="checkTypeBySelected(['cascader'])">
        <el-cascader
          v-model="target.options.defaultValue"
          :options="target.options.options"
          v-bind="target.options"
          style="width: 100%;"
          :props="{
          multiple: target.options.multiple,
          checkStrictly: target.options.checkStrictly
        }"
        />
      </template>
      <template v-if="checkTypeBySelected(['select', 'radio', 'checkbox'])">
        <el-button type="primary" @click="$emit('changePanel', 'data')">To Data Panel</el-button>
      </template>
      <template v-else-if="checkTypeBySelected(['textarea'])">
        <el-input
          type="textarea"
          v-model="target.options.defaultValue"
        />
      </template>
      <template v-else-if="checkTypeBySelected(['input', 'button', 'divider'])">
        <el-input
          v-model="target.options.defaultValue"
        />
      </template>
      <template v-else-if="checkTypeBySelected(['number'])">
        <el-input-number
          style="width: 100%;"
          controls-position="right"
          :min="target.options.min"
          :max="target.options.max"
          :step="target.options.step"
          :precision="target.options.precision"
          v-model="target.options.defaultValue"
        />
      </template>
      <template v-else-if="checkTypeBySelected(['time'])">
        <el-time-picker
          v-if="target.options.isRange"
          is-range
          :format="target.options.format"
          v-model="target.options.defaultValue"
        />
        <el-time-picker
          v-else
          :format="target.options.format"
          v-model="target.options.defaultValue"
        />
      </template>
      <template v-else-if="checkTypeBySelected(['date'])">
        <el-date-picker
          v-if="target.options.type.includes('range')"
          :type="target.options.type"
          v-model="target.options.defaultValue"
        />
        <el-date-picker
          v-else
          :type="target.options.type"
          v-model="target.options.defaultValue"
        />
      </template>
      <template v-else-if="checkTypeBySelected(['rate'])">
        <el-rate
          :allowHalf="target.options.allowHalf"
          :max="target.options.max"
          v-model="target.options.defaultValue"
        />
        <el-button link @click="target.options.defaultValue = 0">清空</el-button>
      </template>
      <template v-else-if="checkTypeBySelected(['color'])">
        <el-color-picker
          v-model="target.options.defaultValue"
          :show-alpha="target.options.showAlpha"
        />
      </template>
      <template v-else-if="checkTypeBySelected(['switch'])">
        <el-switch
          v-model="target.options.defaultValue"
        />
      </template>
      <template v-else-if="checkTypeBySelected(['slider'])">
        <el-slider
          v-model="target.options.defaultValue"
          :min="target.options.min"
          :max="target.options.max"
          :step="target.options.step"
        />
      </template>
    </el-form-item>

    <el-form-item label="占位内容" v-if="checkTypeBySelected([
      'input',
      'textarea',
      'select',
      'cascader'
    ])">
      <el-input
        v-if="checkTypeBySelected(['input', 'select', 'cascader'])"
        v-model="target.options.placeholder"
      />
      <el-input
        v-else-if="checkTypeBySelected(['textarea'])"
        type="textarea"
        v-model="target.options.placeholder"
      />
    </el-form-item>
    <template v-if="checkTypeBySelected(['time', 'date']) && (target.options.isRange === true || target.options.type && target.options.type.includes('range'))">
      <el-form-item label="开始时间占位内容">
        <el-input
          v-model="target.options.startPlaceholder"
        />
      </el-form-item>
      <el-form-item label="结束时间占位内容">
        <el-input
          v-model="target.options.endPlaceholder"
        />
      </el-form-item>
    </template>
    <template v-if="checkTypeBySelected(['time', 'date']) && (target.options.isRange === false || !(target.options.type && target.options.type.includes('range')))">
      <el-form-item label="占位内容">
        <el-input
          v-model="target.options.placeholder"
        />
      </el-form-item>
    </template>
    <PanelsConfigComponentsData
      v-if="checkTypeBySelected(['radio', 'checkbox', 'select', 'tabs', 'collapse', 'cascader', 'transfer'])"
    />
    <el-form-item v-if="checkTypeBySelected(['rate'])" label="最大值">
      <el-input-number
        style="width: 100%;"
        controls-position="right"
        v-model="target.options.max"
      />
    </el-form-item>
    <div>
      <template v-if="checkTypeBySelected(['number', 'slider'])">
        <el-row :gutter="8">
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
        <el-row :gutter="8">
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
      </template>
    </div>
  </div>
</template>
