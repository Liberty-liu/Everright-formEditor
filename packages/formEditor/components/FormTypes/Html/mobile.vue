<script>
import { ElMessage } from 'element-plus'
import hooks from '@ER/hooks'
import { ref, computed, watch, nextTick } from 'vue'
import CKEditor from '@ER/ckeditor'
export default {
  name: 'er-html',
  inheritAttrs: false,
  customOptions: {}
}
</script>
<script setup>
const props = defineProps(['data', 'params'])
const dialogVisible = ref(false)
const popup = ref()
const ns = hooks.useNamespace('FormTypesHtml_mobile')
const currentValue = computed({
  get () {
    let result = ''
    if (props.data.options.defaultValue) {
      result = '已填写'
    } else {
      result = '未填写'
    }
    return result
  }
})
const handleAction = async (type) => {
  dialogVisible.value = false
}
</script>
<template>
<!--  />-->
  <van-field
    readonly
    v-model="currentValue"
    @click="!params.disabled && (dialogVisible = true)"
    v-bind="params" />
  <van-popup
    ref="popup"
    :lock-scroll="false"
    :class="ns.e('popup')"
    teleport="body"
    v-model:show="dialogVisible"
    position="right"
    :style="{ width: '100%', height: '100vh' }"
    :safe-area-inset-bottom="true"
  >
    <van-nav-bar
      left-text="返回"
      left-arrow
      @click-left="handleAction(1)">
      <template #right>
        <span @click="handleAction(2)" class="van-nav-bar__text">保存</span>
      </template>
    </van-nav-bar>
    <CKEditor
      platform="mobile"
      v-model="data.options.defaultValue"
      v-bind="params"
    ></CKEditor>
  </van-popup>
</template>

<style scoped>

</style>
