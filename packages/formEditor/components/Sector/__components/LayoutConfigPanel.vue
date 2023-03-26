<script>
export default {
  name: 'LayoutConfigPanel',
  inheritAttrs: false,
  customOptions: {}
}
</script>
<script setup>
const props = defineProps(['data'])
const ns = hooks.useNamespace('SectorLayoutConfigPanel')
const quickColors = [
  [
    'rgb(255, 255, 255)',
    'rgb(232, 234, 236)',
    'rgb(28, 28, 28)'
  ],
  [
    'rgb(242, 242, 242)',
    'rgb(204, 204, 204)',
    'rgb(153, 153, 153)',
    'rgb(102, 102, 102)',
    'rgb(51, 51, 51)'
  ],
  [
    'rgb(250, 140, 151)',
    'rgb(254, 201, 121)',
    'rgb(160, 210, 109)',
    'rgb(116, 207, 226)',
    'rgb(145, 138, 231)'
  ],
  [
    'rgb(119, 121, 122)',
    'rgb(167, 186, 193)',
    'rgb(214, 209, 187)',
    'rgb(189, 198, 188)',
    'rgb(193, 167, 167)'
  ]
]
const quickImages = [
  [
    '/public/images/CNoecellRCM.jpg',
    '/public/images/eT4eTi_ku1s.jpg',
    '/public/images/4EZMZRHJugA.jpg'
    // '/public/images/fD7cXIFurSQ.jpg',
    // '/public/images/hgThOxNqQq0.jpg',
    // '/public/images/J1RgKXu7JrY.jpg',
    // '/public/images/NclRe19V7zE.jpg',
    // '/public/images/nQz49efZEFs.jpg',
    // '/public/images/Vyl3kJ0ihhA.jpg',
    // '/public/images/Z7tpLPa5mXA.jpg',
    // '/public/images/zdXY-1DXv9g.jpg'
  ],
  [
    '/public/images/7e_gFC2Ce04.jpg',
    '/public/images/b1h8HsWhShM.jpg',
    '/public/images/fD7cXIFurSQ.jpg'
  ]
]
const fillTypes = [
  {
    value: 1,
    label: '拉伸'
  },
  {
    value: 2,
    label: '填充'
  },
  {
    value: 3,
    label: '平铺'
  },
  {
    value: 4,
    label: '居中'
  }
]
const element = ref()
const state = reactive({
  visible: false,
  value0: true,
  color: '',
  defaultBackground: {}
})
if (props.data.style.backgroundColor) {
// eslint-disable-next-line vue/no-setup-props-destructure
  state.defaultBackground.backgroundColor = props.data.style.backgroundColor
} else {
// eslint-disable-next-line vue/no-setup-props-destructure
  state.defaultBackground.backgroundImage = props.data.style.backgroundImage
}
if (props.data.style.isCustomBackground) {
// eslint-disable-next-line vue/no-setup-props-destructure
  state.color = props.data.style.backgroundColor
}
state.value0 = !props.data.style.backgroundColor
const modifyBackBackground = (key, value) => {
  const keys = ['backgroundColor', 'backgroundImage']
  let i = 0
  while (i !== keys.length) {
    const item = keys[i]
    if (item === key) {
      props.data.style[item] = value
    } else {
      props.data.style[item] = ''
    }
    i++
  }
}
// modifyBackBackground('backgroundColor')
useEventListener(element, 'click', (e) => {
  if (e.target.tagName === 'LI') {
    if (state.value0) {
      modifyBackBackground('backgroundImage', e.target.dataset.value)
      state.defaultBackground = {
        backgroundImage: e.target.dataset.value
      }
    } else {
      modifyBackBackground('backgroundColor', e.target.dataset.value)
      state.defaultBackground = {
        backgroundColor: e.target.dataset.value
      }
      props.data.style.isCustomBackground = false
    }
  }
})
useEventListener(element, 'mousemove', (e) => {
  if (e.target.tagName === 'LI') {
    if (state.value0) {
      modifyBackBackground('backgroundImage', e.target.dataset.value)
    } else {
      modifyBackBackground('backgroundColor', e.target.dataset.value)
    }
  }
})
useEventListener(element, 'mouseleave', (e) => {
  if (state.defaultBackground.backgroundColor) {
    modifyBackBackground('backgroundColor', state.defaultBackground.backgroundColor)
  } else {
    modifyBackBackground('backgroundImage', state.defaultBackground.backgroundImage)
  }
})
const handleActiveChange = (value) => {
  props.data.style.isCustomBackground = !!value
  props.data.style.backgroundColor = value
  if (!value) {
    if (state.defaultBackground.backgroundColor) {
      modifyBackBackground('backgroundColor', state.defaultBackground.backgroundColor)
    } else {
      modifyBackBackground('backgroundImage', state.defaultBackground.backgroundImage)
    }
  } else {
    props.data.style.backgroundImage = ''
  }
}
const handleChange = (value) => {
  if (value) {
    state.defaultBackground = {
      backgroundColor: value
    }
  }
}
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
  <div :class="[ns.b()]">
    <el-dropdown split-button type="primary">
      快捷布局模式
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>Action 1</el-dropdown-item>
          <el-dropdown-item>Action 2</el-dropdown-item>
          <el-dropdown-item>Action 3</el-dropdown-item>
          <el-dropdown-item>Action 4</el-dropdown-item>
          <el-dropdown-item>Action 5</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <div>
      <el-popover :visible="state.visible" placement="bottom" :width="200">
        <div :class="[ns.e('background')]">
          <el-switch
            v-model="state.value0"
            size="large"
            active-text="图片"
            inactive-text="颜色"
          />
          <div>
            <ul :class="[ns.e('quickBackground')]" ref="element">
              <li v-for="(item0, index0) in state.value0 ? quickImages : quickColors" :key="index0">
                <ul>
                  <li v-for="(item1, index1) in item0" :data-value="item1" :key="index1" :style="state.value0 ? { 'background-image': `url(${item1})` } : { backgroundColor: item1 }"></li>
                </ul>
              </li>
            </ul>
            <el-color-picker v-if="!state.value0" @active-change="handleActiveChange" @change="handleChange" v-model="state.color" show-alpha />
          </div>
        </div>
        <el-select v-if="state.defaultBackground.backgroundImage" v-model="props.data.style.backgroundFillType" placeholder="Select" size="large">
          <el-option
            v-for="item in fillTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-row>
          <el-col>
            <el-button style="width: 100%;" v-if="props.data.style.backgroundColor || props.data.style.backgroundImage" @click="() => handleClick(1)">移除</el-button>
          </el-col>
          <el-col>
            <el-button style="width: 100%;" type="primary" @click="() => handleClick(2)">保存</el-button>
          </el-col>
        </el-row>
        <template #reference>
          <el-button @click="state.visible = true">背景</el-button>
        </template>
      </el-popover>
    </div>
  </div>
</template>

<style scoped>

</style>
