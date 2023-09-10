import { describe, assert, expect, test, beforeEach, beforeAll, vi } from 'vitest'
import { mount, flushPromises, enableAutoUnmount, config, DOMWrapper } from '@vue/test-utils'
import erGeneratorData from '@ER/formEditor/generatorData.js'
import * as erComponentsConfig from '@ER/formEditor/componentsConfig.js'
import _ from 'lodash-es'
import { nextTick, reactive } from 'vue'
import { _mount, wrapLayoutDataByLayoutType } from '@ER-test/utils.js'
import { utils } from '@ER/formEditor/index.js'
describe('Field: subform', () => {
  let previewWrapper = {}
  let configWrapper = {}
  const handleListener = vi.fn()
  let field = {}
  const layoutType = 1
  const store = reactive({
    fields: [],
    sector: 'root'
  })
  beforeAll(() => {
    vi.stubEnv('TESTIDTYPE', 'nanoid')
    previewWrapper = _mount(`
      <er-form-preview
        @listener="handleListener"
        :layoutType="layoutType"
        ref="EReditorRef"/>
      `, () => ({
      handleListener,
      layoutType
    })
    )
    configWrapper = _mount(`
      <er-form-config
        @listener="handleListener"
        :layoutType="layoutType"
        :field="store.sector"
        :fields="store.fields"
        ref="EReditorRef"/>
      `, () => ({
      handleListener,
      layoutType,
      store
    })
    )
    return () => {
      vi.stubEnv('TESTIDTYPE', '')
    }
  })
  beforeEach(() => {
    field = erGeneratorData(erComponentsConfig.fieldsConfig[1].list[0], true, 'en')
  })
  test('No child', async () => {
    const subForm = erGeneratorData(_.cloneDeep(erComponentsConfig.fieldsConfig[2].list[5]), true, 'en')
    const list = _.cloneDeep(subForm)
    list.columns[0] = subForm.columns[0].id
    const data = wrapLayoutDataByLayoutType([list], [subForm.columns[0]], layoutType)
    await previewWrapper.findComponent({ ref: 'EReditorRef' }).vm.setData(data)
    expect(previewWrapper.find(utils.getTestId('SubformLayout:addButton')).exists()).toBe(false)
    expect(previewWrapper.findAll(utils.getTestId('SubformLayout:item'))).toHaveLength(0)
    previewWrapper.find('[data-test="er-complete-button"] button').trigger('click')
    await flushPromises()
    expect([list.columns[0]]).toStrictEqual(previewWrapper.findAll('[data-field-id]').map(element => element.element.dataset.fieldId))
    expect(previewWrapper.find(`[data-field-id="${list.columns[0]}"] .el-form-item`).classes()).not.toContain('is-required')
    store.fields.push(subForm.columns[0])
    store.sector = subForm.columns[0]
    await flushPromises()
    expect(configWrapper.find(utils.getTestId('configPanel:defaultValue:button')).exists()).toBe(false)
  })
  test('No child: Required', async () => {
    const subForm = erGeneratorData(_.cloneDeep(erComponentsConfig.fieldsConfig[2].list[5]), true, 'en')
    subForm.columns[0].options.required = true
    const list = _.cloneDeep(subForm)
    list.columns[0] = subForm.columns[0].id
    const data = wrapLayoutDataByLayoutType([list], [subForm.columns[0]], layoutType)
    await previewWrapper.findComponent({ ref: 'EReditorRef' }).vm.setData(data)
    expect(previewWrapper.find(utils.getTestId('SubformLayout:addButton')).exists()).toBe(false)
    expect(previewWrapper.findAll(utils.getTestId('SubformLayout:item'))).toHaveLength(0)
    previewWrapper.find('[data-test="er-complete-button"] button').trigger('click')
    await flushPromises()
    expect([list.columns[0]]).toStrictEqual(previewWrapper.findAll('[data-field-id]').map(element => element.element.dataset.fieldId))
    expect(previewWrapper.find(`[data-field-id="${list.columns[0]}"] .el-form-item`).classes()).toContain('is-required')
  })
  test('Only one child', async () => {
    const newField = _.cloneDeep(field)
    newField.columns[0] = newField.columns[0].id
    const subForm = erGeneratorData(_.cloneDeep(erComponentsConfig.fieldsConfig[2].list[5]), true, 'en')
    const list = _.cloneDeep(subForm)
    list.columns[0] = subForm.columns[0].id
    subForm.columns[0].list[0].push(newField)
    const data = wrapLayoutDataByLayoutType([list], [subForm.columns[0], field.columns[0]])
    await previewWrapper.findComponent({ ref: 'EReditorRef' }).vm.setData(data)
    expect(previewWrapper.find(utils.getTestId('SubformLayout:addButton')).exists()).toBe(true)
    expect(previewWrapper.findAll(utils.getTestId('SubformLayout:item'))).toHaveLength(0)
    await previewWrapper.find(utils.getTestId('SubformLayout:addButton')).find('button').trigger('click')
    expect(previewWrapper.findAll(utils.getTestId('SubformLayout:item'))).toHaveLength(1)
    const subForm1 = erGeneratorData(_.cloneDeep(erComponentsConfig.fieldsConfig[2].list[5]), true, 'en')
    subForm1.columns[0].list[0].push(_.cloneDeep(field))
    store.fields.push(subForm1.columns[0])
    store.sector = subForm1.columns[0]
    await flushPromises()
    expect(configWrapper.find(utils.getTestId('configPanel:defaultValue:button')).exists()).toBe(true)
    await configWrapper.find(utils.getTestId('configPanel:defaultValue:button')).trigger('click')
    await flushPromises()
    const setDefaultEl = new DOMWrapper(document.querySelector('.Everright-formEditor-ConfigSubformDefaultValueComponent'))
    expect(setDefaultEl.findAll(utils.getTestId('SubformLayout:item'))).toHaveLength(0)
  })
  test('Only one child: field Required', async () => {
    const newField = _.cloneDeep(field)
    field.columns[0].options.required = true
    newField.columns[0] = newField.columns[0].id
    const subForm = erGeneratorData(_.cloneDeep(erComponentsConfig.fieldsConfig[2].list[5]), true, 'en')
    const list = _.cloneDeep(subForm)
    list.columns[0] = subForm.columns[0].id
    subForm.columns[0].list[0].push(newField)
    const data = wrapLayoutDataByLayoutType([list], [subForm.columns[0], field.columns[0]])
    await previewWrapper.findComponent({ ref: 'EReditorRef' }).vm.setData(data)
    expect(previewWrapper.find(utils.getTestId('SubformLayout:addButton')).exists()).toBe(true)
    expect(previewWrapper.findAll(utils.getTestId('SubformLayout:item'))).toHaveLength(0)
    await previewWrapper.find(utils.getTestId('SubformLayout:addButton')).find('button').trigger('click')
    expect(previewWrapper.findAll(utils.getTestId('SubformLayout:item'))).toHaveLength(1)
    previewWrapper.find('[data-test="er-complete-button"] button').trigger('click')
    await flushPromises()
    expect([list.columns[0], newField.columns[0]]).toStrictEqual(previewWrapper.findAll('[data-field-id]').map(element => element.element.dataset.fieldId))
    expect(previewWrapper.find(`[data-field-id="${list.columns[0]}"] .el-form-item`).classes()).not.toContain('is-required')
    expect(previewWrapper.find(`[data-field-id="${newField.columns[0]}"] .el-form-item`).classes()).toContain('is-required')
  })
  test('Only one child: has 2 default contents', async () => {
    const values = ['1', '2']
    const newField = _.cloneDeep(field)
    newField.columns[0] = newField.columns[0].id
    const subForm = erGeneratorData(_.cloneDeep(erComponentsConfig.fieldsConfig[2].list[5]), true, 'en')
    const list = _.cloneDeep(subForm)
    list.columns[0] = subForm.columns[0].id
    subForm.columns[0].list[0].push(newField)
    subForm.columns[0].options.defaultValue = values.map(e => {
      const result = {}
      result[field.columns[0].key] = e
      return result
    })
    const data = wrapLayoutDataByLayoutType([list], [subForm.columns[0], field.columns[0]])
    await previewWrapper.findComponent({ ref: 'EReditorRef' }).vm.setData(data)
    expect(previewWrapper.find(utils.getTestId('SubformLayout:addButton')).exists()).toBe(true)
    expect(previewWrapper.findAll(utils.getTestId('SubformLayout:item'))).toHaveLength(2)
    await new Promise(resolve => setTimeout(resolve, 1000))
    expect(previewWrapper.findAll(utils.getTestId('SubformLayout:item')).map(e => e.find('input').element.value)).toEqual(values)
    await previewWrapper.find(utils.getTestId('SubformLayout:addButton')).find('button').trigger('click')
    await flushPromises()
    expect(previewWrapper.findAll(utils.getTestId('SubformLayout:item'))[2].find('input').element.value).toEqual('')
    const subForm1 = erGeneratorData(_.cloneDeep(erComponentsConfig.fieldsConfig[2].list[5]), true, 'en')
    subForm1.columns[0].list[0].push(_.cloneDeep(field))
    subForm1.columns[0].options.defaultValue = values.map(e => {
      const result = {}
      result[field.columns[0].key] = e
      return result
    })
    store.fields.push(subForm1.columns[0])
    store.sector = subForm1.columns[0]
    await flushPromises()
    expect(configWrapper.find(utils.getTestId('configPanel:defaultValue:button')).exists()).toBe(true)
    await configWrapper.find(utils.getTestId('configPanel:defaultValue:button')).trigger('click')
    await new Promise(resolve => setTimeout(resolve, 1000))
    const setDefaultEl = new DOMWrapper(document.querySelector('.Everright-formEditor-ConfigSubformDefaultValueComponent'))
    expect(setDefaultEl.findAll(utils.getTestId('SubformLayout:item'))).toHaveLength(2)
    expect(setDefaultEl.findAll(utils.getTestId('SubformLayout:item')).map(e => e.find('input').element.value)).toEqual(values)
    await setDefaultEl.find(utils.getTestId('configPanel:defaultValue:addButton')).trigger('click')
    await flushPromises()
    expect(setDefaultEl.findAll(utils.getTestId('SubformLayout:item'))[2].find('input').element.value).toEqual('')
  })
  test('Only one child: has 2 default contents && field has default', async () => {
    const values = ['1', '2']
    const addValue = 'everright-formeditor'
    const newField = _.cloneDeep(field)
    newField.columns[0] = newField.columns[0].id
    const subForm = erGeneratorData(_.cloneDeep(erComponentsConfig.fieldsConfig[2].list[5]), true, 'en')
    const list = _.cloneDeep(subForm)
    list.columns[0] = subForm.columns[0].id
    subForm.columns[0].list[0].push(newField)
    subForm.columns[0].options.defaultValue = values.map(e => {
      const result = {}
      result[field.columns[0].key] = e
      return result
    })
    field.columns[0].options.defaultValue = addValue
    const data = wrapLayoutDataByLayoutType([list], [subForm.columns[0], field.columns[0]])
    await previewWrapper.findComponent({ ref: 'EReditorRef' }).vm.setData(data)
    expect(previewWrapper.find(utils.getTestId('SubformLayout:addButton')).exists()).toBe(true)
    expect(previewWrapper.findAll(utils.getTestId('SubformLayout:item'))).toHaveLength(2)
    await new Promise(resolve => setTimeout(resolve, 1000))
    expect(previewWrapper.findAll(utils.getTestId('SubformLayout:item')).map(e => e.find('input').element.value)).toEqual(values)
    await previewWrapper.find(utils.getTestId('SubformLayout:addButton')).find('button').trigger('click')
    await flushPromises()
    expect(previewWrapper.findAll(utils.getTestId('SubformLayout:item'))[2].find('input').element.value).toEqual(addValue)
    const subForm1 = erGeneratorData(_.cloneDeep(erComponentsConfig.fieldsConfig[2].list[5]), true, 'en')
    subForm1.columns[0].list[0].push(_.cloneDeep(field))
    subForm1.columns[0].options.defaultValue = values.map(e => {
      const result = {}
      result[field.columns[0].key] = e
      return result
    })
    store.fields.push(subForm1.columns[0])
    store.sector = subForm1.columns[0]
    await flushPromises()
    expect(configWrapper.find(utils.getTestId('configPanel:defaultValue:button')).exists()).toBe(true)
    await configWrapper.find(utils.getTestId('configPanel:defaultValue:button')).trigger('click')
    await new Promise(resolve => setTimeout(resolve, 1000))
    const setDefaultEl = new DOMWrapper(document.querySelector('.Everright-formEditor-ConfigSubformDefaultValueComponent'))
    expect(setDefaultEl.findAll(utils.getTestId('SubformLayout:item'))).toHaveLength(2)
    expect(setDefaultEl.findAll(utils.getTestId('SubformLayout:item')).map(e => e.find('input').element.value)).toEqual(values)
    await setDefaultEl.find(utils.getTestId('configPanel:defaultValue:addButton')).trigger('click')
    await flushPromises()
    expect(setDefaultEl.findAll(utils.getTestId('SubformLayout:item'))[2].find('input').element.value).toEqual(addValue)
  })
  // test.only('Only one child: has 2 default contents && field has default', async () => {})
})
