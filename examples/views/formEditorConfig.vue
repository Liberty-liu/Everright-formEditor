<script setup>
import _ from 'lodash-es'
import { ref, onMounted, getCurrentInstance, reactive, computed, inject, watch } from 'vue'
import { erFormConfig, erGeneratorData, erComponentsConfig, utils } from '@ER/formEditor'
const {
  lang
} = inject('globalConfig')
const EReditorRef = ref(null)
// const layoutNodes = erComponentsConfig.fieldConfig[2].list.map(e => erGeneratorData(e, true, 'en'))
const store = reactive({
  fields: [],
  layouts: []
})
const fieldData = ref({})
const logicData = ref('{}')
const all = ref([])
watch(lang, (newLang) => {
  all.value = []
  store.layouts = []
  store.fields = [...erComponentsConfig.fieldsConfig[0].list, ...erComponentsConfig.fieldsConfig[1].list].map(e => {
    const result = erGeneratorData(e, true, newLang)
    if (/^(radio|cascader|checkbox|select)$/.test(e.type)) {
      result.columns[0].options.data = utils.generateOptions(3).map((e, i) => {
        e.label += i + 1
        return e
      })
    }
    return result
  })
  const layoutNodes = erComponentsConfig.fieldsConfig[2].list.map(e => erGeneratorData(e, true, newLang))
  layoutNodes.forEach((node, index) => {
    store.layouts.push(node)
    switch (node.columns[0].type) {
      case 'grid':
      case 'tabs':
      case 'collapse':
        node.columns[0].columns[0].label = `${node.columns[0].label} > ${node.columns[0].columns[0].type}`
        store.layouts.push(node.columns[0].columns[0])
        break
      case 'table':
        node.columns[0].rows[0].columns[0].label = `${node.columns[0].label} > ${node.columns[0].rows[0].columns[0].type}`
        store.layouts.push(node.columns[0].rows[0].columns[0])
        break
      case 'subform':
        node.columns[0].list[0].push(erGeneratorData(erComponentsConfig.fieldsConfig[1].list[0], true, 'en'))
        // node.columns[0].rows[0].columns[0].label = `${node.columns[0].label} > ${node.columns[0].rows[0].columns[0].type}`
        // store.layouts.push(node.columns[0].rows[0].columns[0])
        break
    }
  })
  all.value = [...store.fields, ...store.layouts]
}, { immediate: true })
const value0 = ref('root')
// const value0 = ref(store.layouts[6].id)
// const value0 = ref(store.fields[17].id)
const sector = computed(() => {
  let result = ''
  if (value0.value === 'root') {
    result = 'root'
  } else {
    result = _.find(all.value, { id: value0.value })
  }
  return result
})
const handleListener = async ({ type, data }) => {
  console.log(type)
  if (type === 'changeParams') {
    fieldData.value = JSON.stringify(data, '', 2)
  }
  if (/^logic:(cancel|confirm)$/.test(type)) {
    logicData.value = JSON.stringify(data, '', 2)
  }
}
</script>
<template>
  <el-container>
    <el-header height="auto">
      <div>
        <h1>Form Attribute</h1>
        <el-radio-group v-model="value0" size="large">
          <el-radio-button label="root">Form Attribute</el-radio-button>
        </el-radio-group>
        <h1>Fields</h1>
        <el-radio-group v-model="value0" size="large">
          <el-radio-button v-for="item in store.fields" :key="item.columns[0].id" :label="item.id">{{item.columns[0].label}}</el-radio-button>
        </el-radio-group>
      </div>
      <div>
        <h1>Layout</h1>
        <el-radio-group v-model="value0" size="large">
          <el-radio-button v-for="item in store.layouts" :key="item.id" :label="item.id">
            {{item.label ? (item.label || item.type) : (item.columns[0].label || item.columns[0].type)}}
          </el-radio-button>
        </el-radio-group>
      </div>
    </el-header>
    <el-container>
      <el-aside width="340px">
        <div class="customConfig">
          <er-form-config
            :lang="lang"
            @listener="handleListener"
            :field="sector"
            :fields="store.fields.map(e => e.columns[0])"
            ref="EReditorRef"/>
        </div>
      </el-aside>
      <el-main>
        <el-input
          v-model="fieldData"
          :rows="value0 === 'root' ? 20 : 40"
          disabled
          type="textarea"
          placeholder="Please input"
        />
        <el-input
          v-if="value0 === 'root'"
          v-model="logicData"
          :rows="value0 === 'root' ? 20 : 40"
          disabled
          type="textarea"
          placeholder="Please input"
        />
      </el-main>
    </el-container>
  </el-container>
</template>
<style scoped lang="scss">
.customConfig {
  padding: 10px;
  :deep(.Everright-formEditor-Config) {
    width: 100%;
  }
}
</style>
