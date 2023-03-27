<script>
import { reactive, ref, onMounted, inject, watch, computed, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
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
  t
} = hooks.useI18n()
const {
  target
} = hooks.useTarget()
const nums = reactive([0, 0, 0, 0])
const ns = hooks.useNamespace('ConfigBackground')
const fileList = ref([])
const element = ref()
const state = reactive({
  visible: false,
  value0: false,
  color: '',
  defaultBackground: {}
})
const ERp = inject('Everright-propsPanel')
watch(ERp.bgStatus, (newVal) => {
  state.value0 = newVal
}, {
  immediate: true
})
const quickColors = [
  'rgba(255, 255, 255, 1)',
  'rgba(249, 249, 249, 1)',
  'rgba(233, 233, 233, 1)',
  'rgba(254, 249, 210, 1)',
  'rgba(253, 246, 236, 1)',
  'rgba(254, 241, 241, 1)',
  'rgba(236, 246, 255, 1)',
  'rgba(235, 242, 244, 1)',
  'rgba(240, 249, 236, 1)'
]
const quickImages = ref([
  '/uploads/bo3G_S0x3pbJKnXh98X6II3p.png',
  '/uploads/C0cV54ToEDe_RN1yK0pTLPIB.png',
  '/uploads/ygDk80xpYvqnniTM1WIEjCul.png',
  '/uploads/oByh9bK9siHI-LeVM4PX05Bf.jpg'
])
watch(quickImages.value, (newVal) => {
  if (newVal.length >= 5) {
    quickImages.value.pop()
  }
})
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
    state.defaultBackground.backgroundImage = target.value.style.background.image
  }
  // if (target.value.style.isCustomBackground) {
  //   // eslint-disable-next-line vue/no-setup-props-destructure
  //   state.color = target.value.style.background.color
  // }
  ERp.bgStatus.value = !target.value.style.background.color
}
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
onMounted(() => {
  element.value.addEventListener('click', (e) => {
    if (/[LI, IMG]/.test(e.target.tagName)) {
      if (state.value0) {
        if (e.target.dataset.value) {
          modifyBackBackground('image', e.target.dataset.value)
          state.defaultBackground = {
            backgroundImage: e.target.dataset.value
          }
        }
      } else {
        modifyBackBackground('color', e.target.dataset.value)
        state.defaultBackground = {
          backgroundColor: e.target.dataset.value
        }
        // target.value.style.isCustomBackground = false
      }
    }
  })
  element.value.addEventListener('mousemove', (e) => {
    if (/[LI, IMG]/.test(e.target.tagName)) {
      if (e.target.dataset.value) {
        if (state.value0) {
          modifyBackBackground('image', e.target.dataset.value)
        } else {
          modifyBackBackground('color', e.target.dataset.value)
        }
      }
    }
  })
  element.value.addEventListener('mouseleave', (e) => {
    if (state.defaultBackground.backgroundColor) {
      modifyBackBackground('color', state.defaultBackground.backgroundColor)
    } else {
      modifyBackBackground('image', state.defaultBackground.backgroundImage)
    }
  })
})
const handleActiveChange = (value) => {
  // target.value.style.isCustomBackground = !!value
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
const checkIsSelected = (key) => {
  const curVal = state.value0 ? state.defaultBackground.backgroundImage : state.defaultBackground.backgroundColor
  return key === curVal
}
const beforeAvatarUpload = (rawFile) => {
  if (rawFile.size > 2 * 1024 * 1024) {
    ElMessage({
      message: t('er.validateMsg.fileSize', { size: 2 }),
      type: 'warning'
    })
    return false
  }
  return true
}
const handleError = (error) => {
  ElMessage.error(error.toString())
}
const handleSuccess = (response, uploadFile) => {
  quickImages.value.unshift(response.data[0].url)
  nextTick(() => {
    element.value.children[1].click()
  })
}
</script>
<template>
  <div style="width: 100%">
    <div :class="[ns.e('background')]">
<!--      <div v-if="!state.value0" :class="[target.style.isCustomBackground && ns.e('selecteColor')]">-->
      <div v-if="!state.value0">
        <el-color-picker
          size="large"
          @active-change="handleActiveChange"
          @change="handleChange"
          v-model="target.style.background.color"
          show-alpha
        />
      </div>
      <ul :class="[!state.value0 ? ns.e('quickColor') : ns.e('quickImage')]" ref="element">
        <li v-if="state.value0" :class="ns.e('uploadFile')">
          <el-upload
            accept=".png,.jpg"
            action="http://192.168.31.181:8001/Everright-api/lowCode/uploads"
            list-type="picture-card"
            ref="element"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            :on-success="handleSuccess"
            :on-error="handleError"
          >
            <el-icon><Plus /></el-icon>
          </el-upload>
        </li>
        <li
          v-for="(item0, index0) in state.value0 ? quickImages : quickColors"
          :key="index0"
          :data-value="item0"
          :style="!state.value0 && { backgroundColor: item0 }"
          :class="[checkIsSelected(item0) && 'selectedBg', 'selectColorFirst']"
        >
          <el-image v-if="state.value0" :data-value="item0" :src="item0" lazy />
        </li>
      </ul>
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
  </div>
</template>
