<script>
import {
  Edit
} from '@element-plus/icons-vue'
import { ElLoading } from 'element-plus'
import { ref, nextTick, watch, onBeforeUnmount, unref } from 'vue'
import SignaturePad from 'signature_pad'
import Icon from '@ER/icon'
import utils from '@ER/utils'
import hooks from '@ER/hooks'
export default {
  name: 'er-button',
  inheritAttrs: false,
  customOptions: {}
}
</script>
<script setup>
const props = defineProps(['data', 'params'])
const ns = hooks.useNamespace('FormTypesSignature_mobile')
const element = ref()
const dialogVisible = ref(false)
const showClear = ref(false)
const url = ref('')
const loading = ref(false)
const changed = ref(false)
let signaturePad = ''
const resizeCanvas = () => {
  const canvas = element.value
  const data = signaturePad.toData()
  const ratio = Math.max(window.devicePixelRatio || 1, 1)
  canvas.width = canvas.offsetWidth * ratio
  canvas.height = canvas.offsetHeight * ratio
  canvas.getContext('2d').scale(ratio, ratio)
  signaturePad.clear()
  signaturePad.fromData(data)
}
watch(() => props.data.options.penColor, (newVal) => {
  signaturePad && (signaturePad.penColor = newVal)
})
// onBeforeUnmount(() => {
//   window.removeEventListener('resize', resizeCanvas, false)
// })
const handleClear = () => {
  signaturePad.clear()
  showClear.value = false
}
const init = () => {
  signaturePad = new SignaturePad(element.value, {
    penColor: props.data.options.penColor
  })
  signaturePad.addEventListener('beginStroke', () => {
    showClear.value = true
    changed.value = true
  })
  resizeCanvas()
}
const handleOpen = () => {
  if (props.params.disabled) return false
  dialogVisible.value = true
  changed.value = false
  showClear.value = !!props.data.options.defaultValue
  nextTick(() => {
    init()
    if (props.data.options.defaultValue) {
      const loading = ElLoading.service()
      utils.filetoDataURL(props.data.options.defaultValue.url).then(e => {
        signaturePad.fromDataURL(e)
        loading.close()
      })
    }
  })
}
const handleAction = async (type) => {
  switch (type) {
    case 1:
      dialogVisible.value = false
      break
    case 2:
      if (!unref(changed)) {
        dialogVisible.value = false
      } else {
        const loading = ElLoading.service()
        const form = new FormData()
        form.append('file', utils.dataURLtoFile(signaturePad.toDataURL(), 'signature.png'))
        try {
          const response = await hooks.useFetch(props.data.options.action, {
            method: 'post',
            data: form
          })
          props.data.options.defaultValue = response.data[0]
          dialogVisible.value = false
        } catch (e) {
        }
        loading.close()
      }
      break
    default:
  }
}
</script>
<template>
  <van-field
    readonly
    v-bind="params"
    @click="handleOpen"
  >
    <template #input>
      <template
        v-if="data.options.defaultValue"
      >
<!--        <img-->
<!--          :src="data.options.defaultValue.url"-->
<!--          style="object-fit: contain; width: 100%; height: 100%;"-->
<!--        >-->
        <van-image
          width="100%"
          height="100"
          fit="contain"
          :src="data.options.defaultValue.url"
        />
      </template>
      <div
        v-else
        :class="[ns.e('noData')]"
      >
        <el-button text type="primary" :icon="Edit" circle>
          添加签名
        </el-button>
      </div>
    </template>
    <template v-if="data.options.defaultValue" #button>
      <van-icon @click.stop="data.options.defaultValue = ''" name="clear" />
    </template>
  </van-field>
  <van-popup
    v-model:show="dialogVisible"
    position="right"
    :style="{ width: '100%', height: '100%' }"
  >
    <van-nav-bar
      title="添加签名"
      left-text="返回"
      left-arrow
      @click-left="handleAction(1)">
      <template v-if="showClear" #right>
        <span @click="handleAction(2)" class="van-nav-bar__text">使用签名</span>
      </template>
    </van-nav-bar>
    <div
      :class="[ns.e('canvasWrap')]">
      <canvas
        ref="element"
      ></canvas>
      <Icon v-if="showClear" @click="handleClear" :class="[ns.e('clear')]" icon="CLEAR"></Icon>
    </div>
  </van-popup>
</template>

<style scoped>

</style>
