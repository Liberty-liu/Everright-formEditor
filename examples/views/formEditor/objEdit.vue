<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import hooks from '@ER/hooks'
import { erFormEditor } from '@ER/formEditor'
import uri from '@ER-examples/uri.js'
const route = useRoute()
const loading = ref(true)
const lang = ref('zh-cn')
const EReditorRef = ref(null)
const state = reactive({
  name: ''
})
window.lang = lang
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
    state.name = name
    EReditorRef.value.setData(content)
  } finally {
    loading.value = false
  }
}
const handleListener = async ({ type, data }) => {
  if (type === 'getData') {
    loading.value = true
    try {
      const postData = {
        name: state.name,
        content: data
      }
      await hooks.useFetch(`${uri.obj}/${route.params.objid}`, {
        method: 'put',
        data: postData
      })
    } finally {
      loading.value = false
    }
  }
}
onMounted(() => {
  getObjData()
})
</script>
<template>
  <er-form-editor
    :lang="lang"
    @listener="handleListener"
    v-loading="loading"
    :fileUploadURI="uri.uploadFile"
    ref="EReditorRef"/>
</template>
