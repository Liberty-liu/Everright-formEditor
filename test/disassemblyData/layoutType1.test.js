import { describe, assert, expect, test, beforeEach, beforeAll, vi } from 'vitest'
import erGeneratorData from '@ER/formEditor/generatorData.js'
import * as erComponentsConfig from '@ER/formEditor/componentsConfig.js'
import _ from 'lodash-es'
import { nextTick } from 'vue'
import { _mount, wrapLayoutDataByLayoutType } from '@ER-test/utils.js'
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
        :layoutType="1"
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
    const data = wrapLayoutDataByLayoutType([newField], [field.columns[0]])
    wrapper.findComponent({ ref: 'EReditorRef' }).vm.setData(data)
    await nextTick()
    expect(wrapper.findComponent({ ref: 'EReditorRef' }).vm.getData()).toEqual(data)
  })
  test('Grid', async () => {
    const data = wrapLayoutDataByLayoutType([erGeneratorData(_.cloneDeep(erComponentsConfig.fieldsConfig[2].list[0]), true, 'en')], [field.columns[0]])
    data.list[0].columns[0].columns[0].list.push(field.columns[0].id)
    wrapper.findComponent({ ref: 'EReditorRef' }).vm.setData(data)
    await nextTick()
    expect(wrapper.findComponent({ ref: 'EReditorRef' }).vm.getData()).toEqual(data)
  })
  test('Table', async () => {
    const data = wrapLayoutDataByLayoutType([erGeneratorData(_.cloneDeep(erComponentsConfig.fieldsConfig[2].list[1]), true, 'en')], [field.columns[0]])
    data.list[0].columns[0].rows[0].columns[0].list.push(field.columns[0].id)
    wrapper.findComponent({ ref: 'EReditorRef' }).vm.setData(data)
    await nextTick()
    expect(wrapper.findComponent({ ref: 'EReditorRef' }).vm.getData()).toEqual(data)
  })
  test('Tabs', async () => {
    const data = wrapLayoutDataByLayoutType([erGeneratorData(_.cloneDeep(erComponentsConfig.fieldsConfig[2].list[2]), true, 'en')], [field.columns[0]])
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
    const data = wrapLayoutDataByLayoutType([grid0], [field.columns[0]])
    wrapper.findComponent({ ref: 'EReditorRef' }).vm.setData(data)
    await nextTick()
    expect(wrapper.findComponent({ ref: 'EReditorRef' }).vm.getData()).toEqual(data)
  })
  test('Sub-form', async () => {
    const newField = _.cloneDeep(field)
    newField.columns[0] = newField.columns[0].id
    const sufForm = erGeneratorData(_.cloneDeep(erComponentsConfig.fieldsConfig[2].list[5]), true, 'en')
    const list = _.cloneDeep(sufForm)
    list.columns[0] = sufForm.columns[0].id
    sufForm.columns[0].list.push(newField)
    const data = wrapLayoutDataByLayoutType([list], [sufForm.columns[0], field.columns[0]])
    // console.log(JSON.stringify(data, '', 2))
    wrapper.findComponent({ ref: 'EReditorRef' }).vm.setData(data)
    expect(wrapper.findComponent({ ref: 'EReditorRef' }).vm.getData()).toEqual(data)
  })
})
