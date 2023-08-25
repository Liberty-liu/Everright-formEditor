import { describe, assert, expect, test, beforeEach, beforeAll, vi } from 'vitest'
import utils from '@ER/utils'
import erGeneratorData from '@ER/formEditor/generatorData.js'
import * as erComponentsConfig from '@ER/formEditor/componentsConfig.js'
import _ from 'lodash-es'
import { mount } from '@vue/test-utils'
import { erFormEditor } from '@ER/formEditor/index.js'
import { Plus } from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import Vant from 'vant'
import { nextTick } from 'vue'
const wrapData = (list, field) => ({
  config: {
    isSync: true,
    pc: {
      size: 'default',
      labelPosition: 'left',
      completeButton: {
        text: '提交',
        color: '',
        backgroundColor: ''
      }
    },
    mobile: {
      labelPosition: 'left',
      completeButton: {
        text: '提交',
        color: '',
        backgroundColor: ''
      }
    }
  },
  logic: {},
  data: {},
  list,
  fields: [
    field.columns[0]
  ]
})
const _mount = (template, data, otherObj) => mount(
  {
    components: {
      erFormEditor
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
describe('Fields and layout not separated', () => {
  let wrapper = {}
  const handleListener = vi.fn()
  let field = {}
  beforeAll(() => {
    vi.stubEnv('TESTIDTYPE', 'nanoid')
    field = erGeneratorData(erComponentsConfig.fieldsConfig[0].list[0], true, 'en')
    wrapper = _mount(`
      <er-form-editor
        @listener="handleListener"
        ref="EReditorRef"/>
      `, () => ({
      handleListener
    })
    )
    return () => {
      vi.stubEnv('TESTIDTYPE', '')
    }
  })
  test('Only fields without layout', async () => {
    const newField = _.cloneDeep(field)
    newField.columns[0] = newField.columns[0].id
    const data = wrapData([newField], field)
    wrapper.findComponent({ ref: 'EReditorRef' }).vm.setData(data)
    await nextTick()
    expect(wrapper.findComponent({ ref: 'EReditorRef' }).vm.getData()).toEqual(data)
  })
  test('Grid', async () => {
    const data = wrapData([erGeneratorData(_.cloneDeep(erComponentsConfig.fieldsConfig[2].list[0]), true, 'en')], field)
    data.list[0].columns[0].columns[0].list.push(field.columns[0].id)
    wrapper.findComponent({ ref: 'EReditorRef' }).vm.setData(data)
    await nextTick()
    expect(wrapper.findComponent({ ref: 'EReditorRef' }).vm.getData()).toEqual(data)
  })
  test('Table', async () => {
    const data = wrapData([erGeneratorData(_.cloneDeep(erComponentsConfig.fieldsConfig[2].list[1]), true, 'en')], field)
    data.list[0].columns[0].rows[0].columns[0].list.push(field.columns[0].id)
    wrapper.findComponent({ ref: 'EReditorRef' }).vm.setData(data)
    await nextTick()
    expect(wrapper.findComponent({ ref: 'EReditorRef' }).vm.getData()).toEqual(data)
  })
  test('Tabs', async () => {
    const data = wrapData([erGeneratorData(_.cloneDeep(erComponentsConfig.fieldsConfig[2].list[2]), true, 'en')], field)
    data.list[0].columns[0].columns[0].list.push(field.columns[0].id)
    wrapper.findComponent({ ref: 'EReditorRef' }).vm.setData(data)
    await nextTick()
    expect(wrapper.findComponent({ ref: 'EReditorRef' }).vm.getData()).toEqual(data)
  })
  test('nested layout:Grid > Grid > field', async () => {
    const grid0 = erGeneratorData(_.cloneDeep(erComponentsConfig.fieldsConfig[2].list[0]), true, 'en')
    const grid1 = erGeneratorData(_.cloneDeep(erComponentsConfig.fieldsConfig[2].list[0]), true, 'en')
    grid0.columns[0].columns[0].list.push(grid1)
    grid1.columns[0].columns[0].list.push(field.columns[0].id)
    const data = wrapData([grid0], field)
    wrapper.findComponent({ ref: 'EReditorRef' }).vm.setData(data)
    await nextTick()
    expect(wrapper.findComponent({ ref: 'EReditorRef' }).vm.getData()).toEqual(data)
  })
})
