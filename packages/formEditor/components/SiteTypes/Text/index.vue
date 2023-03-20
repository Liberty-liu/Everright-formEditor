<script>
export default {
  name: 'er-button',
  inheritAttrs: false,
  customOptions: {}
}
</script>
<script setup>
const props = defineProps(['data'])
</script>
<template>
  <CKEditor v-model="props.data.options.html"></CKEditor>
</template>

<style scoped>

</style>
