<script setup>
import _ from 'lodash-es'
import { ref, onMounted, getCurrentInstance, reactive, computed } from 'vue'
import { erFormConfig, erGeneratorData, erComponentsConfig, utils } from '@ER/formEditor'
const EReditorRef = ref(null)
const layoutNodes = erComponentsConfig.fieldConfig[1].list.map(e => erGeneratorData(e, false, 'zh-cn'))
const store = reactive({
  fields: erComponentsConfig.fieldConfig[0].list.map(e => erGeneratorData(e, false, 'zh-cn')),
  layouts: []
})
const fieldData = ref({})
layoutNodes.forEach((node, index) => {
  store.layouts.push(node)
  switch (node.type) {
    case 'grid':
    case 'tabs':
    case 'collapse':
      node.columns[0].label = `${node.label} > ${node.columns[0].type}`
      store.layouts.push(node.columns[0])
      break
    case 'table':
      node.rows[0].columns[0].label = `${node.label} > ${node.rows[0].columns[0].type}`
      store.layouts.push(node.rows[0].columns[0])
      break
  }
})
const all = [...store.fields, ...store.layouts]
const value0 = ref(store.fields[9].id)
const sector = computed(() => {
  let result = ''
  if (value0.value === 'root') {
    result = 'root'
  } else {
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
          <el-radio-button v-for="item in store.fields" :key="item.id" :label="item.id">{{item.label}}</el-radio-button>
        </el-radio-group>
      </div>
      <div>
        <h1>布局</h1>
        <el-radio-group v-model="value0" size="large">
          <el-radio-button v-for="item in store.layouts" :key="item.id" :label="item.id">{{item.label || item.type}}</el-radio-button>
        </el-radio-group>
      </div>
    </el-header>
    <el-container>
      <el-aside width="300px">
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
  ::v-deep .Everright-formEditor-Config > form {
    //height: 600px;
  }
}
</style>
