<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue'
import { EverrightEditor } from '@ER/formEditor'
const EReditorRef = ref(null)
</script>
<template>
  <EverrightEditor
    ref="EReditorRef"/>
</template>
