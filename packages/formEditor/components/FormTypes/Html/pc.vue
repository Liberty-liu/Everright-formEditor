<script>
import hooks from '@ER/hooks'
// import * as dd from '/external/ckeditor5/build/ckeditor.js'
// import CKEDITOR from '/external/ckeditor5/build/ckeditor.js'
// import { component } from '@ckeditor/ckeditor5-vue'
import CKEditor from '@ER/ckeditor'
export default {
  name: 'er-html',
  inheritAttrs: false,
  customOptions: {}
}
</script>
<script setup>
const props = defineProps(['data', 'params'])
const han = () => {
  // console.log(123123123123)
}
</script>
<template>
  <CKEditor
    v-model="data.options.defaultValue"
    style="width: 100px;"
    @ready="han"
    v-bind="params"
  ></CKEditor>
</template>

<style scoped>

</style>
