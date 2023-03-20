<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue'
import { EverrightEditor } from '@ER/formEditor'
const erEditor = ref(null)
</script>
<template>
  <EverrightEditor
    ref="erEditor"/>
</template>
