<script>
import { ref, nextTick, watch, unref } from 'vue'
import { ElMessage } from 'element-plus'
import hooks from '@ER/hooks'
import _ from 'lodash-es'
export default {
  name: 'er-uploadfile',
  inheritAttrs: false,
  customOptions: {}
}
</script>
<script setup>
const {
  t
} = hooks.useI18n()
const props = defineProps(['data', 'params'])
const fileList = ref(_.cloneDeep(props.data.options.defaultValue))
const dialogImageUrl = ref(0)
const dialogVisible = ref(false)
const element = ref()
watch(fileList, (arr) => {
  const list = unref(fileList).map(e => {
    let result = {}
    if (e.response) {
      result = e.response.data[0]
    } else {
      result = _.pick(e, ['name', 'url'])
    }
    return result
  })
  if (!_.isEqual(list, arr) || !list.length) {
    props.data.options.defaultValue = _.cloneDeep(list)
  }
}, {
  immediate: true,
  deep: true
})
watch(() => props.data.options.defaultValue, (arr) => {
  nextTick(() => {
    if (arr.length === props.data.options.limit) {
      element.value.$el.querySelector('.el-upload--picture-card').style.display = 'none'
    } else {
      element.value.$el.querySelector('.el-upload--picture-card').style.display = 'inline-flex'
    }
  })
}, {
  immediate: true,
  deep: true
})
const handlePictureCardPreview = (uploadFile) => {
  const url = uploadFile.response ? uploadFile.response.data[0].url : uploadFile.url
  dialogImageUrl.value = props.data.options.defaultValue.map(e => e.url).indexOf(url)
  dialogVisible.value = true
}
const beforeAvatarUpload = (rawFile) => {
  if (rawFile.size > props.params.maxSize) {
    ElMessage({
      message: t('er.validateMsg.fileSize', { size: props.data.options.size }),
      type: 'warning'
    })
    return false
  }
  return true
}
const handleError = (error) => {
  ElMessage.error(error.toString())
  // ElMessage({
  //   message: 'Warning, this is a warning message.',
  //   type: 'warning',
  // })
}
</script>
<template>
  <el-upload
    v-model:file-list="fileList"
    v-bind="params"
    list-type="picture-card"
    ref="element"
    :on-preview="handlePictureCardPreview"
    :before-upload="beforeAvatarUpload"
    :on-error="handleError"
  >
    <el-icon>
      <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728=""><path fill="currentColor" d="M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64h352z"></path></svg>
    </el-icon>
  </el-upload>

  <el-image-viewer
    v-if="dialogVisible"
    :initial-index="dialogImageUrl"
    :url-list="data.options.defaultValue.map(e => e.url)"
    @close="dialogVisible = false"
  ></el-image-viewer>

</template>
