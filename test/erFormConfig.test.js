import { describe, assert, expect, test, beforeEach, vi, beforeAll, afterEach } from 'vitest'
import { erComponentsConfig, erFormConfig, erGeneratorData, utils } from '@ER/formEditor/index.js'
import { mount } from '@vue/test-utils'
import { Plus } from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import Vant from 'vant'
import { computed, nextTick, reactive, ref } from 'vue'
import _ from 'lodash-es'
const _mount = (template, data, otherObj) => mount(
  {
    components: {
      erFormConfig
    },
    template,
    data,
    ...otherObj
  },
  {
    attachTo: 'body',
    global: {
      components: {
        Plus
      },
      plugins: [
        ElementPlus,
        Vant
      ]
    }
  }
)
describe('Configuration options owned by the config panel', () => {
  const handleListener = vi.fn()
  let wrapper = {}
  const value0 = ref('root')
  const all = ref([])
  const store = reactive({
    fields: [],
    layouts: []
  })
  beforeAll(() => {
    vi.stubEnv('TESTIDTYPE', 'nanoid')
    store.fields = [...erComponentsConfig.fieldsConfig[0].list, ...erComponentsConfig.fieldsConfig[1].list].map(e => {
      const result = erGeneratorData(e, true, 'en')
      if (/^(radio|cascader|checkbox|select)$/.test(e.type)) {
        result.columns[0].options.data = utils.generateOptions(3).map((e, i) => {
          e.label += i + 1
          return e
        })
      }
      return result
    })
    const layoutNodes = erComponentsConfig.fieldsConfig[2].list.map(e => erGeneratorData(e, true, 'en'))
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
      }
    })
    all.value = [...store.fields, ...store.layouts]
    const sector = computed(() => {
      let result = ''
      if (value0.value === 'root') {
        result = 'root'
      } else {
        result = _.find(all.value, { id: value0.value })
      }
      return result
    })
    wrapper = _mount(`
      <er-form-config
        @listener="handleListener"
        :field="sector"
        :fields="store.fields.map(e => e.columns[0])"
        lang="en"
        ref="EReditorRef"/>
      `, () => ({
      handleListener,
      store,
      sector
    })
    )
  })
  afterEach(() => {
    wrapper.findComponent({ ref: 'EReditorRef' }).vm.switchPlatform('pc')
  })
  test('Root', () => {
    console.log(wrapper.html())
    // console.log(erGeneratorData(erComponentsConfig.fieldsConfig[0].list[0], true, 'en'))
    // expect(erGeneratorData(erComponentsConfig.fieldsConfig[0].list[0], true, 'en')).toMatchSnapshot()
  })
  test('Email:pc', async () => {
    value0.value = store.fields[0].id
    await nextTick()
    expect(wrapper.find(utils.getTestId('configPanel:breadcrumb')).findAll('.el-breadcrumb__item').map(e => e.text())).toEqual(['Form Attribute', 'Email'])
    expect(wrapper.find(utils.getTestId('configPanel:id')).exists()).toBe(true)
    expect(wrapper.find(utils.getTestId('configPanel:title')).exists()).toBe(true)
    expect(wrapper.find(utils.getTestId('configPanel:titleWidth')).exists()).toBe(true)
    expect(wrapper.find(utils.getTestId('configPanel:defaultValue')).exists()).toBe(true)
    expect(wrapper.find(utils.getTestId('configPanel:placeholder')).exists()).toBe(true)
    expect(wrapper.find(utils.getTestId('configPanel:isShowTrim')).exists()).toBe(true)
    expect(wrapper.find(utils.getTestId('configPanel:required')).exists()).toBe(true)
    expect(wrapper.find(utils.getTestId('configPanel:clearable')).exists()).toBe(true)
    expect(wrapper.find(utils.getTestId('configPanel:width')).exists()).toBe(true)
  })
  test('Email:mobile', async () => {
    wrapper.findComponent({ ref: 'EReditorRef' }).vm.switchPlatform('mobile')
    value0.value = store.fields[0].id
    await nextTick()
    expect(wrapper.find(utils.getTestId('configPanel:breadcrumb')).findAll('.el-breadcrumb__item').map(e => e.text())).toEqual(['Form Attribute', 'Email'])
    expect(wrapper.find(utils.getTestId('configPanel:id')).exists()).toBe(true)
    expect(wrapper.find(utils.getTestId('configPanel:title')).exists()).toBe(true)
    expect(wrapper.find(utils.getTestId('configPanel:titleWidth')).exists()).toBe(false)
    expect(wrapper.find(utils.getTestId('configPanel:defaultValue')).exists()).toBe(true)
    expect(wrapper.find(utils.getTestId('configPanel:placeholder')).exists()).toBe(true)
    expect(wrapper.find(utils.getTestId('configPanel:isShowTrim')).exists()).toBe(true)
    expect(wrapper.find(utils.getTestId('configPanel:required')).exists()).toBe(true)
    expect(wrapper.find(utils.getTestId('configPanel:clearable')).exists()).toBe(true)
    expect(wrapper.find(utils.getTestId('configPanel:width')).exists()).toBe(false)
  })
  test('Cellphone:pc', async () => {
    value0.value = store.fields[1].id
    await nextTick()
    expect(wrapper.find(utils.getTestId('configPanel:breadcrumb')).findAll('.el-breadcrumb__item').map(e => e.text())).toEqual(['Form Attribute', 'Cellphone'])
    expect(wrapper.find(utils.getTestId('configPanel:id')).exists()).toBe(true)
    expect(wrapper.find(utils.getTestId('configPanel:title')).exists()).toBe(true)
    expect(wrapper.find(utils.getTestId('configPanel:titleWidth')).exists()).toBe(true)
    expect(wrapper.find(utils.getTestId('configPanel:defaultValue')).exists()).toBe(true)
    expect(wrapper.find(utils.getTestId('configPanel:placeholder')).exists()).toBe(true)
    expect(wrapper.find(utils.getTestId('configPanel:isShowTrim')).exists()).toBe(true)
    expect(wrapper.find(utils.getTestId('configPanel:required')).exists()).toBe(true)
    expect(wrapper.find(utils.getTestId('configPanel:clearable')).exists()).toBe(true)
    expect(wrapper.find(utils.getTestId('configPanel:width')).exists()).toBe(true)
  })
  test('Cellphone:mobile', async () => {
    wrapper.findComponent({ ref: 'EReditorRef' }).vm.switchPlatform('mobile')
    value0.value = store.fields[1].id
    await nextTick()
    expect(wrapper.find(utils.getTestId('configPanel:breadcrumb')).findAll('.el-breadcrumb__item').map(e => e.text())).toEqual(['Form Attribute', 'Cellphone'])
    expect(wrapper.find(utils.getTestId('configPanel:id')).exists()).toBe(true)
    expect(wrapper.find(utils.getTestId('configPanel:title')).exists()).toBe(true)
    expect(wrapper.find(utils.getTestId('configPanel:titleWidth')).exists()).toBe(false)
    expect(wrapper.find(utils.getTestId('configPanel:defaultValue')).exists()).toBe(true)
    expect(wrapper.find(utils.getTestId('configPanel:placeholder')).exists()).toBe(true)
    expect(wrapper.find(utils.getTestId('configPanel:isShowTrim')).exists()).toBe(true)
    expect(wrapper.find(utils.getTestId('configPanel:required')).exists()).toBe(true)
    expect(wrapper.find(utils.getTestId('configPanel:clearable')).exists()).toBe(true)
    expect(wrapper.find(utils.getTestId('configPanel:width')).exists()).toBe(false)
  })
  test('URL:pc', async () => {
    value0.value = store.fields[2].id
    await nextTick()
    expect(wrapper.find(utils.getTestId('configPanel:breadcrumb')).findAll('.el-breadcrumb__item').map(e => e.text())).toEqual(['Form Attribute', 'URL'])
    expect(wrapper.find(utils.getTestId('configPanel:id')).exists()).toBe(true)
    expect(wrapper.find(utils.getTestId('configPanel:title')).exists()).toBe(true)
    expect(wrapper.find(utils.getTestId('configPanel:titleWidth')).exists()).toBe(true)
    expect(wrapper.find(utils.getTestId('configPanel:defaultValue')).exists()).toBe(true)
    expect(wrapper.find(utils.getTestId('configPanel:placeholder')).exists()).toBe(true)
    expect(wrapper.find(utils.getTestId('configPanel:isShowTrim')).exists()).toBe(true)
    expect(wrapper.find(utils.getTestId('configPanel:required')).exists()).toBe(true)
    expect(wrapper.find(utils.getTestId('configPanel:clearable')).exists()).toBe(true)
    expect(wrapper.find(utils.getTestId('configPanel:width')).exists()).toBe(true)
  })
  test('URL:mobile', async () => {
    wrapper.findComponent({ ref: 'EReditorRef' }).vm.switchPlatform('mobile')
    value0.value = store.fields[2].id
    await nextTick()
    expect(wrapper.find(utils.getTestId('configPanel:breadcrumb')).findAll('.el-breadcrumb__item').map(e => e.text())).toEqual(['Form Attribute', 'URL'])
    expect(wrapper.find(utils.getTestId('configPanel:id')).exists()).toBe(true)
    expect(wrapper.find(utils.getTestId('configPanel:title')).exists()).toBe(true)
    expect(wrapper.find(utils.getTestId('configPanel:titleWidth')).exists()).toBe(false)
    expect(wrapper.find(utils.getTestId('configPanel:defaultValue')).exists()).toBe(true)
    expect(wrapper.find(utils.getTestId('configPanel:placeholder')).exists()).toBe(true)
    expect(wrapper.find(utils.getTestId('configPanel:isShowTrim')).exists()).toBe(true)
    expect(wrapper.find(utils.getTestId('configPanel:required')).exists()).toBe(true)
    expect(wrapper.find(utils.getTestId('configPanel:clearable')).exists()).toBe(true)
    expect(wrapper.find(utils.getTestId('configPanel:width')).exists()).toBe(false)
  })
  test('Region:pc', async () => {
    value0.value = store.fields[3].id
    await nextTick()
    expect(wrapper.find(utils.getTestId('configPanel:breadcrumb')).findAll('.el-breadcrumb__item').map(e => e.text())).toEqual(['Form Attribute', 'Region'])
    expect(wrapper.find(utils.getTestId('configPanel:id')).exists()).toBe(true)
    expect(wrapper.find(utils.getTestId('configPanel:title')).exists()).toBe(true)
    expect(wrapper.find(utils.getTestId('configPanel:titleWidth')).exists()).toBe(true)
    expect(wrapper.find(utils.getTestId('configPanel-defaultValue', 'id')).exists()).toBe(true)
    expect(wrapper.find(utils.getTestId('configPanel:placeholder')).exists()).toBe(true)
    expect(wrapper.find(utils.getTestId('configPanel:regionType')).exists()).toBe(true)
    expect(wrapper.find(utils.getTestId('configPanel:required')).exists()).toBe(true)
    expect(wrapper.find(utils.getTestId('configPanel:clearable')).exists()).toBe(true)
    expect(wrapper.find(utils.getTestId('configPanel:width')).exists()).toBe(true)
    expect(wrapper.find(utils.getTestId('configPanel:filterable')).exists()).toBe(true)
  })
  test('Region:mobile', async () => {
    wrapper.findComponent({ ref: 'EReditorRef' }).vm.switchPlatform('mobile')
    value0.value = store.fields[3].id
    await nextTick()
    expect(wrapper.find(utils.getTestId('configPanel:breadcrumb')).findAll('.el-breadcrumb__item').map(e => e.text())).toEqual(['Form Attribute', 'Region'])
    expect(wrapper.find(utils.getTestId('configPanel:id')).exists()).toBe(true)
    expect(wrapper.find(utils.getTestId('configPanel:title')).exists()).toBe(true)
    expect(wrapper.find(utils.getTestId('configPanel:titleWidth')).exists()).toBe(false)
    expect(wrapper.find(utils.getTestId('configPanel-defaultValue', 'id')).exists()).toBe(true)
    expect(wrapper.find(utils.getTestId('configPanel:placeholder')).exists()).toBe(true)
    expect(wrapper.find(utils.getTestId('configPanel:regionType')).exists()).toBe(true)
    expect(wrapper.find(utils.getTestId('configPanel:required')).exists()).toBe(true)
    expect(wrapper.find(utils.getTestId('configPanel:clearable')).exists()).toBe(true)
    expect(wrapper.find(utils.getTestId('configPanel:width')).exists()).toBe(false)
    expect(wrapper.find(utils.getTestId('configPanel:filterable')).exists()).toBe(true)
  })
})
