<script>
export default {
  name: 'ButtonConfigPanel',
  inheritAttrs: false,
  customOptions: {}
}
</script>
<script setup>
const props = defineProps(['data'])
const ns = hooks.useNamespace('SectorButtonConfigPanel')
const state = reactive({
  visible: false,
  value0: false,
  color: '',
  defaultBackground: {}
})
const options0 = [
  {
    value: 'small',
    label: 'small'
  },
  {
    value: 'default',
    label: 'default'
  },
  {
    value: 'large',
    label: 'large'
  },
  {
    value: 'full',
    label: '全宽'
  }
]
const options1 = [
  {
    value: 'left',
    label: 'left'
  },
  {
    value: 'center',
    label: 'center'
  },
  {
    value: 'right',
    label: 'right'
  }
]
const handleClick = (type) => {
  switch (type) {
    case 1:
      props.data.style.backgroundColor = props.data.style.backgroundImage = ''
      state.defaultBackground = {}
      break
    case 2:
      state.visible = false
      break
    default:
  }
}
</script>
<template>
  <el-popover :visible="state.visible" placement="bottom" :width="400">
    <div>
      <el-switch
        v-model="state.value0"
        size="large"
        active-text="设计"
        inactive-text="内容"
      />
    </div>
    <el-form ref="form" label-width="80px" label-position="left">
      <div v-show="!state.value0">
        <el-row>
          <el-col :span="12">
            <el-form-item label="文本">
              <el-input v-model="props.data.options.defaultValue">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="链接网址">
              <el-input v-model="props.data.options.href">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-checkbox v-model="props.data.options.target" label="新标签页打开" />
          </el-col>
        </el-row>
      </div>
      <div v-show="state.value0">
        <el-row>
          <el-col :span="12">
            <el-form-item label="按钮大小">
              <el-select v-model="props.data.style.size" size="small">
                <el-option
                  v-for="item in options0"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="对齐方式">
              <el-select v-model="props.data.style.textAlign" size="small">
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="颜色">
              <el-color-picker v-model="props.data.style.color" show-alpha />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="按钮风格">
              <el-switch
                v-model="props.data.style.plain"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="圆角">
              <el-switch
                v-model="props.data.style.round"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
    <el-row>
      <el-col>
        <el-button style="width: 100%;" type="primary" @click="() => handleClick(2)">保存</el-button>
      </el-col>
    </el-row>
    <template #reference>
      <slot :state="state"></slot>
    </template>
  </el-popover>
</template>

<style scoped>

</style>
