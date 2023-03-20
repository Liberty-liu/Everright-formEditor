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
  <el-image :src="props.data.options.url" />
<!--  <el-button-->
<!--    type="primary"-->
<!--    :size="props.data.style.size === 'full' ? 'large' : props.data.style.size"-->
<!--    :style="props.data.style.size === 'full' && { width: '100%'}"-->
<!--    :plain="props.data.style.plain"-->
<!--    :round="props.data.style.round"-->
<!--    :color="props.data.style.color"-->
<!--  >-->
<!--    {{props.data.options.defaultValue}}-->
<!--  </el-button>-->
</template>

<style scoped>

</style>
