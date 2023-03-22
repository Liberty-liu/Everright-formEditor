<script>
import { defineProps, ref, reactive, computed, provide, getCurrentInstance, watch, nextTick, onMounted, isReactive, readonly, toRefs, unref } from 'vue'
import { ClickOutside as vClickOutside } from 'element-plus'
import hooks from '@ER/hooks'
import _ from 'lodash-es'
// import regionData from './data/regionData'
import { areaList } from '@vant/area-data'
import Region from './Region'
import Store from './store'
export default {
  name: 'EverrightRegion'
}
</script>
<script setup>
const props = defineProps({
  multiple: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: Array
  },
  placeholder: {
    type: String
  }
})
const emit = defineEmits(['update:modelValue', 'change'])
let inputInitialHeight = 0
const pressDeleteCount = 0
const region = new Region(areaList, {
  isFilter: true,
  selectType: 3
})
const tooltipRef = ref()
const tagWrapper = ref()
const input = ref()
const searchInputValue = ref('')
const allPresentTags = ref([])
const suggestions = ref([])
const filtering = ref(false)
const presentTags = ref([])
const inputHover = ref(false)
const popperPaneRef = computed(() => {
  return _.get(unref(tooltipRef), 'popperRef.contentRef', '')
})
const store = new Store(region.getAll(), {
  value: 'value',
  label: 'label',
  children: 'children',
  disabled: 'disabled',
  multiple: props.multiple
})
// window.store = store
const state = reactive({
  Namespace: 'region',
  menus: [{
    label: '全部',
    name: 'all',
    nodes: store.getNodes()
  }],
  popperVisible: false,
  activeName: 'all',
  value0: '',
  checkedValue: []
})
const ns = hooks.useNamespace('Main', state.Namespace)
provide('Everright', {
  state
})
const getFlattedNodes = (leafOnly) => {
  return store.getFlattedNodes(leafOnly)
}
const getCheckedNodes = (leafOnly) => {
  return getFlattedNodes(leafOnly).filter((node) => node.checked !== false)
}
const calculateCheckedValue = (isFire = true) => {
  const newNodes = getCheckedNodes(false)
  state.checkedValue = newNodes
  if (!multiple.value) {
    if (state.checkedValue.length) {
      state.value0 = state.checkedValue[0].calcText('/')
    } else {
      state.value0 = ''
    }
  } else {
    state.value0 = state.checkedValue.length ? ' ' : ''
  }
  isFire && emit('update:modelValue', newNodes.map(e => e.value))
}
const multiple = computed(() => !!props.multiple)
const clearBtnVisible = computed(() => {
  // return inputHover.value || !!state.checkedValue.length
  if (
    filtering.value ||
    !inputHover.value
  ) { return false }

  return !!state.checkedValue.length
})
const genTag = (node) => {
  return {
    node,
    key: node.uid,
    text: node.calcText('/'),
    hitState: false,
    closable: !node.isDisabled,
    isCollapseTag: false
  }
}
const calculatePresentTags = () => {
  if (!multiple.value) return

  const nodes = state.checkedValue
  const tags = []

  const allTags = []
  nodes.forEach((node) => allTags.push(genTag(node)))
  allPresentTags.value = allTags

  if (nodes.length) {
    const [first, ...rest] = nodes
    const restCount = rest.length

    tags.push(genTag(first))

    if (restCount) {
      tags.push({
        key: -1,
        text: `+ ${restCount}`,
        closable: false,
        isCollapseTag: true
      })
    }
  }

  presentTags.value = tags
}
const handleEvent = (type, node, index, checked) => {
  const {
    multiple
  } = props
  if (type === 'click') {
    // eslint-disable-next-line
    if (index === -1 || node.isLeaf || !node.isLeaf && node.level === index) {
    } else {
      state.menus.forEach((e, i) => {
        if (i > index + 1) {
          state.menus[i] = []
        }
      })
      state.menus[index + 1] = {
        label: node.label,
        name: node.value,
        // nodes: [node].concat(node.children)
        nodes: node.children
      }
      state.activeName = node.value
    }
  }
  if (type === 'checkbox') {
    if (checked === node.checked) return
    if (props.multiple) {
      node.doCheck(checked)
    } else {
      getCheckedNodes().forEach((e) => {
        e.doCheck(false)
      })
      node.doCheck(checked)
    }
    calculateCheckedValue()
  }
}
const togglePopperVisible = (visible) => {
  if (visible !== state.popperVisible) {
    state.popperVisible = visible
    if (!visible) {
      hideSuggestionPanel()
      if (multiple.value) {
        searchInputValue.value = ''
      } else {
        state.checkedValue[0] && (state.value0 = state.checkedValue[0].calcText('/'))
      }
    }
  }
}
const updatePopperPosition = () => {
  nextTick(() => {
    tooltipRef.value.updatePopper()
  })
}
const deleteTag = (tag) => {
  const node = tag.node
  node.doCheck(false)
  calculateCheckedValue()
}
const inCheckedPath = (node) => {
  return state.checkedValue.some(e => _.intersection(node.pathValues, e.pathValues).length === node.level)
}
const updateStyle = () => {
  const inputInner = input.value.input
  const tagWrapperEl = tagWrapper.value
  if (tagWrapperEl) {
    const { offsetHeight } = tagWrapperEl
    const height =
      presentTags.value.length > 0
        ? `${Math.max(offsetHeight + 6, inputInitialHeight)}px`
        : `${inputInitialHeight}px`
    inputInner.style.height = height
    updatePopperPosition()
  }
}
const handleClear = () => {
  getCheckedNodes().forEach((e) => {
    e.doCheck(false)
  })
  calculateCheckedValue()
  togglePopperVisible(false)
}
const searchKeyword = computed(() =>
  multiple.value ? searchInputValue.value : state.value0
)
const filterMethod = (node, keyword) => {
  return node.text.includes(keyword)
}
const calculateSuggestions = () => {
  const res = getFlattedNodes(false).filter((node) => {
    if (node.isDisabled) return false
    node.calcText('/')
    return filterMethod(node, searchKeyword.value.trim())
  })
  filtering.value = true
  suggestions.value = res
  updatePopperPosition()
}
const handleFilter = _.debounce(() => {
  const { value } = searchKeyword

  if (!value) return
  calculateSuggestions()
})
const hideSuggestionPanel = () => {
  filtering.value = false
}
const handleInput = (val, e) => {
  state.popperVisible.value && togglePopperVisible(true)

  if (e && e.isComposing) return
  val.trim() ? handleFilter() : hideSuggestionPanel()
}
watch(() => props.modelValue, (newVal) => {
  // const nodes = props.multiple ? newVal : [newVal]
  const nodes = newVal
  if (nodes.length) {
    nodes.forEach((e) => {
      store.getNodeByValue(e).doCheck(true)
    })
  } else {
    getCheckedNodes().forEach((e) => {
      e.doCheck(false)
    })
  }
  calculateCheckedValue(false)
  calculatePresentTags()
}, { immediate: true, deep: true })
watch(presentTags, () => {
  nextTick(() => updateStyle())
}, { immediate: true })
onMounted(() => {
  const inputEl = input.value.$el
  inputInitialHeight = inputEl.offsetHeight
})
</script>
<template>
  <div
    :class="[ns.b()]"
  >
    <el-tooltip
      ref="tooltipRef"
      :popper-class="[ns.e('dropdown')]"
      effect="light"
      placement="bottom-start"
      :visible="state.popperVisible"
    >
      <div
        :class="[ns.e('regin')]"
        v-click-outside:[popperPaneRef]="() => togglePopperVisible(false)"
        @mouseenter="inputHover = true"
        @mouseleave="inputHover = false"
        @click="() => togglePopperVisible(true)"
      >
        <el-input
          :readonly="multiple"
          ref="input"
          :placeholder="searchInputValue ? '' : placeholder"
          v-model="state.value0"
          @input="handleInput"
        >
          <template #suffix>
            <el-icon
              v-if="clearBtnVisible"
              key="clear"
              :class="[ns.e('icon'), 'icon-circle-close']"
              @click.stop="handleClear"
            >
              <circle-close />
            </el-icon>
            <el-icon
              v-else
              key="arrow-down"
              :class="[
                ns.e('icon'),
                'icon-arrow-down',
                state.popperVisible && ns.e('reverse')
              ]"
              @click.stop="togglePopperVisible()"
            >
              <arrow-down />
            </el-icon>
          </template>
        </el-input>
        <div v-if="multiple" ref="tagWrapper" :class="ns.e('tagsWrap')">
          <el-tag
            v-for="tag in presentTags"
            :key="tag.key"
            type="info"
            size="default"
            :closable="tag.closable"
            disable-transitions
            @close="deleteTag(tag)"
          >
            <template v-if="tag.isCollapseTag === false">
              <span>{{ tag.text }}</span>
            </template>
            <template v-else>
              <el-tooltip
                :teleported="false"
                :disabled="state.popperVisible"
                :fallback-placements="['bottom', 'top', 'right', 'left']"
                placement="bottom"
                effect="light"
              >
                <template #default>
                  <span>{{ tag.text }}</span>
                </template>
                <template #content>
                  <div :class="ns.e('collapse-tags')">
                    <div
                      v-for="(tag2, idx) in allPresentTags.slice(1)"
                      :key="idx"
                      :class="ns.e('collapse-tag')"
                    >
                      <el-tag
                        :key="tag2.key"
                        class="in-tooltip"
                        type="info"
                        size="default"
                        :closable="tag2.closable"
                        disable-transitions
                        @close="deleteTag(tag2)"
                      >
                        <span>{{ tag2.text }}</span>
                      </el-tag>
                    </div>
                  </div>
                </template>
              </el-tooltip>
            </template>
          </el-tag>
          <input
            v-model="searchInputValue"
            type="text"
            :class="ns.e('search-input')"
            @input="(e) => handleInput(searchInputValue, e)"
            @click.stop="togglePopperVisible(true)"
          />
        </div>
      </div>
      <template #content>
        <div>
          <el-tabs v-show="!filtering" v-model="state.activeName" class="demo-tabs">
            <el-tab-pane v-for="(item, index) in state.menus" :key="item.name" :label="item.label" :name="item.name">
              <el-scrollbar
                tag="ul"
                :wrap-class="ns.e('wrap')"
                :view-class="ns.e('list')"
              >
                <li
                  v-for="node in item.nodes"
                  :key="node.value"
                  :class="[inCheckedPath(node) && ns.is('Selected')]"
                  @click.stop="() => handleEvent('click', node, index)">
                  <el-checkbox
                    :disabled="node.isDisabled"
                    :model-value="node.checked"
                    @click.stop
                    @update:model-value="(val) => handleEvent('checkbox', node, index, val)"
                  />
                  <span :class="[ns.e('label')]">{{node.label}}</span>
                  <template v-if="!node.isLeaf">
                    <el-icon :class="['arrow-right', ns.e('postfix')]">
                      <arrow-right />
                    </el-icon>
                  </template>
                </li>
              </el-scrollbar>
            </el-tab-pane>
          </el-tabs>
          <el-scrollbar
            v-show="filtering"
            ref="suggestionPanel"
            tag="ul"
            :wrap-class="ns.e('wrap')"
            :view-class="ns.e('list')"
          >
            <template v-if="suggestions.length">
              <li
                v-for="node in suggestions"
                :class="[inCheckedPath(node) && ns.is('Selected')]"
                :key="node.value">
                <el-checkbox
                  :disabled="node.isDisabled"
                  @update:model-value="(val) => handleEvent('checkbox', node, -1, val)"
                  :model-value="node.checked"
                  @click.stop
                />
                <span :class="[ns.e('label')]">{{node.text}}</span>
              </li>
            </template>
            <slot v-else name="empty">
              <li class="el-cascader__empty-text">
                No matching data
              </li>
            </slot>
          </el-scrollbar>
        </div>
      </template>
    </el-tooltip>
  </div>
</template>
