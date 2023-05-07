<script>
import { ref, inject, nextTick, reactive, computed, watch, onMounted } from 'vue'
import hooks from '@ER/hooks'
import utils from '@ER/utils'
import _ from 'lodash-es'
import { EverrightFilter } from 'everright-filter'
import Icon from '@ER/icon'
export default {
  name: 'ConfigLogicComponent'
}
</script>
<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: 'pc'
  }
})
const {
  t
} = hooks.useI18n()
const tabs = ref([
  {
    label: '显隐',
    value: 'showHidden',
    rules: [],
    ifRefs: [],
    thenRefs: []
  },
  {
    label: '校验',
    value: 'validation',
    rules: [],
    ifRefs: [],
    thenRefs: []
  },
  {
    label: '必填',
    value: 'required',
    rules: [],
    ifRefs: [],
    thenRefs: []
  }
])
window.tabs = tabs
const activeTab = ref('showHidden')
const emit = defineEmits(['update:modelValue'])
const ER = inject('Everright')
const scrollbarRef = ref()
const ns = hooks.useNamespace('ConfigLogicComponent')
const dialogVisible = ref(false)
const {
  state
} = hooks.useTarget()
const getIfOptions = (type) => async () => {
  return new Promise((resolve, reject) => {
    resolve({
      data: utils.generateIfFilterOptionsData(type, state.fields)
    })
  })
}
const getIfConditions = (type) => async ({ property }) => {
  return new Promise((resolve, reject) => {
    resolve({
      data: utils.generateIfFilterConditionsData(type, state, property)
    })
  })
}
const getThenOptions = (type) => async () => {
  return new Promise((resolve, reject) => {
    resolve({
      data: utils.generateThenFilterOptionsData(type, state.fields)
    })
  })
}
const getThenConditions = (type) => async ({ property }) => {
  return new Promise((resolve, reject) => {
    resolve({
      data: utils.generateThenFilterConditionsData(type, state.fields)
    })
  })
}
const curIndex = computed(() => _.findIndex(tabs.value, { value: activeTab.value }))
const getTabData = (tab) => {
  // const tab = _.find(tabs.value, { value: type })
  return tab.ifRefs.map((rule, index) => {
    return {
      ifRules: rule.getData(),
      thenRules: tab.thenRefs[index].getData()
    }
  })
}
const checkTab = (tab) => {
  let result = false
  if (tab.rules.length) {
    result = [...tab.ifRefs, ...tab.thenRefs].every(e => !_.isEmpty(e.getData()))
  } else {
    result = true
  }
  return result
}
const getData = () => {
  let index = 0
  let isSuccess = true
  const result = {}
  while (index < tabs.value.length) {
    if (!checkTab(tabs.value[index])) {
      activeTab.value = tabs.value[index].value
      isSuccess = false
      break
    }
    index++
  }
  if (isSuccess) {
    tabs.value.forEach(tab => {
      if (tab.rules.length) {
        result[tab.value] = getTabData(tab)
      }
    })
  }
  return result
}

const closeDialog = () => {
  dialogVisible.value = false
}
const openDialog = () => {
  dialogVisible.value = true
  tabs.value.forEach((tab, index) => {
    const rules = _.get(ER.state.logic, `${tab.value}`, [])
    remoteCount += rules.length * 2
    rules.forEach((rule, index) => {
      tab.rules.push(index)
    })
  })
}
const handleAction = (type) => {
  switch (type) {
    case 0:
      closeDialog()
      break
    case 1:
      const rules = tabs.value[curIndex.value].rules
      rules.push(rules.length)
      nextTick(() => {
        scrollbarRef.value[curIndex.value].setScrollTop(scrollbarRef.value[curIndex.value].wrapRef.scrollHeight)
      })
      break
    case 2:
      if (tabs.value.every(tab => !tab.rules.length)) {
        closeDialog()
      } else {
        const data = getData()
        if (!_.isEmpty(data)) {
          ER.state.logic = getData(activeTab.value)
          closeDialog()
        }
      }
      break
  }
}
const relationalRef = (tab, key, index) => {
  return (el) => {
    if (el) {
      tab[key][index] = el
    } else {
      tab[key].splice(index, 1)
    }
  }
}
let remoteCount = 0
const handleListener = (ruleType, index, tab, { type, data }) => {
  if (type === 'init') {
    if (remoteCount > 0) {
      const filterRef = _.get(tab, `${ruleType}Refs[${index}]`, {})
      nextTick(() => {
        filterRef.setData(_.get(ER.state.logic, `${tab.value}[${index}].${ruleType}Rules`, {}))
      })
      remoteCount = remoteCount - 1
    } else {
      if (ruleType === 'then') {
        switch (activeTab.value) {
          case 'validation':
            _.last(tab.thenRefs).pushData('message')
            break
          case 'showHidden':
            _.last(tab.thenRefs).pushData('show')
            break
        }
      }
    }
  }
}
const handleClosed = () => {
  tabs.value.forEach(tab => {
    tab.rules = []
  })
}
</script>
<template>
  <el-dialog
    destroy-on-close
    width="80%"
    append-to-body
    @closed="handleClosed"
    :class="[ns.b()]"
    v-model="dialogVisible">
    <div>
      <el-tabs v-model="activeTab" class="demo-tabs">
        <el-tab-pane v-for="tab in tabs" :label="tab.label" :name="tab.value" :key="tab.value">
          <el-scrollbar ref="scrollbarRef" max-height="calc(100vh - 400px)">
            <el-empty v-if="!tab.rules.length">
              <el-button type="primary" icon="plus" @click="handleAction(1)">Add</el-button>
            </el-empty>
            <div v-else>
              <div :class="ns.e('rule')" v-for="(key, index) in tab.rules" :key="key">
                <Icon @click="tab.rules.splice(index, 1)" :class="[ns.e('delRule')]" icon="delete"/>
                <div :class="ns.e('if')">
                  <h2>If</h2>
                  <EverrightFilter
                    :ref="relationalRef(tab, 'ifRefs', index)"
                    @listener="(e) => handleListener('if', index, tab, e)"
                    :lang="ER.props.lang"
                    :getOptions="getIfOptions(tab.value)"
                    :getConditions="getIfConditions(tab.value)"
                  />
                </div>
                <div :class="ns.e('then')">
                  <h2>Then</h2>
                  <EverrightFilter
                    :ref="relationalRef(tab, 'thenRefs', index)"
                    :lang="ER.props.lang"
                    @listener="(e) => handleListener('then', index, tab, e)"
                    :getOptions="getThenOptions(tab.value)"
                    :getConditions="getThenConditions(tab.value)"
                  />
                </div>
              </div>
            </div>
          </el-scrollbar>
        </el-tab-pane>
      </el-tabs>
      <el-button v-show="tabs[curIndex].rules.length" :class="[ns.e('button')]" @click="handleAction(1)">
        添加
      </el-button>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleAction(0)">Cancel</el-button>
        <el-button type="primary" @click="handleAction(2)">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
  <el-button style="width: 100%;" type="primary" @click="openDialog">业务逻辑</el-button>
</template>
