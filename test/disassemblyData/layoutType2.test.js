import { describe, assert, expect, test, beforeEach, beforeAll, vi } from 'vitest'
import erGeneratorData from '@ER/formEditor/generatorData.js'
import * as erComponentsConfig from '@ER/formEditor/componentsConfig.js'
import _ from 'lodash-es'
import { nextTick } from 'vue'
import { _mount, wrapLayoutDataByLayoutType } from '@ER-test/utils.js'
describe('Fields and layout separated', () => {
  let wrapper = {}
  const handleListener = vi.fn()
  let field = {}
  beforeAll(() => {
    vi.stubEnv('TESTIDTYPE', 'nanoid')
    field = erGeneratorData(erComponentsConfig.fieldsConfig[0].list[0], true, 'en')
    wrapper = _mount(`
      <er-form-editor
        @listener="handleListener"
        :layoutType="2"
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
    const data = wrapLayoutDataByLayoutType({
      pc: [
        newField
      ],
      mobile: [
        newField
      ]
    }, [field.columns[0]], 2)
    wrapper.findComponent({ ref: 'EReditorRef' }).vm.setData(data)
    await nextTick()
    expect(wrapper.findComponent({ ref: 'EReditorRef' }).vm.getData()).toEqual(data)
  })
  test('Grid', async () => {
    const newField = _.cloneDeep(field)
    newField.columns[0] = newField.columns[0].id
    const layout = erGeneratorData(_.cloneDeep(erComponentsConfig.fieldsConfig[2].list[0]), true, 'en')
    layout.columns[0].columns[0].list.push(newField)
    const data = wrapLayoutDataByLayoutType({
      pc: [
        layout
      ],
      mobile: [
        layout
      ]
    }, [field.columns[0]], 2)
    wrapper.findComponent({ ref: 'EReditorRef' }).vm.setData(data)
    await nextTick()
    expect(wrapper.findComponent({ ref: 'EReditorRef' }).vm.getData()).toEqual(data)
  })
  test('Table', async () => {
    const newField = _.cloneDeep(field)
    newField.columns[0] = newField.columns[0].id
    const layout = erGeneratorData(_.cloneDeep(erComponentsConfig.fieldsConfig[2].list[1]), true, 'en')
    layout.columns[0].rows[0].columns[0].list.push(newField)
    const data = wrapLayoutDataByLayoutType({
      pc: [
        layout
      ],
      mobile: [
        layout
      ]
    }, [field.columns[0]], 2)
    wrapper.findComponent({ ref: 'EReditorRef' }).vm.setData(data)
    await nextTick()
    expect(wrapper.findComponent({ ref: 'EReditorRef' }).vm.getData()).toEqual(data)
  })
  test('Tabs', async () => {
    const newField = _.cloneDeep(field)
    newField.columns[0] = newField.columns[0].id
    const layout = erGeneratorData(_.cloneDeep(erComponentsConfig.fieldsConfig[2].list[2]), true, 'en')
    layout.columns[0].columns[0].list.push(newField)
    const data = wrapLayoutDataByLayoutType({
      pc: [
        layout
      ],
      mobile: [
        layout
      ]
    }, [field.columns[0]], 2)
    wrapper.findComponent({ ref: 'EReditorRef' }).vm.setData(data)
    await nextTick()
    expect(wrapper.findComponent({ ref: 'EReditorRef' }).vm.getData()).toEqual(data)
  })
  test('nested layout:Grid > Grid > field', async () => {
    const newField = _.cloneDeep(field)
    newField.columns[0] = newField.columns[0].id
    const grid0 = erGeneratorData(_.cloneDeep(erComponentsConfig.fieldsConfig[2].list[0]), true, 'en')
    const grid1 = erGeneratorData(_.cloneDeep(erComponentsConfig.fieldsConfig[2].list[0]), true, 'en')
    grid0.columns[0].columns[0].list.push(grid1)
    grid1.columns[0].columns[0].list.push(newField)
    const data = wrapLayoutDataByLayoutType({
      pc: [
        grid0
      ],
      mobile: [
        grid0
      ]
    }, [field.columns[0]], 2)
    wrapper.findComponent({ ref: 'EReditorRef' }).vm.setData(data)
    await nextTick()
    expect(wrapper.findComponent({ ref: 'EReditorRef' }).vm.getData()).toEqual(data)
  })
})
