<script setup>
import { ref, onMounted, reactive, inject } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import hooks from '@ER/hooks'
import { erFormPreview } from '@ER/formEditor'
import uri from '@ER-examples/uri.js'
const route = useRoute()
const loading = ref(true)
const {
  lang
} = inject('globalConfig')
const EReditorRef = ref(null)
const isEdit = !!route.params.actionid
const state = reactive({
  name: ''
})
const getObjData = async () => {
  try {
    const data = []
    const {
      data: data0
    } = await hooks.useFetch(`${uri.obj}/${route.params.objid}`, {
      method: 'get'
    })
    data.push(data0.content)
    if (isEdit) {
      const {
        data: data1
      } = await hooks.useFetch(`${uri.obj}/${route.params.objid}/action/${route.params.actionid}`, {
        method: 'get'
      })
      data.push(data1.content)
    }
    EReditorRef.value.setData(...data)
  } finally {
    loading.value = false
  }
}
const handleListener = async ({ type, data }) => {
  if (type === 'submit') {
    loading.value = true
    try {
      const postData = {
        content: data
      }
      await hooks.useFetch(`${uri.obj}/${route.params.objid}/action${isEdit ? `/${route.params.actionid}` : '/create'}`, {
        method: isEdit ? 'put' : 'post',
        data: postData
      })
      ElMessage({
        message: 'save successfully.',
        type: 'success'
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
  <er-form-preview
    :lang="lang"
    @listener="handleListener"
    v-loading="loading"
    ref="EReditorRef"/>
</template>
