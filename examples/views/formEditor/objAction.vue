<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import hooks from '@ER/hooks'
import { EverrightPreview } from '@ER/formEditor'
import uri from '@ER-examples/uri.js'
const route = useRoute()
const loading = ref(true)
const lang = ref('en')
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
  console.log(type)
  if (type === 'getJson') {
    // console.log(data)
    // return false
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
  <EverrightPreview
    :lang="lang"
    @listener="handleListener"
    v-loading="loading"
    ref="EReditorRef"/>
</template>
