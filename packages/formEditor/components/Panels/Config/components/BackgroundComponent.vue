<script>
import { reactive, ref } from 'vue'
import { useEventListener } from '@vueuse/core'
import utils from '@ER/utils'
import hooks from '@ER/hooks'
export default {
  name: 'ConfigBackground',
  inheritAttrs: false,
  customOptions: {}
}
</script>
<script setup>
const {
  target
} = hooks.useTarget()
const nums = reactive([0, 0, 0, 0])
const ns = hooks.useNamespace('ConfigBackground')
const element = ref()
const state = reactive({
  visible: false,
  value0: false,
  color: '',
  defaultBackground: {}
})
// const quickColors = [
//   [
//     'rgb(255, 255, 255)',
//     'rgb(232, 234, 236)',
//     'rgb(28, 28, 28)'
//   ],
//   [
//     'rgb(242, 242, 242)',
//     'rgb(204, 204, 204)',
//     'rgb(153, 153, 153)',
//     'rgb(102, 102, 102)',
//     'rgb(51, 51, 51)'
//   ],
//   [
//     'rgb(250, 140, 151)',
//     'rgb(254, 201, 121)',
//     'rgb(160, 210, 109)',
//     'rgb(116, 207, 226)',
//     'rgb(145, 138, 231)'
//   ],
//   [
//     'rgb(119, 121, 122)',
//     'rgb(167, 186, 193)',
//     'rgb(214, 209, 187)',
//     'rgb(189, 198, 188)',
//     'rgb(193, 167, 167)'
//   ]
// ]
const quickColors = [
  'rgb(255, 255, 255)',
  'rgb(232, 234, 236)',
  'rgb(28, 28, 28)',
  'rgb(242, 242, 242)',
  'rgb(204, 204, 204)',
  'rgb(153, 153, 153)',
  'rgb(102, 102, 102)',
  'rgb(51, 51, 51)',
  'rgb(250, 140, 151)',
  'rgb(254, 201, 121)',
  'rgb(160, 210, 109)'
  // 'rgb(116, 207, 226)',
  // 'rgb(145, 138, 231)',
  // 'rgb(119, 121, 122)',
  // 'rgb(167, 186, 193)',
  // 'rgb(214, 209, 187)',
  // 'rgb(189, 198, 188)',
  // 'rgb(193, 167, 167)'
]
// const quickImages = [
//   [
//     '/public/images/CNoecellRCM.jpg',
//     '/public/images/eT4eTi_ku1s.jpg',
//     '/public/images/4EZMZRHJugA.jpg'
//   ],
//   [
//     '/public/images/7e_gFC2Ce04.jpg',
//     '/public/images/b1h8HsWhShM.jpg',
//     '/public/images/fD7cXIFurSQ.jpg'
//   ]
// ]
const quickImages = [
  '/public/images/CNoecellRCM.jpg',
  '/public/images/eT4eTi_ku1s.jpg',
  '/public/images/4EZMZRHJugA.jpg',
  '/public/images/7e_gFC2Ce04.jpg',
  '/public/images/b1h8HsWhShM.jpg',
  '/public/images/fD7cXIFurSQ.jpg'
]
const options0 = [
  [
    'repeat',
    'repeat-x',
    'repeat-y',
    'no-repeat'
  ],
  [
    'left top',
    'left center',
    'left bottom',
    'right top',
    'right center',
    'right bottom',
    'center top',
    'center center',
    'center bottom'
  ],
  [
    'scroll',
    'fixed',
    'local'
  ],
  [
    'auto',
    'cover',
    'contain'
  ]
]
if (!(!target.value.style.background.color && !target.value.style.background.image)) {
  if (target.value.style.background.color) {
    // eslint-disable-next-line vue/no-setup-props-destructure
    state.defaultBackground.backgroundColor = target.value.style.background.color
  } else {
    // eslint-disable-next-line vue/no-setup-props-destructure
    state.defaultBackground.backgrounImage = target.value.style.background.image
  }
  if (target.value.style.isCustomBackground) {
    // eslint-disable-next-line vue/no-setup-props-destructure
    state.color = target.value.style.background.color
  }
  state.value0 = !target.value.style.background.color
}
// watch(() => target.value.style, (newVal) => {
//   console.log(newVal.)
// }, {
//   immediate: true
// })
const modifyBackBackground = (key, value) => {
  const keys = ['color', 'image']
  let i = 0
  while (i !== keys.length) {
    const item = keys[i]
    if (item === key) {
      target.value.style.background[item] = value
    } else {
      target.value.style.background[item] = ''
    }
    i++
  }
}
// modifyBackBackground('backgroundColor')
useEventListener(element, 'click', (e) => {
  if (/[LI, IMG]/.test(e.target.tagName)) {
    if (state.value0) {
      modifyBackBackground('image', e.target.dataset.value)
      state.defaultBackground = {
        backgroundImage: e.target.dataset.value
      }
    } else {
      modifyBackBackground('color', e.target.dataset.value)
      state.defaultBackground = {
        backgroundColor: e.target.dataset.value
      }
      target.value.style.isCustomBackground = false
    }
  }
})
useEventListener(element, 'mousemove', (e) => {
  if (/[LI, IMG]/.test(e.target.tagName)) {
    if (state.value0) {
      modifyBackBackground('image', e.target.dataset.value)
    } else {
      modifyBackBackground('color', e.target.dataset.value)
    }
  }
})
useEventListener(element, 'mouseleave', (e) => {
  if (state.defaultBackground.backgroundColor) {
    modifyBackBackground('color', state.defaultBackground.backgroundColor)
  } else {
    modifyBackBackground('image', state.defaultBackground.backgroundImage)
  }
})
const handleActiveChange = (value) => {
  target.value.style.isCustomBackground = !!value
  target.value.style.background.color = value
  if (!value) {
    if (state.defaultBackground.backgroundColor) {
      modifyBackBackground('color', state.defaultBackground.backgroundColor)
    } else {
      modifyBackBackground('image', state.defaultBackground.backgroundImage)
    }
  } else {
    target.value.style.backgroundImage = ''
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
      target.value.style.background.color = target.value.style.background.image = ''
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
  <el-form-item size="default" label="背景">
    <template v-slot:label>
      <div :class="[ns.e('backgroundTitle')]">
        <span class="el-form-item__label">背景</span>
        <el-radio-group v-model="state.value0" size="large">
          <el-radio-button :label="false">颜色</el-radio-button>
          <el-radio-button :label="true">图片</el-radio-button>
        </el-radio-group>
      </div>
    </template>
    <div style="width: 100%">
      <div :class="[ns.e('background')]">
        <el-color-picker v-if="!state.value0" @active-change="handleActiveChange" @change="handleChange" v-model="state.color" show-alpha />
        <ul :class="[!state.value0 ? ns.e('quickColor') : ns.e('quickImage')]" ref="element">
          <li v-for="(item0, index0) in state.value0 ? quickImages : quickColors" :key="index0" :data-value="item0" :style="!state.value0 && { backgroundColor: item0 }">
            <el-image v-if="state.value0" :data-value="item0" :src="item0" lazy />
<!--            <ul>-->
<!--              <li v-for="(item1, index1) in item0" :data-value="item1" :key="index1" :style="!state.value0 && { backgroundColor: item1 }">-->
<!--                <el-image v-if="state.value0" :data-value="item1" :src="item1" lazy />-->
<!--              </li>-->
<!--            </ul>-->
          </li>
        </ul>
<!--        <ul :class="[ns.e('quickBackground')]" ref="element">-->
<!--          <li v-for="(item0, index0) in state.value0 ? quickImages : quickColors" :key="index0">-->
<!--            <ul>-->
<!--              <li v-for="(item1, index1) in item0" :data-value="item1" :key="index1" :style="!state.value0 && { backgroundColor: item1 }">-->
<!--                <el-image v-if="state.value0" :data-value="item1" :src="item1" lazy />-->
<!--              </li>-->
<!--            </ul>-->
<!--          </li>-->
<!--        </ul>-->
      </div>
      <div v-if="state.defaultBackground.backgroundImage">
        <el-row :gutter="14">
          <el-col :span="12">
            <div>Reapeat</div>
            <el-select v-model="target.style.background.repeat" placeholder="Select" size="large">
              <el-option
                v-for="item in options0[0]"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-col>
          <el-col :span="12">
            <div>Position</div>
            <el-select v-model="target.style.background.position" placeholder="Select" size="large">
              <el-option
                v-for="item in options0[1]"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-col>
        </el-row>
        <el-row :gutter="14">
          <el-col :span="12">
            <div>Attachment</div>
            <el-select v-model="target.style.background.attachment" placeholder="Select" size="large">
              <el-option
                v-for="item in options0[2]"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-col>
          <el-col :span="12">
            <div>Size</div>
            <el-select v-model="target.style.background.size" placeholder="Select" size="large">
              <el-option
                v-for="item in options0[3]"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-col>
        </el-row>
      </div>
      <el-row :class="ns.e('clear')">
        <el-col :span="24">
          <el-button style="width: 100%;" v-if="state.defaultBackground.backgroundColor || state.defaultBackground.backgroundImage" @click="() => handleClick(1)">移除</el-button>
        </el-col>
<!--        <el-col>-->
<!--          <el-button style="width: 100%;" type="primary" @click="() => handleClick(2)">保存</el-button>-->
<!--        </el-col>-->
      </el-row>
    </div>
  </el-form-item>
</template>
