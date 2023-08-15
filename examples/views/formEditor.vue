<script setup>
import { ref, onMounted, getCurrentInstance, inject } from 'vue'
import { erFormEditor } from '@ER/formEditor'
const {
  lang
} = inject('globalConfig')
const EReditorRef = ref(null)
const handleListener = async ({ type, data }) => {
  // console.log(data)
  switch (type) {
    case 'lang':
      lang.value = data
      localStorage.setItem('er-lang', data)
      break
  }
}
</script>
<template>
  <er-form-editor
    :lang="lang"
    @listener="handleListener"
    ref="EReditorRef"/>
</template>
