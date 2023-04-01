<script setup>
import { ref, onMounted, reactive, nextTick, inject } from 'vue'
import { useRoute } from 'vue-router'
import hooks from '@ER/hooks'
import { erFormEditor } from '@ER/formEditor'
import uri from '@ER-examples/uri.js'
import { ElMessage } from "element-plus"
const route = useRoute()
const {
  lang
} = inject('globalConfig')
const loading = ref(true)
const isRender = ref(false)
const EReditorRef = ref(null)
const layoutType = ref()
const state = reactive({
  name: ''
})
const getObjData = async () => {
  try {
    const {
      data: {
        content,
        name
      }
    } = await hooks.useFetch(`${uri.obj}/${route.params.objid}`, {
      method: 'get'
    })
    layoutType.value = content.layoutType
    delete content.layoutType
    state.name = name
    isRender.value = true
    nextTick(() => {
      EReditorRef.value.setData(content)
    })
  } finally {
    nextTick(() => {
      loading.value = false
    })
  }
}
const handleListener = async ({ type, data }) => {
  switch (type) {
    case 'lang':
      lang.value = data
      localStorage.setItem('er-lang', data)
      break
    case 'getData':
      loading.value = true
      try {
        const postData = {
          name: state.name,
          content: Object.assign({
            layoutType: layoutType.value
          }, data)
        }
        await hooks.useFetch(`${uri.obj}/${route.params.objid}`, {
          method: 'put',
          data: postData
        })
        ElMessage({
          message: 'save successfully.',
          type: 'success'
        })
      } finally {
        loading.value = false
      }
      break
  }
}
onMounted(() => {
  getObjData()
})
const checkPropsBySelected = (sector, propType) => {
  // console.log(sector.type === 'cascader' && propType === 'defaultValue')
  // console.log(propType)
  if (sector.type === 'cascader' && propType === 'defaultValue') {
    // return false
  }
  // return propType === 'defaultValue'
}
const quickImages = ref([
  '/public/Everright-logo.svg',
  '/public/Everright-logo.svg',
  '/public/Everright-logo.svg'
])

</script>
<template>
  <div
    v-loading="loading"
  >
    <er-form-editor
      :checkPropsBySelected="checkPropsBySelected"
      v-if="isRender"
      :quickImages="quickImages"
      :layoutType="layoutType"
      :lang="lang"
      @listener="handleListener"
      :fileUploadURI="uri.uploadFile"
      ref="EReditorRef"/>
  </div>
</template>
