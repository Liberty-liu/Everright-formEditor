import { describe, assert, expect, test, beforeEach, beforeAll, vi } from 'vitest'
import { mount, flushPromises, enableAutoUnmount, config } from '@vue/test-utils'
import erGeneratorData from '@ER/formEditor/generatorData.js'
import * as erComponentsConfig from '@ER/formEditor/componentsConfig.js'
import _ from 'lodash-es'
import { nextTick } from 'vue'
import { _mount, wrapLayoutDataByLayoutType } from '@ER-test/utils.js'
import { utils } from '@ER/formEditor/index.js'
describe('Field: subform', () => {
  let wrapper = {}
  const handleListener = vi.fn()
  let field = {}
  const layoutType = 1
  beforeAll(() => {
    vi.stubEnv('TESTIDTYPE', 'nanoid')
    field = erGeneratorData(erComponentsConfig.fieldsConfig[1].list[0], true, 'en')
    wrapper = _mount(`
      <er-form-preview
        @listener="handleListener"
        :layoutType="layoutType"
        ref="EReditorRef"/>
      `, () => ({
      handleListener,
      layoutType
    })
    )
    return () => {
      vi.stubEnv('TESTIDTYPE', '')
    }
  })
  test('No child', async () => {
    const subForm = erGeneratorData(_.cloneDeep(erComponentsConfig.fieldsConfig[2].list[5]), true, 'en')
    const list = _.cloneDeep(subForm)
    list.columns[0] = subForm.columns[0].id
    const data = wrapLayoutDataByLayoutType([list], [subForm.columns[0]], layoutType)
    await wrapper.findComponent({ ref: 'EReditorRef' }).vm.setData(data)
    expect(wrapper.find(utils.getTestId('SubformLayout:addButton')).exists()).toBe(false)
    expect(wrapper.findAll(utils.getTestId('SubformLayout:item'))).toHaveLength(0)
  })
  test('Only one child', async () => {
    const newField = _.cloneDeep(field)
    newField.columns[0] = newField.columns[0].id
    const subForm = erGeneratorData(_.cloneDeep(erComponentsConfig.fieldsConfig[2].list[5]), true, 'en')
    const list = _.cloneDeep(subForm)
    list.columns[0] = subForm.columns[0].id
    subForm.columns[0].list[0].push(newField)
    const data = wrapLayoutDataByLayoutType([list], [subForm.columns[0], field.columns[0]])
    await wrapper.findComponent({ ref: 'EReditorRef' }).vm.setData(data)
    expect(wrapper.find(utils.getTestId('SubformLayout:addButton')).exists()).toBe(true)
    expect(wrapper.findAll(utils.getTestId('SubformLayout:item'))).toHaveLength(0)
    await wrapper.find(utils.getTestId('SubformLayout:addButton')).find('button').trigger('click')
    expect(wrapper.findAll(utils.getTestId('SubformLayout:item'))).toHaveLength(1)
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
    await wrapper.findComponent({ ref: 'EReditorRef' }).vm.setData(data)
    expect(wrapper.find(utils.getTestId('SubformLayout:addButton')).exists()).toBe(true)
    expect(wrapper.findAll(utils.getTestId('SubformLayout:item'))).toHaveLength(2)
    await new Promise(resolve => setTimeout(resolve, 1000))
    expect(wrapper.findAll(utils.getTestId('SubformLayout:item')).map(e => e.find('input').element.value)).toEqual(values)
    await wrapper.find(utils.getTestId('SubformLayout:addButton')).find('button').trigger('click')
    expect(wrapper.findAll(utils.getTestId('SubformLayout:item'))[2].element.value).toBeUndefined()
  })
})
