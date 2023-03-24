<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue'
import { erFormEditor } from '@ER/formEditor'
const EReditorRef = ref(null)
</script>
<template>
  <er-form-editor
    ref="EReditorRef"/>
</template>
