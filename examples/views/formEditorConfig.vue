<script setup>
import _ from 'lodash-es'
import { ref, onMounted, getCurrentInstance, reactive, computed } from 'vue'
import { erFormConfig, erGeneratorData, erComponentsConfig, utils } from '@ER/formEditor'

const EReditorRef = ref(null)
const layoutNodes = erComponentsConfig.fieldConfig[2].list.map(e => erGeneratorData(e, true, 'zh-cn'))
const store = reactive({
  fields: [...erComponentsConfig.fieldConfig[0].list, ...erComponentsConfig.fieldConfig[1].list].map(e => erGeneratorData(e, true, 'zh-cn')),
  layouts: []
})
const fieldData = ref({})
layoutNodes.forEach((node, index) => {
  store.layouts.push(node)
  // console.log(node)
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
  }
})
const all = [...store.fields, ...store.layouts]
// const value0 = ref('root')
const value0 = ref(store.layouts[2].id)
const sector = computed(() => {
  let result = ''
  if (value0.value === 'root') {
    result = 'root'
  } else {
    console.log(value0.value)
    result = _.find(all, { id: value0.value })
  }
  return result
})
const handleListener = async ({ type, data }) => {
  if (type === 'changeParams') {
    fieldData.value = JSON.stringify(data, '', 2)
  }
}
</script>
<template>
  <el-container>
    <el-header height="auto">
      <div>
        <h1>全局配置</h1>
        <el-radio-group v-model="value0" size="large">
          <el-radio-button label="root">全局配置</el-radio-button>
        </el-radio-group>
        <h1>字段</h1>
        <el-radio-group v-model="value0" size="large">
          <el-radio-button v-for="item in store.fields" :key="item.columns[0].id" :label="item.id">{{item.columns[0].label}}</el-radio-button>
        </el-radio-group>
      </div>
      <div>
        <h1>布局</h1>
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
            @listener="handleListener"
            :field="sector"
            ref="EReditorRef"/>
        </div>
      </el-aside>
      <el-main>
        <el-input
          v-model="fieldData"
          :rows="40"
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
  ::v-deep .Everright-formEditor-Config {
    width: 100%;
    //height: 600px;
  }
}
</style>
